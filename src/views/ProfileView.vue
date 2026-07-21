<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Package, CreditCard, Bell, ChevronRight, LogOut, MapPin, User as UserIcon } from 'lucide-vue-next'
import { getUserProfile } from '../api/fakestore'

const user = ref(null)
const isLoading = ref(true)
const error = ref(null)

const avatarUrl = computed(() => {
  if (!user.value || !user.value.name) return ''
  const firstname = user.value.name.firstname || ''
  const lastname = user.value.name.lastname || ''
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(firstname)}+${encodeURIComponent(lastname)}&background=7047EB&color=fff`
})

const fetchProfile = async () => {
  isLoading.value = true
  error.value = null
  try {
    const data = await getUserProfile(1)
    user.value = data
  } catch (err) {
    console.error('Failed to fetch profile:', err)
    error.value = 'Gagal memuat profil pengguna. Silakan coba lagi.'
  } finally {
    isLoading.value = false
  }
}

const handleLogout = () => {
  alert('Anda telah berhasil keluar (Log Out).')
}

onMounted(() => {
  fetchProfile()
})
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 tracking-tight">My Profile</h1>
    </div>

    <!-- Error State -->
    <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl flex items-center justify-between">
      <span>{{ error }}</span>
      <button @click="fetchProfile" class="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition">
        Coba Lagi
      </button>
    </div>

    <!-- Skeleton Loader State -->
    <template v-if="isLoading">
      <!-- Header Card Skeleton -->
      <div class="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row items-center gap-6 animate-pulse">
        <div class="w-24 h-24 bg-gray-200 rounded-full shrink-0"></div>
        <div class="flex-1 space-y-3 w-full text-center md:text-left">
          <div class="h-6 bg-gray-200 rounded-md w-48 mx-auto md:mx-0"></div>
          <div class="h-4 bg-gray-200 rounded-md w-64 mx-auto md:mx-0"></div>
          <div class="h-4 bg-gray-200 rounded-md w-36 mx-auto md:mx-0"></div>
        </div>
      </div>

      <!-- Address Card Skeleton -->
      <div class="bg-white rounded-2xl shadow-sm p-6 space-y-4 animate-pulse">
        <div class="h-5 bg-gray-200 rounded-md w-44"></div>
        <div class="space-y-2">
          <div class="h-4 bg-gray-200 rounded-md w-full"></div>
          <div class="h-4 bg-gray-200 rounded-md w-3/4"></div>
        </div>
      </div>

      <!-- Menu Card Skeleton -->
      <div class="bg-white rounded-2xl shadow-sm p-4 space-y-3 animate-pulse">
        <div v-for="i in 3" :key="i" class="flex items-center justify-between p-3">
          <div class="flex items-center space-x-3 w-full">
            <div class="w-5 h-5 bg-gray-200 rounded-md shrink-0"></div>
            <div class="h-4 bg-gray-200 rounded-md w-32"></div>
          </div>
          <div class="w-4 h-4 bg-gray-200 rounded-md shrink-0"></div>
        </div>
      </div>
    </template>

    <!-- Main Content State -->
    <template v-else-if="user">
      <!-- 1. User Header Card (Profile Info) -->
      <div class="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row items-center gap-6">
        <img
          :src="avatarUrl"
          :alt="`${user.name?.firstname} ${user.name?.lastname}`"
          class="rounded-full w-24 h-24 object-cover shadow-xs border-2 border-purple-50 shrink-0"
        />
        <div class="text-center md:text-left">
          <h2 class="text-xl font-bold text-gray-900 capitalize tracking-tight">
            {{ user.name?.firstname }} {{ user.name?.lastname }}
          </h2>
          <p class="text-gray-500 text-sm mt-1 flex items-center justify-center md:justify-start gap-1.5">
            <span>{{ user.email }}</span>
          </p>
          <p class="text-gray-500 text-sm mt-0.5 flex items-center justify-center md:justify-start gap-1.5">
            <span>{{ user.phone }}</span>
          </p>
        </div>
      </div>

      <!-- 2. Address Card (Informasi Alamat) -->
      <div class="bg-white rounded-2xl shadow-sm p-6">
        <div class="flex items-center space-x-2 mb-3">
          <MapPin class="w-5 h-5 text-[#7047EB]" />
          <h3 class="text-base font-semibold text-gray-900">Default Shipping Address</h3>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed capitalize pl-7">
          {{ user.address?.number }} {{ user.address?.street }}, {{ user.address?.city }}, {{ user.address?.zipcode }}
        </p>
      </div>

      <!-- 3. Menu List Card -->
      <div class="bg-white rounded-2xl shadow-sm p-2">
        <nav class="flex flex-col space-y-1">
          <RouterLink
            to="/orders"
            class="flex items-center justify-between p-3.5 rounded-xl hover:bg-gray-50 transition group cursor-pointer"
          >
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-lg bg-gray-100 group-hover:bg-purple-50 group-hover:text-[#7047EB] text-gray-500 transition">
                <Package class="w-5 h-5" />
              </div>
              <span class="text-sm font-medium text-gray-700 group-hover:text-gray-900">My Orders</span>
            </div>
            <ChevronRight class="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition" />
          </RouterLink>

          <div
            class="flex items-center justify-between p-3.5 rounded-xl hover:bg-gray-50 transition group cursor-pointer"
          >
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-lg bg-gray-100 group-hover:bg-purple-50 group-hover:text-[#7047EB] text-gray-500 transition">
                <CreditCard class="w-5 h-5" />
              </div>
              <span class="text-sm font-medium text-gray-700 group-hover:text-gray-900">Payment Methods</span>
            </div>
            <ChevronRight class="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition" />
          </div>

          <div
            class="flex items-center justify-between p-3.5 rounded-xl hover:bg-gray-50 transition group cursor-pointer"
          >
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-lg bg-gray-100 group-hover:bg-purple-50 group-hover:text-[#7047EB] text-gray-500 transition">
                <Bell class="w-5 h-5" />
              </div>
              <span class="text-sm font-medium text-gray-700 group-hover:text-gray-900">Notifications</span>
            </div>
            <ChevronRight class="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition" />
          </div>
        </nav>
      </div>

      <!-- 4. Logout Button -->
      <button
        @click="handleLogout"
        class="w-full py-3 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl font-semibold transition text-center cursor-pointer flex items-center justify-center space-x-2"
      >
        <LogOut class="w-5 h-5" />
        <span>Log Out</span>
      </button>
    </template>
  </div>
</template>
