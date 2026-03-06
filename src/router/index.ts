import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

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

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()

  // Ensure auth is initialized before checking
  if (!authStore.isInitialized) {
    await authStore.initialize()
  }

  const isPublic = to.meta.public === true
  const isAuthenticated = !!authStore.session

  if (!isPublic && !isAuthenticated) {
    return next({ name: 'login' })
  }

  if (isPublic && isAuthenticated && (to.name === 'login' || to.name === 'landing')) {
    return next({ name: 'dashboard' })
  }

  next()
})

export default router
