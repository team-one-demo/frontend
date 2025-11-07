<script setup lang="ts">
  import { useOpenAccountStore } from '@/open-account/open-account.store'
  import StepItem from './StepItem.vue'
  import StepLabel from './StepLabel.vue'

  interface Step {
    id: number
    label: string
  }

  interface Props {
    steps: Step[]
  }
  defineProps<Props>()

  const createAccountStore = useOpenAccountStore()

  const handleStepClick = (stepId: number) => {
    createAccountStore.setStep(stepId)
  }
</script>

<template>
  <div class="w-full py-4">
    <div class="flex items-center max-w-3xl mx-auto">
      <StepItem
        v-for="(step, index) in steps"
        :key="step.id"
        :step-id="step.id"
        :step-number="step.id"
        :is-first="index === 0"
        :is-last="index === steps.length - 1"
        :previous-step-id="index > 0 ? steps[index - 1].id : undefined"
        @click="handleStepClick">
        <template #default="{ status }">
          <StepLabel :status="status">
            {{ step.label }}
          </StepLabel>
        </template>
      </StepItem>
    </div>
  </div>
</template>
