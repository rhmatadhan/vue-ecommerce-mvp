<script setup>
import { Star, Plus } from 'lucide-vue-next'
import { useCartStore } from '../../stores/cartStore'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()

const handleAddToCart = (e) => {
  e.preventDefault()
  e.stopPropagation()
  cartStore.addToCart(props.product)
}
</script>

<template>
  <div class="bg-white rounded-2xl p-4 flex flex-col justify-between h-full relative border border-gray-100/80 shadow-xs hover:shadow-lg transition-all duration-300 group">
    <!-- Image Area with Badge -->
    <div class="relative w-full h-48 bg-gray-50/70 rounded-xl p-4 flex items-center justify-center overflow-hidden mb-3">
      <!-- Badge if available -->
      <span
        v-if="product.badge"
        class="absolute top-2.5 left-2.5 text-xs font-semibold px-2.5 py-1 rounded-lg text-white shadow-xs z-10"
        :class="[
          product.badge === 'New' ? 'bg-pink-500' : 'bg-red-500'
        ]"
      >
        {{ product.badge }}
      </span>

      <img
        :src="product.image"
        :alt="product.title"
        class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>

    <!-- Product Info -->
    <div class="flex-1 flex flex-col justify-between">
      <div>
        <h3 class="text-sm font-semibold text-gray-900 line-clamp-2 min-h-10 leading-snug group-hover:text-[#7047EB] transition-colors">
          {{ product.title }}
        </h3>

        <!-- Rating -->
        <div class="flex items-center space-x-1 mt-1.5">
          <Star class="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span class="text-xs font-medium text-gray-600">
            {{ product.rating?.rate ?? product.rating ?? 4.5 }}
          </span>
          <span v-if="product.rating?.count" class="text-xs text-gray-400">
            ({{ product.rating.count }})
          </span>
        </div>
      </div>

      <!-- Price & Action Button -->
      <div class="flex items-center justify-between mt-4 pt-2 border-t border-gray-50">
        <div class="flex flex-col">
          <div class="flex items-baseline space-x-1.5">
            <span class="text-base font-bold text-gray-900">
              ${{ typeof product.price === 'number' ? product.price.toFixed(2) : product.price }}
            </span>
            <span v-if="product.originalPrice" class="text-xs text-gray-400 line-through">
              ${{ typeof product.originalPrice === 'number' ? product.originalPrice.toFixed(2) : product.originalPrice }}
            </span>
          </div>
        </div>

        <button
          @click="handleAddToCart"
          class="bg-[#7047EB] hover:bg-[#5b36cb] text-white p-2.5 rounded-full shadow-xs transition-all duration-200 transform active:scale-95 cursor-pointer flex items-center justify-center"
          title="Add to Cart"
        >
          <Plus class="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  </div>
</template>
