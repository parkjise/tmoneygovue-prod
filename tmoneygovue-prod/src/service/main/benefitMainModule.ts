import { defineStore } from 'pinia';
import type { resBenefitServiceSettingInfoModel } from './model/benefitMainModel';
import { getBenefitServiceSettingInfo } from './benefitMainApi';

interface moreMainState {
  // 혜택 서비스 설정 정보
  benefitServiceSettingInfo: resBenefitServiceSettingInfoModel;
}

// 알림 미확인 수 정보 초기화
export const benefitServiceSettingInfoInit = {
  rspCd: '', // 응답 코드
  rspMsg: '', // 응답 메세지
  TGOMileageAmt: '0', // TGO 마일리지 금액
  atncCheckPrcn: '0/30', // ATNC 체크 비율
  benefitScrnMrkList: [], // 혜택 화면 마크 리스트
  benefitEvntList: [], // 혜택 이벤트 리스트
  trcrRgtYn: '', // 추적 등록 여부
  actScsYn: '' // 활성화 여부
};

export const useBenefitMainStore = defineStore({
  id: 'benefit-main-store',

  state: (): moreMainState => ({
    // 혜택 서비스 설정 정보
    benefitServiceSettingInfo: benefitServiceSettingInfoInit
  }),

  getters: {
    // 혜택 서비스 설정 정보
    getBenefitServiceSettingInfo(): resBenefitServiceSettingInfoModel {
      return this.benefitServiceSettingInfo;
    }
  },
  actions: {
    /**
     * 혜택 서비스 설정 정보 조회
     * @returns resBenefitServiceSettingInfoModel
     */
    async setBenefitServiceSettingInfoAction() {
      const res = await getBenefitServiceSettingInfo();
      if (res) {
        this.benefitServiceSettingInfo = res;
      }
      return res;
    }
  }
});
