<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 transition-colors duration-300 px-4">
    <div class="max-w-md w-full p-10 bg-white dark:bg-slate-900 shadow-2xl rounded-2xl border border-gray-100 dark:border-slate-800">
      <div class="text-center mb-10">
        <h1 class="text-4xl font-black text-primary tracking-tight">ViteCase</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-2 font-medium">Elevate your workflow</p>
        <div v-if="isDemoMode" class="mt-4 inline-block px-4 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-black rounded-full uppercase tracking-widest border border-amber-200 dark:border-amber-800">
          Demo Mode Active
        </div>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Email</label>
          <input
            v-model="email"
            type="text"
            class="mt-1 block w-full px-4 py-4 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50 dark:bg-slate-800 dark:text-white transition-all duration-200"
            :placeholder="isDemoMode ? 'admin' : 'you@example.com'"
          />
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            class="mt-1 block w-full px-4 py-4 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50 dark:bg-slate-800 dark:text-white transition-all duration-200"
            placeholder="••••••••"
          />
        </div>
        
        <div v-if="isDemoMode" class="text-[11px] text-gray-400 dark:text-gray-500 text-center bg-gray-50 dark:bg-slate-800/50 py-2 rounded-lg border border-dashed border-gray-200 dark:border-slate-700">
            Internal Access: <b>admin</b> / <b>admin</b>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-xl text-sm font-bold text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transform active:scale-[0.98] transition-all duration-200"
        >
          <span v-if="loading" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
          <span>{{ loading ? 'Authenticating...' : 'Authorize Access' }}</span>
        </button>
      </form>

      <div class="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 flex flex-col gap-2">
          <p>Request an account? <a href="#" class="text-primary font-bold hover:underline">Contact Admin</a></p>
          <div>
              <router-link to="/" class="text-primary font-bold hover:underline">&larr; Return to Home</router-link>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { supabase, isDemoMode } from '../api/supabase'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()
const email = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
    loading.value = true
    try {
        if (isDemoMode) {
            if (email.value === 'admin' && password.value === 'admin') {
                await authStore.loginDemo('admin@vitecase.internal')
                router.push('/dashboard')
            } else {
                throw new Error('Invalid demo credentials. Use admin/admin.')
            }
        } else {
            const { error } = await supabase.auth.signInWithPassword({
                email: email.value,
                password: password.value
            })
            if (error) throw error
            router.push('/dashboard')
        }
    } catch (e: any) {
        toast.add({ severity: 'error', summary: 'Error', detail: e.message || 'Failed to login', life: 3000 })
    } finally {
        loading.value = false
    }
}
</script>
