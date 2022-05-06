<script setup>
import {sideMenuRoutes} from '../../router/router'
</script>

<template>
  <v-navigation-drawer class="p-3" width="200" app>
    <v-container class="p-3">
      <v-list-item active-color="#337ecc"
                   v-for="({path, icon, name}) of sideMenuRoutes" :to="path" :prepend-icon="icon"
                   :title="name">
      </v-list-item>
    </v-container>
  </v-navigation-drawer>
</template>


