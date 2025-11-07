<script setup lang="ts">
  import { computed } from 'vue'
  import { useOpenAccountStore } from './open-account.store'
  import OpenAccountStepLayout from './OpenAccountStepLayout.vue'
  import Input from '@/shared/components/Input.vue'

  const createAccountStore = useOpenAccountStore()

  const employerName = computed({
    get: () => createAccountStore.employerName,
    set: (value: string) => createAccountStore.setEmployerName(value)
  })
  const yearlyIncome = computed({
    get: () => createAccountStore.yearlyIncome.toString(),
    set: (value: string) => createAccountStore.setYearlyIncome(Number(value) || 0)
  })
</script>

<template>
  <OpenAccountStepLayout title="Enter Your Employment Information" description="Please provide your employment details">
    <div class="flex flex-col gap-3">
      <Input v-model="employerName" label="Employer's Name" placeholder="Enter your employer's name" />
      <Input
        v-model="yearlyIncome"
        label="Yearly Income"
        type="number"
        placeholder="Enter your yearly income"
        min="0"
        step="1000" />
    </div>
  </OpenAccountStepLayout>
</template>
