<script setup>
import { ref, watch } from 'vue'
import { ShoppingBag, Package } from 'lucide-vue-next'

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

const imageError = ref(false)

// Reset image error if order prop changes
watch(
  () => props.order,
  () => {
    imageError.value = false
  }
)

const handleImageError = () => {
  imageError.value = true
}

const formatPrice = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount)
}
</script>

<template>
  <div class="bg-white rounded-xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-4 sm:p-6 space-y-3.5 sm:space-y-4 hover:shadow-md transition-shadow duration-300">
    <!-- Header Card: Icon, Category/Date & Status Badge -->
    <div class="flex items-center justify-between pb-3 border-b border-gray-100">
      <div class="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
        <div class="p-1.5 bg-purple-50 text-[#7047EB] rounded-lg shrink-0">
          <ShoppingBag class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <span class="font-semibold text-gray-800">Belanja</span>
        <span class="text-gray-300">•</span>
        <span class="text-gray-500">{{ order.date }}</span>
      </div>

      <!-- Status Badge -->
      <span
        class="text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full capitalize shrink-0"
        :class="{
          'bg-green-100 text-green-700': order.status === 'Completed',
          'bg-amber-100 text-amber-700': order.status === 'Processing',
          'bg-gray-100 text-gray-600': order.status !== 'Completed' && order.status !== 'Processing'
        }"
      >
        {{ order.status === 'Completed' ? 'Selesai' : order.status === 'Processing' ? 'Diproses' : order.status }}
      </span>
    </div>

    <!-- Middle Section: Thumbnail, Product Name & Items Count -->
    <div class="flex items-center space-x-3 sm:space-x-4 py-0.5 sm:py-1">
      <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gray-50 p-1.5 sm:p-2 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
        <img
          v-if="order.items?.[0]?.image && !imageError"
          :src="order.items[0].image"
          :alt="order.items[0]?.title"
          @error="handleImageError"
          class="w-full h-full object-contain"
          loading="eager"
        />
        <Package v-else class="w-7 h-7 text-[#7047EB]/60" />
      </div>

      <div class="flex-1 min-w-0">
        <h4 class="font-medium sm:font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 sm:truncate leading-snug">
          {{ order.items?.[0]?.title || 'Product Item' }}
        </h4>
        <p v-if="order.items?.length > 1" class="text-xs sm:text-sm text-gray-500 mt-1">
          + {{ order.items.length - 1 }} item lainnya
        </p>
        <p v-else class="text-xs sm:text-sm text-gray-400 mt-1">
          1 item
        </p>
      </div>
    </div>

    <!-- Bottom Section: Total Price & Buy Again Button -->
    <div class="flex items-center justify-between pt-3 border-t border-gray-100">
      <div>
        <span class="text-[11px] sm:text-xs text-gray-500 block">Total Belanja</span>
        <span class="font-bold text-gray-900 text-sm sm:text-lg">
          {{ formatPrice(order.totalAmount) }}
        </span>
      </div>

      <button
        type="button"
        class="border border-[#7047EB] text-[#7047EB] hover:bg-purple-50 focus:ring-2 focus:ring-[#7047EB]/20 transition-all duration-200 rounded-full text-xs sm:text-sm font-medium px-3.5 sm:px-5 py-1.5 sm:py-2 cursor-pointer inline-flex items-center space-x-1.5"
      >
        <span>Buy Again</span>
      </button>
    </div>
  </div>
</template>
