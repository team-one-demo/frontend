<script setup lang="ts">
  import Sidebar from '@/app/components/Sidebar.vue'
</script>

<template>
  <div class="flex h-dvh bg-gray-100 dark:bg-gray-900">
    <Sidebar class="z-50" />
    <div class="grow max-h-dvh overflow-y-auto bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <RouterView />
    </div>
  </div>
</template>
