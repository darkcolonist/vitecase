import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'pinia', '@supabase/supabase-js'],
          'ui': ['lucide-vue-next']
        }
      }
    }
  },
  server: {
      // Optimized for HDD/Performance-heavy environments
      fs: {
          strict: true
      }
  }
})
