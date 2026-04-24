'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Improvement } from '@/types/analysis'
import CopyButton from '@/components/CopyButton'

interface AnalysisData {
  score: number
  scoreExplanation: string
  improvements: Improvement[]
  coverLetter: string
  createdAt?: string
}

export default function ResultPage() {
  const router = useRouter()
  const [data, setData] = useState<AnalysisData | null>(null)

  useEffect(() => {
    const raw = sessionStorage.getItem('cvdev_analysis')
    if (!raw) {
      router.replace('/analyze')
      return
    }
    try {
      setData(JSON.parse(raw))
    } catch {
      router.replace('/analyze')
    }
  }, [router])

  if (!data) {
    return <div className="min-h-screen bg-white" />
  }

  const scoreLabel =
    data.score >= 71 ? 'Perfil sólido'
    : data.score >= 41 ? 'Buen perfil'
    : 'Necesita mejoras'

  return (
    <div className="min-h-screen bg-white text-black font-sans">

      {/* Nav */}
      <nav className="border-b border-black/8 px-8 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="tracking-tight select-none text-[15px]">
            <span className="font-semibold text-black">cv</span>
            <span className="font-normal font-mono text-[#888]">dev</span>
          </Link>
          <Link
            href="/analyze"
            className="text-[12px] text-black/35 hover:text-black transition-colors duration-150"
          >
            Nuevo análisis →
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-8 pt-16 pb-0">

        {/* Page header */}
        <div className="pb-12">
          <p className="text-[11px] uppercase tracking-[0.18em] text-black/35 mb-5 font-medium">
            Resultado del análisis
          </p>
          <h1
            className="text-[clamp(28px,4vw,44px)] font-medium leading-[1.1] mb-3"
            style={{ letterSpacing: '-0.03em' }}
          >
            Compatibilidad:{' '}
            <span className="text-black/35">{data.score}/100</span>
          </h1>
          {data.createdAt && (
            <p className="text-[12px] text-black/25 font-medium">
              {new Date(data.createdAt).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          )}
        </div>

        {/* Separator */}
        <div className="border-t border-black/8" />

        {/* Score */}
        <div className="py-12">
          <div className="flex items-start gap-10 mb-8">
            <div className="flex-shrink-0 w-28">
              <div
                className="text-[72px] font-medium leading-none"
                style={{ letterSpacing: '-0.04em' }}
              >
                {data.score}
              </div>
              <div className="text-[11px] text-black/30 mt-2 font-medium">/100</div>
            </div>

            <div className="w-px bg-black/8 self-stretch flex-shrink-0" />

            <div className="flex-1 pt-3 min-w-0">
              <p className="text-[15px] text-black/55 leading-relaxed max-w-xl">
                {data.scoreExplanation}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-0.5 bg-black/8 w-full">
            <div
              className="h-full bg-black"
              style={{ width: `${data.score}%` }}
            />
          </div>

          {/* Status label */}
          <p className="text-[11px] uppercase tracking-[0.15em] text-black/35 font-medium mt-3">
            {scoreLabel}
          </p>
        </div>

        {/* Separator */}
        <div className="border-t border-black/8" />

        {/* Improvements */}
        <div className="py-12">
          <p className="text-[11px] uppercase tracking-[0.18em] text-black/35 font-medium mb-8">
            Mejoras para tu CV
          </p>
          <div>
            {data.improvements.map((item, i) => (
              <ImprovementRow key={i} improvement={item} />
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-black/8" />

        {/* Cover letter */}
        <div className="py-12">
          <div className="flex items-center justify-between mb-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-black/35 font-medium">
              Carta de presentación
            </p>
            <CopyButton text={data.coverLetter} />
          </div>
          <div
            className="border px-8 py-8"
            style={{ background: '#F5F5F5', borderColor: 'rgba(0,0,0,0.08)', borderWidth: '0.5px' }}
          >
            <p className="text-[14px] text-black/65 leading-[1.8] whitespace-pre-wrap">
              {data.coverLetter}
            </p>
          </div>
        </div>

      </div>

      {/* CTA */}
      <div className="border-t border-black/8">
        <div className="max-w-5xl mx-auto px-8 py-16 text-center">
          <p className="text-[14px] text-black/40 mb-6">
            ¿Quieres analizar otra oferta?
          </p>
          <Link
            href="/analyze"
            className="inline-block px-6 py-3 bg-black text-white text-sm font-medium hover:bg-black/85 transition-colors duration-150"
          >
            Nuevo análisis →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-black/8">
        <div className="max-w-5xl mx-auto px-8 pt-12 pb-6">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <Link href="/" className="tracking-tight select-none text-[15px] mb-4 block">
                <span className="font-semibold text-black">cv</span>
                <span className="font-normal font-mono text-[#888]">dev</span>
              </Link>
              <p className="text-[13px] text-black/40 leading-relaxed">
                Análisis de CV con IA para<br />
                devs que buscan su primer empleo.
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-black/30 font-medium mb-4">
                Producto
              </p>
              <div className="space-y-2.5">
                <Link href="/analyze" className="block text-[13px] text-black/40 hover:text-black transition-colors duration-150">
                  Analizar CV
                </Link>
                <Link href="/#features" className="block text-[13px] text-black/40 hover:text-black transition-colors duration-150">
                  Cómo funciona
                </Link>
                <Link href="/#ejemplo" className="block text-[13px] text-black/40 hover:text-black transition-colors duration-150">
                  Ejemplos
                </Link>
              </div>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-black/30 font-medium mb-4">
                Legal
              </p>
              <div className="space-y-2.5">
                <Link href="#" className="block text-[13px] text-black/40 hover:text-black transition-colors duration-150">
                  Privacidad
                </Link>
                <Link href="#" className="block text-[13px] text-black/40 hover:text-black transition-colors duration-150">
                  Términos
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-black/8 pt-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
            <span className="text-[12px] text-black/25">
              © 2025 cvdev. Todos los derechos reservados.
            </span>
            <span className="text-[12px] text-black/25">
              Hecho con Next.js y OpenAI
            </span>
          </div>
        </div>
      </div>

    </div>
  )
}

type ImpactLevel = 'high' | 'medium' | 'low'

const impactBadge: Record<ImpactLevel, { label: string; classes: string }> = {
  high:   { label: 'Alto impacto', classes: 'bg-[#EAF3DE] text-[#3B6D11] border-[#3B6D11]/15' },
  medium: { label: 'Medio',        classes: 'bg-white text-black/45 border-black/12' },
  low:    { label: 'Bajo',         classes: 'bg-white text-black/25 border-black/8' },
}

function ImprovementRow({ improvement }: { improvement: Improvement }) {
  const impact = impactBadge[improvement.impact] ?? impactBadge.medium

  return (
    <div className="border-t border-black/8 py-5">
      <div className="md:grid md:grid-cols-[160px_1fr_auto] md:gap-x-8 md:items-start">
        <span className="font-mono text-[11px] text-black/35 block mb-2 md:mb-0 md:pt-0.5">
          {improvement.category}
        </span>
        <p className="text-[14px] text-black/65 leading-relaxed mb-3 md:mb-0">
          {improvement.suggestion}
        </p>
        <span className={`inline-block text-[11px] font-medium px-2.5 py-1 border flex-shrink-0 ${impact.classes}`}>
          {impact.label}
        </span>
      </div>
    </div>
  )
}
