export interface HomeLoanCalculateRequest {
  propertyPrice: number
  amountToBorrow: number
  repaymentTimeInYears: number
  interestRate: number
}

export interface HomeLoanCalculateResponse {
  monthlyLoanPayment: number
  totalInterestPaid: number
}
