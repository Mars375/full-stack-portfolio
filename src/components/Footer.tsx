import { StatusDot } from './StatusDot'

export function Footer() {
  return (
    <footer className="border-t border-border py-4 px-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between text-xs text-muted">
        <div className="flex items-center gap-2 font-mono">
          <StatusDot status="active" />
          <span>available for work</span>
        </div>
        <span>&copy; {new Date().getFullYear()}</span>
        <span className="font-mono hidden sm:inline">built with next.js</span>
      </div>
    </footer>
  )
}
