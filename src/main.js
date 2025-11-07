import './app/assets/main.css'
import './app/assets/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './app/router'
// Import at the top level but we'll use it after timeout
import { useGitLabAuth } from './auth/useGitLabAuth'

// Create the Vue app
const app = createApp(App)

// Create and register Pinia (must be before mounting)
const pinia = createPinia()
app.use(pinia)

// Add router
app.use(router)

// Mount the app
app.mount('#app')

// After app is mounted, check for authentication and process any callback
console.log('App mounted, checking authentication status...')

// Wait until app is fully initialized
setTimeout(() => {
  // Check for authentication code in URL
  const urlParams = new URLSearchParams(window.location.search)
  const hasAuthCode = urlParams.has('code')

  if (hasAuthCode) {
    console.log('Found auth code in URL, will process it')
  }

  // Use a try-catch to prevent any initialization errors from breaking the app
  try {
    const { checkAuth } = useGitLabAuth()

    checkAuth().catch((err) => {
      console.error('Error checking authentication:', err)
    })
  } catch (e) {
    console.error('Error initializing authentication:', e)
  }
}, 500) // Longer delay to ensure everything is ready
