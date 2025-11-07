<script setup lang="ts">
  import { computed } from 'vue'
  import Select from '@/shared/components/Select.vue'
  import { useOpenAccountStore } from './open-account.store'
  import OpenAccountStepLayout from './OpenAccountStepLayout.vue'

  const createAccountStore = useOpenAccountStore()

  const accountType = computed({
    get: () => createAccountStore.accountType,
    set: (value: string) => createAccountStore.setAccountType(value)
  })
</script>

<template>
  <OpenAccountStepLayout title="Select Your Account Type" description="Choose the account that best fits your needs">
    <Select v-model="accountType" label="Account Type" placeholder="Choose an account type">
      <option value="uchecking">Ultimate Checking</option>
      <option value="usavings">Ultimate Savings</option>
      <option value="pchecking">Premium Checking</option>
      <option value="psavings">Premium Savings</option>
      <option value="fchecking">Free Checking</option>
      <option value="fsavings">Free Savings</option>
    </Select>
  </OpenAccountStepLayout>
</template>
