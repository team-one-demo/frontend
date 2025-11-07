<script setup lang="ts">
  import { Calculator, DollarSign, Percent, Calendar, Loader2 } from 'lucide-vue-next'
  import { computed, reactive } from 'vue'
  import Button from '@/shared/components/Button.vue'
  import { calculate } from './autoloan-calc.service'
  import type { AutoLoansCalculatorRequest, AutoLoansCalculatorResponse } from './autoloan-calc.model'

  type FormField = {
    key: keyof AutoLoansCalculatorRequest
    label: string
    class: string
    icon: typeof DollarSign
    placeholder: string
    step: number
    inputmode: 'decimal' | 'numeric'
    min: number
  }

  const form = reactive<AutoLoansCalculatorRequest>({
    carPrice: null,
    repaymentYears: null,
    interestRate: null
  })

  const state = reactive({
    result: null as AutoLoansCalculatorResponse | null,
    loading: false,
    error: null as string | null,
    submitted: false
  })

  const fields: FormField[] = [
    {
      key: 'carPrice',
      class: 'col-span-2',
      label: 'Car price',
      icon: DollarSign,
      placeholder: '50000',
      step: 1,
      inputmode: 'decimal',
      min: 0
    },
    {
      key: 'repaymentYears',
      label: 'Repayment time (years)',
      class: 'col-span-1',
      icon: Calendar,
      placeholder: '30',
      step: 1,
      inputmode: 'numeric',
      min: 1
    },
    {
      key: 'interestRate',
      label: 'Interest rate (%)',
      class: 'col-span-1',
      icon: Percent,
      placeholder: '6.25',
      step: 0.01,
      inputmode: 'decimal',
      min: 0
    }
  ]

  const validation = computed(() => {
    const errors: Partial<Record<keyof AutoLoansCalculatorRequest, string>> = {}

    if (form.carPrice !== null && form.carPrice <= 0) {
      errors.carPrice = 'Enter a positive amount'
    }

    if (form.repaymentYears !== null && form.repaymentYears <= 0) {
      errors.repaymentYears = 'Enter years greater than 0'
    }

    if (form.interestRate !== null && form.interestRate <= 0) {
      errors.interestRate = 'Enter a positive rate'
    }

    return errors
  })

  const isValid = computed(() => {
    return Object.values(form).every((val) => val !== null && val > 0) && Object.keys(validation.value).length === 0
  })

  const formatCurrency = (amount: number) =>
    amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })

  async function handleSubmit() {
    if (!isValid.value || state.loading) return

    state.loading = true
    state.error = null
    state.submitted = false

    try {
      const request: AutoLoansCalculatorRequest = {
        carPrice: form.carPrice,
        repaymentYears: form.repaymentYears,
        interestRate: form.interestRate
      }
      state.result = await calculate(request)
      state.submitted = true
    } catch (err) {
      console.error(err)
      state.error = err instanceof Error ? err.message : 'Calculation failed'
    } finally {
      state.loading = false
    }
  }
</script>

<template>
  <div
    class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur p-6 xl:p-7 shadow-sm space-y-6">
    <div class="flex items-center gap-2">
      <Calculator class="h-7 w-7 text-primary-two" />
      <h4 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Auto Calculator</h4>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <div class="grid grid-cols-2 gap-4">
        <div v-for="field in fields" :key="field.key" class="space-y-1.5" :class="`${field.class}`">
          <label :for="field.key" class="text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ field.label }}
          </label>
          <div class="relative">
            <component
              :is="field.icon"
              class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
            <input
              :id="field.key"
              v-model.number="form[field.key]"
              type="number"
              :inputmode="field.inputmode"
              :min="field.min"
              :step="field.step"
              :placeholder="field.placeholder"
              class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 pl-10 pr-3 py-2.5 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-two/50 focus:border-primary-two transition"
              required />
          </div>
          <p v-if="validation[field.key]" class="text-xs text-red-600 dark:text-red-400">
            {{ validation[field.key] }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <Button
          type="submit"
          :disabled="!isValid || state.loading"
          class="inline-flex items-center gap-2 rounded-lg bg-primary-two px-4 py-2.5 text-white font-medium shadow-sm hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed transition-all">
          <Loader2 v-if="state.loading" class="h-4 w-4 animate-spin" />
          <span>{{ state.loading ? 'Calculating...' : 'Calculate' }}</span>
        </Button>
        <span class="text-xs text-gray-500 dark:text-gray-400">All values are estimates</span>
      </div>
    </form>

    <div v-if="state.error || (state.submitted && state.result)">
      <div
        v-if="state.error"
        class="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-3 text-sm">
        {{ state.error }}
      </div>

      <div
        v-else-if="state.result"
        class="rounded-lg border bg-primary/10 dark:bg-primary/20 text-primary-two dark:text-primary px-4 py-3 space-y-1">
        <h5 class="text-base font-semibold">Estimated Payments</h5>
        <p class="text-sm">
          Monthly payment:
          <span class="font-semibold">{{ formatCurrency(state.result.monthlyPayment) }}</span>
        </p>
        <p class="text-sm">
          Total payment:
          <span class="font-semibold">{{ formatCurrency(state.result.totalPayment) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
