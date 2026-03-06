import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase, isDemoMode } from '../api/supabase'
import type { Session, User } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', () => {
    const session = ref<Session | null>(null)
    const user = ref<User | null>(null)
    const isInitialized = ref(false)

    async function initialize() {
        if (isInitialized.value) return

        if (isDemoMode) {
            // Check localStorage for demo session
            const storedUser = localStorage.getItem('demo_user')
            if (storedUser) {
                user.value = JSON.parse(storedUser)
                session.value = { access_token: 'demo', user: user.value } as any
            }
        } else {
            // Initial session check
            const { data } = await supabase.auth.getSession()
            session.value = data.session
            user.value = data.session?.user || null
            
            // Listen for auth changes
            supabase.auth.onAuthStateChange((_event: any, newSession: any) => {
                session.value = newSession
                user.value = newSession?.user || null
            })
        }

        isInitialized.value = true
    }

    async function loginDemo(email: string) {
        const mockUser = {
            id: 'demo-uuid',
            email: email,
            user_metadata: { full_name: 'Demo Admin' }
        } as any
        
        user.value = mockUser
        session.value = { access_token: 'demo', user: mockUser } as any
        localStorage.setItem('demo_user', JSON.stringify(mockUser))
        return { error: null }
    }

    async function signOut() {
        if (isDemoMode) {
            localStorage.removeItem('demo_user')
        } else {
            await supabase.auth.signOut()
        }
        session.value = null
        user.value = null
    }

    return {
        session,
        user,
        isInitialized,
        initialize,
        loginDemo,
        signOut
    }
})
