// import type { FlexResponse } from '../type/index';
import type { FlexResponse } from '../type';
import type {
  ToastRequest,
  OpenViewRequest,
  openEncKeypadRequest,
  openEncKeypadResponse,
  reportDisabilityBikeInfoRequest,
  reportDisabilityBikeInfoResponse,
  openContactResponse,
  encSeoulBikePasswordRequest,
  encSeoulBikePasswordResponse,
  showTabbarRequest,
  verifyRequest,
  verifyResponse,
  shareKakaoTalkRequest,
  getAppModeResponse,
  callAppPreferenceRequest,
  callAppPreferenceResponse,
  sendAdbrixRequest,
  shareLinkRequest,
  getAccessibilityReponse,
  reqPrsnAuthInfo,
  setAlarmRequest
} from './etc.type';

// WebToNative interface 정의
export default interface FlexEtc {
  getLocaleInfo: () => Promise<FlexResponse>;
  // 화면 열기. 웹뷰, 외부브라우져, 네이티브 화면 열기
  openView: (param: OpenViewRequest) => Promise<FlexResponse>;
  // 앱종료
  terminateApp: () => Promise<FlexResponse>;
  // 토스트 메시지 노출
  showToast: (param: ToastRequest) => Promise<FlexResponse>;

  // 암호화 키패드 열기
  openEncKeypad: (param: openEncKeypadRequest) => Promise<openEncKeypadResponse>;

  // 암호화 키패드 닫기
  closeEncKeypad: () => Promise<FlexResponse>;

  // 자전거 고장/장애 신고 입력 정보 조회
  getReportDisabilityBikeInfo: (param: reportDisabilityBikeInfoRequest) => Promise<reportDisabilityBikeInfoResponse>;

  //연락처 앱 오픈 / 연락처 조회
  openContact: () => Promise<openContactResponse>;

  // 따릉이 비밀번호 암호화
  encSeoulBikePassword: (param: encSeoulBikePasswordRequest) => Promise<encSeoulBikePasswordResponse>;

  // 로그아웃 APP 데이터 삭제 요청
  logoutClearTGoData: () => Promise<FlexResponse>;

  // 메인탭바 노출
  showTabbar: (param: showTabbarRequest) => Promise<FlexResponse>;

  // 웹뷰 닫기
  closeWebView: () => Promise<FlexResponse>;

  // 본인인증
  callIdentityVerify: (param: verifyRequest) => Promise<verifyResponse>;

  // 회원가입정보 전달
  getPrsnAuthInfo: (param: reqPrsnAuthInfo) => Promise<FlexResponse>;

  // 웹뷰 이동 준비완료
  readyForMoveWebView: () => Promise<FlexResponse>;

  // 카카오톡 공유하기
  shareKakaoTalk: (param: shareKakaoTalkRequest) => Promise<FlexResponse>;

  // 친구초대 공유하기
  shareLink: (param: shareLinkRequest) => Promise<FlexResponse>;

  // APP모드 조회
  getAppMode: () => Promise<getAppModeResponse>;

  // app preference 호출
  callAppPreference: (param: callAppPreferenceRequest) => Promise<callAppPreferenceResponse>;

  // 애드브릭스 전송
  sendAdbrix: (param: sendAdbrixRequest) => Promise<getAppModeResponse>;

  // 알림 뱃지 초기화
  resetBadgeCount: () => Promise<FlexResponse>;

  // 알림 뱃지 업데이트
  setBadgeCount: (param: setAlarmRequest) => Promise<FlexResponse>;

  // 사용자정보 제거
  removeMemberData: () => Promise<FlexResponse>;

  // 접근성 활성화 여부
  getAccessibility: () => Promise<getAccessibilityReponse>;
}
