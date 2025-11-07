<script setup lang="ts">
  withDefaults(
    defineProps<{
      collapsed?: boolean
    }>(),
    {
      collapsed: false
    }
  )
</script>
<template>
  <div class="flex flex-row items-center gap-3 cursor-pointer">
    <img alt="Tanuki Bank logo" class="logo" src="/tanuki.webp" width="50" height="50" />
    <div class="flex-1 min-w-0" :class="{ '!w-0': collapsed }">
      <p
        class="overflow-hidden text-sm uppercase font-bold text-primary dark:text-primary-two tracking-wider text-nowrap">
        Tanuki Bank
      </p>
    </div>
  </div>
</template>
