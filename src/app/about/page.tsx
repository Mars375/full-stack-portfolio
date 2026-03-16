'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const stack = {
  frontend: [
    { name: 'Next.js 15', level: 90 },
    { name: 'React 19', level: 90 },
    { name: 'TypeScript 5.0', level: 85 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'Framer Motion', level: 80 },
  ],
  backend: [
    { name: 'Node.js', level: 85 },
    { name: 'tRPC', level: 80 },
    { name: 'Prisma', level: 80 },
    { name: 'PostgreSQL', level: 75 },
    { name: 'Supabase', level: 80 },
  ],
  automation: [
    { name: 'n8n', level: 85 },
    { name: 'GitHub Actions', level: 80 },
    { name: 'Docker', level: 75 },
    { name: 'CI/CD', level: 80 },
  ],
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-950 dark:to-indigo-950">
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <Link
            href="/"
            className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors"
          >
            ← Back to Home
          </Link>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            About Me
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="text-xl text-slate-700 dark:text-slate-300 mb-6">
              I'm a Full Stack Developer & Automation Specialist based in Paris, France.
              I build production-ready applications with modern stack and automation-first development.
            </p>

            <p className="text-slate-600 dark:text-slate-400 mb-6">
              My focus is on creating scalable, performant solutions using Next.js, TypeScript,
              and modern development practices. I specialize in full-stack development, automation
              workflows, and developer tools.
            </p>

            <p className="text-slate-600 dark:text-slate-400">
              When I'm not coding, I'm building automations, contributing to open source,
              or exploring new technologies to stay at the forefront of web development.
            </p>
          </div>

          <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-slate-100">
            Tech Stack
          </h2>

          <div className="space-y-8">
            {Object.entries(stack).map(([category, items]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-800"
              >
                <h3 className="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-400 capitalize">
                  {category}
                </h3>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-700 dark:text-slate-300">{item.name}</span>
                        <span className="text-slate-500 dark:text-slate-500">{item.level}%</span>
                      </div>
                      <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5 }}
                          className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  )
}
