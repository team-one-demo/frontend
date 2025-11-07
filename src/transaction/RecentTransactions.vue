<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useTransactionStore } from './transaction.store'
  import { ArrowLeftRightIcon } from 'lucide-vue-next'
  import Transaction from './Transaction.vue'
  import { BaseTransaction } from './transaction.model'

  const transactionStore = useTransactionStore()
  const { transactions } = storeToRefs(transactionStore)

  const parseDate = (s: string): number => {
    if (!s) return 0
    if (s.includes('/')) {
      const [m, d, y] = s.split('/').map(Number)
      return new Date(y, (m || 1) - 1, d || 1).getTime()
    }
    const t = Date.parse(s)
    return isNaN(t) ? 0 : t
  }

  const latestTransactions = computed(() => {
    const all = Object.entries(transactions.value || {}).flatMap(([acct, list]) =>
      (list || []).map((tx: BaseTransaction, idx: number) => ({
        ...tx,
        accountNumber: acct,
        _ts: parseDate(tx.date)
      }))
    )
    return all.sort((a, b) => b._ts - a._ts)
  })

  const sliceAmount = ref(5)

  const slicedTransactions = computed(() => {
    return latestTransactions.value.slice(0, sliceAmount.value)
  })
</script>

<template>
  <div
    class="max-h-110 overflow-y-auto rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-semibold text-gray-900 dark:text-gray-100">
        <ArrowLeftRightIcon class="inline-block w-4 h-4 text-gray-400 dark:text-gray-500" /> My Transactions
      </h3>
      <button
        v-if="sliceAmount < latestTransactions.length"
        @click="sliceAmount = latestTransactions.length"
        class="text-[13px] text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 cursor-pointer font-medium">
        See All
      </button>
      <button
        v-else
        @click="sliceAmount = 5"
        class="text-[13px] text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 cursor-pointer font-medium">
        Show Less
      </button>
    </div>
    <ul class="divide-y divide-gray-100 dark:divide-gray-700">
      <li v-for="(tx, index) in slicedTransactions" :key="index" class="py-3">
        <Transaction
          :description="tx.description"
          :date="tx.date"
          :account-number="tx.accountNumber"
          :type="tx.type"
          :amount="tx.amount" />
      </li>
      <template v-if="latestTransactions.length === 0">
        <li v-for="n in 5" :key="n" class="py-3">
          <Transaction loading />
        </li>
      </template>
    </ul>
  </div>
</template>
