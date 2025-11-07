import { defineStore } from 'pinia'
import { reactive, toRefs, computed } from 'vue'
import { accountService } from './account.service'
import type { Account } from './account.model'

export const useAccountStore = defineStore('account', () => {
  const state = reactive({
    accounts: [] as Account[],
    loading: false,
    selectedAccount: null as Account | null
  })

  const getAccounts = async () => {
    if (state.accounts.length > 0) {
      return
    }
    state.loading = true
    try {
      state.accounts = (await accountService.getAccounts({ user_id: 'user123' })).accounts
    } catch (error) {
      console.error('Error fetching accounts:', error)
    } finally {
      state.loading = false
    }
  }

  const getCheckingAccounts = computed(() => {
    return state.accounts.filter((account) => account.account_name.toLowerCase().includes('checking'))
  })

  const getSavingAccounts = computed(() => {
    return state.accounts.filter((account) => account.account_name.toLowerCase().includes('savings'))
  })

  const getAutoLoanAccounts = computed(() => {
    return state.accounts.filter((account) => account.account_name.toLowerCase().includes('auto'))
  })

  const getHomeAccounts = computed(() => {
    return state.accounts.filter((account) => account.account_name.toLowerCase().includes('home'))
  })

  const selectAccount = (accountNumber: string) => {
    state.selectedAccount = state.accounts.find((acc) => acc.account_number === accountNumber) || null
  }

  return {
    ...toRefs(state),
    getAccounts,
    getCheckingAccounts,
    getSavingAccounts,
    getAutoLoanAccounts,
    getHomeAccounts,
    selectAccount
  }
})
