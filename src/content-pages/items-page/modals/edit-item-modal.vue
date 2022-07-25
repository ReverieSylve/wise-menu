<script setup>
  import { useItemsStore } from '../../../stores/items'
  import ItemForm from './forms/item-form'
  import WmDialog from '../../../components/general/wm-dialog/wm-dialog'

  const dialog = $ref(null)
  const form = $ref(null)

  const open = item => {
    setTimeout(() => form.setItem(item))
    dialog.open()
  }

  const { updateItem } = useItemsStore()

  const editItem = async () => {
    const isValid = await form.validate()
    if (!isValid) return
    const item = form.getItem()
    updateItem(item)
    dialog.close()
  }

  defineExpose({
    open
  })
</script>

<template>
  <wm-dialog
    ref="dialog"
    title="Edit Item"
    text="Please update all required fields and press 'Edit' button."
  >
    <template #body>
      <item-form ref="form" />
    </template>

    <template #actions>
      <v-btn
        color="blue-darken-1"
        variant="outlined"
        @click="dialog.close"
      >
        Cancel
      </v-btn>
      <v-btn
        id="submit-edit-item-button"
        color="info"
        variant="flat"
        @click="editItem"
      >
        Update
      </v-btn>
    </template>
  </wm-dialog>
</template>
