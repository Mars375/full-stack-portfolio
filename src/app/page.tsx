import { fetchGitHubMetrics } from '@/lib/github'
import { siteConfig, projects, techStack } from '@/lib/const'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { StackSection } from '@/components/sections/StackSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { Footer } from '@/components/sections/Footer'
import { ScrollDots } from '@/components/ui/ScrollDots'
import { HorizonLine } from '@/components/effects/HorizonLine'
import { ParallaxLayer } from '@/components/effects/ParallaxLayer'

export const revalidate = 3600

export default async function HomePage() {
  const metrics = await fetchGitHubMetrics()

  return (
    <>
      {/* Background layers */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <ParallaxLayer speed={-0.2}>
          <div className="w-full h-[200vh] bg-grid opacity-[0.03]" />
        </ParallaxLayer>
      </div>
      <HorizonLine />

      {/* Navigation */}
      <ScrollDots />

      {/* Sections */}
      <HeroSection
        name={siteConfig.name}
        title={siteConfig.title}
        location={siteConfig.location}
        repos={metrics.repos}
        commits={metrics.commits}
      />
      <ProjectsSection projects={projects} />
      <StackSection techStack={techStack} />
      <ContactSection github={siteConfig.github} email={siteConfig.email} />
      <Footer />
    </>
  )
}
