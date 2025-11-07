<script setup lang="ts">
  import type { StepStatus } from './StepItem.vue'

  interface Props {
    status: StepStatus
  }

  defineProps<Props>()
</script>

<template>
  <div
    class="mt-3 text-sm text-center transition-all duration-300 whitespace-nowrap cursor-pointer group-hover:text-secondary-two"
    :class="{
      'text-gray-500 dark:text-gray-400 font-normal': status === 'upcoming',
      'text-secondary font-semibold': status === 'active',
      'text-gray-900 dark:text-gray-200 font-medium': status === 'complete'
    }">
    <slot />
  </div>
</template>
