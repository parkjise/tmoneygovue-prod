import { defineStore } from 'pinia';
import {
  couponDetailInfo,
  getCouponList,
  getPastCouponList,
  registCoupon,
  reqCpnGiftAct,
  reqCpnIssu
} from '@/service/coupon/couponApi';
import type { CouponModel, ResRegistCouponModel } from '@/service/coupon/model/couponModel';
import type { ResponseCoupon, ResponseGiftCoupon } from '@/service/coupon/model/responseModel';
import type { RequestGiftCoupon } from '@/service/coupon/model/requestModel';

interface couponState {
  inqrPsnCpnList: CouponModel[];
  issuCpnList: CouponModel[];
  inqrPastCpnList: CouponModel[];
  resRegistCoupon: ResRegistCouponModel;
  responseCoupon: ResponseCoupon;
  couponDetailInfo: CouponModel;
  resGiftCoupon: ResponseGiftCoupon;
}

export const couponListModelInit = {
  psnCpnList: [],
  issuCpnList: []
};

export const useCouponStore = defineStore({
  id: 'couponStore',

  state: (): couponState => ({
    inqrPsnCpnList: [],
    issuCpnList: [],
    inqrPastCpnList: [],
    resRegistCoupon: {} as ResRegistCouponModel,
    responseCoupon: {} as ResponseCoupon,
    couponDetailInfo: {} as CouponModel,

    resGiftCoupon: {} as ResponseGiftCoupon
  }),

  getters: {
    getPsnCpnList(): CouponModel[] {
      return this.inqrPsnCpnList;
    },
    getIssuCpnList(): CouponModel[] {
      return this.issuCpnList;
    },
    getPastCouponList(): CouponModel[] {
      return this.inqrPastCpnList;
    },
    registCoupon(): ResRegistCouponModel {
      return this.resRegistCoupon;
    },
    reqCpnIssu(): ResponseCoupon {
      return this.responseCoupon;
    },
    getCouponDetailInfo(): CouponModel {
      return this.couponDetailInfo;
    },
    getResGiftCoupon(): ResponseGiftCoupon {
      return this.resGiftCoupon;
    }
  },
  actions: {
    /**
     * 쿠폰 목록 조회
     */
    async actionCouponList() {
      this.inqrPsnCpnList = [];
      this.issuCpnList = [];

      try {
        const res = await getCouponList();
        if (res) {
          if (res.psnCpnList) {
            this.inqrPsnCpnList = res.psnCpnList;
          }
          if (res.issuCpnList) {
            this.issuCpnList = res.issuCpnList;
          }
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * 지난쿠폰 목록 조회
     */
    async actionPastCouponList() {
      this.inqrPastCpnList = [];

      try {
        const res = await getPastCouponList();
        if (res) {
          if (res.pastCpnList) {
            this.inqrPastCpnList = res.pastCpnList;
          }
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * 쿠폰 등록
     * @param param
     */
    async actionRegistCoupon(param: string) {
      this.resRegistCoupon = {} as ResRegistCouponModel;

      try {
        const res = await registCoupon(param);
        if (res) {
          this.resRegistCoupon = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * 쿠폰 발급 요청
     * @param cpnDfntSno
     */
    async actionReqIssueCoupon(cpnDfntSno: string) {
      this.responseCoupon = {} as ResponseCoupon;

      try {
        const res = await reqCpnIssu(cpnDfntSno);
        if (res) {
          this.responseCoupon = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * 쿠폰 상세 조회
     * @param cpnSno
     */
    async actionCouponDetailInfo(cpnSno: string) {
      this.couponDetailInfo = {} as CouponModel;

      try {
        const res = await couponDetailInfo(cpnSno);
        if (res) {
          if (res.cpnDtlInfo) this.couponDetailInfo = res.cpnDtlInfo;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * 쿠폰 선물하기
     * @param params
     */
    async actionRequestGiftCoupon(params: RequestGiftCoupon) {
      this.resGiftCoupon = {} as ResponseGiftCoupon;

      try {
        const res = await reqCpnGiftAct(params);
        if (res) {
          if (res) this.resGiftCoupon = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
});
