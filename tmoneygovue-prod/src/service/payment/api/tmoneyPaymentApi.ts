import { tmoney1Http } from '@/utils/http/axios';
import type { ResponseInfo } from '@/service/payment/model/responseModel';
import type { RequestDeleteTmpy } from '@/service/payment/model/requestModel';

enum Api {
  deleteMemberTMoneyPay = '/api/dltMbrsTmpyPymMns'
}

/**
 * @description IO-MID-O-0054티머니페이 등록 해제
 * @returns {Promise<ResponseInfo>}
 */
export const deleteMemberTMoneyPay = (params: RequestDeleteTmpy): Promise<ResponseInfo> => {
  //jsonServe
  return tmoney1Http.post({
    url: Api.deleteMemberTMoneyPay,
    params
  });
};
