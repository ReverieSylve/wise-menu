<script setup>
  import { storeToRefs } from 'pinia'
  import { useLoaderStore } from '../../stores/loader'
  import WmSpinner from '../wm-spinner/wm-spinner'

  const { loading } = storeToRefs(useLoaderStore())
</script>
<template>
  <wm-spinner :show="loading" />
  <router-view />
</template>
