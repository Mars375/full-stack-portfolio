import type { Metadata } from 'next'
import { techStack } from '@/lib/const'
import { SectionHeader } from '@/components/SectionHeader'
import { TechTag } from '@/components/TechTag'

export const metadata: Metadata = {
  title: 'About',
  description: 'Full Stack Developer & Automation Specialist base a Paris.',
}

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <p className="font-mono text-xs text-muted mb-8">~/loic/about</p>

      <section className="mb-12">
        <SectionHeader label="BIO" />
        <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-muted">
          <p>
            Dev <span className="text-text font-medium">full stack</span> base a Paris, specialise en{' '}
            <span className="text-accent font-medium">automation</span> et infrastructure.
          </p>
          <p>
            Je concois des systemes qui tournent sans intervention — du homelab Docker aux
            workflows n8n, en passant par les pipelines CI/CD et les backups automatises.
          </p>
          <p>
            Quand je ne code pas, je construis des outils pour que les choses se fassent toutes seules.
          </p>
        </div>
      </section>

      <section>
        <SectionHeader label="STACK" />
        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries(techStack).map(([category, tools]) => (
            <div key={category} className="border border-border bg-surface rounded-md p-4">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3">
                {category}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tools.map((tool) => (
                  <TechTag key={tool} label={tool} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
