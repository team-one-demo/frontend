<script setup lang="ts">
  defineProps<{
    label: string
    value: string | number
  }>()
</script>

<template>
  <div>
    <p class="text-sm text-gray-500 dark:text-gray-400">{{ label }}</p>
    <p class="text-base font-medium text-gray-900 dark:text-gray-100">
      {{ value }}
    </p>
  </div>
</template>
