<template>
  <div id="app" class="min-h-screen bg-gray-50 text-gray-900 font-sans">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

onMounted(async () => {
    // Proactively initialize auth state on app mount
    await authStore.initialize()
})
</script>
