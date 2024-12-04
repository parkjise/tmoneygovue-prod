// 쿠폰 목록 Response 모델
export interface CouponModel {
  //쿠폰정의일련번호
  cpnDfntSno: string;

  //쿠폰일련번호
  cpnSno: string;

  //쿠폰유형코드
  cpnTypCd: string;

  //쿠폰유형명
  cpnTypNm: string;

  //쿠폰명
  cpnNm: string;

  //쿠폰상태코드
  cpnStaCd: string;

  //쿠폰상태명
  cpnStaNm: string;

  //이용서비스구분코드
  utlzSvcDvsCd: string;

  //이용서비스구분명
  utlzSvcDvsNm: string;

  //발급시작일시
  issuSttDtm: string;

  //발급종료일시
  issuEndDtm: string;

  //사용시작일시
  useSttDtm: string;

  //사용종료일시
  useEndDtm: string;

  //사용가능요일
  useWkdyVal: string;

  //사용가능시간문자열
  useTimeStr: string;

  //할인유형코드
  dcKndCd: string;

  //할인율
  dcRt: string;

  //할인금액
  dcAmt: string;

  //최대할인금액
  maxDcAmt: string;

  //최소결제금액
  minPymAmt: string;

  //할인내용
  dcCtt: string;

  //발급주체코드
  issuSbjcCd: string;

  //발행사ID
  crpcId: string;

  //발행사명
  crpcNm: string;

  //조건사용여부
  cndtUseYn: string;

  //조건키값
  cndtKeyVal: string;

  //조건내용
  cndtCtt: string;

  //선물가능여부
  giftPsbYn: string;

  //쿠폰배경이미지값
  cpnImgVal: string;

  //쿠폰배경이미지패스
  cpnImgPath: string;

  //GO쿠폰여부
  goCpnYn: string;

  //할인대상
  dcTgt: string;

  //사용가능잔여일수
  rmnDtStr: string;

  //적용서비스값
  adptSvcVal: string;

  //적용서비스코드 목록
  adptSvcCdList: Array<string>;

  //적용서비스명 목록
  adptSvcNmList: Array<string>;
}

//쿠폰목록 모델
export interface CouponListModel {
  //보유쿠폰 목록
  psnCpnList: Array<CouponModel>;
  //발급가능 쿠폰 목록
  issuCpnList: Array<CouponModel>;
}

//지난쿠폰 목록 Response 모델
export interface PastCouponListModel {
  //지난쿠폰 목록
  pastCpnList: Array<CouponModel>;
}

//쿠폰등록 Response 모델
export interface ResRegistCouponModel {
  rspMsg: string;
  rspCd: string;
}

//쿠폰 선물하기 화면 Response 모델
export interface CouponDetailInfoModel {
  rstCd: string;
  rstMsg: string;
  cpnDtlInfo: CouponModel;
}

//쿠폰 선물하기 Request 모델
export interface RequestCouponGiftModel {
  //쿠폰일련번호
  cpnSno: string;
  //휴대전화 번호
  mbphNo: string;
  //메시지
  senfMsgCtt: string;
}

//쿠폰 선물하기 Response 모델
export interface RespopnseCouponGiftModel {
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
