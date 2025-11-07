<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import Logo from '@/shared/components/Logo.vue'

  const router = useRouter()

  const takemehome = () => {
    router.push({ name: 'home' })
  }
</script>
<template>
  <header class="w-full bg-white dark:bg-gray-800">
    <div class="px-8 xl:px-0 max-w-7xl mx-auto flex flex-row gap-4">
      <Logo @click="takemehome" />
    </div>
  </header>
</template>
