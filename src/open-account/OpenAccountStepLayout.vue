<script setup lang="ts">
  defineProps<{
    title: string
    description: string
  }>()
</script>

<template>
  <div class="max-w-lg mx-auto">
    <div class="mb-12 text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{{ title }}</h2>
      <p class="text-gray-600 dark:text-gray-400">{{ description }}</p>
    </div>
    <slot></slot>
  </div>
</template>
