import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import ThemeToggle from '@/components/ThemeToggle'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function PrivacyPage() {
  const t = useTranslations('privacy')
  const tn = useTranslations('nav')
  const locale = useLocale()
  const p = (path: string) => (locale === 'es' ? `/es${path}` : path)
  const home = locale === 'es' ? '/es' : '/'

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
              href={p('/analyze')}
              className="text-[12px] text-black/35 dark:text-zinc-500 hover:text-black dark:hover:text-zinc-100 transition-colors duration-150"
            >
              {tn('analyze')} →
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
            {t('title')}
          </h1>
          <p className="text-[12px] text-black/25 dark:text-zinc-600 font-medium">
            {t('updated')}
          </p>
        </div>

        <div className="border-t border-black/8 dark:border-zinc-800" />

        <div>
          <PolicySection title={t('s1_title')}>
            {t('s1_body')}
          </PolicySection>

          <PolicySection title={t('s2_title')}>
            {t('s2_body')}
          </PolicySection>

          <PolicySection title={t('s3_title')}>
            <>
              {t('s3_body_1')}{' '}
              <a
                href="https://openai.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 decoration-black/25 dark:decoration-zinc-600 hover:decoration-black dark:hover:decoration-zinc-300 transition-colors"
              >
                {t('s3_link')}
              </a>
              {t('s3_body_2')}
            </>
          </PolicySection>

          <PolicySection title={t('s4_title')}>
            {t('s4_body')}
          </PolicySection>

          <PolicySection title={t('s5_title')}>
            <>
              {t('s5_body_1')}{' '}
              <a
                href="mailto:hola@cvdev.app"
                className="underline underline-offset-2 decoration-black/25 dark:decoration-zinc-600 hover:decoration-black dark:hover:decoration-zinc-300 transition-colors"
              >
                {t('s5_email')}
              </a>
              {t('s5_body_2')}
            </>
          </PolicySection>
        </div>

      </div>

      {/* Footer */}
      <div className="border-t border-black/8 dark:border-zinc-800 mt-12">
        <PageFooter locale={locale} />
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

function PageFooter({ locale }: { locale: string }) {
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
