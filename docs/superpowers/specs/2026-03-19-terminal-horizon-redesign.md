# Terminal Horizon — Portfolio Single-Page Redesign

## Overview

Redesign the multi-page portfolio into a single-page scroll experience combining cinematic parallax ("Horizon") with terminal aesthetics ("Terminal"). Each section is introduced by a shell command that "executes" as the user scrolls.

**Target URL:** https://workspace-portfolio-2026.vercel.app
**Framework:** Next.js 15 (App Router), React 19, Tailwind CSS 3, Framer Motion 11

> **Path convention:** All paths below are relative to `src/`. E.g., `app/page.tsx` means `src/app/page.tsx`.

---

## Architecture

### Single Page Structure

The entire portfolio becomes `app/page.tsx` (server component) with client-side section components. The legal page (`/legal`) remains a separate route.

```
src/
├── app/
│   ├── page.tsx                # Single-page: assembles all sections
│   ├── layout.tsx              # Root layout (fonts, metadata, Toaster — see Layout Changes)
│   ├── legal/page.tsx          # Legal page (separate route, kept as-is)
│   ├── actions/contact.ts      # Server action (Supabase + Resend, kept as-is)
│   └── globals.css             # Design tokens, animations, parallax utilities
```

### Layout Changes (`src/app/layout.tsx`)

The current layout renders `<Navbar />` and `<Footer />` wrapping `{children}` with `pt-14` on `<main>`. Changes:
- **Remove** `<Navbar />` import and render (replaced by `ScrollDots`)
- **Remove** `<Footer />` import and render (Footer becomes a section inside `page.tsx`)
- **Remove** `pt-14` from `<main>` (no fixed navbar to offset)
- **Keep** `<Toaster />`, fonts, metadata, JSON-LD, `flex col` layout

### Sections (scroll order)

| # | Section | Terminal Command | Content |
|---|---------|-----------------|---------|
| 1 | Hero | `$ whoami` | Name, title, location, CTAs |
| 2 | Projects | `$ ls ~/projects --detailed` | Full terminal window per project |
| 3 | Stack | `$ cat skills.json \| jq` | 2x2 grid of tech categories |
| 4 | Contact | `$ contact --init` | Form + GitHub/email fallback links |
| 5 | Footer | — | Minimal: status dot, copyright, legal link |

### Sections with IDs

Each section renders with an `id` attribute for scroll navigation:
- `id="hero"` — HeroSection
- `id="projects"` — ProjectsSection
- `id="stack"` — StackSection
- `id="contact"` — ContactSection
- `id="footer"` — Footer

### Component Architecture

```
src/components/
├── sections/
│   ├── HeroSection.tsx         # 'use client' — boot animation, typing, parallax
│   ├── ProjectsSection.tsx     # 'use client' — terminal cards, scroll reveal
│   ├── StackSection.tsx        # 'use client' — grid with stagger animation
│   ├── ContactSection.tsx      # 'use client' — form + fallback links
│   └── Footer.tsx              # Server component
├── ui/
│   ├── TerminalWindow.tsx      # Reusable terminal chrome (title bar, dots, path)
│   ├── TerminalCommand.tsx     # Animated typing command with cursor
│   ├── StatusDot.tsx           # Pulsing status indicator (kept)
│   ├── TechTag.tsx             # Monospace tech badge (kept)
│   └── ScrollDots.tsx          # Sticky lateral dot navigation
├── effects/
│   ├── ParallaxLayer.tsx       # Framer Motion scroll-driven parallax wrapper
│   ├── ScrollReveal.tsx        # Viewport-triggered fade+slide animation
│   ├── TypingEffect.tsx        # Character-by-character typing animation
│   └── HorizonLine.tsx         # Animated gradient line with parallax offset
└── ContactForm.tsx             # Form with Zod validation (refactored from current)
```

---

## Visual Design

### Theme (preserved "Control Room" palette)

```css
/* Existing variables (keep values from current globals.css) */
--bg:            #08080c;    /* deep black */
--surface:       #11111b;    /* terminal windows (unchanged from current) */
--surface-hover: #181825;    /* hover states */
--border:        #1e1e2e;    /* subtle borders */
--text:          #cdd6f4;    /* primary text */
--muted:         #6c7086;    /* secondary text */
--accent:        #e8a849;    /* amber — commands, highlights */
--accent-dim:    rgba(232, 168, 73, 0.12);  /* transparent accent (unchanged) */
--success:       #a6e3a1;    /* green — prompts, active status */
--error:         #f38ba8;    /* red — errors, automation category */

/* NEW variable to add */
--info:          #89b4fa;    /* blue — links, devops category */
```

**New:** Add `--info` to `globals.css` and extend in `tailwind.config.js` as `info: 'var(--info)'`.

### Typography

- **Body / UI:** Inter (sans-serif)
- **Terminal / Code:** JetBrains Mono (monospace)
- Terminal commands always in JetBrains Mono
- Section titles rendered as command output (monospace)

### Background Layers (parallax)

1. **Base:** Solid `--bg` (#08080c)
2. **Grid dots:** Radial dot pattern at 30px spacing, 3% opacity, moves at 0.2x scroll speed *(replaces current 60px crosshatch grid)*
3. **Gradient wash:** Vertical gradient from deep blue-black to slightly warmer, moves at 0.4x
4. **Horizon line:** Horizontal gradient line (transparent → accent → transparent), moves at 0.6x, positioned at ~40% viewport height

---

## Section Details

### 1. Hero Section

**Boot sequence** (first visit only, stored in sessionStorage):
1. CRT scanline sweep (0.4s)
2. "INITIALIZING SESSION..." typed out
3. `$ whoami` typed, then output fades in:
   - Name (42px, font-weight 200, letter-spacing -2px)
   - Title (14px monospace, accent color)
   - Location (11px monospace, muted)
4. CTA buttons fade in:
   - `$ view --projects` (accent border)
   - `$ contact --init` (muted border)
5. GitHub metrics counters animate up (repos, commits)

**Returning visits:** Skip boot, show final state immediately.

**CTA buttons:** `$ view --projects` and `$ contact --init` smooth-scroll to `#projects` and `#contact` via `scrollIntoView({ behavior: 'smooth' })`.

**Navigation dots:** Fixed right side, 5 dots, active dot highlighted in accent. Clicking scrolls to section. Hidden on mobile (< 640px).

**Scroll indicator:** "SCROLL" + vertical gradient line at bottom center.

### 2. Projects Section

**Section intro:** `loic@cortex:~/projects $ ls --detailed` typed on scroll-in.

**Each project is a TerminalWindow:**
- Title bar: traffic light dots + `~/projects/{name}` path
- Content as command outputs:
  - `$ cat README.md` → title + description
  - `$ jq '.tech' package.json` → tech array in accent color
  - `$ git log --oneline -1` → hash (accent) + message
  - Links: `→ github` `→ demo` in info color

**Animation:** Cards stagger in from right (x: 30px → 0, opacity 0 → 1) with 150ms delay between each.

**Data source:** Static array from `lib/const.ts` (current approach, works well).

### 3. Stack Section

**Section intro:** `loic@cortex:~ $ cat skills.json | jq` typed on scroll-in.

**Grid layout:** 2x2 responsive (1 col mobile, 2 col desktop). Each cell is a card:
- Category label in monospace + category color (FRONTEND=accent, BACKEND=success, TOOLS=info, AUTOMATION=error)
- **Note:** `const.ts` currently uses `TOOLS` (not `DEVOPS`). Keep the existing key name.
- Items listed as `▸ Technology name`

**Animation:** Grid cells stagger in (top-left to bottom-right), 100ms delay.

### 4. Contact Section

**Section intro:** `loic@cortex:~ $ contact --init` typed on scroll-in.

**Form** (terminal-styled):
- Labels as monospace field names (`name:`, `email:`, `message:`)
- Inputs with `--bg` background, `--border` border, monospace placeholder cursor `_`
- Submit button: `$ send --message` on accent background
- Validation: Zod schema (current), error messages in `--error` color
- Success: Sonner toast

**Fallback links** below form:
- `→ github.com/Mars375`
- `→ rossi.loic.pro@gmail.com`

**Backend:** Server action → Supabase insert + Resend email (current, unchanged).

### 5. Footer

Minimal single line:
- StatusDot (green, pulsing) + "SYSTEM OPERATIONAL"
- `© 2026 Loïc Rossi`
- Link to `/legal`
- Horizon line above (same parallax accent line)

---

## Animations & Effects

### Parallax System

Using Framer Motion `useScroll()` + `useTransform()`:
- `ParallaxLayer` component wraps any element with a scroll-speed multiplier
- Speed values: background grid (0.2x), gradient (0.4x), horizon line (0.6x), foreground content (1.0x)

### Scroll-Triggered Typing

`TerminalCommand` component:
- Uses Intersection Observer to detect viewport entry
- Types characters using `requestAnimationFrame` with timestamp tracking (not `setInterval`)
- Shows blinking cursor `█` during typing, hides after completion
- Plays once only (tracked via ref)

### Section Reveals

`ScrollReveal` wrapper:
- Framer Motion `whileInView` with `once: true`
- Default: fade in + slide up (y: 20px), 500ms duration
- Configurable direction and delay for stagger patterns

### Boot Sequence

- Runs only on first visit (sessionStorage flag)
- Orchestrated timeline: scanline → init text → whoami → content → CTAs → metrics
- Total duration: ~2.5s
- On repeat visits: immediate render, no animation delay

---

## Responsive Design

| Breakpoint | Behavior |
|------------|----------|
| < 640px (mobile) | Single column, terminal cards full-width, stack grid 1-col, nav dots hidden, hamburger-free (scroll is the nav) |
| 640-1024px (tablet) | 2-col stack grid, terminal cards with smaller font, nav dots visible |
| > 1024px (desktop) | Full layout, nav dots right-side, max-width 700px content |

Terminal windows scale font-size down on mobile (11px → 10px). Title bar dots shrink proportionally.

---

## Data Flow

```
lib/const.ts (static)
├── siteConfig → Hero, Footer, metadata
├── projects[] → ProjectsSection
├── techStack → StackSection
└── navLinks → ScrollDots

lib/github.ts (ISR, 1h)
└── fetchGitHubMetrics() → Hero counters

app/actions/contact.ts (server action)
└── submitContact() → Supabase + Resend → ContactSection

lib/supabase-server.ts
└── createServerClient() → contact server action
```

No changes to data layer or backend. Only the frontend rendering changes.

---

## Files to Delete (replaced by single-page)

```
src/app/projects/page.tsx
src/app/projects/projects-animated.tsx
src/app/about/page.tsx
src/app/contact/page.tsx
src/app/hero-client.tsx
src/components/Navbar.tsx              # Replaced by ScrollDots
src/components/ProjectCard.tsx         # Replaced by TerminalWindow in ProjectsSection
src/components/ProjectsAnimated.tsx    # Replaced by ProjectsSection
src/components/MetricCard.tsx          # Rebuilt into HeroSection
src/components/SectionHeader.tsx       # Replaced by TerminalCommand
src/components/ContactInfoCard.tsx     # Replaced by inline links
```

## Files to Keep (reused or unchanged)

```
src/app/legal/page.tsx                 # Separate route, unchanged
src/app/actions/contact.ts             # Server action, unchanged
src/app/globals.css                    # Updated with new animations + --info variable
src/lib/const.ts                       # Updated: navLinks becomes section anchors
src/lib/utils.ts                       # cn() helper, unchanged
src/lib/github.ts                      # GitHub metrics, unchanged
src/lib/supabase.ts                    # Client, unchanged
src/lib/supabase-server.ts             # Server client, unchanged
src/components/StatusDot.tsx            # Reused in footer + projects
src/components/ContactForm.tsx         # Refactored styling, same logic
```

## Dependencies

- **Keep:** framer-motion, lucide-react (used for external link arrows in terminal windows)
- **Can remove:** react-hook-form, @hookform/resolvers (never used in current code)
- **No new deps added.**

---

## Performance Considerations

- **No heavy libraries added.** Framer Motion already in deps.
- **Parallax via CSS transforms** (GPU-accelerated), not JS repositioning.
- **Typing animations** use `requestAnimationFrame`, not `setInterval`.
- **IntersectionObserver** for scroll triggers (native, no polyfill needed).
- **Boot animation** skipped on return visits (sessionStorage).
- **ISR** for GitHub metrics (revalidate: 3600s) — no runtime API calls per visitor.
- **Images:** None in current design (text-only terminal aesthetic). Tiny bundle.

---

## Accessibility

- All parallax, typing, and stagger animations respect `prefers-reduced-motion: reduce` — disable transforms and show final state immediately.
- `ParallaxLayer`, `ScrollReveal`, `TerminalCommand` must all check this media query.
- The current `hero-client.tsx` already has this pattern — carry it forward.

## SEO & Redirects

Moving from 4 routes to 1. Add redirects in `next.config.js`:
```js
redirects: async () => [
  { source: '/projects', destination: '/#projects', permanent: true },
  { source: '/about', destination: '/#stack', permanent: true },
  { source: '/contact', destination: '/#contact', permanent: true },
]
```

Update metadata in `layout.tsx` to reflect single-page structure.

## `lib/const.ts` Changes

Update `navLinks` from route-based to anchor-based:
```ts
export const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
]
```

Rename `techStack.TOOLS` label to display as "TOOLS" (keep key as-is, just ensure category color mapping uses the correct key).

---

## Out of Scope

- Light mode / theme toggle
- Blog / articles section
- CMS integration
- Analytics dashboard
- i18n (French only implied by content)
- Page transitions between / and /legal (simple navigation)
