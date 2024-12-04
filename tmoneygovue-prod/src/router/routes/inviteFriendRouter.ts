const InviteFriend = () => import(/* webpackChunkName: "group-event" */ '@/views/invite-friend/InviteFriendMain.vue');
export default {
  path: '/invite',
  redirect: '/invite/friend',
  children: [
    {
      name: '/invite-friend',
      path: '/invite/friend',
      component: InviteFriend,
      meta: {
        title: '친구초대'
      }
    }
  ]
};
