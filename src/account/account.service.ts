import type { AccountsRequest, AccountsResponse } from './account.model'
import type { BaseServiceError } from '@/shared/error.model'

const BASE_URL = 'https://uaccounts.ocpgitlab.com'

const createError = (message: string, statusCode?: number, statusText?: string): BaseServiceError => ({
  message,
  statusCode,
  statusText
})

export const getAccounts = async (request: AccountsRequest): Promise<AccountsResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/accounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })

    if (!response.ok) {
      throw createError(`Failed to fetch accounts: ${response.statusText}`, response.status, response.statusText)
    }

    const data = await response.json()
    return data as AccountsResponse
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    if (error instanceof TypeError) {
      throw createError('Network error: Unable to reach the account service')
    }

    throw createError(error instanceof Error ? error.message : 'An unknown error occurred while fetching accounts')
  }
}

export const accountService = {
  getAccounts
}
