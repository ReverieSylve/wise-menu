<script setup>
  import { ref, computed } from 'vue'
  import WmDialog from '../../../components/general/wm-dialog/wm-dialog'
  import { useItemsStore } from '../../../stores/items'

  const props = defineProps({
    item: {
      type: Object,
      default: null
    }
  })
  const dialog = ref(null)
  const { deleteItem } = useItemsStore()
  const dialogText = computed(
    () => `Are you sure you want to delete "${props.item.name}"?`
  )

  const open = () => {
    dialog.value.open()
  }
  const removeItem = id => {
    deleteItem(id)
    dialog.value.close()
  }

  defineExpose({
    open
  })
</script>

<template>
  <wm-dialog
    ref="dialog"
    title="Delete Item"
    :text="dialogText"
  >
    <template #actions>
      <v-btn
        color="blue-darken-1"
        variant="outlined"
        @click="dialog.close"
      >
        Cancel
      </v-btn>
      <v-btn
        id="submit-delete-item-button"
        color="info"
        variant="flat"
        @click="removeItem(item.id)"
      >
        Delete
      </v-btn>
    </template>
  </wm-dialog>
</template>
