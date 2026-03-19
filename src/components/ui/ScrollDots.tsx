'use client'

import { useState, useEffect } from 'react'
import { navLinks } from '@/lib/const'

export function ScrollDots() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col gap-3 items-center">
      {navLinks.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          className="group relative flex items-center"
          aria-label={`Scroll to ${label}`}
        >
          <span className="absolute right-6 font-mono text-[9px] text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {label}
          </span>
          <div
            className={`rounded-full transition-all ${
              active === id
                ? 'w-2 h-2 bg-accent shadow-[0_0_6px_var(--accent)]'
                : 'w-1.5 h-1.5 bg-muted/40 hover:bg-muted'
            }`}
          />
        </button>
      ))}
    </nav>
  )
}
