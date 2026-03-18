import { cn } from '@/lib/utils'

interface TechTagProps {
  label: string
  className?: string
}

export function TechTag({ label, className }: TechTagProps) {
  return (
    <span
      className={cn(
        'inline-block font-mono text-xs px-2 py-0.5 border border-border rounded-sm text-muted',
        className
      )}
    >
      {label}
    </span>
  )
}
