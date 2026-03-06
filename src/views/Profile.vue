<template>
  <AppLayout title="Profile Settings">
    <div class="p-4 md:p-10 max-w-4xl mx-auto">
      <div class="mb-10 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">User Profile</h1>
          <p class="text-gray-500 dark:text-gray-400 mt-2">Manage your personal information and preferences.</p>
        </div>
        <button
          @click="handleLogout"
          class="flex items-center space-x-2 px-4 py-2 border border-red-500 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition duration-150"
        >
          <LogOut class="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div class="p-8 border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
          <div class="flex items-center space-x-5">
            <div class="p-1 border-4 border-white dark:border-slate-700 bg-blue-100 dark:bg-blue-900/30 rounded-full shadow-md">
              <User class="w-20 h-20 text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-800 dark:text-white">{{ authStore.user?.email || 'Loading...' }}</h2>
              <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold uppercase tracking-wider">
                Full Access Member
              </span>
            </div>
          </div>
        </div>

        <div class="p-10 space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Full Name</label>
              <input
                type="text"
                v-model="profile.full_name"
                class="w-full px-4 py-4 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-slate-900 dark:text-white hover:bg-white dark:hover:bg-slate-800 transition duration-200"
                placeholder="John Doe"
              />
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Email Address</label>
              <input
                type="email"
                :value="authStore.user?.email || ''"
                disabled
                class="w-full px-4 py-4 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-100 dark:bg-slate-900/50 dark:text-gray-400 cursor-not-allowed opacity-75"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Avatar URL</label>
            <input
              type="text"
              v-model="profile.avatar_url"
              class="w-full px-4 py-4 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-slate-900 dark:text-white hover:bg-white dark:hover:bg-slate-800 transition duration-200"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          <div class="pt-8 border-t border-gray-100 dark:border-slate-700 flex justify-end">
            <button
              @click="saveProfile"
              class="px-10 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transform hover:-translate-y-1 transition duration-200"
            >
              Update Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { LogOut, User } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth'
import { supabase, isDemoMode } from '../api/supabase'
import AppLayout from '../layouts/AppLayout.vue'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)

const profile = reactive({
  full_name: '',
  avatar_url: ''
})

onMounted(async () => {
    if (isDemoMode) {
        // Mock profile data for demo mode
        profile.full_name = 'Demo Administrator'
        profile.avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
        return
    }

    if (authStore.user) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authStore.user.id)
            .single()
        
        if (data) {
            profile.full_name = data.full_name || ''
            profile.avatar_url = data.avatar_url || ''
        } else if (error) {
            console.error('Error fetching profile:', error)
        }
    }
})

const handleLogout = async () => {
    await authStore.signOut()
    router.push('/login')
}

const saveProfile = async () => {
    loading.value = true
    try {
        if (isDemoMode) {
            // Simulated save for demo mode
            await new Promise(resolve => setTimeout(resolve, 500))
            alert('Profile updated successfully (Demo Mode)!')
            return
        }

        if (!authStore.user) throw new Error('Not authenticated')

        const { error } = await supabase
            .from('profiles')
            .update({
                full_name: profile.full_name,
                avatar_url: profile.avatar_url
            })
            .eq('id', authStore.user.id)
        
        if (error) throw error
        alert('Profile updated successfully!')
    } catch (e: any) {
        alert(e.message || 'Error updating profile')
    } finally {
        loading.value = false
    }
}
</script>
