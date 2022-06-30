<script setup>
  import { useItemsStore } from '../../../stores/items'
  import ItemForm from './forms/item-form'

  let opened = $ref(false)
  const form = $ref(null)

  const open = item => {
    setTimeout(() => form.setItem(item))
    opened = true
  }

  const { updateItem } = useItemsStore()

  const editItem = async () => {
    const isValid = await form.validate()
    if (!isValid) return
    const item = form.getItem()
    updateItem(item)
    opened = false
  }

  defineExpose({
    open
  })
</script>

<template>
  <v-dialog v-model="opened">
    <v-card
      text="Please update all required fields and press 'Edit' button."
      title="Edit Item"
    >
      <template #append>
        <v-icon
          icon="mdi-window-close"
          title="Close"
          @click="opened = false"
        />
      </template>

      <item-form ref="form" />

      <v-card-actions class="pa-6">
        <v-spacer />
        <v-btn
          color="blue-darken-1"
          variant="outlined"
          @click="opened = false"
        >
          Cancel
        </v-btn>
        <v-btn
          color="info"
          variant="contained"
          @click="editItem"
        >
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style>
  .mdi-window-close {
    cursor: pointer;
  }
</style>
