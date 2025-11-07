export interface AutoLoansCalculatorRequest {
  carPrice: number
  repaymentYears: number
  interestRate: number
}

export interface AutoLoansCalculatorResponse {
  monthlyPayment: number
  totalPayment: number
}
