<script setup lang="ts">
  import Button from '@/shared/components/Button.vue'
  import Login from '@/auth/Login.vue'
  import { useAuthStore } from '@/auth/authStore'
  import { storeToRefs } from 'pinia'
  const { isAuthenticated } = storeToRefs(useAuthStore())
  const authStore = useAuthStore()
</script>

<template>
  <section
    id="hero"
    class="bg-gradient-to-br from-secondary-two to-secondary text-white -mt-0.5 relative overflow-hidden">
    <div class="absolute inset-0 opacity-20">
      <img
        src="https://images.unsplash.com/photo-1539471317115-0b78c8c62db5?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="hero image"
        class="mx-auto max-w-7xl w-full h-full object-cover object-top" />
      <div
        class="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-secondary-two via-85% via-secondary/80 to-transparent"></div>
      <div
        class="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-secondary via-85% via-secondary/80 to-transparent"></div>
    </div>
    <div
      class="px-8 xl:px-0 max-w-7xl mx-auto w-full py-16 md:py-20 flex items-center justify-between gap-8 relative z-10">
      <div class="flex-1 flex flex-col items-start gap-3">
        <h1 class="text-4xl md:text-5xl font-extrabold leading-tight text-left">Earn Up to 4.5% APY</h1>
        <h2 class="text-base md:text-lg opacity-90">
          No monthly fees. No minimum balance. Open your free account in minutes.
        </h2>
      </div>
      <div class="shrink-0 h-[300px]">
        <Login v-if="!isAuthenticated" />
        <div
          v-else
          class="flex flex-col gap-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 p-8 py-12 text-gray-900 dark:text-gray-100 shadow-md w-[320px] md:w-[360px]">
          <h3 class="text-lg font-semibold">Welcome Back, {{ authStore.user.name }}!</h3>
          <p class="text-gray-600 dark:text-gray-400">You are already logged in.</p>
          <RouterLink to="/accounts"><Button class="mt-2 w-full">Go to Your Accounts</Button></RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
