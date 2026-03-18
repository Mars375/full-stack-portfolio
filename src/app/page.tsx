import { fetchGitHubMetrics } from '@/lib/github'
import { siteConfig, techStack } from '@/lib/const'
import { HeroClient } from './hero-client'

export default async function Home() {
  const metrics = await fetchGitHubMetrics()
  const techCount = Object.values(techStack).flat().length

  return (
    <HeroClient
      metrics={{
        repos: metrics.repos,
        commits: metrics.commits,
        techCount,
      }}
      siteConfig={{
        name: siteConfig.name,
        title: siteConfig.title,
        description: siteConfig.description,
      }}
    />
  )
}
