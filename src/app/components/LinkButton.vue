<script setup lang="ts">
  import { RouterLink } from 'vue-router'
  defineProps<{ to: string }>()
</script>

<template>
  <RouterLink
    :to="to"
    class="inline-flex items-center justify-center rounded-md border border-primary/70 text-primary hover:bg-primary-two/5 px-3 py-1.5 text-sm">
    <slot />
  </RouterLink>
</template>
