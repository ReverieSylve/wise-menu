<script setup>
  import { sideMenuRoutes } from '../../../router/router'
</script>

<template>
  <v-navigation-drawer
    app
    class="p-3"
    width="200"
  >
    <v-container class="p-3">
      <v-list-item
        v-for="{ path, icon, name } of sideMenuRoutes"
        :key="path"
        :prepend-icon="icon"
        :title="name"
        :to="path"
        color="#337ecc"
      />
    </v-container>
  </v-navigation-drawer>
</template>
