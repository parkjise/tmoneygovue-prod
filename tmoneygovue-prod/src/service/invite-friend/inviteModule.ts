import { defineStore } from 'pinia';

import type { ResFrndInvnInfo } from './model/inviteModel';
import { inqrFrndInvnScrnInfo } from './inviteApi';

const initInvnInfo = {
  frndInvnSno: '',
  mlgAcmtAmt: '0',
  invnScsCnt: '0',
  cpnUseCnt: '0',
  rspCd: '',
  rspMsg: ''
};

interface invnState {
  invnInfo: ResFrndInvnInfo;
}
export const useInvnStore = defineStore({
  id: 'use-friend-invite-store',

  state: (): invnState => ({
    invnInfo: initInvnInfo
  }),
  getters: {
    getMileage(): string {
      return this.invnInfo ? this.invnInfo.mlgAcmtAmt : '0';
    },
    getInvnScsCnt(): string {
      return this.invnInfo ? this.invnInfo.invnScsCnt : '0';
    },
    getCpnUseCnt(): string {
      return this.invnInfo ? this.invnInfo.cpnUseCnt : '0';
    },
    getFrndInvnSno(): string {
      return this.invnInfo ? this.invnInfo.frndInvnSno : '';
    }
  },
  actions: {
    /**
     * @description 친구초대정보조회
     */
    async inqrFrndInvnScrnInfo() {
      try {
        const res = await inqrFrndInvnScrnInfo();
        if (res) {
          this.invnInfo = res;
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
});
