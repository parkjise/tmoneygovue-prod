import { defHttp, travelHttpOpt } from '@/utils/http/axios';
import type {
  CouponDetailInfoModel,
  CouponListModel,
  PastCouponListModel,
  ResRegistCouponModel
} from '@/service/coupon/model/couponModel';
import type { ResponseCoupon, ResponseGiftCoupon } from '@/service/coupon/model/responseModel';
import type {
  RequestGiftCoupon,
  RequestTravelValidateCoupon,
  RequestValidateCoupon
} from '@/service/coupon/model/requestModel';

enum Api {
  couponList = '/api/cpn/v2/inqrCpnBoxList',
  pastCouponList = '/api/cpn/v2/inqrPastCpnList',
  registCoupon = '/api/cpn/v2/reqKeyInpCpnIssu',
  inqrPsnCpnListBySvc = '/api/cpn/v2/inqrPsnCpnListBySvc',
  reqCpnIssu = '/api/cpn/v2/reqCpnIssu',
  reqUseCpnVldVrfc = '/api/cpn/v2/reqUseCpnVldVrfc',
  reqCpnGiftAct = '/api/cpn/v2/reqCpnGiftAct',
  cpnDtlInfo = '/api/cpn/v2/inqrCpnDtlInfo',
  reqTrvlCpnVrfc = '/api/pym/v1/requestTrvlCpnVrfc.do'
}

export const getCouponList = (): Promise<CouponListModel> => {
  return defHttp.post({
    url: Api.couponList
  });
};

export const getPastCouponList = (): Promise<PastCouponListModel> => {
  return defHttp.post({
    url: Api.pastCouponList
  });
};

export const registCoupon = (param: string): Promise<ResRegistCouponModel> => {
  return defHttp.post({
    url: Api.registCoupon,
    data: {
      issuKeyVal: param
    }
  });
};

/**
 * @description IO-MID2-O-0407 – 서비스별 보유, 발급가능 쿠폰 목록조회
 * @param {string} utlzSvcDvsCd 이용서비스 구분코드( 고속시외 : B(고속:H,시외:C), 온다:O,따릉이:T,씽씽:X,전체가능:A, 운송중개: FG)
 * @returns {Promise<ResponseInfo>} 기본처리 결과
 */
export const inqrPsnCpnListBySvc = (utlzSvcDvsCd: string): Promise<CouponListModel> => {
  return defHttp.post({
    params: {
      utlzSvcDvsCd: utlzSvcDvsCd
    },
    url: Api.inqrPsnCpnListBySvc
  });
};

/**
 * @description IO-MID2-O-0505 – 쿠폰발급요청
 * @param {string} cpnDfntSno  쿠폰정의 일련번호
 * @returns {Promise<ResponseCoupon>} 기본처리 결과
 */
export const reqCpnIssu = (cpnDfntSno: string): Promise<ResponseCoupon> => {
  return defHttp.post({
    params: {
      cpnDfntSno: cpnDfntSno
    },
    url: Api.reqCpnIssu
  });
};

/**
 * @description IO-MID2-O-0409 – 쿠폰사용유효성검증 요청
 * @param {string} utlzSvcDvsCd 이용서비스구분코드(고속:H, 시외:C,온다:O,따릉이:T,씽씽:X)
 * @param {string} pymMnsId 결제수단ID ( 'TMPY', 'BZPY', 'PRPM')
 * @param {string} crpcId 발행사ID
 * @param {string} elwlprdCd 전자지갑상품코드(티머니페이결제만 존재)
 * 페이&Go : 2100400801, 페이머니 : 1000100002
 * @param {string} ttuAmt 총이용금액
 * @param {string} cpnSno 쿠폰일련번호
 * @param {string} deprTrmlCd 출발터미널코드
 * @param {string} arvlTrmlCd 도착터미널코드
 * @returns {Promise<ResponseCoupon>} 기본처리 결과
 */
export const reqUseCpnVldVrfc = (params: RequestValidateCoupon): Promise<ResponseCoupon> => {
  return defHttp.post({
    params: params,
    url: Api.reqUseCpnVldVrfc
  });
};

/**
 * @description IO-MID2-O-0406 – 쿠폰선물하기요청
 * @param {string} cpnSno 선물대상 쿠폰일련번호
 * @param {string} mbphNo 선물받을 사용자 휴대번호
 * @param {string} sendMsgCtt 사용자입력메시지
 * @returns {Promise<ResponseCoupon>} 기본처리 결과
 */
export const reqCpnGiftAct = (params: RequestGiftCoupon): Promise<ResponseGiftCoupon> => {
  return defHttp.post({
    params: params,
    url: Api.reqCpnGiftAct
  });
};

// 쿠폰 상세 정보 조회
export const couponDetailInfo = (cpnSno: string): Promise<CouponDetailInfoModel> => {
  return defHttp.post({
    url: Api.cpnDtlInfo,
    data: {
      cpnSno: cpnSno
    }
  });
};

/**
 * @description IF01030 여행쿠폰검증요청
 * @param params
 * @returns
 */
export const requestTrvlCpnVrfc = (params: RequestTravelValidateCoupon): Promise<ResponseCoupon> => {
  return travelHttpOpt({
    requestOptions: {
      errorMessageMode: 'none'
    }
  }).post({
    params: params,
    url: Api.reqTrvlCpnVrfc
  });
};
