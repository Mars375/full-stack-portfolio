'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, ChevronLeft, ChevronRight, Terminal } from 'lucide-react'
import { TerminalCommand } from '@/components/ui/TerminalCommand'
import { TerminalWindow } from '@/components/ui/TerminalWindow'
import { StatusDot } from '@/components/StatusDot'
import type { Project } from '@/lib/const'

interface ProjectsSectionProps {
  projects: Project[]
}

const statusLabel: Record<string, string> = {
  active: 'ACTIVE',
  in_development: 'IN DEV',
  planned: 'PLANNED',
}

const statusColor: Record<string, string> = {
  active: 'text-success border-success/30 bg-success/5',
  in_development: 'text-accent border-accent/30 bg-accent/5',
  planned: 'text-muted border-muted/30 bg-muted/5',
}

const techColors: Record<string, string> = {
  'next.js': 'bg-white/5 text-white/70 border-white/10',
  'react': 'bg-info/5 text-info/70 border-info/20',
  'typescript': 'bg-info/10 text-info border-info/30',
  'tailwind': 'bg-info/5 text-info/60 border-info/15',
  'docker': 'bg-blue-500/5 text-blue-400/70 border-blue-500/15',
  'n8n': 'bg-error/5 text-error/70 border-error/20',
  'postgresql': 'bg-blue-400/5 text-blue-300/70 border-blue-400/15',
  'linux': 'bg-success/5 text-success/70 border-success/20',
  'restic': 'bg-accent/5 text-accent/70 border-accent/20',
  'caddy': 'bg-success/5 text-success/60 border-success/15',
  'framer-motion': 'bg-purple-500/5 text-purple-400/70 border-purple-500/15',
  'node.js': 'bg-success/8 text-success/80 border-success/25',
}

const defaultTechColor = 'bg-white/5 text-white/50 border-white/10'

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const go = (dir: number) => {
    setDirection(dir)
    setCurrent((c) => (c + dir + projects.length) % projects.length)
  }

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  const project = projects[current]

  return (
    <section id="projects" className="relative min-h-screen flex flex-col justify-center py-20 px-4 md:px-16">
      <div className="max-w-6xl mx-auto w-full">
        <TerminalCommand path="~/projects" command="ls --detailed" />

        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

                {/* Left — terminal card */}
                <div className="lg:col-span-3">
                  <TerminalWindow path={`~/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="text-success text-xs">$ <span className="text-text">cat README.md</span></div>

                    <div className="mt-4 flex items-center gap-2">
                      <StatusDot status={project.status} />
                      <span className={`font-mono text-[9px] tracking-widest px-2 py-0.5 rounded border ${statusColor[project.status]}`}>
                        {statusLabel[project.status]}
                      </span>
                    </div>

                    <h2 className="text-xl font-semibold text-text mt-3 leading-tight">{project.title}</h2>
                    <p className="text-sm text-muted/80 mt-2 leading-relaxed">{project.description}</p>

                    <div className="mt-6 text-success text-xs">$ <span className="text-text">jq &apos;.tech&apos; package.json</span></div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className={`font-mono text-[10px] px-2 py-0.5 rounded border ${techColors[t] ?? defaultTechColor}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 text-success text-xs">$ <span className="text-text">git log --oneline -3</span></div>
                    <div className="mt-1.5 flex flex-col gap-1 font-mono text-xs">
                      <div><span className="text-accent">a3f21b4</span><span className="text-muted ml-2">feat: latest update</span></div>
                      <div><span className="text-accent/60">9d1c3e2</span><span className="text-muted/50 ml-2">chore: housekeeping</span></div>
                      <div><span className="text-accent/40">f2a8b91</span><span className="text-muted/40 ml-2">fix: edge case</span></div>
                    </div>

                    {(project.github || project.demo) && (
                      <div className="mt-6 pt-4 border-t border-border flex gap-4">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-info hover:text-info/80 text-xs font-mono transition-colors">
                            <Github className="w-3.5 h-3.5" /> source
                          </a>
                        )}
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-info hover:text-info/80 text-xs font-mono transition-colors">
                            <ExternalLink className="w-3.5 h-3.5" /> live demo
                          </a>
                        )}
                      </div>
                    )}
                  </TerminalWindow>
                </div>

                {/* Right — visual panel */}
                <div className="lg:col-span-2 flex flex-col gap-4">

                  {/* Preview area */}
                  <div className="flex-1 bg-surface border border-border rounded-lg overflow-hidden flex flex-col min-h-[240px]">
                    {/* Fake browser bar */}
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-surface-hover">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-error/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-accent/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-success/50" />
                      </div>
                      <div className="flex-1 mx-2 bg-bg rounded px-2 py-0.5 font-mono text-[9px] text-muted/50 truncate">
                        {project.demo ?? project.github ?? `~/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                      </div>
                    </div>

                    {/* Content area */}
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 relative overflow-hidden">
                      {/* Ambient glow behind icon */}
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{ background: 'radial-gradient(circle at 50% 40%, rgba(232,168,73,0.15) 0%, transparent 65%)' }}
                      />
                      <Terminal className="w-10 h-10 text-accent/40 relative z-10" />
                      <div className="font-mono text-xs text-muted/40 relative z-10">{project.title}</div>
                      <div className={`font-mono text-[9px] tracking-widest px-3 py-1 rounded-full border relative z-10 ${statusColor[project.status]}`}>
                        {statusLabel[project.status]}
                      </div>
                    </div>
                  </div>

                  {/* Stats / meta */}
                  <div className="bg-surface border border-border rounded-lg p-4 font-mono text-xs flex flex-col gap-2.5">
                    <div className="flex justify-between items-baseline">
                      <span className="text-muted/50">stack</span>
                      <span className="text-text/70">{project.tech.length} technologies</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-muted/50">status</span>
                      <span className={statusColor[project.status].split(' ')[0]}>{statusLabel[project.status]}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-muted/50">index</span>
                      <span className="text-text/50">{current + 1} / {projects.length}</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => go(-1)}
              className="font-mono text-xs text-muted/50 hover:text-accent transition-colors flex items-center gap-1.5 group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> prev
            </button>

            <div className="flex items-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-200 rounded-full ${
                    i === current
                      ? 'w-6 h-1.5 bg-accent shadow-[0_0_6px_var(--accent)]'
                      : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              className="font-mono text-xs text-muted/50 hover:text-accent transition-colors flex items-center gap-1.5 group"
            >
              next <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
