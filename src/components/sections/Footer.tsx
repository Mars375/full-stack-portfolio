import Link from 'next/link'
import { StatusDot } from '@/components/StatusDot'

export function Footer() {
  return (
    <footer id="footer" className="relative border-t border-border py-8 px-4">
      {/* Horizon line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-muted">
        <div className="flex items-center gap-2">
          <StatusDot status="active" />
          <span>SYSTEM OPERATIONAL</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{'\u00a9'} {new Date().getFullYear()} Lo{'\u00ef'}c Rossi</span>
          <Link href="/legal" className="hover:text-accent transition-colors">
            /legal
          </Link>
        </div>
      </div>
    </footer>
  )
}
