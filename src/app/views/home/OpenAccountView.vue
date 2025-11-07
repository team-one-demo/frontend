<script setup>
  import Stepper from '@/shared/components/Stepper.vue'
  import Button from '@/shared/components/Button.vue'
  import { useOpenAccountStore } from '@/open-account/open-account.store'
  import { defineAsyncComponent } from 'vue'
  import { useRouter } from 'vue-router'

  const createAccountStore = useOpenAccountStore()
  const router = useRouter()

  const handleNext = () => {
    if (createAccountStore.step === 5) {
      handleComplete()
      return
    }
    if (createAccountStore.step < 5) {
      createAccountStore.setStep(createAccountStore.step + 1)
    }
  }

  const handleComplete = () => {
    createAccountStore.reset()
    router.push('/')
  }

  const handlePrevious = () => {
    if (createAccountStore.step > 1) {
      createAccountStore.setStep(createAccountStore.step - 1)
    }
  }

  const componentStepMap = {
    1: defineAsyncComponent(() => import('@/open-account/SelectAccount.vue')),
    2: defineAsyncComponent(() => import('@/open-account/PersonalInfo.vue')),
    3: defineAsyncComponent(() => import('@/open-account/DriversLicense.vue')),
    4: defineAsyncComponent(() => import('@/open-account/Employment.vue')),
    5: defineAsyncComponent(() => import('@/open-account/Complete.vue'))
  }

  const steps = [
    { id: 1, label: 'Account Type' },
    { id: 2, label: 'Personal Info' },
    { id: 3, label: "Driver's License" },
    { id: 4, label: 'Employment' },
    { id: 5, label: 'Overview' }
  ]
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-4">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Create Your Account</h2>
        <p class="text-gray-600 dark:text-gray-400">Follow the steps below to complete your account setup</p>
      </div>

      <div class="mb-4">
        <Stepper :steps="steps" />
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8">
        <div class="min-h-[450px] flex justify-center w-full">
          <div class="text-center p-12 w-full">
            <component
              :is="componentStepMap[createAccountStore.step]"
              v-if="componentStepMap[createAccountStore.step]" />
          </div>
        </div>
      </div>

      <div class="flex justify-between items-center">
        <button
          @click="handlePrevious"
          :disabled="createAccountStore.step === 1"
          class="px-6 py-3 rounded-lg font-medium transition-all duration-200"
          :class="
            createAccountStore.step === 1
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
          ">
          Previous
        </button>

        <Button @click="handleNext">
          {{
            createAccountStore.step === 4
              ? 'Apply for new Account'
              : createAccountStore.step === 5
              ? 'Complete'
              : 'Next'
          }}
        </Button>
      </div>
    </div>
  </div>
</template>
