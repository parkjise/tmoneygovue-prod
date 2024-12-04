const ScreenLock = () => import(/* webpackChunkName: "group-sample" */ '@/views/sample/ScreenLock.vue');
const LoginPage = () => import(/* webpackChunkName: "group-sample" */ '@/views/sample/LoginPage.vue');
const PostCssTest = () => import(/* webpackChunkName: "group-sample" */ '@/views/sample/PostCssTest.vue');

export default {
  path: '/temp',
  redirect: '/temp/screen-lock',

  children: [
    {
      path: '/temp/screen-lock',
      component: ScreenLock,
      meta: {
        title: 'ScreenLock',
        isIgnoreAuth: true
      }
    },
    {
      path: '/temp/login-page',
      component: LoginPage,
      meta: {
        title: 'LoginPage',
        isIgnoreAuth: true
      }
    },
    {
      path: '/temp/post-css-test',
      component: PostCssTest,
      meta: {
        title: 'postCssTest',
        isIgnoreAuth: true
      }
    }
  ]
};
