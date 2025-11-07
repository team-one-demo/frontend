<script lang="ts" setup>
  import { useRouter, useRoute } from 'vue-router'
  import { onMounted } from 'vue'
  import { useGitLabAuth } from '@/auth/useGitLabAuth'
  import { useAuthStore } from '@/auth/authStore'

  const router = useRouter()
  const route = useRoute()
  const authStore = useAuthStore()

  onMounted(() => {
    setTimeout(() => {
      router.push('/accounts')
    }, 1000)
  })
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
      <p class="text-lg">Authenticating...</p>
    </div>
  </div>
</template>
