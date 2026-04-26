'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return
    const newPath =
      newLocale === 'en'
        ? pathname.replace(/^\/es/, '') || '/'
        : `/es${pathname}`
    router.push(newPath)
  }

  return (
    <div className="flex items-center gap-1 text-[12px]">
      <button
        onClick={() => switchLocale('en')}
        className={
          locale === 'en'
            ? 'font-medium text-black dark:text-zinc-100 cursor-default'
            : 'text-black/35 dark:text-zinc-500 hover:text-black dark:hover:text-zinc-100 transition-colors duration-150 cursor-pointer'
        }
      >
        EN
      </button>
      <span className="text-black/15 dark:text-zinc-700">/</span>
      <button
        onClick={() => switchLocale('es')}
        className={
          locale === 'es'
            ? 'font-medium text-black dark:text-zinc-100 cursor-default'
            : 'text-black/35 dark:text-zinc-500 hover:text-black dark:hover:text-zinc-100 transition-colors duration-150 cursor-pointer'
        }
      >
        ES
      </button>
    </div>
  )
}
