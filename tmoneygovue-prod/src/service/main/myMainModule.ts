import { defineStore } from 'pinia';

import type { resMyServiceSettingInfoModel } from './model/myMainModel';
import { getMyServiceSettingInfo } from './myMainApi';

interface moreMainState {
  // 마이 서비스 설정 정보
  myServiceSettingInfo: resMyServiceSettingInfoModel;
}

// 알림 미확인 수 정보 초기화
export const myServiceSettingInfoInit = {
  rspCd: '', // 응답 코드
  rspMsg: '', // 응답 메세지
  myMvmnDist: '', // 내이동거리
  trcrRgtYn: '', // 트레이서 등록 여부
  trcrRgtMvmnPath: '', // 트레이서 등록 이동경로
  actScsYn: '', // 활동성공여부
  myScrnMrkList: [] // 내화면마크리스트
};

export const useMyMainStore = defineStore({
  id: 'my-main-store',

  state: (): moreMainState => ({
    // 마이 서비스 설정 정보
    myServiceSettingInfo: myServiceSettingInfoInit
  }),

  getters: {
    // 마이 서비스 설정 정보
    getmyServiceSettingInfo(): resMyServiceSettingInfoModel {
      return this.myServiceSettingInfo;
    }
  },
  actions: {
    /**
     * 마이 서비스 설정 정보 조회
     * @returns resMyServiceSettingInfoModel
     */
    async setMyServiceSettingInfoAction() {
      const res = await getMyServiceSettingInfo();
      if (res) {
        this.myServiceSettingInfo = res;
      }
      return res;
    }
  }
});
