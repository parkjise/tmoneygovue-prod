import { defineStore } from 'pinia';

import { httpAuth } from '@/service/sample/sampleAuthApi';
import type { SampleAuthReq, SampleAuthRes } from '@/service/sample/model/sampleAuthModel';

interface authState {
  sampleAuthInfo: SampleAuthRes;
}

export const sampleAuthInfoInit: SampleAuthRes = {
  mag: '',
  ageDvsCd: '',
  drmbYn: '',
  authToken: '',
  tGo1Yn: '',
  userPhoneNumber: '',
  userName: '',
  joinYn: '',
  userBirthDate: '',
  moappMbrsSno: '',
  authTkn: '',
  frndInvnTgtYn: '',
  prsnAuthSno: '',
  ondaAuthToken: '',
  genderCode: 'M'
};

export const useSampleAuthStore = defineStore({
  id: 'sample-auth-store',

  state: (): authState => ({
    sampleAuthInfo: sampleAuthInfoInit
  }),

  getters: {
    getSampleAuthInfo(): SampleAuthRes {
      return this.sampleAuthInfo;
    }
  },
  actions: {
    async getHttpAuthAction(sampleAuthReq: SampleAuthReq) {
      try {
        const res = await httpAuth(sampleAuthReq);
        this.sampleAuthInfo = res.dta;
        return res.dta;
      } catch (error) {
        return await Promise.reject(error);
      }
    }
  }
});
