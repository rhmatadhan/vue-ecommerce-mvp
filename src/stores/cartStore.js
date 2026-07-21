import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] // array of { product: Object, quantity: Number }
  }),
  getters: {
    totalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    totalPrice: (state) => {
      return state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
    }
  },
  actions: {
    addToCart(product, quantity = 1) {
      const existingItem = this.items.find(item => item.product.id === product.id)
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({ product, quantity })
      }
    },
    removeFromCart(productId) {
      this.items = this.items.filter(item => item.product.id !== productId)
    },
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.product.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(productId)
        } else {
          item.quantity = quantity
        }
      }
    },
    clearCart() {
      this.items = []
    }
  }
})
