# TechZone — Online Tech Store (Frontend)

TechZone is the storefront UI for an online technology marketplace where users can browse products, filter by category and brand, add items to a cart, place orders, and publish/manage their own products.

Built with **React 19**, **TypeScript**, **Vite**, **Redux Toolkit**, **React Router**, **Material UI (MUI)** and **Axios**.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Requirements](#requirements)
4. [Installation](#installation)
5. [Environment Variables](#environment-variables)
6. [Running the Project](#running-the-project)
7. [Available Scripts](#available-scripts)
8. [Project Structure](#project-structure)
9. [Backend API](#backend-api)
10. [Troubleshooting](#troubleshooting)

---

## Features

- **Home page** with hero section and category showcase.
- **Product catalog** with search, category/brand/price/availability filters and sorting.
- **Product detail** view with add-to-cart action.
- **Shopping cart** with quantity controls, subtotal, shipping and total.
- **Checkout** that creates an order through the API.
- **Authentication** (Sign up / Sign in) with JWT stored in `localStorage`.
- **My Products** — create, edit and delete products you sell.
- **My Orders** — list past orders and view/delete order details.
- **Protected routes** for authenticated-only sections.
- **Responsive layout** (mobile drawer navigation and filter drawer).

---

## Tech Stack

| Layer            | Library                                       |
| ---------------- | --------------------------------------------- |
| Framework        | React 19                                      |
| Language         | TypeScript                                    |
| Bundler / Dev    | Vite 8                                        |
| UI               | Material UI (MUI) 9 + Emotion                 |
| State management | Redux Toolkit + React Redux                   |
| Routing          | React Router 7                                |
| HTTP client      | Axios                                         |
| Linter           | Oxlint                                        |

---

## Requirements

Before installing, make sure you have:

- **Node.js** `>= 20.19` (Node 22 LTS recommended — required by Vite 8).
- **npm** `>= 10` (comes bundled with Node.js).  
  You can also use **pnpm**, **yarn** or **bun** if you prefer.
- **Git** (to clone the repository).
- A running **backend API** exposing the endpoints listed in [Backend API](#backend-api).

Check your versions:

```bash
node -v
npm -v
```

---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd tienda-virtual-ui
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

---

## Environment Variables

The app reads its API base URL from `VITE_API_URL`. Create a `.env` file at the project root:

```env
# .env
VITE_API_URL=http://localhost:3000
```

If `VITE_API_URL` is not defined, the app falls back to `http://localhost:3000` (see [src/config/env.ts](src/config/env.ts)).

> All Vite env vars exposed to the client **must** be prefixed with `VITE_`.

---

## Running the Project

### Development server

Start the Vite dev server with hot module reload:

```bash
npm run dev
```

By default the app is served at [http://localhost:5173](http://localhost:5173).

### Production build

Type-check the project and build optimized assets into `dist/`:

```bash
npm run build
```

### Preview the production build locally

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Available Scripts

| Script            | Description                                         |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Start the Vite development server.                  |
| `npm run build`   | Run `tsc -b` type-check and build for production.   |
| `npm run preview` | Serve the production build locally.                 |
| `npm run lint`    | Run Oxlint over the codebase.                       |

---

## Project Structure

```
src/
├── App.tsx                  # Root app component
├── main.tsx                 # React entry point
├── components/
│   ├── layout/              # Navbar, Footer
│   └── ui/                  # Reusable UI (Loading, EmptyState, ConfirmDialog, RouteLoader)
├── config/
│   └── env.ts               # Environment variables (API URL)
├── features/
│   ├── auth/                # authSlice, authService, ProtectedRoute
│   ├── cart/                # cartSlice, CartList, CartItem, CartSummary
│   ├── home/                # Hero, CategorySection, CategoryCard
│   ├── orders/              # orderService
│   └── products/            # productService, productOptions, filters, search, sort, grid, card
├── lib/
│   └── api.ts               # Axios instance with auth interceptor
├── pages/                   # Route-level pages (Home, Products, Cart, Login, ...)
├── providers/
│   └── AppProviders.tsx     # Redux + Router providers
├── routes/
│   ├── AppRoutes.tsx        # Route table
│   └── paths.ts             # Centralized route paths
├── store/                   # Redux store + typed hooks
└── types/                   # Shared TypeScript types
```

---

## Backend API

The frontend expects a REST API reachable at `VITE_API_URL` exposing at least:

- `POST   /users`            — register a new user (returns `{ user, token }`)
- `POST   /users/login`      — sign in (returns `{ user, token }`)
- `GET    /products`         — list all products
- `GET    /products/mine`    — list products created by the authenticated user
- `GET    /products/:id`     — get a single product
- `POST   /products`         — create a product (auth required)
- `PUT    /products/:id`     — update a product (auth required)
- `DELETE /products/:id`     — delete a product (auth required)
- `GET    /orders`           — list orders of the authenticated user
- `GET    /orders/:id`       — get an order with its items
- `POST   /orders`           — create an order from cart items
- `PUT    /orders/:id`       — update an order's items
- `DELETE /orders/:id`       — delete an order

Authentication uses a Bearer token attached automatically by the Axios interceptor in [src/lib/api.ts](src/lib/api.ts). On `401`/`500` responses the token is cleared and the user is redirected to `/login`.

### Category values

Product categories used both in the UI and sent to the backend are:

```
Laptops, Phones, Peripherals, Components, Monitors,
Audio, Accessories, Video Games, Others
```

If your backend already contains products stored under Spanish category names, either migrate them to these English values or adapt the arrays in [src/features/products/services/productService.ts](src/features/products/services/productService.ts) and [src/features/products/productOptions.ts](src/features/products/productOptions.ts).

---

## Troubleshooting

- **Blank page or CORS errors** — verify the backend is running and `VITE_API_URL` matches its base URL. Ensure CORS is enabled on the API.
- **Infinite redirect to `/login`** — the API is returning `401`/`500`. Check that the token in `localStorage` is valid and the auth endpoints work.
- **`Cannot find module` on install** — delete `node_modules` and `package-lock.json`, then run `npm install` again.
- **Vite fails on `npm run dev`** — confirm your Node.js version is `>= 20.19`.

