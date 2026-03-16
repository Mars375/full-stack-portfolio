import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

export const metadata: Metadata = {
  title: 'Loïc Rossi | Full Stack Developer',
  description: 'Full Stack Developer & Automation Specialist building production-ready applications with Next.js, TypeScript, and modern tech stack.',
  keywords: ['Full Stack Developer', 'Next.js', 'TypeScript', 'React', 'Automation'],
  authors: [{ name: 'Loïc Rossi', url: 'https://github.com/Mars375' }],
  openGraph: {
    title: 'Loïc Rossi | Full Stack Developer',
    description: 'Full Stack Developer & Automation Specialist',
    url: 'https://loïrossi.dev',
    siteName: 'Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loïc Rossi | Full Stack Developer',
    description: 'Full Stack Developer & Automation Specialist',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
