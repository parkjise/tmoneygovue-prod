import type { Category } from '@/service/travel/model/trvlCmmModel';

/**
 * @description: 쿠폰유효성검증요청정보
 * RequestValidateCoupon
 */
export interface RequestValidateCoupon {
  /**
   * 이용서비스구분코드(고속:H, 시외:C,온다:O,따릉이:T,씽씽:X)
   */
  utlzSvcDvsCd: string;
  /**
   * 결제수단ID ( 'TMPY', 'BZPY', 'PRPM')
   */
  pymMnsId?: string;
  /**
   * 발행사ID
   */
  crpcId?: string;
  /**
   * 전자지갑상품코드(티머니페이결제만 존재)
   * 페이&Go : 2100400801, 페이머니 : 1000100002
   */
  elwlprdCd?: string;
  /**
   * 총이용금액
   */
  ttutAmt: string;
  /**
   * 쿠폰일련번호
   */
  cpnSno: string;
  /**
   * 출발터미널코드
   */
  deprTrmlCd?: string;
  /**
   * 도착터미널코드
   */
  arvlTrmlCd?: string;
}

/**
 * @description: 쿠폰선물요청정보
 * RequestGiftCoupon
 */
export interface RequestGiftCoupon {
  /**
   * 선물대상 쿠폰일련번호
   */
  cpnSno: string;
  /**
   * 선물받을 사용자 휴대번호
   */
  mbphNo: string;
  /**
   * 사용자입력메시지
   */
  sendMsgCtt: string;
}

/**
 * @description 운송중개 쿠폰 유효성검증요청
 */
export interface RequestTravelValidateCoupon {
  evcpSno: string; // 이벤트쿠폰일련번호
  pymMnsId: string; //결제수단ID
  crpcId: string; //발행사ID
  elwlPrdCd: string; //전자지갑상품코드
  pymAmt: number; //결제금액
  trvlPrdId: string; //여행상품ID
  busCacmCd: string; //버스운수사코드
  trvlRotId: string; //여행노선ID
  categoryList: Category[]; //카테고리목록
}
