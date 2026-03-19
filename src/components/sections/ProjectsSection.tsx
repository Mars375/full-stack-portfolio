'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { TerminalCommand } from '@/components/ui/TerminalCommand'
import { TerminalWindow } from '@/components/ui/TerminalWindow'
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
    <section id="projects" className="relative py-32 px-4 min-h-[80vh] flex flex-col justify-center">
      <div className="max-w-3xl mx-auto w-full">
        <TerminalCommand path="~/projects" command="ls --detailed" />

        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
            >
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
            </motion.div>
          </AnimatePresence>

          {/* Carousel navigation */}
          <div className="flex items-center justify-between mt-5">
            <button
              onClick={() => go(-1)}
              className="font-mono text-xs text-muted/50 hover:text-accent transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-3 h-3" /> prev
            </button>

            <div className="flex items-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-200 rounded-full ${
                    i === current
                      ? 'w-5 h-1.5 bg-accent'
                      : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              className="font-mono text-xs text-muted/50 hover:text-accent transition-colors flex items-center gap-1"
            >
              next <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="text-center mt-2 font-mono text-[10px] text-muted/40">
            {current + 1} / {projects.length}
          </div>
        </div>
      </div>
    </section>
  )
}
