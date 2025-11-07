<script setup lang="ts">
  import { computed } from 'vue'
  import { useOpenAccountStore } from './open-account.store'
  import OpenAccountStepLayout from './OpenAccountStepLayout.vue'
  import Input from '@/shared/components/Input.vue'

  const createAccountStore = useOpenAccountStore()

  const licenseNumber = computed({
    get: () => createAccountStore.licenseNumber,
    set: (value: string) => createAccountStore.setLicenseNumber(value)
  })
  const licenseState = computed({
    get: () => createAccountStore.licenseState,
    set: (value: string) => createAccountStore.setLicenseState(value)
  })
  const licenseExpiration = computed({
    get: () => createAccountStore.licenseExpiration,
    set: (value: string) => createAccountStore.setLicenseExpiration(value)
  })
</script>

<template>
  <OpenAccountStepLayout
    title="Enter Your Driver's License Information"
    description="We need your driver's license details for verification">
    <div class="flex flex-col gap-3">
      <Input v-model="licenseNumber" label="License Number" placeholder="Enter your license number" />
      <Input
        v-model="licenseState"
        label="State of Issuance"
        placeholder="Enter state (e.g., CA, NY, TX)"
        maxlength="2" />
      <Input v-model="licenseExpiration" label="Expiration Date" type="date" placeholder="Select expiration date" />
    </div>
  </OpenAccountStepLayout>
</template>
