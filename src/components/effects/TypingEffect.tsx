'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface TypingEffectProps {
  text: string
  delay?: number
  speed?: number
  onComplete?: () => void
  className?: string
}

export function TypingEffect({ text, delay = 0, speed = 40, onComplete, className }: TypingEffectProps) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const hasRun = useRef(false)

  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  const startTyping = useCallback(() => {
    if (hasRun.current) return
    hasRun.current = true

    if (prefersReduced) {
      setDisplayed(text)
      setDone(true)
      onComplete?.()
      return
    }

    setTimeout(() => {
      setStarted(true)
      let i = 0
      let lastTime = 0

      const step = (time: number) => {
        if (!lastTime) lastTime = time
        if (time - lastTime >= speed) {
          i++
          setDisplayed(text.slice(0, i))
          lastTime = time
        }
        if (i < text.length) {
          requestAnimationFrame(step)
        } else {
          setDone(true)
          onComplete?.()
        }
      }

      requestAnimationFrame(step)
    }, delay)
  }, [text, delay, speed, onComplete, prefersReduced])

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) startTyping() },
      { threshold: 0.5 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [startTyping])

  return (
    <span ref={ref} className={className}>
      {prefersReduced ? text : displayed}
      {started && !done && <span className="animate-blink">&#x2588;</span>}
    </span>
  )
}
