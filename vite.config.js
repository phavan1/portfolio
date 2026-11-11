import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' keeps every path relative, so the same build works on
// phavankumaar.com, on GitHub Pages and in a preview.
export default defineConfig({
  plugins: [react()],
  base: './',
})
