const NoticeList = () => import(/* webpackChunkName: "group-notice" */ '@/views/notice/NoticeList.vue');
const NoticeDetail = () => import(/* webpackChunkName: "group-notice" */ '@/views/notice/NoticeDetail.vue');

export default {
  path: '/notice',
  redirect: '/notice/notice-list',

  children: [
    {
      path: '/notice/notice-detail',
      component: NoticeDetail,
      meta: {
        title: 'noticeDetail',
        isIgnoreAuth: true
      }
    },
    {
      name: '/notice/notice-list',
      path: '/notice/notice-list',
      component: NoticeList,
      meta: {
        title: 'noticeList',
        isIgnoreAuth: true
      }
    }
  ]
};
