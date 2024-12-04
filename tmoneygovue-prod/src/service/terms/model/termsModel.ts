/**
 * @description 약관상세정보
 * StplDtlInfo
 */
export interface StplDtlInfo {
  sno: string; // 약관일련번호
  trntYn?: string; // 운송약관인지
  mndtYn: string; // 약관필수여부
  extlUrl?: string; // 외부약관URL
  ttl: string; // 약관제목
  url?: string; // 약관url
  mrkgYn?: string; // 마케팅약관구분
  stplCheck?: boolean; // 상세 체크구분
}

/**
 * @description 약관그룹정보
 * StplGroupInfo
 */
export interface StplGroupInfo {
  stplGrpNm: string; // 약관그룹명
  stplGrpDesc: string; // 약관그룹 설명
  stplBtnNm: string; // 약관버튼명
  utlzSvcDvsCd: string; // 이용서비스구분코드
  stplDtlList: StplDtlInfo[]; // 약관상세리스트
  isChecked: boolean;
  isRequired: boolean;
}

/**
 * @description 약관동의정보
 * StplAgreeInfo
 */
export interface StplAgreeInfo {
  stplSno: string; // 약관일련번호
  stplTtlNm: string; // 약관명
  stplMndtYn: string; // 동의 필수 여부
  stplAgrmYn: string; // 약관동의 여부(Y,N)
  stplUrl: string; // 약관조회 URL
  extlUrl: string;
  stplCheck?: boolean;
}

/**
 * @description 약관정보
 * TermsInfo
 */
export interface TermsInfo {
  stplList: StplGroupInfo[];
  msg: string;
}

/**
 * @description 약관동의 정보
 * TermsAgreeInfo
 */
export interface TermsAgreeInfo {
  stplList: StplAgreeInfo[];
  rspCd: string;
  rspMsg: string;
}
