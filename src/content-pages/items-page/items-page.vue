<script setup>
  import { ref, reactive } from 'vue'
  import { storeToRefs } from 'pinia'
  import ItemCard from './partials/item-card'
  import CreateItemModal from './modals/create-item-modal.vue'
  import EditItemModal from './modals/edit-item-modal.vue'
  import DeleteItemModal from './modals/delete-item-modal.vue'
  import { useItemsStore } from '../../stores/items'

  const { items } = storeToRefs(useItemsStore())
  const { fetchItems } = useItemsStore()

  fetchItems()

  let clickedItem = reactive({})

  const createItemModal = ref(null)
  const openCreateItemModal = () => {
    createItemModal.value.open()
  }

  const editItemModal = ref(null)
  const openEditItemModal = item => {
    editItemModal.value.open(item)
  }

  const deleteItemModal = ref(null)
  const openDeleteItemModal = item => {
    Object.assign(clickedItem, item)
    deleteItemModal.value.open()
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

  <section
    v-if="items.length"
    id="items-page-section"
  >
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
