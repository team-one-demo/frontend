<script setup lang="ts">
  interface Props {
    message: string
    isBot?: boolean
  }

  defineProps<Props>()
</script>

<template>
  <div :class="['flex animate-fadeIn', isBot ? 'justify-start' : 'justify-end']">
    <div
      v-if="isBot"
      class="max-w-[70%] rounded-2xl rounded-bl-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 shadow-sm">
      <p class="text-gray-900 dark:text-gray-100 leading-relaxed">
        {{ message }}
      </p>
    </div>
    <div
      v-else
      class="max-w-[70%] rounded-2xl rounded-br-none bg-gradient-to-br from-primary to-primary-two px-4 py-3 shadow-sm">
      <p class="text-white leading-relaxed">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<style scoped>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-in;
  }
</style>
