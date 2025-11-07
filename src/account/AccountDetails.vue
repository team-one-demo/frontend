<script setup lang="ts">
  import { useAccountStore } from './account.store'
  import { useTransactionStore } from '@/transaction/transaction.store'
  import { storeToRefs } from 'pinia'
  import { computed, onMounted, onUnmounted } from 'vue'
  import Transaction from '@/transaction/Transaction.vue'

  const accountStore = useAccountStore()
  const transactionStore = useTransactionStore()
  const { selectedAccount, loading } = storeToRefs(accountStore)

  onMounted(() => {
    if (selectedAccount.value) {
      transactionStore.getTransactionsByAccount(selectedAccount.value)
    }
  })

  const transactions = computed(() => {
    return transactionStore.transactions[selectedAccount.value.account_number] || []
  })
  onUnmounted(() => {
    accountStore.selectedAccount = null
  })
</script>
<template>
  <h3 class="text-lg font-semibold pt-8 pb-4 text-gray-900 dark:text-gray-100">Transactions</h3>
  <div class="flex flex-col gap-3 divide-y divide-gray-200 dark:divide-gray-700">
    <p v-if="loading" class="text-gray-600 dark:text-gray-400">Loading transactions...</p>
    <p v-else-if="transactions.length === 0 && !loading" class="text-gray-600 dark:text-gray-400">
      No transactions found.
    </p>
    <Transaction
      v-for="tx in transactions"
      class="pb-3"
      :key="tx.id"
      :amount="tx?.amount"
      :description="tx?.description"
      :date="tx?.date"
      :accountNumber="selectedAccount.account_number"
      :balance="tx?.balance"
      :type="tx?.type" />
  </div>
</template>
