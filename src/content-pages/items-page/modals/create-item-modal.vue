<script setup>
  import uniqid from 'uniqid'
  import { useItemsStore } from '../../../stores/items'
  import ItemForm from './forms/item-form'

  let opened = $ref(false)
  const open = () => (opened = true)

  const form = $ref(null)

  const { addItem } = useItemsStore()

  const createItem = async () => {
    const isValid = await form.validate()
    if (!isValid) return
    const item = form.getItem()
    const _payload = { ...item, ...{ id: uniqid() } }
    addItem(_payload)
    opened = false
  }

  defineExpose({
    open
  })
</script>

<template>
  <v-dialog v-model="opened">
    <v-card
      title="Create Item"
      text="Please fill in all required fields and press 'Create' button."
    >
      <template #append>
        <v-icon
          icon="mdi-window-close"
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
          @click="createItem()"
        >
          Create
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
