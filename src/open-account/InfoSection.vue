<script setup lang="ts">
  defineProps<{
    title: string
  }>()
</script>

<template>
  <div class="flex flex-col gap-3">
    <h4 class="text-sm font-semibold text-gray-500 dark:text-gray-300/90 uppercase tracking-wide">
      {{ title }}
    </h4>
    <div class="flex flex-col gap-2">
      <slot></slot>
    </div>
  </div>
</template>
