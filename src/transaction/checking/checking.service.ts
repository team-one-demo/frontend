import type { CheckingTransactionsRequest, CheckingTransactionsResponse } from './checking.model'
import type { BaseServiceError } from '@/shared/error.model'

const BASE_URL = 'https://ctransactions.ocpgitlab.com'

const createError = (message: string, statusCode?: number, statusText?: string): BaseServiceError => ({
  message,
  statusCode,
  statusText
})

export const getTransactions = async (request: CheckingTransactionsRequest): Promise<CheckingTransactionsResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/checking-transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })

    if (!response.ok) {
      throw createError(
        `Failed to fetch checking transactions: ${response.statusText}`,
        response.status,
        response.statusText
      )
    }

    const data = await response.json()
    return data as CheckingTransactionsResponse
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    if (error instanceof TypeError) {
      throw createError('Network error: Unable to reach the transaction service')
    }

    throw createError(error instanceof Error ? error.message : 'An unknown error occurred while fetching transactions')
  }
}

export const checkingService = {
  getTransactions
}
