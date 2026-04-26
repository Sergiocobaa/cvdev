import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import ThemeToggle from '@/components/ThemeToggle'
import LanguageSwitcher from '@/components/LanguageSwitcher'

function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`tracking-tight select-none ${className}`}>
      <span className="font-semibold text-black dark:text-zinc-100">cv</span>
      <span className="font-normal font-mono text-[#888] dark:text-zinc-500">dev</span>
    </span>
  )
}

export default function LandingPage() {
  const t = useTranslations('landing')
  const tn = useTranslations('nav')
  const locale = useLocale()
  const p = (path: string) => (locale === 'es' ? `/es${path}` : path)
  const home = locale === 'es' ? '/es' : '/'

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-zinc-100 font-sans">

      {/* Nav */}
      <nav className="border-b border-black/8 dark:border-zinc-800 px-8 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href={home}>
            <Logo className="text-[15px]" />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href={p('/analyze')}
              className="text-sm text-black/40 dark:text-zinc-500 hover:text-black dark:hover:text-zinc-100 transition-colors duration-150"
            >
              {tn('analyze')}
            </Link>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-8 pt-24 pb-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-black/35 dark:text-zinc-500 mb-7 font-medium">
              {t('eyebrow')}
            </p>

            <h1
              className="text-[clamp(36px,5vw,52px)] font-medium leading-[1.08] mb-7"
              style={{ letterSpacing: '-0.03em' }}
            >
              {t('headline_1')}{' '}
              <span className="text-black/35 dark:text-zinc-500 italic">{t('headline_italic')}</span>
              <br />
              {t('headline_2')}
            </h1>

            <p className="text-[15px] text-black/45 dark:text-zinc-400 leading-relaxed max-w-sm mb-10">
              {t('subheadline')}
            </p>

            <div className="flex items-center gap-6 mb-7">
              <Link
                href={p('/analyze')}
                className="inline-block px-6 py-3 bg-black dark:bg-zinc-100 text-white dark:text-zinc-950 text-sm font-medium hover:bg-black/85 dark:hover:bg-zinc-200 transition-colors duration-150"
              >
                {t('cta')}
              </Link>
              <span className="text-[13px] text-black/30 dark:text-zinc-600">{t('cta_sub')}</span>
            </div>

            <p className="text-[13px] text-black/35 dark:text-zinc-500">
              {t('social_proof')}
            </p>
          </div>

          <div className="flex items-center justify-center md:justify-end mt-10 md:mt-0">
            <div style={{ transform: 'rotate(1.5deg)', width: '100%', maxWidth: '340px' }}>
              <PreviewCard />
            </div>
          </div>

        </div>
      </section>

      {/* ── Trust strip ───────────────────────────────────────── */}
      <div className="border-y border-black/8 dark:border-zinc-800 py-4">
        <p className="text-center text-[11px] uppercase tracking-[0.2em] text-black/30 dark:text-zinc-600 font-medium">
          {t('trust_strip')}
        </p>
      </div>

      {/* ── Features ──────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-8 py-16">
        <div className="grid md:grid-cols-3 md:divide-x md:divide-y-0 divide-y divide-black/8 dark:divide-zinc-800">
          <FeatureCol
            num={t('feature_1_num')}
            title={t('feature_1_title')}
            description={t('feature_1_desc')}
            example={t('feature_1_example')}
          />
          <FeatureCol
            num={t('feature_2_num')}
            title={t('feature_2_title')}
            description={t('feature_2_desc')}
            example={t('feature_2_example')}
          />
          <FeatureCol
            num={t('feature_3_num')}
            title={t('feature_3_title')}
            description={t('feature_3_desc')}
            example={t('feature_3_example')}
          />
        </div>
      </section>

      {/* ── Por qué funciona ──────────────────────────────────── */}
      <div className="border-t border-black/8 dark:border-zinc-800">
        <section className="max-w-5xl mx-auto px-8 py-16">
          <p className="text-[11px] uppercase tracking-[0.18em] text-black/35 dark:text-zinc-500 mb-6 font-medium">
            {t('why_eyebrow')}
          </p>
          <h2
            className="text-[clamp(24px,3.5vw,38px)] font-medium leading-[1.15] mb-10"
            style={{ letterSpacing: '-0.025em' }}
          >
            {t('why_title_1')}<br />
            {t('why_title_2')}
          </h2>
          <div className="space-y-5 max-w-lg">
            <WhyPoint text={t('why_1')} />
            <WhyPoint text={t('why_2')} />
            <WhyPoint text={t('why_3')} />
          </div>
        </section>
      </div>

      {/* ── Preview strip ─────────────────────────────────────── */}
      <div className="border-t border-black/8 dark:border-zinc-800">
        <section className="max-w-5xl mx-auto px-8 py-16">
          <p className="text-[11px] uppercase tracking-[0.18em] text-black/35 dark:text-zinc-500 mb-6 font-medium">
            {t('example_eyebrow')}
          </p>
          <div className="bg-[#f7f7f5] dark:bg-zinc-900 border border-black/8 dark:border-zinc-800 p-8 flex flex-col md:flex-row items-start gap-10">
            <div className="flex-shrink-0 w-28">
              <div
                className="text-[68px] font-medium leading-none text-black dark:text-zinc-100"
                style={{ letterSpacing: '-0.04em' }}
              >
                74
              </div>
              <div className="text-[11px] text-black/35 dark:text-zinc-500 mt-1.5 font-medium">/100</div>
            </div>
            <div className="w-px bg-black/8 dark:bg-zinc-700 self-stretch flex-shrink-0 hidden md:block" />
            <div className="flex-1 min-w-0 space-y-5">
              <div className="flex flex-wrap gap-2">
                <ImpactBadge label={t('preview_projects')} level="high" badgeHigh={t('badge_high')} badgeMid={t('badge_mid')} badgeLow={t('badge_low')} />
                <ImpactBadge label={t('preview_github')} level="medium" badgeHigh={t('badge_high')} badgeMid={t('badge_mid')} badgeLow={t('badge_low')} />
                <ImpactBadge label={t('preview_keywords')} level="high" badgeHigh={t('badge_high')} badgeMid={t('badge_mid')} badgeLow={t('badge_low')} />
                <ImpactBadge label={t('preview_experience')} level="low" badgeHigh={t('badge_high')} badgeMid={t('badge_mid')} badgeLow={t('badge_low')} />
              </div>
              <p className="text-[13px] text-black/45 dark:text-zinc-400 italic leading-relaxed max-w-lg">
                {t('example_quote')}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ── Footer ────────────────────────────────────────────── */}
      <div className="border-t border-black/8 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-8 pt-12 pb-6">

          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <Link href={home}>
                <Logo className="text-[15px] mb-4 block" />
              </Link>
              <p className="text-[13px] text-black/40 dark:text-zinc-400 leading-relaxed">
                {t('footer_tagline_1')}<br />
                {t('footer_tagline_2')}
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-black/30 dark:text-zinc-600 font-medium mb-4">
                {t('footer_product')}
              </p>
              <div className="space-y-2.5">
                <FooterLink href={p('/analyze')} label={tn('analyze')} />
                <FooterLink href={`${home}#features`} label={t('footer_how')} />
                <FooterLink href={`${home}#ejemplo`} label={t('footer_examples')} />
              </div>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-black/30 dark:text-zinc-600 font-medium mb-4">
                {t('footer_legal')}
              </p>
              <div className="space-y-2.5">
                <FooterLink href={p('/privacy')} label={t('footer_privacy')} />
                <FooterLink href={p('/terms')} label={t('footer_terms')} />
              </div>
            </div>
          </div>

          <div className="border-t border-black/8 dark:border-zinc-800 pt-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
            <span className="text-[12px] text-black/25 dark:text-zinc-600">
              {t('footer_copyright')}
            </span>
            <span className="text-[12px] text-black/25 dark:text-zinc-600">
              {t('footer_built')}
            </span>
          </div>

        </div>
      </div>

    </div>
  )
}

/* ─── Components ────────────────────────────────────────────── */

function PreviewCard() {
  const t = useTranslations('landing')
  return (
    <div className="bg-[#F5F5F5] dark:bg-zinc-900 border border-black/10 dark:border-zinc-700 p-5">
      <div className="flex items-baseline justify-between mb-4">
        <span className="font-mono text-[11px] text-black/40 dark:text-zinc-500 uppercase tracking-wider">
          {t('preview_compatibility')}
        </span>
        <div className="font-mono text-right">
          <span className="text-[22px] font-semibold text-black dark:text-zinc-100" style={{ letterSpacing: '-0.03em' }}>
            74
          </span>
          <span className="text-[11px] text-black/30 dark:text-zinc-600 ml-0.5">/ 100</span>
        </div>
      </div>

      <div className="border-t border-black/10 dark:border-zinc-700 mb-4" />

      <div className="space-y-2.5 mb-4">
        <PreviewRow symbol="✓" label={t('preview_projects')} level={t('preview_high')} impact="high" />
        <PreviewRow symbol="✓" label={t('preview_keywords')} level={t('preview_high')} impact="high" />
        <PreviewRow symbol="~" label={t('preview_github')} level={t('preview_mid')} impact="medium" />
        <PreviewRow symbol="✗" label={t('preview_experience')} level={t('preview_low')} impact="low" />
      </div>

      <div className="border-t border-black/10 dark:border-zinc-700 mb-4" />

      <p className="text-[12px] text-black/45 dark:text-zinc-400 italic leading-relaxed">
        {t('preview_tip')}
      </p>
    </div>
  )
}

function PreviewRow({
  symbol, label, level, impact,
}: {
  symbol: string
  label: string
  level: string
  impact: 'high' | 'medium' | 'low'
}) {
  const symbolColor =
    impact === 'high' ? 'text-[#3B6D11] dark:text-green-400'
    : impact === 'medium' ? 'text-black/35 dark:text-zinc-500'
    : 'text-black/18 dark:text-zinc-700'
  const levelColor =
    impact === 'high' ? 'text-[#3B6D11] dark:text-green-400'
    : impact === 'medium' ? 'text-black/35 dark:text-zinc-500'
    : 'text-black/18 dark:text-zinc-700'

  return (
    <div className="flex items-center justify-between gap-3 font-mono text-[12px]">
      <div className="flex items-center gap-2.5">
        <span className={`${symbolColor} w-3 text-center flex-shrink-0`}>{symbol}</span>
        <span className="text-black/55 dark:text-zinc-400">{label}</span>
      </div>
      <span className={`${levelColor} flex-shrink-0`}>{level}</span>
    </div>
  )
}

function FeatureCol({
  num, title, description, example,
}: {
  num: string
  title: string
  description: string
  example: string
}) {
  return (
    <div className="px-8 py-6 md:py-0 first:pl-0 last:pr-0 space-y-3">
      <p className="text-[11px] text-black/20 dark:text-zinc-700 font-medium">{num}</p>
      <h3 className="text-[14px] font-medium text-black dark:text-zinc-100 leading-snug">{title}</h3>
      <p className="text-[13px] text-black/45 dark:text-zinc-400 leading-relaxed">{description}</p>
      <p className="text-[12px] font-mono text-black/18 dark:text-zinc-700 leading-relaxed pt-1">→ {example}</p>
    </div>
  )
}

function WhyPoint({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-black/20 dark:text-zinc-700 flex-shrink-0 mt-0.5 text-[14px]">—</span>
      <p className="text-[15px] text-black/55 dark:text-zinc-400 leading-relaxed">{text}</p>
    </div>
  )
}

type ImpactLevel = 'high' | 'medium' | 'low'

function ImpactBadge({
  label, level, badgeHigh, badgeMid, badgeLow,
}: {
  label: string
  level: ImpactLevel
  badgeHigh: string
  badgeMid: string
  badgeLow: string
}) {
  const styles: Record<ImpactLevel, string> = {
    high: 'bg-[#EAF3DE] text-[#3B6D11] border-[#3B6D11]/15 dark:bg-green-950 dark:text-green-400 dark:border-green-900',
    medium: 'bg-white dark:bg-zinc-800 text-black/50 dark:text-zinc-400 border-black/12 dark:border-zinc-700',
    low: 'bg-white dark:bg-zinc-800 text-black/30 dark:text-zinc-500 border-black/8 dark:border-zinc-700',
  }
  const levelLabel: Record<ImpactLevel, string> = {
    high: badgeHigh,
    medium: badgeMid,
    low: badgeLow,
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] border font-medium ${styles[level]}`}>
      {label}
      <span className="opacity-60 font-normal">· {levelLabel[level]}</span>
    </span>
  )
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block text-[13px] text-black/40 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100 transition-colors duration-150"
    >
      {label}
    </Link>
  )
}
