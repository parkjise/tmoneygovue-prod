/**
 * @description: 쿠폰응답정보
 * ResponseCoupon
 */
export interface ResponseCoupon {
  cpnSno?: string;
  cpnUsePsbYn?: string;
  rspMsg: string;
  rspCd: string;
}

export interface ResponseGiftCoupon {
  //Http응답코드?
  okHttpResponseCode: string;
  //응답코드
  rspCd: string;
  //응답메시지
  rspMsg: string;
  //푸시서비스응답메세지?
  pushSvcRspMsg: string;
  //푸시 알림 고유 번호?
  pushSno: string;
  //쿠폰일련번호
  cpnSno: string;
}
