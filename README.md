# devamir — Storefront Demo

A minimal, responsive e-commerce storefront built with React and Vite. Designed as a live portfolio demo by **Amir Fallahi** — browse products, save favourites, manage a cart, and walk through a three-step checkout flow.

**Live demo:** [devamir99.github.io/productService-app](https://devamir99.github.io/productService-app)

## Screenshots

### Home — dark & light

<p align="center">
  <img src="docs/screenshots/home-dark.png" alt="devamir home page in dark mode" width="720" />
</p>

<p align="center">
  <em>Home page · dark theme</em>
</p>

<p align="center">
  <img src="docs/screenshots/home-light.png" alt="devamir home page in light mode" width="720" />
</p>

<p align="center">
  <em>Home page · light theme</em>
</p>

### Product detail — dark & light

<p align="center">
  <img src="docs/screenshots/product-dark.png" alt="devamir product detail page in dark mode" width="720" />
</p>

<p align="center">
  <em>Product detail · dark theme</em>
</p>

<p align="center">
  <img src="docs/screenshots/product-light.png" alt="devamir product detail page in light mode" width="720" />
</p>

<p align="center">
  <em>Product detail · light theme</em>
</p>

## Features

- Product catalogue with search, category, price, and rating filters
- Product detail pages with related items
- Shopping cart with persistent local storage
- Favourites / wishlist
- Three-step checkout (front-end demo — no real payments)
- Dark and light themes
- Cream-and-coffee visual identity
- Mobile-first responsive layout

## Tech stack

- React 19 · Vite 7 · Tailwind CSS 4
- React Router 7
- Local JSON product data (no external API dependency)

## Getting started

```bash
git clone https://github.com/devamir99/productService-app.git
cd productService-app
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Environment variables

Copy `env.example` to `.env` and optionally set:

| Variable | Purpose |
|----------|---------|
| `VITE_SITE_URL` | Production URL for Open Graph meta tags |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Deploy to GitHub Pages

This project is configured for GitHub Pages via GitHub Actions (`.github/workflows/deploy-pages.yml`).

1. Push to the `main` branch (or run the workflow manually)
2. In the repo: **Settings → Pages → Source → GitHub Actions**
3. After the workflow succeeds, open:  
   [https://devamir99.github.io/productService-app](https://devamir99.github.io/productService-app)

Vite `base` is set to `/productService-app/` for project-site hosting. The build also copies `index.html` → `404.html` so SPA routes work on refresh.

## Custom builds

This repository is a **demonstration storefront**. For a production-ready shop tailored to your brand, catalogue, and backend:

- **Phone:** [+98 920 500 7494](tel:+989205007494)
- **LinkedIn:** [linkedin.com/in/devamir](https://www.linkedin.com/in/devamir)
- **Email:** devamir99@gmail.com
- **GitHub:** [github.com/devamir99](https://github.com/devamir99)

## License

MIT — see [LICENSE](LICENSE).
