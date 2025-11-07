import type { AutoLoansTransactionsRequest, AutoLoansTransactionsResponse } from './autoloans.model'
import type { BaseServiceError } from '@/shared/error.model'

const BASE_URL = 'https://atransactions.ocpgitlab.com'

const createError = (message: string, statusCode?: number, statusText?: string): BaseServiceError => ({
  message,
  statusCode,
  statusText
})

export const getTransactions = async (
  request: AutoLoansTransactionsRequest
): Promise<AutoLoansTransactionsResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/auto-loan/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })

    if (!response.ok) {
      throw createError(
        `Failed to fetch auto loan transactions: ${response.statusText}`,
        response.status,
        response.statusText
      )
    }

    const data = await response.json()
    return data as AutoLoansTransactionsResponse
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

export const autoLoansService = {
  getTransactions
}
