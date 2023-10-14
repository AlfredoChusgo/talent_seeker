import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {usePolling:true}, // Enable file watching
    // You can also specify additional watch options here
  },
})
