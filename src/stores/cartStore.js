import { defineStore } from 'pinia'
import { getCart, getProductDetail, updateCartApi } from '../api/fakestore'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [], // array of { product: Object, quantity: Number }
    isCartOpen: false,
    isLoading: false,
    isInitialized: false
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
    async fetchInitialCart(cartId = 1) {
      if (this.isInitialized) return
      try {
        this.isLoading = true
        const cartData = await getCart(cartId)
        if (cartData && cartData.products && cartData.products.length > 0) {
          const productPromises = cartData.products.map(async (item) => {
            const product = await getProductDetail(item.productId)
            return { product, quantity: item.quantity }
          })
          this.items = await Promise.all(productPromises)
        }
        this.isInitialized = true
      } catch (error) {
        console.error('Failed to fetch initial cart from FakeStoreAPI:', error)
      } finally {
        this.isLoading = false
      }
    },
    async syncWithApi() {
      try {
        const payload = {
          userId: 1,
          date: new Date().toISOString().split('T')[0],
          products: this.items.map(item => ({
            productId: item.product.id,
            quantity: item.quantity
          }))
        }
        await updateCartApi(1, payload)
      } catch (error) {
        console.warn('FakeStoreAPI cart sync warning:', error)
      }
    },
    openCart() {
      this.isCartOpen = true
    },
    closeCart() {
      this.isCartOpen = false
    },
    toggleCart() {
      this.isCartOpen = !this.isCartOpen
    },
    addToCart(product, quantity = 1) {
      const existingItem = this.items.find(item => item.product.id === product.id)
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({ product, quantity })
      }
      this.syncWithApi()
    },
    removeFromCart(productId) {
      this.items = this.items.filter(item => item.product.id !== productId)
      this.syncWithApi()
    },
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.product.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(productId)
        } else {
          item.quantity = quantity
          this.syncWithApi()
        }
      }
    },
    clearCart() {
      this.items = []
      this.syncWithApi()
    }
  }
})
