import { defineStore } from 'pinia';
import {
  getTransferDiscountHistory,
  getTransferGuide,
  getTransferHistoryDetail,
  getTransferHistoryComplain
} from './transferApi';
import type {
  RequestTransferHistoryComplain,
  ResponseTransferDiscountHistory,
  ResponseRewardMainInfo,
  ResponseTransferHistoryDetail,
  discountTransferInfo,
  transferHistoryDetail
} from './model/transferModel';

const initTransferGuide = {
  scsYn: '',
  trtdAcmtAmt: 0,
  trtdTgtYn: '',
  trcrRgtYn: '',
  trtdCtt: '',
  trtdImgPathVal: '',
  trtdGdImgPathVal: ''
};
const initTransferDiscountHistoryList = {
  trtdList: [],
  msg: '',
  scsYn: ''
};
const initTransferHistoryDetail = {
  trdList: []
};

interface transferHistoryState {
  isLast: boolean;
  transferGuideInfo: ResponseRewardMainInfo;
  transferDiscountHistoryList: ResponseTransferDiscountHistory;
  transferHistoryDetail: ResponseTransferHistoryDetail;
}

export const useTransferStore = defineStore({
  id: 'use-transfer-store',

  state: (): transferHistoryState => ({
    // paging(false: 더보기)
    isLast: false,
    // 환승 할인 메인 정보
    transferGuideInfo: initTransferGuide,
    // 환승 할인 목록
    transferDiscountHistoryList: initTransferDiscountHistoryList,
    // 환승 할인 상세
    transferHistoryDetail: initTransferHistoryDetail
  }),
  getters: {
    // 환승 할인 메인 정보
    gettransferGuideInfo(): ResponseRewardMainInfo {
      return this.transferGuideInfo;
    },
    // 환승 할인 목록
    getTransferHistoryList(): discountTransferInfo[] {
      return this.transferDiscountHistoryList.trtdList;
    },
    // 환승 할인 상세
    getTransferHistoryDetailInfo(): transferHistoryDetail[] {
      return this.transferHistoryDetail.trdList;
    }
  },
  actions: {
    /**
     * 환승 할인 메인 정보 조회
     * @param inqrDtm YYYYMMDDHHmmss
     */
    async requestTransferGuide(inqrDtm: string) {
      try {
        const res = await getTransferGuide(inqrDtm);
        if (res) {
          this.transferGuideInfo = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * 회원 환승 할인 내역 조회
     * @param pageNo 1
     */
    async requestTransferDiscountHistory(pageNo: number, isMore: boolean) {
      try {
        const res = await getTransferDiscountHistory(pageNo);
        if (res) {
          if (!isMore) {
            // 처음 조회
            this.transferDiscountHistoryList = res;
            this.isLast = res.trtdList.length >= 20 ? false : true;
          } else {
            // 더보기
            this.transferDiscountHistoryList.trtdList.push(...res.trtdList);
            this.isLast = res.trtdList.length < 20;
          }
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * 회원 환승 할인 상세 내역 조회
     * @param trdDt 거래일자 YYYYMMDD
     */
    async requestTransferHistoryDetail(trdDt: string) {
      try {
        const res = await getTransferHistoryDetail(trdDt);
        if (res) {
          this.transferHistoryDetail = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * 환승 내역 문의
     */
    async requestTransferHistoryComplain(param: RequestTransferHistoryComplain) {
      try {
        const res = await getTransferHistoryComplain(param);
        if (res) {
          return res;
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
    initTransferHistory() {
      this.transferDiscountHistoryList.trtdList = [];
    },
    initTransferHistoryDetail() {
      this.transferHistoryDetail.trdList = [];
    }
  }
});
