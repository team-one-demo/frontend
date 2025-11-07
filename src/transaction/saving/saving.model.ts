import type { BaseTransaction, BaseTransactionsResponse } from './transaction.model'

export interface SavingTransactionsRequest {
  userId: string
  accountNumber: string
}

export interface SavingTransaction extends BaseTransaction {}

export interface SavingTransactionsResponse extends BaseTransactionsResponse<SavingTransaction> {}
