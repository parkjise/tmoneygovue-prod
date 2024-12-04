import { defHttp, tmoney1Http } from '@/utils/http/axios';
import type {
  RequestTransferHistoryComplain,
  ResponseTransferDiscountHistory,
  ResponseTransferHistoryDetail,
  ResponseRewardMainInfo,
  ResponseTransferHistoryComplain
} from './model/transferModel';

enum Api {
  inqrTrtdMainInfo = '/api/mlg/v2/inqrTrtdMainInfo',
  inqrMbrsTrtdHstList = '/api/mlg/v2/inqrMbrsTrtdHstList',
  inqrTrtdHstDtlList = '/api/mlgRfnd/v1/inqrTrtdHstDtlList', // https://tiaapid.tmoney.co.kr:20318
  crtnMbrsCvcpInfo = '/api/mbrs/v2/crtnMbrsCvcpInfo'
}

/**
 * @description: IO-MID2-O-0148 – 환승 할인 메인 조회
 */
export const getTransferGuide = (inqrDtm: string): Promise<ResponseRewardMainInfo> => {
  return defHttp.post({
    url: Api.inqrTrtdMainInfo,
    params: { inqrDtm }
  });
};

/**
 * @description: IO-MID2-O-0149 – 회원 환승 할인 내역 조회
 */
export const getTransferDiscountHistory = (pageNo: number): Promise<ResponseTransferDiscountHistory> => {
  return defHttp.post({
    url: Api.inqrMbrsTrtdHstList,
    params: { pageNo }
  });
};

/**
 * @description: 회원 환승 할인 상세 내역 조회
 */
export const getTransferHistoryDetail = (trdDt: string): Promise<ResponseTransferHistoryDetail> => {
  return tmoney1Http.post({
    url: Api.inqrTrtdHstDtlList,
    params: { trdDt }
  });
};

/**
 * @description: 환승 내역 문의
 */
export const getTransferHistoryComplain = (
  params: RequestTransferHistoryComplain
): Promise<ResponseTransferHistoryComplain> => {
  return defHttp.post({
    url: Api.crtnMbrsCvcpInfo,
    params
  });
};
