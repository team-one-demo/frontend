export interface BaseTransaction {
  date: string
  description: string
  type: string
  amount: string
  balance: string
}

export interface BaseTransactionsRequest {
  userId?: string
  user_id?: string
  accountNumber?: string
  account_number?: string
}

export interface BaseTransactionsResponse<T> {
  transactions: T[]
  accountNumber: string
  userId: string
}
