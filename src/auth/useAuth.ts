import { ref, computed, watch, onMounted, provide } from 'vue'
import { useAuthStore } from './authStore'
import { storeToRefs } from 'pinia'
import { useGitLabAuth } from './useGitLabAuth'

export function useAuthComposable() {
  const authStore = useAuthStore()
  const { user, isLoading, error, accessToken } = storeToRefs(authStore)
  const { logout, checkAuth } = useGitLabAuth()

  const loggedin = ref(0)
  provide('loggedin', loggedin)

  const username = ref('')
  provide('username', username)

  const isAuthenticated = computed(() => {
    return !!user.value && !!accessToken.value
  })

  watch(
    user,
    (newUser) => {
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

  const isProcessingCallback = ref(new URLSearchParams(window.location.search).has('code'))

  onMounted(async () => {
    if (!isProcessingCallback.value && accessToken.value && !user.value) {
      try {
        await checkAuth()
      } catch (err) {
        console.error('Error checking authentication on mount:', err)
      }
    }
  })

  return {
    user,
    isLoading,
    error,
    accessToken,
    logout,
    checkAuth,
    loggedin,
    username,
    isAuthenticated,
    isProcessingCallback
  }
}
