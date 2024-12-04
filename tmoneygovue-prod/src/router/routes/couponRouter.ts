const CouponList = () => import(/* webpackChunkName: "group-coupon" */ '@/views/coupon/CouponList.vue');
const PastCouponList = () => import(/* webpackChunkName: "group-coupon" */ '@/views/coupon/PastCouponList.vue');

export default {
  path: '/coupon',
  redirect: '/coupon/coupon-list',
  children: [
    {
      path: '/coupon/coupon-list',
      component: CouponList,
      meta: {
        title: 'couponList'
      }
    },
    {
      path: '/coupon/past-list',
      component: PastCouponList,
      meta: {
        title: 'pastCouponList'
      }
    }
  ]
};
