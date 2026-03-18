import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  label: string
  className?: string
}

export function SectionHeader({ label, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center gap-3 mb-6', className)}>
      <span className="font-mono text-xs tracking-widest uppercase text-muted whitespace-nowrap">
        &#9656; {label}
      </span>
      <div className="flex-1 h-px bg-border" />
    </div>
  )
}
