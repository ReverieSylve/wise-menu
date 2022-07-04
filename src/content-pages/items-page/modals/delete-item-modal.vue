<script setup>
  import { useItemsStore } from '../../../stores/items'
  import WmDialog from '../../../components/general/wm-dialog/wm-dialog'
  import { computed } from 'vue'

  const props = defineProps({
    item: {
      type: Object,
      default: null
    }
  })
  const dialog = $ref(null)
  const { deleteItem } = useItemsStore()
  const dialogText = computed(
    () => `Are you sure you want to delete "${props.item.name}"?`
  )

  const open = () => {
    dialog.open()
  }
  const removeItem = id => {
    deleteItem(id)
    dialog.close()
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
        color="info"
        variant="flat"
        @click="removeItem(item.id)"
      >
        Delete
      </v-btn>
    </template>
  </wm-dialog>
</template>
