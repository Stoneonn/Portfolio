# Copilot Instructions for Nim Portfolio

## Project Overview

This is a personal portfolio website built with **Next.js 15 App Router**, **React 19**, **Tailwind CSS v4**, and **Motion** (Framer Motion). The project is a template for developers/designers to showcase their work with minimal, animated UI components from [Motion-Primitives](https://motion-primitives.com).

**📚 For detailed Motion Primitives UI Kit usage, see [MOTION_PRIMITIVES_GUIDE.md](MOTION_PRIMITIVES_GUIDE.md)** - A comprehensive reference for all 30+ available animated components with examples, props, and integration patterns.

## Architecture & Key Patterns

### Single-Page Layout with Centralized Data

- Main content lives in `app/page.tsx` as a single-page portfolio with staggered animations
- All portfolio data (projects, work experience, blog posts, social links) is centralized in `app/data.ts`
- **Pattern**: Export typed constants from `data.ts` and import them into components. Never hardcode content in JSX

### Motion Animation System

- Uses `motion/react` (Framer Motion) with consistent animation variants:
  - `VARIANTS_CONTAINER`: Orchestrates staggered children animations (staggerChildren: 0.15)
  - `VARIANTS_SECTION`: Standard fade-in from below with blur (opacity 0→1, y: 20→0, blur: 8px→0px)
  - `TRANSITION_SECTION`: 0.3s duration for all section animations
- **Convention**: Apply `variants={VARIANTS_SECTION}` and `transition={TRANSITION_SECTION}` to each `<motion.section>`

### Component Organization

- UI components live in `components/ui/` and are prefixed with descriptive names
- Motion primitives: `animated-background.tsx`, `magnetic.tsx`, `morphing-dialog.tsx`, `spotlight.tsx`, `text-effect.tsx`, `text-morph.tsx`, `scroll-progress.tsx`
- All UI components use `'use client'` directive (client-side interactivity required)
- **Motion Primitives Library**: 30+ pre-built animated components available in `motion-primitives-main/components/core/`
  - Use CLI to add components: `npx motion-primitives add <component-name>`
  - See [MOTION_PRIMITIVES_GUIDE.md](MOTION_PRIMITIVES_GUIDE.md) for complete component reference

### MDX Blog System

- Blog posts are `.mdx` files in `app/blog/[slug]/page.mdx` structure
- Each post folder represents a route (e.g., `app/blog/exploring-the-intersection-of-design-ai-and-design-engineering/page.mdx`)
- Blog layout (`app/blog/layout.tsx`) provides:
  - Scroll progress indicator at top
  - Copy URL button in top-right
  - Prose typography styles with custom sizing
- Custom MDX components defined in `mdx-components.tsx` (e.g., `Cover` for images, syntax-highlighted `code` blocks using `sugar-high`)

### Styling Conventions

- Tailwind CSS v4 with `@tailwindcss/typography` plugin
- Path alias: `@/*` maps to project root
- Dark mode: `dark:` variant with `next-themes` provider in root layout
- Geist and Geist Mono fonts loaded via `next/font/google`
- **Pattern**: Use `cn()` utility from `lib/utils.ts` to merge Tailwind classes with clsx + twMerge

### TypeScript Setup

- Strict mode enabled
- Path aliases: `@/*` resolves to root
- MDX types via `@types/mdx`

## Development Workflows

### Running Locally

```bash
npm run dev        # Start dev server at localhost:3000
npm run build      # Production build
npm run lint       # ESLint + Prettier check
```

### Adding Content

1. **Projects/Work/Blog Links**: Edit `app/data.ts` typed arrays
2. **New Blog Post**: Create `app/blog/[slug]/page.mdx` with optional frontmatter metadata for SEO
3. **UI Components**: Place in `components/ui/` and export with 'use client' if interactive

### Customization Points

- Update `app/header.tsx` for name/title
- Modify `app/layout.tsx` metadata for SEO
- Edit `app/data.ts` for all portfolio content
- Theme colors in `app/globals.css` (syntax highlighting vars, Tailwind border defaults)

## Critical Dependencies

- **motion**: Animation library (v11+, formerly framer-motion)
- **@next/mdx**: MDX integration with Next.js
- **next-themes**: Dark mode support
- **sugar-high**: Code syntax highlighting in MDX
- **lucide-react**: Icon library

## Gotchas

- Tailwind v4 changed default border colors to `currentColor` (see `app/globals.css` compatibility layer)
- All animated components require `'use client'` directive
- MDX files use `.mdx` extension but must be in `page.mdx` format for Next.js routing
- Path imports use `@/` prefix, not relative paths
- Motion components use `motion/react` import (not `framer-motion`)

## Future Evolution

This project is actively evolving. Planned features include:

- **Website Embeds**: Support for embedding external websites/demos (consider iframe integration or React components)
- **External Blog Integration**: Blog content may be fetched from an external CMS/platform rather than local MDX files
  - Current MDX system serves as fallback/local option
  - When implementing, maintain type safety in `app/data.ts` for external blog links
- **Architecture Flexibility**: Single-page layout may expand to multi-page navigation—keep components modular

## Deployment

- **Platform**: DigitalOcean (not Vercel)
- Ensure `next.config.mjs` output settings are compatible with DigitalOcean App Platform or Droplet deployment
- Static export (`output: 'export'`) may be needed depending on hosting method
- Check `package.json` scripts for build/start commands match deployment requirements

## When Making Changes

- Always maintain type safety in `app/data.ts` (use existing type definitions)
- Keep animation variants consistent with existing `VARIANTS_*` patterns
- Preserve dark mode support in new components (`dark:` classes)
- Follow single-page architecture—avoid creating new route pages unless for blog posts
- When adding iframe embeds or external integrations, consider loading states and error boundaries
