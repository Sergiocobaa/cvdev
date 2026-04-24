import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { prisma } from '@/lib/prisma'
import type { ClaudeAnalysis } from '@/types/analysis'

// Import from lib directly to skip pdf-parse's test-file initialization at module load
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require('pdf-parse/lib/pdf-parse.js')

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const SYSTEM_PROMPT = `Eres un experto en orientación profesional y reclutamiento técnico especializado en ayudar a desarrolladores junior (0-2 años de experiencia) a conseguir su primer empleo en tecnología.

Tu análisis debe ser:
- Honesto pero constructivo
- Específico y accionable, nunca genérico
- Enfocado en lo que un dev junior puede mejorar rápidamente: proyectos de GitHub, keywords técnicas, estructura del CV, y cómo compensar la falta de experiencia con proyectos propios

Devuelve ÚNICAMENTE un objeto JSON válido, sin markdown, sin explicaciones adicionales.`

const buildUserPrompt = (cvText: string, jobDescription: string): string => `
Analiza este CV y esta oferta de trabajo para un desarrollador junior.

## CV del candidato:
${cvText}

## Oferta de trabajo:
${jobDescription}

Devuelve un JSON con exactamente esta estructura:
{
  "score": <número entero 0-100>,
  "scoreExplanation": "<2-3 frases que expliquen la puntuación: qué encaja bien y qué falta>",
  "improvements": [
    {
      "category": "<uno de: Proyectos | Habilidades Técnicas | GitHub | Formato | Keywords | Experiencia>",
      "suggestion": "<acción específica y concreta que el candidato puede hacer, menciona tecnologías reales si aplica>",
      "impact": "<high | medium | low>"
    }
  ],
  "coverLetter": "<carta de presentación completa de 3-4 párrafos, en el mismo idioma que la oferta, lista para copiar y enviar>"
}

Criterios de puntuación:
- 0-40: Hay brechas importantes entre el perfil y los requisitos
- 41-70: Hay potencial pero faltan elementos clave (proyectos, skills, keywords)
- 71-100: El perfil encaja bien con la oferta

Incluye entre 4 y 6 mejoras ordenadas de mayor a menor impacto.
La carta de presentación debe referenciar habilidades específicas del CV y de la oferta, y mostrar entusiasmo genuino por aprender (adecuado para un junior).
`

function parseResponse(text: string): ClaudeAnalysis {
  const clean = text
    .replace(/^```json\s*/m, '')
    .replace(/^```\s*/m, '')
    .replace(/```$/m, '')
    .trim()

  const parsed = JSON.parse(clean) as ClaudeAnalysis

  if (
    typeof parsed.score !== 'number' ||
    typeof parsed.scoreExplanation !== 'string' ||
    !Array.isArray(parsed.improvements) ||
    typeof parsed.coverLetter !== 'string'
  ) {
    throw new Error('Respuesta de IA con formato inesperado.')
  }

  return parsed
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const cvFile = formData.get('cv') as File | null
    const jobDescription = formData.get('jobDescription') as string | null

    if (!cvFile || cvFile.size === 0) {
      return NextResponse.json({ error: 'El archivo CV es requerido.' }, { status: 400 })
    }

    if (!jobDescription || jobDescription.trim().length < 50) {
      return NextResponse.json({ error: 'La oferta de trabajo es muy corta.' }, { status: 400 })
    }

    // Extract text from PDF
    const arrayBuffer = await cvFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    let cvText: string
    try {
      const pdfData = await pdfParse(buffer)
      cvText = pdfData.text?.trim()
      if (!cvText || cvText.length < 50) {
        return NextResponse.json(
          { error: 'No se pudo extraer texto del PDF. Asegúrate de que el PDF no esté protegido o sea una imagen escaneada.' },
          { status: 422 }
        )
      }
    } catch {
      return NextResponse.json(
        { error: 'Error al leer el PDF. Intenta con otro archivo.' },
        { status: 422 }
      )
    }

    // Call OpenAI — gpt-4o-mini: gran calidad a bajo coste (~$0.002 por análisis)
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 2048,
      temperature: 0.4,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: buildUserPrompt(cvText, jobDescription.trim()) },
      ],
    })

    const responseText = completion.choices[0]?.message?.content ?? ''

    let analysisData: ClaudeAnalysis
    try {
      analysisData = parseResponse(responseText)
    } catch {
      return NextResponse.json(
        { error: 'Error procesando la respuesta de la IA. Inténtalo de nuevo.' },
        { status: 500 }
      )
    }

    // Save to database
    const saved = await prisma.analysis.create({
      data: {
        cvText,
        jobDescription: jobDescription.trim(),
        score: Math.max(0, Math.min(100, analysisData.score)),
        scoreExplanation: analysisData.scoreExplanation,
        improvements: JSON.stringify(analysisData.improvements),
        coverLetter: analysisData.coverLetter,
      },
    })

    return NextResponse.json({
      id: saved.id,
      score: saved.score,
      scoreExplanation: saved.scoreExplanation,
      improvements: analysisData.improvements,
      coverLetter: saved.coverLetter,
    })
  } catch (error) {
    console.error('[/api/analyze]', error)

    const message = error instanceof Error ? error.message : String(error)

    if (message.includes('429') || message.toLowerCase().includes('quota') || message.toLowerCase().includes('rate limit')) {
      return NextResponse.json(
        { error: 'Límite de la API alcanzado. Espera unos segundos y vuelve a intentarlo.' },
        { status: 429 }
      )
    }

    return NextResponse.json(
      {
        error: 'Error interno del servidor. Inténtalo de nuevo.',
        ...(process.env.NODE_ENV === 'development' && { detail: message }),
      },
      { status: 500 }
    )
  }
}
