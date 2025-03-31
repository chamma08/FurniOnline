import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],  // Ensure React plugin is loaded
  server: {
    host: '0.0.0.0',  // Allow access from outside the container
    port: 3000,       // Ensure it runs on port 3000
    strictPort: true, // Prevent auto-changing the port
    watch: {
      usePolling: true, // Helps with file watching in Docker
    },
  },
  assetsInclude: ['**/*.glb'],
})