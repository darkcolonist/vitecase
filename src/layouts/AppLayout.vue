<template>
  <div class="h-screen bg-transparent overflow-hidden">
    <div class="flex h-full">
      <!-- Mobile Sidebar Backdrop -->
      <div
        v-if="isOpen"
        @click="isOpen = false"
        class="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity duration-300"
      ></div>

      <!-- Sidebar -->
      <aside
        :class="[
          'fixed inset-y-0 left-0 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 w-64 transform transition-all duration-300 ease-in-out z-30 md:relative md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        ]"
      >
        <div class="flex flex-col h-full">
          <!-- Sidebar Header -->
          <div class="p-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
            <div class="flex items-center space-x-3">
                <div class="p-2 bg-primary rounded-lg shadow-lg shadow-primary/20">
                  <Box class="w-6 h-6 text-white" />
                </div>
                <router-link to="/dashboard" class="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100 hover:text-primary dark:hover:text-primary transition-colors">ViteCase</router-link>
            </div>
            <button @click="isOpen = false" class="md:hidden text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors duration-200">
              <X class="w-6 h-6" />
            </button>
          </div>

          <!-- Navigation Links -->
          <nav class="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
            <router-link
              to="/dashboard"
              class="flex items-center space-x-3 px-4 py-3 rounded-xl transition duration-200 group relative overflow-hidden"
              :class="[
                $route.name === 'dashboard' 
                  ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-gray-100'
              ]"
            >
              <div 
                class="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-300"
              ></div>
              <LayoutDashboard class="w-5 h-5 flex-shrink-0" />
              <span class="font-medium relative z-10 transition-transform duration-300 group-hover:translate-x-1">Dashboard</span>
            </router-link>

            <router-link
              to="/profile"
              class="flex items-center space-x-3 px-4 py-3 rounded-xl transition duration-200 group relative overflow-hidden"
              :class="[
                $route.name === 'profile' 
                  ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-gray-100'
              ]"
            >
              <div 
                class="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-300"
              ></div>
              <UserCircle class="w-5 h-5 flex-shrink-0" />
              <span class="font-medium relative z-10 transition-transform duration-300 group-hover:translate-x-1">Profile</span>
            </router-link>
          </nav>

          <!-- Sidebar Footer -->
          <div class="p-4 border-t border-gray-100 dark:border-slate-800 space-y-3">
            <div class="flex items-center space-x-3 px-4 py-3 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-100 dark:border-slate-800 shadow-inner group transition-all hover:bg-gray-100 dark:hover:bg-slate-800">
              <div class="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-all duration-300">
                <User class="w-5 h-5 text-primary" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-bold truncate text-gray-800 dark:text-gray-100">{{ authStore.user?.email || 'Loading...' }}</p>
                <p class="text-xs text-primary font-medium tracking-tight">Standard Tier</p>
              </div>
            </div>
            <button 
              @click="handleLogout"
              class="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition duration-200 group"
            >
              <LogOut class="w-5 h-5 transition-transform group-hover:scale-110" />
              <span class="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col min-w-0 bg-gray-50 dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
        <!-- Top Navbar -->
        <header class="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 h-16 flex items-center justify-between px-6 flex-shrink-0 shadow-sm transition-colors duration-500 z-10">
          <div class="flex items-center space-x-4">
            <button 
              @click="isOpen = true" 
              class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 active:scale-95 transition-all duration-200 shadow-sm border border-gray-100 dark:border-slate-700 md:hidden"
            >
              <Menu class="w-6 h-6" />
            </button>
            <div class="hidden md:flex items-center space-x-2">
              <h2 class="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-tight">{{ title || 'Dashboard' }}</h2>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <!-- Dark Mode Toggle -->
            <button 
              @click="uiStore.toggleDarkMode" 
              class="p-2.5 rounded-xl text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-amber-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-500 border border-transparent hover:border-gray-200 dark:hover:border-slate-700 shadow-sm active:scale-90"
              title="Toggle Theme"
            >
              <Sun v-if="uiStore.isDark" class="w-5 h-5" />
              <Moon v-else class="w-5 h-5" />
            </button>

            <div class="h-6 w-[1px] bg-gray-200 dark:bg-slate-800 mx-1"></div>

            <router-link to="/profile" class="flex items-center space-x-3 p-1 pl-2 pr-4 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-300 border border-transparent hover:border-gray-200 dark:hover:border-slate-700 shadow-sm group">
              <div class="relative">
                <img 
                  v-if="authStore.user?.email"
                  :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${authStore.user?.email}`" 
                  class="w-8 h-8 rounded-lg border border-gray-200 dark:border-slate-600 bg-white shadow-sm"
                />
                <div class="w-8 h-8 rounded-lg bg-blue-100 dark:bg-slate-700 animate-pulse" v-else></div>
                <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full shadow-sm"></div>
              </div>
              <span class="hidden sm:block text-sm font-bold text-gray-700 dark:text-gray-300 truncate max-w-[100px] group-hover:text-primary transition-colors duration-200">
                {{ authStore.user?.email?.split('@')[0] || 'User' }}
              </span>
            </router-link>
          </div>
        </header>

        <!-- Page Content -->
        <main class="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative">
          <!-- Background Decoration -->
          <div class="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-50/20 dark:from-blue-900/10 to-transparent -z-10 transition-colors duration-700"></div>
          <div class="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-indigo-50/20 dark:from-indigo-900/10 to-transparent -z-10 transition-colors duration-700"></div>
          
          <div class="animate-fade-in relative z-10 h-full">
            <slot></slot>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Box, LayoutDashboard, UserCircle, Menu, X, User, Sun, Moon, LogOut } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth'
import { useUIStore } from '../stores/ui'
import { useRouter } from 'vue-router'

defineProps<{
  title?: string
}>()

const isOpen = ref(false)
const authStore = useAuthStore()
const uiStore = useUIStore()
const router = useRouter()

const handleLogout = async () => {
  await authStore.signOut()
  router.push('/login')
}

onMounted(() => {
  // Ensure DOM is in sync with store state on mount
  uiStore.updateDOM()
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(107, 114, 128, 0.2);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(107, 114, 128, 0.4);
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}
</style>
