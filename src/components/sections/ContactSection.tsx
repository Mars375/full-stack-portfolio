'use client'

import { TerminalCommand } from '@/components/ui/TerminalCommand'
import { ContactForm } from '@/components/ContactForm'
import { ScrollReveal } from '@/components/effects/ScrollReveal'

interface ContactSectionProps {
  github: string
  email: string
}

export function ContactSection({ github, email }: ContactSectionProps) {
  return (
    <section id="contact" className="relative py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <TerminalCommand command="contact --init" />

        <ScrollReveal>
          <ContactForm />
        </ScrollReveal>

        {/* Fallback links */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap gap-6 mt-8 font-mono text-xs">
            <a href={github} target="_blank" rel="noopener noreferrer"
              className="text-muted hover:text-text transition-colors">
              {'\u2192'} <span className="text-info">{github.replace('https://', '')}</span>
            </a>
            <a href={`mailto:${email}`}
              className="text-muted hover:text-text transition-colors">
              {'\u2192'} <span className="text-info">{email}</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
