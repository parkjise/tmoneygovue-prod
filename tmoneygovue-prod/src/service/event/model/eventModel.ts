/**
 * @description: 이벤트 목록
 */
export interface eventInfo {
  evntSno: string; // 이벤트일련번호
  evntMainImgPathVal: string; // 이벤트 메인 이미지
  authTknNedYn: string; // 인증토큰필요여부
  evntUrlAddr: string; // 이벤트URL주소
  concScrnDvsCd: string; // 접속화면구분코드(0: 아웃링크, 1: 웹뷰)
  evntTtlNm: string; // 이벤트제목명
  evntCtt: string; // 이벤트내용
  evntSubImgPathVal: string; // 이벤트 서브 이미지
  evntPrcgCtNote: string;
  evntScrnId: string; // 이벤트화면ID
  evntEndDt: string; // 이벤트 종료일
  evntSttDt: string; // 이벤트 시작일
  listLinkUseYn: string; // 목록링크사용여부
}
export interface RequestEventList {
  TAG: string;
  evntDvsCd: string;
  inqrDtm: string; // 조회일시 YYYYMMDDHHmmss
}
export interface ResponseEventList {
  evntList: Array<eventInfo>;
  inqrNcnt: number;
}

/**
 * @description: 이벤트 상세
 */
export interface webviewScrnInfo {
  scrnId: string;
  hgrnScrnId: string;
  scrnNm: string;
  imgExpsSeq: number;
  scrnMrkDvsCd: string;
  imgPathVal: string;
  imgUrlAddr: string;
  blthCtt: string;
}
export interface RequestEventDtlInfo {
  moappMbrsSno?: string;
  scrnId?: string;
}
export interface ResponseEventDtlInfo {
  imgLinkUrl: string;
  rspCd: string;
  rspMsg: string;
  scrnNm: string;
  webviewScrnMaster: Array<webviewScrnInfo>;
  webviewScrnDetail: Array<webviewScrnInfo>;
}
