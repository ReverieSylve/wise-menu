<script setup>
  import { ref } from 'vue'

  defineProps({
    title: {
      type: String,
      default: 'Dialog Title'
    },
    text: {
      type: String,
      default: 'Dialog Text'
    },
    size: {
      type: String,
      default: 'large'
    }
  })
  let opened = ref(false)
  const open = () => {
    opened.value = true
  }
  const close = () => {
    opened.value = false
  }

  defineExpose({ open, close })
</script>

<template>
  <v-dialog
    v-model="opened"
    :size="size"
  >
    <v-card
      :title="title"
      :text="text"
    >
      <template #append>
        <v-icon
          icon="mdi-window-close"
          @click="close"
        />
      </template>

      <slot name="body" />

      <v-card-actions class="pa-6">
        <v-spacer />

        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
  [size='small'] {
    width: min(100%, 500px);
  }

  [size='medium'] {
    width: min(100%, 700px);
  }

  [size='large'] {
    width: min(100%, 900px);
  }

  .mdi-window-close {
    cursor: pointer;
  }
</style>
