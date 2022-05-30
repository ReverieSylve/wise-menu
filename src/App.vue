<script setup>
  import WiseMenuFrame from './components/wise-menu-frame/wise-menu-frame'
</script>

<template>
  <wise-menu-frame />
</template>

<style>
  html {
    font-family: 'Roboto Slab', serif;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
</style>
