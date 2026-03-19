'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxLayerProps {
  speed?: number
  children: React.ReactNode
  className?: string
}

export function ParallaxLayer({ speed = 0.5, children, className }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`])

  return (
    <motion.div
      ref={ref}
      style={prefersReduced ? undefined : { y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
