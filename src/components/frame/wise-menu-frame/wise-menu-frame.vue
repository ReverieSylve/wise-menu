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
        <div
          class="d-flex logo"
          @click="navigate"
        >
          <v-avatar
            class="mr-2"
            image="src/images/fractal-tree.jpg"
          />
          <h2>Wise Menu</h2>
        </div>
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
  .logo {
    transition: transform 0.2s ease-in-out;
  }

  .logo:hover {
    cursor: pointer;
    color: #337ecc;
    transform: scale(1.05);
    transition: transform 0.2s ease-in-out;
  }
</style>
