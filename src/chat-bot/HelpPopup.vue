<script setup lang="ts">
  import { ref } from 'vue'
  import Gia from './Gia.vue'
  import { MessageCircleQuestionMark, X } from 'lucide-vue-next'

  const isOpen = ref(false)
  const toggleChat = () => {
    isOpen.value = !isOpen.value
  }
  const closeChat = () => {
    isOpen.value = false
  }
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-4 scale-95">
      <div
        v-if="isOpen"
        class="absolute bottom-20 right-0 w-96 h-[600px] bg-white dark:bg-gray-800 dark:border dark:border-gray-600 rounded-2xl shadow-2xl overflow-hidden">
        <button
          @click="closeChat"
          class="absolute top-7 right-7 z-10 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors">
          <X class="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        <Gia />
      </div>
    </Transition>

    <button
      @click="toggleChat"
      class="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-two text-white shadow-lg hover:brightness-110 flex items-center justify-center transition-all duration-200"
      :class="{ 'rotate-0': !isOpen, 'rotate-10': isOpen }">
      <MessageCircleQuestionMark class="w-6 h-6" />
    </button>
  </div>
</template>
