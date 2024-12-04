/**
 * @description: 고장 장애 신고 상세 요청
 */
export interface reqReportDisabilityBikeListModel {
  utlzSvcDvsCd: string; // 공통코드 T:따릉이,D:타슈
  pageNo: number; // 페이지번호
}

/**
 * @description: 고장 장애 신고 상세 응답
 */
export interface resReportDisabilityBikeListModel {
  inqrCnt: number; //조회건수
  data: reportDisabilityBikeListModel; //상세
}

/**
 * @description: 고장 장애 신고 상세 목록
 */
export interface reportDisabilityBikeListModel {
  dtl: Array<reportDisabilityBikeModel>; //상세
}
/**
 * @description: 고장 장애 신고 상세
 */
export interface reportDisabilityBikeModel {
  utlzSvcDvsCd: string; // 공통코드 T:따릉이,D:타슈
  rgtDtm: string; //등록일시
  bcclNo: string; //자전거번호
  dclrDvsMltpVal: string; //신고장치다중값(타이어:ELB_001,체인:ELB_002,안장:ELB_003,페달:ELB_004,단말기:ELB_005,기타:ELB_006)
  dclrCtt: string; //신고내용
  dclrSno: string; //고장장애일련번호
}

/**
 * @description: 고장 장애 신고 생성 요청
 */
export interface reqReportDisabilityBikeRegistModel {
  utlzSvcDvsCd: string; // 이용서비스구분코드 (공통코드 T:따릉이,D:타슈)
  bcclNo: string; // 자전거번호
  dclrDvsMltpVal: string[]; //신고장치다중값 (타이어:ELB_001,체인:ELB_002,안장:ELB_003,페달:ELB_004,단말기:ELB_005,기타:ELB_006)
  dclrCtt: string; //신고내용
  dclrImgVal?: string; //고장장애신고이미지
  lttd?: string; //위도
  lngt?: string; //경도
}

/**
 * @description: 고장 장애 신고 생성 응답
 */
export interface resReportDisabilityBikeRegistModel {
  data?: ctrnYnModel;
  rspMsg?: string;
}

/**
 * @description: 고장 장애 신고 생성 결과
 */
export interface ctrnYnModel {
  ctrnYn: string; // 생성여부(Y/N)
  msg?: string;
}

/**
 * @description: 고장 장애 신고 삭제 요청
 */
export interface reqReportDisabilityBikeDeleteModel {
  utlzSvcDvsCd: string; // 이용서비스구분코드 (공통코드 T:따릉이,D:타슈)
  dclrSno: string; // 고장장애일련번호
}

/**
 * @description: 고장 장애 신고 삭제 응답
 */
export interface resReportDisabilityBikeDeleteModel {
  data: scsYnModel;
}

/**
 * @description: 고장 장애 신고 삭제 결과
 */
export interface scsYnModel {
  scsYn: string; //삭제여부(Y/N)
}

/**
 * @description: PM 대여 이력 요청(자전거)
 */
export interface reqBikeRentalHistoryModel {
  pmGrpDvsCd: string; // PM그룹구분코드 (공통코드 T:자전거, X:스쿠터, A:전체)
  utlzSvcDvsCd: string; // 이용서비스구분코드 (공통코드 T:따릉이, D:타슈, A:전체)
  pageNo: number; // 페이지번호
  termDvsCd: string; // 기간구분코드 (1주일:01,1개월:02,3개월:03)
  reportYn: string; // 고장신고목록여부
}

/**
 * @description: PM 대여 이력 응답(자전거)
 */
export interface resBikeRentalHistoryModel {
  data: bikeRentalHistoryListModel;
}

/**
 * @description: PM 대여 이력(자전거)
 */
export interface bikeRentalHistoryListModel {
  inqrNcnt: number; // 조회건수
  cumUtlzDrtm: number; // 누적이용시간(분)
  cumMvmnDist: number; // 누적이동거리(km)
  cumCrbnSvng: number; // 누적탄소절감(kg)
  cumConsumeCal: number; // 누적소모칼로리(kcal)
  dtl: Array<bikeRentalHistoryInfoModel>;
}

/**
 * @description: 이용내역(자전거)
 */
export interface bikeRentalHistoryInfoModel {
  utlzSvcDvsCd: string; // 이용서비스구분코드 (공통코드 T:따릉이, D:타슈)
  rntHstSno: string; // 대여이력일련번호
  utlzDrtm: number; // 이용시간(분)
  mvmnDist: number; // 이동거리(m)
  crbnSvng: number; // 탄소절감(kg)
  bcclNo: string; // 자전거번호
  rntPlc: string; // 대여장소 (번호. 명)
  rntDtm: string; // 대여일시
  rtrnPlc: string; // 반납장소 (번호. 명)
  rtrnDtm: string; // 반납일시
  utlzChnlCd: string; // 이용채널코드 (따릉이:CHN_001,티머니:CHN_002)
  addFeeYn: string; // 추가요금여부 (Y/N)
  consumeCal: number; // 소모칼로리(kcal)
  exceDrtm: number; // 초과시간(분)
  addFee: string; // 추가요금
}
