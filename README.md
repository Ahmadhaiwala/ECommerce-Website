# Flowbite Shop

A modern e-commerce frontend built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router v7
- Lucide React (icons)
- DummyJSON API (product data)

## Features

- Auth — register/login with credentials stored in localStorage, session persists on refresh
- Dark / Light mode — toggle in navbar, preference saved to localStorage
- Product listing — fetched from DummyJSON with grid layout
- Search — search by name, brand, category, or description via navbar
- Filters — filter by max price, star rating, and brand with an apply/reset flow
- Category bar — horizontal scrollable pill tabs to filter by category
- Top Deals banner — highlights products with 15%+ discount
- Favourites — heart any product, view and manage on the Favourites page
- Cart — add products, adjust quantity, remove items, see order total
- Checkout — places an order and clears the cart
- Orders — view order history with Processing / Shipped / Delivered status

## Pages

| Route | Description |
|---|---|
| `/` | Home — product grid with filters and search |
| `/favourites` | Saved products |
| `/cart` | Cart with checkout |
| `/orders` | Order history |

## Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start dev server
npm run dev
```

App runs at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Home/         # Category bar, Filter sidebar, Items grid
│   ├── layout/       # Navbar
│   └── product/      # Top Deals banner
├── context/          # Auth, Theme, Cart, Favourites, Orders, Filter, Product
└── pages/            # Home, AuthPage, CartPage, FavouritesPage, OrdersPage
```
