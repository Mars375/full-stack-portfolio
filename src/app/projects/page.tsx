import type { Metadata } from 'next'
import { projects } from '@/lib/const'
import { SectionHeader } from '@/components/SectionHeader'
import { ProjectsAnimated } from './projects-animated'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Active systems, projects in development, and planned builds.',
}

export default function ProjectsPage() {
  const active = projects.filter((p) => p.status === 'active')
  const inDev = projects.filter((p) => p.status === 'in_development')
  const planned = projects.filter((p) => p.status === 'planned')

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <p className="font-mono text-xs text-muted mb-8">~/loic/projects</p>

      {active.length > 0 && (
        <section className="mb-12">
          <SectionHeader label="ACTIVE SYSTEMS" />
          <ProjectsAnimated projects={active} />
        </section>
      )}

      {inDev.length > 0 && (
        <section className="mb-12">
          <SectionHeader label="IN DEVELOPMENT" />
          <ProjectsAnimated projects={inDev} />
        </section>
      )}

      {planned.length > 0 && (
        <section className="mb-12">
          <SectionHeader label="PLANNED" />
          <ProjectsAnimated projects={planned} />
        </section>
      )}
    </div>
  )
}
