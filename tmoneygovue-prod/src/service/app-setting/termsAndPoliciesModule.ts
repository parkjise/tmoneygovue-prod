import { defineStore } from 'pinia';
import type { TermsInfo, StplGroupInfo, StplDtlInfo } from '@/service/terms/model/termsModel';
import { inqrStplList } from '@/service/terms/termsApi';
import { inqrStplListCarrierAgreement } from '@/service/app-setting/termsAndPoliciesApi';

interface termsAndPoliciesState {
  termsInfo: TermsInfo;
  carrierAgreementInfo: TermsInfo;
}

export const termsInfoInit = {
  stplList: [],
  msg: ''
};

export const useTermsAndPoliciesStore = defineStore({
  id: 'terms-and-policies-store',
  state: (): termsAndPoliciesState => ({
    termsInfo: termsInfoInit,
    carrierAgreementInfo: termsInfoInit
  }),
  getters: {
    getStplList(): StplGroupInfo[] {
      return this.termsInfo.stplList;
    },
    getCarrierAgreementlList(): StplDtlInfo[] {
      return this.carrierAgreementInfo.stplList[0]?.stplDtlList;
    }
  },
  actions: {
    async setTermsAndPolicies() {
      this.termsInfo = termsInfoInit;
      const res = await inqrStplList({ svcDvsCd: '', stplGrpCd: '' });
      if (res) {
        this.termsInfo = res;
      }
      return res;
    },
    async setgetCarrierAgreement() {
      this.carrierAgreementInfo = termsInfoInit;
      const res = await inqrStplListCarrierAgreement({ svcDvsCd: '2', stplGrpCd: 'BD' });
      if (res) {
        this.carrierAgreementInfo = res;
      }
      return res;
    }
  }
});
