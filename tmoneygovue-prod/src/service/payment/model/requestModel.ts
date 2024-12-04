import type { reqSpfStplAgreeInfo } from '@/service/terms/model/requestModel';

/**
 * @description 결제수단정보 조회 관련
 * RequestPaymentManagement
 */
export interface RequestPaymentManagement {
  reqDtm: string;
  inqrDtm: string;
}

/**
 * @description 네이버페이 자동결제 요청
 * RequestNpayAuto
 */
export interface RequestNpayAuto {
  /**
   * 자동결제ID
   * 등록 후 네이버페이에서 제공한 자동결제ID
   */
  automaticPayId: string;
  /**
   * 삭제유형
   * 네이버페이 자동결제ID 삭제 유형
   * A:관리자, U사용자
   */
  cancelType?: string;
  /**
   * 삭제사유
   * 네이버페이 자동결제ID 삭제 사유
   */
  cancelReason: string;
}

/**
 * @description 네이버페이 결제생성/자동결제 요청
 * RequestNpayBillCreate
 */
export interface RequestNpayBillCreate {
  moappMbrsSno: string; // 모바일앱회원일련번호
  automaticPayId?: string; //자동결제ID(자동결제요청시 필요)
  utlzSvcDvsCd: string; // 이용서비스구분코드(H:고속, C:시외, O:온다, X:씽씽,T:따릉이, FG:운송중개)
  productName: string; // 상품명(60Bype제한)
  productCount: number; // 상품개수
  productAmount: number; // 상품금액
  encProductAmount?: string; // 암호화상품금액(mTransSecuritykey)
}

/**
 * @description 간편카드결제 별칭 변경
 */
export interface RequestSmpyPay {
  paymentKey: string;
  issuerCd: string;
  cardAliasName: string;
}

/**
 * @description 대표결제수단 결제키
 */
export interface RequestRepresentPaymentManagement {
  pymMnsId?: string;
  paymentKey: string;
  issuerCd?: string;
}

export interface RequestPaymentPassword {
  encPwd?: string;
  pwdUseYn?: string;
}

/**
 * @description 간편결제 등록
 */
export interface RequestRegisterSmpcPayment {
  brdt: string;
  carCod: string;
  cardAliasName: string;
  cardNo1: string;
  cardNo2: string;
  cardNo3: string;
  cardNo4: string;
  cardPw: string;
  cardPwKB: string;
  crpcId: string;
  cvv: string;
  encVer: string;
  issuerCd: string;
  krn: string;
  brn: string;
  stplList: reqSpfStplAgreeInfo[];
}

/**
 * @description 토스페이 자동결제/결제생성
 * RequestTossPayBillCreate
 */
export interface RequestTossPayBillCreate {
  moappMbrsSno: string; // 모바일앱회원일련번호
  billingKey?: string; //토스페이 자동결제 빌링키
  utlzSvcDvsCd: string; // 이용서비스구분코드(H:고속,C:시외,O:온다,X:씽씽,T:따릉이,FG:운송중개)
  tosspayMethod: string; //토스페이방법(1:TOSS_MONEY, 2:CARD(자동결제), 3:CARD(일반결제))
  productDesc: string; //상품설명
  amount: number; // 거래금액
  enAmount?: string; // 암호화거래금액
}

/**
 * @description 결제비밀번호 동일한지 검증
 * RequestPasswordConfirm
 */
export interface RequestPasswordConfirm {
  encPwd: string;
  encPwdCfrm: string;
}

/**
 * @description 간편결제 신용카드 닉네임 변경
 * RequestChangeSmpcNickname
 */
export interface RequestChangeSmpcNickname {
  paymentKey: string;
  issuerCd: string;
  cardAliasName: string;
}

/**
 * @description 티머니페이 등록 해지
 * RequestDeleteTmpy
 */
export interface RequestDeleteTmpy {
  inqrDtm: string;
}

/**
 * @description 결제수단 삭제 가능 여부 조회
 * RequestDeletionPossibility
 */
export interface RequestDeletionPossibility {
  pymMnsId: string;
  paymentKey?: string;
}