import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/3d-room-planner/', // ✅ Add base path for GitHub Pages
  plugins: [react()],
});
