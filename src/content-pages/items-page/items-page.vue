<script setup>
  import { storeToRefs } from 'pinia'
  import { useItemsStore } from '../../stores/items'
  /* eslint-disable no-unused-vars */
  import CreateItemModal from './modals/create-item-modal.vue'
  import EditItemModal from './modals/edit-item-modal.vue'
  import DeleteItemModal from './modals/delete-item-modal.vue'
  /* eslint-disable no-unused-vars */
  import ItemCard from './partials/item-card'

  const { items } = storeToRefs(useItemsStore())
  const { fetchItems, getItemById } = useItemsStore()

  fetchItems()

  let clickedItem = $ref({})

  const createItemModal = $ref(null)
  const openCreateItemModal = () => {
    createItemModal.open()
  }

  const editItemModal = $ref(null)
  const openEditItemModal = id => {
    const item = getItemById(id)
    editItemModal.open(item)
  }

  const deleteItemModal = $ref(null)
  const openDeleteItemModal = item => {
    clickedItem = item
    deleteItemModal.open()
  }
</script>

<template>
  <v-btn
    id="create-item-button"
    variant="outlined"
    @click="openCreateItemModal"
  >
    Create Item
  </v-btn>

  <v-divider class="my-5" />

  <section v-if="items.length">
    <item-card
      v-for="item of items"
      :key="item.id"
      :item="item"
      @delete-item="openDeleteItemModal"
      @edit-item="openEditItemModal"
    />
  </section>

  <no-data v-else />

  <create-item-modal
    ref="createItemModal"
    @item-created="fetchItems"
  />
  <edit-item-modal
    ref="editItemModal"
    @item-edited="fetchItems"
  />
  <delete-item-modal
    ref="deleteItemModal"
    :item="clickedItem"
    @item-deleted="fetchItems"
  />
</template>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
    gap: 24px;
  }
</style>
