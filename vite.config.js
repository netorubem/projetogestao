import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@context': '/src/context',
      '@utils': '/src/utils'
    },
  },
});
