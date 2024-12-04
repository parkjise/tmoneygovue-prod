/**
 * @description: 알림 미확인 수 조회 요청
 */
export interface reqUnConfirmedNotiCntInfoModel {
  inqrtDtm: string; // 조회일시
}

/**
 * @description: 알림 미확인 수 조회 응답
 */
export interface resUnConfirmedNotiCntInfoModel {
  msg: string; // 응답 메세지(티머니GO 서버 응답 메세지)
  okHttpResponseCode: string;
  rspMsg: string; // 푸시서버 응답 메세지
  noReadNtfcCnt: number; // 미확인 알림 수
  rspCd: string; // 푸시서버 응답 코드
}

/**
 * @description: 회원마일리지 금액쿠폰 카운트조회 요청
 */
export interface reqMbrMileageCouponCntInfoModel {
  atncChkYn: string; // ATNC 체크 여부
  cpnChkYn: string; // 쿠폰 체크 여부
  dotChkYn: string; // 도트 체크 여부
  goMlgChkYn: string; // GO 마일리지 체크 여부
  offwallMlgChkYn: string; // 오프월 마일리지 체크 여부
  tMlgInqrYn: string; // T 마일리지 조회 여부
  trPrwnCpnYn: string; // TR 프라운 쿠폰 여부
}

/**
 * @description: 회원마일리지 금액쿠폰 카운트조회 응답
 */
export interface resMbrMileageCouponCntInfoModel {
  rspMsg: string; // 응답 메세지
  GoMlgAmt: number; // GO 마일리지 금액
  offwallMlgAmt: number; // 오프월 마일리지 금액
  dotDispYn: string; // 도트 표시 여부
  rspCd: string; // 응답 코드
  cpnPsnCnt: number; // 쿠폰 발행 수
  tMlgAmt: number; // T 마일리지 금액
  atncCheckPrcn: string; // ATNC 체크 비율
}
