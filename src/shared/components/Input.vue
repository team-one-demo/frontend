<script setup lang="ts">
  const model = defineModel<string>()
</script>
<template>
  <input
    v-model="model"
    v-bind="$attrs"
    class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-blue-500" />
</template>
