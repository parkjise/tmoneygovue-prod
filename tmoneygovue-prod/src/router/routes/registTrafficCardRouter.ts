const RegistTrafficCardMain = () =>
  import(/* webpackChunkName: "group-regist-traffic-card" */ '@/views/regist-traffic-card/asis/RegistTrafficCardMain.vue');
const RegistTmoneyCard = () =>
  import(/* webpackChunkName: "group-regist-traffic-card" */ '@/views/regist-traffic-card/asis/RegistTrafficTmoneyCard.vue');
const TRegistTmoneyCard = () =>
  import(/* webpackChunkName: "group-regist-traffic-card" */ '@/views/regist-traffic-card/RegistTrafficTmoneyCard.vue');
const RegistCreditCard = () =>
  import(/* webpackChunkName: "group-regist-traffic-card" */ '@/views/regist-traffic-card/asis/RegistTrafficCreditCard.vue');
const RegisteredCreditCardList = () =>
  import(
    /* webpackChunkName: "group-regist-traffic-card" */ '@/views/regist-traffic-card/asis/RegisteredCreditCardList.vue'
  );
export default {
  path: '/regist-traffic-card',
  // TODO 부모 레이아웃 추가
  redirect: '/regist-traffic-card/regist-traffic-card-main',

  children: [
    {
      path: '/tobe/regist-traffic-card/regist-traffic-card-main',
      component: TRegistTmoneyCard,
      meta: {
        title: 'tobeRegistTrafficCardMain'
      }
    },
    {
      path: '/regist-traffic-card/regist-traffic-card-main',
      component: RegistTrafficCardMain,
      meta: {
        title: 'registTrafficCardMain'
      }
    },
    {
      path: '/regist-traffic-card/regist-traffic-tmoney-card',
      component: RegistTmoneyCard,
      meta: {
        title: 'registTmoneyCard'
      }
    },
    {
      path: '/regist-traffic-card/regist-traffic-credit-card',
      component: RegistCreditCard,
      meta: {
        title: 'registCreditCard'
      }
    },
    {
      path: '/regist-traffic-card/registered-credit-card-list',
      component: RegisteredCreditCardList,
      meta: {
        title: 'registeredCreditCardList'
      }
    }
  ]
};
