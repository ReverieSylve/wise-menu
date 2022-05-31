import { defineStore } from 'pinia'

export const useItemsStore = defineStore({
  id: 'items',
  state: () => ({
    items: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchItems() {
      this.loading = true
      try {
        this.items = await fetch('api/itemsskdfjhk').then(response => response.json())
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})
