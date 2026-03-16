'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'

const projects = [
  {
    title: 'Tachikoma',
    description: 'OpenClaw orchestrator agent for multi-agent coordination and automation',
    tech: ['TypeScript', 'Node.js', 'OpenClaw'],
    github: 'https://github.com/Mars375/Tachikoma',
    demo: null,
  },
  {
    title: 'JobFlow Assistant',
    description: 'Job search automation tool with smart matching and auto-application',
    tech: ['Next.js', 'TypeScript', 'Puppeteer'],
    github: 'https://github.com/Mars375/jobflow-assistant',
    demo: null,
  },
  {
    title: 'Automation Hub',
    description: 'Marketplace for n8n workflows with 50+ production-ready automations',
    tech: ['n8n', 'Next.js', 'PostgreSQL'],
    github: null,
    demo: null,
    comingSoon: true,
  },
  {
    title: 'Job Aggregator',
    description: 'SaaS platform aggregating 50+ job boards with AI-powered matching',
    tech: ['Next.js', 'tRPC', 'Prisma', 'Supabase'],
    github: null,
    demo: null,
    comingSoon: true,
  },
]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-950 dark:to-indigo-950">
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <Link
            href="/"
            className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors"
          >
            ← Back to Home
          </Link>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Projects
          </h1>

          <p className="text-xl text-slate-700 dark:text-slate-300 mb-12">
            A selection of my work in full-stack development and automation.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800"
              >
                {project.comingSoon && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full">
                    Coming Soon
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                  {project.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      Code
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Demo
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  )
}
