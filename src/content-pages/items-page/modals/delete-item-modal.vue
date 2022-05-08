<script setup>
import { useFetch } from '@vueuse/core'
const props = defineProps({
  item: Object
})
const emit = defineEmits(['item-deleted'])

let opened = $ref(false)
const open = () => (opened = true)
const deleteItem = async () => {
  await useFetch(`api/items/${props.item.id}`).delete().text()
  emit('item-deleted')
  opened = false
}

defineExpose({
  open
})
</script>

<template>
  <v-dialog v-model="opened">
    <v-card
      title="Delete Item"
    >
      <template class="mdi-window-close" #append>
        <v-icon icon="mdi-window-close" @click="opened = false"/>
      </template>

      <v-card-text>
        Are you sure you want to delete "{{item.name}}"?
      </v-card-text>
      <v-card-actions class="pa-6">
        <v-spacer/>
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
          @click="deleteItem"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

