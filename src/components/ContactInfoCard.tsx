import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface ContactInfoCardProps {
  icon: LucideIcon
  label: string
  value: string
  href?: string
  accent?: boolean
  className?: string
}

export function ContactInfoCard({
  icon: Icon,
  label,
  value,
  href,
  accent = false,
  className,
}: ContactInfoCardProps) {
  const content = (
    <div
      className={cn(
        'border bg-surface rounded-md p-4',
        accent ? 'border-accent' : 'border-border',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-muted shrink-0" />
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {label}
          </div>
          <div className="text-sm text-text mt-0.5">{value}</div>
        </div>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">
        {content}
      </a>
    )
  }

  return content
}
