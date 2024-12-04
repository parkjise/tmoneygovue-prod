const PaymentManage = () => import(/* webpackChunkName: "group-payment" */ '@/views/payment-mng/asis/PaymentManage.vue');
const TPaymentManage = () => import(/* webpackChunkName: "group-payment" */ '@/views/payment-mng/PaymentManage.vue');

const PaymentHistoryList = () =>
  import(/* webpackChunkName: "group-payment" */ '@/views/payment-history/PaymentHistoryList.vue');
const BikePaymentDetail = () =>
  import(/* webpackChunkName: "group-payment" */ '@/views/payment-history/BikePaymentHistoryDetail.vue');
const RentCarPaymentHistoryDetail = () =>
  import(/* webpackChunkName: "group-payment" */ '@/views/payment-history/RentCarPaymentHistoryDetail.vue');
const CardGeneralPayment = () =>
  import(/* webpackChunkName: "group-payment" */ '@/views/payment/CardGeneralPayment.vue');
const SmpcRegister = () => import(/* webpackChunkName: "group-payment" */ '@/views/payment-mng/SmpcRegister.vue');

export default {
  path: '/payment',
  redirect: '/payment/payment-manage',
  children: [
    {
      path: '/payment/payment-manage',
      component: PaymentManage,
      meta: {
        title: '결제수단 관리'
      }
    },
    {
      path: '/tobe/payment/payment-manage',
      component: TPaymentManage,
      meta: {
        title: '결제수단 관리TOBE'
      }
    },
    {
      path: '/payment/payment-history',
      component: PaymentHistoryList,
      meta: {
        title: '결제내역 목록'
      }
    },
    {
      path: '/payment/bike-detail',
      component: BikePaymentDetail,
      meta: {
        title: '공공자전거 결제내역 상세'
      }
    },
    {
      path: '/payment/rent-detail',
      component: RentCarPaymentHistoryDetail,
      meta: {
        title: '렌터카 결제내역 상세'
      }
    },
    {
      path: '/payment/card-general-payment',
      component: CardGeneralPayment,
      meta: {
        title: '카드일반결제'
      }
    },
    {
      path: '/payment/smpc-card-register',
      component: SmpcRegister,
      meta: {
        title: '카드 등록'
      }
    }
  ]
};
