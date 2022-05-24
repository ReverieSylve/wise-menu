<script setup>
import SideMenu from '../side-menu/side-menu'
import MainFrame from '../main-frame/main-frame'
</script>

<template>
  <v-app>
    <v-app-bar app>
      <router-link
        v-slot="{ navigate }"
        custom
        to="/"
      >
        <h2 @click="navigate">
          Wise Menu
        </h2>
      </router-link>
    </v-app-bar>

    <side-menu />

    <v-main>
      <v-container fluid>
        <main-frame />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>

h2 {
  cursor: pointer;
}

h2:hover {
  color: #337ecc;
}
</style>
