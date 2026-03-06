<template>
  <div id="app" class="min-h-screen font-sans bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
    <!-- Schema Configuration Warning -->
    <div v-if="uiStore.schemaError" class="bg-amber-500 text-white px-4 py-2.5 flex items-center justify-center gap-3 text-sm font-bold shadow-lg relative z-50">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
      <span class="truncate">{{ uiStore.schemaError }}</span>
      <button @click="uiStore.setSchemaError(null)" class="ml-auto hover:bg-white/20 p-1 rounded-lg transition-colors shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <Toaster position="top-right" richColors closeButton :theme="uiStore.isDark ? 'dark' : 'light'" />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Toaster } from 'vue-sonner'
import { useAuthStore } from './stores/auth'
import { useUIStore } from './stores/ui'
import { checkSchemaHealth } from './api/supabase'

const authStore = useAuthStore()
const uiStore = useUIStore()

onMounted(async () => {
    // Proactively initialize auth state on app mount
    await authStore.initialize()
    
    // Check if the Supabase schema is correctly configured
    const error = await checkSchemaHealth()
    if (error) {
        uiStore.setSchemaError(error)
    }
})
</script>
