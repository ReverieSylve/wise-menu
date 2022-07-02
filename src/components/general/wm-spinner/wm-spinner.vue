<script setup>
  defineProps({
    show: {
      type: Boolean,
      default: false
    }
  })
</script>
<template>
  <div class="text-center">
    <v-overlay
      :model-value="show"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="#337ecc"
        indeterminate
        size="64"
      />
    </v-overlay>
  </div>
</template>
