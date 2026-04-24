'use client'

import { useState } from 'react'

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="text-[12px] font-medium px-4 py-2 bg-black dark:bg-zinc-100 text-white dark:text-zinc-950 hover:bg-black/85 dark:hover:bg-zinc-200 transition-colors duration-150"
    >
      {copied ? '✓ Copiado' : 'Copiar carta'}
    </button>
  )
}
