<script setup>
  import { ref } from 'vue'
  // Use native js approach
  import { v4 as uuidv4 } from 'uuid'
  import WmDialog from '../../../components/general/wm-dialog/wm-dialog'
  import ItemForm from './forms/item-form'
  import { useItemsStore } from '../../../stores/items'

  const dialog = ref(null)
  const form = ref(null)

  const open = () => {
    dialog.value.open()
  }
  const { addItem } = useItemsStore()

  const createItem = async () => {
    const isValid = await form.value.validate()
    if (!isValid) return
    const item = form.value.getItem()
    const _payload = { ...item, ...{ id: uuidv4() } }
    addItem(_payload)
    dialog.value.close()
  }

  defineExpose({ open })
</script>

<template>
  <wm-dialog
    ref="dialog"
    title="Create Item"
    text="Please fill in all required fields and press 'Create' button."
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
        id="submit-create-item-button"
        color="info"
        variant="flat"
        @click="createItem"
      >
        Create
      </v-btn>
    </template>
  </wm-dialog>
</template>
