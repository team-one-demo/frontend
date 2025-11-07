<script setup lang="ts">
  import { inject } from 'vue'
  import Button from '@/shared/components/Button.vue'
  import { useAuthStore } from './authStore'
  import { useRouter } from 'vue-router'
  import Input from '@/shared/components/Input.vue'
  import Label from '@/shared/components/Label.vue'
  import { useGitLabAuth } from './useGitLabAuth.js'

  const username = inject('username')
  const password = inject('password')
  const { login } = useGitLabAuth()
</script>

<template>
  <form
    class="flex flex-col gap-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 p-6 md:p-7 text-gray-900 dark:text-gray-100 shadow-md w-[320px] md:w-[360px]">
    <div class="w-full flex flex-col">
      <Label for="username">Username</Label>
      <Input v-model="username" type="text" id="username" name="username" required />
    </div>

    <div class="w-full flex flex-col">
      <Label for="password">Password</Label>
      <Input v-model="password" type="password" id="password" name="password" required />
    </div>
    <Button class="mt-2 w-full" @click="login">Sign in</Button>
  </form>
</template>
