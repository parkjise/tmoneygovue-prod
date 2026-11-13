import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { bemApiPlugin } from './server/vite-plugin.js';
import { fileURLToPath, URL } from 'node:url';
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [vue(), bemApiPlugin()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  preview: { host: '127.0.0.1', cors: false, allowedHosts: ['localhost', '127.0.0.1'] },
  server: {
    host: '127.0.0.1',
    cors: false,
    allowedHosts: ['localhost', '127.0.0.1'],
    fs: {
      strict: true,
      deny: [
        '**/.env',
        '**/.env.*',
        '**/.git/**',
        '**/.aws/**',
        '**/.ssh/**',
        '**/.npmrc',
        '**/.yarnrc.yml',
        '**/*.{crt,pem,key,p12,pfx,cer,der}',
        '**/server/**'
      ]
    },
    port: 4000,
    strictPort: true
  }
});
