import type { Trvl } from '@/service/travel/model/trvlCmmModel';

export interface TrvlHistoryModel extends Trvl {
  trvlMrnpSno: string; // 여행예약일련번호
  mrnpDt: string; //예약일자
  deprDt: string; //출발일자
  deprTime: string; //출발시각
  deprTrmlCd: string; //출발터미널코드
  deprTrmlNm: string; //출발터미널명
  trvlMrsStaCd: string; //여행예매상태코드
  trvlMrsStaNm: string; //여행상태명
  tissuNcnt: number; //발권건수
  pymDtm: string; //결제일시
  trvlPymCancSno: string; //여행예약취소순번
}

/**
 * @description 여행이용자정보목록조회 response
 */
export interface ResUserInfoData {
  trvlMrnpSno: string; // 여행예약일련번호
  trvlMrnpSqno: number; // 여행예약순번
  trvlTckStaCd: string; //여행티켓상태코드
  trvlTckStaNm: string; //여행티켓상세명
  busTckKndCd: string; //버스티켓종류코드
  busTckKndNm: string; //버스티켓종류명
  trvlTissuId: string; //여행발권ID
  psngFrnm: string; // 승객이름
  psngMbphNo: string; //승객휴대폰번호
  psngGndrCd: string; //승객성별코드
  evcpUseYn: string; //이벤트쿠폰사용여부
  trvlChtkId: string; //여행검표ID
  chtkDtm: string; //검표일시
  trvlMrnpCanSqno: string; //여행예약취소순번
}

/**
 * @description 여행예약상세정보조회 request
 */
export interface ReqTrvlMrnpDtlInfo {
  trvlMrnpSno: string; //여행예약일련번호
  trvlMrsStaCd?: string; //여행예매상태코드
  trvlMrnpCancSqno?: string; //여행예약취소순번
}
/**
 * @description 여행예약상세정보조회 response
 */
export interface ResTrvlMrnpDtlInfo extends Trvl, PaymentData, PaymentCancData {
  trvlMrnpSno: string; // 여행예약일련번호
  prdCtgCd: string; // 상품분류코드
  prdCtgNm: string; //상품분류명
  mrnpDt: string; //예약일자
  mrnpTime: string; //예약시각
  trvlMrsStaCd: string; //여행예매상태코드
  trvlMrsStaNm: string; //여행예매상태명
  trvlPymPrcgStaCd: string; //여행결제처리상태코드
  trvlPymPrcgStaNm: string; //여행결제처리상태명
  busCacmCd: string; //버스운수사코드
  busCacmNm: string; //버스운수사명
  busCacmTelNo: string; //버스운수사전화번호
  busCacmAddr: string; //버스운수사주소
  trvlRotId: string; //여행노선ID
  rotSqno: number; //노선순번
  alcnSqno: number; //배차순번
  deprDt: string; //출발일자
  deprTime: string; //출발시각
  deprTrmlNm: string; //출발터미널명
  mnppNm: string; //예약자명
  mnppMbphNo: string; //예약자휴대폰번호
  mnppMailAddr: string; //예약자이메일주소
  mrnpReqCtt: string; //예약요청내용
  trvlMrnpDtlList: TrvlDtlPsngData[]; //여행예약상세목록
}

/**
 * @description 플랫폼검표요청 request
 */
export interface ReqChkByPltf {
  tmgMbrsSno: string; //티머니GO회원일련번호
  trvlMrnpSno: string; //여행예약일련번호
  trvlTissuId: string; //여행발권ID
  chtkCancDvs: string; //검표취소구분코드
}
/**
 * @description 플랫폼검표요청 response
 */
export interface ResChkByPltf {
  tmgMbrsSno: string; //티머니GO회원일련번호
  trvlMrnpSno: string; //여행예약일련번호
  trvlTissuId: string; //여행발권ID(검표시만)
  chtkDtm: string; //검표일시(검표시만)
}

/**
 * @description 여행이용자정보수정 request
 */
export interface ReqModifyUserInfo {
  trvlMrnpDtlList: ReqUserInfoData[]; // 여행예약상세목록
}

/**
 * @description 여행이용자정보수정 > 여행예약상세목록
 */
export interface ReqUserInfoData {
  trvlMrnpSno: string; // 여행예약일련번호
  trvlMrnpSqno: number; // 여행예약순번
  psngFrnm?: string; // 승객이름
  psngMbphNo?: string; //승객휴대폰번호
  psngGndrCd?: string; //승객성별코드
}

/**
 * @description 여행결제상세정보조회 response
 */
export interface ResPaymentDtlInfo extends PaymentData, PaymentCancData {
  trvlMrnpSno: string; //여행예약일련번호
  mrnpDt: string; //예약일자
  mrnpTime: string; //예약시각
  trvlMrsStaCd: string; //여행예매상태코드
  trvlMrsStaNm: string; //여행예매상태명
  trvlPrdNm: string; //여행상품명
  busCacmNm: string; //버스운수사명
  busCacmTelNo: string; //버스운수사전화번호
  busCacmAddr: string; //버스운수사주소
  deprDt: string; //출발일자
  deprTime: string; //출발시각
  deprTrmlCd: string; //출발터미널코드
  deprTrmlNm: string; //출발터미널명
  trvlPymPrcgStaCd: string; //여행결제처리상태코드
  trvlPymPrcgStaNm: string; //여행결제처리상태명
  busTckKndNm: string;
  trvlMrnpDtlList: PymBusTckData[]; //여행예약상세목록
}
/**
 * @description 여행결제영수증조회 response
 */
export interface ResPaymentReceiptInfo {
  busCacmNm: string; //버스운수사명
  busCacmBrn: string; //버스운수사사업자등록번호
  allPymAmt: number; //총결제금액
  cardPymAmt: number; //카드결제금액
  evcpPymAmt: number; //이벤트쿠폰결제금액
  mlgPymAmt: number; //마일리지결제금액
  pymMnsNm: string; //결제수단명
  aprvNo: string; //승인번호
  aprvRgtDt: string; //승인등록일자
  aprvRgTime: string; //승인등록시각
  allCancRyAmt: number; //총취소환불금액
  cardPymCancAmt: number; //카드취소환불금액
  evcpPymCancAmt: number; //이벤트쿠폰결제취소금액
  mlgPymCancAmt: number; //마일리지결제취소금액
  allPnltAmt: number; //전체위약금액
  trvlMrnpSno: string; //여행예약일련번호
  trvlPrdNm: string; //여행상품명
  deprDt: string; //출발일자
  deprTime: string; //출발시각
  trvlRotId: string; //여행노선ID
  trvlPymPrcgStaCd: string; // 결제상태코드
  trvlPymPrcgStaNm: string; // 결제상태명
  trvlMrnpDtlList: PymBusTckData[]; //여행예약상세목록
}

/**
 * @description 여행취소정보조회 response
 */
export interface ResTrvlCancInfo extends Trvl {
  trvlMrnpSno: string; //여행예약일련번호
  deprDt: string; // 출발일자
  deprTime: string; // 출발시각
  pymDtm: string; // 결제일시
  pymMnsNm: string; // 결제수단명
  pymAmt: number; // 결제금액
  evcpSno: string; // 이벤트쿠폰일련번호
  busTckKndNm: string; // 버스티켓종류명
  reqCancYn: string; //취소요청여부
  refundContent: string; // 상품취소/환불내용
  trvlMrnpDtlList: TrvlCancDtlData[]; //여행예약상세목록
}

/**
 * @description 여행결제상세정보조회 > 여행예약상세목록
 */
export interface PymBusTckData {
  busTckKndCd: string;
  busTckKndNm: string; //버스티켓종류명
  busTckKndNum: number; //버스티켓종류수
}

/**
 * @description 여행취소정보조회 > 여행예약상세목록
 */
interface TrvlCancDtlData {
  trvlMrnpSno: string; // 여행예약일련번호
  trvlMrnpSqno: number; // 여행예약순번
  busTckKndNm: string; // 버스종류명
  busTckKndCd: string; // 버스종류코드
  trvlTissuId: string; // 여행발권ID
  psngFrnm: string; // 승객이름
  evcpUseYn: string; // 이벤트쿠폰사용여부
  tissuAmt: number; // 발권금액
  cancAmt: number; // 취소금액
  pnltAmt: number; // 위약금액
}

/**
 * @description 여행취소등록요청,여행결제취소요청 request
 */
export interface ReqTrvlCanc {
  trvlMrnpDtlList: TrvlCancRgtData[];
}
export interface TrvlCancRgtData {
  trvlMrnpSno: string; // 여행예약일련번호
  trvlMrnpSqno: number; // 여행예약순번
  trvlTissuId: string; // 여행발권ID
}

/**
 * @description 결제정보
 */
interface PaymentData {
  pymDtm: string; //결제일시
  pymAmt: number; //결제금액
  pmmtPymAmt: number; //결제수단결제금액
  tmgMlgPymAmt: number; //티머니GO마일리지결제금액
  evcpSno: string; //이벤트쿠폰일련번호
  evcpUseAmt: number; //이벤트쿠폰사용금액
  tmnyMlgPymAmt: number; //티머니마일리지결제금액
  pymKndCd: string; //결제종류코드
  pymKndNm: string; //결제종류명
  pymMnsNm: string; //결제수단명
}
/**
 * @description 결제취소정보
 */
interface PaymentCancData {
  pymCancDtm: string; //결제취소일시
  pymCancAmt: number; //결제취소금액
  pmmtCancAmt: number; //결제수단취소금액
  tmgMlgCancAmt: number; //티머니GO마일리지취소금액
  evcpUseCancAmt: number; //이벤트쿠폰사용취소금액
  pmmtBrkpAmt: number; //결제수단위약금액
  tmgMlgBrkpAmt: number; //티머니GO마일리지위약금액
  evcpBrkpAmt: number; //이벤트쿠폰위약금액
  cancBrkpAmt: number; // 취소위약금액
}

/**
 * @description 여행예약상세정보조회_여행예약상세목록
 */
export interface TrvlDtlPsngData {
  trvlTckStaCd: string; //여행티켓상태코드
  trvlTckStaNm: string; //여행티켓상태명
  busTckKndCd: string; //버스티켓종류코드
  busTckKndNm: string; //버스티켓종류명
  trvlTissuId: string; //여행발권ID
  pubDt: string; //발행일자
  pubShctTrmlCd: string; //발행단축터미널코드
  pubWndNo: string; //발행창구번호
  pubSno: number; //발행일련번호
  psngFrnm: string; // 승객이름
  psngMbphNo: string; //승객휴대폰번호
  psngGndrCd: string; //승객성별코드
  evcpUseYn: string; //이벤트쿠폰사용여부
  trvlChtkId: string; //여행검표ID
  chtkDtm: string; //검표일시
  trvlMrnpCancSqno: number; //여행예약취소순번
  satsNo: number; //좌석번호
  tissuAmt: number; //버스티켓종류금액
}
