export interface ReqTaxiHistoryModel {
  //페이지별 콜 개수
  pageCount: string;
  //현재 페이지 (0부터 시작)
  currentPage: number;
  //정렬 기준 달 (ex. 202406 | null일 경우 기존 방식대로 전달)
  inqrMonth: string;
}

export interface TaxiHistoryListModel {
  callHistoryInfoList: Array<TaxiHistoryModel>;
}

export interface TaxiHistoryModel {
  //서비스 타입 ONDA: 온다 IM: 아이엠 TADA: 타다
  serviceType: string;
  //IM, 타다용 플랫폼 센터 전달용 serialId
  serialId: string;
  //콜 키
  callKey: string;
  //결제 실패여부
  paymentFailed: boolean;
  //승차요청시 결제수단
  askPayTypeString: string;
  //미수금액
  receivableAmount: number;
  //접수날짜 (ex) 2020-04-09 (목)
  regdate: string;
  //출발지 전체주소 (ex) 서울특별시 은평구 진관길 73 진관사
  start: string;
  //출발지 주소
  startAddress: string;
  //목적지 주소
  endAddress: string;
  //목적지 전체주소
  end: string;
  //승차시분 (HH:mm)
  getOnTime: string;
  //하차시분 (HH:mm)
  getOffTime: string;
  //하차지 명칭
  getoffAddr: string;
  //출발지 POI이름
  startPoiName: string;
  //목적지 POI이름
  endPoiName: string;
  //기사 휴대폰 번호 (승차 후 24시간까지만 유지되고 이후 표시하지 않음)
  phoneNumber: string;
  //택시 차량 번호
  carNumber: string;
  //기사님성함
  driverName: string;
  //콜비 (원)
  callFee: string;
  //대상금액
  payAmount: string;
  //할인금액
  dcAmount: string;
  //쿠폰으로 할인된금액
  couponDcAmount: string;
  //마일리지로 할인된금액
  mileageDcAmount: string;
  //추가요금(통행료 포함)
  addFee: string;
  //기사평가 버튼 표출여부
  driverEvaluationDisplay: boolean;
  //전화번호노출여부
  callViewYN: string;
  //결제종류 03 : 현장카드결제 04 : 현장현금결제 21 : 티머니 비즈페이 22 : 티머니페이 23 : 페이코 /카드 IssuerCd : 카드자동결제 25 : 토스페이
  payTypeCode: string;
  //결제타입 문구
  payTypeString: string;
  //택시 종류 N : 일반 M : 모범 P : 장애인 고급택시
  taxiType: string;
  //택시 명칭
  taxiName: string;
  //전화번호 표출 유무
  showPhoneNumber: boolean;
  //마이콜 여부 Y : 마이콜 N : 마이콜 아님
  isMyCall: string;
  //결제시간 (YYYMMddHHmmss)
  payDtm: string;

  //미수금중 결제완료된 데이터 리스트 (2개일경우에만 보여주는 시나리오기떄문에 2개가아닐 경우 null반환)
  unpaidCompleteList: Array<UnpaidComplete>;
  //결제내역 각각(운행료, 호출료) 리스트(콜키당 Array한개씩)
  payDivList: Array<PayDiv>;

  isForOtherRider: boolean; //불러주기콜 여부
  riderMbphNo: string; //불러주기콜 탑승자 휴대전화 (불러주기콜 여부가 true인 경우 필수)
  riderName: string; //불러주기콜 탑승자명
}

export interface UnpaidComplete {
  paymentAmount: number; //미수금 결제완료된 금액
  paymentDate: string; //결제일시 표출문구(yyyy-MM-dd HH:mm)
  paymentTypeNm: string; //결제수단 문구
  failedPayTypeDiv: string; //결제실패타입구분(R: 이용요금결제 , C : 호출료)
}

export interface PayDiv {
  paymentDivDate: string; //결제일시 표출문구(YYYY-m-d HH:mm)
  payDivAmount: number; //결제금액(할인까지 적용되어 결제된 금액)
  paymentDivTypeNm: string; //결제수단 문구
  payTypeDiv: string; //결제타입구분(R: 이용요금결제 , C : 호출료)
}
