export interface AccountsRequest {
  user_id: string
}

export interface Account {
  account_name: string
  account_number: string
  balance: string
}

export interface AccountsResponse {
  username: string
  accounts: Account[]
}
