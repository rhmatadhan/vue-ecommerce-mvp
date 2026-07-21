# 🛒 Vue 3 E-Commerce Prototype

A modern, responsive Single Page Application (SPA) E-Commerce prototype built with **Vue 3**, **Vite**, **Tailwind CSS v4**, **Pinia**, and integrated with the **FakeStore API**.

---

## ✨ Features (MVP)

* **🏠 Product Discovery & Filtering (Home Page):**
  * Dynamic **Hero Banner** featuring highlighted products.
  * Interactive **Category Filter** (Real-time category fetching and product list filtering).
  * Curated sections: **Trending Now** and **Recommended for You**.
  * Custom **Skeleton Loaders** for enhanced perceived performance during data fetching.

* **🔍 Product Detail Page (`/product/:id`):**
  * Comprehensive product information: full description, customer rating, price, and category badge.
  * Image container with smooth hover zoom effects.
  * Quantity selector stepper (+ / -).
  * Direct "Add to Cart" action with visual toast notification.

* **🛍️ Slide-over Shopping Cart Drawer:**
  * Slide-over cart drawer accessible from anywhere in the application.
  * Real-time item count badge indicator on the header cart button.
  * Full cart management: adjust quantities, remove items, subtotal calculation, and clear cart.
  * Sticky bottom action area with subtotal calculation and checkout button.

---

## 🛠️ Tech Stack & Tools

* **Framework:** [Vue 3](https://vuejs.org/) (Composition API with `<script setup>`)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **State Management:** [Pinia](https://pinia.vuejs.org/) (`cartStore` for global shopping cart state)
* **Routing:** [Vue Router 4](https://router.vuejs.org/)
* **Icons:** [lucide-vue-next](https://lucide.dev/)
* **HTTP Client:** [Axios](https://axios-http.com/)
* **API Service:** [FakeStore API](https://fakestoreapi.com/)

---

## 📂 Folder Structure

```
src/
├── api/          # API service layer (fakestore.js)
├── assets/       # Media assets and icons
├── components/   # Reusable Vue components
│   ├── cart/     # CartDrawer, CartItem components
│   ├── home/     # HeroBanner, CategoryFilter components
│   ├── layout/   # Header component
│   └── product/  # ProductCard, ProductCardSkeleton, ProductDetailSkeleton
├── router/       # Vue Router configuration (index.js)
├── stores/       # Pinia stores (cartStore.js)
├── views/        # Main page views (HomeView.vue, ProductDetailView.vue, CartView.vue)
├── App.vue       # Root component
├── main.js       # Application entry point
└── style.css     # Global styles & Tailwind imports
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) and **npm** installed on your system.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rhmatadhan/vue-ecommerce-mvp.git
   cd vue-ecommerce-mvp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### Production Build

Build the project for production deployment:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🌐 API Mapping (FakeStore API)

| Feature | Endpoint (Base: `https://fakestoreapi.com`) | Method |
| :--- | :--- | :--- |
| **Get All Products** | `/products` | `GET` |
| **Get Product Detail** | `/products/:id` | `GET` |
| **Get Categories** | `/products/categories` | `GET` |
| **Filter by Category** | `/products/category/:category_name` | `GET` |

> *Note: Shopping Cart logic is managed locally in frontend state via Pinia for optimal SPA reactivity.*

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
