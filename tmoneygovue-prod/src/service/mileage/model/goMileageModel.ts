import type { reqSpfStplAgreeInfo } from '@/service/terms/model/requestModel';
import type { StplAgreeInfo } from '@/service/terms/model/termsModel';

/**
 * @description: GO마일리지 내역 조회
 */
export interface RequestMileageHistory {
  pageNo: number; // 페이지번호
  inqrMon: string; // 조회월(YYYYMM)
  mlgDvsCd: string; // 마일리지구분코드(00:전체, 01:적립, 02:사용, 03:사용취소, 04:소멸)
}

export interface mileageHistory {
  mlgUseTypCd: string; // 마일리지구분코드(00:전체, 01:적립, 02:사용, 03:사용취소, 04:소멸)
  mlgUtlzDtm: string; // 마일리지사용일시
  mlgUtlzNm: string; // 마일리지사용구분명
  mlgAmt: string; // 마일리지사용금액(사용시 음수처리, 마일리지 + M)
}

export interface ResponseMileageHistoryList {
  mlgList: Array<mileageHistory>; // 마일리지 사용 이력
  nxtMonExpiSchdAmt: number; // 다음달 소멸예정금액
  aftNxtMonExpiSchdAmt: number; // 다다음달 소멸예정금액
  mlgAcmtSchdAmt: number; // 마일리지 적립예정금액
  mbrsMlgAmt: number; // 회원 현재 마일리지 잔액
  monExpiSchdAmt: number; // 이달 소멸예정금액
  mlgUseAmt: number; // 마일리지 사용금액
  msg: string;
  scsYn: string; // 성공여부(Y/N)
}

/**
 * @description: 마일리지 전환 사전정보
 */
export interface ResponseMileageInfo {
  infoImgPath: string; // 전환안내 이미지 경로
  mlgSwtcUGD: string; // 마일리지전환 사용자가이드
  stplList: Array<StplAgreeInfo>; // 약관목록
  allStplAgrmYn: string; // 모든약관 동의여부
  tmnyIntgMbrsYn: string; // 티머니 통합회원 여부
  GOMlgAmt: number; // GO마일리지 잔액
  TMlgAmt: number; // T마일리지 잔액
  popMsgTtl: string; // 팝업메세지 제목
  popMsgCtt: string; // 팝업메세지 내용
  rspCd: string; // 응답코드
  rspMsg: string; // 응답메세지
}

/**
 * @description: T마일리지 조회하기
 */
export interface RequestMileageInfo {
  moappMbrsSno: string; // 모바일앱회원일련번호
  stplList?: Array<reqSpfStplAgreeInfo>; // 약관목록
}

/**
 * @description: 마일리지 전환 신청
 */
export interface RequestMileageExchange {
  moappMbrsSno: string; // 모바일앱회원일련번호
  mlgSwtcTgtAmt: number; // 전환 GO마일리지
}
export interface ResponseMileageExchange {
  mlgSwtcDtm: string; // 전환한 시간
  popMsgCtt: string; // 팝업메세지 내용
  popMsgTtl: string; // 팝업메세지 제목
  swtcMlgScsYn: string; // 마일리지 전환 성공여부
  rmnTmnyMlgAmt: number; // 잔여 T마일리지
  rmnTmgMlgAmt: number; // 잔여 GO마일리지
  mlgSwtcAmt: number; // 전환 GO마일리지
  rspCd: string;
  rspMsg: string;
}

/**
 * @description: GO마일리지 적립 및 사용안내
 */
export interface RequestMileageGuide {
  staCd: string;
  scrnId: string;
}
export interface mileageGuide {
  scrnId: string; // 화면ID
  hgrnScrnId: string; // 상위 화면ID
  scrnNm: string; // 화면명
  imgSeq: number; // 이미지표시순서
  scrnDvsCd: string; // 화면구분코드
  imgUrl: string; // 이미지URL
  imgLnkUrl: string; // 이미지링크URL
  scrnCtt: string; // 화면내용
  staCd: string; // 상태코드(운영시 2:진행)
  webViewUrl: string; // 웹뷰 URL
}
export interface ResponseMileageGuide {
  rspCd: string;
  rspMsg: string;
  data: Array<mileageGuide>;
}

/**
 * 마일리지 소멸여부 Response Model
 */
export interface ResponseMileageExpiredModel {
  /**
   * 마일리지 소멸여부(Y/N)
   */
  mlgExpiYn: string;

  /**
   *  마일리지 소멸금액
   */
  mlgExpiAmt: number;

  /**
   * 마일리지 소멸에 관한 안내 메시지
   */
  mlgExpiMsg: string;
}
