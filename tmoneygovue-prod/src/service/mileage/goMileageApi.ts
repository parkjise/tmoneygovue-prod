import { defHttp } from '@/utils/http/axios';
import type {
  RequestMileageExchange,
  RequestMileageGuide,
  RequestMileageHistory,
  RequestMileageInfo,
  ResponseMileageExchange,
  ResponseMileageGuide,
  ResponseMileageHistoryList,
  ResponseMileageInfo,
  ResponseMileageExpiredModel
} from './model/goMileageModel';

enum Api {
  inqrMbrsMlgList = '/api/mlg/v2/inqrMbrsMlgList',
  inqrGTTMlgSwtcBfrsInf = '/api/mlg/v2/inqrGTTMlgSwtcBfrsInf',
  requestSearchTMlg = '/api/mlg/v2/requestSearchTMlg', // 원래 mlg/v2/inqrGTTMlgSwtcBfrsInf랑 같은 api임
  reqGTTMlgSwtc = '/api/mlg/v2/reqGTTMlgSwtc',
  inqrWebViewStupInfo = '/api/app/v2/inqrWebViewStupInfo',
  inqrMileageExpiredYn = '/api/mlg/v2/inqrMlgExpiYn'
}

/**
 * @description: 2.34 - GO마일리지 사용 이력
 */
export const getMileageHistory = (params: RequestMileageHistory): Promise<ResponseMileageHistoryList> => {
  return defHttp.post({
    url: Api.inqrMbrsMlgList,
    params
  });
};

/**
 * @description: 2.52 - 마일리지 전환 사전정보 조회
 */
// export const getGTTMlgBeforeInfo = (moappMbrsSno: string): Promise<ResponseMileageInfo> => {
//   return defHttp.post({
//     url: Api.inqrGTTMlgSwtcBfrsInf,
//     params: { moappMbrsSno }
//   });
// };

/**
 * @description: 2.52 - 마일리지 전환 사전정보 조회
 */
export const getGTTMlgBeforeInfo = (params: RequestMileageInfo): Promise<ResponseMileageInfo> => {
  return defHttp.post({
    url: Api.inqrGTTMlgSwtcBfrsInf,
    params
  });
};

/**
 * @description: 2.52 - 마일리지 전환 사전정보 조회(T마일리지 조회하기 버튼)
 */
export const getSearchTMlg = (params: RequestMileageInfo): Promise<ResponseMileageInfo> => {
  return defHttp.post({
    url: Api.inqrGTTMlgSwtcBfrsInf,
    params
  });
};

/**
 * @description: 2.52 - 마일리지 전환 신청
 */
export const getMileageExchange = (params: RequestMileageExchange): Promise<ResponseMileageExchange> => {
  return defHttp.post({
    url: Api.reqGTTMlgSwtc,
    params
  });
};

/**
 * @description: 2.52 - GO마일리지 적립 및 사용안내
 */
export const getMileageGuide = (params: RequestMileageGuide): Promise<ResponseMileageGuide> => {
  return defHttp.post({
    url: Api.inqrWebViewStupInfo,
    params
  });
};

/**
 *
 */
export const inqrMileageExpiredYn = (): Promise<ResponseMileageExpiredModel> => {
  return defHttp.post({
    url: Api.inqrMileageExpiredYn
  });
};
