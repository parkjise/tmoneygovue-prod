const NotificationList = () =>
  import(/* webpackChunkName: "group-notification" */ '@/views/notification/NotificationList.vue');

export default {
  path: '/notification',
  redirect: '/notification/notification-list',
  children: [
    {
      path: '/notification/notification-list',
      component: NotificationList,
      meta: {
        title: 'notificationList'
      }
    }
  ]
};
