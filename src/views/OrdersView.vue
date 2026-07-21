<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { ShoppingBag, ArrowRight } from 'lucide-vue-next'
import OrderCard from '../components/orders/OrderCard.vue'
import { getProducts } from '../api/fakestore'

// Active tab state: 'all' | 'processing' | 'completed'
const activeTab = ref('all')

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'processing', label: 'Processing' },
  { id: 'completed', label: 'Completed' }
]

// High-reliability static mock data with CDN product images
const mockOrders = ref([
  {
    id: 'ORD-2026-001',
    date: '21 Jul 2026',
    status: 'Completed',
    totalAmount: 188.24,
    items: [
      {
        id: 1,
        title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop&q=80',
        price: 109.95,
        quantity: 1
      },
      {
        id: 2,
        title: 'Mens Casual Premium Slim Fit T-Shirts',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80',
        price: 22.3,
        quantity: 1
      },
      {
        id: 3,
        title: 'Mens Cotton Jacket',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&auto=format&fit=crop&q=80',
        price: 55.99,
        quantity: 1
      }
    ]
  },
  {
    id: 'ORD-2026-002',
    date: '18 Jul 2026',
    status: 'Processing',
    totalAmount: 55.99,
    items: [
      {
        id: 3,
        title: 'Mens Cotton Jacket - Warm Winter Coat',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&auto=format&fit=crop&q=80',
        price: 55.99,
        quantity: 1
      }
    ]
  },
  {
    id: 'ORD-2026-003',
    date: '10 Jul 2026',
    status: 'Completed',
    totalAmount: 863.00,
    items: [
      {
        id: 5,
        title: "John Hardy Women's Legends Naga Gold & Silver Station Chain Bracelet",
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80',
        price: 695.00,
        quantity: 1
      },
      {
        id: 6,
        title: 'Solid Gold Petite Micropave Ring',
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&auto=format&fit=crop&q=80',
        price: 168.00,
        quantity: 1
      }
    ]
  }
])

// On mounted, try to merge API products if available and valid
onMounted(async () => {
  try {
    const products = await getProducts()
    if (products && products.length >= 4) {
      mockOrders.value = [
        {
          id: 'ORD-2026-001',
          date: '21 Jul 2026',
          status: 'Completed',
          totalAmount: Number(
            ((products[0]?.price || 109.95) + (products[1]?.price || 22.3) + (products[2]?.price || 55.99)).toFixed(2)
          ),
          items: [products[0], products[1], products[2]].filter(Boolean)
        },
        {
          id: 'ORD-2026-002',
          date: '18 Jul 2026',
          status: 'Processing',
          totalAmount: Number((products[3]?.price || 55.99).toFixed(2)),
          items: [products[3] || products[0]].filter(Boolean)
        },
        {
          id: 'ORD-2026-003',
          date: '10 Jul 2026',
          status: 'Completed',
          totalAmount: Number(
            ((products[4]?.price || 695) + (products[5]?.price || 168)).toFixed(2)
          ),
          items: [products[4] || products[0], products[5] || products[1]].filter(Boolean)
        }
      ]
    }
  } catch (error) {
    console.error('Using high-performance CDN images for mock orders:', error)
  }
})

// Filtered orders based on selected tab
const filteredOrders = computed(() => {
  if (activeTab.value === 'processing') {
    return mockOrders.value.filter((order) => order.status === 'Processing')
  }
  if (activeTab.value === 'completed') {
    return mockOrders.value.filter((order) => order.status === 'Completed')
  }
  return mockOrders.value
})
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-6 sm:space-y-8">
    <!-- Header Title -->
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
        My Orders
      </h1>
      <p class="text-xs sm:text-sm text-gray-500 mt-1">
        Manage and track your recent order history
      </p>
    </div>

    <!-- Clean Tabs Component -->
    <div class="border-b border-gray-200">
      <nav class="flex space-x-6 sm:space-x-8" aria-label="Order Tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="pb-3 text-sm font-medium transition-all relative cursor-pointer outline-none"
          :class="[
            activeTab === tab.id
              ? 'text-[#7047EB] font-semibold'
              : 'text-gray-500 hover:text-gray-800'
          ]"
        >
          {{ tab.label }}
          <!-- Clean Purple Underline indicator for active tab -->
          <span
            v-if="activeTab === tab.id"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7047EB] rounded-full"
          ></span>
        </button>
      </nav>
    </div>

    <!-- Orders List -->
    <div v-if="filteredOrders.length > 0" class="space-y-4 sm:space-y-5">
      <OrderCard
        v-for="order in filteredOrders"
        :key="order.id"
        :order="order"
      />
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4 my-8"
    >
      <div class="w-16 h-16 sm:w-20 sm:h-20 bg-purple-50 text-[#7047EB] rounded-full flex items-center justify-center shadow-xs">
        <ShoppingBag class="w-8 h-8 sm:w-10 sm:h-10" />
      </div>

      <div class="space-y-1 max-w-sm">
        <h3 class="text-base sm:text-lg font-semibold text-gray-900">
          You haven't placed any orders yet
        </h3>
        <p class="text-xs sm:text-sm text-gray-500">
          When you place orders, they will appear here so you can easily track their status.
        </p>
      </div>

      <RouterLink
        to="/"
        class="mt-2 inline-flex items-center space-x-2 bg-[#7047EB] hover:bg-[#5b37ce] text-white px-6 py-2.5 rounded-full font-medium text-sm transition-all shadow-sm hover:shadow-md cursor-pointer"
      >
        <span>Start Shopping</span>
        <ArrowRight class="w-4 h-4" />
      </RouterLink>
    </div>
  </div>
</template>
