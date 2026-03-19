import { cn } from '@/lib/utils'

interface TerminalWindowProps {
  path: string
  children: React.ReactNode
  className?: string
}

export function TerminalWindow({ path, children, className }: TerminalWindowProps) {
  return (
    <div className={cn('bg-surface border border-border rounded-lg overflow-hidden', className)}>
      {/* Title bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-bg border-b border-border">
        <div className="w-2.5 h-2.5 rounded-full bg-error/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-accent/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-success/80" />
        <span className="ml-2 font-mono text-[10px] text-muted">{path}</span>
      </div>
      {/* Content */}
      <div className="p-4 font-mono text-[11px] leading-relaxed sm:text-xs">
        {children}
      </div>
    </div>
  )
}
