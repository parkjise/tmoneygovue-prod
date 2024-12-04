import type { reqSpfStplAgreeInfo } from '@/service/terms/model/requestModel';

/**
 * @description 기본 응답값
 * ResponseInfo
 */
export interface ResponseInfo {
  scsYn?: string;
  msg?: string;
}

/**
 * @description 특정 약관 동의
 * ResponseSpfTermAgreeInfo
 */
export interface ResponseSpfTermAgreeInfo {
  stplList: Array<reqSpfStplAgreeInfo>;
  rspCd: string;
  rspMsg: string;
}

/**
 * @description 이벤트 약관 동의 리스트
 */
export interface resStplInfo {
  stplSno: string;
  stplTtlNm: string;
  stplMndtYn: string;
  stplAgrmYn: string;
  stplUrl: string;
  extlUrl: string;
  stplCheck?: boolean;
}

/**
 * @description 이벤트 약관 리스트
 * ResponseEventTermInfo
 */
export interface ResponseEventTermInfo {
  stplList: Array<resStplInfo>;
  rspCd: string;
  rspMsg: string;
}
/**
 * @description 이벤트 약관 동의
 * ResponseEventTermInfo
 */
export interface ResponseEventTermAgree {
  rspCd: string;
  rspMsg: string;
}
