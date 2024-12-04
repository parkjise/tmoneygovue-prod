import { defHttp, mobilityHttp, tmoney1Http } from '@/utils/http/axios';
import type {
  BikePaymentHistoryDataModel,
  PaymentHistoryListModel,
  RentCarPaymentHistoryModel,
  ReqBikePaymentHistoryModel,
  ReqPaymentHistoryListModel,
  RequestSaveBcclVchrPrchCancInf,
  ResponseMemberPaymentInfoModel,
  ResponseSaveBcclVchrPrchCancInf,
  ResponseSaveGoPassInfo
} from '@/service/payment/model/paymentHistoryModel';
import { formatDate, getToday } from '@/utils/dateUtils';

enum Api {
  paymentHistoryList = '/api/pym/v2/inqrPymPtList',

  //따릉이 상세조회
  bikePaymentHistory = '/api/pm/rtrn/inqrBcclPymDtlInf',

  //렌터카 상세조회
  rentCarPaymentHistory = '/api/l/rsrv/v1/selectReceipt',

  //회원 결제수단 정보 조회
  memberPaymentMethodInfo = '/api/inqrMbrsPymMnsInf',

  //자전거 이용권 구매 취소 요청
  saveBcclVchrPrchCancInf = '/api/pm/poli/saveBcclVchrPrchCancInf',

  // 나의정기상품권 정보조회(GoPass)
  inqrGoPassInfo = '/api/passCpn/v2/inqrMyPassCpnInfo'
}

/**
 * 결제내역 목록 조회
 * @param data
 */
export const getPaymentHistoryList = (data: ReqPaymentHistoryListModel): Promise<PaymentHistoryListModel> => {
  return defHttp.post({
    url: Api.paymentHistoryList,
    data: {
      pageNo: data.pageNo,
      utlzSvcDvsCd: data.utlzSvcDvsCd,
      inqrMonth: data.inqrMonth
    }
  });
};

/**
 * 따릉이 결제내역 상세 조회
 * @param data
 */
export const getBikePaymentHistory = (data: ReqBikePaymentHistoryModel): Promise<BikePaymentHistoryDataModel> => {
  return tmoney1Http.post({
    url: Api.bikePaymentHistory,
    data: {
      pymSno: data.pymSno,
      utlzSvcDvsCd: data.utlzSvcDvsCd
    }
  });
};

/**
 * 렌트카 결제내역 상세 조회
 * @param data
 */
export const getRentCarPaymentHistory = (data: string): Promise<RentCarPaymentHistoryModel> => {
  return mobilityHttp.post({
    url: Api.rentCarPaymentHistory,
    data: {
      svcPymSno: data
    }
  });
};

/**
 * 정기상품권 결제내역 상세 조회
 * @param data
 */
export const getGoPassPaymentHistory = (data: string): Promise<ResponseSaveGoPassInfo> => {
  return defHttp.post({
    url: Api.inqrGoPassInfo,
    data: { passPrchSno: data }
  });
};

export const requestMemberPaymentMethodInfo = (): Promise<ResponseMemberPaymentInfoModel> => {
  return tmoney1Http.post({
    url: Api.memberPaymentMethodInfo,
    data: {
      inqrDtm: formatDate(getToday(), 'YYYY-MM-DD HH:mm:ss')
    }
  });
};

export const requestSaveBcclVchrPrchCancInf = (
  data: RequestSaveBcclVchrPrchCancInf
): Promise<ResponseSaveBcclVchrPrchCancInf> => {
  return tmoney1Http.post({
    url: Api.saveBcclVchrPrchCancInf,
    data: {
      pymSno: data.pymSno,
      cancRyDvsCd: data.cancRyDvsCd,
      utlzSvcDvsCd: data.utlzSvcDvsCd
    }
  });
};
