import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useAuthStore } from '../stores/auth'

// Configure NProgress
NProgress.configure({ showSpinner: false, trickleSpeed: 200 })

import AppLayout from '@/layout/AppLayout.vue'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: () => import('../views/Landing.vue'),
    meta: { public: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: { public: true }
  },
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/Dashboard.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/Profile.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  const authStore = useAuthStore()

  // Ensure auth is initialized before checking
  if (!authStore.isInitialized) {
    await authStore.initialize()
  }

  const isPublic = to.meta.public === true
  const isAuthenticated = !!authStore.session

  if (!isPublic && !isAuthenticated) {
    NProgress.done()
    return next({ name: 'login' })
  }

  if (isPublic && isAuthenticated && (to.name === 'login' || to.name === 'landing')) {
    NProgress.done()
    return next({ name: 'dashboard' })
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
