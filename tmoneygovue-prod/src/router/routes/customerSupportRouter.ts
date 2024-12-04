const CustomerSupport = () =>
  import(/* webpackChunkName: "group-customer-support" */ '@/views/customer-support/CustomerSupport.vue');
const UserGuide = () =>
  import(/* webpackChunkName: "group-customer-support" */ '@/views/customer-support/UserGuide.vue');
const Complain = () => import(/* webpackChunkName: "group-customer-support" */ '@/views/customer-support/Complain.vue');
const ComplainDetail = () =>
  import(/* webpackChunkName: "group-customer-support" */ '@/views/customer-support/ComplainDetail.vue');
const FaqCategory = () =>
  import(/* webpackChunkName: "group-customer-support" */ '@/views/customer-support/FaqCategory.vue');
const FaqList = () => import(/* webpackChunkName: "group-customer-support" */ '@/views/customer-support/FaqList.vue');
const BikeReportDisability = () =>
  import(/* webpackChunkName: "group-customer-support" */ '@/views/customer-support/ReportDisabilityBike.vue');
const BikeUseGuide = () =>
  import(/* webpackChunkName: "group-customer-support" */ '@/views/customer-support/BikeUseGuide.vue');
const BikeFeeGuide = () =>
  import(/* webpackChunkName: "group-customer-support" */ '@/views/customer-support/BikeFeeGuide.vue');
const BikeInsuranceGuide = () =>
  import(/* webpackChunkName: "group-customer-support" */ '@/views/customer-support/BikeInsuranceGuide.vue');
const KickboardUseGuide = () =>
  import(/* webpackChunkName: "group-customer-support" */ '@/views/customer-support/KickboardUseGuide.vue');
const ReportDisabilityKickboard = () =>
  import(/* webpackChunkName: "group-customer-support" */ '@/views/customer-support/ReportDisabilityKickboard.vue');
const KickboardInsuranceGuide = () =>
  import(/* webpackChunkName: "group-customer-support" */ '@/views/customer-support/KickboardInsuranceGuide.vue');
const CarRentGuide = () =>
  import(/* webpackChunkName: "group-customer-support" */ '@/views/customer-support/CarRentGuide.vue');
const EBikeUseGuide = () =>
  import(/* webpackChunkName: "group-customer-support" */ '@/views/customer-support/EBikeUseGuide.vue');
const KickboardAndEBikeFeeGuide = () =>
  import(/* webpackChunkName: "group-customer-support" */ '@/views/customer-support/KickboardAndEBikeFeeGuide.vue');
export default {
  path: '/customer-support',
  redirect: '/customer-support/main',

  children: [
    {
      path: '/customer-support/main',
      component: CustomerSupport,
      meta: {
        title: '고객지원',
        isIgnoreAuth: true
      }
    },
    {
      path: '/customer-support/user-guide',
      component: UserGuide,
      meta: {
        title: '티머니GO 이용가이드',
        isIgnoreAuth: true
      }
    },
    {
      path: '/customer-support/complain',
      component: Complain,
      meta: {
        title: '1:1 문의'
      }
    },
    {
      path: '/customer-support/complain-detail',
      component: ComplainDetail,
      meta: {
        title: '1:1 문의 상세'
      }
    },
    {
      path: '/customer-support/faq',
      component: FaqCategory,
      meta: {
        title: '자주하는 질문',
        isIgnoreAuth: true
      }
    },
    {
      path: '/customer-support/faq-list',
      component: FaqList,
      meta: {
        title: '자주하는 질문',
        isIgnoreAuth: true
      }
    },
    {
      path: '/customer-support/report-disability-bike',
      component: BikeReportDisability,
      meta: {
        title: '공공자전거 고장/장애 신고'
      }
    },
    {
      path: '/customer-support/bike-use-guide',
      component: BikeUseGuide,
      meta: {
        title: '공공자전거 이용 안내',
        isIgnoreAuth: true
      }
    },
    {
      path: '/customer-support/bike-fee-guide',
      component: BikeFeeGuide,
      meta: {
        title: '공공자전거 이용요금 안내',
        isIgnoreAuth: true
      }
    },
    {
      path: '/customer-support/bike-insurance-guide',
      component: BikeInsuranceGuide,
      meta: {
        title: '공공자전거 보험안내',
        isIgnoreAuth: true
      }
    },
    {
      path: '/customer-support/kickboard-use-guide',
      component: KickboardUseGuide,
      meta: {
        title: '킥보드 이용 안내',
        isIgnoreAuth: true
      }
    },
    {
      path: '/customer-support/report-disability-kickboard',
      component: ReportDisabilityKickboard,
      meta: {
        title: '킥보드 고장신고',
        isIgnoreAuth: true
      }
    },
    {
      path: '/customer-support/kickboard-insurance-guide',
      component: KickboardInsuranceGuide,
      meta: {
        title: '킥보드 보험안내',
        isIgnoreAuth: true
      }
    },
    {
      path: '/customer-support/car-rent-guide',
      component: CarRentGuide,
      meta: {
        title: '렌터카 안내',
        isIgnoreAuth: true
      }
    },
    {
      path: '/customer-support/e-bike-use-guide',
      component: EBikeUseGuide,
      meta: {
        title: '전기자전거 이용 안내',
        isIgnoreAuth: true
      }
    },
    {
      path: '/customer-support/kick-board-and-e-bike-fee-guide',
      component: KickboardAndEBikeFeeGuide,
      meta: {
        title: '킥보드/전기자전거 이용요금 안내',
        isIgnoreAuth: true
      }
    }
  ]
};
