/**
 * @description: 더미 인증 요청
 * AuthInterface
 */
export interface SampleAuthReq {
  mblOsKndCd: string;
  moappVer: string;
  moappMbrsSno: string;
  rnwlDtm: string;
  mbphHwId: string;
  mbphOsVer: string;
}

/**
 * @description: 더미 인증 응답
 * AuthInterface
 */
export interface SampleAuthRes {
  mag: string;
  ageDvsCd: string;
  drmbYn: string;
  authToken: string;
  tGo1Yn: string;
  userPhoneNumber: string;
  userName: string;
  joinYn: string;
  userBirthDate: string;
  moappMbrsSno: string;
  authTkn: string;
  frndInvnTgtYn: string;
  prsnAuthSno: string;
  ondaAuthToken: string;
  genderCode: string;
}
