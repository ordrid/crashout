# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.6 project using React 19, TypeScript, and Tailwind CSS v4. The project uses Turbopack for faster builds and development.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production with Turbopack
npm run build

# Start production server
npm start
```

The development server runs at http://localhost:3000 with hot module replacement enabled.

## Architecture

### Next.js App Router

This project uses the Next.js App Router (not Pages Router). All routes are defined in the `app/` directory:

- `app/layout.tsx` - Root layout with Geist font configuration (sans and mono variants)
- `app/page.tsx` - Homepage component
- `app/globals.css` - Global Tailwind CSS styles

### TypeScript Configuration

- Path alias `@/*` maps to the root directory (e.g., `@/app/layout.tsx`)
- Strict mode enabled
- Target: ES2017

### Styling

- Tailwind CSS v4 configured via PostCSS (`postcss.config.mjs`)
- Global styles in `app/globals.css`
- Font: Geist (sans and mono) loaded via `next/font/google`
- CSS variables for fonts: `--font-geist-sans`, `--font-geist-mono`

## Key Technical Details

- **Turbopack**: Used for both dev and build commands (via `--turbopack` flag)
- **Image Optimization**: Use Next.js `Image` component from `next/image`
- **Metadata**: Define page metadata using Next.js `Metadata` type and export `metadata` object
- **React 19**: This project uses React 19.1.0 with latest patterns
