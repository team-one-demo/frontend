import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  let initialUser = null
  try {
    const savedUser = localStorage.getItem('gitlab_user_data')
    if (savedUser) {
      initialUser = JSON.parse(savedUser)
      console.log('Loaded user from localStorage:', initialUser)
    }
  } catch (e) {
    console.error('Error loading user data from localStorage:', e)
  }

  const user = ref(initialUser)
  const accessToken = ref(localStorage.getItem('gitlab_access_token') || null)
  const authState = ref(localStorage.getItem('gitlab_auth_state') || null)
  const isLoading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => {
    const hasUser = !!user.value
    const hasToken = !!accessToken.value
    console.log('Auth store - computing isAuthenticated:', { hasUser, hasToken })
    return hasUser && hasToken
  })

  // Actions
  function setAccessToken(token) {
    console.log('Setting access token')
    if (!token) {
      console.warn('Attempted to set null/empty token')
      return
    }

    accessToken.value = token
    localStorage.setItem('gitlab_access_token', token)
  }

  function setAuthState(state) {
    console.log('Setting auth state:', state)
    authState.value = state
    localStorage.setItem('gitlab_auth_state', state)
  }

  function clearAuthState() {
    console.log('Clearing auth state')
    authState.value = null
    localStorage.removeItem('gitlab_auth_state')
  }

  function setUser(userData) {
    console.log('Setting user data:', userData)
    if (!userData) {
      console.warn('Attempted to set null/empty user data')
      return
    }

    user.value = userData

    // Save user data to localStorage for persistence
    try {
      localStorage.setItem('gitlab_user_data', JSON.stringify(userData))
    } catch (e) {
      console.error('Error saving user data to localStorage:', e)
    }
  }

  function setLoading(status) {
    isLoading.value = status
  }

  function setError(errorMessage) {
    error.value = errorMessage
  }

  function clearAuth() {
    console.log('Clearing all auth data')
    user.value = null
    accessToken.value = null
    localStorage.removeItem('gitlab_access_token')
    localStorage.removeItem('gitlab_user_data')
    clearAuthState()
  }

  // Initialize from localStorage on store creation
  function initializeFromStorage() {
    const storedToken = localStorage.getItem('gitlab_access_token')
    if (storedToken) {
      console.log('Found stored token on initialization')
      accessToken.value = storedToken
    }

    const storedState = localStorage.getItem('gitlab_auth_state')
    if (storedState) {
      console.log('Found stored state on initialization')
      authState.value = storedState
    }

    const storedUser = localStorage.getItem('gitlab_user_data')
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
        console.log('Found stored user data on initialization')
      } catch (e) {
        console.error('Error parsing stored user data:', e)
      }
    }
  }

  // Call initialization
  initializeFromStorage()

  return {
    // State
    user,
    accessToken,
    authState,
    isLoading,
    error,

    // Getters
    isAuthenticated,

    // Actions
    setAccessToken,
    setAuthState,
    clearAuthState,
    setUser,
    setLoading,
    setError,
    clearAuth,
    initializeFromStorage
  }
})
