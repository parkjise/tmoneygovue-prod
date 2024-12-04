const AbnormalAccessError = () => import('@/views/common/AbnormalAccessError.vue');
const InitMoveWebView = () => import('@/views/common/InitMoveWebView.vue');
const MoveView = () => import('@/views/common/MoveView.vue');
const SystemWorkView = () => import('@/views/common/SystemWorkView.vue');

export default {
  path: '/common',
  redirect: '/common/move-view',

  children: [
    {
      path: '/common/move-view', // 화면이동 페이지
      component: MoveView,
      meta: {
        title: 'MoveView',
        isIgnoreAuth: true
      }
    },
    {
      path: '/common/first-move-web-view', // move webview 브릿지 첫 페이지(해당 페이지로 구분해서 뒤로가면 화면을 closeWebView 브릿지로 화면을 닫음)
      component: MoveView,
      meta: {
        title: 'InitMoveWebView',
        isIgnoreAuth: true
      }
    },
    {
      path: '/common/init-move-web-view', // move webview 브릿지 초기화 페이지(해당 화면에서 moveWebView를 초기화하고 브릿지 호출가능할떄 readyForMoveWebView브릿지 호출)
      component: InitMoveWebView,
      meta: {
        title: 'InitMoveWebView',
        isIgnoreAuth: true
      }
    },
    {
      path: '/common/abnormal-access-error', // 비정상 접근 애러 페이지
      component: AbnormalAccessError,
      meta: {
        title: 'AbnormalAccessError',
        isIgnoreAuth: true
      }
    },
    {
      path: '/common/system-work', // 시스템 작업안내 페이지
      component: SystemWorkView,
      meta: {
        title: 'SystemWorkView',
        isIgnoreAuth: true,
        cusTitle: '티머니GO 서비스 점검 안내'
      }
    }
  ]
};
