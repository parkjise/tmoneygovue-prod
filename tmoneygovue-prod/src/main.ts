import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import 'vuetify/styles';
import './assets/scss/style.scss'; // global scss

import { createVuetify } from 'vuetify'; // Vuetify
import { setupI18n } from '@/locales/setupI18n'; // 다국어 처리
import loadComponents from '@/plugins/componentsLoader'; // 컴포넌트 로드
import { setupAuthInfo } from './bootstraps/setupAuthInfo'; // 인증정보 조회

const app = createApp(App);

async function bootstrap() {
  app.use(createPinia());
  app.use(createVuetify());

  await setupI18n(app); // 다국어 처리
  await setupAuthInfo(); // 인증정보 조회

  app.use(router);

  loadComponents(app);

  app.mount('#app');
}
bootstrap();
