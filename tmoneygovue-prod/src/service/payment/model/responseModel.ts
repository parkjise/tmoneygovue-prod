/**
 * @description 기본 응답값
 * ResponseInfo
 */
export interface ResponseInfo {
  rspCd?: string;
  rspMsg?: string;
  scsYn?: string;
  dltYn?: string;
}

/**
 * @description 결제비밀번호 응답값
 */
export interface ResponsePaymentPassword extends ResponseInfo {
  encPwd: string;
}

/**
 * @description NaverPay 자동결제등록/결제요청
 * ResponseNaverPay
 */
export interface ResponseNaverPay extends ResponseInfo {
  oderSno: string;
  reserveId: string;
  checkoutPage: string;
}

/**
 * @description NaverPay 자동결제요청
 * ResponseNaverPayAuto
 */
export interface ResponseNaverPayAuto extends ResponseInfo {
  orderSno: string;
  moappMbrsSno?: string;
  automaticPayid: string;
  authDataCard?: string;
  authDataAuth: string;
  amount?: number;
  atlPymAmt?: number;
  spreadOut: number;
  pymCmpyCd?: string;
  issurerCd?: string;
}

/**
 * @description TossPay 결제요청
 * ResponseTossPay
 */
export interface ResponseTossPay extends ResponseInfo {
  oderSno: string;
  payToken: string;
  checkoutPage: string;
}

export interface ResponseTossPayAuto extends ResponseInfo {
  moappMbrsSno: string;
  orderSno: string;
  billingKey: string;
  amount: string;
  payToken?: string;
  authDataCard?: string;
  authDataAuth?: string;
  spreadOut?: string;
  noInterest?: boolean;
  cardCompCd?: string;
  issuerCd?: string;
  errorCode?: string;
}
