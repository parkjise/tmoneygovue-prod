import { travelHttp, travelHttpOpt } from '@/utils/http/axios';
import type { ReqTrvlPaymentMrnp, RequestTravelPayment, ResponseTravelPayment } from '@/service/order/model/orderModel';
import type { TravelResult } from '@/utils/http/axios/types/axios';

enum Api {
  reqPymMrnp = '/api/pym/v1/requestTrvlPymMrnp.do',
  requestTrvlPym = '/api/pym/v1/requestTrvlPym.do'
}

/**
 * @description 결제예약요청
 * @param {string} encPwd
 * @param {string} encPwdCfrm
 * @returns {Promise<ResponseInfo>}
 */
export const requestPymMrnp = (params: ReqTrvlPaymentMrnp): Promise<{ trvlMrnpSno: string }> => {
  return travelHttp.post({
    params: params,
    url: Api.reqPymMrnp
  });
};

/**
 * @description 여행결제 요청
 * @returns  사용자별 결제 수단 목록
 */
export const requestTrvlPym = (
  params: RequestTravelPayment
): Promise<ResponseTravelPayment | TravelResult<ResponseTravelPayment>> => {
  return travelHttpOpt({
    requestOptions: {
      errorMessageMode: 'none'
    }
  }).post({
    url: Api.requestTrvlPym,
    params: params
  });
};
