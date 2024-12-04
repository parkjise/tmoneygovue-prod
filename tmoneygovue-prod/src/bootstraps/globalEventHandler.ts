import { getAppBridge } from '@/utils';
import { getActivePinia } from 'pinia';
import router from '@/router';
import { useAuthStore } from '@/service/auth/authModule';
import { useCommonStore } from '@/service/common/commonModule';
import { encodeUriRouterPath, isDeepLink, isInAppWebLink } from '@/utils/linkUtils';
/**
 * @description 웹뷰 뒤로가기 이벤트
 * @returns void
 * native to web 브릿지 backWebView 이벤트 핸들러
 */
export async function backWebView() {
  // 모달이 떠있으면 화면 뒤로가기 막기
  const commonStore = useCommonStore();
  if (!commonStore.isEmptyShowedModals) {
    commonStore.popShowedModal();
    return;
  }

  if (
    '/main/my-main' == router.currentRoute.value.path ||
    '/main/benefit-main' == router.currentRoute.value.path ||
    '/main/more-main' == router.currentRoute.value.path
  ) {
    // APP 종료 브릿지 요청
    const appBridge = await getAppBridge();
    await appBridge.terminateApp();
    return;
  } else if ('/travel/main' == router.currentRoute.value.path) {
    // 여행메인화면에서 뒤로가기시 웹뷰 닫기
    const appBridge = await getAppBridge();
    await appBridge.closeWebView();
    return;
  } else if ('/travel/product/detail' == router.currentRoute.value.path) {
    // 여행상품상세 뒤로가기시 화면에서 체크 후 처리
    document.getElementById('hidden_ipt')?.click();
    return;
  } else if ('/invite/friend' === router.currentRoute.value.path) {
    // 친구초대 화면 뒤로가기 시 처리
    // 1.이벤트(jsp)에서 들어올 경우
    // 2.더보기 화면에서 들어올 경우
    document.getElementById('invite_friend_ipt')?.click();
    return;
  }

  router.back();
}

/**
 * @description 보안키패드 입력 이벤트
 * @returns void
 * native to web 브릿지 inputEncKeypad 이벤트 핸들러
 */
async function handleInputEncKeypad(event: Event) {
  const customEvent = event as CustomEvent;
  const { inputFieldId, inputValue } = customEvent.detail;

  const inputElement = document.getElementById(inputFieldId) as HTMLInputElement;
  if (inputElement) {
    inputElement.value = inputValue;
    inputElement.dispatchEvent(new Event('input'));
  }
}

/**
 * @description 약관화면 호출 이벤트
 * @returns void
 * native to web 브릿지 openTermPage 이벤트 핸들러
 */
function handleopenTermPage(event: Event) {
  if (getActivePinia()) {
    executeopenTermPage(event);
  } else {
    const checkPiniaInterval = setInterval(() => {
      if (getActivePinia()) {
        clearInterval(checkPiniaInterval);
        executeopenTermPage(event);
      }
    }, 100);
  }
}

async function executeopenTermPage(event: Event) {
  const { useTermsStore } = await import('@/service/terms/termsModule');
  const termsStore = useTermsStore();
  const customEvent = event as CustomEvent;
  const param = {
    SvcDvsCd: customEvent.detail.svcDvsCd,
    StplGrpCd: customEvent.detail.stplGrpCd
  };
  
  if(customEvent.detail.linkUrl){
    termsStore.initParam(param, () => openWeb(customEvent.detail.linkUrl));
  }else{
    termsStore.initParam(param, moveTmoneyGo);
  }
  
  //호출하는 페이지 코드
  const page = customEvent.detail.utlzSvcDvsCd;
  router.push({ path: '/verification/terms', query: { code: page }  });
  
}

/**
 * 티머니고 홈으로 이동(웹뷰 닫기)
 */
const moveTmoneyGo = async () => {
  const appBridge = await getAppBridge();
  await appBridge.closeWebView();
};

const openWeb = async (url: string) => {
  const appBridge = await getAppBridge();
  await appBridge.openView({ url: url, viewType: 'deeplink' });
};

/**
 * @description 인증데이터 로드 이벤트
 * @returns void
 * native to web 브릿지 loadAuthInfo 이벤트 핸들러
 */
async function loadAuthInfo() {
  // 인증정보 브릿지 호출
  const authStore = useAuthStore();
  await authStore.getAuthTokenAction();

  // 현재 라우터 재로딩(화면리로드)
  const currentRoute = router.currentRoute.value.fullPath;
  await router.replace('/common/move-view');
  await router.replace(currentRoute);
}
/**
 * @description 웹뷰 이동 이벤트
 * @returns void
 * native to web 브릿지 moveWebView 이벤트 핸들러
 */
async function moveWebView(event: Event) {
  const customEvent = event as CustomEvent;
  const url = customEvent.detail.url;
  const commonStore = useCommonStore();
  commonStore.setIsFirstRouteMoveWebView(true);
  commonStore.setIsCallMoveWebView(true);

  let queryParams = new URLSearchParams();
  if (!isDeepLink(url) && !isInAppWebLink(url)) {
    // URL에서 경로를 추출
    queryParams = new URLSearchParams(new URL(url, window.location.origin).search);
  }

  // 이벤트(jsp)에서 친구초대 화면 진입 시 매핑된 딥링크가 없어서 이벤트상세 딥링크로 대체
  // url체크 후 친구초대 화면으로 이동
  if (url.includes('/event/event-detail?invite')) {
    customEvent.detail.url = '/invite/friend';
  }

  await router.push({ path: '/common/first-move-web-view' });
  await router.push({
    path: encodeUriRouterPath(customEvent.detail.url),
    query: Object.fromEntries(queryParams)
  });
}

async function onResume(event: Event) {
  const element = window.document.querySelector('.header_member') as HTMLElement;
  element?.focus();
  if(window.location.href.indexOf('/main/more-main') > -1) {
    // script적용 
    setTimeout(() => {
      element?.focus();
    },500);
  }
}

// 전역 이벤트 리스너 등록
export const loadGlobalEventListner = async () => {
  window.addEventListener('backWebView', backWebView); // 뒤로가기 이벤트 등록
  window.addEventListener('inputEncKeypad', handleInputEncKeypad as EventListener); //inputEncKeypad 이벤트 등록
  window.addEventListener('openTermPage', handleopenTermPage as EventListener); //openTermPage 이벤트 등록
  window.addEventListener('loadAuthInfo', loadAuthInfo as EventListener);
  window.addEventListener('moveWebView', moveWebView as EventListener);
  window.addEventListener('onResume', onResume as EventListener);
};

export const removeGlobalEventListner = () => {
  window.removeEventListener('backWebView', backWebView);
  window.removeEventListener('inputEncKeypad', handleInputEncKeypad);
  window.removeEventListener('openTermPage', handleopenTermPage);
  window.removeEventListener('loadAuthInfo', loadAuthInfo);
  window.removeEventListener('moveWebView', moveWebView);
  window.removeEventListener('onResume', onResume);
};
