import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const statusDotVariants = cva('inline-block rounded-full h-2 w-2 shrink-0', {
  variants: {
    status: {
      active: 'bg-success animate-pulse-dot',
      in_development: 'bg-accent',
      planned: 'bg-muted',
    },
  },
  defaultVariants: {
    status: 'active',
  },
})

interface StatusDotProps extends VariantProps<typeof statusDotVariants> {
  className?: string
}

export function StatusDot({ status, className }: StatusDotProps) {
  return <span className={cn(statusDotVariants({ status }), className)} />
}
