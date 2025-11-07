import type { BaseTransaction, BaseTransactionsResponse } from './transaction.model'

export interface CheckingTransactionsRequest {
  userId: string
  accountNumber: string
}

export interface CheckingTransaction extends BaseTransaction {}

export interface CheckingTransactionsResponse extends BaseTransactionsResponse<CheckingTransaction> {}
