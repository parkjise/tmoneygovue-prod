import { defineStore } from 'pinia';

import type {
  reqMbrMileageCouponCntInfoModel,
  reqUnConfirmedNotiCntInfoModel,
  resMbrMileageCouponCntInfoModel,
  resUnConfirmedNotiCntInfoModel
} from './model/moreMainModel';
import { getMbrMileageCouponCntInfo, getUnConfirmedNotiCntInfo } from './moreMainApi';

interface moreMainState {
  // 알림 미확인 수 정보
  unConfirmedNotiCntInfo: resUnConfirmedNotiCntInfoModel;
  // 회원마일리지 쿠폰 정보
  mbrMileageCouponCntInfo: resMbrMileageCouponCntInfoModel;
}

// 알림 미확인 수 정보 초기화
export const unConfirmedNotiCntInfoInit = {
  msg: '',
  okHttpResponseCode: '',
  rspMsg: '',
  noReadNtfcCnt: 0,
  rspCd: ''
};

// 회원마일리지 쿠폰 정보 초기화
export const mbrMileageCouponCntInfoInit = {
  rspMsg: '',
  GoMlgAmt: 0,
  offwallMlgAmt: 0,
  dotDispYn: '',
  rspCd: '',
  cpnPsnCnt: 0,
  tMlgAmt: 0,
  atncCheckPrcn: ''
};

export const useMoreMainStore = defineStore({
  id: 'more-main-store',

  state: (): moreMainState => ({
    // 알림 미확인 수 정보
    unConfirmedNotiCntInfo: unConfirmedNotiCntInfoInit,
    // 회원마일리지 쿠폰 정보
    mbrMileageCouponCntInfo: mbrMileageCouponCntInfoInit
  }),

  getters: {
    // 알림 미확인 수 정보
    getUnConfirmedNotiCntInfo(): resUnConfirmedNotiCntInfoModel {
      return this.unConfirmedNotiCntInfo;
    },
    // 회원마일리지 쿠폰 정보
    getMbrMileageCouponCntInfo(): resMbrMileageCouponCntInfoModel {
      return this.mbrMileageCouponCntInfo;
    }
  },
  actions: {
    /**
     * 알림 미확인 수 정보 조회
     * @param param reqUnConfirmedNotiCntInfoModel
     * @returns resUnConfirmedNotiCntInfoModel
     */
    async setUnConfirmedNotiCntInfoAction(param: reqUnConfirmedNotiCntInfoModel) {
      const res = await getUnConfirmedNotiCntInfo(param);
      if (res) {
        this.unConfirmedNotiCntInfo = res;
      }
      return res;
    },

    //
    /**
     * 회원마일리지 쿠폰 정보 조회
     * @param param reqMbrMileageCouponCntInfoModel
     * @returns resMbrMileageCouponCntInfoModel
     */
    async setMbrMileageCouponCntInfoAction(param: reqMbrMileageCouponCntInfoModel) {
      const res = await getMbrMileageCouponCntInfo(param);
      if (res) {
        this.mbrMileageCouponCntInfo = res;
      }
      return res;
    }
  }
});
