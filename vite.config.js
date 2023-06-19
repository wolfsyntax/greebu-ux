import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      transformAssetUrls: {
      base: null,
      includeAbsolute: false,
      }
    },
  })],
  resolve: {
    alias: {
      '@': '/resources/js',
      //vue: '@vue/compat'
    }
  },
})
