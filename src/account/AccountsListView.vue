<script setup lang="ts">
  import AccountDetails from './AccountDetails.vue'
  import AccountOverview from './AccountOverview.vue'
  import { useAccountStore } from './account.store'
  import { storeToRefs } from 'pinia'
  import { computed, onBeforeMount } from 'vue'

  interface Props {
    accountType: 'checking' | 'saving' | 'autoLoan' | 'home'
  }

  const props = defineProps<Props>()

  const accountStore = useAccountStore()
  const { getHomeAccounts, getCheckingAccounts, getSavingAccounts, getAutoLoanAccounts, selectedAccount } =
    storeToRefs(accountStore)

  const accounts = computed(() => {
    switch (props.accountType) {
      case 'checking':
        return getCheckingAccounts.value
      case 'saving':
        return getSavingAccounts.value
      case 'autoLoan':
        return getAutoLoanAccounts.value
      case 'home':
        return getHomeAccounts.value
      default:
        return []
    }
  })

  onBeforeMount(async () => {
    await accountStore.getAccounts()
    accountStore.selectedAccount = accounts.value[0]
  })
</script>

<template>
  <section class="p-6 flex flex-col">
    <h2 class="text-lg font-semibold mb-3">Your Accounts</h2>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <AccountOverview
        v-for="acc in accounts"
        :key="acc.account_number"
        :account-name="acc.account_name"
        :account-number="acc.account_number"
        :balance="acc.balance"
        :gradient="selectedAccount?.account_number === acc.account_number"
        @click="accountStore.selectAccount(acc.account_number)" />
    </div>

    <AccountDetails v-if="selectedAccount" />
  </section>
</template>
