/**
 * @description 여행결제영수증조회 request
 */
export interface ReqPaymentReceipt {
  tmgMbrsSbo: string; //티머니Go회원일련번호
  trvlMrnpSno: string; //여행예약일련번호
}
/**
 * @description 여행결제영수증조회 response
 */
export interface ResPaymentReceipt {
  busCacmCd: string; //버스운수사코드
  busCacmBrn: string; //버스운수사사업자등록번호
  allPymAmt: number; //총결제금액
  cardPymAmt: number; //카드결제금액
  evcpPymAmt: number; //이벤트쿠폰결제금액
  mlgPymAmt: number; //마일리지결제금액
  issuCrcmCd: string; //발급카드사코드
  aprvNo: string; //승인번호
  aprvRgDt: string; //승인등록일자
  aprvRgTime: string; //승인등록시각
  aprvAmt: number; //승인금액
  allCancRyAmt: number; //총취소환불금액
  cardPymCanAmt: number; //카드취소환불금액
  evcpPymCanAmy: number; //이벤트쿠폰결제취소금액
  mlgPymCanAmt: number; //마일리지결제취소금액
  allPnltAmt: number; //전체위약금액
  mrsNo: string; //예매번호
  trvlPrdNm: string; //여행상품명
  deprDt: string; //출발일자
  deprTime: string; //출발시각
  trvlRotId: string; //여행노선ID
  trvlMrnpDtlList: PaymentReceiptData[]; // 여행예약상세목록
}
/**
 * @description 여행결제영수증조회 > 여행예약상세목록
 */
export interface PaymentReceiptData {
  busTckKndNm: string; //버스티켓종류명
  busTckKndNum: number; //버스티켓종류수
}
/**
 * @description 여행결제취소요청 > 취소요청 request
 */
export interface ReqTrvlCanc {
  // tmgMbrsSno: string; //티머니GO회원일련번호
  // trvlMrnpSno: string; //여행예약일련번호
  trvlMrnpDtlList: TrvlCancData[]; //여행예약상세목록
}
/**
 * @description 여행결제취소요청 > 취소요청
 */
export interface TrvlCancData {
  trvlMrnpSno: string; //여행예약일련번호
  trvlMrnpSqno: number; //여행예약순번
  // busTckKndCd: string; //버스티켓종류코드
  // busTckCkndNm: string; //버스티켓종류명
  // trvlTissuId: string; //여행발권ID
  // evcpUseYn: string; //이벤트쿠폰사용여부
  // tisuAmt: number; //발권금액
  // cancAmt: number; //취소금액
  // pnltAmt: number; //위약금액
}
