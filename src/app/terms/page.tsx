import type { Metadata } from 'next'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

export const metadata: Metadata = {
  title: 'Términos de uso — cvdev',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-zinc-100 font-sans">

      {/* Nav */}
      <nav className="border-b border-black/8 dark:border-zinc-800 px-8 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="tracking-tight select-none text-[15px]">
            <span className="font-semibold text-black dark:text-zinc-100">cv</span>
            <span className="font-normal font-mono text-[#888] dark:text-zinc-500">dev</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/analyze"
              className="text-[12px] text-black/35 dark:text-zinc-500 hover:text-black dark:hover:text-zinc-100 transition-colors duration-150"
            >
              Analizar CV →
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-8 pt-16 pb-0">

        {/* Page header */}
        <div className="pb-12">
          <p className="text-[11px] uppercase tracking-[0.18em] text-black/35 dark:text-zinc-500 mb-5 font-medium">
            Legal
          </p>
          <h1
            className="text-[clamp(28px,4vw,44px)] font-medium leading-[1.1] mb-3"
            style={{ letterSpacing: '-0.03em' }}
          >
            Términos de uso
          </h1>
          <p className="text-[12px] text-black/25 dark:text-zinc-600 font-medium">
            Actualizado: abril 2025
          </p>
        </div>

        <div className="border-t border-black/8 dark:border-zinc-800" />

        <div>
          <PolicySection title="Uso del servicio">
            cvdev es una herramienta gratuita de análisis de CV con IA. Puedes usarla para
            mejorar tu candidatura a ofertas de trabajo reales.
          </PolicySection>

          <PolicySection title="Lo que no puedes hacer">
            No usar el servicio para fines ilegales, no intentar sobrecargar o atacar la API,
            no revender el servicio ni los resultados generados.
          </PolicySection>

          <PolicySection title="Limitación de responsabilidad">
            El análisis es generado por IA y tiene carácter orientativo. cvdev no garantiza
            resultados en procesos de selección. Las decisiones de contratación dependen
            exclusivamente de cada empresa.
          </PolicySection>

          <PolicySection title="Cambios en los términos">
            Podemos actualizar estos términos en cualquier momento. Los cambios se publicarán
            en esta misma página con la fecha de actualización.
          </PolicySection>

          <PolicySection title="Contacto">
            <>
              Para cualquier consulta puedes escribirnos a{' '}
              <a
                href="mailto:hola@cvdev.app"
                className="underline underline-offset-2 decoration-black/25 dark:decoration-zinc-600 hover:decoration-black dark:hover:decoration-zinc-300 transition-colors"
              >
                hola@cvdev.app
              </a>
              .
            </>
          </PolicySection>
        </div>

      </div>

      {/* Footer */}
      <div className="border-t border-black/8 dark:border-zinc-800 mt-12">
        <div className="max-w-5xl mx-auto px-8 pt-12 pb-6">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <Link href="/" className="tracking-tight select-none text-[15px] mb-4 block">
                <span className="font-semibold text-black dark:text-zinc-100">cv</span>
                <span className="font-normal font-mono text-[#888] dark:text-zinc-500">dev</span>
              </Link>
              <p className="text-[13px] text-black/40 dark:text-zinc-400 leading-relaxed">
                Análisis de CV con IA para<br />
                devs que buscan su primer empleo.
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-black/30 dark:text-zinc-600 font-medium mb-4">
                Producto
              </p>
              <div className="space-y-2.5">
                <Link href="/analyze" className="block text-[13px] text-black/40 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100 transition-colors duration-150">
                  Analizar CV
                </Link>
                <Link href="/#features" className="block text-[13px] text-black/40 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100 transition-colors duration-150">
                  Cómo funciona
                </Link>
                <Link href="/#ejemplo" className="block text-[13px] text-black/40 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100 transition-colors duration-150">
                  Ejemplos
                </Link>
              </div>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-black/30 dark:text-zinc-600 font-medium mb-4">
                Legal
              </p>
              <div className="space-y-2.5">
                <Link href="/privacy" className="block text-[13px] text-black/40 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100 transition-colors duration-150">
                  Privacidad
                </Link>
                <Link href="/terms" className="block text-[13px] text-black/40 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100 transition-colors duration-150">
                  Términos
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-black/8 dark:border-zinc-800 pt-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
            <span className="text-[12px] text-black/25 dark:text-zinc-600">
              © 2025 cvdev. Todos los derechos reservados.
            </span>
            <span className="text-[12px] text-black/25 dark:text-zinc-600">
              Hecho con Next.js y OpenAI
            </span>
          </div>
        </div>
      </div>

    </div>
  )
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-black/8 dark:border-zinc-800 py-10">
      <div className="md:grid md:grid-cols-[220px_1fr] md:gap-x-12">
        <h2 className="text-[13px] font-medium text-black dark:text-zinc-100 mb-3 md:mb-0 md:pt-0.5 leading-snug">
          {title}
        </h2>
        <p className="text-[15px] text-black/55 dark:text-zinc-400 leading-relaxed">
          {children}
        </p>
      </div>
    </div>
  )
}
