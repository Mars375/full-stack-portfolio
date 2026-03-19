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
