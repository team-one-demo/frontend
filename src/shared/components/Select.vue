<script setup lang="ts">
  import { ChevronDown } from 'lucide-vue-next'
  defineProps<{
    label?: string
  }>()
  const model = defineModel<string>()
</script>

<template>
  <div class="w-full">
    <label v-if="label" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {{ label }}
    </label>
    <div class="relative">
      <select
        v-model="model"
        class="w-full appearance-none px-4 py-3 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:border-secondary-two focus:ring-secondary-two/20 hover:border-gray-400 dark:hover:border-gray-500">
        <slot />
      </select>
      <div
        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 dark:text-gray-500">
        <ChevronDown :size="20" />
      </div>
    </div>
  </div>
</template>
