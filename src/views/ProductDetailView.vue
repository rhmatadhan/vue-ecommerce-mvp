<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Product Detail Page</h1>
    <p class="text-gray-600">Product ID: {{ route.params.id }}</p>
  </div>
</template>
