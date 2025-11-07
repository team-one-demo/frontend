<script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import type { Component } from 'vue'
  import LinkButton from './LinkButton.vue'
  defineProps<{
    icon: Component
    title: string
    description: string
    features?: string[]
    ctaLink: string
  }>()
</script>

<template>
  <figure
    class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur p-6 xl:p-7 shadow-sm flex flex-col gap-3 min-h-48">
    <div class="flex items-center justify-between">
      <component :is="icon" class="h-8 w-8 text-primary-two" />
    </div>
    <h4 class="text-xl font-semibold leading-tight text-gray-900 dark:text-gray-100">{{ title }}</h4>
    <p class="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed">{{ description }}</p>
    <ul class="mt-1 text-sm text-gray-700 dark:text-gray-300 list-disc pl-5 space-y-1">
      <li v-for="(feature, index) in features" :key="index">{{ feature }}</li>
    </ul>
    <span class="flex-grow"></span>
    <LinkButton :to="ctaLink">
      <slot />
      <span v-if="!$slots.default">Learn more</span>
    </LinkButton>
  </figure>
</template>
