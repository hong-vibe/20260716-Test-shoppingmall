import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 4000, // 3000번 및 타 서버 포트와의 충돌을 피하기 위해 4000번 포트로 지정
  }
})
