# BuyNest — Modern E-commerce Storefront

A modern, responsive e-commerce storefront built with **React 19, Vite 7, and Tailwind CSS 4**.

BuyNest provides a complete frontend shopping experience, including product discovery, search and filters, favourites, shopping cart, checkout, and order history. It is a portfolio project demonstrating modern React development practices and responsive UI design.

**Live Demo:** [https://vishalsinghbhadoriya.github.io/BuyNest/](https://vishalsinghbhadoriya.github.io/BuyNest/)

**GitHub Repository:** [https://github.com/vishalSinghBhadoriya/BuyNest](https://github.com/vishalSinghBhadoriya/BuyNest)

---


## Features

- **Product Catalogue:** Browse products across different categories.
- **Search and Filtering:** Search products and filter by category, price, and rating.
- **Product Details:** View product information, ratings, descriptions, and related products.
- **Shopping Cart:** Add, remove, and update product quantities.
- **Favourites:** Save and manage favourite products.
- **Checkout Flow:** Three-step checkout experience with shipping details, order review, and demo payment.
- **Order History:** View completed demo orders, purchased products, and order summaries.
- **Persistent Storage:** Cart, favourites, and order history are saved using browser localStorage.
- **Dark and Light Themes:** Switch between two visual themes.
- **Responsive Design:** Optimized for mobile, tablet, and desktop screens.

> **Note:** BuyNest is a frontend demonstration. It does not process real payments or submit orders to a backend server. Shopping and order information is stored locally in the browser.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | Component-based UI development |
| Vite 7 | Development server and build tool |
| Tailwind CSS 4 | Styling and responsive layouts |
| React Router 7 | Client-side routing |
| JavaScript | Application logic |
| Context API | Shared application state |
| Axios | HTTP client dependency |
| Framer Motion | UI animations |
| localStorage | Browser-side data persistence |
| ESLint | Code quality and linting |

**Product data:** Local JSON dataset. The storefront does not depend on an external product API.

---

## Project Structure

```text
BuyNest/
├── public/
├── src/
│   ├── api/
│   ├── components/
│   ├── config/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 22 or later
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/vishalSinghBhadoriya/BuyNest.git
```

Navigate to the project directory:

```bash
cd BuyNest
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local development URL displayed in your terminal, usually:

```text
http://localhost:5173/
```

---

## Environment Variables

Create a `.env` file in the project root if you want to configure the production site URL:

```env
VITE_SITE_URL=https://vishalsinghbhadoriya.github.io/BuyNest/
```

See `.env.example` for the available environment variable.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

---

## Deployment

BuyNest is deployed using **GitHub Pages and GitHub Actions**.

### Deployment Configuration

1. Push your changes to the `main` branch.
2. GitHub Actions automatically installs dependencies and builds the application.
3. The generated `dist` directory is uploaded to GitHub Pages.
4. GitHub Pages publishes the application.

Make sure the repository is configured under:

**Settings → Pages → Build and deployment → Source → GitHub Actions**

### Production URL

[https://vishalsinghbhadoriya.github.io/BuyNest/](https://vishalsinghbhadoriya.github.io/BuyNest/)

The Vite base path is configured to use `/BuyNest/` during GitHub Actions builds and `/` during local development.

---

## Author

**Vishal Bhadoriya**

Frontend Developer

- **GitHub:** [vishalSinghBhadoriya](https://github.com/vishalSinghBhadoriya/)
- **LinkedIn:** [Vishal Bhadoriya](https://www.linkedin.com/in/vishal-singh-bhadoriya)
- **Email:** vishalbhadoriya9765@gmail.com

---

## Acknowledgements

BuyNest was developed by customizing and extending an existing MIT-licensed storefront project. Original license and copyright notices are retained in the repository.

---

## License

This project is distributed under the MIT License. See the [LICENSE](LICENSE) file for details.