import { defineStore } from 'pinia';
import {
  getBikePaymentHistory,
  getGoPassPaymentHistory,
  getPaymentHistoryList,
  getRentCarPaymentHistory,
  requestMemberPaymentMethodInfo,
  requestSaveBcclVchrPrchCancInf
} from '@/service/payment/api/paymentHistoryApi';
import type {
  BikePaymentHistoryModel,
  GoPassInfo,
  PaymentHistoryModel,
  RentCarPaymentHistoryModel,
  ReqBikePaymentHistoryModel,
  ReqPaymentHistoryListModel,
  RequestSaveBcclVchrPrchCancInf
} from '@/service/payment/model/paymentHistoryModel';

interface paymentHistoryState {
  paymentHistoryList: PaymentHistoryModel[];
  bikePaymentHistory: BikePaymentHistoryModel;
  rentCarPaymentHistory: RentCarPaymentHistoryModel;
  goPassPaymentHistory: GoPassInfo;
  isLast: boolean;
}

// 정기상품권 결제진행상태코드
export const GoPassPymPrcgStaCode = {
  Y: 'Y', //결제
  C: 'C', //취소(환불)
  P: 'P' //부분취소(환불)
};
// 정기상품권 진행상태코드
export const GoPassPassPrcgStaCode = {
  RT: 'RT', //환불
  CC: 'CC' //취소
};

export const usePaymentHistoryStore = defineStore({
  id: 'payment-history-store',

  state: (): paymentHistoryState => ({
    paymentHistoryList: [],
    bikePaymentHistory: {} as BikePaymentHistoryModel,
    rentCarPaymentHistory: {} as RentCarPaymentHistoryModel,
    goPassPaymentHistory: {} as GoPassInfo,
    isLast: false
  }),

  getters: {
    getPaymentHistoryList(): PaymentHistoryModel[] {
      return this.paymentHistoryList;
    },
    getBikePaymentHistory(): BikePaymentHistoryModel {
      return this.bikePaymentHistory;
    },
    getRentCarPaymentHistory(): RentCarPaymentHistoryModel {
      return this.rentCarPaymentHistory;
    },
    isPayCancel(): boolean {
      return this.goPassPaymentHistory.pymPrcgStaCd !== GoPassPymPrcgStaCode.Y;
    },
    // 추가요금여부
    isPaasDvsCdAU(): boolean {
      return this.goPassPaymentHistory.passDvsCd === 'AU';
    }
  },

  actions: {
    async actionGetPaymentHistoryList(tabChange: boolean, data: ReqPaymentHistoryListModel) {
      const res = await getPaymentHistoryList(data);
      if (res) {
        if (res.pymList) {
          if (tabChange) {
            this.paymentHistoryList = res.pymList;
            this.isLast = false;
          } else {
            this.paymentHistoryList.push(...res.pymList);
            if (res.pymList.length <= 0) {
              this.isLast = true;
            }
          }
        } else {
          this.paymentHistoryList = [];
          this.isLast = true;
        }
      }
      return res;
    },
    async actionGetBikePaymentHistory(data: ReqBikePaymentHistoryModel) {
      const res = await getBikePaymentHistory(data);
      if (res) {
        if (res.data) this.bikePaymentHistory = res.data;
      }
      return res;
    },
    async actionGetRentCarPaymentHistory(data: string) {
      const res = await getRentCarPaymentHistory(data);
      if (res) {
        this.rentCarPaymentHistory = res;
      }
      return res;
    },
    async requestMemberPaymentMethodInfo() {
      const res = await requestMemberPaymentMethodInfo();
      if (res) {
        return res;
      }
    },
    async requestSaveBcclVchrPrchCancInf(data: RequestSaveBcclVchrPrchCancInf) {
      const res = await requestSaveBcclVchrPrchCancInf(data);
      if (res) {
        return res;
      }
    },
    async actionGetGoPassPaymentHistory(passPrchSno: string) {
      const res = await getGoPassPaymentHistory(passPrchSno);
      if (res && res.rspCd === '0000') {
        this.goPassPaymentHistory = res.data;
      }
      return res;
    }
  }
});
