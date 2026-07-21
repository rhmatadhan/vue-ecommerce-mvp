<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Star, ShoppingCart, ChevronLeft, ChevronRight, Sparkles } from 'lucide-vue-next'
import { useCartStore } from '../../stores/cartStore'

const props = defineProps({
  featuredProducts: {
    type: Array,
    default: () => []
  }
})

const cartStore = useCartStore()
const currentIndex = ref(0)
let timer = null

// Fallback sample products if API products are not loaded yet
const defaultProducts = [
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack',
    price: 109.95,
    rating: { rate: 3.9, count: 120 },
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    category: "men's clothing"
  },
  {
    id: 2,
    title: 'Mens Casual Premium Slim Fit T-Shirts',
    price: 22.3,
    rating: { rate: 4.1, count: 259 },
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    category: "men's clothing"
  },
  {
    id: 3,
    title: 'Mens Cotton Jacket',
    price: 55.99,
    rating: { rate: 4.7, count: 500 },
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    category: "men's clothing"
  },
  {
    id: 4,
    title: 'Solid Gold Petite Micropave',
    price: 168,
    rating: { rate: 4.6, count: 70 },
    image: 'https://fakestoreapi.com/img/61sbMiAs0GL._AC_UL640_QL65_ML3_.jpg',
    category: 'jewelery'
  }
]

const displayList = computed(() => {
  return props.featuredProducts && props.featuredProducts.length > 0
    ? props.featuredProducts
    : defaultProducts
})

const currentProduct = computed(() => {
  return displayList.value[currentIndex.value] || displayList.value[0]
})

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % displayList.value.length
}

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + displayList.value.length) % displayList.value.length
}

const setSlide = (index) => {
  currentIndex.value = index
}

const handleAddToCart = (product) => {
  cartStore.addToCart(product)
}

onMounted(() => {
  timer = setInterval(nextSlide, 4000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div
    class="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#6332E9] via-[#A837E8] to-[#E966C2] text-white p-6 sm:p-10 lg:p-14 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8"
  >
    <!-- Background Glow Elements -->
    <div class="absolute -right-10 -bottom-10 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute left-1/3 -top-10 w-64 h-64 bg-purple-400/20 rounded-full blur-2xl pointer-events-none"></div>

    <!-- Left Column: Copywriting -->
    <div class="relative z-10 max-w-xl text-center lg:text-left flex-1">
      <div class="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-4 border border-white/20">
        <Sparkles class="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
        <span>Trending Collection</span>
      </div>

      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-xs">
        Find Your Style,<br />Love Your Look
      </h1>
      <p class="mt-4 text-purple-100 text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
        Discover the latest trends in modern fashion. High-quality pieces designed to elevate your everyday wardrobe.
      </p>

      <div class="mt-6 flex items-center justify-center lg:justify-start space-x-4">
        <button
          class="bg-white text-[#7047EB] font-bold text-sm px-6 py-3 rounded-full shadow-md hover:shadow-xl hover:bg-purple-50 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
        >
          Shop Now
        </button>
      </div>
    </div>

    <!-- Right Column: Interactive Floating Product Carousel -->
    <div class="relative z-10 w-full max-w-sm flex-1 flex flex-col items-center">
      <div class="animate-float w-full">
        <!-- Floating Glassmorphism Card -->
        <div class="bg-white/25 backdrop-blur-xl border border-white/40 rounded-2xl p-5 shadow-2xl relative overflow-hidden transition-all duration-300">
          
          <!-- Slider Content with Fade Transition -->
          <Transition name="fade-slide" mode="out-in">
            <div :key="currentProduct?.id || currentIndex" class="flex flex-col items-center">
              
              <!-- Image Container -->
              <div class="w-full h-44 sm:h-48 bg-white/90 rounded-xl p-4 flex items-center justify-center shadow-inner relative group">
                <img
                  :src="currentProduct?.image"
                  :alt="currentProduct?.title"
                  class="max-h-full max-w-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110"
                />

                <!-- Quick Add to Cart Button -->
                <button
                  @click="handleAddToCart(currentProduct)"
                  class="absolute bottom-2.5 right-2.5 bg-[#7047EB] text-white p-2.5 rounded-full shadow-md hover:bg-[#5b36cb] transition-transform duration-200 hover:scale-110 cursor-pointer flex items-center justify-center"
                  title="Add to Cart"
                >
                  <ShoppingCart class="w-4 h-4" />
                </button>
              </div>

              <!-- Product Info -->
              <div class="w-full mt-4 text-left">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold uppercase tracking-wider text-purple-200">
                    {{ currentProduct?.category || 'Trending' }}
                  </span>
                  <div class="flex items-center space-x-1 text-xs text-yellow-300">
                    <Star class="w-3.5 h-3.5 fill-yellow-300" />
                    <span class="font-bold">{{ currentProduct?.rating?.rate ?? 4.5 }}</span>
                  </div>
                </div>

                <h3 class="text-sm font-semibold text-white line-clamp-1 mt-1">
                  {{ currentProduct?.title }}
                </h3>

                <div class="mt-2 flex items-baseline justify-between">
                  <span class="text-lg font-extrabold text-white">
                    ${{ typeof currentProduct?.price === 'number' ? currentProduct.price.toFixed(2) : currentProduct?.price }}
                  </span>
                  <span class="text-xs bg-white/20 px-2 py-0.5 rounded-md font-medium text-purple-100">
                    Featured
                  </span>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Controls & Dots -->
          <div class="flex items-center justify-between mt-4 pt-3 border-t border-white/20">
            <!-- Navigation arrows -->
            <div class="flex items-center space-x-1">
              <button
                @click="prevSlide"
                class="p-1 rounded-full bg-white/20 hover:bg-white/40 transition text-white cursor-pointer"
                title="Previous Product"
              >
                <ChevronLeft class="w-4 h-4" />
              </button>
              <button
                @click="nextSlide"
                class="p-1 rounded-full bg-white/20 hover:bg-white/40 transition text-white cursor-pointer"
                title="Next Product"
              >
                <ChevronRight class="w-4 h-4" />
              </button>
            </div>

            <!-- Dots Indicator -->
            <div class="flex space-x-1.5">
              <button
                v-for="(item, idx) in displayList"
                :key="item.id || idx"
                @click="setSlide(idx)"
                class="h-2 rounded-full transition-all duration-300 cursor-pointer"
                :class="[
                  currentIndex === idx ? 'w-5 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                ]"
              ></button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Floating keyframe animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

/* Transition for slide fade */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(12px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}
</style>
