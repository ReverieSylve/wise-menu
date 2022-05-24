<script setup>
import {sideMenuRoutes} from '../../router/router'
</script>

<template>
  <v-navigation-drawer
    class="p-3"
    width="200"
    app
  >
    <v-container class="p-3">
      <v-list-item
        v-for="({path, icon, name}) of sideMenuRoutes"
        :key="path"
        active-color="#337ecc"
        :to="path"
        :prepend-icon="icon"
        :title="name"
      />
    </v-container>
  </v-navigation-drawer>
</template>


