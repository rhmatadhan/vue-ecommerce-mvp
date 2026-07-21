<script setup>
defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  selectedCategory: {
    type: String,
    default: 'all'
  }
})

const emit = defineEmits(['select'])

const formatCategoryName = (cat) => {
  if (cat === 'all') return 'All'
  return cat
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
</script>

<template>
  <div class="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-none">
    <button
      @click="emit('select', 'all')"
      class="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer"
      :class="[
        selectedCategory === 'all'
          ? 'bg-[#7047EB] text-white shadow-md shadow-purple-200'
          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
      ]"
    >
      All
    </button>
    <button
      v-for="cat in categories"
      :key="cat"
      @click="emit('select', cat)"
      class="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap capitalize cursor-pointer"
      :class="[
        selectedCategory === cat
          ? 'bg-[#7047EB] text-white shadow-md shadow-purple-200'
          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
      ]"
    >
      {{ formatCategoryName(cat) }}
    </button>
  </div>
</template>
