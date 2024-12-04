import { defHttp, defHttpOpt } from '@/utils/http/axios';
import type {
  reqUnConfirmedNotiCntInfoModel,
  resUnConfirmedNotiCntInfoModel,
  reqMbrMileageCouponCntInfoModel,
  resMbrMileageCouponCntInfoModel
} from '@/service/main/model/moreMainModel';

enum Api {
  unConfirmedNotiCnt = '/api/push/v2/inqrNoReadNtfcCnt',
  mbrMileageCouponCnt = '/api/mbrs/v2/inqrMbrsMlgAmtCpnCnt'
}

/**
 * @description: getUnConfirmedNotiCnt
 * 알림 미확인 수 조회 요청
 */
export const getUnConfirmedNotiCntInfo = (
  param: reqUnConfirmedNotiCntInfoModel
): Promise<resUnConfirmedNotiCntInfoModel> => {
  return defHttpOpt({
    requestOptions: {
      errorMessageMode: 'none'
    }
  }).post({
    url: Api.unConfirmedNotiCnt,
    params: param
  });
};

/**
 * @description: getMbrMileageCouponCnt
 * 회원마일리지 금액쿠폰 카운트조회 요청
 */
export const getMbrMileageCouponCntInfo = (
  param: reqMbrMileageCouponCntInfoModel
): Promise<resMbrMileageCouponCntInfoModel> => {
  return defHttp.post({
    url: Api.mbrMileageCouponCnt,
    params: param
  });
};
