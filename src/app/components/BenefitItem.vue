<script setup lang="ts">
  interface Props {
    value: string
    title: string
    description: string
  }

  defineProps<Props>()
</script>

<template>
  <div class="text-center">
    <div
      class="text-4xl font-bold bg-gradient-to-r from-primary to-primary-two bg-clip-text text-transparent mb-2 drop-shadow-md">
      {{ value }}
    </div>
    <h3 class="text-xl font-semibold text-white mb-2">{{ title }}</h3>
    <p class="text-gray-200">{{ description }}</p>
  </div>
</template>
