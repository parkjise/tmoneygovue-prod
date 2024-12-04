export interface ReqPaymentHistoryListModel {
  /* 이용서비스구분코드
    전체 : A
    고속/시외 : B
    택시 : O
    공공자전거 : T
    자전거/킥보드 : X
    기차 : R
    항공 : U
    렌터카 : L
    정기상품권(Go패스) : S
   */
  utlzSvcDvsCd: string;
  pageNo: string;
  inqrMonth: string;
}

export interface PaymentHistoryModel {
  //서비스명
  svcNm: string;

  //이용서비스명
  utlzSvcNm: string;

  /* 이용서비스구분코드
  전체: A, 시외/고속: B, 온다: O, 따릉이: T, 씽씽: X */
  utlzSvcDvsCd: string;

  //이용서비스구분명
  utlzSvcDvsNm: string;

  //원결제키값
  ognPymKeyVal: string;

  //상세결제키값
  dtlPymKeyVal: string;

  //총이용금액
  ttutAmt: string;

  //결제금액
  pymAmt: string;

  //누적취소금액
  cumCancAmt: string;

  //쿠폰사용금액
  cpnUseAmt: string;

  //마일리지사용금액
  mlgUseAmt: string;

  //결제수단명
  pymMnsNm: string;

  //결제진행상태명
  pymPrcgStaNm: string;

  //결제일자
  pymDtm: string;
}

export interface PaymentHistoryListModel {
  pymList: Array<PaymentHistoryModel>;
}

export interface ReqBikePaymentHistoryModel {
  //결제일련번호
  pymSno: string;

  /* 이용서비스구분코드
    공공자전거 : T 만 사용 예정
   */
  utlzSvcDvsCd: string;
}

export interface BikePaymentHistoryDataModel {
  rspCd: string;
  rspMsg: string;
  data: BikePaymentHistoryModel;
}

export interface BikePaymentHistoryModel {
  pymSno: string;
  pymAprvDt: string;
  pymStaCd: string;
  pymStaNm: string;
  cpnDvsCd: string;
  cpnDvsNm: string;
  pymMnsCd: string;
  pymMnsNm: string;
  pymAmt: number;
  ryAmt: number;
  rntHstSno: string;
  pymCancPsbYn: string;
  ryPsbYn: string;
  ryPsbAmt: string;
  pymMnsIdnnVal: string;
  atlPymAmt: number;
  cpnUseAmt: number;
  tmgMlgUseAmt: number;
  moappMlgCtSno: string;
  msg: string;
  totUtlzAmt: number;
  totRyAmt: number;
  pymRyAmt: number;
  tmgMlgRyAmt: number;
  cpnRyAmt: number;
  pymMnsId: string;
  useSttDtm: string;
  useEndDtm: string;
}

export interface RentCarPaymentHistoryModel {
  paidInfo: PaidInfoModel;
  rncrEntrAddr: string;
  rncrEntrId: number;
  rncrEntrNm: string;
  rncrEntrTelNo: string;
  rncrMrnpSno: string;
  mrnpStaCd: string;
}

export interface PaidInfoModel {
  crdNo: string;
  crdtAprvNo: string;
  evcpUseAmt: number;
  evcpUseCancAmt: number;
  issurCd: string;
  mipTerm: string;
  pmmtCancAmt: number;
  pmmtPymAmt: number;
  pymCancCmm: number;
  pymDtm: string;
  pymMnsCd: string;
  pymMnsNm: string;
  tmgMlgCancAmt: number;
  tmgMlgPymAmt: number;
  totCancAmt: number;
  totPymAmt: number;
  pymCancDtm: string;
}

export interface ResponseMemberPaymentInfoModel {
  inqrNcnt: string;
  rgtDtm: string;
  dtl: Array<MemberPaymentInfoModel>;
}

export interface MemberPaymentInfoModel {
  mbrsPymMnsSno: string;
  pymMnsCd: string;
}

export interface RequestSaveBcclVchrPrchCancInf {
  utlzSvcDvsCd: string;
  pymSno: string;
  cancRyDvsCd: string;
}

export interface ResponseSaveBcclVchrPrchCancInf {
  rspCd: string;
  rspMsg: string;
  data: {
    ctrnYn: string;
  };
}
export interface ResponseGoPassPymList {
  passCpnListImgPath: string;
}

export interface ResponseSaveGoPassInfo {
  rspCd: string;
  rspMsg: string;
  data: GoPassInfo;
}
export interface GoPassInfo {
  sortSeq: number; //정렬순서
  passPrchSno: string; //정기권구매일련번호
  cpnSno: string; //상품권일련번호
  cpnNm: string; //상품권명
  cpnDtlDesc: string; //상품권상세설명
  moappMbrsSno: string; //모바일앱회원일련번호
  passPrchDtm: string; //정기권구매일시
  passPrgsStaCd: string; //정기진행상태코드
  passPrgsStaNm: string; //전기권진행상태명
  passDvsCd: string; //정기권구분코드
  passDvsNm: string; //정기권구분명
  passPrchAmt: string; //정기권구매금액
  passUseAmt: string; //정기권이용금액(이용가능금액)
  passExpiAmt: string; //정기권소멸금액
  passUseSttDtm: string; //정기권이용시작일시
  passUseEndDtm: string; //정기권이용종료일시
  passUseDdctFcnt: string; //정기권이용차감회수
  passUseDdctAmt: string; //정기권이용차감금액
  passExpiPrcgDtm: string; //정기권소멸처리일시
  passRyPsbDtm: string; //정기권한불가능일시
  passRyDtm: string; //정기권환불일시
  cpnUsePsbFcnt: string; //상품권이용가능회수
  passUseDdctDrtm: string; //정기권이용차감시간
  passStaMrkVal: string; //정기권상태표시값
  svcPymSno: string; //서비스결제일련번호
  ttutAmt: string; //결제총금액
  atlPymAmt: string; //실제결제금액
  cpnUseAmt: string; //쿠폰사용금액
  tmgMlgUseAmt: string; //티머니GO마일리지사용금액
  pymMnsNm: string; //결제수단명
  pymPrcgStaCd: string; //결제진행상태코드
  pymCancAmt: string; //결제취소금액
  cpnUseCancAmt: string; //쿠폰사용취소금액
  mlgUseCancAmt: string; //마일리지사용취소금액
  totCancAmt: string; //총취소금액(환불시표기)
  ryAtlUseAmt: string; //환불실제사용금액(결제수단중사용금액)
  ryMlgUseAmt: string; //환불마일리지사용금액(마일리지중사용금액)
  ryCpnUseAmt: string; //환불쿠폰사용금액
  addInprAmt: string; //추가회당금액(추가요금결제시 사용)
  cpnInfoUrl: string; //상품권정보url
  cpnRyInfoUrl: string; //상품권환불정보url
  passCpnPmList: [{ utlzSvcDvsCd: string }]; //정기상품권pm목록
  utlzSvcDvsCd: string; //이용서비스구분코드
}
