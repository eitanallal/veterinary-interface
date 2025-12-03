<template>
  <div v-if="animal" class="p-6 max-w-4xl mx-auto">
    <!-- Animal Details -->
    <div class="mb-6">
      <h1 class="text-3xl font-semibold text-gray-800">{{ animal.animal.name }}</h1>
      <p class="text-lg text-gray-600">Species: {{ animal.animal.species }}</p>
      <p class="text-lg text-gray-600">Date of Birth: {{ animal.animal.birth_date }}</p>
    </div>

    <!-- Events Table -->
    <div class="mb-6">
      <h2 class="text-2xl font-semibold text-gray-800">Events</h2>
      <div v-if="animal.events && animal.events.length > 0">
        <table class="min-w-full table-auto mt-4 border-collapse">
          <thead>
            <tr class="border-b">
              <th class="py-2 px-4 text-left text-sm font-medium text-gray-700">Type</th>
              <th class="py-2 px-4 text-left text-sm font-medium text-gray-700">Description</th>
              <th class="py-2 px-4 text-left text-sm font-medium text-gray-700">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in animal.events" :key="event.id" class="border-b">
              <td class="py-2 px-4 text-sm text-gray-800">{{ event.type }}</td>
              <td class="py-2 px-4 text-sm text-gray-800">{{ event.description }}</td>
              <td class="py-2 px-4 text-sm text-gray-800">{{ event.event_date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else class="mt-4 text-gray-600 italic">No event for this animal so far</p>
    </div>

    <!-- Add Event Form -->
    <div class="mb-6">
      <h3 class="text-xl font-semibold text-gray-800">Add An Event</h3>
      <form @submit.prevent="handleAddEvent" class="mt-4">
        <div class="mb-4">
          <label for="event-type" class="block text-sm font-medium text-gray-700">Event Type</label>
          <select
            v-model="eventType"
            id="event-type"
            class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="visit">Visit</option>
            <option value="treatment">Treatment</option>
            <option value="observation">Observation</option>
            <option value="custom">Other (specify below)</option>
          </select>
          <input
            v-if="eventType === 'custom'"
            v-model="customEventType"
            type="text"
            placeholder="Enter custom event type"
            class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700"
            >Description</label
          >
          <textarea
            v-model="description"
            id="description"
            rows="3"
            class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        <div class="mb-4">
          <label for="event-date" class="block text-sm font-medium text-gray-700">Date</label>
          <input
            v-model="eventDate"
            type="date"
            id="event-date"
            class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add Event
        </button>
      </form>
    </div>

    <!-- Export Button -->
    <div>
      <button
        @click="exportToExcel"
        class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Export to Excel
      </button>
    </div>
  </div>
  <div v-else class="p-6 text-center">
    <p class="text-gray-600">Loading...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useAnimalStore } from '../stores/animalStore'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast() // Initialize the toast service

export default defineComponent({
  name: 'AnimalDetailPage',
  setup() {
    const route = useRoute()
    const store = useAnimalStore()

    const animalId = route.params.id as string

    const animal = computed(() => store.currentAnimal)
    const eventType = ref('visit')
    const customEventType = ref('')
    const description = ref('')
    const eventDate = ref(new Date().toISOString().split('T')[0] ?? '')

    onMounted(() => {
      store.fetchAnimalById(animalId)
    })

    const handleAddEvent = async () => {
      try {
        const event = {
          type: eventType.value === 'custom' ? customEventType.value : eventType.value,
          description: description.value,
          event_date: eventDate.value,
        }
        await store.addEventToAnimal(animalId, event)
        description.value = ''
        eventType.value = 'visit'
        customEventType.value = ''
        toast.success('The event has been added')
      } catch {
        toast.error('Failed to add animal') // Afficher le toast d'erreur
      }
    }

    const exportToExcel = () => {
      window.location.href = `http://localhost:5000/animals/${animalId}/export`
    }

    return {
      animal,
      eventType,
      customEventType,
      description,
      eventDate,
      handleAddEvent,
      exportToExcel,
    }
  },
})
</script>

<style scoped></style>
