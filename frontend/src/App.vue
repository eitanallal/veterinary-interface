<template>
  <v-app class="flex flex-col h-screen">
    <!-- App Bar (Header) -->
    <v-app-bar
      app
      color="primary"
      dark
      class="w-screen flex items-center justify-between px-4 py-2 bg-blue-400 top-0 sticky"
    >
      <!-- Use router-link directly inside v-btn -->
      <router-link to="/">
        <v-btn text>Home</v-btn>
      </router-link>
      <v-toolbar-title class="text-2xl">Animal Management System</v-toolbar-title>
      <router-link to="/add-animal">
        <v-btn text>Add Animal</v-btn>
      </router-link>
    </v-app-bar>

    <!-- Main Content Area -->
    <v-main class="h-full bg-blue-200">
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
