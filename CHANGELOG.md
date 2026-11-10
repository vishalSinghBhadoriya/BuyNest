# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-06-21

### Added

- **devamir brand** — cream-and-coffee visual identity with Playfair Display and DM Sans typography
- **Local product catalogue** — offline-friendly JSON snapshot (no live API dependency)
- **Storefront pages** — Shop, Product Detail, Cart, Favorites, Checkout, About, 404
- **Three-step checkout** — shipping, review, and payment UI with demo completion modal
- **Contact CTAs** — phone and LinkedIn prioritized across banner, footer, and dedicated sections
- **Dark / light theme** — system preference detection with persistent toggle
- **Trust section** — shipping, checkout, responsive, and support highlights on home page
- **SEO** — dynamic page meta, Open Graph tags, favicon, and social cover image
- **Deploy config** — Vercel SPA rewrites via `vercel.json`
- **Route-level code splitting** — lazy-loaded pages with Suspense fallback
- **ProductImage component** — lazy loading with eager priority for above-the-fold images
- **Skip link** — keyboard navigation to main content
- **Accessibility** — focus-visible styles and reduced-motion support

### Changed

- Replaced glassmorphism UI with minimal surface-card layout
- Restyled toast notifications, error boundary, and back-to-top button
- Rewrote README for accurate demo scope and deployment instructions

### Removed

- Live productService API dependency
- Outdated glassmorphism and gradient styling

## [0.1.0] - Initial

### Added

- Basic React + Vite scaffold
- Product listing from productService API
- Simple cart and favorites
