/**
 * @description: BusHistoryModel
 */

export interface ReqBusHistoryModel {
  rideStatCd: string; //승차상태코드 (0:전체, 1:결제, 2:취소)
  inqrCtVal: string; //조회기준 (T:결제일 기준, S:출발일 기준)
  inqrSttDt: string; //조회시작일자(yyyyMMdd)
  inqrEndDt: string; //조회종료일자(yyyyMMdd)
  jrnyYn: string; //저니여부(Y: 남은 여정,N: 전체)
  inqrMonth: string; //요청일시: YYYYMM("202406")
}

export interface BusHistoryModel {
  LIN_SNO: string; //노선일련번호
  USR_SNO: string;
  DAY2: string; //출발일 오전/오후
  BUS_DVS_CD: string; //고속, 시외 구분
  CNT: number; //발권 개수
  FR_NAM: string; //출발 (서울경부)
  TO_NAM: string; //도착 (부산)
  STATUS: string; //상태
  TIM_DTE: string; //출발일시(20210324)
  DAY: string;
  TIM_TIM: string;
  CAL_DTE: string; // 결제일시(ex:2021032041740)
  CAL_DAY: string; // 결제일시(ex:수)
  BD_COD_NAM: string; // 등급(프리미엄)
  COR_NAM: string; // 운행회사(삼화고속)
  SORT_DTE: string;
  BMG_COD: string; //승차상태코드 (1.발권, 2.검표, 4.취소, 5.도착)
  TER_SFR: string;
  FR_SYN_YN: string;
  FR_SYN_TER_NAM: string;
  TO_SYN_YN: string;
  TO_SYN_TER_NAM: string;
}

export interface BusHistoryListModel {
  busUtlzList: Array<BusHistoryModel>;
}
