# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 TypeScript digital agency website (myagency) featuring portfolio showcases, service pages, blog functionality, admin dashboard capabilities, and client-specific demo pages.

## Development Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server (localhost:8080)
npm run build      # Build for production
npm run lint       # Run ESLint
```

Note: `npm run serve` also works but `npm run dev` is the primary development command.

## Architecture

### Component Organization: Atomic Design Pattern

The project uses **Atomic Design methodology** with clear hierarchy:

```
src/components/
├── celulas/        # Atoms - smallest building blocks (BeneServices, ContatoService, etc.)
├── molecules/      # Combinations of atoms (HeroSection, ServiceSection, PricingSection)
├── organisms/      # Complex page sections (AppHeader, AppFooter, WhatsAppButton)
├── templates/      # Full page templates/layouts (DemoEbookpage, DemoCursosonline)
├── views/          # Page-level components connected to router (HomeView, BlogView, etc.)
├── servicepage/    # Service detail pages and client-specific templates
├── Dashboad/       # Admin dashboard components
├── posts/          # Post-related components
└── composables/    # Vue 3 Composition API reusable hooks
    ├── useBlog.js      # Blog data with localStorage persistence
    ├── useAvaliacao.js # Ratings/reviews logic
    └── usePricing.js   # Pricing logic
```

### Layout System

The app uses **conditional layout rendering** in `App.vue` controlled by route meta tags:

```typescript
// Route meta options:
meta: {
  hideHeader: true,   // Hide agency header
  hideFooter: true,   // Hide agency footer
  noLayout: true,     // Full custom layout (404 pages)
  requiresAuth: true  // Admin pages (note: auth guard not implemented)
}
```

`App.vue` reads `$route.meta` to conditionally show/hide `<AppHeader>`, `<AppFooter>`, and `<WhatsButton>`. This enables page-specific layouts without routing complexity.

### State Management

- **Vuex store** (`/src/store/index.ts`): Minimal usage, primarily for admin dashboard hero configuration (`heroConfig` state)
- **Component local state**: Most components manage their own state via data properties
- **localStorage**: Blog composable persists views/comments

### Routing

Vue Router 4 configuration at `/src/router/index.ts`:
- **History mode**: Clean URLs without hash
- **Auto-scroll**: Scrolls to top on route change
- **Lazy-loaded routes**: Uses dynamic imports for code splitting
- Route categories: Main pages, service details (`/servicos/*`), portfolio (`/portfolio/*`), admin (`/admin/*`), demos

### Import Patterns

Use the `@` path alias for clean imports:
```typescript
import Component from '@/components/molecules/HeroSection.vue'
import { useBlog } from '@/components/composables/useBlog'
```

### Naming Conventions

**Components**:
- PascalCase: `AppHeader.vue`, `HeroSection.vue`
- Suffixes indicate type: `-View` (pages), `-Section` (major sections), `-Config` (configuration)

**Composables**:
- Prefix with `use`: `useBlog`, `useAvaliacao`, `usePricing`
- Currently JavaScript (not TypeScript)

**CSS**:
- BEM-like methodology with kebab-case
- Design tokens in `/src/assets/scss/variables.scss` (colors, spacing, breakpoints)
- CSS variables for dynamic styling

### Key Technologies

- **Vue 3.5** with TypeScript (strict mode enabled)
- **Animation libraries**: GSAP, AOS (Animate On Scroll), Typed.js, tsparticles
- **Email integration**: EmailJS for contact forms
- **Icons**: FontAwesome + Iconify

### TypeScript Configuration

- Path alias `@/*` maps to `src/*`
- Strict type checking enabled
- Target: ES5 for broad compatibility

## Development Notes

- ESLint allows single-word component names (`vue/multi-word-component-names: off`)
- Components use both Options API and Composition API (mixed styles)
- Demo pages (full client templates) are stored in `components/` folder with `hideHeader`/`hideFooter` meta
- Admin dashboard uses `requiresAuth` meta but authentication guard implementation is not present in router
