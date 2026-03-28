# loicrossi.dev

> Personal portfolio — "Terminal Horizon" design. Single scrollable page with full-height sections, terminal/monitoring aesthetic, ambient parallax, boot animations, and live GitHub metrics.

Portfolio personnel avec design "Terminal Horizon". Une seule page scrollable à sections pleine hauteur, esthétique terminal/monitoring avec parallax ambiant, animations de boot et métriques GitHub live.

## Aperçu

| Section | Contenu |
|---------|---------|
| **Hero** | Animation de boot au premier chargement, nom en typo éditoriale, infos système en style terminal (`[role]`, `[location]`, `[stats]`) |
| **Projects** | Carousel animé, layout deux colonnes — fenêtre terminal à gauche, panneau visuel à droite |
| **Stack** | Grille de catégories avec pills de compétences, barre de progression par catégorie, section LEARNING |
| **Contact** | Formulaire validé (zod), stockage Supabase, notification email via Resend |

## Stack technique

- **Framework** — Next.js 15 App Router, React 19, TypeScript
- **UI** — Tailwind CSS 3, Framer Motion 11
- **Typo** — JetBrains Mono + Inter (next/font, zero layout shift)
- **Backend** — Supabase (stockage messages), Resend (notifications)
- **Métriques** — GitHub REST API (repos + commits, revalidation 1h)
- **Déploiement** — Vercel (statique + revalidation ISR)

## Lancer en local

```bash
git clone https://github.com/Mars375/full-stack-portfolio.git
cd full-stack-portfolio
npm install
cp .env.example .env.local
# remplir .env.local (voir section Variables d'environnement)
npm run dev
```

Le site tourne sur `http://localhost:3000`.

## Variables d'environnement

Copier `.env.example` en `.env.local` et remplir les valeurs.

### Supabase — obligatoire (formulaire de contact)

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

Toutes disponibles dans **Supabase → Project Settings → API**.
`SUPABASE_SERVICE_ROLE_KEY` est un secret serveur — ne jamais l'exposer côté client.

Créer la table `contact_messages` via **Supabase → SQL Editor** :

```sql
create table contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);
alter table contact_messages enable row level security;
```

### Resend — optionnel (notification email à la réception d'un message)

```env
RESEND_API_KEY=re_...
```

Disponible dans **Resend → API Keys**.
Sans cette variable, les messages sont quand même stockés dans Supabase — l'email de notification est simplement ignoré.

### GitHub — optionnel (métriques live)

```env
GITHUB_TOKEN=ghp_...
GITHUB_USERNAME=Mars375
```

Générer un **Fine-grained token** dans GitHub → Settings → Developer settings → Personal access tokens, avec le scope `read:user` uniquement.
Sans token, le nombre de repos s'affiche quand même (API publique) mais le nombre de commits sera masqué (rate limit GitHub trop bas pour l'endpoint commit search sans auth).

### URL du site

```env
NEXT_PUBLIC_SITE_URL=https://loicrossi.dev
```

Utilisé pour les métadonnées Open Graph.

## Déployer sur Vercel

### 1. Connecter le repo

Aller sur [vercel.com](https://vercel.com), importer le repo `Mars375/full-stack-portfolio`. Vercel détecte Next.js automatiquement, aucune config de build à changer.

### 2. Ajouter les variables d'environnement

Dans **Vercel → Project → Settings → Environment Variables**, ajouter toutes les variables ci-dessus pour l'environnement **Production** (et Preview si besoin).

Variables à ajouter :

| Variable | Environnement | Requis |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Production, Preview | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production, Preview | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Production, Preview | ✅ |
| `NEXT_PUBLIC_SITE_URL` | Production | ✅ |
| `RESEND_API_KEY` | Production | Recommandé |
| `GITHUB_TOKEN` | Production, Preview | Recommandé |
| `GITHUB_USERNAME` | Production, Preview | Optionnel |

### 3. Déployer

Cliquer **Deploy**. Chaque push sur `main` redéclenche automatiquement un déploiement.

Les métriques GitHub sont mises en cache 1h côté serveur (`revalidate = 3600`) — aucune requête API à chaque visite.

## Structure du projet

```
src/
├── app/
│   ├── page.tsx              # Page principale (assemblage des sections)
│   ├── layout.tsx            # Layout racine, fonts, metadata
│   ├── globals.css           # Variables CSS, keyframes, grid, scrollbar
│   ├── legal/page.tsx        # Mentions légales
│   └── actions/contact.ts   # Server Action — validation + Supabase + Resend
├── components/
│   ├── sections/             # HeroSection, ProjectsSection, StackSection, ContactSection, Footer
│   ├── effects/              # ScrollReveal, TypingEffect, HorizonLine
│   ├── ui/                   # TerminalWindow, TerminalCommand, ScrollDots
│   ├── ContactForm.tsx       # Formulaire client avec useActionState
│   └── StatusDot.tsx         # Indicateur de statut projet
└── lib/
    ├── const.ts              # Données du site (config, projets, stack, nav)
    ├── github.ts             # Fetch métriques GitHub
    └── supabase-server.ts    # Client Supabase serveur
```

## Personnaliser le contenu

Tout le contenu est centralisé dans `src/lib/const.ts` :

- `siteConfig` — nom, titre, localisation, email, GitHub, URL
- `projects` — liste des projets avec titre, description, stack, statut, liens
- `techStack` — catégories de compétences (FRONTEND, BACKEND, AUTOMATION, TOOLS)
- `navLinks` — liens de navigation

## Design

Palette sombre avec accent ambre (`#e8a849`), fond `#08080c`, surface `#11111b`.
Grille crosshatch subtile en arrière-plan fixe, orbes lumineux animés, typographie monospace pour tous les éléments d'interface.
Aucun mode clair, aucun gradient superficiel — esthétique salle de contrôle.
