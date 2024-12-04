/**
 * @description: 환승 할인 메인 조회
 */
export interface ResponseRewardMainInfo {
  scsYn?: string; // 성공여부(Y/N)
  trtdAcmtAmt?: number; // 회원환승리워드누적금액
  trtdTgtYn?: string; // 환승할인대상여부(Y/N)
  trcrRgtYn?: string; // 교통카드등록여부(Y/N)
  trtdCtt?: string; // 환승할인내용
  trtdImgPathVal?: string; // 환승할인이미지경로값
  trtdGdImgPathVal?: string; // 환승할인가이드이미지경로값
}

/**
 * @description: 회원 환승 할인 내역 조회
 */
export interface discountTransferInfo {
  trtdDt: string; // 거래일자(YYYY.MM.DD)
  trtdAmt: number; // 환승할인금액
  trtdRstVal: string; // 환승할인결과코드
  trtdRstNm: string; // 환승할인결과명
}
export interface ResponseTransferDiscountHistory {
  trtdList: Array<discountTransferInfo>;
  msg: string;
  scsYn: string;
}

/**
 * @description: 환승 내역 문의 조회
 */
export interface transferHistoryDetail {
  mntnNm: string; // 교통수단그룹명
  trdTypNm: string; // 거래유형명
  trdDrtm: string; // 거래시간(HH:mm:ss)
}
export interface ResponseTransferHistoryDetail {
  trdList: Array<transferHistoryDetail>;
}

/**
 * @description: 환승 내역 문의
 */
export interface RequestTransferHistoryComplain {
  cvcpCtt: string; // 민원내용
  cvcpTypCd: string; // 23: 이용내역/결제내역
  cvcpTtlNm: string; // 민원제목명
}
export interface ResponseTransferHistoryComplain {
  msg: string;
  scsYn: string;
}
