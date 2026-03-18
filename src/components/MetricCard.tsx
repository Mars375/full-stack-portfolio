'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  value: number | string | null
  label: string
  suffix?: string
  className?: string
}

export function MetricCard({ value, label, suffix = '', className }: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState(0)

  const numericValue = typeof value === 'number' ? value : null

  useEffect(() => {
    if (!isInView || numericValue === null) return

    const duration = 1200
    const start = performance.now()

    function animate(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.floor(eased * numericValue!))
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [isInView, numericValue])

  return (
    <div
      ref={ref}
      className={cn(
        'border border-border bg-surface rounded-md p-4 text-center',
        className
      )}
    >
      <div className="font-mono text-2xl font-bold text-text">
        {numericValue !== null ? `${displayValue}${suffix}` : (value ?? '\u2014')}
      </div>
      <div className="text-xs text-muted mt-1 uppercase tracking-wider">{label}</div>
    </div>
  )
}
