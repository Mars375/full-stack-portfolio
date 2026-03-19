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
  // Content drifts upward at 40% of scroll speed — visible parallax effect
  const contentY = useTransform(scrollY, [0, 800], [0, -120])

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
        if (time - lastTime >= 60) {
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
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Scanline */}
      {!booted && phase >= 1 && phase < 3 && (
        <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
          <div className="absolute left-0 right-0 h-px bg-accent/60 animate-scanline" />
        </div>
      )}

      {/* Parallax content wrapper */}
      <motion.div style={{ y: contentY }} className="flex flex-col items-center">

      {/* Init text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        className="font-mono text-[10px] text-muted tracking-[3px] mb-10 h-4"
      >
        {!booted && phase >= 1 && (
          <TypingEffect text="INITIALIZING SESSION..." speed={30} />
        )}
      </motion.div>

      {/* Whoami command */}
      <motion.div
        initial={booted ? undefined : { opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="font-mono text-xs text-success mb-6"
      >
        $ whoami
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={booted ? undefined : { opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 1 : 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="text-5xl md:text-6xl font-extralight text-text tracking-tight text-center"
      >
        {typedName}
        {!nameReady && <span className="animate-blink font-mono">_</span>}
      </motion.h1>

      {/* Title */}
      <motion.p
        initial={booted ? undefined : { opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 1 : 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="font-mono text-sm text-accent mt-5 text-center"
      >
        {title}
      </motion.p>

      {/* Location */}
      <motion.p
        initial={booted ? undefined : { opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 1 : 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="font-mono text-[11px] text-muted mt-3 flex items-center gap-2"
      >
        <StatusDot status="active" /> {location} &middot; Disponible
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={booted ? undefined : { opacity: 0, y: 10 }}
        animate={{ opacity: phase >= 3 ? 1 : 0, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex gap-3 mt-12"
      >
        <button
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          className="px-5 py-2 border border-accent text-accent font-mono text-xs rounded hover:bg-accent/10 transition-colors"
        >
          $ view --projects
        </button>
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="px-5 py-2 border border-border text-muted font-mono text-xs rounded hover:border-muted hover:text-text transition-colors"
        >
          $ contact --init
        </button>
      </motion.div>

      {/* Metrics */}
      <motion.div
        initial={booted ? undefined : { opacity: 0 }}
        animate={{ opacity: phase >= 3 ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="flex gap-12 mt-16 font-mono text-xs"
      >
        <div className="text-center">
          <div className="text-2xl font-light text-text">{repos ?? '\u2014'}</div>
          <div className="text-muted mt-1">repos</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-light text-text">{commits ?? '\u2014'}</div>
          <div className="text-muted mt-1">commits</div>
        </div>
      </motion.div>

      </motion.div>{/* end parallax wrapper */}

      {/* Scroll indicator — animated + clickable */}
      <button
        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer"
        aria-label="Scroll to projects"
      >
        <span className="font-mono text-[8px] text-muted tracking-[3px] group-hover:text-accent transition-colors duration-300">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-0.5"
        >
          <div className="w-px h-5 bg-gradient-to-b from-muted/60 to-transparent group-hover:from-accent/60 transition-colors duration-300" />
          <div className="w-1.5 h-1.5 border-r border-b border-muted/50 rotate-45 -mt-1 group-hover:border-accent/60 transition-colors duration-300" />
        </motion.div>
      </button>
    </section>
  )
}
