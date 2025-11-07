import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export const useOpenAccountStore = defineStore('openAccount', () => {
  const state = reactive({
    step: 1,
    accountType: 'uchecking',
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    licenseNumber: '',
    licenseState: '',
    licenseExpiration: '',
    employerName: '',
    yearlyIncome: 0
  })

  const setStep = (step: number) => {
    state.step = step
  }
  const setAccountType = (type: string) => {
    state.accountType = type
  }
  const setFirstName = (name: string) => {
    state.firstName = name
  }
  const setLastName = (name: string) => {
    state.lastName = name
  }
  const setEmail = (email: string) => {
    state.email = email
  }
  const setDateOfBirth = (date: string) => {
    state.dateOfBirth = date
  }
  const setLicenseNumber = (number: string) => {
    state.licenseNumber = number
  }
  const setLicenseState = (stateCode: string) => {
    state.licenseState = stateCode
  }
  const setLicenseExpiration = (date: string) => {
    state.licenseExpiration = date
  }
  const setEmployerName = (name: string) => {
    state.employerName = name
  }
  const setYearlyIncome = (income: number) => {
    state.yearlyIncome = income
  }
  const reset = () => {
    state.step = 1
    state.accountType = 'checking'
    state.firstName = ''
    state.lastName = ''
    state.email = ''
    state.dateOfBirth = ''
    state.licenseNumber = ''
    state.licenseState = ''
    state.licenseExpiration = ''
    state.employerName = ''
    state.yearlyIncome = 0
  }
  return {
    ...toRefs(state),
    setStep,
    setAccountType,
    setFirstName,
    setLastName,
    setEmail,
    setDateOfBirth,
    setLicenseNumber,
    setLicenseState,
    setLicenseExpiration,
    setEmployerName,
    setYearlyIncome,
    reset
  }
})
