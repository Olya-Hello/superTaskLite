import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})




// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // Имя репозитория
// const repoName = 'TaskLite'

// export default defineConfig({
// plugins: [react()],
// base: `/${repoName}/`,
// })