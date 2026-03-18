import type { Metadata } from 'next'
import { SectionHeader } from '@/components/SectionHeader'
import { siteConfig } from '@/lib/const'

export const metadata: Metadata = {
  title: 'Mentions Legales',
  description: 'Mentions legales et politique de confidentialite.',
  robots: { index: false, follow: false },
}

export default function LegalPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <p className="font-mono text-xs text-muted mb-8">~/loic/legal</p>

      <h1 className="font-mono text-xl font-semibold mb-8">Mentions Legales</h1>

      <div className="space-y-8 text-sm text-muted leading-relaxed">
        <section>
          <SectionHeader label="EDITEUR DU SITE" />
          <p>
            {siteConfig.name}<br />
            Developpeur independant<br />
            Paris, France<br />
            Contact : <a href={`mailto:${siteConfig.email}`} className="text-accent hover:underline">{siteConfig.email}</a>
          </p>
        </section>

        <section>
          <SectionHeader label="HEBERGEUR" />
          <p>
            Vercel Inc.<br />
            440 N Barranca Ave #4133<br />
            Covina, CA 91723, Etats-Unis<br />
            <a href="https://vercel.com" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">vercel.com</a>
          </p>
        </section>

        <section>
          <SectionHeader label="DONNEES PERSONNELLES" />
          <p>
            Ce site collecte des donnees personnelles uniquement via le formulaire de contact :
            nom, adresse email et message. Ces donnees sont utilisees exclusivement pour repondre
            a votre demande.
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Stockage : Supabase (infrastructure cloud, serveurs UE)</li>
            <li>Duree de conservation : 12 mois maximum</li>
            <li>Aucun partage avec des tiers</li>
            <li>Aucune utilisation a des fins marketing</li>
          </ul>
        </section>

        <section>
          <SectionHeader label="VOS DROITS" />
          <p>
            Conformement au RGPD, vous disposez d&apos;un droit d&apos;acces, de rectification et de
            suppression de vos donnees. Pour exercer ces droits, contactez :{' '}
            <a href={`mailto:${siteConfig.email}`} className="text-accent hover:underline">{siteConfig.email}</a>
          </p>
        </section>

        <section>
          <SectionHeader label="COOKIES" />
          <p>
            Ce site n&apos;utilise aucun cookie tiers, cookie de tracking ou cookie publicitaire.
            Seuls des cookies techniques strictement necessaires au fonctionnement du site peuvent
            etre utilises (stockage de session).
          </p>
        </section>
      </div>
    </div>
  )
}
