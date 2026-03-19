# Terminal Horizon — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the multi-page portfolio into a single-page scroll experience with parallax and terminal aesthetics.

**Architecture:** Replace 4 route pages with section components assembled in a single `page.tsx`. Effect components (parallax, typing, scroll-reveal) wrap section content. The data layer and backend (Supabase, Resend, GitHub API) remain unchanged.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 3, Framer Motion 11, Zod, Supabase, Resend

**Spec:** `docs/superpowers/specs/2026-03-19-terminal-horizon-redesign.md`

---

## Task 1: Foundation — CSS, Tailwind, const.ts, next.config

**Files:**
- Modify: `src/app/globals.css`
- Modify: `tailwind.config.js`
- Modify: `src/lib/const.ts`
- Modify: `next.config.js`

- [ ] **Step 1: Add `--info` variable and update globals.css**

In `src/app/globals.css`, add `--info` to `:root` and replace the `.bg-grid` class with a dot pattern. Add new animation keyframes:

```css
/* In :root, after --error */
--info: #89b4fa;

/* Replace .bg-grid with dot pattern */
.bg-grid {
  background-image: radial-gradient(var(--border) 1px, transparent 1px);
  background-size: 30px 30px;
}

/* Add new keyframes */
@keyframes blink-cursor {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.animate-blink {
  animation: blink-cursor 1s step-end infinite;
}
```

- [ ] **Step 2: Add `info` color to Tailwind config**

In `tailwind.config.js`, add to `colors`:
```js
info: 'var(--info)',
```

- [ ] **Step 3: Update navLinks in const.ts**

Replace the current `navLinks` array:
```ts
export const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
]
```

- [ ] **Step 4: Add redirects in next.config.js**

```js
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: 'github.com' },
      { hostname: 'raw.githubusercontent.com' },
    ],
  },
  async redirects() {
    return [
      { source: '/projects', destination: '/#projects', permanent: true },
      { source: '/about', destination: '/#stack', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
    ]
  },
}
```

- [ ] **Step 5: Verify build**

Run: `cd /mnt/shared-storage/openclaw/workspace-portfolio-2026 && npm run build`
Expected: Build succeeds (redirects won't break even though routes still exist)

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css tailwind.config.js src/lib/const.ts next.config.js
git commit -m "chore: update foundation — CSS vars, tailwind, navLinks, redirects"
```

---

## Task 2: Effect Components

**Files:**
- Create: `src/components/effects/ParallaxLayer.tsx`
- Create: `src/components/effects/ScrollReveal.tsx`
- Create: `src/components/effects/TypingEffect.tsx`
- Create: `src/components/effects/HorizonLine.tsx`

- [ ] **Step 1: Create ParallaxLayer**

```tsx
'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxLayerProps {
  speed?: number
  children: React.ReactNode
  className?: string
}

export function ParallaxLayer({ speed = 0.5, children, className }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`])

  return (
    <motion.div
      ref={ref}
      style={prefersReduced ? undefined : { y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Create ScrollReveal**

```tsx
'use client'

import { motion } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'right'
  className?: string
}

export function ScrollReveal({ children, delay = 0, direction = 'up', className }: ScrollRevealProps) {
  const initial = direction === 'up'
    ? { opacity: 0, y: 20 }
    : { opacity: 0, x: 30 }

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 3: Create TypingEffect**

```tsx
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface TypingEffectProps {
  text: string
  delay?: number
  speed?: number
  onComplete?: () => void
  className?: string
}

export function TypingEffect({ text, delay = 0, speed = 40, onComplete, className }: TypingEffectProps) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const hasRun = useRef(false)

  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  const startTyping = useCallback(() => {
    if (hasRun.current) return
    hasRun.current = true

    if (prefersReduced) {
      setDisplayed(text)
      setDone(true)
      onComplete?.()
      return
    }

    setTimeout(() => {
      setStarted(true)
      let i = 0
      let lastTime = 0

      const step = (time: number) => {
        if (!lastTime) lastTime = time
        if (time - lastTime >= speed) {
          i++
          setDisplayed(text.slice(0, i))
          lastTime = time
        }
        if (i < text.length) {
          requestAnimationFrame(step)
        } else {
          setDone(true)
          onComplete?.()
        }
      }

      requestAnimationFrame(step)
    }, delay)
  }, [text, delay, speed, onComplete, prefersReduced])

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) startTyping() },
      { threshold: 0.5 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [startTyping])

  return (
    <span ref={ref} className={className}>
      {prefersReduced ? text : displayed}
      {started && !done && <span className="animate-blink">&#x2588;</span>}
    </span>
  )
}
```

- [ ] **Step 4: Create HorizonLine**

```tsx
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export function HorizonLine() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '60vh'])

  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  return (
    <motion.div
      style={prefersReduced ? undefined : { y }}
      className="fixed left-0 right-0 top-[40vh] h-px z-0 pointer-events-none"
    >
      <div className="w-full h-full bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    </motion.div>
  )
}
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: Build succeeds. Components are tree-shakeable (not imported yet).

- [ ] **Step 6: Commit**

```bash
git add src/components/effects/
git commit -m "feat: add effect components — ParallaxLayer, ScrollReveal, TypingEffect, HorizonLine"
```

---

## Task 3: UI Components

**Files:**
- Create: `src/components/ui/TerminalWindow.tsx`
- Create: `src/components/ui/TerminalCommand.tsx`
- Create: `src/components/ui/ScrollDots.tsx`

- [ ] **Step 1: Create TerminalWindow**

```tsx
import { cn } from '@/lib/utils'

interface TerminalWindowProps {
  path: string
  children: React.ReactNode
  className?: string
}

export function TerminalWindow({ path, children, className }: TerminalWindowProps) {
  return (
    <div className={cn('bg-surface border border-border rounded-lg overflow-hidden', className)}>
      {/* Title bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-bg border-b border-border">
        <div className="w-2.5 h-2.5 rounded-full bg-error/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-accent/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-success/80" />
        <span className="ml-2 font-mono text-[10px] text-muted">{path}</span>
      </div>
      {/* Content */}
      <div className="p-4 font-mono text-[11px] leading-relaxed sm:text-xs">
        {children}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create TerminalCommand**

```tsx
'use client'

import { TypingEffect } from '@/components/effects/TypingEffect'

interface TerminalCommandProps {
  user?: string
  host?: string
  path?: string
  command: string
  delay?: number
  onComplete?: () => void
}

export function TerminalCommand({
  user = 'loic',
  host = 'cortex',
  path = '~',
  command,
  delay = 0,
  onComplete,
}: TerminalCommandProps) {
  return (
    <div className="font-mono text-xs mb-6">
      <span className="text-success">{user}@{host}</span>
      <span className="text-muted">:</span>
      <span className="text-info">{path}</span>
      <span className="text-text"> $ </span>
      <TypingEffect text={command} delay={delay} speed={35} onComplete={onComplete} />
    </div>
  )
}
```

- [ ] **Step 3: Create ScrollDots**

```tsx
'use client'

import { useState, useEffect } from 'react'
import { navLinks } from '@/lib/const'

export function ScrollDots() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col gap-3 items-center">
      {navLinks.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          className="group relative flex items-center"
          aria-label={`Scroll to ${label}`}
        >
          <span className="absolute right-6 font-mono text-[9px] text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {label}
          </span>
          <div
            className={`rounded-full transition-all ${
              active === id
                ? 'w-2 h-2 bg-accent shadow-[0_0_6px_var(--accent)]'
                : 'w-1.5 h-1.5 bg-muted/40 hover:bg-muted'
            }`}
          />
        </button>
      ))}
    </nav>
  )
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add UI components — TerminalWindow, TerminalCommand, ScrollDots"
```

---

## Task 4: HeroSection

**Files:**
- Create: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1: Create HeroSection**

```tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TypingEffect } from '@/components/effects/TypingEffect'
import { StatusDot } from '@/components/StatusDot'

interface HeroSectionProps {
  name: string
  title: string
  description: string
  location: string
  repos: number | null
  commits: number | null
}

export function HeroSection({ name, title, description, location, repos, commits }: HeroSectionProps) {
  const [booted, setBooted] = useState(true)
  const [phase, setPhase] = useState(3)
  const [typedName, setTypedName] = useState(name)
  const [nameReady, setNameReady] = useState(true)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasBooted = sessionStorage.getItem('booted')

    if (hasBooted || prefersReduced) return

    setBooted(false)
    setPhase(0)
    setTypedName('')
    setNameReady(false)

    setTimeout(() => setPhase(1), 50)

    setTimeout(() => {
      setPhase(2)
      let i = 0
      let lastTime = 0
      const throttled = (time: number) => {
        if (!lastTime) lastTime = time
        if (time - lastTime >= 60) {
          i++
          setTypedName(name.slice(0, i))
          lastTime = time
        }
        if (i < name.length) requestAnimationFrame(throttled)
        else setNameReady(true)
      }
      requestAnimationFrame(throttled)
    }, 400)

    setTimeout(() => {
      setPhase(3)
      setBooted(true)
      sessionStorage.setItem('booted', '1')
    }, 1800)
  }, [name])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4">
      {/* Scanline */}
      {!booted && phase >= 1 && phase < 3 && (
        <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
          <div className="absolute left-0 right-0 h-px bg-accent/60 animate-scanline" />
        </div>
      )}

      {/* Init text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        className="font-mono text-[10px] text-muted tracking-[3px] mb-6 h-4"
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
        className="font-mono text-xs text-success mb-4"
      >
        $ whoami
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={booted ? undefined : { opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 1 : 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="text-4xl md:text-5xl font-extralight text-text tracking-tight text-center"
      >
        {typedName}
        {!nameReady && <span className="animate-blink font-mono">_</span>}
      </motion.h1>

      {/* Title */}
      <motion.p
        initial={booted ? undefined : { opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 1 : 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="font-mono text-sm text-accent mt-3 text-center"
      >
        {title}
      </motion.p>

      {/* Location */}
      <motion.p
        initial={booted ? undefined : { opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 1 : 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="font-mono text-[11px] text-muted mt-2 flex items-center gap-2"
      >
        <StatusDot status="active" /> {location} &middot; Disponible
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={booted ? undefined : { opacity: 0, y: 10 }}
        animate={{ opacity: phase >= 3 ? 1 : 0, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex gap-3 mt-8"
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
        className="flex gap-8 mt-12 font-mono text-xs"
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <span className="font-mono text-[8px] text-muted tracking-[3px]">SCROLL</span>
        <div className="w-px h-4 bg-gradient-to-b from-muted to-transparent" />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/HeroSection.tsx
git commit -m "feat: add HeroSection with boot animation and terminal aesthetics"
```

---

## Task 5: ProjectsSection

**Files:**
- Create: `src/components/sections/ProjectsSection.tsx`

- [ ] **Step 1: Create ProjectsSection**

```tsx
'use client'

import { ExternalLink } from 'lucide-react'
import { TerminalCommand } from '@/components/ui/TerminalCommand'
import { TerminalWindow } from '@/components/ui/TerminalWindow'
import { ScrollReveal } from '@/components/effects/ScrollReveal'
import { StatusDot } from '@/components/StatusDot'
import type { Project } from '@/lib/const'

interface ProjectsSectionProps {
  projects: Project[]
}

const statusLabel: Record<string, string> = {
  active: 'ACTIVE',
  in_development: 'DEV',
  planned: 'PLANNED',
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="relative py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <TerminalCommand path="~/projects" command="ls --detailed" />

        <div className="flex flex-col gap-4">
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 0.15} direction="right">
              <TerminalWindow path={`~/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}>
                {/* cat README.md */}
                <div className="text-success">$ <span className="text-text">cat README.md</span></div>
                <div className="mt-2 flex items-center gap-2">
                  <StatusDot status={project.status} />
                  <span className="text-[9px] text-muted font-mono tracking-wider">
                    {statusLabel[project.status]}
                  </span>
                </div>
                <div className="text-sm font-semibold text-text mt-1">{project.title}</div>
                <div className="text-muted mt-1">{project.description}</div>

                {/* jq .tech */}
                <div className="mt-4 text-success">$ <span className="text-text">jq &apos;.tech&apos; package.json</span></div>
                <div className="text-accent mt-1">
                  [{project.tech.map((t, j) => (
                    <span key={t}>
                      &quot;{t}&quot;{j < project.tech.length - 1 ? ', ' : ''}
                    </span>
                  ))}]
                </div>

                {/* git log */}
                <div className="mt-4 text-success">$ <span className="text-text">git log --oneline -1</span></div>
                <div className="mt-1">
                  <span className="text-accent">a3f21b4</span>
                  <span className="text-text ml-2">latest commit</span>
                </div>

                {/* Links */}
                {(project.github || project.demo) && (
                  <div className="mt-4 flex gap-4">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="text-info hover:underline flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" /> github
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer"
                        className="text-info hover:underline flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" /> demo
                      </a>
                    )}
                  </div>
                )}
              </TerminalWindow>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/ProjectsSection.tsx
git commit -m "feat: add ProjectsSection with terminal window cards"
```

---

## Task 6: StackSection

**Files:**
- Create: `src/components/sections/StackSection.tsx`

- [ ] **Step 1: Create StackSection**

```tsx
'use client'

import { TerminalCommand } from '@/components/ui/TerminalCommand'
import { ScrollReveal } from '@/components/effects/ScrollReveal'

interface StackSectionProps {
  techStack: Record<string, string[]>
}

const categoryColors: Record<string, string> = {
  FRONTEND: 'text-accent',
  BACKEND: 'text-success',
  AUTOMATION: 'text-error',
  TOOLS: 'text-info',
}

export function StackSection({ techStack }: StackSectionProps) {
  return (
    <section id="stack" className="relative py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <TerminalCommand command="cat skills.json | jq" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(techStack).map(([category, items], i) => (
            <ScrollReveal key={category} delay={i * 0.1}>
              <div className="bg-surface border border-border rounded-lg p-4">
                <div className={`font-mono text-[10px] tracking-[2px] mb-3 ${categoryColors[category] ?? 'text-muted'}`}>
                  {category}
                </div>
                <div className="flex flex-col gap-1.5 font-mono text-xs text-text">
                  {items.map((item) => (
                    <div key={item}>{'\u25b8'} {item}</div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/StackSection.tsx
git commit -m "feat: add StackSection with categorized tech grid"
```

---

## Task 7: ContactSection + Footer

**Files:**
- Create: `src/components/sections/ContactSection.tsx`
- Create: `src/components/sections/Footer.tsx`
- Modify: `src/components/ContactForm.tsx` (restyle for terminal look)

- [ ] **Step 1: Restyle ContactForm for terminal look**

In `src/components/ContactForm.tsx`, update the form markup (keep all logic, useActionState, toast unchanged):
- Wrap form in `bg-surface border border-border rounded-lg p-6`
- Labels: `font-mono text-[11px] text-muted` with lowercase field names (`name:`, `email:`, `message:`)
- Inputs: `bg-bg` background, `font-mono`, placeholder `_`
- Button: `$ send --message` text, right-aligned, `bg-accent text-bg font-mono text-xs`

- [ ] **Step 2: Create ContactSection**

```tsx
'use client'

import { TerminalCommand } from '@/components/ui/TerminalCommand'
import { ContactForm } from '@/components/ContactForm'
import { ScrollReveal } from '@/components/effects/ScrollReveal'

interface ContactSectionProps {
  github: string
  email: string
}

export function ContactSection({ github, email }: ContactSectionProps) {
  return (
    <section id="contact" className="relative py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <TerminalCommand command="contact --init" />

        <ScrollReveal>
          <ContactForm />
        </ScrollReveal>

        {/* Fallback links */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap gap-6 mt-8 font-mono text-xs">
            <a href={github} target="_blank" rel="noopener noreferrer"
              className="text-muted hover:text-text transition-colors">
              {'\u2192'} <span className="text-info">{github.replace('https://', '')}</span>
            </a>
            <a href={`mailto:${email}`}
              className="text-muted hover:text-text transition-colors">
              {'\u2192'} <span className="text-info">{email}</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create Footer**

```tsx
import Link from 'next/link'
import { StatusDot } from '@/components/StatusDot'

export function Footer() {
  return (
    <footer id="footer" className="relative border-t border-border py-8 px-4">
      {/* Horizon line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-muted">
        <div className="flex items-center gap-2">
          <StatusDot status="active" />
          <span>SYSTEM OPERATIONAL</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{'\u00a9'} {new Date().getFullYear()} Lo{'\u00ef'}c Rossi</span>
          <Link href="/legal" className="hover:text-accent transition-colors">
            /legal
          </Link>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/ContactSection.tsx src/components/sections/Footer.tsx src/components/ContactForm.tsx
git commit -m "feat: add ContactSection and Footer with terminal styling"
```

---

## Task 8: Assemble — page.tsx + layout.tsx

**Files:**
- Rewrite: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Rewrite page.tsx**

Replace entire content of `src/app/page.tsx` with:

```tsx
import { fetchGitHubMetrics } from '@/lib/github'
import { siteConfig, projects, techStack } from '@/lib/const'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { StackSection } from '@/components/sections/StackSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { Footer } from '@/components/sections/Footer'
import { ScrollDots } from '@/components/ui/ScrollDots'
import { HorizonLine } from '@/components/effects/HorizonLine'
import { ParallaxLayer } from '@/components/effects/ParallaxLayer'

export const revalidate = 3600

export default async function HomePage() {
  const metrics = await fetchGitHubMetrics()

  return (
    <>
      {/* Background layers */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <ParallaxLayer speed={-0.2}>
          <div className="w-full h-[200vh] bg-grid opacity-[0.03]" />
        </ParallaxLayer>
      </div>
      <HorizonLine />

      {/* Navigation */}
      <ScrollDots />

      {/* Sections */}
      <HeroSection
        name={siteConfig.name}
        title={siteConfig.title}
        description={siteConfig.description}
        location={siteConfig.location}
        repos={metrics.repos}
        commits={metrics.commits}
      />
      <ProjectsSection projects={projects} />
      <StackSection techStack={techStack} />
      <ContactSection github={siteConfig.github} email={siteConfig.email} />
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Update layout.tsx**

Remove Navbar and Footer imports/renders, remove `pt-14` from main, remove `flex flex-col` from body:
- Delete: `import { Navbar } from '@/components/Navbar'`
- Delete: `import { Footer } from '@/components/Footer'`
- Delete: `<Navbar />`
- Delete: `<Footer />`
- Change: `<main className="flex-1 pt-14">` to `<main>`
- Change: `<body className="font-sans antialiased min-h-screen flex flex-col">` to `<body className="font-sans antialiased min-h-screen">`

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds. May have warnings about unused old files.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/app/layout.tsx
git commit -m "feat: assemble single-page portfolio with all sections"
```

---

## Task 9: Delete Old Files + Remove Unused Deps

**Files to delete:**
- `src/app/projects/` (entire directory)
- `src/app/about/` (entire directory)
- `src/app/contact/` (entire directory)
- `src/app/hero-client.tsx`
- `src/components/Navbar.tsx`
- `src/components/ProjectCard.tsx`
- `src/components/ProjectsAnimated.tsx`
- `src/components/MetricCard.tsx`
- `src/components/SectionHeader.tsx`
- `src/components/ContactInfoCard.tsx`
- `src/components/Footer.tsx` (old, replaced by sections/Footer.tsx)

- [ ] **Step 1: Delete old files**

```bash
cd /mnt/shared-storage/openclaw/workspace-portfolio-2026
rm -rf src/app/projects src/app/about src/app/contact
rm -f src/app/hero-client.tsx
rm -f src/components/Navbar.tsx src/components/ProjectCard.tsx src/components/ProjectsAnimated.tsx
rm -f src/components/MetricCard.tsx src/components/SectionHeader.tsx src/components/ContactInfoCard.tsx
rm -f src/components/Footer.tsx
```

- [ ] **Step 2: Remove unused deps**

```bash
npm uninstall react-hook-form @hookform/resolvers
```

- [ ] **Step 3: Verify clean build**

Run: `npm run build`
Expected: Builds with zero errors. `/` renders single-page, `/legal` works, `/projects` redirects.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: delete old multi-page components and unused deps"
```

---

## Task 10: Push + Deploy + Verify

- [ ] **Step 1: Full build check**

```bash
npm run build
```

- [ ] **Step 2: Push to GitHub**

```bash
git push origin main
```

- [ ] **Step 3: Verify Vercel deployment reaches READY**

Use Vercel MCP `list_deployments` to confirm state is READY.

- [ ] **Step 4: Visual verification checklist**

Open production URL and verify:
- Boot animation plays on first visit
- All 4 sections visible on scroll
- Terminal windows render with traffic light dots
- Typing effects fire on viewport entry
- Navigation dots work on desktop
- Horizon line moves with parallax
- Contact form submits successfully (Supabase + Resend)
- `/projects`, `/about`, `/contact` redirect to `/#section`
- `/legal` still works as standalone page
- Mobile: single column, no nav dots, form works

---

**Total: 10 tasks, ~40 steps.**
