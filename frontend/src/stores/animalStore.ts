import { defineStore } from 'pinia'
import axiosInstance from '@/axios'

interface AnimalData {
  id?: string
  name: string
  species: string
  birth_date: string
}

interface Animal {
  animal: AnimalData
  events?: Event[]
}

interface Event {
  id: string
  type: string
  description: string
  event_date: string
}

export const useAnimalStore = defineStore('animal', {
  state: () => ({
    animals: [] as AnimalData[],
    currentAnimal: null as Animal | null,
  }),

  actions: {
    async fetchAnimals() {
      try {
        const response = await axiosInstance.get('/animals')
        this.animals = response.data
      } catch (error) {
        console.error('Error fetching animals:', error)
      }
    },
    async fetchAnimalById(id: string) {
      try {
        const response = await axiosInstance.get(`/animals/${id}`)
        this.currentAnimal = response.data
      } catch (error) {
        console.error('Error fetching animal details:', error)
      }
    },
    async addAnimal(animal: Omit<Animal, 'id' | 'events'>) {
      try {
        await axiosInstance.post('/animals', animal.animal).then((response) => {
          this.animals.push(response.data)
          return response.data
        })
      } catch (error) {
        console.error('Error adding animal:', error)
        throw error // Propager l'erreur au composant
      }
    },
    async addEventToAnimal(animalId: string, event: Omit<Event, 'id'>) {
      try {
        const response = await axiosInstance.post(`/animals/${animalId}/events`, event)
        if (this.currentAnimal?.events) {
          this.currentAnimal.events.push(response.data)
        }
      } catch (error) {
        console.error('Error adding event:', error)
      }
    },
  },
})
