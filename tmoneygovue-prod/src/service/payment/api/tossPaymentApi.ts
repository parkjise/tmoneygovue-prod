import { defHttp } from '@/utils/http/axios';
import type { TossPayBillingKey } from '@/service/payment/model/paymentModel';
import type { ResponseInfo, ResponseTossPay, ResponseTossPayAuto } from '@/service/payment/model/responseModel';
import type { RequestTossPayBillCreate } from '@/service/payment/model/requestModel';

enum Api {
  billingKey = '/api/pym/toss/v2/billingKey',
  billingKeyRemove = '/api/pym/toss/v2/billingKeyRemove',
  tossPayBillCreate = '/api/pym/toss/v2/billCreate',
  tossPayAutoReserve = '/api/pym/toss/v2/billingKeyAuth'
}

/**
 * @description IO-MID2-O-0322 토스페이 자동결제등록요청( 빌링키 생성 )
 * @returns {Promise<TossPayBillingKey>} 자동결제 빌링키
 */
export const billingKey = (): Promise<TossPayBillingKey> => {
  return defHttp.post({
    url: Api.billingKey
  });
};

/**
 * @description IO-MID2-O-0325 토스페이 자동결제삭제(빌링키삭제)
 * @param {string} billingKey 토스페이 빌링키
 * @returns {Promise<ResponseInfo>} 기본 응답값
 */
export const billingKeyRemove = (billingKey: string): Promise<ResponseInfo> => {
  return defHttp.post({
    params: {
      billingKey: billingKey
    },
    url: Api.billingKeyRemove
  });
};

/**
 * @description IO-MID2-O-0322 – 토스페이 결제생성 요청
 * @param {string} moappMbrsSno 모바일앱회원일련번호
 * @param {string} utlzSvcDvsCd 이용서비스구분
 * @param {string} tosspaymethod 토스페이방법
 * @param {string} productDesc 상품설명
 * @param {nubmer} amount 거래금액
 * @param {string} enAmount 암호화거래금액
 * @returns {Promise<ResponseTossPay>} 결제요청 생성 응답
 */
export const tossPayBillCreate = (params: RequestTossPayBillCreate): Promise<ResponseTossPay> => {
  return defHttp.post({
    params: params,
    url: Api.tossPayBillCreate
  });
};

/**
 * @description IO-MID2-O-0327 – 토스페이 자동결제 요청
 * @param {string} moappMbrsSno 모바일앱회원일련번호
 * @param {string} billingKey 빌링키
 * @param {string} utlzSvcDvsCd 이용서비스구분
 * @param {string} tosspaymethod 토스페이방법
 * @param {string} productDesc 상품설명
 * @param {nubmer} amount 거래금액
 * @param {string} enAmount 암호화거래금액
 * @returns {Promise<ResponseTossPayAuto>}
 */
export const tossPayAutoReserve = (params: RequestTossPayBillCreate): Promise<ResponseTossPayAuto> => {
  return defHttp.post({
    params: params,
    url: Api.tossPayAutoReserve
  });
};
