import { defineStore } from 'pinia';
import type { ResponseCardBinInfo } from '../regist-traffic-card/model/registTrafficCardModel';
import { asIsGetInqrCardBinInfo, getInqrCardBinInfo } from '../regist-traffic-card/registTrafficCardApi';

interface paymentState {
  cardBinInfo: ResponseCardBinInfo;
}

const initCardBinInfo = {
  issurCd: '',
  cardName: '',
  cardImgPath: '',
  path2: '',
  crpcId: '',
  checkCardYN: '',
  cprtCardYN: '',
  crpcNm: '',
  rspCd: '',
  rspMsg: '',
  crcmCd: '',
  approvalOrgCd: ''
};

export const usePaymentStore = defineStore({
  id: 'payment-store',

  state: (): paymentState => ({
    // 카드Bin 정보
    cardBinInfo: initCardBinInfo
  }),
  getters: {
    // 카드Bin 정보
    getCardBinInfo(): ResponseCardBinInfo {
      return this.cardBinInfo;
    }
  },
  actions: {
    /**
     * 신용카드 검증
     * @param cardBin 카드번호 앞 8자리
     */
    async requestInqrCardBinInfo(cardBin: string) {
      try {
        const res = await getInqrCardBinInfo(cardBin);
        if (res) {
          this.cardBinInfo = res;
        }
        return res;
      } catch (error) {
        return false;
      }
    },
    initCardBinInfo() {
      this.cardBinInfo = initCardBinInfo;
    },
    /**
     * 신용카드 검증 ASIS
     * @param cardBin 카드번호 앞 8자리
     */
    async requestInqrCardBinInfoASIS(cardBin: string) {
      try {
        const res = await asIsGetInqrCardBinInfo(cardBin);
        if (res) {
          this.cardBinInfo = res;
        }
        return res;
      } catch (error) {
        return false;
      }
    },

  }
});
