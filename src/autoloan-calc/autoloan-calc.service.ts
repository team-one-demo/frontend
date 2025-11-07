import type { AutoLoansCalculatorRequest, AutoLoansCalculatorResponse } from './autoloan-calc.model'
import type { BaseServiceError } from '@/shared/error.model'

const BASE_URL = 'https://acalc.ocpgitlab.com'

const createError = (message: string, statusCode?: number, statusText?: string): BaseServiceError => ({
  message,
  statusCode,
  statusText
})

export const calculate = async (request: AutoLoansCalculatorRequest): Promise<AutoLoansCalculatorResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/loan/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })

    if (!response.ok) {
      throw createError(`Failed to calculate auto loan: ${response.statusText}`, response.status, response.statusText)
    }

    const data = await response.json()
    return data as AutoLoansCalculatorResponse
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    if (error instanceof TypeError) {
      throw createError('Network error: Unable to reach the calculation service')
    }

    throw createError(error instanceof Error ? error.message : 'An unknown error occurred during calculation')
  }
}

export const autoLoansCalculatorService = {
  calculate
}
