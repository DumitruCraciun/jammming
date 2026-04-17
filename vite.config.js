import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/jammming/',		// / Numele repository-ului pe GitHub
  build: {
    outDir: 'docs',  	// Schimb din 'dist' în 'docs'
  }
})