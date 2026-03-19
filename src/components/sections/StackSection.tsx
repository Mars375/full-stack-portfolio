'use client'

import { TerminalCommand } from '@/components/ui/TerminalCommand'
import { ScrollReveal } from '@/components/effects/ScrollReveal'

interface StackSectionProps {
  techStack: Record<string, string[]>
}

const categoryMeta: Record<string, { color: string; badge: string; glow: string; desc: string }> = {
  FRONTEND: {
    color: 'text-accent border-accent/30',
    badge: 'bg-accent/8 text-accent/80 border-accent/20 hover:bg-accent/15',
    glow: 'rgba(232,168,73,0.06)',
    desc: 'Interfaces & expérience utilisateur',
  },
  BACKEND: {
    color: 'text-success border-success/30',
    badge: 'bg-success/8 text-success/80 border-success/20 hover:bg-success/15',
    glow: 'rgba(166,227,161,0.06)',
    desc: 'APIs, bases de données, runtime',
  },
  AUTOMATION: {
    color: 'text-error border-error/30',
    badge: 'bg-error/8 text-error/80 border-error/20 hover:bg-error/15',
    glow: 'rgba(243,139,168,0.06)',
    desc: 'Pipelines, CI/CD, infra',
  },
  TOOLS: {
    color: 'text-info border-info/30',
    badge: 'bg-info/8 text-info/80 border-info/20 hover:bg-info/15',
    glow: 'rgba(137,180,250,0.06)',
    desc: 'Workflow & environnement',
  },
}

export function StackSection({ techStack }: StackSectionProps) {
  const totalSkills = Object.values(techStack).flat().length
  const categories = Object.entries(techStack)

  return (
    <section id="stack" className="relative min-h-screen flex flex-col justify-center py-20 px-4 md:px-16">
      <div className="max-w-6xl mx-auto w-full">
        <TerminalCommand command="cat skills.json | jq" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Left — 2×2 category grid */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map(([category, items], i) => {
              const meta = categoryMeta[category] ?? {
                color: 'text-muted border-muted/30',
                badge: 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10',
                glow: 'rgba(255,255,255,0.03)',
                desc: '',
              }
              return (
                <ScrollReveal key={category} delay={i * 0.08} className="h-full">
                  <div
                    className="relative bg-surface border border-border rounded-lg p-5 h-full overflow-hidden flex flex-col gap-4"
                  >
                    {/* Ambient glow */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: `radial-gradient(circle at 0% 0%, ${meta.glow} 0%, transparent 60%)` }}
                    />

                    {/* Header */}
                    <div className="relative">
                      <div className={`font-mono text-[10px] tracking-[3px] font-medium ${meta.color.split(' ')[0]}`}>
                        {category}
                      </div>
                      <div className="font-mono text-[9px] text-muted/50 mt-0.5">{meta.desc}</div>
                    </div>

                    {/* Skill pills */}
                    <div className="relative flex flex-wrap gap-1.5">
                      {items.map((item) => (
                        <span
                          key={item}
                          className={`font-mono text-[10px] px-2 py-0.5 rounded border transition-colors duration-200 ${meta.badge}`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Count */}
                    <div className={`relative mt-auto font-mono text-[9px] ${meta.color.split(' ')[0]} opacity-40`}>
                      {items.length} skills
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>

          {/* Right — summary panel */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Aggregate stats */}
            <ScrollReveal delay={0.1} className="flex-1">
              <div className="bg-surface border border-border rounded-lg p-5 h-full flex flex-col gap-5 relative overflow-hidden">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 100% 100%, rgba(232,168,73,0.05) 0%, transparent 60%)' }}
                />

                <div className="font-mono text-[10px] text-muted/50 tracking-[2px]">OVERVIEW</div>

                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-baseline font-mono text-xs">
                    <span className="text-muted/60">total skills</span>
                    <span className="text-accent text-lg font-light">{totalSkills}</span>
                  </div>
                  <div className="flex justify-between items-baseline font-mono text-xs">
                    <span className="text-muted/60">categories</span>
                    <span className="text-text/70">{categories.length}</span>
                  </div>
                  {categories.map(([cat, items]) => {
                    const meta = categoryMeta[cat]
                    const pct = Math.round((items.length / totalSkills) * 100)
                    return (
                      <div key={cat} className="flex flex-col gap-1">
                        <div className="flex justify-between font-mono text-[10px]">
                          <span className={meta?.color.split(' ')[0] ?? 'text-muted'}>{cat}</span>
                          <span className="text-muted/40">{pct}%</span>
                        </div>
                        <div className="h-px bg-border overflow-hidden rounded-full">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              cat === 'FRONTEND' ? 'bg-accent/60' :
                              cat === 'BACKEND' ? 'bg-success/60' :
                              cat === 'AUTOMATION' ? 'bg-error/60' :
                              'bg-info/60'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-auto font-mono text-[9px] text-muted/30 leading-relaxed">
                  $ skills --format json<br />
                  <span className="text-muted/20">→ {totalSkills} entries found</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Currently learning */}
            <ScrollReveal delay={0.2}>
              <div className="bg-surface border border-border rounded-lg p-4 font-mono text-xs flex flex-col gap-2">
                <div className="text-muted/50 text-[10px] tracking-[2px]">LEARNING</div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {['rust', 'k8s', 'terraform'].map((item) => (
                    <span key={item} className="text-[10px] px-2 py-0.5 rounded border border-dashed border-muted/20 text-muted/40">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  )
}
