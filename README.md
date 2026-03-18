# loicrossi.dev

Portfolio personnel — dark theme "Control Room" inspire des dashboards de monitoring.

## Stack

- **Framework** : Next.js 15 (App Router, Server Components)
- **UI** : React 19, Tailwind CSS, Framer Motion
- **Typo** : JetBrains Mono (headings/code) + Inter (body)
- **Backend** : Supabase (contact form), Resend (notifications email)
- **Deploiement** : Vercel

## Pages

| Route | Description |
|-------|-------------|
| `/` | Hero avec animation de boot, metriques GitHub en temps reel |
| `/projects` | Projets groupes par statut (actif / en dev / prevu) |
| `/about` | Bio + stack technique style terminal |
| `/contact` | Formulaire valide (zod) + insertion Supabase + notification Resend |
| `/legal` | Mentions legales, RGPD |

## Variables d'environnement

Copier `.env.example` vers `.env.local` et remplir :

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
GITHUB_TOKEN=           # optionnel, augmente le rate limit GitHub
GITHUB_USERNAME=
```

## Dev

```bash
npm install
npm run dev
```

Le site tourne sur `http://localhost:3000`.

## Build

```bash
npm run build
```

## Design

Palette sombre avec accent ambre/cuivre (`#e8a849`), bordures 1px, esthetique monitoring.
Pas de mode clair, pas de gradients, pas de blur excessif — juste des panneaux propres et du monospace.
