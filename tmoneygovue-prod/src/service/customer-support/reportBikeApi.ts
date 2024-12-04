import { tmoney1Http } from '@/utils/http/axios';
import type {
  reqReportDisabilityBikeListModel,
  resReportDisabilityBikeListModel,
  reqReportDisabilityBikeRegistModel,
  resReportDisabilityBikeRegistModel,
  reqReportDisabilityBikeDeleteModel,
  resReportDisabilityBikeDeleteModel,
  reqBikeRentalHistoryModel,
  resBikeRentalHistoryModel
} from '@/service/customer-support/model/reportBikeModel';

enum Api {
  inqrTrblDsblDclrDtlInf = '/api/pm/cmn/inqrTrblDsblDclrDtlInf',
  saveTrblDsblDclrInf = '/api/pm/cmn/saveTrblDsblDclrInf',
  saveTrblDsblDclrDelInf = '/api/pm/cmn/saveTrblDsblDclrDelInf',
  inqrPmIntgRntHstInf = '/api/pm/cmn/inqrPmIntgRntHstInf'
}

/**
 * @description: getReportDisabilityBikeList
 * 고장 장애 신고 상세 요청
 */
export const getReportDisabilityBikeList = (
  param: reqReportDisabilityBikeListModel
): Promise<resReportDisabilityBikeListModel> => {
  return tmoney1Http.post({
    url: Api.inqrTrblDsblDclrDtlInf,
    params: param
  });
};
/**
 * @description: registReportDisabilityBike
 * 고장 장애 신고 생성 요청
 */
export const registReportDisabilityBike = (
  param: reqReportDisabilityBikeRegistModel
): Promise<resReportDisabilityBikeRegistModel> => {
  return tmoney1Http.post({
    url: Api.saveTrblDsblDclrInf,
    params: param
  });
};
/**
 * @description: deleteReportDisabilityBike
 * 고장 장애 신고 삭제 요청
 */
export const deleteReportDisabilityBike = (
  param: reqReportDisabilityBikeDeleteModel
): Promise<resReportDisabilityBikeDeleteModel> => {
  return tmoney1Http.post({
    url: Api.saveTrblDsblDclrDelInf,
    params: param
  });
};
/**
 * @description: getBikeRentalHistory
 * 대여 이력 요청(자전거)
 */
export const getBikeRentalHistory = (param: reqBikeRentalHistoryModel): Promise<resBikeRentalHistoryModel> => {
  return tmoney1Http.post({
    url: Api.inqrPmIntgRntHstInf,
    params: param
  });
};
