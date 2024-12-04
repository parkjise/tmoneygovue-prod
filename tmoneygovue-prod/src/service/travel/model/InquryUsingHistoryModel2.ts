/**
 * @description 이용내역목록조회 response
 */
export interface ResUsingHistory {
  trvlMrnpList: TrvlMrnpData[];
}
/**
 * @description 이용내역목록조회 > 여행예약목록
 */
export interface TrvlMrnpData {
  trvlMrnpSno: string; //여행예약일련번호
  trvlPrdNm: string; //여행상품명
  trvlPrdId: string; //여행상품ID
  mrnpDt: string; //예약일자
  deprDt: string; //출발일자
  deprTime: string; //출발시각
  deprTrmlCd: string; //출발터미널코드
  deprTrmlNm: string; //출발터미널명
  trvlMrsStCd: string; //여행예매상태코드
  trvlMrsStaNm: string; //여행예매상태명
  busTckCknmNm: string; //버스티켓종류명
  tisuNum: number; //발권매수
  pymDtm: string; //결제일시
}
