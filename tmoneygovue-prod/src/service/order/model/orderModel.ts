import type { TermsInfo } from '@/service/terms/model/termsModel';
import type { ResProductDtl } from '@/service/travel/model/productModel';
import type { ResDAlcnData } from '@/service/travel/model/reservationModel';
import type { Category } from '@/service/travel/model/trvlCmmModel';
import type { TckData } from '@/service/travel/reservationModule';

export interface OrderTckData extends TckData {
  cpnDcntFee: number;
}

/**
 * @description 주문정보
 * orderInfo
 */
export interface OrderInfo {
  /**
   * 결제 선택관련 정보
   */
  pymMnsId: string; //결제수단ID
  /**
   * 결제 종류코드
   * C:신용카드
   * B:티머니페이
   * N:네이버페이
   * T:토스페이
   */
  pymKndCd: string;
  pymMnsNm: string; //결제수단명
  paymentKey: string; //결제Key
  /**
   * 쿠폰 선택관련 정보
   */
  cpn: OrderCouponInfo;
  /**
   * 마일리지 정보
   * t마일리지 : tmoneypay 결제시 적용 가능.
   */
  tmgMlgPymAmt: number;
  tMlgAmt: number;
  /**
   * 약관사항
   */
  termsInfo: TermsInfo;
  /**
   * 선택인원정보
   */
  selSatsList: OrderTckData[];
  /**
   * 선택일별배차정보
   */
  dAlcnInfo: ResDAlcnData;
  /**
   * 선택 상품 정보
   */
  productDtl: ResProductDtl | null;
  /**
   * 승객정보
   */
  trvlMrnpDtlList: TrvlMrnpDtlInfo[];
  /**
   * 할부개월수
   */
  installment: string;
}

export interface OrderCouponInfo {
  cpnDfntSno: string; //쿠폰정의 일련번호
  cpnNm: string; //쿠폰명
  cpnSno: string; //쿠폰일련번호
  dcCtt: string; //할인내용
  dcAmt: number; //할인금액
  applyType: string; //적용타입 (2인 이상)
  applyTypeNm: string; //적용타입이름
  dcKndCd: string;
  dcRt: number; //할인비율
  applyAmt: number;
}

export interface TrvlMrnpDtlInfo {
  trvlMrnpSqno: number; // 여행예약순번
  busTckKndCd: string; // 버스티켓종류코드
  busTckKndNm: string; // 버스티켓종류명
  psngFrnm?: string; // 승객이름
  psngMbphNo?: string; // 승객휴대폰번호
  psngGndrCd?: string; // 승객성별코드
  tissuAmt: number; // 발권금액
  evcpUseYn: string; // 이벤트쿠폰사용여부
}

export interface OrderSmpcInfo {
  issurCd?: string; // 발급사코드
  billingKey: string; //결제Key
  msknCardNoVal: string; //마스킹카드번호값
  cardCpNm: string; //카드사이름
  mipTerm: string; //할부기간
}

export interface OrderPayInfo {
  billAuthData: any; // 결제인증값
  mipTerm: string; //할부기간
  oderSno: string; //주문번호
}

export interface OrderTmpyInfo {
  virtCardRfrnId: string; //가상카드참조ID
  elwlPrdCd: string; //전자지갑상품코드
  tmnyMlgPymAmt: number; //티머니마일리지결제금액
}

export interface PymInfo {
  pymAmt: number; //결제금액(총금액)
  tmgMlgPymAmt: number; //티머니Go마일리지결제금액
  evcpSno: string; //이벤트쿠폰일련번호
  evcpUseAmt: number; //이벤트쿠폰사용금액
  pymMnsId: string; //결제수단ID
  pmmtPymAmt: number; //결제수단결제금액(마일리지/쿠폰 사용금액 차감 적용)
  smpcInfo: OrderSmpcInfo; //체크/신용카드 사전등록결제
  payInfo: OrderPayInfo; //네이버페이/토스페이 일반
  tmpyInfo: OrderTmpyInfo; //티머니페이
}

/**
 * @description 여행결제요청
 * RequestTravelPayment
 */
export interface RequestTravelPayment {
  encPwd: string; // 결제비밀번호
  trvlMrnpSno: string; // 여행예약일련번호
  trvlPrdId: string; //여행상품Id
  trvlPrdNm: string; //여행상품명
  busCacmCd: string; //버스운수사코드
  areaId: string; //지역ID
  areaName: string; //지역명
  trvlRotId: string; //여행노선ID
  rotSqno: number; //노선순번
  alcnDt: string; //배차일자
  alcnSqno: number; //배차순번
  busClsCd: string; //버스등급코드
  atlDeprDt: string; //실제출발일자
  atlDeprTime: string; //실제출발시각
  deprTrmlNm: string; //출발터미널명
  deprTrmlCd: string; //출발터미널코드
  arvlTrmlCd: string; //도착터미널코드
  mnppNm: string; //예약자명
  mnppMbphNo: string; //예약자휴대폰번호
  mnppMailAddr: string; //예약자이메일주소
  mrnpReqCtt: string; //예약요청내용
  dcAcmtSno?: string; //할인적립일련번호
  tmgAcmtAmt: number; //티머니Go적립금액
  categoryList: Category[]; //카테고리 목록
  trvlMrnpDtlList: TrvlMrnpDtlInfo[]; //여행예약상세목록
  pymInfo: PymInfo; //결제정보
}

/**
 * @description 여행결제응답
 * ResponseTravelPayment
 */
export interface ResponseTravelPayment {
  areaThruTrmlYn: string; // 고속버스연계여부
  deprTrmlNm: string; // 출발터미널명
  deprTrmlCd: string; // 출발터미널코드
}

export interface ReqTrvlPaymentMrnp {
  trvlPrdId: string;
  trvlPrdNm: string;
  busCacmCd: string;
  areaId: string;
  areaName: string;
  trvlRotId: string;
  rotSqno: number;
  alcnDt: string;
  alcnSqno: number;
  busClsCd: string;
  atlDeprDt: string;
  atlDeprTime: string;
  deprTrmlNm: string;
  deprTrmlCd: string;
  arvlTrmlCd: string;
  pymAmt: number;
}
