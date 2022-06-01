<script setup>
  import { useItemsStore } from '../../../stores/items'
  defineProps({
    item: {
      type: Object,
      default: null
    }
  })

  const { deleteItem } = useItemsStore()

  let opened = $ref(false)
  const open = () => (opened = true)
  const removeItem = id => {
    deleteItem(id)
    opened = false
  }

  defineExpose({
    open
  })
</script>

<template>
  <v-dialog v-model="opened">
    <v-card title="Delete Item">
      <template #append>
        <v-icon
          icon="mdi-window-close"
          @click="opened = false"
        />
      </template>

      <v-card-text>
        Are you sure you want to delete "{{ item.name }}"?
      </v-card-text>
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
          @click="removeItem(item.id)"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
