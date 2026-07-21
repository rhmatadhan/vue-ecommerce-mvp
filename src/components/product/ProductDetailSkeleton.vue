<script setup>
</script>

<template>
  <div class="animate-pulse space-y-6">
    <!-- Back Button Skeleton -->
    <div class="w-24 h-5 bg-gray-200 rounded-md"></div>

    <!-- 2 Column Layout Skeleton -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
      <!-- Left Column: Image Box Skeleton -->
      <div class="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-xs flex items-center justify-center min-h-87.5 sm:min-h-105">
        <div class="w-48 sm:w-64 h-48 sm:h-64 bg-gray-200 rounded-xl"></div>
      </div>

      <!-- Right Column: Info Skeleton -->
      <div class="flex flex-col justify-center space-y-5 py-2">
        <!-- Category -->
        <div class="w-24 h-4 bg-gray-200 rounded-md"></div>

        <!-- Title (2 lines) -->
        <div class="space-y-2">
          <div class="w-full h-8 bg-gray-200 rounded-lg"></div>
          <div class="w-3/4 h-8 bg-gray-200 rounded-lg"></div>
        </div>

        <!-- Rating -->
        <div class="flex items-center space-x-2">
          <div class="w-20 h-4 bg-gray-200 rounded-md"></div>
          <div class="w-24 h-4 bg-gray-200 rounded-md"></div>
        </div>

        <!-- Price -->
        <div class="w-32 h-10 bg-gray-200 rounded-xl my-2"></div>

        <!-- Description -->
        <div class="space-y-2 py-4 border-t border-b border-gray-100">
          <div class="w-full h-4 bg-gray-200 rounded-md"></div>
          <div class="w-full h-4 bg-gray-200 rounded-md"></div>
          <div class="w-4/5 h-4 bg-gray-200 rounded-md"></div>
        </div>

        <!-- Action Button Skeleton -->
        <div class="pt-4 flex flex-col sm:flex-row gap-4">
          <div class="w-full sm:w-32 h-12 bg-gray-200 rounded-full"></div>
          <div class="w-full h-12 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
</template>
