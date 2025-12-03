<!-- src/views/AddAnimal.vue -->
<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold">Add a New Animal</h2>
    <form @submit.prevent="submitForm">
      <div class="my-4">
        <label for="name" class="block text-sm">Name</label>
        <input v-model="animal.name" id="name" type="text" required class="input" />
      </div>

      <div class="my-4">
        <label for="species" class="block text-sm">Species</label>
        <input v-model="animal.species" id="species" type="text" required class="input" />
      </div>

      <div class="my-4">
        <label for="birth_date" class="block text-sm">Date of Birth</label>
        <input v-model="animal.birth_date" id="birth_date" type="date" required class="input" />
      </div>

      <button type="submit" class="bg-blue-500 text-white px-4 py-2">Add Animal</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAnimalStore } from '../stores/animalStore' // Import the store
import { useToast } from 'vue-toastification' // Import the useToast method for toasts

const toast = useToast() // Initialize the toast service

const store = useAnimalStore()
const animal = ref({
  name: 'Lapinou ',
  species: 'rabbit',
  birth_date: '2023-02-01',
})

const submitForm = async () => {
  const res = await store.addAnimal({
    ...animal.value,
    birth_date: new Date(animal.value.birth_date).toISOString(),
  })
  toast.success('The animal has been added') // Show a success toast notification
}
</script>
