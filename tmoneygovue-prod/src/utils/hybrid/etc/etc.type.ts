import type { FlexResponse } from '../type/index';

/** OpenViewRequest */
export type OpenViewRequest = {
  url: string;
  viewType: string;
  headerTitle?: string | null;
  viewJsonValue?: string | null;
};

/** ToastRequest */
export type ToastRequest = {
  message: string;
};

/** 암호화 키패드 열기 Request */
export type openEncKeypadRequest = {
  inputMaxLength: number;
  inputMinLength?: number;
  keypadType: string;
  label?: string;
  hint?: string;
  maxAlert?: string;
  minAlert?: string;
  isAddCardPwKb: boolean;
  inputFieldId: string;
};

/** 암호화 키패드 열기 Response */
export type openEncKeypadResponse = {
  encInputValue: string;
  encHmac?: string;
  encToken?: string;
  encCardPwKb?: string;
} & FlexResponse;

/** 자전거 고장/신고 입력 정보 조회 Request */
export type reportDisabilityBikeInfoRequest = {
  type: string;
};
/** 자전거 고장/신고 입력 정보 조회 Response */
export type reportDisabilityBikeInfoResponse = {
  bicycleNumber?: string;
  utlzSvcDvsCd?: string;
  dclrImgVal?: string;
  lttd?: string;
  lngt?: string;
} & FlexResponse;

/** 연락처 앱 오픈 / 연락처 조회 Response */
export type openContactResponse = {
  phoneNumber?: string;
} & FlexResponse;

/** 따릉이 비밀번호 암호화 Request */
export type encSeoulBikePasswordRequest = {
  oldPw: string;
  newPw: string;
};

/** 따릉이 비밀번호 암호화 Response */
export type encSeoulBikePasswordResponse = {
  cipherOldPw: string;
  cipherNewPw: string;
} & FlexResponse;

/** 메인 하단탭바노출 Request */
export type showTabbarRequest = {
  isShow: boolean;
};

/** VerifyRequest */
export type verifyRequest = {
  verifyType: number;
};
export type verifyInfo = {
  prntAuthSno?: string; //부모인증일련번호
  gndrCd?: string;
  prsnAuthScsYn?: string;
  prsnAuthSno?: string; //본인인증일련번호
  method?: string;
  mbphNo?: string;
  ageDvsCd?: string; // 연령코드 0: unknown, 1: 성인, 2: 만 13세, 3: 만 13세 미만
  userBrdt?: string;
  frndInvnTgtYn?: string;
  userNm?: string;
  drmbYn?: string;
  moappMbrsSno?: string;
  joinYn?: string; // 기존 회원 유무,
  authTkn?: string;
  message?: string;
  tGo1Yn?: string; // 최초 1회 동의 팝업 flag
}

export type reqPrsnAuthInfo = {
  prsnAuthScsYn?: string | null;
  moappMbrsSno?: string | null; 
  joinYn?: string | null; 
  prsnAuthSno?: string | null; 
  userNm?: string | null; 
  userBrdt?: string | null; 
  mbphNo?: string | null; 
  authTkn?: string | null; 
  prsnAuthRstMsg?: string | null; 
  tGo1Yn?: string | null; 
  prsnAuthErmsCtt?: string | null; 
  drmbYn?: string | null; 
  frndInvnTgtYn?: string | null; 
  ageDvsCd?: string | null; 
  prntAuthSno?: string | null; 
  gndrCd?: string | null; 
}

export type verifyResponse = {
  prntAuthSno? : string; //부모인증일련번호 as-is 대응
  prsnAuthResult? : verifyInfo //신규(v2.4.5-241126)
} & FlexResponse;

/**
 * @description 인증타입 구분
 */
export const VerifyType = {
  SING_UP: 0,
  PARENTS: 2,
  PASSWORD_RESET: 6
};

/** 카카오톡 공유하기 Request */
export type shareKakaoTalkRequest = {
  shareImageUrl: string;
};

/** 친구초대 공유하기 Request */
export type shareLinkRequest = {
  target: string;
  tempId?: string;
  data: string;
};

/** app 모드 조회 Request */
export type getAppModeResponse = {
  isDebugAppMode: boolean;
} & FlexResponse;

/** call app preference Request */
export type callAppPreferenceRequest = {
  type: string;
  key: string;
  value: string;
};

/** call app preference Response */
export type callAppPreferenceResponse = {
  value: string;
} & FlexResponse;

/** 애드브릭스 전송 Request */
export type sendAdbrixRequest = {
  eventId: string;
};

// 접근성 활성화 여부
export type getAccessibilityReponse = {
  state: boolean;
} & FlexResponse;

/** 미확인 알람 업데이트 Request */
export type setAlarmRequest = {
  noReadNtfcCnt: number;
};