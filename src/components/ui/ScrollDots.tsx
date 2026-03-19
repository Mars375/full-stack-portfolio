'use client'

import { useState, useEffect } from 'react'
import { navLinks } from '@/lib/const'

export function ScrollDots() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
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
    <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col gap-3 items-end">
      {navLinks.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center gap-3 group cursor-pointer"
          aria-label={`Scroll to ${label}`}
        >
          {/* Label — always visible, faded when inactive */}
          <span
            className={`font-mono text-[9px] tracking-wider transition-all duration-300 ${
              active === id
                ? 'text-accent opacity-100'
                : 'text-white/30 opacity-100 group-hover:text-white/60'
            }`}
          >
            {label.toUpperCase()}
          </span>

          {/* Bar indicator */}
          <div
            className={`rounded-full transition-all duration-300 ${
              active === id
                ? 'w-7 h-[3px] bg-accent shadow-[0_0_8px_var(--accent)]'
                : 'w-4 h-[2px] bg-white/20 group-hover:bg-white/40 group-hover:w-5'
            }`}
          />
        </button>
      ))}
    </nav>
  )
}
