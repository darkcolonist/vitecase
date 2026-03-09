<template>
  <!-- Schema Configuration Warning -->
  <div v-if="uiStore.schemaError" class="bg-amber-500 text-white px-4 py-2.5 flex items-center justify-center gap-3 text-sm font-bold shadow-lg relative z-50">
    <i class="pi pi-exclamation-triangle shrink-0 text-xl"></i>
    <span class="truncate">{{ uiStore.schemaError }}</span>
    <button @click="uiStore.setSchemaError(null)" class="ml-auto hover:bg-white/20 p-1 rounded-lg transition-colors shrink-0">
      <i class="pi pi-times"></i>
    </button>
  </div>

  <router-view />
  <Toast />
  <ConfirmDialog />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
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
