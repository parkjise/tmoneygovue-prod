/**
 * @description: BikeScooterModel
 */

export interface ReqBikeScooterModel {
  pmGrpDvsCd: string; //PM그룹구분코드 (T:자전거, X:스쿠터)
  utlzSvcDvsCd: string; //이용서비스구분코드
  termDvsCd: string; //기간구분코드 01,03,06 1개월 3개월 6개월
  pageNo: number; //페이지 번호
  inqrMonth: string; //월별조회를 위한 전달값
}

//이용권 사용 내역
export interface ReqBicycleVoucherHistoryModel {
  reqDtm: string;
  utlzSvcDvsCd: string;
}

export interface BikeScooterModel {
  utlzSvcDvsCd: string; //이용서비스구분코드
  rntHstSno: string; //대여 일련 번호
  utlzDrtm: string; //이용 시간 (단위:분 or 초)
  mvmnDist: string; //이동거리 (단위:meters)
  crbnSvng: string; //탄소절감 (단위:kilograms)
  bcclNo: string; //자전거 번호
  rntPlc: string; //대여 대여소 이름
  rntDtm: string; //대여 시간
  rtrnPlc: string; //반납 대여소 이름
  rtrnDtm: string; //반납 시간
  utlzChnlCd: string; //대여 플랫폼 (따릉이/티머니 등)
  addFeeYn: string; //추가요금여부
  consumeCal: string; //칼로리
  exceDrtm: string;
  addFee: string; //추가요금
  rntSctrId: string;
  pymDtm: string;
  mvmnTime: string;
  pymFee: string;
  pymYn: string;
  useTime: string;
  pauseTime: string;
  useFee: string;
  pymMnsIdnnVal: string;
  atlPymAmt: string;
  cpnUseAmt: string;
  tmgMlgUseAmt: string;
  rntReqSno: string;
}

export interface BikeScooterDtaModel {
  data: {
    inqrNcnt: number;

    //킥보드
    totMvmnCnt?: number;
    totMvmnDist?: number;
    totMvmnTime?: string;

    //공공자전거
    cumUtlzDrtm?: number;
    cumMvmnDist?: number;
    cumCrbnSvng?: number;
    cumConsumeCal?: number;

    dtl: Array<BikeScooterModel>;
  };
}

export interface BicycleVoucherHistoryModel {
  pymStaCd: string;
  rfndSeq: string;
  cpnDvsNm: string;
  cpnNm: string;
  pymMnsCd: string;
  pymSno: string;
  useSttDtm: string;
  pymAprvDtm: string;
  pymChnlCd: string;
  ryPsbYn: string;
  dcFeeYn: string;
  useEndDtm: string;
  cpnDvsCd: string;
  cpnUseYn: string;
}

export interface BicycleVoucherHistoryListModel {
  data: {
    inqrNcnt: number;
    dtl: Array<BicycleVoucherHistoryModel>;
  };
}

export interface BikeScooterDetailDataModel {
  data: BikeScooterDetailModel;
}

export interface BikeScooterDetailModel {
  //이용서비스구분코드
  utlzSvcDvsCd: string;

  //대여이력일련번호
  rntHstSno: string;

  //사용ID
  rntSctrId: string;

  //대여일시(YYYY.MM.DD HH:mm:ss)
  rntDtm: string;

  //반납일시(YYYY.MM.DD HH:mm:ss)
  rtrnDtm: string;

  //이동거리(m)
  mvmnDist: number;

  //이동시간(HH:mm:ss)
  mvmnTime: string;

  //결제금액
  pymFee: string;

  //결제여부
  pymYn: string;

  //이용시간(HH:mm:ss)
  useTime: string;

  //일시잠금(HH:mm:ss)
  pauseTime: string;

  //이용금액
  useFee: string;

  //반납추가금액
  addFee: string;

  //복합결제수단명
  pymMnsIdnnVal: string;

  //실제결제금액
  atlPymAmt: number;

  //쿠폰할인금액
  cpnUseAmt: number;

  //티머니GO마일리지사용금액
  tmgMlgUseAmt: number;

  //결제일시
  pymDtm: string;
}

export interface ReqBikeScooterDetailModel {
  //PM그룹구분코드	공통코드 : T:자전거, X:스쿠터
  pmGrpDvsCd: string;

  /*이용서비스구분코드
    T	따릉이(자전거)
    D	타슈(자전거)
    E	지쿠터(자전거)
    X	씽씽(스쿠터)
    I	킥고잉(자전거)
    G	지쿠터(스쿠터)
    K	킥고잉(스쿠터)
  */
  utlzSvcDvsCd: string;

  //대여이력일련번호
  rntHstSno: string;
}
