import { defHttp } from '@/utils/http/axios';
import type { ResponseInfo, ResponseNaverPay } from '@/service/payment/model/responseModel';
import type { RequestNpayAuto, RequestNpayBillCreate } from '@/service/payment/model/requestModel';

enum Api {
  naverPayAutoRegReserve = '/api/pym/npay/v1/autoRegReserve',
  naverPayAutoCancel = '/api/pym/npay/v1/autoCancel',
  naverPayBillCreate = '/api/pym/npay/v1/billCreate',
  naverPayAutoReserve = '/api/pym/npay/v1/autoReserve'
}

/**
 * @description IO-MID2-O-0330 네이버페이 자동결제등록 요청
 * @param {string} moappMbrsSno 모바일앱회원일련번호 HeaderToken으로 대체
 * @returns {Promise<ResponseNaverPay>} 자동결제 빌링키
 */
export const naverPayAutoRegReserve = (): Promise<ResponseNaverPay> => {
  return defHttp.post({
    url: Api.naverPayAutoRegReserve
  });
};

/**
 * @description IO-MID2-O-0333 네이버페이 자동결제삭제(자동결제ID삭제)
 * @param {string} automaticPayId 자동결제ID
 * @param {string} [cancelType='U'] 삭제유형( A:관리자, U:사용자 )
 * @param {string} cancelReason 삭제사유
 */
export const naverPayAutoCancel = (params: RequestNpayAuto): Promise<ResponseInfo> => {
  // cancelType이 들어오지 않은 경우 사용자 입력
  if (params.cancelType === undefined || params.cancelType === null || params.cancelType === '') {
    params.cancelType = 'U';
  }
  return defHttp.post({
    params: params,
    url: Api.naverPayAutoCancel
  });
};

/**
 * @description ⦁	IO-MID2-O-0328 – 네이버페이 결제생성 요청
 * @param {string} moappMbrsSno 모바일앱회원일련번호
 * @param {string} utlzSvcDvsCd 이용서비스구분코드
 * @param {string} productName 상품명
 * @param {number} productCount 상품개수
 * @param {number} productAmount 상품금액
 * @param {string} encProductAmount 암호화상품금액
 */
export const naverPayBillCreate = (params: RequestNpayBillCreate): Promise<ResponseNaverPay> => {
  return defHttp.post({
    params: params,
    url: Api.naverPayBillCreate
  });
};

/**
 * @description ⦁	IO-MID2-O-0328 – 네이버페이 자동결제생성 요청
 * @param {string} moappMbrsSno 모바일앱회원일련번호
 * @param {string} automaticPayId 네이버페이 결제키
 * @param {string} utlzSvcDvsCd 이용서비스구분코드
 * @param {string} productName 상품명
 * @param {number} productCount 상품개수
 * @param {number} productAmount 상품금액
 */
export const naverPayAutoReserve = (params: RequestNpayBillCreate): Promise<ResponseNaverPay> => {
  return defHttp.post({
    params: params,
    url: Api.naverPayAutoReserve
  });
};
