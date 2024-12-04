import { defHttp, defHttpOpt } from '@/utils/http/axios';
import type { SmpcPymRgt } from '@/service/payment/model/paymentModel';
import type {
  RequestChangeSmpcNickname,
  RequestRegisterSmpcPayment,
  RequestRepresentPaymentManagement
} from '@/service/payment/model/requestModel';

enum Api {
  cardSmpcPymCncn = '/api/pym/v2/reqCardSmpcPymCncn',
  cardSmpcPymAlsMod = '/api/pym/v2/reqCardSmpcPymAlsMod',
  cardSmpcPymRgt = '/api/pym/v2/reqCardSmpcPymRgt'
}

/**
 * @description IO-MID2-O-0303 카드 간편결제 해지 요청
 * @param {string} paymentkey 결제키
 * @param {string} issuerCd 발급사코드
 * @returns {Promise<SmpcPymRgt>} 간편결제 등록 response
 */
export const cardSmpcPymCncn = (params: RequestRepresentPaymentManagement): Promise<SmpcPymRgt> => {
  return defHttp.post({
    params: params,
    url: Api.cardSmpcPymCncn
  });
};

/**
 * @description IO-MID2-O-0306 간편결제 카드 별칭 변경요청
 * @param {string} paymentkey 결제키
 * @param {string} issuerCd 발급사코드
 * @param {string} cardAliasName 카드별칭명
 * @returns {Promise<SmpcPymRgt>} 간편결제 등록 response
 */
export const cardSmpcPymAlsMod = (cardInfo: RequestChangeSmpcNickname): Promise<SmpcPymRgt> => {
  return defHttp.post({
    params: cardInfo,
    url: Api.cardSmpcPymAlsMod
  });
};

/**
 * @description IO-MID2-O-0302 – 카드간편결제등록요청
 * @param {RequestRegisterSmpcPayment} 카드간편결제등록
 * @returns {Promise<SmpcPymRgt>} 간편결제 등록 response
 */
export const cardSmpcPymRgt = (params: RequestRegisterSmpcPayment): Promise<SmpcPymRgt> => {
  return defHttpOpt({
    requestOptions: {
      errorMessageMode: 'none'
    }
  }).post({
    params: params,
    url: Api.cardSmpcPymRgt
  });
};
