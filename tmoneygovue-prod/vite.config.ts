import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default ({mode}) => {
  const  env = loadEnv(mode, process.cwd(), '');

 return defineConfig({
    plugins: [vue(), vueJsx(), VueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      // headers: { 'Cache-control': 'no-cache' },
      proxy: {
        '/api/pym/v1': {
          target: env.VITE_TRAVEL_AXIOS_BASE_URL,
          changeOrigin: true,
          ws: true,
          secure: false
        },
        '/api/prd/v1': {
          target: env.VITE_TRAVEL_AXIOS_BASE_URL,
          changeOrigin: true,
          ws: true,
          secure: false
        },
        '/api/mrnp/v1': {
          target: env.VITE_TRAVEL_AXIOS_BASE_URL,
          changeOrigin: true,
          ws: true,
          secure: false
        },
        '/common/sysError.do': {
          target: env.VITE_TRAVEL_AXIOS_BASE_URL,
          changeOrigin: true,
          ws: true,
          secure: false
        },
        '/api/pm': {
          target: env.VITE_TMONEY1_AXIOS_BASE_URL,
          changeOrigin: true,
          ws: true,
          // rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
          // only https
          secure: false
        },
        '/api/dltMbrsTmpyPymMns': {
          target: env.VITE_TMONEY1_AXIOS_BASE_URL,
          changeOrigin: true,
          ws: true,
          // rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
          // only https
          secure: false
        },
        '/api/reqMailMod': {
          // target: 'http://localhost:5110/tgodummyspa',
          target: env.VITE_TMONEY1_AXIOS_BASE_URL,
          changeOrigin: true,
          ws: true,
          // rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
          // only https
          secure: false
        },
        '/api/reqPwdMod': {
          // target: 'http://localhost:5110/tgodummyspa',
          target: env.VITE_TMONEY1_AXIOS_BASE_URL,
          changeOrigin: true,
          ws: true,
          // rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
          // only https
          secure: false
        },
        '/api/reqWeightMod': {
          // target: 'http://localhost:5110/tgodummyspa',
          target: env.VITE_TMONEY1_AXIOS_BASE_URL,
          changeOrigin: true,
          ws: true,
          // rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
          // only https
          secure: false
        },
        '/api/reqPrntMbphNoMod': {
          // target: 'http://localhost:5110/tgodummyspa',
          target: env.VITE_TMONEY1_AXIOS_BASE_URL,
          changeOrigin: true,
          ws: true,
          // rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
          // only https
          secure: false
        },
        '/api/inqrTmpyTrcr': {
          // target: 'http://localhost:5110/tgodummyspa',
          target: env.VITE_TMONEY1_AXIOS_BASE_URL,
          changeOrigin: true,
          ws: true,
          // rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
          // only https
          secure: false
        },
        '/api/reqRgtTmpyTrcr': {
          // target: 'http://localhost:5110/tgodummyspa',
          target: env.VITE_TMONEY1_AXIOS_BASE_URL,
          changeOrigin: true,
          ws: true,
          // rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
          // only https
          secure: false
        },
        '/api/mlgRfnd': {
          // target: 'http://localhost:5110/tgodummyspa',
          target: env.VITE_TMONEY1_AXIOS_BASE_URL,
          changeOrigin: true,
          ws: true,
          // rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
          // only https
          secure: false
        },
        '/api/inqrMbrsPymMnsInf': {
          target: env.VITE_TMONEY1_AXIOS_BASE_URL,
          changeOrigin: true,
          ws: true,
          // rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
          // only https
          secure: false
        },
        // 기차/항공/렌터카 이용내역,결제내역 URL start
        // 정규표현식으로 대체
        '^/api/[^/]+/rsrv': {
          target: env.VITE_MOBILITY_AXIOS_BASE_URL,
          changeOrigin: true,
          ws: true,
          secure: false
        },
        '^/api/[^/]+/cent': {
          target: env.VITE_MOBILITY_AXIOS_BASE_URL,
          changeOrigin: true,
          ws: true,
          secure: false
        },
        // 기차/항공/렌터카 이용내역,결제내역 URL end
        '/ondataxi': {
          // target: 'http://localhost:5110/tgodummyspa',
          target: env.VITE_ONDATAXI_AXIOS_BASE_URL,
          changeOrigin: true,
          ws: true,
          // rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
          // only https
          secure: false
        },
        '/api': {
          // target: 'http://localhost:5110/tgodummyspa',
          target: env.VITE_TMONEY2_AXIOS_BASE_URL,
          changeOrigin: true,
          ws: true,
          // rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
          // only https
          secure: false
        },
        '/webview': {
          target: env.VITE_TMONEY2_AXIOS_BASE_URL,
          changeOrigin: true,
          ws: true,
          secure: false
        },
        '/tgodummyspa': {
          target: 'http://localhost:5110',
          changeOrigin: true,
          ws: true,
          secure: false
        },
        '/resource': {
          target: env.VITE_TMONEY2_AXIOS_BASE_URL,
          changeOrigin: true,
          ws: true,
          secure: false
        }
      }
    },
    base: process.env.WEB_BASE || '/'
  })
} ;
