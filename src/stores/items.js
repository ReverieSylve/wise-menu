import { defineStore } from 'pinia'
import { useAxios } from '../hooks/useAxios'
export const useItemsStore = defineStore({
  id: 'items',
  state: () => ({
    items: []
  }),
  getters: {
    getItemById(state) {
      return id => {
        const item = state.items.find(item => item.id === id)
        return { ...item }
      }
    }
  },
  actions: {
    async fetchItems() {
      const { data } = await useAxios().get('items')
      this.items = data
    },
    addItem(item) {
      useAxios()
        .post('items', item)
        .then(() => {
          this.fetchItems()
        })
    },
    updateItem(item) {
      useAxios()
        .put(`items/${item.id}`, item)
        .then(() => {
          this.fetchItems()
        })
    },
    deleteItem(id) {
      useAxios()
        .delete(`items/${id}`)
        .then(() => {
          this.fetchItems()
        })
    }
  }
})
