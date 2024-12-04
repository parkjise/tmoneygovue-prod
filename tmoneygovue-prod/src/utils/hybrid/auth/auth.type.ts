import type { FlexResponse } from '../type/index';

// 인증정보 응답
export type AuthInfoResponse = {
  token: string /** 인증토큰 */;
  uuid: string /** uuid */;
  appCode: string /** app코드 */;
  osKnd: string /** os종류 */;
  osVer: string /** os버전 */;
  appVer: string /** app버전 */;
  appVerCode: string /** app버전코드 */;
  mbrNm: string /** 회원명 */;
  moappMbrsSno: string | null /** 모바일앱회원일련번호 */;
  mbrBrdt: string /** 회원생년월일 */;
  mbrphNo: string /** 회원전화번호 */;
  ondaAuthToken: string /** 온다인증토큰 */;
  genderCode: string /** 성별코드 */;
  pushToken?: string /** 푸시토큰 */;
} & FlexResponse;

// 인증토큰 갱신 응답
export type AuthTknInfoResponse = {
  token: string /** 인증토큰 */;
} & FlexResponse;
