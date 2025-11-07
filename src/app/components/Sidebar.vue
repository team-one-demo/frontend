<script setup lang="ts">
  import { ref, type Component } from 'vue'
  import {
    LayoutDashboard,
    Wallet,
    Landmark,
    HelpCircle,
    ChevronLeft,
    ChevronRight,
    PiggyBank,
    Car,
    CircleDollarSign
  } from 'lucide-vue-next'
  import SidebarItem from './SidebarItem.vue'
  import { useRouter } from 'vue-router'
  import Logo from '@/shared/components/Logo.vue'
  import LightDarkMode from '@/shared/components/LightDarkMode.vue'
  import { useAuthStore } from '@/auth/authStore'
  import { useGitLabAuth } from '@/auth/useGitLabAuth'

  interface NavItem {
    label: string
    to: string
    icon: Component
    variant?: 'primary' | 'secondary'
  }

  const router = useRouter()
  const authStore = useAuthStore()

  const navItems: NavItem[] = [
    { label: 'Accounts', to: '/accounts', icon: LayoutDashboard, variant: 'primary' },
    { label: 'Pay & Transfer', to: '/transfer', icon: CircleDollarSign, variant: 'primary' },
    { label: 'Checking', to: '/checkingaccounts', icon: Wallet, variant: 'primary' },
    { label: 'Savings', to: '/savingaccounts', icon: PiggyBank, variant: 'primary' },
    { label: 'Loans', to: '/homeloandetail', icon: Landmark, variant: 'primary' },
    { label: 'Auto Loans', to: '/autoloandetail', icon: Car, variant: 'primary' },
    { label: 'Help', to: '/help', icon: HelpCircle, variant: 'secondary' }
  ]

  const collapsed = ref(false)

  function toggleCollapse() {
    collapsed.value = !collapsed.value
  }

  const { logout } = useGitLabAuth()
  function onLogout() {
    logout()
    router.push('/')
  }
</script>
<template>
  <nav
    class="relative flex flex-col h-full w-52 shrink-0 bg-gradient-to-b from-secondary-two to-secondary text-white duration-300 ease-in-out"
    :class="{ '!w-17': collapsed }">
    <div class="flex items-center gap-3 p-5 h-20 border-b border-white/10" @click="router.push('/')">
      <Logo :collapsed="collapsed" />
    </div>

    <button
      @click="toggleCollapse"
      class="absolute top-16 -right-4 z-20 inline-flex items-center justify-center h-8 w-8 rounded-full bg-secondary-two border border-white/30 text-white hover:bg-secondary/90">
      <ChevronRight v-if="collapsed" class="w-4 h-4" />
      <ChevronLeft v-else class="w-4 h-4" />
    </button>

    <ul class="flex-1 flex flex-col items-start py-4 space-y-1 relative">
      <SidebarItem
        v-for="item in navItems"
        :key="item.to"
        :icon="item.icon"
        :to="item.to"
        :label="item.label"
        :collapsed="collapsed"
        :variant="item.variant" />
    </ul>

    <li
      class="mb-2 h-10 relative overflow-visible flex items-center mx-3 px-3 bg-transparent hover:bg-white/10 rounded-lg">
      <LightDarkMode class="!pb-0" :compact="collapsed" />
    </li>

    <div class="border-t border-white/10">
      <button
        class="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-left text-white/80 hover:text-white">
        <div class="relative h-9 w-9 flex items-center justify-center rounded-lg bg-white/10 text-sm font-semibold">
          <span v-if="!authStore.user.avatar_url">{{ authStore.user.name.charAt(0) }}</span>
          <img v-else :src="authStore.user.avatar_url" class="h-9 w-9 rounded-lg absolute inset-0 object-cover" />
        </div>
        <div v-if="!collapsed" class="flex-1 min-w-0">
          <p class="truncate font-semibold text-nowrap">{{ authStore.user.name }}</p>
          <button class="text-xs opacity-70 text-nowrap text-red-300 cursor-pointer" @click="onLogout">Log Out</button>
        </div>
      </button>
    </div>
  </nav>
</template>
