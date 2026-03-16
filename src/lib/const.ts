import type { Metadata } from 'next'

export const siteConfig = {
  name: 'Loïc Rossi',
  url: 'https://github.com/Mars375',
  email: 'rossi.loic.pro@gmail.com',
  author: 'Loïc Rossi',
}

export const projects = [
  {
    title: 'Tachikoma',
    description: 'OpenClaw orchestrator agent',
    tech: ['TypeScript', 'Node.js'],
    github: 'https://github.com/Mars375/Tachikoma',
  },
  {
    title: 'JobFlow Assistant',
    description: 'Job search automation',
    tech: ['Next.js', 'TypeScript'],
    github: 'https://github.com/Mars375/jobflow-assistant',
  },
]

export const techStack = {
  frontend: ['Next.js 15', 'React 19', 'TypeScript 5.0', 'Tailwind CSS', 'Framer Motion'],
  backend: ['Node.js', 'tRPC', 'Prisma', 'PostgreSQL', 'Supabase'],
  automation: ['n8n', 'GitHub Actions', 'Docker', 'CI/CD'],
}
