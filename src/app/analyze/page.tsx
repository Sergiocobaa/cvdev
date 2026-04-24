'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

export default function AnalyzePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dots, setDots] = useState(1)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected && selected.type === 'application/pdf') {
      setFile(selected)
      setError(null)
    } else {
      setError('Solo se aceptan archivos PDF.')
    }
  }

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation()
    setFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return setError('Por favor sube tu CV en PDF.')
    if (jobDescription.trim().length < 50)
      return setError('La oferta parece muy corta. Pega el texto completo.')

    setLoading(true)
    setError(null)

    const interval = setInterval(() => {
      setDots((d) => (d % 3) + 1)
    }, 500)

    try {
      const formData = new FormData()
      formData.append('cv', file)
      formData.append('jobDescription', jobDescription.trim())

      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error ?? 'Error al analizar el CV.')
      }

      sessionStorage.setItem('cvdev_analysis', JSON.stringify({
        ...data,
        createdAt: new Date().toISOString(),
      }))
      router.push('/result')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Algo salió mal. Inténtalo de nuevo.')
      setLoading(false)
    } finally {
      clearInterval(interval)
    }
  }

  const isReady = !!file && jobDescription.trim().length >= 50

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-zinc-100 font-sans">

      {/* Nav */}
      <nav className="border-b border-black/8 dark:border-zinc-800 px-8 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="tracking-tight select-none text-[15px]">
            <span className="font-semibold text-black dark:text-zinc-100">cv</span>
            <span className="font-normal font-mono text-[#888] dark:text-zinc-500">dev</span>
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-8 pt-16 pb-24">

        {/* Page header */}
        <div className="mb-14">
          <p className="text-[11px] uppercase tracking-[0.18em] text-black/35 dark:text-zinc-500 mb-5 font-medium">
            Análisis de CV
          </p>
          <h1
            className="text-[clamp(28px,4vw,44px)] font-medium leading-[1.1] mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            Sube tu CV y la oferta.
          </h1>
          <p className="text-[15px] text-black/40 dark:text-zinc-400 leading-relaxed">
            El análisis tarda menos de 30 segundos.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 mb-10">

            {/* Left — CV upload */}
            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] text-black/40 dark:text-zinc-500 font-medium mb-4">
                Tu CV en PDF
              </label>

              <div
                onClick={() => !loading && fileInputRef.current?.click()}
                className={[
                  'relative border border-dashed transition-colors duration-150',
                  loading ? 'cursor-default' : 'cursor-pointer',
                  file
                    ? 'border-black/25 dark:border-zinc-600 bg-[#f7f7f5] dark:bg-zinc-900'
                    : 'border-black/15 dark:border-zinc-700 bg-[#fafafa] dark:bg-zinc-900 hover:border-black/30 dark:hover:border-zinc-600 hover:bg-[#f7f7f5] dark:hover:bg-zinc-800',
                ].join(' ')}
                style={{ minHeight: '140px' }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  disabled={loading}
                  className="hidden"
                />

                {file ? (
                  <div className="flex items-center justify-between px-5 py-5">
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium text-black dark:text-zinc-100 truncate">{file.name}</p>
                      <p className="text-[11px] text-black/35 dark:text-zinc-500 mt-1">
                        {(file.size / 1024).toFixed(0)} KB · PDF
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      disabled={loading}
                      className="ml-4 flex-shrink-0 text-black/30 dark:text-zinc-500 hover:text-black/70 dark:hover:text-zinc-300 text-lg leading-none transition-colors disabled:pointer-events-none"
                      aria-label="Eliminar archivo"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
                    <p className="text-[13px] text-black/45 dark:text-zinc-400 mb-1">Arrastra tu PDF aquí</p>
                    <p className="text-[11px] text-black/25 dark:text-zinc-600">o haz clic para seleccionar</p>
                  </div>
                )}
              </div>

              {error && error.toLowerCase().includes('pdf') && (
                <p className="text-[12px] text-red-600 dark:text-red-400 mt-2">{error}</p>
              )}
            </div>

            {/* Right — Job description */}
            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] text-black/40 dark:text-zinc-500 font-medium mb-4">
                Oferta de trabajo
              </label>

              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                disabled={loading}
                placeholder="Pega aquí el texto completo de la oferta..."
                className={[
                  'w-full text-[13px] text-black dark:text-zinc-100 placeholder-black/20 dark:placeholder-zinc-600',
                  'border border-black/12 dark:border-zinc-700 bg-white dark:bg-zinc-900',
                  'px-4 py-4 resize-none',
                  'transition-colors duration-150',
                  'focus:outline-none focus:border-black/40 dark:focus:border-zinc-500',
                  'disabled:bg-[#fafafa] dark:disabled:bg-zinc-800 disabled:text-black/40 dark:disabled:text-zinc-600',
                ].join(' ')}
                style={{ minHeight: '200px' }}
              />

              <div className="flex items-center justify-between mt-2">
                <span className="text-[11px] text-black/25 dark:text-zinc-600">
                  Incluye título, requisitos y descripción.
                </span>
                <span className="text-[11px] text-black/25 dark:text-zinc-600">
                  {jobDescription.length} car.
                </span>
              </div>

              {error && error.toLowerCase().includes('oferta') && (
                <p className="text-[12px] text-red-600 dark:text-red-400 mt-2">{error}</p>
              )}
            </div>
          </div>

          {error && !error.toLowerCase().includes('pdf') && !error.toLowerCase().includes('oferta') && (
            <p className="text-[12px] text-red-600 dark:text-red-400 mb-6">{error}</p>
          )}

          {/* Submit */}
          <div className="border-t border-black/8 dark:border-zinc-800 pt-8">
            <button
              type="submit"
              disabled={loading || !isReady}
              className={[
                'w-full py-3.5 text-sm font-medium transition-colors duration-150',
                loading || !isReady
                  ? 'bg-black/8 dark:bg-zinc-800 text-black/25 dark:text-zinc-600 cursor-not-allowed'
                  : 'bg-black dark:bg-zinc-100 text-white dark:text-zinc-950 hover:bg-black/85 dark:hover:bg-zinc-200 cursor-pointer',
              ].join(' ')}
            >
              {loading
                ? `Analizando${'.'.repeat(dots)}`
                : 'Analizar CV →'}
            </button>

            {loading && (
              <div className="h-px bg-black/6 dark:bg-zinc-800 mt-0 overflow-hidden">
                <div className="h-full bg-black/30 dark:bg-zinc-400 animate-[progress_2s_ease-in-out_infinite]" />
              </div>
            )}

            <p className="text-[11px] text-black/25 dark:text-zinc-600 text-center mt-4">
              {loading
                ? 'No cierres esta página. Puede tardar hasta 30 segundos.'
                : 'Sin registro · Tus datos no se almacenan permanentemente'}
            </p>
          </div>

        </form>
      </div>
    </div>
  )
}
