<template>
  <div>
    <div class="w-screen px-4 flex flex-col items-center justify-between">
      <h1 class="font-bold text-4xl py-4">Animal List</h1>
      <table class="w-full text-center table-fixed border border-collapse border-gray-400">
        <thead>
          <tr>
            <th class="border border-collapse border-gray-400">Name</th>
            <th class="border border-collapse border-gray-400">Species</th>
            <th class="border border-collapse border-gray-400">Date of birth</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="animal in animals" :key="animal.id">
            <td class="border border-collapse border-gray-400">
              <router-link :to="'/animals/' + animal.id">{{ animal.name }}</router-link>
            </td>
            <td class="border border-collapse border-gray-400">{{ animal.species }}</td>
            <td class="border border-collapse border-gray-400">
              {{ animal.birth_date ?? 'no birth date specified' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAnimalStore } from '../stores/animalStore'

export default defineComponent({
  name: 'HomePage',
  computed: {
    animals() {
      const store = useAnimalStore()
      return store.animals
    },
  },
  mounted() {
    const store = useAnimalStore()
    store.fetchAnimals()
  },
})
</script>
