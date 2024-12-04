/**
 * @description: PublicTransportModel
 */

export interface RequestPublicTransportHistoryModel {
  //페이지 넘버
  pageNo: number;

  //조회 월
  inqrMonth: string;

  // 카드일련번호
  trcrSno: string;
}

export interface PublicTransportModel {
  //교통수단 코드 (1: 지하철, 2: 버스)
  mntnCd: string;

  //교통수단 명
  mntnNm: string;

  //노선/호선명
  rotNm: string;

  //승하차구분코드 (1: 승차, 2:하차)
  raaDvsCd: string;

  //승하차구분명
  raaDvsNm: string;

  //거래일시
  trdDtm: string;

  //거래금액
  trdAmt: string;
}

export interface PublicTransportHistoryListModel {
  //대중교통이용내역
  pbtrList: Array<PublicTransportModel>;
}
