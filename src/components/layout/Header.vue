<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { ShoppingCart, Menu, X, Home, Search, Package, User } from 'lucide-vue-next'
import { useCartStore } from '../../stores/cartStore'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const isMobileMenuOpen = ref(false)
const searchQuery = ref('')

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Orders', path: '/orders', icon: Package },
  { name: 'Profile', path: '/profile', icon: User }
]

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleSearchSubmit = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value.trim() } })
    closeMobileMenu()
  }
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      
      <!-- Brand Logo -->
      <RouterLink
        to="/"
        @click="closeMobileMenu"
        class="text-xl font-bold text-[#7047EB] tracking-tight hover:opacity-90 transition shrink-0"
      >
        TemuStore
      </RouterLink>

      <!-- Desktop Search Bar -->
      <form @submit.prevent="handleSearchSubmit" class="relative hidden sm:block flex-1 max-w-md mx-4">
        <Search class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products, categories..."
          class="w-full bg-gray-100/90 hover:bg-gray-100 focus:bg-white text-sm text-gray-900 rounded-full pl-9 pr-9 py-2 border border-transparent focus:border-[#7047EB] focus:ring-2 focus:ring-[#7047EB]/20 transition-all outline-none"
        />
        <button
          v-if="searchQuery"
          type="button"
          @click="searchQuery = ''"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <X class="w-3.5 h-3.5" />
        </button>
      </form>

      <!-- Desktop Navigation Links -->
      <nav class="hidden md:flex items-center space-x-6">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="relative text-sm font-medium transition-colors py-1"
          :class="[
            route.path === item.path
              ? 'text-[#7047EB] font-semibold'
              : 'text-gray-600 hover:text-gray-900'
          ]"
        >
          {{ item.name }}
          <span
            v-if="route.path === item.path"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7047EB] rounded-full"
          ></span>
        </RouterLink>
      </nav>

      <!-- Right Actions (Cart & Mobile Hamburger) -->
      <div class="flex items-center space-x-2 sm:space-x-3 shrink-0">
        <RouterLink
          to="/cart"
          @click="closeMobileMenu"
          class="relative p-2 text-gray-700 hover:text-[#7047EB] hover:bg-purple-50 rounded-full transition"
          title="Shopping Cart"
        >
          <ShoppingCart class="w-6 h-6" />
          <span
            v-if="cartStore.totalItems > 0"
            class="absolute -top-1 -right-1 bg-[#7047EB] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-xs"
          >
            {{ cartStore.totalItems }}
          </span>
        </RouterLink>

        <!-- Mobile Hamburger Button -->
        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="md:hidden p-2 rounded-lg text-gray-700 hover:text-[#7047EB] hover:bg-purple-50 focus:outline-none transition cursor-pointer"
          :aria-label="isMobileMenuOpen ? 'Close Menu' : 'Open Menu'"
        >
          <X v-if="isMobileMenuOpen" class="w-6 h-6" />
          <Menu v-else class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Smooth Collapsible Accordion Mobile Menu -->
    <div
      class="grid md:hidden transition-[grid-template-rows] duration-300 ease-in-out border-t border-gray-100/50"
      :class="isMobileMenuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
    >
      <div class="overflow-hidden">
        <div class="px-4 pt-3 pb-4 flex flex-col space-y-3 bg-white/50">
          <!-- Mobile Search Bar inside Menu -->
          <form @submit.prevent="handleSearchSubmit" class="relative w-full sm:hidden">
            <Search class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="w-full bg-gray-100/90 text-sm text-gray-900 rounded-xl pl-9 pr-8 py-2.5 border border-gray-200 focus:border-[#7047EB] focus:ring-2 focus:ring-[#7047EB]/20 transition-all outline-none"
            />
            <button
              v-if="searchQuery"
              type="button"
              @click="searchQuery = ''"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <X class="w-3.5 h-3.5" />
            </button>
          </form>

          <!-- Navigation Links -->
          <div class="flex flex-col space-y-1">
            <RouterLink
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              @click="closeMobileMenu"
              class="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-base font-medium transition-colors"
              :class="[
                route.path === item.path
                  ? 'bg-purple-50 text-[#7047EB] font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              ]"
            >
              <component :is="item.icon" class="w-5 h-5" />
              <span>{{ item.name }}</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
