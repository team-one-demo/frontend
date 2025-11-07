<template>
  <li class="relative overflow-visible w-full">
    <RouterLink
      :to="to"
      class="group relative mx-3 flex justify-start gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-transparent"
      :class="computedClasses">
      <component :is="icon" class="h-5 w-5 shrink-0 text-white/70 group-hover:text-white transition-colors" />
      <span v-if="!collapsed" class="truncate">{{ label }}</span>
      <span
        v-if="collapsed"
        class="z-50 pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap rounded bg-gray-900/95 backdrop-blur px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
        role="tooltip">
        {{ label }}
      </span>
    </RouterLink>
  </li>
</template>

<script setup lang="ts">
  import { computed, type Component } from 'vue'
  import { useRoute } from 'vue-router'

  interface Props {
    icon: Component
    to: string
    label: string
    collapsed: boolean
    variant?: 'primary' | 'secondary'
  }

  const props = defineProps<Props>()
  const route = useRoute()

  const active = computed(() => route.path === props.to)

  const computedClasses = computed(() => {
    const base = [] as string[]
    if (props.collapsed) base.push('justify-center')
    if (props.variant === 'secondary') {
      base.push('text-white/70 hover:text-white')
    } else {
      base.push('')
    }
    if (active.value) {
      base.push('bg-white/15 text-white shadow-inner')
    } else if (props.variant !== 'secondary') {
      base.push('text-white/70 hover:text-white hover:bg-white/10')
    } else {
      base.push('hover:bg-white/10')
    }
    return base
  })
</script>

<style scoped></style>
