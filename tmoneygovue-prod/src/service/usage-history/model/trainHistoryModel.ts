export interface TrainHistoryModel {
  // PNR 번호
  pnrNo: string;

  // 역무열차종별코드
  stlbTrnClsfCd1: string;

  // 역무열차종별코드명
  stlbTrnClsfNm1: string;

  // 열차그룹코드
  trnGpCd1: string;

  // 열차그룹코드명
  trnGpNm1: string;

  // 열차번호
  trnNo1: string;

  // 출발예발역코드
  dptRsStnCd1: string;

  // 출발예발역명
  dptRsStnNm1: string;

  // 출발일자
  dptDt1: string;

  // 출발시각
  dptTm1: string;

  // 도착예발역코드
  arvRsStnCd1: string;

  // 도착예발역명
  arvRsStnNm1: string;

  // 발권 국가유공자 인원수
  stlPsgNtalCnt1: number;

  // 발권 국가유공자 보호자 수
  stlPsgNtalGrdCnt1: number;

  // 발권 어른인원수
  stlPsgCnt1: number;

  // 발권 어린이인원수
  stlPsgCnt3: number;

  // 발권 경로인원수
  stlPsgCnt7: number;

  // 발권 동반유아인원수
  stlPsgCnt8: number;

  // 결제수단코드
  stlMnsCd: string;

  // 결제수단코드명
  stlMnsNm: string;

  // 결제취소일자
  pymCancDt: string;

  // 결제취소일시
  pymCancTm: string;

  // ex : 17 srt
  tranTckStaCd: string;

  // ex : 20231127000000002918
  tckSno: string;

  // 결제일자
  pymDt: string;

  // 결제일시
  pymTm: string;

  // 예약상태명
  rsvStsNm: string;

  // 결제요청일시
  pymCancReqDtm: string;
}

export interface TrainHistoryListModel {
  jrnyList: Array<TrainHistoryModel>;
}

export interface ReqTrainHistoryModel {
  pageNo: string;
  inqrMonth: string;
}
