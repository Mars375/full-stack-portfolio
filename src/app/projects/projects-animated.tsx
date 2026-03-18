'use client'

import { motion } from 'framer-motion'
import { ProjectCard } from '@/components/ProjectCard'
import type { Project } from '@/lib/const'

export function ProjectsAnimated({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {projects.map((project, i) => (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
        >
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </div>
  )
}
