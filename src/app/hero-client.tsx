'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { StatusDot } from '@/components/StatusDot'
import { SectionHeader } from '@/components/SectionHeader'
import { MetricCard } from '@/components/MetricCard'

interface HeroClientProps {
  metrics: {
    repos: number | null
    commits: number | null
    techCount: number
  }
  siteConfig: {
    name: string
    title: string
    description: string
  }
}

export function HeroClient({ metrics, siteConfig }: HeroClientProps) {
  const [booted, setBooted] = useState(true)
  const [phase, setPhase] = useState(3)
  const [statusText, setStatusText] = useState('online')
  const [typedName, setTypedName] = useState(siteConfig.name)
  const [nameReady, setNameReady] = useState(true)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasBooted = sessionStorage.getItem('booted')

    if (hasBooted || prefersReduced) return

    setBooted(false)
    setPhase(0)
    setStatusText('initializing...')
    setTypedName('')
    setNameReady(false)

    setTimeout(() => setPhase(1), 50)

    setTimeout(() => {
      setPhase(2)
      const name = siteConfig.name
      let i = 0
      const interval = setInterval(() => {
        i++
        setTypedName(name.slice(0, i))
        if (i >= name.length) {
          clearInterval(interval)
          setTimeout(() => setNameReady(true), 100)
        }
      }, 60)
    }, 400)

    setTimeout(() => setStatusText('online'), 800)

    setTimeout(() => {
      setPhase(3)
      setBooted(true)
      sessionStorage.setItem('booted', '1')
    }, 1200)
  }, [siteConfig.name])

  return (
    <div className="relative">
      {!booted && phase >= 1 && phase < 3 && (
        <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
          <div className="absolute left-0 right-0 h-px bg-accent/60 animate-scanline" />
        </div>
      )}

      <section className="max-w-5xl mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={booted ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="flex items-center gap-2 mb-6"
        >
          <StatusDot status="active" />
          <span className="font-mono text-xs text-muted">{statusText}</span>
        </motion.div>

        <motion.h1
          initial={booted ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className={`text-4xl md:text-5xl font-bold mb-4 ${nameReady ? 'font-sans' : 'font-mono'}`}
        >
          {typedName}
          {!nameReady && <span className="animate-pulse">_</span>}
        </motion.h1>

        <motion.p
          initial={booted ? undefined : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="text-lg text-muted mb-4"
        >
          Full Stack Developer &{' '}
          <span className="text-accent font-medium">Automation Specialist</span>
        </motion.p>

        <motion.p
          initial={booted ? undefined : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="text-sm text-muted mb-8 max-w-lg"
        >
          {siteConfig.description}
        </motion.p>

        <motion.div
          initial={booted ? undefined : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="flex gap-3 mb-16"
        >
          <Link
            href="/projects"
            className="px-5 py-2.5 bg-accent text-bg font-mono text-sm rounded-md hover:brightness-110 transition-all"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="px-5 py-2.5 border border-border text-text font-mono text-sm rounded-md hover:border-accent hover:text-accent transition-colors"
          >
            Get in Touch
          </Link>
        </motion.div>

        <SectionHeader label="SYSTEMS OVERVIEW" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: metrics.repos, label: 'Repos', delay: 1.2 },
            { value: metrics.commits, label: 'Commits', delay: 1.35 },
            { value: metrics.techCount, label: 'Technologies', delay: 1.5 },
            { value: '99.9%', label: 'Uptime', delay: 1.65 },
          ].map((m) => (
            <motion.div
              key={m.label}
              initial={booted ? undefined : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: booted ? 0 : m.delay, duration: 0.4 }}
            >
              <MetricCard value={m.value} label={m.label} />
            </motion.div>
          ))}
        </div>
      </section>

      <div className="fixed inset-0 bg-grid opacity-[0.03] pointer-events-none -z-10" />
    </div>
  )
}
