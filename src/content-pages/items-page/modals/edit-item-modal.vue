<script setup>
  import { ref } from 'vue'
  import WmDialog from '../../../components/general/wm-dialog/wm-dialog'
  import ItemForm from './forms/item-form'
  import { useItemsStore } from '../../../stores/items'

  const dialog = ref(null)
  const form = ref(null)

  const open = item => {
    // provide/inject
    setTimeout(() => form.value.setItem(item))
    dialog.value.open()
  }

  const { updateItem } = useItemsStore()

  const editItem = async () => {
    const isValid = await form.value.validate()
    if (!isValid) return
    const item = form.value.getItem()
    updateItem(item)
    dialog.value.close()
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
