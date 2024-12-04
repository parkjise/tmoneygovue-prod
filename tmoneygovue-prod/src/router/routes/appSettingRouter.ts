const Setting = () => import(/* webpackChunkName: "group-app-setting" */ '@/views/app-setting/Setting.vue');
const LegalNoticeAndInfoProvider = () =>
  import(/* webpackChunkName: "group-app-setting" */ '@/views/app-setting/LegalNoticeAndInfoProvider.vue');
const BusinessInfo = () => import(/* webpackChunkName: "group-app-setting" */ '@/views/app-setting/BusinessInfo.vue');
const OpenSourceLicense = () =>
  import(/* webpackChunkName: "group-app-setting" */ '@/views/app-setting/OpenSourceLicense.vue');
const TermsAndPolicies = () =>
  import(/* webpackChunkName: "group-app-setting" */ '@/views/app-setting/TermsAndPolicies.vue');
const CarrierAgreement = () =>
  import(/* webpackChunkName: "group-app-setting" */ '@/views/app-setting/CarrierAgreement.vue');
export default {
  path: '/app-setting',
  redirect: '/app-setting/setting',

  children: [
    {
      path: '/app-setting/setting',
      component: Setting,
      meta: {
        title: '설정',
        isIgnoreAuth: true
      }
    },
    {
      path: '/app-setting/open-source-license',
      component: OpenSourceLicense,
      meta: {
        title: '오픈소스 라인선스',
        isIgnoreAuth: true
      }
    },
    {
      path: '/app-setting/legal-notice-and-info-provider',
      component: LegalNoticeAndInfoProvider,
      meta: {
        title: '법적 공지/정보 제공처',
        isIgnoreAuth: true
      }
    },
    {
      path: '/app-setting/business-info',
      component: BusinessInfo,
      meta: {
        title: '사업자 정보',
        isIgnoreAuth: true
      }
    },
    {
      path: '/app-setting/terms-and-policies',
      component: TermsAndPolicies,
      meta: {
        title: '약관 및 정책',
        isIgnoreAuth: true
      }
    },
    {
      path: '/app-setting/terms-and-policies/carrier-agreement',
      component: CarrierAgreement,
      meta: {
        title: '운송약관',
        isIgnoreAuth: true
      }
    }
  ]
};
