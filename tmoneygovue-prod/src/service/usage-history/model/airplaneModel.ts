export interface AirplaneHistoryModel {
  /**
   * 여정일련번호
   */
  jrnySqNo: string;

  /**
   * 여정상태명
   */
  jrnySttName: string;

  /**
   * 출발지공항명
   */
  deptAirportName: string;

  /**
   * 도착지공항명
   */
  arrAirportName: string;

  /**
   * 출발일시
   */
  departureDate: string;

  /**
   * 성인탑승객수
   */
  adtCnt: number;

  /**
   * 소아탑승객수
   */
  chdCnt: number;

  /**
   * 유아탑승객수
   */
  infCnt: number;

  /**
   * 좌석등급
   */
  cabinClass: string;

  /**
   * 결제일시
   */
  pymDtm: string;

  /**
   * 취소일시
   */
  cancDtm: string;
}

export interface AirplaneHistoryListModel {
  jrnyList: Array<AirplaneHistoryModel>;
}

export interface ReqAirplaneHistoryModel {
  pageNo: string;
  inqrMonth: string;
}
