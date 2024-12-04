import { defHttp } from '@/utils/http/axios';
import type { ResponseInfo } from '@/service/payment/model/responseModel';
import type { RequestPaymentManagement } from '@/service/payment/model/requestModel';

enum Api {
  deleteMemberBizPay = '/api/pym/v2/reqBzpyLnkgCanc'
}

/**
 * @description IO-MID2-O-0321 티머니 비즈페이 등록 해제
 * @returns {Promise<ResponseInfo>}
 */
export const deleteMemberBizPay = (params: RequestPaymentManagement): Promise<ResponseInfo> => {
  //jsonServe
  return defHttp.post({
    params: params,
    url: Api.deleteMemberBizPay
  });
};
