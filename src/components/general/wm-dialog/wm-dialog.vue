<script setup>
  defineProps({
    title: {
      type: String,
      default: 'Dialog Title'
    },
    text: {
      type: String,
      default: 'Dialog Text'
    }
  })
  let opened = $ref(false)
  const open = () => {
    opened = true
  }
  const close = () => {
    opened = false
  }

  defineExpose({ open, close })
</script>

<template>
  <v-dialog v-model="opened">
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
  .mdi-window-close {
    cursor: pointer;
  }
</style>
