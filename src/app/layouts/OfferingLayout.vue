<script setup lang="ts">
  defineProps<{
    title: string
    subtitle: string
  }>()
</script>
<template>
  <main class="w-full bg-gray-100 dark:bg-gray-900">
    <section class="px-8 xl:px-0 max-w-7xl mx-auto w-full pt-8 md:pt-10">
      <div class="flex flex-col gap-2">
        <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight">{{ title }}</h1>
        <h2 class="text-sm md:text-base text-gray-600">{{ subtitle }}</h2>
      </div>
    </section>

    <section
      class="px-8 xl:px-0 max-w-7xl mx-auto w-full py-10 md:pb-16 grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
      <slot />
    </section>
  </main>
</template>
