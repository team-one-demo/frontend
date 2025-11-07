<script setup>
  import { useRouter, useRoute, RouterLink, RouterView } from 'vue-router'
  import { provide, onMounted, watch, ref, computed } from 'vue'
  // Authentication imports
  import { useGitLabAuth } from './auth/useGitLabAuth'
  import { useAuthStore } from './auth/authStore'
  import { storeToRefs } from 'pinia'
  import DefaultLayout from './shared/layouts/DefaultLayout.vue'
  import AccountLayout from './shared/layouts/AccountLayout.vue'

  const router = useRouter()
  const authStore = useAuthStore()
  // Use storeToRefs to maintain reactivity
  const { user, Loading, error, accessToken } = storeToRefs(authStore)
  const { logout, checkAuth } = useGitLabAuth()

  // Create reactive refs for login state
  const loggedin = ref(0)
  provide('loggedin', loggedin)

  const username = ref('')
  provide('username', username)

  // Computed property to determine if user is authenticated
  const isAuthenticated = computed(() => {
    console.log('Computing authentication state:', !!user.value, !!accessToken.value)
    return !!user.value && !!accessToken.value
  })

  // Watch for changes to the user object
  watch(
    user,
    (newUser) => {
      console.log('User state changed:', newUser)
      if (newUser) {
        loggedin.value = 1
        username.value = newUser.name || newUser.username || ''
      } else {
        loggedin.value = 0
        username.value = ''
      }
    },
    { immediate: true }
  )

  // Check if we have a token in the URL (are we processing a callback?)
  const isProcessingCallback = ref(new URLSearchParams(window.location.search).has('code'))

  // Check auth status when component mounts
  onMounted(async () => {
    console.log('App.vue mounted, checking authentication...')
    console.log('Is processing callback:', isProcessingCallback.value)

    // If we're processing a callback, let the main.js handle it
    if (!isProcessingCallback.value && accessToken.value && !user.value) {
      try {
        await checkAuth()
        router.push('/accounts')
      } catch (err) {
        console.error('Error checking authentication on mount:', err)
      }
    }

    console.log('User after mount auth check:', user.value)
  })

  function takemehome() {
    loggedin.value = 0
    username.value = ''
    router.push({ name: 'home' })
  }

  function handleLogout() {
    console.log('Logout initiated')
    logout()
    takemehome()
  }
  const route = useRoute()
  const homeRoutes = ['/', '/checking', '/savings', '/homeloans', '/autoloans', '/openaccount', '/oauth/callback']
  const layoutComponent = computed(() => {
    if (authStore.user && homeRoutes.indexOf(route.path) === -1) {
      return AccountLayout
    }
    return DefaultLayout
  })
</script>

<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>
