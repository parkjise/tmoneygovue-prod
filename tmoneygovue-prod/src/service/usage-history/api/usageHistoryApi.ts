import { defHttp, mobilityHttp, ondataxiHttp, tmoney1Http, travelHttp, ondataxiHttpOpt } from '@/utils/http/axios';
import type {
  PublicTransportHistoryListModel,
  RequestPublicTransportHistoryModel
} from '@/service/usage-history/model/publicTransportModel';
import type { BusHistoryListModel, ReqBusHistoryModel } from '@/service/usage-history/model/busHistoryModel';
import type { ReqTaxiHistoryModel, TaxiHistoryListModel } from '@/service/usage-history/model/taxiHistoryModel';
import type { ReqMyCallModel, ResMyCallModel } from '@/service/usage-history/model/taxiModel';
import type {
  BicycleVoucherHistoryListModel,
  BikeScooterDetailDataModel,
  BikeScooterDtaModel,
  ReqBicycleVoucherHistoryModel,
  ReqBikeScooterDetailModel,
  ReqBikeScooterModel
} from '@/service/usage-history/model/bikeScooterModel';
import type { ReqTrainHistoryModel, TrainHistoryListModel } from '@/service/usage-history/model/trainHistoryModel';
import type { AirplaneHistoryListModel, ReqAirplaneHistoryModel } from '@/service/usage-history/model/airplaneModel';
import type {
  CarRentalHistoryListModel,
  ReqCarRentalHistoryModel
} from '@/service/usage-history/model/carRentalHistoryModel';
import type { TrvlHistoryModel } from '@/service/usage-history/model/travelHistoryModel';

enum Api {
  //대중교통
  publicTransportHistory = '/api/mbrs/v2/inqrMbrsPbtrUtlzList',

  //버스
  busHistory = '/api/mbrs/v2/inqrMbrsBusUtlzList',

  //택시
  taxiHistory = '/ondataxi/newCallHistoryV2',
  addMycall = '/ondataxi/addMyCallByCallKey',
  deleteMycall = '/ondataxi/deleteMyCall',

  //공공자전거/전기자전거/킥보드
  bikeScooterDetail = '/api/pm/cmn/inqrPmIntgRntHstDtlInf',
  bikeVoucherHistory = '/api/pm/poli/inqrBcclVchrPrchHstInf',
  bikeScooterHistory = '/api/pm/cmn/inqrPmIntgRntHstInf',

  //기차
  trainHistoryList = '/api/r/cent/v1/selectTicketHisList',

  //항공
  airplaneHistory = '/api/u/cent/v1/selectTicketHisList',

  //렌트카
  carRentHistory = '/api/l/cent/v1/selectRsrvHisList',

  // 여행
  trvlHistory = '/api/mrnp/v1/selectRsrvHisList.do'
}

/**
 * 대중교통 이용내역 목록 조회
 * @param data
 */
export const getPublicTransportHistory = (
  data: RequestPublicTransportHistoryModel
): Promise<PublicTransportHistoryListModel> => {
  return defHttp.post({
    url: Api.publicTransportHistory,
    data: {
      pageNo: data.pageNo,
      inqrMonth: data.inqrMonth,
      trcrSno: data.trcrSno
    }
  });
};

/**
 * 버스 이용내역 목록 조회
 * @param data
 */
export const getBusHistory = (data: ReqBusHistoryModel): Promise<BusHistoryListModel> => {
  return defHttp.post({
    url: Api.busHistory,
    data: {
      rideStatCd: data.rideStatCd,
      inqrCtVal: data.inqrCtVal,
      inqrSttDt: data.inqrSttDt,
      inqrEndDt: data.inqrEndDt,
      jrnyYn: data.jrnyYn,
      inqrMonth: data.inqrMonth
    }
  });
};

/**
 * 택시 이용내역 목록 조회
 * @param data
 */
export const getTaxiHistory = (data: ReqTaxiHistoryModel): Promise<TaxiHistoryListModel> => {
  return ondataxiHttp.post({
    url: Api.taxiHistory,
    data: {
      pageCount: data.pageCount,
      currentPage: data.currentPage,
      inqrMonth: data.inqrMonth
    }
  });
};

/**
 * 택시 즐겨찾기 추가
 * @param data
 */
export const addMyCall = (data: ReqMyCallModel): Promise<ResMyCallModel> => {
  return ondataxiHttp.post({
    url: Api.addMycall,
    data: {
      taxiType: data.taxiType,
      callKey: data.callKey
    }
  });
};

/**
 * 택시 즐겨찾기 취소
 * @param data
 */
export const deleteMyCall = (data: ReqMyCallModel): Promise<ResMyCallModel> => {
  return ondataxiHttp.post({
    url: Api.deleteMycall,
    data: {
      taxiType: data.taxiType,
      associatedCallKey: data.associatedCallKey
    }
  });
};

/**
 * 공공자전거(따릉이 & 타슈) | 자전거/킥보드 이용내역 조회
 * @param data
 */
export const getBikeScooterHistory = (data: ReqBikeScooterModel): Promise<BikeScooterDtaModel> => {
  return tmoney1Http.post({
    url: Api.bikeScooterHistory,
    data: {
      pmGrpDvsCd: data.pmGrpDvsCd,
      utlzSvcDvsCd: data.utlzSvcDvsCd,
      termDvsCd: data.termDvsCd,
      pageNo: data.pageNo,
      inqrMonth: data.inqrMonth
    }
  });
};

/**
 * 공공자전거 이용권 결제내역 조회
 * @param data
 */
export const getBicycleVoucherHistory = (
  data: ReqBicycleVoucherHistoryModel
): Promise<BicycleVoucherHistoryListModel> => {
  return tmoney1Http.post({
    url: Api.bikeVoucherHistory,
    data: {
      utlzSvcDvsCd: data.utlzSvcDvsCd,
      reqDtm: data.reqDtm
    }
  });
};

/**
 * 킥보드 이용내역 상세 <- 브릿지 호출 예정
 * @param data
 */
export const getBikeScooterHistoryDetail = (data: ReqBikeScooterDetailModel): Promise<BikeScooterDetailDataModel> => {
  return tmoney1Http.post({
    url: Api.bikeScooterDetail,
    data: {
      pmGrpDvsCd: data.pmGrpDvsCd,
      rntHstSno: data.rntHstSno,
      utlzSvcDvsCd: data.utlzSvcDvsCd
    }
  });
};

/**
 * 기차 이용내역 목록 조회
 * @param data
 */
export const getTrainHistoryList = (data: ReqTrainHistoryModel): Promise<TrainHistoryListModel> => {
  return mobilityHttp.post({
    url: Api.trainHistoryList,
    data: {
      pageNo: data.pageNo,
      inqrMonth: data.inqrMonth
    }
  });
};

/**
 * 항공 이용내역 목록 조회
 * @param data
 */
export const getAirplaneHistoryList = (data: ReqAirplaneHistoryModel): Promise<AirplaneHistoryListModel> => {
  return mobilityHttp.post({
    url: Api.airplaneHistory,
    data: {
      pageNo: data.pageNo,
      inqrMonth: data.inqrMonth
    }
  });
};
/**
 * 렌트카 이용내역 목록 조회
 * @param data
 */
export const getCarRentHistoryList = (data: ReqCarRentalHistoryModel): Promise<CarRentalHistoryListModel> => {
  return mobilityHttp.post({
    url: Api.carRentHistory,
    data: {
      pageNo: data.pageNo,
      inqrMonth: data.inqrMonth
    }
  });
};
/**
 * 여행 이용내역 목록 조회
 */
export const getTrvlHistoryList = (inqrMonth: string): Promise<TrvlHistoryModel[]> => {
  return travelHttp.post({
    url: Api.trvlHistory,
    params: { inqrMonth: inqrMonth }
  });
};
