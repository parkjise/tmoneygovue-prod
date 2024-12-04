/**
 * @description 약관리스트 요청 정보
 * ReqTermsInfo
 */
export interface ReqTermsInfo {
  svcDvsCd: string; // 서비스구분코드(1:티머니GO서비스,2:모빌리티서비스,3:신용카드서비스)
  /**
   * 이용약관 그룹코드
   * MJ: 회원가입약관
   * BJ: 고속,시외 회원가입약관
   * O : 온다 택시
   * D : 타슈
   * G : 지쿠
   * I : 킥고잉
   * X : 씽씽
   */
  stplGrpCd: string;
}

/**
 * @description 약관 동의 리스트
 */
export interface reqStplAgreeInfo {
  stplSno: string;
  agrmYn: string;
}

/**
 * @description 회원가입 약관동의 리스트
 */
export interface reqJoinStplAgreeInfo {
  utlzSvcDvsCd: string;
  stplList: reqStplAgreeInfo[];
}

/**
 * @description 회원 서비스 연동 등록
 * ReqTermsAgree
 */
export interface ReqTermsAgree {
  lnkgSvcCd: string;
  stplList: reqStplAgreeInfo[];
}

/**
 * @description 특정 약관 동의 정보
 */
export interface reqSpfStplAgreeInfo {
  stplSno: string;
  stplAgrmYn: string;
}

/**
 * @description 특정약관 동의 등록
 * ReqSpfTermsAgree
 */
export interface ReqSpfTermsAgree {
  moappMbrsSno?: string;
  stplList: reqSpfStplAgreeInfo[];
}

/**
 * @description 이벤트 약관 동의
 */
export interface ReqEventTermAgreeInfo {
  moappMbrsSno: string;
  stplSno: string; // 약관일련번호
}
