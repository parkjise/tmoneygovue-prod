import { isDevelopment, isLocal, isMobileApp } from '@/utils/is';
import { useAuthStore } from '@/service/auth/authModule';
import { useStorage } from '@vueuse/core';
import { LocalStorageKey } from '@/utils/constants/globalConstants';
import { useSampleAuthStore } from '@/service/sample/sampleAuthModule';
import type { SampleAuthReq } from '@/service/sample/model/sampleAuthModel';
import type { AuthInfoInterface } from '@/service/auth/model/authModel';

// 인증정보 조회(로그인을 native에서 처리하고 웹에서 로그인 여부를 확인하기 위함)
export const setupAuthInfo = async () => {
  const authStore = useAuthStore();
  if (isMobileApp()) {
    await authStore.getAuthTokenAction();
    return;
  }

  // 개발모드 자동 로그인모드
  if (isLocal() || isDevelopment()) {
    await devAotoLoginMode();
  }
};

// 개발 자동 로그인모드
const devAotoLoginMode = async () => {
  const authStore = useAuthStore();
  const isDevAutoLoginMode = useStorage(LocalStorageKey.DEV_AUTO_LOGIN_MODE, false).value; // 개발자동로그인모드
  if (isDevAutoLoginMode) {
    const sampleAuthStore = useSampleAuthStore();
    const sampleAuthReq: SampleAuthReq = {
      mblOsKndCd: 'I',
      moappVer: '2.4.2',
      moappMbrsSno: '*9Tester3^',
      rnwlDtm: '2024-05-29 13:53:56',
      mbphHwId: 'A0E4684F-20EC-42B3-8A71-CCB0D4BC9C84',
      mbphOsVer: '17.1.1'
    };
    const sampleAuth = await sampleAuthStore.getHttpAuthAction(sampleAuthReq);
    if (sampleAuth) {
      const authInfo: AuthInfoInterface = {
        token: sampleAuth.authToken,
        uuid: sampleAuthReq.mbphHwId,
        appCode: 'MIC',
        osKnd: sampleAuthReq.mblOsKndCd,
        osVer: sampleAuthReq.mbphOsVer,
        appVerCode: '242',
        appVer: sampleAuthReq.moappVer,
        mbrNm: sampleAuth.userName,
        moappMbrsSno: sampleAuth.moappMbrsSno,
        mbrBrdt: sampleAuth.userBirthDate,
        mbrphNo: sampleAuth.userPhoneNumber,
        ondaAuthToken: sampleAuth.ondaAuthToken,
        genderCode: 'M' // 더미 로그인은 성별정보가 없어서 M으로 설정
      };
      await authStore.setAuthTokenAction(authInfo);
    }
  }
};
