import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "tmoneyGO SPA guide",
  description: "티머니고 SPA 가이드",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Bridge', link: '/bridge/web-to-native-bridge' }
    ],

    sidebar: [
      {
        text: 'web-to-native-bridge',
        items: [
          { text: '인증', link: '/bridge/web-to-native/auth-web-to-native' },
          { text: '결제', link: '/bridge/web-to-native/payment-web-to-native' },
          { text: '여행', link: '/bridge/web-to-native/travel-web-to-native' },
          { text: '기타', link: '/bridge/web-to-native/etc-web-to-native' },
        ]
      },
      {
        text: 'native-to-web-bridge',
        items: [
          { text: '기타', link: '/bridge/native-to-web/etc-native-to-web' },
        ]
      },
      {
        text: '프로세스',
        items: [
          { text: '결제', link: '/process/payment-process' },
          { text: '공통API', link: '/process/api-process' },
          { text: '페이지이동', link: '/process/page-move-process' },
          { text: '결제브릿지처리현황', link: '/process/payment-bridge-process' },
        ]
      },
      {
        text: 'composable',
        items: [
          { text: 'useMessageModal', link: '/composable/use-message-modal' },
        ]
      }
    ],

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  },
  base: process.env.DOCS_BASE || '',
})
