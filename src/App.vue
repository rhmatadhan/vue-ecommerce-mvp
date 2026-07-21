<script setup>
import { RouterView } from 'vue-router'
import Header from './components/layout/Header.vue'
import CartDrawer from './components/cart/CartDrawer.vue'
</script>

<template>
  <div class="min-h-screen bg-[#F8F9FB] flex flex-col font-sans text-gray-900 antialiased">
    <Header />
    <main class="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <RouterView />
    </main>
    <CartDrawer />
  </div>
</template>
