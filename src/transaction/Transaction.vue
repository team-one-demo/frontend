<script setup lang="ts">
  import { computed } from 'vue'
  interface Props {
    description?: string
    date?: string
    accountNumber?: string
    balance?: string
    type?: string
    amount?: string
    loading?: boolean
  }

  const props = defineProps<Props>()

  const tagClass = (tag?: string) => {
    switch ((tag || '').toLowerCase()) {
      case 'interest':
        return 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 ring-1 ring-amber-200 dark:ring-amber-800'
      case 'deposit':
        return 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-200 dark:ring-emerald-800'
      case 'withdrawal':
        return 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 ring-1 ring-rose-200 dark:ring-rose-800'
      case 'card':
        return 'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 ring-1 ring-sky-200 dark:ring-sky-800'
      case 'ach payment':
        return 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-200 dark:ring-indigo-800'
      case 'fee':
        return 'bg-zinc-50 dark:bg-zinc-900/30 text-zinc-700 dark:text-zinc-300 ring-1 ring-zinc-200 dark:ring-zinc-800'
      default:
        return 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 ring-1 ring-gray-200 dark:ring-gray-700'
    }
  }

  const isLoading = computed(() => {
    return props.loading === true || !props.amount
  })
</script>

<template>
  <div>
    <div class="flex items-start justify-between gap-3">
      <div v-if="!isLoading" class="text-sm font-medium truncate text-gray-900 dark:text-gray-100" :title="description">
        {{ description ?? '' }}
      </div>
      <div v-else class="h-6 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>

      <template v-if="!isLoading">
        <span
          v-if="type"
          class="inline-flex items-center rounded-full px-2 py-0.5 text-xs text-nowrap font-medium"
          :class="tagClass(type)">
          {{ type }}
        </span>
        <div v-else class="h-5 py-0.5 w-14 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
      </template>
      <template v-else>
        <div class="h-5 w-14 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
      </template>
    </div>

    <div class="mt-1 flex items-center justify-between gap-3">
      <div v-if="!isLoading" class="text-xs text-gray-500 dark:text-gray-400 min-w-0 truncate">
        <span v-if="date">{{ date }} · {{ accountNumber ?? '' }}</span>
      </div>
      <div v-else class="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>

      <span v-if="!isLoading" class="text-sm font-medium min-w-[88px] text-right text-gray-900 dark:text-gray-100">{{
        amount ?? ''
      }}</span>
      <div v-else class="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
    </div>
  </div>
</template>
