'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-7 h-6" />

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      className="p-1.5 text-black/30 hover:text-black dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors duration-150 cursor-pointer"
    >
      {isDark ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="8" cy="8" r="3" />
          <line x1="8" y1="0.5" x2="8" y2="2.5" />
          <line x1="8" y1="13.5" x2="8" y2="15.5" />
          <line x1="0.5" y1="8" x2="2.5" y2="8" />
          <line x1="13.5" y1="8" x2="15.5" y2="8" />
          <line x1="2.75" y1="2.75" x2="4.17" y2="4.17" />
          <line x1="11.83" y1="11.83" x2="13.25" y2="13.25" />
          <line x1="13.25" y1="2.75" x2="11.83" y2="4.17" />
          <line x1="4.17" y1="11.83" x2="2.75" y2="13.25" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M13.5 10.5A6 6 0 0 1 5.5 2.5a6 6 0 1 0 8 8z" />
        </svg>
      )}
    </button>
  )
}
