<script setup>
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-vue-next'
import { useCartStore } from '../../stores/cartStore'

const cartStore = useCartStore()

const formatPrice = (price) => {
  if (typeof price === 'number') {
    return `$${price.toFixed(2)}`
  }
  return `$${price}`
}
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop & Drawer Outer Transition -->
    <Transition name="cart-drawer">
      <div
        v-if="cartStore.isCartOpen"
        class="fixed inset-0 z-50 overflow-hidden"
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        <!-- Background Overlay (Dark Transparent) -->
        <div
          class="fixed inset-0 bg-black/50 backdrop-blur-xs cart-overlay"
          @click="cartStore.closeCart"
        />

        <div class="fixed inset-y-0 right-0 flex max-w-full pl-6 sm:pl-10 pointer-events-none">
          <!-- Slide-over Drawer Panel -->
          <div class="w-full max-w-md bg-white shadow-2xl flex flex-col h-full pointer-events-auto cart-panel">
            
            <!-- 1. Header Cart -->
            <div class="px-4 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
              <div class="flex items-center space-x-2">
                <h2 id="slide-over-title" class="text-xl font-bold text-gray-900 tracking-tight">
                  My Cart
                </h2>
                <span
                  v-if="cartStore.totalItems > 0"
                  class="text-xs font-semibold bg-purple-100 text-[#7047EB] px-2.5 py-0.5 rounded-full"
                >
                  {{ cartStore.totalItems }} {{ cartStore.totalItems === 1 ? 'item' : 'items' }}
                </span>
              </div>
              <button
                type="button"
                @click="cartStore.closeCart"
                class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition cursor-pointer"
                aria-label="Close Cart"
              >
                <X class="w-5 h-5" />
              </button>
            </div>

            <!-- 2. Cart Item List (Scrollable Area) -->
            <div class="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
              <!-- Empty Cart View -->
              <div
                v-if="cartStore.items.length === 0"
                class="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div class="w-20 h-20 bg-purple-50 text-[#7047EB] rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag class="w-10 h-10" />
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-1">Your cart is empty</h3>
                <p class="text-sm text-gray-500 max-w-xs mb-6">
                  Looks like you haven't added any products to your cart yet.
                </p>
                <button
                  @click="cartStore.closeCart"
                  class="bg-[#7047EB] hover:bg-[#5b36cb] text-white px-6 py-2.5 rounded-xl font-medium text-sm transition shadow-xs cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>

              <!-- Cart Items List -->
              <div v-else class="space-y-4 divide-y divide-gray-100">
                <div
                  v-for="item in cartStore.items"
                  :key="item.product.id"
                  class="pt-4 first:pt-0 flex items-center gap-3.5 group"
                >
                  <!-- Square Thumbnail (Light Gray Background) -->
                  <div class="w-16 h-16 bg-gray-100 rounded-xl p-2 shrink-0 flex items-center justify-center overflow-hidden border border-gray-100">
                    <img
                      :src="item.product.image"
                      :alt="item.product.title"
                      class="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <!-- Product Name & Price -->
                  <div class="flex-1 min-w-0 pr-1">
                    <h4 class="text-sm font-semibold text-gray-900 truncate leading-snug" :title="item.product.title">
                      {{ item.product.title }}
                    </h4>
                    <p class="text-sm font-bold text-[#7047EB] mt-0.5">
                      {{ formatPrice(item.product.price) }}
                    </p>
                  </div>

                  <!-- Minimalist Quantity Stepper Control -->
                  <div class="flex items-center space-x-1.5 bg-gray-50 border border-gray-200 rounded-lg p-1 shrink-0">
                    <button
                      type="button"
                      @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)"
                      class="w-6 h-6 rounded-md bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 flex items-center justify-center transition cursor-pointer shadow-2xs"
                      aria-label="Decrease quantity"
                    >
                      <Minus class="w-3 h-3 stroke-[2.5]" />
                    </button>
                    
                    <span class="w-6 text-center text-xs font-bold text-gray-900 select-none">
                      {{ item.quantity }}
                    </span>

                    <button
                      type="button"
                      @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
                      class="w-6 h-6 rounded-md bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 flex items-center justify-center transition cursor-pointer shadow-2xs"
                      aria-label="Increase quantity"
                    >
                      <Plus class="w-3 h-3 stroke-[2.5]" />
                    </button>
                  </div>

                  <!-- Trash Icon Button -->
                  <button
                    type="button"
                    @click="cartStore.removeFromCart(item.product.id)"
                    class="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition shrink-0 cursor-pointer"
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- 3. Checkout Area (Sticky Bottom) -->
            <div v-if="cartStore.items.length > 0" class="px-4 sm:px-6 py-4 bg-white border-t border-gray-100 shrink-0 shadow-lg space-y-4">
              <!-- Subtotal Summary -->
              <div class="flex items-center justify-between text-base">
                <span class="font-medium text-gray-600">Subtotal</span>
                <span class="text-xl font-bold text-gray-900">
                  {{ formatPrice(cartStore.totalPrice) }}
                </span>
              </div>

              <!-- Purple Checkout Button -->
              <button
                type="button"
                class="w-full bg-[#7047EB] hover:bg-[#5b36cb] active:scale-[0.99] text-white py-3.5 px-4 rounded-xl font-bold text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Checkout</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Opening & Closing Animations for Cart Drawer */
.cart-drawer-enter-active .cart-overlay,
.cart-drawer-leave-active .cart-overlay {
  transition: opacity 0.3s ease-in-out;
}

.cart-drawer-enter-active .cart-panel,
.cart-drawer-leave-active .cart-panel {
  transition: transform 0.3s ease-in-out;
}

.cart-drawer-enter-from .cart-overlay,
.cart-drawer-leave-to .cart-overlay {
  opacity: 0;
}

.cart-drawer-enter-to .cart-overlay,
.cart-drawer-leave-from .cart-overlay {
  opacity: 1;
}

.cart-drawer-enter-from .cart-panel,
.cart-drawer-leave-to .cart-panel {
  transform: translateX(100%);
}

.cart-drawer-enter-to .cart-panel,
.cart-drawer-leave-from .cart-panel {
  transform: translateX(0);
}
</style>
