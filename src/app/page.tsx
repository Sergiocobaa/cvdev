import Link from 'next/link'

/* ─── Shared logo component ─────────────────────────────────────────────── */

function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`tracking-tight select-none ${className}`}>
      <span className="font-semibold text-black">cv</span>
      <span className="font-normal font-mono text-[#888]">dev</span>
    </span>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">

      {/* Nav */}
      <nav className="border-b border-black/8 px-8 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Logo className="text-[15px]" />
          <Link
            href="/analyze"
            className="text-sm text-black/40 hover:text-black transition-colors duration-150"
          >
            Analizar CV
          </Link>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-8 pt-24 pb-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-black/35 mb-7 font-medium">
              Para devs junior
            </p>

            <h1
              className="text-[clamp(36px,5vw,52px)] font-medium leading-[1.08] mb-7"
              style={{ letterSpacing: '-0.03em' }}
            >
              Tu CV,{' '}
              <span className="text-black/35 italic">analizado</span>
              <br />
              con criterio real.
            </h1>

            <p className="text-[15px] text-black/45 leading-relaxed max-w-sm mb-10">
              Compatibilidad con la oferta, mejoras accionables y carta
              de presentación. En menos de un minuto.
            </p>

            <div className="flex items-center gap-6 mb-7">
              <Link
                href="/analyze"
                className="inline-block px-6 py-3 bg-black text-white text-sm font-medium hover:bg-black/85 transition-colors duration-150"
              >
                Analizar mi CV →
              </Link>
              <span className="text-[13px] text-black/30">Sin registro · Gratis</span>
            </div>

            <p className="text-[13px] text-black/35">
              Análisis gratuito · Sin registro · Sin tarjeta
            </p>
          </div>

          {/* Right — preview card */}
          <div className="flex items-center justify-center md:justify-end mt-10 md:mt-0">
            <div style={{ transform: 'rotate(1.5deg)', width: '100%', maxWidth: '340px' }}>
              <PreviewCard />
            </div>
          </div>

        </div>
      </section>

      {/* ── Trust strip ───────────────────────────────────────────────────── */}
      <div className="border-y border-black/8 py-4">
        <p className="text-center text-[11px] uppercase tracking-[0.2em] text-black/30 font-medium">
          Sin registro&nbsp;&nbsp;·&nbsp;&nbsp;Sin tarjeta&nbsp;&nbsp;·&nbsp;&nbsp;Resultados en 30 segundos
        </p>
      </div>

      {/* ── Features ──────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-8 py-16">
        <div className="grid md:grid-cols-3 md:divide-x md:divide-y-0 divide-y divide-black/8">
          <FeatureCol
            num="01"
            title="Puntuación de compatibilidad"
            description="Qué tan bien encaja tu perfil con la oferta. Explicación de puntos fuertes y lo que falta."
            example='score: 74/100 — "Perfil con potencial técnico."'
          />
          <FeatureCol
            num="02"
            title="Mejoras concretas"
            description="Sugerencias sobre proyectos, GitHub, keywords técnicas y formato. Ordenadas por impacto."
            example='"Añade testing unitario al repo principal."'
          />
          <FeatureCol
            num="03"
            title="Carta de presentación"
            description="Lista para copiar y enviar. Adaptada a tu perfil y a la oferta específica."
            example='"Estimados reclutadores de Acme Corp..."'
          />
        </div>
      </section>

      {/* ── Por qué funciona ──────────────────────────────────────────────── */}
      <div className="border-t border-black/8">
        <section className="max-w-5xl mx-auto px-8 py-16">
          <p className="text-[11px] uppercase tracking-[0.18em] text-black/35 mb-6 font-medium">
            Por qué funciona
          </p>
          <h2
            className="text-[clamp(24px,3.5vw,38px)] font-medium leading-[1.15] mb-10"
            style={{ letterSpacing: '-0.025em' }}
          >
            Análisis diseñado para<br />
            lo que miran los recruiters.
          </h2>
          <div className="space-y-5 max-w-lg">
            <WhyPoint text="Detecta keywords que los ATS filtran automáticamente" />
            <WhyPoint text="Evalúa si tus proyectos de GitHub son relevantes para la oferta" />
            <WhyPoint text="Genera cartas que suenan humanas, no a plantilla" />
          </div>
        </section>
      </div>

      {/* ── Preview strip ─────────────────────────────────────────────────── */}
      <div className="border-t border-black/8">
        <section className="max-w-5xl mx-auto px-8 py-16">
          <p className="text-[11px] uppercase tracking-[0.18em] text-black/35 mb-6 font-medium">
            Ejemplo de análisis
          </p>
          <div className="bg-[#f7f7f5] border border-black/8 p-8 flex flex-col md:flex-row items-start gap-10">
            <div className="flex-shrink-0 w-28">
              <div
                className="text-[68px] font-medium leading-none text-black"
                style={{ letterSpacing: '-0.04em' }}
              >
                74
              </div>
              <div className="text-[11px] text-black/35 mt-1.5 font-medium">/100</div>
            </div>
            <div className="w-px bg-black/8 self-stretch flex-shrink-0 hidden md:block" />
            <div className="flex-1 min-w-0 space-y-5">
              <div className="flex flex-wrap gap-2">
                <ImpactBadge label="Proyectos" level="high" />
                <ImpactBadge label="GitHub" level="medium" />
                <ImpactBadge label="Keywords" level="high" />
                <ImpactBadge label="Formato" level="low" />
              </div>
              <p className="text-[13px] text-black/45 italic leading-relaxed max-w-lg">
                "Tu stack técnico cubre el 60% de los requisitos. Añadir 2-3 proyectos con
                React y TypeScript en GitHub elevaría tu compatibilidad a 85+."
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <div className="border-t border-black/8">
        <div className="max-w-5xl mx-auto px-8 pt-12 pb-6">

          <div className="grid md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <Logo className="text-[15px] mb-4 block" />
              <p className="text-[13px] text-black/40 leading-relaxed">
                Análisis de CV con IA para<br />
                devs que buscan su primer empleo.
              </p>
            </div>

            {/* Producto */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-black/30 font-medium mb-4">
                Producto
              </p>
              <div className="space-y-2.5">
                <FooterLink href="/analyze" label="Analizar CV" />
                <FooterLink href="/#features" label="Cómo funciona" />
                <FooterLink href="/#ejemplo" label="Ejemplos" />
              </div>
            </div>

            {/* Legal */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-black/30 font-medium mb-4">
                Legal
              </p>
              <div className="space-y-2.5">
                <FooterLink href="/privacy" label="Privacidad" />
                <FooterLink href="/terms" label="Términos" />
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

/* ─── Components ─────────────────────────────────────────────────────────── */

function PreviewCard() {
  return (
    <div className="bg-[#F5F5F5] border border-black/10 p-5">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-4">
        <span className="font-mono text-[11px] text-black/40 uppercase tracking-wider">
          Compatibilidad
        </span>
        <div className="font-mono text-right">
          <span className="text-[22px] font-semibold text-black" style={{ letterSpacing: '-0.03em' }}>
            74
          </span>
          <span className="text-[11px] text-black/30 ml-0.5">/ 100</span>
        </div>
      </div>

      <div className="border-t border-black/10 mb-4" />

      {/* Rows */}
      <div className="space-y-2.5 mb-4">
        <PreviewRow symbol="✓" label="Proyectos" level="alto" impact="high" />
        <PreviewRow symbol="✓" label="Keywords" level="alto" impact="high" />
        <PreviewRow symbol="~" label="GitHub" level="medio" impact="medium" />
        <PreviewRow symbol="✗" label="Experiencia" level="bajo" impact="low" />
      </div>

      <div className="border-t border-black/10 mb-4" />

      {/* Quote */}
      <p className="text-[12px] text-black/45 italic leading-relaxed">
        "Añade un proyecto REST con Node.js para compensar la falta de experiencia laboral."
      </p>
    </div>
  )
}

function PreviewRow({
  symbol,
  label,
  level,
  impact,
}: {
  symbol: string
  label: string
  level: string
  impact: 'high' | 'medium' | 'low'
}) {
  const symbolColor =
    impact === 'high' ? 'text-[#3B6D11]' : impact === 'medium' ? 'text-black/35' : 'text-black/18'
  const levelColor =
    impact === 'high' ? 'text-[#3B6D11]' : impact === 'medium' ? 'text-black/35' : 'text-black/18'

  return (
    <div className="flex items-center justify-between gap-3 font-mono text-[12px]">
      <div className="flex items-center gap-2.5">
        <span className={`${symbolColor} w-3 text-center flex-shrink-0`}>{symbol}</span>
        <span className="text-black/55">{label}</span>
      </div>
      <span className={`${levelColor} flex-shrink-0`}>{level}</span>
    </div>
  )
}

function FeatureCol({
  num,
  title,
  description,
  example,
}: {
  num: string
  title: string
  description: string
  example: string
}) {
  return (
    <div className="px-8 py-6 md:py-0 first:pl-0 last:pr-0 space-y-3">
      <p className="text-[11px] text-black/20 font-medium">{num}</p>
      <h3 className="text-[14px] font-medium text-black leading-snug">{title}</h3>
      <p className="text-[13px] text-black/45 leading-relaxed">{description}</p>
      <p className="text-[12px] font-mono text-black/18 leading-relaxed pt-1">→ {example}</p>
    </div>
  )
}

function WhyPoint({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-black/20 flex-shrink-0 mt-0.5 text-[14px]">—</span>
      <p className="text-[15px] text-black/55 leading-relaxed">{text}</p>
    </div>
  )
}

type ImpactLevel = 'high' | 'medium' | 'low'

function ImpactBadge({ label, level }: { label: string; level: ImpactLevel }) {
  const styles: Record<ImpactLevel, string> = {
    high: 'bg-[#EAF3DE] text-[#3B6D11] border-[#3B6D11]/15',
    medium: 'bg-white text-black/50 border-black/12',
    low: 'bg-white text-black/30 border-black/8',
  }
  const levelLabel: Record<ImpactLevel, string> = {
    high: 'alto impacto',
    medium: 'medio',
    low: 'bajo',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] border font-medium ${styles[level]}`}
    >
      {label}
      <span className="opacity-60 font-normal">· {levelLabel[level]}</span>
    </span>
  )
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block text-[13px] text-black/40 hover:text-black transition-colors duration-150"
    >
      {label}
    </Link>
  )
}
