import { StatusDot } from './StatusDot'
import { TechTag } from './TechTag'
import type { Project } from '@/lib/const'
import { cn } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'

interface ProjectCardProps {
  project: Project
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <div
      className={cn(
        'border border-border bg-surface rounded-md p-5 transition-colors duration-200 hover:border-accent',
        className
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <StatusDot status={project.status} />
        <h3 className="font-mono text-sm font-semibold text-text">{project.title}</h3>
      </div>

      <p className="text-sm text-muted mb-4 leading-relaxed">{project.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <TechTag key={t} label={t} />
          ))}
        </div>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent text-xs font-mono flex items-center gap-1 hover:underline shrink-0 ml-3"
          >
            view <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  )
}
