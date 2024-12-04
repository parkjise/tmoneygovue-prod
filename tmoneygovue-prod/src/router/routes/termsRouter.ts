const TermsTest = () => import(/* webpackChunkName: "group-terms" */ '@/views/terms/TermsTest.vue');
const TermsList = () => import(/* webpackChunkName: "group-terms" */ '@/views/terms/TermsForm.vue');
export default {
  path: '/terms',
  // TODO 부모 레이아웃 추가
  redirect: '/terms/term-list',
  children: [
    {
      path: '/terms/term-list',
      component: TermsList,
      meta: {
        title: '약관동의 화면'
      }
    },
    {
      path: '/terms/term-sample',
      component: TermsTest,
      meta: {
        title: '약관동의 이동 테스트화면'
      }
    }
  ]
};
