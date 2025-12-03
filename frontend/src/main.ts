import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import Toast from 'vue-toastification' // <-- Change here
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, {
  // Optional configuration for Toast notifications
  position: 'top-right', // Default position
  timeout: 3000, // Duration for the toast message to appear
})
app.mount('#app')
