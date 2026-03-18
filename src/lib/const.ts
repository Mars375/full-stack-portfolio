export type ProjectStatus = 'active' | 'in_development' | 'planned'

export interface Project {
  title: string
  description: string
  tech: string[]
  status: ProjectStatus
  github?: string
  demo?: string
}

export const siteConfig = {
  name: 'Loic Rossi',
  title: 'Full Stack Developer & Automation Specialist',
  description: 'Je concois des systemes qui tournent tout seuls.',
  url: 'https://loicrossi.dev',
  github: 'https://github.com/Mars375',
  email: 'rossi.loic.pro@gmail.com',
  location: 'Paris, France',
}

export const projects: Project[] = [
  {
    title: 'Homelab Infrastructure',
    description: 'Orchestration Docker complete — Caddy, Pi-hole, monitoring, media stack, backups automatises.',
    tech: ['docker', 'caddy', 'linux', 'restic'],
    status: 'active',
    github: 'https://github.com/Mars375/homelab-cortex',
  },
  {
    title: 'n8n Workflows',
    description: 'Veille technologique automatisee (6 sources), backups 3-2-1, et pipelines de donnees.',
    tech: ['n8n', 'typescript', 'postgresql'],
    status: 'active',
  },
  {
    title: 'Portfolio',
    description: 'Ce site — Next.js 15, design system Control Room, metriques GitHub live.',
    tech: ['next.js', 'react', 'typescript', 'tailwind'],
    status: 'active',
    demo: 'https://loicrossi.dev',
  },
  {
    title: 'JobFlow Assistant',
    description: 'Workflow automation pour la recherche d\'emploi — scraping, matching, suivi.',
    tech: ['n8n', 'typescript', 'next.js'],
    status: 'in_development',
  },
]

export const techStack: Record<string, string[]> = {
  FRONTEND: ['next.js', 'react', 'typescript', 'tailwind', 'framer-motion'],
  BACKEND: ['node.js', 'postgresql', 'supabase', 'prisma', 'docker'],
  AUTOMATION: ['n8n', 'github-actions', 'restic', 'caddy', 'linux'],
  TOOLS: ['git', 'vscode', 'claude-code', 'vercel'],
}

export const navLinks = [
  { href: '/', label: '~/HOME' },
  { href: '/projects', label: '~/PROJECTS' },
  { href: '/about', label: '~/ABOUT' },
  { href: '/contact', label: '~/CONTACT' },
]
