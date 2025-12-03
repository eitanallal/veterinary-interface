<!-- src/views/AddAnimal.vue -->
<template>
  <div class="p-4 flex flex-col items-center">
    <h2 class="text-2xl font-bold py-4">Add a New Animal</h2>
    <form @submit.prevent="submitForm" class="flex flex-col items-center gap-6">
      <div class="w-full">
        <label for="name" class="block text-sm">Name</label>
        <input
          v-model="animal.name"
          id="name"
          type="text"
          required
          class="input w-full bg-blue-100"
        />
      </div>

      <div class="w-full">
        <label for="species" class="block text-sm">Species</label>
        <input
          v-model="animal.species"
          id="species"
          type="text"
          required
          class="input w-full bg-blue-100"
        />
      </div>

      <div class="w-full">
        <label for="birth_date" class="block text-sm">Date of Birth</label>
        <input
          v-model="animal.birth_date"
          id="birth_date"
          type="date"
          class="input bg-blue-100 w-full"
        />
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
  name: '',
  species: '',
  birth_date: '',
})

const submitForm = async () => {
  try {
    await store.addAnimal({
      animal: {
        ...animal.value,
        birth_date: new Date(animal.value.birth_date).toISOString(),
      },
    })
    toast.success('The animal has been added')
  } catch (error) {
    toast.error('Failed to add animal') // Afficher le toast d'erreur
  }
}
</script>
