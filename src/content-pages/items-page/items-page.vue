<script setup>
import {useFetch} from '@vueuse/core'
import CreateItemModal from './modals/create-item-modal.vue'
import EditItemModal from './modals/edit-item-modal.vue'
import DeleteItemModal from './modals/delete-item-modal.vue'
import ItemCard from './partials/item-card.vue'

const {data: tasks = [], execute: fetchItems} = useFetch('api/items').get().json()

let clickedItem = $ref({})

const createItemModal = $ref(null)
const openCreateItemModal = () => (createItemModal.open())

const editItemModal = $ref(null)
const openEditItemModal = item => {
  clickedItem = item
  editItemModal.open()
}

const deleteItemModal = $ref(null)
const openDeleteItemModal = item => {
  clickedItem = item
  deleteItemModal.open()
}
</script>

<template>
  <v-btn variant="outlined" @click="openCreateItemModal">Create Item</v-btn>

  <v-divider class="my-5"/>

  <section v-if="tasks?.length">
    <item-card v-for="task of tasks" :item="task" @delete-item="openDeleteItemModal" @edit-item="openEditItemModal"/>
  </section>

  <no-data v-else/>

  <create-item-modal ref="createItemModal" @item-created="fetchItems"/>
  <edit-item-modal :item="clickedItem" ref="editItemModal" @item-edited="fetchItems"/>
  <delete-item-modal :item="clickedItem" @item-deleted="fetchItems" ref="deleteItemModal"/>

</template>
<style>
section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
  gap: 24px;
}
</style>
