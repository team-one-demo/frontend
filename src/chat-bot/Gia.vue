<script setup lang="ts">
  import Input from '@/shared/components/Input.vue'
  import ChatMessage from './ChatMessage.vue'
  import { SendHorizontal } from 'lucide-vue-next'

  // Mock messages for demo
  const messages = [
    {
      id: 1,
      message: "Hi! I'm Gia, your AI-powered assistant. How can I help you today?",
      isBot: true
    }
  ]
</script>

<template>
  <div class="flex flex-col h-full max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
    <div class="px-6 py-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
      <div class="flex items-center gap-3">
        <div>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Gia</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">AI-powered assistant</p>
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-gray-50 dark:bg-gray-900">
      <ChatMessage v-for="msg in messages" :key="msg.id" :message="msg.message" :is-bot="msg.isBot" />
    </div>

    <div class="px-6 py-5 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <form class="flex items-center gap-3" @submit.prevent>
        <div class="flex-1">
          <Input type="text" placeholder="Type your message here..." class="rounded-full" required />
        </div>
        <button
          type="submit"
          class="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-primary-two text-white flex items-center justify-center transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary-two focus:ring-offset-2">
          <SendHorizontal class="w-5 h-5" />
        </button>
      </form>
    </div>
  </div>
</template>
