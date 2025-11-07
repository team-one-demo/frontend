<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import { Moon, Sun } from 'lucide-vue-next'

  const isDark = ref(false)
  withDefaults(defineProps<{ compact?: boolean }>(), { compact: true })

  onMounted(() => {
    const storedTheme = localStorage.getItem('theme')

    if (storedTheme === 'dark') {
      isDark.value = true
    } else if (storedTheme === 'light') {
      isDark.value = false
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    applyTheme()
  })

  watch(isDark, () => {
    applyTheme()
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  })

  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }
</script>

<template>
  <button
    @click="toggleTheme"
    class="pb-2 relative inline-flex gap-3 items-center justify-center h-12 rounded-lg transition-colors duration-150 focus:outline-none cursor-pointer group"
    type="button">
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 scale-50 rotate-90"
      enter-to-class="opacity-100 scale-100 rotate-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100 rotate-0"
      leave-to-class="opacity-0 scale-50 -rotate-90"
      mode="out-in">
      <Sun v-if="!isDark" class="size-5 text-yellow-500" :stroke-width="2" />
      <Moon v-else class="size-5 text-blue-400" :stroke-width="2" />
    </Transition>
    <span class="text-nowrap text-sm font-medium text-white/80 group-hover:text-white" v-if="!compact"
      >Toggle theme</span
    >
  </button>
</template>
