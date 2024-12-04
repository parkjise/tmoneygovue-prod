const MoreMain = () => import(/* webpackChunkName: "group-main" */ '@/views/main/MoreMain.vue');
const MyMain = () => import(/* webpackChunkName: "group-main" */ '@/views/main/MyMain.vue');
const BenefitMain = () => import(/* webpackChunkName: "group-main" */ '@/views/main/BenefitMain.vue');
const MainContainer = () => import(/* webpackChunkName: "group-main" */ '@/layouts/MainContainer.vue');
export default {
  path: '/main',
  component: MainContainer,
  redirect: '/main/more-main',

  children: [
    {
      path: '/main/more-main',
      component: MoreMain,
      meta: {
        title: 'moreMain',
        isIgnoreAuth: true
      }
    },
    {
      path: '/main/my-main',
      component: MyMain,
      meta: {
        title: 'myMain',
        isIgnoreAuth: true
      }
    },
    {
      path: '/main/benefit-main',
      component: BenefitMain,
      meta: {
        title: 'benefitMain',
        isIgnoreAuth: true
      }
    }
  ]
};
