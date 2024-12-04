const MemberInfo = () => import(/* webpackChunkName: "group-member" */ '@/views/member/MemberStat.vue');
const WithdrawMembership = () => import(/* webpackChunkName: "group-member" */ '@/views/member/CancelMembership.vue');
const CheckDriverLicense = () => import(/* webpackChunkName: "group-member" */ '@/views/member/CheckDriverLicense.vue');
const DdareongMemberInfoChangeEmail = () =>
  import(/* webpackChunkName: "group-member" */ '@/views/member/DdareongMemberInfoChangeEmail.vue');
const DdareongMemberInfoChangePW = () =>
  import(/* webpackChunkName: "group-member" */ '@/views/member/DdareongMemberInfoChangePW.vue');
const DdareongMemberInfoChangeWeight = () =>
  import(/* webpackChunkName: "group-member" */ '@/views/member/DdareongMemberInfoChangeWeight.vue');
const DdareongChangeParentPhoneNumber = () =>
  import(/* webpackChunkName: "group-member" */ '@/views/member/DdareongChangeParentPhoneNumber.vue');
export default {
  path: '/member',
  redirect: '/member/member-info',

  children: [
    {
      path: '/member/member-info',
      component: MemberInfo,
      meta: {
        title: '회원정보'
      }
    },
    {
      path: '/member/withdraw-membership',
      component: WithdrawMembership,
      meta: {
        title: '탇퇴하기'
      }
    },
    {
      path: '/member/check-driver-license',
      component: CheckDriverLicense,
      meta: {
        title: '운전면허 등록'
      }
    },
    {
      path: '/member/change-email',
      component: DdareongMemberInfoChangeEmail,
      meta: {
        title: '따릉이 이메일 변경'
      }
    },
    {
      path: '/member/change-pw',
      component: DdareongMemberInfoChangePW,
      meta: {
        title: '따릉이 비밀번호 변경'
      }
    },
    {
      path: '/member/change-weight',
      component: DdareongMemberInfoChangeWeight,
      meta: {
        title: '따릉이 체중 변경'
      }
    },
    {
      path: '/member/change-parent-phone-number',
      component: DdareongChangeParentPhoneNumber,
      meta: {
        title: '따릉이 보호자 휴대전화 변경'
      }
    }
  ]
};
