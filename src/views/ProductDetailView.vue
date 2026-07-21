<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Star, ArrowLeft, ShoppingCart, Plus, Minus, Check } from 'lucide-vue-next'
import { getProductDetail } from '../api/fakestore'
import { useCartStore } from '../stores/cartStore'
import ProductDetailSkeleton from '../components/product/ProductDetailSkeleton.vue'

const route = useRoute()
const cartStore = useCartStore()

const product = ref(null)
const isLoading = ref(true)
const fetchError = ref(null)
const quantity = ref(1)
const showAddedToast = ref(false)

const loadProduct = async (id) => {
  try {
    isLoading.value = true
    fetchError.value = null
    const data = await getProductDetail(id)
    if (!data) {
      fetchError.value = 'Produk tidak ditemukan.'
    } else {
      product.value = data
    }
  } catch (err) {
    console.error('Failed to fetch product details:', err)
    fetchError.value = 'Gagal memuat detail produk. Silakan coba lagi.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (route.params.id) {
    loadProduct(route.params.id)
  }
})

watch(() => route.params.id, (newId) => {
  if (newId) {
    quantity.value = 1
    loadProduct(newId)
  }
})

const incrementQuantity = () => {
  quantity.value++
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const handleAddToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value, quantity.value)
    showAddedToast.value = true
    setTimeout(() => {
      showAddedToast.value = false
    }, 2500)
  }
}
</script>

<template>
  <div>
    <!-- Loading State Skeleton -->
    <ProductDetailSkeleton v-if="isLoading" />

    <!-- Error State -->
    <div v-else-if="fetchError" class="bg-white rounded-3xl p-8 sm:p-12 text-center max-w-lg mx-auto shadow-xs border border-gray-100 my-8">
      <div class="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <span class="text-2xl font-bold">!</span>
      </div>
      <h2 class="text-xl font-bold text-gray-900 mb-2">Terjadi Kesalahan</h2>
      <p class="text-gray-500 text-sm mb-6">{{ fetchError }}</p>
      <RouterLink
        to="/"
        class="inline-flex items-center space-x-2 bg-[#7047EB] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#5b36cb] transition-colors shadow-xs"
      >
        <ArrowLeft class="w-4 h-4" />
        <span>Kembali ke Beranda</span>
      </RouterLink>
    </div>

    <!-- Product Detail Content -->
    <div v-else-if="product" class="space-y-6">
      <!-- Breadcrumb / Back Button -->
      <div>
        <RouterLink
          to="/"
          class="inline-flex items-center space-x-2 text-sm font-medium text-gray-500 hover:text-[#7047EB] transition-colors group"
        >
          <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Kembali ke Beranda</span>
        </RouterLink>
      </div>

      <!-- Main 2-Column / Mobile Stack Layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <!-- Kolom Kiri: Gambar Produk (Clean White Box with Padding) -->
        <div class="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100/80 shadow-xs flex items-center justify-center min-h-87.5 sm:min-h-105 relative overflow-hidden group">
          <img
            :src="product.image"
            :alt="product.title"
            class="max-h-80 sm:max-h-95 w-auto max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <!-- Kolom Kanan: Informasi Teks & Action Area -->
        <div class="flex flex-col justify-between h-full py-1 sm:py-2">
          <div class="space-y-4 sm:space-y-5">
            <!-- Label Kategori (Paling Atas, Teks Kecil, Warna Sekunder) -->
            <div>
              <span class="inline-block text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {{ product.category }}
              </span>
            </div>

            <!-- Judul Produk (Besar & Tebal: text-2xl / text-3xl) -->
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight tracking-tight">
              {{ product.title }}
            </h1>

            <!-- Rating Visual (Bintang Kuning + Teks Angka) -->
            <div class="flex items-center space-x-2">
              <div class="flex items-center space-x-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100/60">
                <Star class="w-4 h-4 text-amber-400 fill-amber-400" />
                <span class="text-sm font-bold text-amber-700">
                  {{ product.rating?.rate ?? 4.5 }}
                </span>
              </div>
              <span class="text-xs sm:text-sm text-gray-400 font-medium">
                • {{ product.rating?.count ?? 0 }} Ulasan Pelanggan
              </span>
            </div>

            <!-- Harga (Sangat Menonjol: text-3xl font-bold) -->
            <div class="pt-1">
              <span class="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                ${{ typeof product.price === 'number' ? product.price.toFixed(2) : product.price }}
              </span>
            </div>

            <!-- Deskripsi (Spasi Baris Nyaman / leading-relaxed) -->
            <div class="pt-2 border-t border-gray-100">
              <h3 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Deskripsi Produk</h3>
              <p class="text-gray-600 leading-relaxed text-sm sm:text-base font-normal">
                {{ product.description }}
              </p>
            </div>
          </div>

          <!-- Action Area (Bawah Area Teks) -->
          <div class="pt-6 sm:pt-8 mt-6 border-t border-gray-100 space-y-4">
            <div class="flex flex-col sm:flex-row items-center gap-4">
              <!-- Quantity Stepper -->
              <div class="flex items-center justify-between border border-gray-200 rounded-full px-4 py-2 w-full sm:w-auto space-x-4 bg-white shadow-2xs">
                <button
                  @click="decrementQuantity"
                  :disabled="quantity <= 1"
                  class="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  title="Kurangi Jumlah"
                >
                  <Minus class="w-4 h-4" />
                </button>
                <span class="text-base font-bold text-gray-900 min-w-6 text-center">
                  {{ quantity }}
                </span>
                <button
                  @click="incrementQuantity"
                  class="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                  title="Tambah Jumlah"
                >
                  <Plus class="w-4 h-4" />
                </button>
              </div>

              <!-- Tombol Add to Cart (Full width di mobile, warna bg-[#7047EB], rounded-full) -->
              <button
                @click="handleAddToCart"
                class="w-full flex-1 bg-[#7047EB] hover:bg-[#5b36cb] text-white py-3.5 px-6 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform active:scale-[0.99] cursor-pointer flex items-center justify-center space-x-2 group"
              >
                <ShoppingCart class="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span>Add to Cart</span>
              </button>
            </div>

            <!-- Added Notification Toast -->
            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <div
                v-if="showAddedToast"
                class="flex items-center space-x-2 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 p-3 rounded-2xl shadow-2xs"
              >
                <div class="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Check class="w-3.5 h-3.5 stroke-3" />
                </div>
                <span>Berhasil menambahkan {{ quantity }} barang ke keranjang belanja!</span>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
