const MileageHistory = () => import(/* webpackChunkName: "group-mileage" */ '@/views/mileage/MileageHistory.vue');
const MileageExchangeMain = () =>
  import(/* webpackChunkName: "group-mileage" */ '@/views/mileage/MileageExchangeMain.vue');
const MileageExchange = () => import(/* webpackChunkName: "group-mileage" */ '@/views/mileage/MileageExchange.vue');

export default {
  path: '/mileage',
  redirect: '/mileage/mileage-history',

  children: [
    {
      path: '/mileage/mileage-history',
      component: MileageHistory,
      meta: {
        title: 'mileageHistory'
      }
    },
    {
      path: '/mileage/mileage-exchange-main',
      component: MileageExchangeMain,
      meta: {
        title: 'mileageExchangeMain'
      }
    },
    {
      path: '/mileage/mileage-exchange',
      component: MileageExchange,
      meta: {
        title: 'mileageExchange'
      }
    }
  ]
};
