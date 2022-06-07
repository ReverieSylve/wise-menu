import { defineStore } from 'pinia'

export const useToastersStore = defineStore({
  id: 'toasters',
  state: () => ({
    toasters: []
  }),
  actions: {
    filterToasters() {
      this.toasters = this.toasters.filter(toaster => toaster.show)
    },
    setSuccessToaster(message) {
      this.filterToasters()
      this.toasters.push({
        message,
        show: true,
        type: 'success'
      })
    },
    setErrorToaster(message) {
      this.filterToasters()
      this.toasters.push({
        message,
        show: true,
        type: 'error'
      })
    }
  }
})
