<script setup>
  import { storeToRefs } from 'pinia'
  import { useLoaderStore } from '../../../stores/loader'
  import { useToastersStore } from '../../../stores/toasters'
  import WmSpinner from '../../general/wm-spinner/wm-spinner'

  const { loading } = storeToRefs(useLoaderStore())
  const { toasters } = storeToRefs(useToastersStore())
</script>
<template>
  <v-snackbar
    v-for="(toaster, index) in toasters.filter(t => t.show)"
    :key="index"
    v-model="toaster.show"
    :color="toaster.type"
    location="top right"
    :style="`top: ${index * 60 + 8}px`"
    transition="slide-x-reverse-transition"
  >
    {{ toaster.message }}

    <template #actions>
      <v-btn
        icon="mdi-window-close"
        @click="toaster.show = false"
      />
    </template>
  </v-snackbar>

  <wm-spinner :show="loading" />
  <router-view />
</template>
