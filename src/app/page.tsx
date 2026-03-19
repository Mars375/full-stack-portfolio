import { fetchGitHubMetrics } from '@/lib/github'
import { siteConfig, projects, techStack } from '@/lib/const'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { StackSection } from '@/components/sections/StackSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { Footer } from '@/components/sections/Footer'
import { ScrollDots } from '@/components/ui/ScrollDots'
import { HorizonLine } from '@/components/effects/HorizonLine'

export const revalidate = 3600

export default async function HomePage() {
  const metrics = await fetchGitHubMetrics()

  return (
    <>
      {/* Background layers */}
      <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
        {/* Dot grid */}
        <div className="absolute inset-0 bg-grid" />
        {/* Ambient glow — amber top-right, floats slowly */}
        <div
          className="absolute top-[-15%] right-[5%] w-[700px] h-[700px] rounded-full animate-orb-1"
          style={{ background: 'radial-gradient(circle, rgba(232,168,73,0.09) 0%, transparent 65%)' }}
        />
        {/* Ambient glow — blue bottom-left, floats opposite phase */}
        <div
          className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full animate-orb-2"
          style={{ background: 'radial-gradient(circle, rgba(137,180,250,0.07) 0%, transparent 65%)' }}
        />
        {/* Ambient glow — subtle center, pulses */}
        <div
          className="absolute top-[30%] left-[25%] w-[800px] h-[400px] rounded-full animate-orb-pulse"
          style={{ background: 'radial-gradient(ellipse, rgba(232,168,73,0.04) 0%, transparent 70%)' }}
        />
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
