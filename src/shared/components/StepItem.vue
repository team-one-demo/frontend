<script setup lang="ts">
  import { Check } from 'lucide-vue-next'
  import { computed } from 'vue'
  import { useOpenAccountStore } from '@/open-account/open-account.store'

  export type StepStatus = 'upcoming' | 'active' | 'complete'

  interface Props {
    stepId: number
    stepNumber: number
    isFirst?: boolean
    isLast?: boolean
    previousStepId?: number
  }

  const props = withDefaults(defineProps<Props>(), {
    isFirst: false,
    isLast: false
  })

  const emit = defineEmits<{
    click: [stepId: number]
  }>()

  const createAccountStore = useOpenAccountStore()

  const getStepStatus = (stepId: number): StepStatus => {
    const currentStep = createAccountStore.step
    if (stepId < currentStep) return 'complete'
    if (stepId === currentStep) return 'active'
    return 'upcoming'
  }

  const status = computed(() => getStepStatus(props.stepId))
  const previousStatus = computed(() => (props.previousStepId ? getStepStatus(props.previousStepId) : 'upcoming'))

  const handleClick = () => {
    emit('click', props.stepId)
  }
</script>

<template>
  <div class="flex flex-col items-center w-full group cursor-pointer" @click="handleClick">
    <div class="flex flex-row items-center w-full">
      <div
        class="flex-1 h-0.5 transition-colors duration-300"
        :class="{
          'bg-transparent dark:bg-gray-900/10': isFirst,
          'bg-secondary': previousStatus === 'complete',
          'bg-gray-300 dark:bg-gray-700': previousStatus !== 'complete'
        }" />

      <div
        class="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 relative z-10 flex-shrink-0 border-2 group-hover:bg-secondary-two group-hover:border-secondary-two"
        :class="{
          'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-700 group-hover:text-gray-100':
            status === 'upcoming',
          'bg-secondary text-white border-secondary shadow-[0_0_0_4px_rgba(var(--color-secondary),0.2)]':
            status === 'active',
          'bg-secondary text-white border-secondary': status === 'complete'
        }">
        <svg v-if="status === 'complete'" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd" />
        </svg>
        <span v-else class="text-sm font-semibold">{{ stepNumber }}</span>
      </div>

      <div
        class="flex-1 h-0.5 transition-colors duration-300"
        :class="{
          'bg-transparent dark:bg-gray-900/10': isLast,
          'bg-secondary': status === 'complete',
          'bg-gray-300 dark:bg-gray-700': status !== 'complete'
        }" />
    </div>

    <slot :status="status" />
  </div>
</template>
