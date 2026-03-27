export type ProjectStatus = 'active' | 'in_development' | 'planned'

export interface Project {
  title: string
  description: string
  tech: string[]
  status: ProjectStatus
  github?: string
  demo?: string
  screenshot?: string
}

export const siteConfig = {
  name: 'Loic Rossi',
  title: 'Full Stack Developer & Automation Specialist',
  description: 'Je concois des systemes qui tournent tout seuls.',
  url: 'https://loicrossi.dev',
  github: 'https://github.com/Mars375',
  email: 'rossi.loic.pro@gmail.com',
  location: 'Strasbourg, France',
}

export const projects: Project[] = [
  {
    title: 'Pulse',
    description: 'SaaS metrics dashboard — MRR, churn, cohorts, revenue. Next.js 16, Clerk auth, Stripe billing, GSAP scroll animations.',
    tech: ['next.js', 'typescript', 'tailwind', 'drizzle', 'neon', 'clerk', 'stripe', 'gsap', 'framer-motion', 'recharts'],
    status: 'active',
    github: 'https://github.com/Mars375/pulse',
    demo: 'https://pulse-swart-delta.vercel.app',
    screenshot: '/screenshots/pulse.png',
  },
  {
    title: 'Heartbeat',
    description: 'SaaS de monitoring d\'uptime — surveille tes services, gère les incidents, partage des status pages. Alertes temps réel, 90 jours d\'historique.',
    tech: ['next.js', 'typescript', 'tailwind', 'drizzle', 'neon', 'clerk', 'stripe', 'resend', 'framer-motion', 'recharts'],
    status: 'active',
    github: 'https://github.com/Mars375/heartbeat',
    demo: 'https://heartbeat-blush.vercel.app',
    screenshot: '/screenshots/heartbeat.png',
  },
  {
    title: 'RepoReady',
    description: 'AI-powered repo analyzer — paste a GitHub URL, get README, .env.example, docker-compose and CI config generated in seconds.',
    tech: ['next.js', 'typescript', 'tailwind', 'clerk', 'neon', 'drizzle', 'ai-sdk', 'github-api'],
    status: 'active',
    github: 'https://github.com/Mars375/repoready',
    demo: 'https://repoready.vercel.app',
    screenshot: '/screenshots/repoready.png',
  },
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
    description: 'Agrégateur d\'offres d\'emploi France-first — France Travail + Adzuna, matching CV sémantique (pgvector + OpenAI embeddings), Kanban de candidatures, alertes Slack & Telegram.',
    tech: ['next.js', 'typescript', 'tailwind', 'prisma', 'neon', 'pgvector', 'resend', 'openai'],
    status: 'active',
    github: 'https://github.com/Mars375/jobflow-assistant',
    demo: 'https://jobflow-assistant.vercel.app',
    screenshot: '/screenshots/jobflow.png',
  },
]

export const techStack: Record<string, string[]> = {
  FRONTEND: ['next.js', 'react', 'typescript', 'tailwind', 'framer-motion', 'gsap', 'recharts'],
  BACKEND: ['node.js', 'postgresql', 'neon', 'drizzle', 'supabase', 'stripe', 'docker'],
  AUTOMATION: ['n8n', 'github-actions', 'restic', 'caddy', 'linux'],
  TOOLS: ['git', 'vscode', 'figma', 'vercel', 'clerk'],
}

export const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
]
