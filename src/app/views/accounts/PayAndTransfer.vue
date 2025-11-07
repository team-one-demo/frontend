<script setup lang="ts">
  import { ref } from 'vue'
  import {
    SendIcon,
    UserIcon,
    ClockIcon,
    CreditCardIcon,
    SmartphoneIcon,
    BanknoteIcon,
    ArrowRightLeftIcon,
    UsersIcon,
    RepeatIcon
  } from 'lucide-vue-next'
  import Button from '@/shared/components/Button.vue'
  import Card from '@/shared/components/Card.vue'
  import Input from '@/shared/components/Input.vue'

  const selectedAccount = ref('Ultimate Checking - ****1234')
  const transferAmount = ref('')
</script>

<template>
  <div class="min-h-dvh w-full bg-gray-100 dark:bg-gray-900">
    <div class="px-6 pt-6">
      <div class="flex items-baseline justify-between">
        <div>
          <h1 class="text-3xl mt-2 font-semibold tracking-tight text-gray-900 dark:text-gray-100">Pay & Transfer</h1>
          <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">Send money, pay bills, and manage transfers</p>
        </div>
      </div>
    </div>

    <section class="p-6">
      <Card class="flex flex-col gap-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
          <ArrowRightLeftIcon class="inline-block w-5 h-5 text-gray-400 dark:text-gray-500" />
          Quick Transfer
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>From Account</Label>
            <select
              v-model="selectedAccount"
              class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400">
              <option>Ultimate Checking - ****1234</option>
              <option>Savings Account - ****5678</option>
            </select>
          </div>
          <div class="relative">
            <Label>Amount</Label>
            <Input type="number" placeholder="$0.00" />
            <span class="absolute right-10 top-11.25 -translate-y-1/2 text-gray-400 dark:text-gray-500">$</span>
          </div>
        </div>
        <div>
          <Label>To Account or Beneficiary</Label>
          <Input type="text" placeholder="Search by name, account, or email" />
        </div>
        <Button class="self-start"> Transfer </Button>
      </Card>
    </section>

    <section class="p-6">
      <h2 class="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Quick Actions</h2>
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <div class="flex flex-col items-center text-center">
            <div
              class="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
              <SendIcon class="w-6 h-6" />
            </div>
            <span class="text-sm font-semibold text-gray-900 dark:text-gray-100">Send to Friend</span>
          </div>
        </Card>
        <Card>
          <div class="flex flex-col items-center text-center">
            <div
              class="h-12 w-12 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-3">
              <CreditCardIcon class="w-6 h-6" />
            </div>
            <span class="text-sm font-semibold text-gray-900 dark:text-gray-100">Pay Bills</span>
          </div>
        </Card>

        <Card>
          <div class="flex flex-col items-center text-center">
            <div
              class="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
              <BanknoteIcon class="w-6 h-6" />
            </div>
            <span class="text-sm font-semibold text-gray-900 dark:text-gray-100">Pay Merchant</span>
          </div>
        </Card>

        <Card>
          <div class="flex flex-col items-center text-center">
            <div
              class="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 flex items-center justify-center mb-3">
              <RepeatIcon class="w-6 h-6" />
            </div>
            <span class="text-sm font-semibold text-gray-900 dark:text-gray-100">Repeat Payment</span>
          </div>
        </Card>
      </div>
    </section>

    <section class="px-6 pb-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card class="col-span-2">
        <h3 class="font-semibold mb-4 text-gray-900 dark:text-gray-100">
          <UsersIcon class="inline-block w-5 h-5 text-gray-400 dark:text-gray-500" /> Saved Beneficiaries
        </h3>
        <div class="space-y-3">
          <div
            v-for="(person, idx) in [
              { name: 'John Doe', account: '****1234', bank: 'Chase Bank' },
              { name: 'Jane Smith', account: '****5678', bank: 'Bank of America' },
              { name: 'Mike Johnson', account: '****9012', bank: 'Wells Fargo' },
              { name: 'Sarah Williams', account: '****3456', bank: 'Citibank' }
            ]"
            :key="idx"
            class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
            <div class="flex items-center gap-3">
              <div
                class="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                {{
                  person.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                }}
              </div>
              <div>
                <p class="font-medium text-sm text-gray-900 dark:text-gray-100">{{ person.name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ person.bank }} • {{ person.account }}</p>
              </div>
            </div>
            <button
              class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-medium">
              Transfer
            </button>
          </div>
        </div>
        <button
          class="mt-4 w-full rounded-lg border border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 py-2 text-sm font-semibold">
          + Add New Beneficiary
        </button>
      </Card>

      <Card>
        <h3 class="font-semibold mb-4 text-gray-900 dark:text-gray-100">
          <ClockIcon class="inline-block w-5 h-5 text-gray-400 dark:text-gray-500" /> Recent Transfers
        </h3>
        <div class="space-y-3">
          <div
            v-for="(transfer, idx) in [
              { name: 'John Doe', amount: '-$250.00', date: 'Today', status: 'completed' },
              { name: 'Jane Smith', amount: '-$100.00', date: 'Yesterday', status: 'completed' },
              { name: 'Electric Bill', amount: '-$85.50', date: '2 days ago', status: 'pending' }
            ]"
            :key="idx"
            class="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
            <div class="flex items-center gap-3">
              <div class="h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <UserIcon class="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p class="font-medium text-sm text-gray-900 dark:text-gray-100">{{ transfer.name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ transfer.date }}</p>
              </div>
            </div>
            <div class="text-right">
              <p
                class="font-semibold text-sm"
                :class="
                  transfer.amount.startsWith('-')
                    ? 'text-gray-900 dark:text-gray-100'
                    : 'text-emerald-600 dark:text-emerald-400'
                ">
                {{ transfer.amount }}
              </p>
              <span
                class="inline-block text-xs px-2 py-0.5 rounded-full"
                :class="
                  transfer.status === 'completed'
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                    : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                ">
                {{ transfer.status }}
              </span>
            </div>
          </div>
        </div>
        <button
          class="mt-4 w-full text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-semibold">
          View All →
        </button>
      </Card>
    </section>
  </div>
</template>
