// import { defineConfig,loadEnv } from 'vite'
// import react from '@vitejs/plugin-react'



// // https://vitejs.dev/config/
// export default defineConfig(() => {
 
//   return {
     
//     build: {
//       minify: false // Disable minification
//     },
//     plugins: [react()],
//   }
// })

// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  // Other configuration options...

  build: {
    minify: false // Disable minification
  }
});