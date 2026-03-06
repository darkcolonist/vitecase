<template>
  <div id="app" class="min-h-screen font-sans">
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

const authStore = useAuthStore()
const uiStore = useUIStore()

onMounted(async () => {
    // Proactively initialize auth state on app mount
    await authStore.initialize()
})
</script>
