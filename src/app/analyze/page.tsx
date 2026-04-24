'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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

    // Animated dots while loading
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

      router.push(`/result?id=${data.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Algo salió mal. Inténtalo de nuevo.')
      setLoading(false)
    } finally {
      clearInterval(interval)
    }
  }

  const isReady = !!file && jobDescription.trim().length >= 50

  return (
    <div className="min-h-screen bg-white text-black font-sans">

      {/* Nav */}
      <nav className="border-b border-black/8 px-8 py-5">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="text-sm font-medium tracking-tight select-none">
            cv<span className="text-black/30">dev</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-8 pt-16 pb-24">

        {/* Page header */}
        <div className="mb-14">
          <p className="text-[11px] uppercase tracking-[0.18em] text-black/35 mb-5 font-medium">
            Análisis de CV
          </p>
          <h1
            className="text-[clamp(28px,4vw,44px)] font-medium leading-[1.1] mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            Sube tu CV y la oferta.
          </h1>
          <p className="text-[15px] text-black/40 leading-relaxed">
            El análisis tarda menos de 30 segundos.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>

          {/* Two-column grid */}
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 mb-10">

            {/* Left — CV upload */}
            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] text-black/40 font-medium mb-4">
                Tu CV en PDF
              </label>

              <div
                onClick={() => !loading && fileInputRef.current?.click()}
                className={[
                  'relative border border-dashed transition-colors duration-150',
                  loading ? 'cursor-default' : 'cursor-pointer',
                  file
                    ? 'border-black/25 bg-[#f7f7f5]'
                    : 'border-black/15 bg-[#fafafa] hover:border-black/30 hover:bg-[#f7f7f5]',
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
                      <p className="text-[13px] font-medium text-black truncate">{file.name}</p>
                      <p className="text-[11px] text-black/35 mt-1">
                        {(file.size / 1024).toFixed(0)} KB · PDF
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      disabled={loading}
                      className="ml-4 flex-shrink-0 text-black/30 hover:text-black/70 text-lg leading-none transition-colors disabled:pointer-events-none"
                      aria-label="Eliminar archivo"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
                    <p className="text-[13px] text-black/45 mb-1">Arrastra tu PDF aquí</p>
                    <p className="text-[11px] text-black/25">o haz clic para seleccionar</p>
                  </div>
                )}
              </div>

              {/* Field-level error for CV */}
              {error && error.toLowerCase().includes('pdf') && (
                <p className="text-[12px] text-red-600 mt-2">{error}</p>
              )}
            </div>

            {/* Right — Job description */}
            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] text-black/40 font-medium mb-4">
                Oferta de trabajo
              </label>

              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                disabled={loading}
                placeholder="Pega aquí el texto completo de la oferta..."
                className={[
                  'w-full text-[13px] text-black placeholder-black/20',
                  'border border-black/12 bg-white',
                  'px-4 py-4 resize-none',
                  'transition-colors duration-150',
                  'focus:outline-none focus:border-black/40',
                  'disabled:bg-[#fafafa] disabled:text-black/40',
                ].join(' ')}
                style={{ minHeight: '200px' }}
              />

              <div className="flex items-center justify-between mt-2">
                <span className="text-[11px] text-black/25">
                  Incluye título, requisitos y descripción.
                </span>
                <span className="text-[11px] text-black/25">
                  {jobDescription.length} car.
                </span>
              </div>

              {/* Field-level error for job description */}
              {error && error.toLowerCase().includes('oferta') && (
                <p className="text-[12px] text-red-600 mt-2">{error}</p>
              )}
            </div>
          </div>

          {/* Generic error (API / server) */}
          {error && !error.toLowerCase().includes('pdf') && !error.toLowerCase().includes('oferta') && (
            <p className="text-[12px] text-red-600 mb-6">{error}</p>
          )}

          {/* Submit */}
          <div className="border-t border-black/8 pt-8">
            <button
              type="submit"
              disabled={loading || !isReady}
              className={[
                'w-full py-3.5 text-sm font-medium transition-colors duration-150',
                loading || !isReady
                  ? 'bg-black/8 text-black/25 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-black/85 cursor-pointer',
              ].join(' ')}
            >
              {loading
                ? `Analizando${'.'.repeat(dots)}`
                : 'Analizar CV →'}
            </button>

            {/* Progress line */}
            {loading && (
              <div className="h-px bg-black/6 mt-0 overflow-hidden">
                <div className="h-full bg-black/30 animate-[progress_2s_ease-in-out_infinite]" />
              </div>
            )}

            <p className="text-[11px] text-black/25 text-center mt-4">
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
