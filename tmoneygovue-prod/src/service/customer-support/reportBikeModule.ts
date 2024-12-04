import { defineStore } from 'pinia';
import type {
  resReportDisabilityBikeListModel,
  reportDisabilityBikeModel,
  reqReportDisabilityBikeRegistModel,
  reqReportDisabilityBikeDeleteModel,
  reqBikeRentalHistoryModel,
  resBikeRentalHistoryModel,
  bikeRentalHistoryInfoModel
} from '@/service/customer-support/model/reportBikeModel';
import {
  getReportDisabilityBikeList,
  registReportDisabilityBike,
  deleteReportDisabilityBike,
  getBikeRentalHistory
} from '@/service/customer-support/reportBikeApi';

interface reportBikeState {
  resReportDisabilityBikeList: resReportDisabilityBikeListModel;
  reportDisabilityBikeList: reportDisabilityBikeModel[];
  resBikeRentalHistory: resBikeRentalHistoryModel;
  bikeRentalHistoryList: bikeRentalHistoryInfoModel[];
  isReportLast: boolean;
  isHistoryLast: boolean;
  checkedUtlzSvcDvsCd: string;
  tabIndex: Number;
}

// 고장 장애 신고 상세 목록 응답 초기화
export const resReportDisabilityBikeListInit = {
  inqrCnt: 0,
  data: {
    dtl: []
  }
};

// 고장 장애 신고 상세 목록 초기화
export const resBikeRentalHistoryInit = {
  data: {
    inqrNcnt: 0,
    cumUtlzDrtm: 0,
    cumMvmnDist: 0,
    cumCrbnSvng: 0,
    cumConsumeCal: 0,
    dtl: []
  }
};

export const useReportBikeStore = defineStore({
  id: 'report-bike',

  state: (): reportBikeState => ({
    resReportDisabilityBikeList: resReportDisabilityBikeListInit,
    reportDisabilityBikeList: [],
    resBikeRentalHistory: resBikeRentalHistoryInit,
    bikeRentalHistoryList: [],
    isReportLast: true,
    isHistoryLast: true,
    checkedUtlzSvcDvsCd: 'T',
    tabIndex: 0
  }),

  getters: {
    getReportDisabilityBikes(): reportDisabilityBikeModel[] {
      return this.reportDisabilityBikeList;
    },
    getBikeRentalHistories(): bikeRentalHistoryInfoModel[] {
      return this.bikeRentalHistoryList;
    },
    getTabIndex(): Number {
      return this.tabIndex;
    },
    getCheckedBikeType(): string {
      return this.checkedUtlzSvcDvsCd;
    }
  },
  actions: {
    /**
     * 고장 장애 신고 상세 요청
     * @param
     * @returns resReportDisabilityBikeListModel
     */
    async setReportDisabilityBikeList(pageNo: number) {
      this.resReportDisabilityBikeList = resReportDisabilityBikeListInit;
      if (pageNo === 1) {
        this.reportDisabilityBikeList = [];
        this.isReportLast = false;
      }
      const params = {
        pageNo: pageNo,
        utlzSvcDvsCd: 'A'
      };
      const res = await getReportDisabilityBikeList(params);
      if (res) {
        this.resReportDisabilityBikeList = res;
        if (res.data.dtl) {
          this.reportDisabilityBikeList.push(...res.data.dtl);
          this.isReportLast = res.data.dtl.length < 1;
        }
      }
      return res;
    },
    /**
     * 고장 장애 신고 생성
     * @param
     * @returns resReportDisabilityBikeRegistModel
     */
    async registReportDisabilityBike(param: reqReportDisabilityBikeRegistModel) {
      const res = await registReportDisabilityBike(param);
      return res;
    },
    /**
     * 고장 장애 신고 삭제
     * @param
     * @returns deleteReportDisabilityBike
     */
    async deleteReportDisabilityBike(param: reqReportDisabilityBikeDeleteModel) {
      const res = await deleteReportDisabilityBike(param);
      return res;
    },
    /**
     * 삭제된 신고 목록에서 제거
     * @param
     * @returns deleteComplainAction
     */
    setDeletedReportBike(deleteIndex: number) {
      this.reportDisabilityBikeList.splice(deleteIndex, 1);
    },
    /**
     * 대여 이력 요청(자전거)
     * @param
     * @returns deleteComplainAction
     */
    async setBikeRentalHistory(param: reqBikeRentalHistoryModel) {
      this.resBikeRentalHistory = resBikeRentalHistoryInit;
      if (param.pageNo === 1) {
        this.bikeRentalHistoryList = [];
        this.isHistoryLast = false;
      }
      const res = await getBikeRentalHistory(param);
      if (res) {
        this.resBikeRentalHistory = res;
        if (res.data.dtl) {
          this.bikeRentalHistoryList.push(...res.data.dtl);
          this.isHistoryLast = res.data.dtl.length < 1;
        }
      }
    },
    /**
     * TabIndex 저장(0: 신고하기, 1: 신고내역 보기 )
     */
    setTabIndex(idx: number) {
      this.tabIndex = idx;
    },
    /**
     * checkedUtlzSvcDvsCd 저장(T: 따릉이, D: 타슈)
     */
    setCheckedBikeType(bikeType: string) {
      this.checkedUtlzSvcDvsCd = bikeType;
    }
  }
});
