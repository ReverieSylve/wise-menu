<script setup>
import { useFetch } from '@vueuse/core'
defineProps({
  item: Object
})
const emit = defineEmits(['item-deleted'])

let opened = $ref(false)
const open = () => (opened = true)

const deleteItem = async item => {
  await useFetch(`api/items/${item.id}`).delete().text()
  opened = false
  emit('item-deleted')
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog v-model="opened" title="Create" width="30%">
    <span
      class="modal-body-text">Are you sure that you want to delete {{item.title}}.</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="opened = false">Cancel</el-button>
        <el-button type="primary" @click="deleteItem(item)">Delete</el-button>
      </span>
    </template>

  </el-dialog>
</template>

<style>
.modal-body-text {
  word-break: normal;
}
</style>
