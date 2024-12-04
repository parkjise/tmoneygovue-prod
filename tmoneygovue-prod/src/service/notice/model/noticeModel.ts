/**
 * @description: 공지 정보
 * NoticeInterface
 */
export interface noticeDtlInfo {
  faqTypCd: string;
  moappSno: string;
  mblOsKndCd: string;
  moappVer: string;
  rnwlNedYn: string;
  rgsrId: string;
  rgtDtm: string;
  updrId: string;
  updDtm: string;
  ntfcTtlNm: string;
  ntfcCtt: string;
  cnctMoappUrlVal: string;
  faqCtgCd: string;
  cateTitle: string;
  cdSndAdtnInfCtt: string;
  cateCd: string;
  cateNm: string;
  dtlCmnCdNm: string;
  faqTtlNm: string;
  faqCtt: string;
  keyWord: string;
  moappNtcMttrSno: string;
  ntcMttrDvsCd: string;
  ntcMttrDvsNm: string;
  ntcMttrTtlNm: string;
  ntcMttrCtt: string;
  bltnSttDtm: string;
  bltnEndDtm: string;
  bltnYn: string;
  dotUseYn: string;
  dotUseSttDtm: string;
  dotUseEndDtm: string;
  ntcRgtDtm: string;
  dotScrExprYn: string;
  ntcMttrImgPathVal: string;
  mvmnPathVal: string;
  type?: string;
}

export interface ResponseNoticeList {
  userAppVer: string;
  noticList: Array<noticeDtlInfo>;
}

export interface ResponseNoticeDtlInfo {
  rspCd: string;
  rspMsg: string;
  noticeDtlInfo: noticeDtlInfo;
}
