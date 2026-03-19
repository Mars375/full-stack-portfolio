'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { StatusDot } from './StatusDot'
import { navLinks } from '@/lib/const'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        scrolled
          ? 'bg-bg/90 backdrop-blur-xl border-border'
          : 'bg-transparent border-transparent'
      )}
    >
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm text-text">
          <StatusDot status="active" />
          <span>loic.rossi</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={`/#${link.id}`}
              className="font-mono text-xs tracking-wide transition-colors text-muted hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-muted hover:text-text"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-bg/95 backdrop-blur-xl border-t border-border px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={`/#${link.id}`}
              onClick={() => setMobileOpen(false)}
              className="block py-2 font-mono text-sm text-muted"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
