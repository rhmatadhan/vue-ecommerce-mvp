<script setup>
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()
</script>

<template>
  <nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <RouterLink to="/" class="text-xl font-bold">Vue E-Commerce</RouterLink>
    <div class="space-x-4">
      <RouterLink to="/" class="hover:underline">Home</RouterLink>
      <RouterLink to="/cart" class="hover:underline">
        Cart ({{ cartStore.totalItems }})
      </RouterLink>
    </div>
  </nav>
</template>
