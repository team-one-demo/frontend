<script setup lang="ts">
  import { computed } from 'vue'
  import { useOpenAccountStore } from './open-account.store'
  import OpenAccountStepLayout from './OpenAccountStepLayout.vue'
  import Input from '@/shared/components/Input.vue'

  const createAccountStore = useOpenAccountStore()

  const firstName = computed({
    get: () => createAccountStore.firstName,
    set: (value: string) => createAccountStore.setFirstName(value)
  })
  const lastName = computed({
    get: () => createAccountStore.lastName,
    set: (value: string) => createAccountStore.setLastName(value)
  })
  const dateOfBirth = computed({
    get: () => createAccountStore.dateOfBirth,
    set: (value: string) => createAccountStore.setDateOfBirth(value)
  })
  const email = computed({
    get: () => createAccountStore.email,
    set: (value: string) => createAccountStore.setEmail(value)
  })
</script>

<template>
  <OpenAccountStepLayout
    title="Enter Your Personal Information"
    description="Provide your personal details to continue">
    <div class="flex flex-col gap-3">
      <Input v-model="firstName" label="First Name" placeholder="Enter your first name" />
      <Input v-model="lastName" label="Last Name" placeholder="Enter your last name" />
      <Input
        v-model="dateOfBirth"
        label="Date of Birth"
        type="date"
        defaultValue="2000-01-01"
        placeholder="Select your date of birth" />
      <Input v-model="email" label="Email" placeholder="Enter your email" />
    </div>
  </OpenAccountStepLayout>
</template>
