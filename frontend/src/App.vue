<template>
  <v-app>
    <!-- App Bar (Header) -->
    <v-app-bar app color="primary" dark class="w-screen flex justify-between px-4">
      <!-- Use router-link directly inside v-btn -->
      <router-link to="/">
        <v-btn text>Home</v-btn>
      </router-link>
      <v-toolbar-title>Animal Management System</v-toolbar-title>
      <router-link to="/add-animal">
        <v-btn text>Add Animal</v-btn>
      </router-link>
    </v-app-bar>

    <!-- Main Content Area -->
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<style scoped></style>
