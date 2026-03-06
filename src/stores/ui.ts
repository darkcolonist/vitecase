import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useUIStore = defineStore('ui', () => {
    const isDark = ref(localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches))
    const schemaError = ref<string | null>(null)

    function toggleDarkMode() {
        isDark.value = !isDark.value
        localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
        updateDOM()
    }

    function setSchemaError(error: string | null) {
        schemaError.value = error
    }

    function updateDOM() {
        if (isDark.value) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    // Initialize DOM state
    updateDOM()

    return {
        isDark,
        schemaError,
        toggleDarkMode,
        setSchemaError,
        updateDOM
    }
})
