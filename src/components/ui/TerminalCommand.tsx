'use client'

import { TypingEffect } from '@/components/effects/TypingEffect'

interface TerminalCommandProps {
  user?: string
  host?: string
  path?: string
  command: string
  delay?: number
  onComplete?: () => void
}

export function TerminalCommand({
  user = 'loic',
  host = 'cortex',
  path = '~',
  command,
  delay = 0,
  onComplete,
}: TerminalCommandProps) {
  return (
    <div className="font-mono text-xs mb-6">
      <span className="text-success">{user}@{host}</span>
      <span className="text-muted">:</span>
      <span className="text-info">{path}</span>
      <span className="text-text"> $ </span>
      <TypingEffect text={command} delay={delay} speed={35} onComplete={onComplete} />
    </div>
  )
}
