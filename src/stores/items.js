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
        this.items = await fetch('api/items').then(response => response.json())
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async addItem(item) {
      this.loading = true
      try {
        await fetch('api/items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
        }).then(() => {
          this.fetchItems()
        })
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async updateItem(id) {},
    async deleteItem(id) {}
  }
})
