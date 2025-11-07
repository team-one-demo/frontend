import { useRouter } from 'vue-router'
import { useAuthStore } from './authStore'

export function useGitLabAuth() {
  const authStore = useAuthStore()
  // The router might be undefined if this function is called outside of a component setup
  // So we'll handle that case safely
  let router
  try {
    router = useRouter()
  } catch {
    console.warn('Router not available, navigation functions will be limited')
  }

  // GitLab OIDC configuration
  const gitlabConfig = {
    clientId: import.meta.env.VITE_GITLAB_CLIENT_ID,
    clientSecret: import.meta.env.VITE_GITLAB_CLIENT_SECRET || '',
    redirectUri: import.meta.env.VITE_GITLAB_REDIRECT_URI,
    authEndpoint: 'https://gitlab.com/oauth/authorize',
    tokenEndpoint: 'https://gitlab.com/oauth/token',
    userInfoEndpoint: 'https://gitlab.com/api/v4/user',
    // Use BOTH OIDC and GitLab API scopes to ensure we have proper access
    scope: 'openid profile email read_user api read_api',
    responseType: 'code'
  }

  // Login function - redirects to GitLab
  function login() {
    console.log('Login triggered')
    console.log('Client ID:', gitlabConfig.clientId)
    console.log('Redirect URI:', gitlabConfig.redirectUri)
    console.log('Using scopes:', gitlabConfig.scope)

    // Generate and store state for CSRF protection
    const state = Math.random().toString(36).substring(2, 15)
    authStore.setAuthState(state)

    // Redirect to GitLab authorization endpoint
    const params = new URLSearchParams({
      client_id: gitlabConfig.clientId,
      redirect_uri: gitlabConfig.redirectUri,
      response_type: gitlabConfig.responseType,
      scope: gitlabConfig.scope,
      state: state
    })
    window.location.href = `${gitlabConfig.authEndpoint}?${params.toString()}`
  }

  // Logout function
  function logout() {
    authStore.clearAuth()
    // Use window.location instead of router if router is unavailable
    if (router) {
      router.push('/')
    } else {
      window.location.href = '/'
    }
  }

  // Handle the callback from GitLab
  async function handleCallback(code, state) {
    try {
      console.log('Handling GitLab callback with code:', code)
      console.log('State received:', state)

      authStore.setLoading(true)
      authStore.setError(null)

      // Verify state parameter to prevent CSRF attacks
      const savedState = authStore.authState || sessionStorage.getItem('oauth_state')
      console.log('Saved state:', savedState)

      if (!savedState || state !== savedState) {
        console.error('State mismatch or missing', 'Saved:', savedState, 'Received:', state)
        throw new Error('Invalid state parameter - possible CSRF attack')
      }

      // Exchange authorization code for tokens
      console.log('Exchanging code for token...')

      const tokenFormData = new URLSearchParams()
      tokenFormData.append('client_id', gitlabConfig.clientId)
      if (gitlabConfig.clientSecret !== '') {
        tokenFormData.append('client_secret', gitlabConfig.clientSecret)
      }
      tokenFormData.append('code', code)
      tokenFormData.append('grant_type', 'authorization_code')
      tokenFormData.append('redirect_uri', gitlabConfig.redirectUri)

      // Since the app is configured as non-confidential, we don't need a client secret

      const tokenResponse = await fetch(gitlabConfig.tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: tokenFormData.toString()
      })

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text()
        console.error('Token exchange failed:', tokenResponse.status, errorText)
        throw new Error(`Failed to exchange code for token: ${errorText}`)
      }

      const tokens = await tokenResponse.json()
      console.log('Token received successfully')

      if (!tokens.access_token) {
        throw new Error('No access token received')
      }

      // Store access token
      authStore.setAccessToken(tokens.access_token)

      // Fetch user information
      console.log('Fetching user info...')
      const userResponse = await fetch(gitlabConfig.userInfoEndpoint, {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`
        }
      })

      if (!userResponse.ok) {
        let errorMessage = 'Failed to fetch user information'
        try {
          const errorData = await userResponse.text()
          console.error('User info fetch failed:', userResponse.status, errorData)
          errorMessage += ': ' + errorData
        } catch (e) {
          console.error('Error parsing error response:', e)
        }
        throw new Error(errorMessage)
      }

      const userData = await userResponse.json()
      console.log('User data received:', userData)

      // Set user data in the store
      authStore.setUser(userData)

      // Clean up
      authStore.clearAuthState()
      sessionStorage.removeItem('oauth_state')

      console.log('Authentication successful')

      // Remove query parameters from URL to prevent reprocessing
      if (window.location.search.includes('code=')) {
        window.history.replaceState({}, document.title, window.location.pathname)
      }

      // Navigation will be handled by the calling component
      window.location.reload()
    } catch (err) {
      console.error('Authentication error:', err)
      authStore.setError(err.message || 'Authentication failed')
      authStore.clearAuth() // Clean up on error

      // Prevent infinite loop by using a simple redirect
      if (window.location.search.includes('code=')) {
        console.log('Removing query params to prevent infinite loop')
        window.history.replaceState({}, document.title, window.location.pathname)
      }
    } finally {
      authStore.setLoading(false)
    }
  }

  // Check if user is already authenticated on mount
  async function checkAuth() {
    const token = authStore.accessToken

    // Check for code and state in URL first (this takes priority)
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    const state = urlParams.get('state')

    if (code && state) {
      console.log('Found code and state in URL, processing callback first')
      await handleCallback(code, state)
      return // Skip the rest of the function after handling callback
    }

    // If no callback code but we have a token, validate it
    if (token) {
      try {
        console.log('Checking existing authentication with token:', token.substring(0, 10) + '...')
        authStore.setLoading(true)

        const response = await fetch(gitlabConfig.userInfoEndpoint, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!response.ok) {
          console.log('Token validation failed, clearing auth')
          throw new Error('Session expired')
        }

        const userData = await response.json()
        console.log('User is already authenticated:', userData)
        authStore.setUser(userData)
      } catch (err) {
        console.error('Auth check error:', err)
        // Token might be expired
        authStore.clearAuth()
      } finally {
        authStore.setLoading(false)
      }
    } else {
      console.log('No token found, user is not authenticated')
    }
  }

  // Return the composable API
  return {
    user: authStore.user,
    isAuthenticated: authStore.isAuthenticated,
    isLoading: authStore.isLoading,
    error: authStore.error,
    login,
    logout,
    handleCallback,
    handleOAuthCallback: handleCallback, // Alias for the callback route
    checkAuth
  }
}
