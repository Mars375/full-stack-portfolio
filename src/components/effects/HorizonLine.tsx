'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export function HorizonLine() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '60vh'])

  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  return (
    <motion.div
      style={prefersReduced ? undefined : { y }}
      className="fixed left-0 right-0 top-[40vh] z-0 pointer-events-none"
    >
      {/* Glow diffuse above */}
      <div className="w-full h-8 -mt-4 bg-gradient-to-r from-transparent via-accent/10 to-transparent blur-xl" />
      {/* Glow medium */}
      <div className="w-full h-3 -mt-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent blur-md" />
      {/* Sharp line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
    </motion.div>
  )
}
