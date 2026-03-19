'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TypingEffect } from '@/components/effects/TypingEffect'
import { StatusDot } from '@/components/StatusDot'

interface HeroSectionProps {
  name: string
  title: string
  location: string
  repos: number | null
  commits: number | null
}

export function HeroSection({ name, title, location, repos, commits }: HeroSectionProps) {
  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 800], [0, -100])

  const [booted, setBooted] = useState(true)
  const [phase, setPhase] = useState(3)
  const [typedName, setTypedName] = useState(name)
  const [nameReady, setNameReady] = useState(true)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasBooted = sessionStorage.getItem('booted')

    if (hasBooted || prefersReduced) return

    let cancelled = false
    let rafId: number

    setBooted(false)
    setPhase(0)
    setTypedName('')
    setNameReady(false)

    const t1 = setTimeout(() => { if (!cancelled) setPhase(1) }, 50)

    const t2 = setTimeout(() => {
      if (cancelled) return
      setPhase(2)
      let i = 0
      let lastTime = 0
      const throttled = (time: number) => {
        if (cancelled) return
        if (!lastTime) lastTime = time
        if (time - lastTime >= 55) {
          i++
          setTypedName(name.slice(0, i))
          lastTime = time
        }
        if (i < name.length) { rafId = requestAnimationFrame(throttled) }
        else setNameReady(true)
      }
      rafId = requestAnimationFrame(throttled)
    }, 400)

    const t3 = setTimeout(() => {
      if (cancelled) return
      setPhase(3)
      setBooted(true)
      sessionStorage.setItem('booted', '1')
    }, 1800)

    return () => {
      cancelled = true
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      cancelAnimationFrame(rafId)
    }
  }, [name])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 overflow-hidden">
      {/* Scanline */}
      {!booted && phase >= 1 && phase < 3 && (
        <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
          <div className="absolute left-0 right-0 h-px bg-accent/60 animate-scanline" />
        </div>
      )}

      {/* Parallax content wrapper */}
      <motion.div style={{ y: contentY }} className="w-full max-w-4xl">

        {/* Init text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          className="font-mono text-[10px] text-muted tracking-[4px] mb-14 h-4"
        >
          {!booted && phase >= 1 && (
            <TypingEffect text="INITIALIZING SESSION..." speed={30} />
          )}
        </motion.div>

        {/* Prompt line */}
        <motion.div
          initial={booted ? undefined : { opacity: 0 }}
          animate={{ opacity: phase >= 2 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="font-mono text-sm mb-5"
        >
          <span className="text-success">loic@cortex</span>
          <span className="text-muted">:~ $ </span>
          <span className="text-text/70">whoami</span>
        </motion.div>

        {/* Name — huge, editorial, left-aligned */}
        <motion.h1
          initial={booted ? undefined : { opacity: 0 }}
          animate={{ opacity: phase >= 2 ? 1 : 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-[clamp(3.5rem,10vw,7rem)] font-extralight text-text leading-none tracking-[-3px] md:tracking-[-5px]"
        >
          {typedName}
          {!nameReady && <span className="animate-blink font-mono font-thin">_</span>}
        </motion.h1>

        {/* Separator */}
        <motion.div
          initial={booted ? undefined : { opacity: 0, scaleX: 0 }}
          animate={{ opacity: phase >= 2 ? 1 : 0, scaleX: phase >= 2 ? 1 : 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
          className="origin-left h-px mt-7 mb-7 bg-gradient-to-r from-accent/40 via-border to-transparent"
        />

        {/* System info — terminal key/value */}
        <motion.div
          initial={booted ? undefined : { opacity: 0 }}
          animate={{ opacity: phase >= 2 ? 1 : 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="font-mono text-xs flex flex-col gap-2.5"
        >
          <div className="flex items-baseline gap-4">
            <span className="text-muted/50 w-24 shrink-0">[role]</span>
            <span className="text-accent">{title}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted/50 w-24 shrink-0">[location]</span>
            <span className="text-text/80 flex items-center gap-2">
              <StatusDot status="active" /> {location} &middot; Disponible
            </span>
          </div>
          {(repos || commits) && (
            <div className="flex items-baseline gap-4">
              <span className="text-muted/50 w-24 shrink-0">[stats]</span>
              <span className="text-text/60">
                {repos ?? '—'} repos &nbsp;·&nbsp; {commits ?? '—'} commits
              </span>
            </div>
          )}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={booted ? undefined : { opacity: 0, y: 8 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex flex-wrap gap-3 mt-12"
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-2.5 bg-accent/10 border border-accent/60 text-accent font-mono text-xs rounded hover:bg-accent/20 hover:border-accent transition-all duration-200"
          >
            $ view --projects
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-2.5 border border-white/10 text-muted font-mono text-xs rounded hover:border-white/20 hover:text-text transition-all duration-200"
          >
            $ contact --init
          </button>
        </motion.div>

      </motion.div>{/* end parallax wrapper */}

      {/* Scroll indicator */}
      <button
        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-6 md:left-16 flex items-center gap-3 group cursor-pointer"
        aria-label="Scroll to projects"
      >
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex items-center gap-2"
        >
          <div className="w-6 h-px bg-muted/30 group-hover:bg-accent/60 transition-colors duration-300" />
          <div className="w-1.5 h-1.5 border-r border-b border-muted/40 rotate-[-45deg] group-hover:border-accent/60 transition-colors duration-300" />
        </motion.div>
        <span className="font-mono text-[9px] text-muted/40 tracking-[3px] group-hover:text-accent/60 transition-colors duration-300">
          SCROLL
        </span>
      </button>
    </section>
  )
}
