import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Имя репозитория
const repoName = 'superTaskLite'

export default defineConfig({
plugins: [react()],
base: `/${repoName}/`,
})

