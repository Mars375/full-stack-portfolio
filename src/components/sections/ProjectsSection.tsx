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
