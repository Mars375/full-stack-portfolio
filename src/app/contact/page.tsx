import type { Metadata } from 'next'
import { Mail, Github, MapPin, Clock } from 'lucide-react'
import { SectionHeader } from '@/components/SectionHeader'
import { ContactForm } from '@/components/ContactForm'
import { ContactInfoCard } from '@/components/ContactInfoCard'
import { siteConfig } from '@/lib/const'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Loic Rossi — disponible pour des missions freelance et collaborations.',
}

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <p className="font-mono text-xs text-muted mb-8">~/loic/contact</p>

      <SectionHeader label="GET IN TOUCH" />

      <div className="grid gap-8 md:grid-cols-[1fr_300px]">
        <ContactForm />

        <div className="space-y-3">
          <ContactInfoCard
            icon={Mail}
            label="Email"
            value={siteConfig.email}
            href={`mailto:${siteConfig.email}`}
          />
          <ContactInfoCard
            icon={Github}
            label="GitHub"
            value="Mars375"
            href={siteConfig.github}
          />
          <ContactInfoCard
            icon={MapPin}
            label="Location"
            value="Paris, France (remote-friendly)"
          />
          <ContactInfoCard
            icon={Clock}
            label="Response Time"
            value="< 24h"
            accent
          />
        </div>
      </div>
    </div>
  )
}
