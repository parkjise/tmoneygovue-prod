import type { LocationQueryValue, Router } from 'vue-router';
import { isDomainWebLink, transformLink } from '@/utils/linkUtils';
import { getAppBridge } from '@/utils';
import { useCommonStore } from '@/service/common/commonModule';
import { useAuthStore } from '@/service/auth/authModule';
import { isMobileApp, isProduction } from '@/utils/is';
import { useMessageModal } from '@/composables/useMessageModal';
import { checkAppVersion } from '@/utils/validateUtil';

/* router settring
  router 이동전 체크 or 처리해야될것들을 setup
*/
export function setupRouterGuard(router: Router): void {
  createLinkGuard(router); // 딥링크 처리
  createUiGuard(router); // 공통 UI 처리
  createAuthGuard(router); // 로그인 권한 체크
}

// 사용자의 로그인여부에 따른 처리.(ex. 로그인필요메뉴 로그인여부 체크)
export function createAuthGuard(router: Router): void {
  const { createConfirmModalByFunction } = useMessageModal();

  router.beforeEach(async (to, from, next) => {
    if (to.path.indexOf('/common/system-work') > -1) {
      next();
      return;
    } else {
      // 1. 비정상 접근 체크
      // 운영환경에서 모바일앱이 아닌경우 비정상 접근 처리
      if (isProduction() && !isMobileApp()) {
        // 비정상 접근 페이지로 이동
        if (to.path.indexOf('/common/abnormal-access-error') !== -1) {
          next();
          return;
        }
        next('/common/abnormal-access-error');
        return;
      }

      // 2. 인증 필요 화면 체크(로그인이 안되어 있으면 로그인 화면으로 이동)
      // 로그인이 필요없는 화면 체크
      if (to.meta.isIgnoreAuth) {
        next();
        return;
      }

      // 3. 로그인 체크
      const authStore = useAuthStore();
      const isLogin = authStore.getIsLogin;
      if (!isLogin) {
        // 회원 로그인 이동 확인 modal
        createConfirmModalByFunction(
          '회원 로그인',
          '티머니GO 회원 전용 서비스입니다. <br>로그인하시겠습니까?',
          loginConfirmCallback,
          '네',
          true,
          () => {},
          '아니요'
        );
        next(false);
        return;
      }

      // 버전 정보 획득
      const currVer = authStore.getAuthInfo?.appVer;
      const minVersion = '2.4.5'; 
      const tobeArr = ['/payment/payment-manage', '/travel/payment']

      const checkVersion = checkAppVersion(minVersion, currVer);
      if(checkVersion) { // 2.4.5 버전 이상이라면 tobe 추가 
        // path 체크 
        if (to.path.includes('/payment/payment-manage') 
          || to.path.includes('/regist-traffic-card/regist-traffic-card-main') 
          || (to.path.includes('/travel/payment') && to.path != '/travel/payment-coupon')
        ) {
          // 이미 /tobe가 path에 포함되어 있지 않다면 추가
          if (!to.path.startsWith('/tobe')) {
            const newPath = `/tobe${to.path}`;
            return next({ path: newPath }); // 새로운 경로로 리다이렉트
          }
        }
      }

      next();
    }
    
  });

  // 로그인 브릿지 호출
  const loginConfirmCallback = async () => {
    const minVersion = '2.4.5'; // 앱 최소버전
    const currVer = useAuthStore().getAuthInfo.appVer;
    const checkVersion = checkAppVersion(minVersion, currVer);
    if(checkVersion) { // 2.4.5 버전 이상이라면 로그인페이지로 이동
      router.push({path:'/verification'});
    }else{ // 아니라면 pass 호출
      const appBridge = await getAppBridge();
      await appBridge.callIdentityVerify({
        verifyType: 0
      });
    }
  };
}

/**
 * description: 딥링크 및 웹뷰 링크 처리
 * 1. 딥링크 -> SPA 전환 대상인지 확인
 * 2. 인앱 웹뷰 링크 -> SPA 전환 대상인지 확인
 * 3. 1,2번에 해당되면 SPA로 router 이동
 * 4. 1,2번에 해당하지 않는데 딥링크 or 인앱웹뷰이면 openView 브릿지 호출
 * 5. 예외처리. http로 시작하는 url은 openView 브릿지 호출
 * 5. 그외는 spa 이동. router next()
 * @param router
 */
export let scrollY: number;
export let mainScrollY: number;
export function createLinkGuard(router: Router): void {
  router.beforeEach(async (to, from, next) => {
    to.path = decodeURIComponent(to.path);

    const commonStore = useCommonStore();
    const resLinkInfo = transformLink(to.path);
    
    

    // 이벤트(jsp)에서 친구초대 화면 진입 시 매핑된 딥링크가 없어서 이벤트상세 딥링크로 대체
    // url체크 후 친구초대 화면으로 이동
    if (resLinkInfo.url.includes('/event/event-detail?invite')) {
      resLinkInfo.url = '/invite/friend';
      next(resLinkInfo.url);
      return;
    }

    // SPA URL로 맵핑 이동. SPA에 정의된 URL 인 경우. SPA Router 처리
    if (resLinkInfo.isTransTargetLink && resLinkInfo.isMappingLink) {
      commonStore.setIsCallMoveWebView(false);
      next(resLinkInfo.url);
      return;
    }

    // 인앱 웹뷰 브릿지 호출. SPA에 정의된 URL이 아닌경우. openView 브릿지 호출
    const isCallMoveWebView = commonStore.getIsCallMoveWebView;
    if (resLinkInfo.isTransTargetLink && !resLinkInfo.isMappingLink) {
      const headerTitle: string | null = commonStore.getRouterHeaderTitle;

      // moveWebView 브릿지로 호출된 경우, spa에 정의된 URL이 아닌경우 오류 페이지로 이동함
      if (isCallMoveWebView) {
        commonStore.setIsCallMoveWebView(false);
        next('/common/abnormal-access-error');
        return;
      }
      commonStore.setIsCallMoveWebView(false);
      openViewBridge(resLinkInfo.url, headerTitle, null);
      commonStore.setRouterHeaderTitle(null);
      next(false);
      return;
    }

    // 예외 처리. http로 시작하는 web url은 브릿지 호출
    if (isDomainWebLink(resLinkInfo.url)) {
      const headerTitle: string | null = commonStore.getRouterHeaderTitle;
      const queryViewType = to.query.viewType ? to.query.viewType : null;

      openViewBridge(to.path, headerTitle, queryViewType);
      next(false);
      return;
    }

    // 예외 처리. move to webview 브릿지 호출되고 spa url로 호출된 경우 IsCallMoveWebView false 처리. 비정상 딥링크를 받았을떄 오류페이지로 이동 처리를 위함
    const isFirstMoveWebViewRoute = to.path.indexOf('/common/first-move-web-view') !== -1;
    if (isFirstMoveWebViewRoute && isCallMoveWebView) {
      commonStore.setIsCallMoveWebView(false);
      next();
      return;
    }

    // SPA 이동
    next();
  });

  // 오픈뷰 브릿지 호출
  async function openViewBridge(
    link: string,
    headerTitle: string | null,
    queryViewType: string | LocationQueryValue[] | null
  ) {
    const appBridge = await getAppBridge();
    let viewType = 'deeplink'; // 딥링크

    if (/https?:\/\//.test(link)) {
      if (queryViewType) {
        viewType = queryViewType.toString();
      } else {
        viewType = 'in'; // 인웹뷰
      }
    }

    // tmoneytia://web?in=, tmoneytia://web?ex= 의 경우는 url만 추출하고 viewType을 in, ex로 변경
    if (link.includes('web?in=')) {
      link = link.split('web?in=')[1];
      viewType = 'in';
    } else if (link.includes('web?ex=')) {
      link = link.split('web?ex=')[1];
      viewType = 'ex';
    }

    link = link.replace(/.*(?=http:\/\/)/, '');
    link = link.replace(/.*(?=https:\/\/)/, '');
    link = link.replace(/.*(?=tmoneytia:\/\/)/, '');
    link = decodeURIComponent(link);
    // 오픈뷰 브릿지 호출
    await appBridge.openView({ url: link, viewType: viewType, headerTitle: headerTitle });
  }
}

/**
 * 공통 UI 처리
 * @param router
 */
export function createUiGuard(router: Router): void {
  router.beforeEach(async (to, from, next) => {
    const commonStore = useCommonStore();
    const isShowedMainTabbar = commonStore.getIsShowedMainTabbar;
    const isMainRoute = to.path.indexOf('/main/') !== -1;
    const appBridge = await getAppBridge();

    // 화면 이동시 화면에 의한 사이즈 고정 class 제거
    document.documentElement.classList.remove('modal_open');
    document.body.classList.remove('modal_open');

    // 메인탭바 노출처리
    if (isShowedMainTabbar !== isMainRoute) {
      await appBridge.showTabbar({ isShow: isMainRoute });
      commonStore.setIsShowedMainTabbar(isMainRoute);
    }

    /* 첫번째 웹뷰 이동시 웹뷰 닫기
     *  moveWebView 브릿지로 호출된 화면의 경우 첫번째 웹뷰 이동시 웹뷰를 닫아야함
     */
    const isFirstMoveWebViewRoute = to.path.indexOf('/common/first-move-web-view') !== -1;
    if (isFirstMoveWebViewRoute) {
      const isFirstRouteMoveWebView = commonStore.getIsFirstRouteMoveWebView;
      if (isFirstRouteMoveWebView) {
        commonStore.setIsFirstRouteMoveWebView(false);
      } else {
        // 웹뷰 닫기 브릿지 호출
        await appBridge.closeWebView();
        next(false);
        return;
      }
    }

    // 스크롤 유지를 위한 window.scrollY 계산
    if (from.path == '/event/event-list') {
      scrollY = window.scrollY;
    } else if (from.path == '/customer-support/main') {
      scrollY = window.scrollY;
    }
    next();
  });
}
