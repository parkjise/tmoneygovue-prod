import JoinSuccess from '@/views/verification/JoinSuccess.vue';
import MyInfo from '@/views/verification/MyInfo.vue';
import ParentsVerification from '@/views/verification/ParentsVerification.vue';
import VerificationFail from '@/views/verification/VerificationFail.vue';

const VerificationList = () =>
  import(/* webpackChunkName: "group-verification" */ '@/views/verification/VerificationList.vue');
const TossVerification = () => 
  import(/* webpackChunkName: "group-verification" */ '@/views/verification/TossVerification.vue');
const TossLogin = () => 
  import(/* webpackChunkName: "group-verification" */ '@/views/verification/TossLogin.vue');
const KakaoVerification = () => 
  import(/* webpackChunkName: "group-verification" */ '@/views/verification/KakaoVerification.vue');
const AcceptTerms = () => 
  import(/* webpackChunkName: "group-verification" */ '@/views/verification/AcceptTerms.vue');

export default {
  path: '/verification',
  redirect: '/verification',
  children: [
    {
      path: '/verification',
      component: VerificationList,
      meta: {
        title: '본인인증',
        isIgnoreAuth: true
      }
    },
    {
      path: '/verification/toss-login',
      component: TossLogin,
      meta: {
        title: '토스인증로그인',
        isIgnoreAuth: true
      }
    },
    {
      path: '/verification/toss',
      component: TossVerification,
      meta: {
        title: '토스인증',
        isIgnoreAuth: true
      }
    },
    {
      path: '/verification/kakao',
      component: KakaoVerification,
      meta: {
        title: '카카오인증',
        isIgnoreAuth: true
      }
    },
    {
      path: '/verification/terms',
      component: AcceptTerms,
      meta: {
        title: '약관동의',
        isIgnoreAuth: true
      }
    },
    {
      path: '/verification/my',
      component: MyInfo,
      meta: {
        title: '회원정보확인',
        isIgnoreAuth: true
      }
    },
    {
      path: '/verification/parents',
      component: ParentsVerification,
      meta: {
        title: '보호자본인인증',
        isIgnoreAuth: true
      }
    },
    {
      path: '/verification/success',
      component: JoinSuccess,
      meta: {
        title: '회원가입완료',
        isIgnoreAuth: true
      }
    },
    {
      path: '/verification/fail',
      component: VerificationFail,
      meta: {
        title: '본인인증실패',
        isIgnoreAuth: true
      }
    }
  ]
};
