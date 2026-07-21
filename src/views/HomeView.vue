<script setup>
import { ref, onMounted, computed } from 'vue'
import HeroBanner from '../components/home/HeroBanner.vue'
import CategoryFilter from '../components/home/CategoryFilter.vue'
import ProductCard from '../components/product/ProductCard.vue'
import ProductCardSkeleton from '../components/product/ProductCardSkeleton.vue'
import { getProducts, getCategories, getProductsByCategory } from '../api/fakestore'

const categories = ref([])
const selectedCategory = ref('all')
const products = ref([])
const isLoading = ref(true)
const isCategoryLoading = ref(false)

const trendingProducts = ref([])

onMounted(async () => {
  try {
    isLoading.value = true
    // Fetch categories and initial products in parallel
    const [catRes, prodRes] = await Promise.all([
      getCategories(),
      getProducts()
    ])

    categories.value = catRes
    products.value = prodRes

    // Decorate initial 4 products as "Trending Now" items with badges
    if (prodRes.length > 0) {
      trendingProducts.value = prodRes.slice(0, 4).map((item, index) => {
        if (index === 0) {
          return { ...item, badge: 'New' }
        }
        if (index === 2) {
          return {
            ...item,
            badge: '-15%',
            originalPrice: Number((item.price * 1.18).toFixed(2))
          }
        }
        return item
      })
    }
  } catch (error) {
    console.error('Failed to load home page data:', error)
  } finally {
    isLoading.value = false
  }
})

const handleCategorySelect = async (category) => {
  selectedCategory.value = category
  try {
    isCategoryLoading.value = true
    if (category === 'all') {
      products.value = await getProducts()
    } else {
      products.value = await getProductsByCategory(category)
    }
  } catch (error) {
    console.error('Failed to filter products:', error)
  } finally {
    isCategoryLoading.value = false
  }
}

// Display products for trending section
const displayedProducts = computed(() => {
  if (selectedCategory.value !== 'all') {
    return products.value.slice(0, 4)
  }
  return trendingProducts.value
})

// Display recommended products (selection of products from API)
const recommendedProducts = computed(() => {
  if (products.value.length <= 4) {
    return products.value
  }
  // Select items from index 4 onwards for recommendations
  return products.value.slice(4, 8)
})
</script>

<template>
  <div class="space-y-8 sm:space-y-12">
    <!-- Hero Banner -->
    <section>
      <HeroBanner :featuredProducts="trendingProducts" />
    </section>

    <!-- Category Filter -->
    <section>
      <CategoryFilter
        :categories="categories"
        :selectedCategory="selectedCategory"
        @select="handleCategorySelect"
      />
    </section>

    <!-- Trending Now Section -->
    <section>
      <div class="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Trending Now
          </h2>
          <p class="text-xs sm:text-sm text-gray-500 mt-0.5">
            Most popular items this week
          </p>
        </div>
        <a
          href="#"
          @click.prevent
          class="text-sm font-semibold text-[#7047EB] hover:text-[#5b36cb] transition-colors"
        >
          View All
        </a>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading || isCategoryLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCardSkeleton v-for="n in 4" :key="n" />
      </div>

      <!-- Product Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in displayedProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>

    <!-- Recommended for You Section -->
    <section class="pt-2">
      <div class="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Recommended for You
          </h2>
          <p class="text-xs sm:text-sm text-gray-500 mt-0.5">
            Curated picks based on top customer ratings
          </p>
        </div>
      </div>

      <!-- Displays Skeleton Cards while loading, then actual Product Cards -->
      <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCardSkeleton v-for="n in 4" :key="'rec-skel-' + n" />
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in recommendedProducts"
          :key="'rec-' + product.id"
          :product="product"
        />
      </div>
    </section>
  </div>
</template>
