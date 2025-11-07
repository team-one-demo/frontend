<script setup lang="ts">
  import { useRouter } from 'vue-router'

  interface Props {
    accountName: string
    accountNumber: string
    gradient?: boolean
    balance?: string
  }

  const props = defineProps<Props>()
  const router = useRouter()

  const getAccountType = (): 'checking' | 'saving' | 'autoLoan' | 'home' | undefined => {
    const lowerName = props.accountName.toLowerCase()
    if (lowerName.includes('checking')) return 'checking'
    if (lowerName.includes('saving')) return 'saving'
    if (lowerName.includes('auto') || lowerName.includes('car')) return 'autoLoan'
    if (lowerName.includes('home') || lowerName.includes('mortgage')) return 'home'
    return undefined
  }

  const handleClick = () => {
    const accountType = getAccountType()
    if (!accountType) return

    const routeMap = {
      checking: '/checkingaccounts',
      saving: '/savingaccounts',
      autoLoan: '/autoloandetail',
      home: '/homeloandetail'
    }

    const route = routeMap[accountType]
    if (route) {
      router.push(route)
    }
  }
</script>

<template>
  <div
    @click="handleClick"
    class="rounded-2xl min-w-60 border border-gray-200 dark:border-gray-700 cursor-pointer bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
    :class="gradient ? 'bg-gradient-to-br from-primary-two  to-indigo-500 text-white border-none shadow-md' : ''">
    <div class="flex items-center justify-between text-sm opacity-70">
      <span>{{ accountNumber }}</span>
      <span>...</span>
    </div>
    <div v-if="balance" class="mt-4 text-2xl font-semibold">${{ balance }}</div>
    <div v-else class="mt-4 h-8">
      <div
        class="h-7 w-32 rounded-md animate-pulse"
        :class="gradient ? 'bg-white/40' : 'bg-gray-200 dark:bg-gray-700'"></div>
    </div>
    <div class="mt-2 text-sm opacity-80">
      <div class="font-medium">{{ accountName }}</div>
      <div>{{ accountNumber }}</div>
    </div>
  </div>
</template>
