<template>
  <div class="space-y-8">
    <div class="mb-10 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">User Profile</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-2">Manage your personal information and preferences.</p>
      </div>
      <button
        @click="handleLogout"
        class="flex items-center space-x-2 px-4 py-2 border border-red-500 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition duration-150"
      >
        <i class="pi pi-sign-out text-xl"></i>
        <span>Sign Out</span>
      </button>
    </div>

    <div class="bg-white dark:bg-surface-900 rounded-2xl shadow-xl border border-gray-100 dark:border-surface-800 overflow-hidden">
      <div class="p-8 border-b border-gray-100 dark:border-surface-800 bg-gray-50 dark:bg-surface-800">
        <div class="flex items-center space-x-5">
          <div class="relative w-24 h-24 p-1 border-4 border-white dark:border-surface-700 bg-blue-100 dark:bg-blue-900/30 rounded-full shadow-md flex items-center justify-center flex-shrink-0">
            <img v-if="profile.avatar_url && profile.avatar_url.trim() !== ''" :src="profile.avatar_url" alt="Avatar" class="w-full h-full rounded-full object-cover" />
            <i v-else class="pi pi-user text-5xl text-blue-500 dark:text-blue-400"></i>
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
              class="w-full px-4 py-4 border border-gray-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-surface-900 dark:text-white hover:bg-white dark:hover:bg-surface-800 transition duration-200"
              placeholder="John Doe"
            />
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Email Address</label>
            <input
              type="email"
              :value="authStore.user?.email || ''"
              disabled
              class="w-full px-4 py-4 border border-gray-200 dark:border-surface-700 rounded-xl bg-gray-100 dark:bg-surface-900/50 dark:text-gray-400 cursor-not-allowed opacity-75"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Avatar URL</label>
            <input
              type="text"
              v-model="profile.avatar_url"
              class="w-full px-4 py-4 border border-gray-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-surface-900 dark:text-white hover:bg-white dark:hover:bg-surface-800 transition duration-200"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>
          
          <div class="space-y-2 flex flex-col">
            <label class="block text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Date of Birth</label>
            <DatePicker 
              v-model="profile.date_of_birth" 
              dateFormat="mm/dd/yy"
              showIcon 
              fluid 
              placeholder="Select your birth date" 
              :pt="{ 
                root: { class: 'w-full' }
              }"
            />
          </div>
        </div>

        <div class="pt-8 border-t border-gray-100 dark:border-surface-700 flex justify-end">
          <button
            @click="saveProfile"
            :disabled="loading"
            class="px-10 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transform hover:-translate-y-1 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
          >
            <span v-if="loading" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
            <span>{{ loading ? 'Updating...' : 'Update Preferences' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '../stores/auth'
import { supabase, isDemoMode } from '../api/supabase'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()
const loading = ref(false)

const profile = reactive({
  full_name: '',
  avatar_url: '',
  date_of_birth: null as Date | null
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
            await new Promise(resolve => setTimeout(resolve, 800))
            toast.add({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully (Demo Mode)!', life: 3000 })
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
        toast.add({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully!', life: 3000 })
    } catch (e: any) {
        toast.add({ severity: 'error', summary: 'Error', detail: e.message || 'Error updating profile', life: 3000 })
    } finally {
        loading.value = false
    }
}
</script>
