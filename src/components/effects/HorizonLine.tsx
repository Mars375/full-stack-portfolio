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
      className="fixed left-0 right-0 top-[40vh] h-px z-0 pointer-events-none"
    >
      <div className="w-full h-full bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    </motion.div>
  )
}
