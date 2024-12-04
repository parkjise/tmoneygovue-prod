/**
 * @description TrafficCardModel
 */

export interface TrafficCardModel {
  trcrSno: string; //교통카드 일련번호
  crcmCiUrl: string; //카드사 코드
  trcrNo: string; //카드사 명
  crcmNm: string; //교통카드번호(*** + 4자리)
  crcmCd: string; //카드사 CI URL
}

export interface TrafficCardListmodel {
  trcrNoList: Array<TrafficCardModel>; //교통카드 번호 리스트
}
