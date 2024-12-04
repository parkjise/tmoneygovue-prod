import { defineStore } from 'pinia';

import type {
  reqMarketingAgreementModel,
  resMarketingAgreementModel,
  reqUpdateMarketingAgreementModel
} from '@/service/app-setting/model/appSettingModel';
import { getMarketingAgreementInfo, updateMarketingAgreement } from '@/service/app-setting/appSettingApi';

interface appSettingState {
  marketingAgreementInfo: resMarketingAgreementModel;
}

export const marketingAgreementInfoInit = {
  mrkgRcvYn: '',
  pushRcvYn: '',
  mailRcvYn: '',
  smsRcvYn: '',
  mrkgRcvUpdDtm: '',
  msg: ''
};

export const useAppSetting = defineStore({
  id: 'app-setting-store',

  state: (): appSettingState => ({
    marketingAgreementInfo: marketingAgreementInfoInit
  }),

  getters: {
    getMarketingAgreementInfo(): resMarketingAgreementModel {
      return this.marketingAgreementInfo;
    }
  },

  actions: {
    /**
     * 회원 수신 동의 정보 조회
     * @param param reqMarketingAgreementModel
     * @returns resMarketingAgreementModel
     */
    async setMarketingAgreementInfo(param: reqMarketingAgreementModel) {
      const res = await getMarketingAgreementInfo(param);
      if (res) {
        this.marketingAgreementInfo = res;
      }
    },

    /**
     * 회원 수신 동의 정보 변경
     * @param param reqUpdateMarketingAgreementModel
     * @returns resUpdateMarketingAgreementModel
     */
    async updateMarketingAgreement(param: reqUpdateMarketingAgreementModel) {
      const res = await updateMarketingAgreement(param);
      return res;
    }
  }
});
