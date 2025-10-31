import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// import vuetify from '@vuetify/plugin-vue'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vue(), tailwindcss(),],
})
