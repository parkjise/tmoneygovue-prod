const Intro = () => import(/* webpackChunkName: "group-travel" */ '@/views/travel/intro/IntroPage.vue');
const Search = () => import(/* webpackChunkName: "group-travel" */ '@/views/travel/search/TrvlSearchPage.vue');
const Exhibition = () =>
  import(/* webpackChunkName: "group-travel" */ '@/views/travel/exhibition/ExhibitionListPage.vue');
const ExhibitionDtl = () =>
  import(/* webpackChunkName: "group-travel" */ '@/views/travel/exhibition/ExhibitionDtlPage.vue');
const Product = () => import(/* webpackChunkName: "group-travel" */ '@/views/travel/product/ProductListPage.vue');
const Detail = () => import(/* webpackChunkName: "group-travel" */ '@/views/travel/product/ProductDetailPage.vue');
const Departure = () =>
  import(/* webpackChunkName: "group-travel" */ '@/views/travel/reservation/SelectDeparturePage.vue');
const Info = () => import(/* webpackChunkName: "group-travel" */ '@/views/travel/reservation/PassengerInfoPage.vue');
const Payment = () => import(/* webpackChunkName: "group-travel" */ '@/views/travel/payment/asis/TrvlPaymentPage.vue');
const TPayment = () => import(/* webpackChunkName: "group-travel" */ '@/views/travel/payment/TrvlPaymentPage.vue');
const PaymentCoupon = () =>
  import(/* webpackChunkName: "group-travel" */ '@/views/travel/payment/TrvlPaymentCouponPage.vue');

export default {
  path: '/travel',
  redirect: '/travel/main',
  children: [
    {
      path: '/travel/main',
      name: 'travel-main',
      component: Intro,
      meta: {
        title: '여행상품 인트로',
        isIgnoreAuth: true
      }
    },
    {
      path: '/travel/search',
      name: 'travel-search',
      component: Search,
      meta: {
        title: '여행상품 검색',
        isIgnoreAuth: true
      }
    },
    {
      path: '/travel/exhibition',
      name: 'exhibition',
      component: Exhibition,
      meta: {
        title: '기획전',
        isIgnoreAuth: true
      }
    },
    {
      path: '/travel/exhibition/detail',
      name: 'exhibition-detail',
      component: ExhibitionDtl,
      meta: {
        title: '기획전 상세',
        isIgnoreAuth: true
      }
    },
    {
      path: '/travel/product',
      name: 'travel-product',
      component: Product,
      meta: {
        title: '상품목록',
        isIgnoreAuth: true
      }
    },
    {
      path: '/travel/product/detail',
      name: 'product-detail',
      component: Detail,
      meta: {
        title: '상품상세',
        isIgnoreAuth: true
      }
    },
    {
      path: '/travel/reservation/departure',
      name: 'reservation-departure',
      component: Departure,
      meta: {
        title: '출발지 선택'
      }
    },
    {
      path: '/travel/reservation/info',
      name: 'reservation-info',
      component: Info,
      meta: {
        title: '정보입력'
      }
    },
    {
      path: '/travel/payment',
      component: Payment,
      meta: {
        title: '여행 결제하기'
      }
    },
    {
      path: '/tobe/travel/payment',
      component: TPayment,
      meta: {
        title: '여행 결제하기TOBE'
      }
    },
    {
      path: '/travel/payment-coupon',
      component: PaymentCoupon,
      meta: {
        title: '여행 결제하기 쿠폰'
      }
    }
  ]
};
