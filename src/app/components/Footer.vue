<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { FacebookIcon, TwitterIcon, LinkedinIcon, InstagramIcon } from 'lucide-vue-next'
  import Logo from '@/shared/components/Logo.vue'

  const router = useRouter()

  const navigate = (route: string) => {
    router.push(route)
  }

  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Products',
      items: [
        { label: 'Checking Accounts', route: '/checking' },
        { label: 'Savings Accounts', route: '/savings' },
        { label: 'Home Loans', route: '/homeloans' },
        { label: 'Auto Loans', route: '/autoloans' }
      ]
    },
    {
      title: 'Services',
      items: [
        { label: 'Pay & Transfer', route: '/transfer' },
        { label: 'Mobile Banking', route: null },
        { label: 'Online Banking', route: null },
        { label: 'Customer Support', route: null }
      ]
    },
    {
      title: 'Contact',
      items: [
        { label: '1-800-TANUKI-1', route: null },
        { label: 'support@tanukibank.com', route: null },
        { label: 'Available 24/7', route: null }
      ]
    }
  ]

  const bottomLinks = ['Privacy Policy', 'Terms of Service', 'Security']
</script>

<template>
  <footer class="w-full bg-gradient-to-br from-secondary-two to-secondary text-white border-t border-white/10">
    <div class="px-8 xl:px-0 max-w-7xl mx-auto pt-10 pb-2">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <Logo />
          </div>
          <p class="text-sm opacity-90">Your trusted financial partner for all your banking needs.</p>
        </div>

        <div v-for="section in footerSections" :key="section.title">
          <h3 class="font-semibold text-lg mb-4">{{ section.title }}</h3>
          <ul class="space-y-2 text-sm opacity-90">
            <li v-for="item in section.items" :key="item.label">
              <button v-if="item.route" @click="navigate(item.route)" class="hover:opacity-80 transition-opacity">
                {{ item.label }}
              </button>
              <span v-else>{{ item.label }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="pt-2 border-t border-white/10">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-90">
          <p>&copy; {{ currentYear }} Tanuki Bank. All rights reserved.</p>
          <div class="flex gap-6">
            <a v-for="link in bottomLinks" :key="link">{{ link }}</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
