import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import { getTransactions as getCheckingTransactions } from './checking/checking.service'
import { getTransactions as getSavingsTransactions } from './saving/saving.service'
import { getTransactions as getAutoLoansTransactions } from './autoloan/autoloans.service'
import type { Account } from '@/account/account.model'
import { useAccountStore } from '@/account/account.store'
import { BaseTransaction } from './transaction.model'
export const useTransactionStore = defineStore('transaction', () => {
  const accountStore = useAccountStore()
  const state = reactive({
    transactions: {} as Record<string, BaseTransaction[]>,
    loading: false
  })

  const getTransactions = async () => {
    state.loading = true
    accountStore.accounts.forEach(async (account) => {
      try {
        await getTransactionsByAccount(account)
      } catch (error) {
        console.error('Error fetching transactions for account:', account, error)
      }
    })
    state.loading = false
  }

  const getTransactionsByAccount = async (account: Account) => {
    const accountType = account.account_name.toLowerCase()
    state.loading = true
    try {
      if (accountType.includes('checking')) {
        state.transactions[account.account_number] = await fetchCheckingTransactions(account.account_number)
      } else if (accountType.includes('savings')) {
        state.transactions[account.account_number] = await fetchSavingsTransactions(account.account_number)
      } else if (accountType.includes('auto')) {
        state.transactions[account.account_number] = await fetchAutoLoansTransactions(account.account_number)
      } else if (accountType.includes('home')) {
        state.transactions[account.account_number] = await fetchHomeLoansTransactions(account.account_number)
      }
    } finally {
      state.loading = false
    }
  }

  const fetchCheckingTransactions = async (accountNumber: string) => {
    try {
      const response = await getCheckingTransactions({ userId: 'user123', accountNumber })
      return response.transactions
    } catch (error) {
      console.error('Error fetching checking transactions:', error)
      return []
    }
  }

  const fetchSavingsTransactions = async (accountNumber: string) => {
    try {
      const response = await getSavingsTransactions({ userId: 'user123', accountNumber })
      return response.transactions
    } catch (error) {
      console.error('Error fetching savings transactions:', error)
      return []
    }
  }

  const fetchAutoLoansTransactions = async (accountNumber: string) => {
    try {
      const response = await getAutoLoansTransactions({ user_id: 'user123', account_number: accountNumber })
      return response.transactions
    } catch (error) {
      console.error('Error fetching loans transactions:', error)
      return []
    }
  }

  const fetchHomeLoansTransactions = async (accountNumber: string) => {
    return [
      {
        date: '2024-09-30',
        description: 'Mortgage Payment',
        amount: '-$1,200.00',
        balance: '-$186,200.00',
        type: 'debit'
      }
    ]
  }

  return { ...toRefs(state), getTransactions, getTransactionsByAccount }
})
