<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import AccountOverview from '@/account/AccountOverview.vue'
  import { useAccountStore } from '@/account/account.store'
  import RecentTransactions from '@/transaction/RecentTransactions.vue'
  import { CircleDollarSignIcon, RssIcon } from 'lucide-vue-next'
  import { useTransactionStore } from '@/transaction/transaction.store'
  import { onBeforeMount } from 'vue'
  import { useAuthStore } from '@/auth/authStore'

  const authStore = useAuthStore()
  const accountStore = useAccountStore()
  const { accounts, loading } = storeToRefs(accountStore)

  const transactionStore = useTransactionStore()
  onBeforeMount(async () => {
    await accountStore.getAccounts()
    await transactionStore.getTransactions()
  })
</script>

<template>
  <div class="min-h-dvh w-full bg-gray-100 dark:bg-gray-900">
    <div class="flex items-baseline justify-between p-6">
      <h1 class="text-3xl mt-2 font-semibold tracking-tight text-gray-900 dark:text-gray-100">
        Welcome Back, {{ authStore.user?.name }}!
      </h1>
    </div>

    <section class="p-6">
      <h2 class="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Your Accounts</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <template v-if="loading">
          <div
            v-for="n in 4"
            :key="`skeleton-${n}`"
            class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
            <div class="animate-pulse">
              <div class="flex items-center justify-between text-sm opacity-70">
                <div class="h-5 w-28 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div class="h-4 w-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div class="mt-4 h-8">
                <div class="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              </div>
              <div class="mt-3 space-y-1">
                <div class="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div class="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <AccountOverview
            v-for="acc in accounts"
            :key="acc.account_number"
            :account-name="acc.account_name"
            :account-number="acc.account_number"
            :balance="acc.balance"
            :gradient="acc.account_name.toLowerCase().includes('ultimate')" />
        </template>
      </div>
    </section>

    <section class="px-6 pb-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <RecentTransactions />

      <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
        <h3 class="font-semibold mb-4 text-gray-900 dark:text-gray-100">
          <CircleDollarSignIcon class="inline-block w-4 h-4 text-gray-400 dark:text-gray-500" /> Send Money
        </h3>
        <div class="flex items-center gap-3 mb-4">
          <div
            v-for="n in 4"
            :key="n"
            class="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-semibold">
            {{ ['JD', 'JS', 'MJ', 'SW'][n - 1] }}
          </div>
        </div>
        <button class="w-full rounded-md bg-rose-500 hover:bg-rose-600 text-white py-2 text-sm font-semibold">
          SEND MONEY
        </button>
        <div class="mt-5 rounded-xl p-4 bg-gradient-to-tr from-indigo-500 via-purple-500 to-indigo-500 text-white">
          <p class="font-semibold text-sm">TRAVEL LOAN</p>
          <p class="text-xs opacity-90">You can take loan for your travel and pay back in easy installments</p>
          <button
            class="mt-3 inline-flex items-center rounded-md bg-white/15 hover:bg-white/25 px-3 py-1 text-xs font-medium">
            Learn More
          </button>
        </div>
      </div>

      <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
        <h3 class="font-semibold mb-4 text-gray-900 dark:text-gray-100">
          <RssIcon class="inline-block w-4 h-4 text-gray-400 dark:text-gray-500" /> Another Section
        </h3>
        <p class="text-gray-700 dark:text-gray-300">Some content for this section</p>
        <p class="text-gray-700 dark:text-gray-300">Some random news or something, Ads, Annoucements</p>
      </div>
    </section>
  </div>
</template>
