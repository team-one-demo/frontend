import type { BaseTransaction } from './transaction.model'

export interface AutoLoansTransactionsRequest {
  user_id: string
  account_number: string
}

export interface AutoLoansTransaction extends BaseTransaction {}

export interface AutoLoansTransactionsResponse {
  transactions: AutoLoansTransaction[]
  account_number: string
  user_id: string
}
