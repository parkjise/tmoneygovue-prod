import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import sample from '@/router/routes/sample';
import usageHistoryRouter from '@/router/routes/usageHistoryRouter';
import mainRouter from '@/router/routes/mainRouter';
import transferRouter from '@/router/routes/transferRouter';
import mileageRouter from '@/router/routes/mileageRouter';
import noticeRouter from '@/router/routes/noticeRouter';
import eventRouter from '@/router/routes/eventRouter';
import registTrafficCardRouter from '@/router/routes/registTrafficCardRouter';
import travelRouter from '@/router/routes/travelRouter';
import memberRouter from '@/router/routes/memberRouter';
import customerSupportRouter from '@/router/routes/customerSupportRouter';
import notificationRouter from '@/router/routes/notificationRouter';
import paymentRouter from '@/router/routes/paymentRouter';
import termsRouter from '@/router/routes/termsRouter';
import appSettingRouter from '@/router/routes/appSettingRouter';
import couponRouter from '@/router/routes/couponRouter';
import commonRouter from '@/router/routes/commonRouter';
import tempRouter from '@/router/routes/tempRouter';
import inviteFriendRouter from './routes/inviteFriendRouter';
import verificationRouter from '@/router/routes/verificationRouter';

import { setupRouterGuard, scrollY } from './guardConfig';

const NotfoundError = () => import('@/views/common/NotFoundError.vue');

const routes: Array<RouteRecordRaw> = [
  sample,
  mainRouter,
  transferRouter,
  mileageRouter,
  noticeRouter,
  eventRouter,
  registTrafficCardRouter,
  travelRouter,
  couponRouter,
  usageHistoryRouter,
  paymentRouter,
  memberRouter,
  customerSupportRouter,
  termsRouter,
  appSettingRouter,
  notificationRouter,
  commonRouter,
  tempRouter,
  inviteFriendRouter,
  verificationRouter,
  {
    path: '/',
    redirect: '/main/',
    meta: {
      title: 'Main'
    }
  },
  {
    path: '/:pathMatch(.*)*', // 404 Not Found
    component: NotfoundError,
    meta: {
      title: 'NotFoundError',
      isIgnoreAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    const toQuery = new URL(window.location.origin + to.fullPath).search;
    const fromQuery = new URL(window.location.origin + from.fullPath).search;
    if (to.path === '/event/event-detail') {
      // 이벤트 상세에서 또 상세로 들어가는 경우
      //const url = new URL(window.location.origin + to.fullPath);
      if (toQuery != fromQuery) {
        //queryParam.value = url.search;
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(window.scrollTo({ top: savedPosition?.top }));
          }, 200);
          return;
        });
      }
    }

    //화면 이동시 스크롤 전환.
    let topPosition;

    if (to.path.split('/')[1] === 'main' || to.path.split('/')[1] === 'usage-history') {
      //메인화면에서는 상단으로 이동X
      topPosition = savedPosition?.top;
    } else if (savedPosition?.top != undefined && scrollY != undefined) {
      topPosition = scrollY;
    } else {
      topPosition = savedPosition?.top || 0;
    }

    window.scrollTo({ top: topPosition });
  }
});
// 라우터 가드(router before/after) setup
setupRouterGuard(router);

export default router;
