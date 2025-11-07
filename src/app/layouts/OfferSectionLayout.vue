<script setup lang="ts">
  interface Props {
    title?: string
    subtitle?: string
    variant?: 'light' | 'dark'
    id?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'dark'
  })

  const variantClasses = {
    light: {
      bg: 'bg-transparent',
      title: 'text-gray-900 dark:text-gray-100',
      subtitle: 'text-gray-600 dark:text-gray-400'
    },
    dark: {
      bg: 'bg-gradient-to-br from-secondary-two to-secondary',
      title: 'text-white',
      subtitle: 'text-gray-200'
    }
  }

  const currentVariant = variantClasses[props.variant]
</script>

<template>
  <section :id="id" :class="['px-8 xl:px-0 max-w-7xl m-auto py-24', currentVariant.bg]">
    <div v-if="title" class="text-center mb-8">
      <h2 :class="['text-3xl md:text-4xl font-bold mb-4', currentVariant.title]">{{ title }}</h2>
      <p v-if="subtitle" :class="['text-lg max-w-2xl mx-auto', currentVariant.subtitle]">{{ subtitle }}</p>
    </div>

    <slot />
  </section>
</template>
