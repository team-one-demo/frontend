import { createRouter, createWebHistory } from 'vue-router'
import OAuthCallback from '../views/OAuthCallback.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/HomeView.vue')
    },
    {
      path: '/checking',
      name: 'checking',
      component: () => import('../views/home/CheckingView.vue')
    },
    {
      path: '/savings',
      name: 'savings',
      component: () => import('../views/home/SavingsView.vue')
    },
    {
      path: '/homeloans',
      name: 'homeloans',
      component: () => import('../views/home/HomeLoansView.vue')
    },
    {
      path: '/autoloans',
      name: 'autoloans',
      component: () => import('../views/home/AutoLoansView.vue')
    },
    {
      path: '/openaccount',
      name: 'openaccount',
      component: () => import('../views/home/OpenAccountView.vue')
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('../views/accounts/HelpView.vue')
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: () => import('../views/accounts/AccountsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/oauth/callback',
      name: 'oauth-callback',
      component: OAuthCallback
    },
    {
      path: '/savingaccounts',
      name: 'savingaccounts',
      component: () => import('../views/accounts/SavingAccountsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/homeloandetail',
      name: 'homeloandetail',
      component: () => import('../views/accounts/HomeLonesAccountsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/autoloandetail',
      name: 'autoloandetail',
      component: () => import('../views/accounts/AutoLoansAccountsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: () => import('../views/accounts/PayAndTransfer.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/checkingaccounts',
      name: 'checkingaccounts',
      component: () => import('../views/accounts/CheckingAccountsView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

// We'll handle the authentication callback in main.js instead of here
// to avoid circular dependencies

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Get auth state from localStorage directly to avoid store dependency
    const accessToken = localStorage.getItem('gitlab_access_token')
    if (!accessToken) {
      console.log('Protected route accessed without authentication, redirecting to home')
      next({ path: '/' })
    } else {
      console.log('User has token, allowing access to protected route')
      next()
    }
  } else {
    next()
  }
})

export default router
