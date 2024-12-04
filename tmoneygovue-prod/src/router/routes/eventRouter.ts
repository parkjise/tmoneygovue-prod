const EventList = () => import(/* webpackChunkName: "group-event" */ '@/views/event/EventList.vue');
const EventDetail = () => import(/* webpackChunkName: "group-event" */ '@/views/event/EventDetail.vue');

export default {
  path: '/event',
  // TODO 부모 레이아웃 추가
  redirect: '/event/event-list',

  children: [
    {
      name: '/event/event-list',
      path: '/event/event-list',
      component: EventList,
      meta: {
        title: 'eventList',
        isIgnoreAuth: true
      }
    },
    {
      name: '/event/event-detail',
      path: '/event/event-detail',
      component: EventDetail,
      meta: {
        title: 'eventDetail',
        isIgnoreAuth: true
      },
      props: true
    }
  ]
};
