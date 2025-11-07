<script setup lang="ts">
  import OpenAccountStepLayout from './OpenAccountStepLayout.vue'
  import InfoSection from './InfoSection.vue'
  import InfoItem from './InfoItem.vue'
  import { useOpenAccountStore } from './open-account.store'

  const createAccountStore = useOpenAccountStore()

  const accountTypeLabels: Record<string, string> = {
    uchecking: 'Ultimate Checking',
    usavings: 'Ultimate Savings',
    pchecking: 'Premium Checking',
    psavings: 'Premium Savings',
    fchecking: 'Free Checking',
    fsavings: 'Free Savings',
    checking: 'Checking',
    savings: 'Savings'
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not provided'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
</script>

<template>
  <OpenAccountStepLayout
    title="Application Summary"
    description="Thank you! We will provision your new account shortly">
    <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <div class="w-full md:w-120 flex flex-col gap-6 mx-auto">
        <InfoSection title="Account Details">
          <InfoItem
            label="Account Type"
            :value="accountTypeLabels[createAccountStore.accountType] || createAccountStore.accountType" />
        </InfoSection>

        <InfoSection title="Personal Information">
          <InfoItem label="Full Name" :value="`${createAccountStore.firstName} ${createAccountStore.lastName}`" />
          <InfoItem label="Date of Birth" :value="formatDate(createAccountStore.dateOfBirth)" />
          <InfoItem label="Email" :value="createAccountStore.email || 'Not provided'" />
        </InfoSection>

        <InfoSection title="Driver's License">
          <InfoItem label="License Number" :value="createAccountStore.licenseNumber || 'Not provided'" />
          <InfoItem label="State of Issuance" :value="createAccountStore.licenseState || 'Not provided'" />
          <InfoItem label="Expiration Date" :value="formatDate(createAccountStore.licenseExpiration)" />
        </InfoSection>

        <InfoSection title="Employment Information">
          <InfoItem label="Employer Name" :value="createAccountStore.employerName || 'Not provided'" />
          <InfoItem label="Yearly Income" :value="formatCurrency(createAccountStore.yearlyIncome)" />
        </InfoSection>
      </div>
    </div>
  </OpenAccountStepLayout>
</template>
