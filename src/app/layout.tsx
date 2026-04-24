import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/Providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'cvdev — Tu primer empleo en tech',
  description:
    'Sube tu CV, pega la oferta de trabajo y recibe un análisis personalizado con IA. Diseñado para devs junior.',
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} antialiased transition-colors duration-200`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
