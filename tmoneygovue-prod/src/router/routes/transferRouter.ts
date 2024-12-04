const TransferRewardHistory = () =>
  import(/* webpackChunkName: "group-transfer" */ '@/views/transfer/TransferRewardHistory.vue');
const TransferRewardGuide = () =>
  import(/* webpackChunkName: "group-transfer" */ '@/views/transfer/TransferRewardGuide.vue');
const TransferRewardInquiry = () =>
  import(/* webpackChunkName: "group-transfer" */ '@/views/transfer/TransferRewardInquiry.vue');

export default {
  path: '/transfer-reward',
  redirect: '/transfer-reward/transfer-history',

  children: [
    {
      path: '/transfer-reward/transfer-history',
      component: TransferRewardHistory,
      meta: {
        title: 'transferRewardHistory'
      }
    },
    {
      path: '/transfer-reward/transfer-guide',
      component: TransferRewardGuide,
      meta: {
        title: 'transferRewardGuide'
      }
    },
    {
      path: '/transfer-reward/transfer-inquiry',
      component: TransferRewardInquiry,
      meta: {
        title: 'transferRewardInquiry'
      }
    }
  ]
};
