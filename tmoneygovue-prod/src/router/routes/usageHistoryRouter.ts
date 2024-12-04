const BicycleVoucherHistoryList = () =>
  import(
    /* webpackChunkName: "group-usage-history" */ '@/views/usage-history/public-bicycle/BicycleVoucherHistoryList.vue'
  );
const TravelHistoryDetail = () =>
  import(/* webpackChunkName: "group-usage-history" */ '@/views/usage-history/travel/TravelHistoryDetail.vue');
const TravelCancel = () =>
  import(/* webpackChunkName: "group-usage-history" */ '@/views/usage-history/travel/TravelCancel.vue');
const QrScreenLock = () =>
  import(/* webpackChunkName: "group-usage-history" */ '@/views/usage-history/travel/QrScreenLock.vue');
const UsageHistoryLayout = () =>
  import(/* webpackChunkName: "group-usage-history" */ '@/views/usage-history/UsageHistory.vue');
export default {
  path: '/usage-history',
  redirect: '/usage-history/list',

  children: [
    {
      path: '/usage-history/list',
      component: UsageHistoryLayout,
      meta: {
        title: 'History'
      }
    },
    {
      path: '/usage-history/voucher-list',
      component: BicycleVoucherHistoryList,
      meta: {
        title: 'History'
      }
    },
    {
      path: '/usage-history/travel/travel-detail',
      name: 'travel-history-detail',
      component: TravelHistoryDetail,
      meta: {
        title: '여행 이용내역 상세'
      }
    },
    {
      path: '/usage-history/travel/travel-cancel',
      name: 'travel-cancel',
      component: TravelCancel,
      meta: {
        title: '여행 예매취소'
      }
    },
    {
      path: '/usage-history/travel/screen-lock',
      name: 'screen-lock',
      component: QrScreenLock,
      meta: {
        title: '여행 수동검표'
      }
    }
  ]
};
