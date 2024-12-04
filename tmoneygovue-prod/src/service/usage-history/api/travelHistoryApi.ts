import { travelHttp, travelHttpOpt } from '@/utils/http/axios';
import type {
  ReqChkByPltf,
  ReqModifyUserInfo,
  ReqTrvlCanc,
  ReqTrvlMrnpDtlInfo,
  ResChkByPltf,
  ResPaymentDtlInfo,
  ResPaymentReceiptInfo,
  ResTrvlCancInfo,
  ResTrvlMrnpDtlInfo,
  ResUserInfoData
} from '@/service/usage-history/model/travelHistoryModel';
import type { TravelResult } from '@/utils/http/axios/types/axios';

const Api = {
  reqTrvlMrnpDtl: '/api/mrnp/v1/selectTrvlMrnpDtl.do',
  reqUserInfoList: '/api/mrnp/v1/selectTrvlMrnpDtlList.do',
  reqChtkByPltf: '/api/mrnp/v1/requestChtkByPltf.do',
  reqUpdatePassengerInfo: '/api/mrnp/v1/updateTrvlMrnpDtl.do',
  reqPaymentDtl: '/api/pym/v1/selectTrvlPymDtl.do',
  reqPaymentReceipt: '/api/pym/v1/selectTrvlPymRecp.do',
  reqPaymentCancInfo: '/api/pym/v1/selectTrvlCanc.do',
  reqTrvlCancRgt: '/api/pym/v1/requestTrvlCancRgt.do',
  reqTrvlPymCanc: '/api/pym/v1/requestTrvlPymCanc.do'
};

/**
 * @description 여행예약상세정보조회
 * @returns
 */
export const reqTrvlMrnpDtl = (reqParam: ReqTrvlMrnpDtlInfo): Promise<TravelResult<ResTrvlMrnpDtlInfo>> => {
  return travelHttpOpt({
    requestOptions: {
      errorMessageMode: 'none'
    }
  }).post({
    url: Api.reqTrvlMrnpDtl,
    params: reqParam
  });
};
/**
 * @description 여행이용자정보목록조회
 * @returns
 */
export const reqUserInfoList = (reqParam: { trvlMrnpSno: string }): Promise<ResUserInfoData[]> => {
  return travelHttp.post({
    url: Api.reqUserInfoList,
    params: reqParam
  });
};

/**
 * @description 플랫폼검표요청
 * @param reqParam
 * @returns
 */
export const reqChkByPltf = (reqParam: ReqChkByPltf): Promise<ResChkByPltf> => {
  return travelHttpOpt({
    requestOptions: {
      errorMessageMode: 'none'
    }
  }).post({
    url: Api.reqChtkByPltf,
    params: reqParam
  });
};

/**
 * @description 여행이용자정보수정
 * @param reqParam
 * @returns
 */
export const reqUpdatePassengerInfo = (reqParam: ReqModifyUserInfo): Promise<TravelResult> => {
  return travelHttp.post({
    url: Api.reqUpdatePassengerInfo,
    params: reqParam
  });
};

/**
 * @description 여행결제상세정보조회
 * @param trvlMrnpSno 여행예약일련번호
 * @returns
 */
export const reqPaymentDtl = (reqPram: { trvlMrnpSno: string }): Promise<ResPaymentDtlInfo> => {
  return travelHttp.post({
    url: Api.reqPaymentDtl,
    params: reqPram
  });
};

/**
 * @description 여행결제영수증조회
 * @param trvlMrnpSno 여행예약일련번호
 * @returns
 */
export const reqPaymentReceipt = (reqPram: { trvlMrnpSno: string }): Promise<ResPaymentReceiptInfo> => {
  return travelHttp.post({
    url: Api.reqPaymentReceipt,
    params: reqPram
  });
};

/**
 * @description 여행취소정보조회
 * @param trvlMrnpSno 여행예약일련번호
 * @returns
 */
export const reqPaymentCancInfo = (reqPram: { trvlMrnpSno: string }): Promise<TravelResult<ResTrvlCancInfo>> => {
  return travelHttpOpt({
    requestOptions: {
      errorMessageMode: 'none'
    }
  }).post({
    url: Api.reqPaymentCancInfo,
    params: reqPram
  });
};

/**
 * @description 여행취소등록요청
 * @param reqPram [{ 여행예약일련번호, 여행예약순번, 여행발권ID }]
 * @returns
 */
export const reqTrvlCancRgt = (reqPram: ReqTrvlCanc): Promise<TravelResult> => {
  return travelHttpOpt({
    requestOptions: {
      errorMessageMode: 'none'
    }
  }).post({
    url: Api.reqTrvlCancRgt,
    params: reqPram
  });
};

/**
 * @description 여행결제취소요청
 * @param reqPram [{ 여행예약일련번호, 여행예약순번, 여행발권ID }]
 * @returns
 */
export const reqTrvlPymCanc = (reqPram: ReqTrvlCanc): Promise<TravelResult> => {
  return travelHttpOpt({
    requestOptions: {
      errorMessageMode: 'none'
    }
  }).post({
    url: Api.reqTrvlPymCanc,
    params: reqPram
  });
};
