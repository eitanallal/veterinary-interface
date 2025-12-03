<template>
  <div class="min-h-screen flex flex-col bg-blue-50">
    <header class="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
      <router-link to="/" class="text-white hover:text-blue-200">Home</router-link>
      <h1 class="text-2xl font-bold">Animal Management System</h1>
      <router-link to="/add-animal" class="text-white hover:text-blue-200">Add Animal</router-link>
    </header>

    <main class="flex-1 p-4">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<style scoped></style>
