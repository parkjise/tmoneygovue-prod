/**
 * @description: 회원 연동 서비스 조회 요청
 */
export interface reqMarketingAgreementModel {
  inqrDtm: string; // 조회일시
}

/**
 * @description: 회원 연동 서비스 조회 응답
 */
export interface resMarketingAgreementModel {
  mrkgRcvYn: string; // 마케팅수신여부(Y/N)
  pushRcvYn: string; // PUSH수신여부(Y/N)
  mailRcvYn: string; // 이메일수신여부(Y/N)
  smsRcvYn: string; // SMS수신여부(Y/N)
  mrkgRcvUpdDtm: string; // 마케팅수신수정일시 (YYYYMMDDHH24MISS)
  msg: string; // 메시지
}

/**
 * @description: 회원 수신 동의 정보 변경 요청
 */
export interface reqUpdateMarketingAgreementModel {
  mrkgRcvYn: string; // 마케팅수신여부(Y/N)
  pushRcvYn?: string; // PUSH수신여부(Y/N)
  mailRcvYn?: string; // 이메일수신여부(Y/N)
  smsRcvYn?: string; // SMS수신여부(Y/N)
}

/**
 * @description: 회원 수신 동의 정보 변경 응답
 */
export interface resUpdateMarketingAgreementModel {
  scsYn: string; // 성공여부(Y/N)
  msg: string; // 메시지
}
