'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import type { Improvement } from '@/types/analysis'
import CopyButton from '@/components/CopyButton'
import ThemeToggle from '@/components/ThemeToggle'
import LanguageSwitcher from '@/components/LanguageSwitcher'

interface AnalysisData {
  score: number
  scoreExplanation: string
  improvements: Improvement[]
  coverLetter: string
  createdAt?: string
}

export default function ResultPage() {
  const router = useRouter()
  const t = useTranslations('result')
  const locale = useLocale()
  const [data, setData] = useState<AnalysisData | null>(null)

  const home = locale === 'es' ? '/es' : '/'
  const analyzePath = locale === 'es' ? '/es/analyze' : '/analyze'

  useEffect(() => {
    const raw = sessionStorage.getItem('cvdev_analysis')
    if (!raw) {
      router.replace(analyzePath)
      return
    }
    try {
      setData(JSON.parse(raw))
    } catch {
      router.replace(analyzePath)
    }
  }, [router, analyzePath])

  if (!data) {
    return <div className="min-h-screen bg-white dark:bg-zinc-950" />
  }

  const scoreLabel =
    data.score >= 71 ? t('score_high')
    : data.score >= 41 ? t('score_mid')
    : t('score_low')

  const impactBadge: Record<'high' | 'medium' | 'low', { label: string; classes: string }> = {
    high:   { label: t('badge_high'), classes: 'bg-[#EAF3DE] text-[#3B6D11] border-[#3B6D11]/15 dark:bg-green-950 dark:text-green-400 dark:border-green-900' },
    medium: { label: t('badge_mid'),  classes: 'bg-white dark:bg-zinc-800 text-black/45 dark:text-zinc-400 border-black/12 dark:border-zinc-700' },
    low:    { label: t('badge_low'),  classes: 'bg-white dark:bg-zinc-800 text-black/25 dark:text-zinc-500 border-black/8 dark:border-zinc-700' },
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-zinc-100 font-sans">

      {/* Nav */}
      <nav className="border-b border-black/8 dark:border-zinc-800 px-8 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href={home} className="tracking-tight select-none text-[15px]">
            <span className="font-semibold text-black dark:text-zinc-100">cv</span>
            <span className="font-normal font-mono text-[#888] dark:text-zinc-500">dev</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href={analyzePath}
              className="text-[12px] text-black/35 dark:text-zinc-500 hover:text-black dark:hover:text-zinc-100 transition-colors duration-150"
            >
              {t('cta_button')}
            </Link>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-8 pt-16 pb-0">

        {/* Page header */}
        <div className="pb-12">
          <p className="text-[11px] uppercase tracking-[0.18em] text-black/35 dark:text-zinc-500 mb-5 font-medium">
            {t('eyebrow')}
          </p>
          <h1
            className="text-[clamp(28px,4vw,44px)] font-medium leading-[1.1] mb-3"
            style={{ letterSpacing: '-0.03em' }}
          >
            {t('compatibility')}{' '}
            <span className="text-black/35 dark:text-zinc-500">{data.score}/100</span>
          </h1>
          {data.createdAt && (
            <p className="text-[12px] text-black/25 dark:text-zinc-600 font-medium">
              {new Date(data.createdAt).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          )}
        </div>

        <div className="border-t border-black/8 dark:border-zinc-800" />

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
              <div className="text-[11px] text-black/30 dark:text-zinc-600 mt-2 font-medium">/100</div>
            </div>

            <div className="w-px bg-black/8 dark:bg-zinc-800 self-stretch flex-shrink-0" />

            <div className="flex-1 pt-3 min-w-0">
              <p className="text-[15px] text-black/55 dark:text-zinc-400 leading-relaxed max-w-xl">
                {data.scoreExplanation}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-0.5 bg-black/8 dark:bg-zinc-800 w-full">
            <div
              className="h-full bg-black dark:bg-zinc-100"
              style={{ width: `${data.score}%` }}
            />
          </div>

          <p className="text-[11px] uppercase tracking-[0.15em] text-black/35 dark:text-zinc-500 font-medium mt-3">
            {scoreLabel}
          </p>
        </div>

        <div className="border-t border-black/8 dark:border-zinc-800" />

        {/* Improvements */}
        <div className="py-12">
          <p className="text-[11px] uppercase tracking-[0.18em] text-black/35 dark:text-zinc-500 font-medium mb-8">
            {t('improvements_eyebrow')}
          </p>
          <div>
            {data.improvements.map((item, i) => (
              <ImprovementRow key={i} improvement={item} impactBadge={impactBadge} />
            ))}
          </div>
        </div>

        <div className="border-t border-black/8 dark:border-zinc-800" />

        {/* Cover letter */}
        <div className="py-12">
          <div className="flex items-center justify-between mb-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-black/35 dark:text-zinc-500 font-medium">
              {t('cover_eyebrow')}
            </p>
            <CopyButton
              text={data.coverLetter}
              copyLabel={t('copy')}
              copiedLabel={t('copied')}
            />
          </div>
          <div className="bg-[#F5F5F5] dark:bg-zinc-900 border border-black/8 dark:border-zinc-800 px-8 py-8">
            <p className="text-[14px] text-black/65 dark:text-zinc-300 leading-[1.8] whitespace-pre-wrap">
              {data.coverLetter}
            </p>
          </div>
        </div>

      </div>

      {/* CTA */}
      <div className="border-t border-black/8 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-8 py-16 text-center">
          <p className="text-[14px] text-black/40 dark:text-zinc-500 mb-6">
            {t('cta_question')}
          </p>
          <Link
            href={analyzePath}
            className="inline-block px-6 py-3 bg-black dark:bg-zinc-100 text-white dark:text-zinc-950 text-sm font-medium hover:bg-black/85 dark:hover:bg-zinc-200 transition-colors duration-150"
          >
            {t('cta_button')}
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-black/8 dark:border-zinc-800">
        <ResultFooter locale={locale} />
      </div>

    </div>
  )
}

function ResultFooter({ locale }: { locale: string }) {
  const t = useTranslations('landing')
  const tn = useTranslations('nav')
  const home = locale === 'es' ? '/es' : '/'
  const p = (path: string) => (locale === 'es' ? `/es${path}` : path)

  return (
    <div className="max-w-5xl mx-auto px-8 pt-12 pb-6">
      <div className="grid md:grid-cols-3 gap-10 mb-10">
        <div>
          <Link href={home} className="tracking-tight select-none text-[15px] mb-4 block">
            <span className="font-semibold text-black dark:text-zinc-100">cv</span>
            <span className="font-normal font-mono text-[#888] dark:text-zinc-500">dev</span>
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
            <Link href={p('/analyze')} className="block text-[13px] text-black/40 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100 transition-colors duration-150">
              {tn('analyze')}
            </Link>
            <Link href={`${home}#features`} className="block text-[13px] text-black/40 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100 transition-colors duration-150">
              {t('footer_how')}
            </Link>
            <Link href={`${home}#ejemplo`} className="block text-[13px] text-black/40 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100 transition-colors duration-150">
              {t('footer_examples')}
            </Link>
          </div>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-black/30 dark:text-zinc-600 font-medium mb-4">
            {t('footer_legal')}
          </p>
          <div className="space-y-2.5">
            <Link href={p('/privacy')} className="block text-[13px] text-black/40 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100 transition-colors duration-150">
              {t('footer_privacy')}
            </Link>
            <Link href={p('/terms')} className="block text-[13px] text-black/40 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100 transition-colors duration-150">
              {t('footer_terms')}
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-black/8 dark:border-zinc-800 pt-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <span className="text-[12px] text-black/25 dark:text-zinc-600">{t('footer_copyright')}</span>
        <span className="text-[12px] text-black/25 dark:text-zinc-600">{t('footer_built')}</span>
      </div>
    </div>
  )
}

type ImpactLevel = 'high' | 'medium' | 'low'

function ImprovementRow({
  improvement,
  impactBadge,
}: {
  improvement: Improvement
  impactBadge: Record<ImpactLevel, { label: string; classes: string }>
}) {
  const impact = impactBadge[improvement.impact] ?? impactBadge.medium

  return (
    <div className="border-t border-black/8 dark:border-zinc-800 py-5">
      <div className="md:grid md:grid-cols-[160px_1fr_auto] md:gap-x-8 md:items-start">
        <span className="font-mono text-[11px] text-black/35 dark:text-zinc-500 block mb-2 md:mb-0 md:pt-0.5">
          {improvement.category}
        </span>
        <p className="text-[14px] text-black/65 dark:text-zinc-300 leading-relaxed mb-3 md:mb-0">
          {improvement.suggestion}
        </p>
        <span className={`inline-block text-[11px] font-medium px-2.5 py-1 border flex-shrink-0 ${impact.classes}`}>
          {impact.label}
        </span>
      </div>
    </div>
  )
}
