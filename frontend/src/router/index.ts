// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AnimalDetailPage from '../views/AnimalDetailPage.vue'
import '../assets/tailwind.css' // Adjust the path as necessary
import AddAnimalForm from '@/views/AddAnimalForm.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/animals/:id',
    name: 'AnimalDetail',
    component: AnimalDetailPage,
    props: true,
  },
  {
    path: '/add-animal',
    name: 'AddAnimal',
    component: AddAnimalForm, // Add the new route for AddAnimal
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
