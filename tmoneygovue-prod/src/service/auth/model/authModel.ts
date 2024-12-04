/**
 * @description: 인증 정보
 * AuthInterface
 */
export interface AuthInfoInterface {
  token: string; // 인증토큰
  uuid: string; // UUID
  appCode: string; // app코드. MIC
  osKnd: string; // os종류. A: Android, I: iOS
  osVer: string; // os버전
  appVerCode: string; // app버젼코드
  appVer: string; // app버젼
  mbrNm: string; // 회원명
  moappMbrsSno: string | null; // 모바일앱회원일련번호
  mbrBrdt: string; // 회원생년월일
  mbrphNo: string; // 회원전화번호
  ondaAuthToken: string; // 온다인증토큰
  genderCode: string; // 성별코드. M: 남성, F: 여성
  pushToken?: string; //푸시토큰
}
