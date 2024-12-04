import { defineStore } from 'pinia';

import type { AuthInfoInterface } from '@/service/auth/model/authModel';
import { getAppBridge } from '@/utils';
import { merge } from 'lodash-es';
import type { verifyResponse } from '@/utils/hybrid/etc/etc.type';

interface authState {
  authInfo: AuthInfoInterface; // 회원인증 정보
  identityInfo: verifyResponse; // 본인인증 응답값(토스, 패스인증)
  preVerification: string | null;
}

export const AuthInfoInit = {
  token: '',
  uuid: '',
  appCode: '',
  osKnd: '',
  osVer: '',
  appVer: '',
  appVerCode: '',
  mbrNm: '',
  moappMbrsSno: '',
  mbrBrdt: '',
  mbrphNo: '',
  ondaAuthToken: '',
  genderCode: 'M',
  pushToken:''
};

export const useAuthStore = defineStore({
  id: 'auth-store',

  state: (): authState => ({
    authInfo: AuthInfoInit,
    identityInfo : {} as verifyResponse,
    preVerification : null
  }),

  getters: {
    // 인증정보
    getAuthInfo(): AuthInfoInterface {
      return this.authInfo;
    },
    // 로그인 여부
    getIsLogin(): boolean {
      if (this.authInfo.moappMbrsSno !== null && this.authInfo.moappMbrsSno !== '') {
        return true;
      }
      return false;
    },
    // 인증토큰
    getToken(): string {
      return this.authInfo.token;
    },
    // 회원명
    getMbrNm(): string {
      return this.authInfo.mbrNm;
    },
    // 본인인증 응답값
    getIdentityInfo(): verifyResponse {
      return this.identityInfo;
    },
    getPreVerification(): string | null {
      return this.preVerification;
    },
  },
  actions: {
    // 인증정보 조회
    async getAuthTokenAction() {
      const appBridge = await getAppBridge();
      const resAuthInfo = await appBridge.getAuthInfo();

      merge(this.authInfo, resAuthInfo);

      return resAuthInfo;
    },

    async getAuthTokenTknAction() {
      const appBridge = await getAppBridge();
      const resAuthTknInfo = await appBridge.updateAuthTknInfo();
      this.authInfo.token = resAuthTknInfo.token;

      return resAuthTknInfo;
    },

    /**
     * 본인인증 요청
     * @param type 
     * @param method 
     */
    async actionCallVerify(type : number) {
      try {
        const appBridge = await getAppBridge();
        const res = await appBridge.callIdentityVerify({ verifyType: type});
        if (res) {
          this.identityInfo = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    setAuthTokenAction(authInfo: AuthInfoInterface) {
      this.authInfo = authInfo;
    },

    setIdentityInfo(info: verifyResponse) {
      this.identityInfo = info;
    },

    setPreVerification(page: string | null) {
      this.preVerification = page;   
    },
  }
});
