<script setup lang="ts">
  import { useGitLabAuth } from '@/auth/useGitLabAuth'
  import { useAuthStore } from '@/auth/authStore'
  import { storeToRefs } from 'pinia'
  import NavLink from '@/shared/components/NavLink.vue'
  import LightDarkMode from '@/shared/components/LightDarkMode.vue'

  const { isAuthenticated } = storeToRefs(useAuthStore())
  const { logout } = useGitLabAuth()

  const handleLogout = () => {
    logout()
  }
</script>
<template>
  <nav class="w-full border-b border-secondary-two dark:border-gray-700 bg-white dark:bg-gray-800">
    <div class="flex gap-4 px-8 xl:px-0 max-w-7xl mx-auto">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/checking">Checking</NavLink>
      <NavLink to="/savings">Savings</NavLink>
      <NavLink to="/homeloans">Home Loans</NavLink>
      <NavLink to="/autoloans">Auto Loans</NavLink>
      <NavLink v-if="isAuthenticated" to="/accounts">Your Accounts</NavLink>
      <div class="grow"></div>
      <LightDarkMode />

      <NavLink v-if="!isAuthenticated" to="/openaccount">Open Account</NavLink>
      <div class="flex items-center mb-2">
        <button
          v-if="isAuthenticated"
          @click="handleLogout"
          class="text-gray-900 hover:underline dark:text-gray-100 font-medium cursor-pointer">
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>
