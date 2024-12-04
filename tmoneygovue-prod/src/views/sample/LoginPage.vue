<template>
  <!-- header -->
  <sub-header title="더미 로그인 페이지" hide-back />
  <!-- // header -->
  <main id="main" class="main">
    <div class="container">
      <round-box title="모드설정" padding-bottom="1.2rem">
        <div>
          <form>
            <uu-checkbox v-model="isDummyApiMode" value="false" label="더미API서버사용여부" checkline />
            <uu-checkbox v-model="isDevAutoLoginMode" value="false" label="개발자동로그인모드" checkline />
          </form>
        </div>
      </round-box>
      <round-box title="이동할 페이지" padding-bottom="1.2rem">
        <div>
          <form>
            <uu-input
              v-model="moveLoginAfter"
              label="btn-clear"
              :maxLength="50"
              placeholder="텍스트를 입력해주세요."
              btn-clear
              hide-label
            />
          </form>
        </div>
      </round-box>

      <div class="button-container">
        <uu-button
          class="login-button"
          size="lg"
          label="설정 및 이동(로그인x)"
          btn-style="line"
          @click="handleSetting"
        />
        <uu-button class="login-button" size="lg" label="설정 및 로그인" btn-style="line" @click="handleLogin" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSampleAuthStore } from '@/service/sample/sampleAuthModule';
import { useAuthStore } from '@/service/auth/authModule';
import { useCommonStore } from '@/service/common/commonModule';
import type { SampleAuthReq } from '@/service/sample/model/sampleAuthModel';
import type { AuthInfoInterface } from '@/service/auth/model/authModel';
import { LocalStorageKey } from '@/utils/constants/globalConstants';
import { useStorage } from '@vueuse/core';

const sampleAuthStore = useSampleAuthStore();
const authStore = useAuthStore();
const commonStore = useCommonStore();
const router = useRouter();
const isDummyApiMode = ref(false); // 더미API모드
const isDevAutoLoginMode = ref(useStorage(LocalStorageKey.DEV_AUTO_LOGIN_MODE, false).value as boolean); // 개발자동로그인모드
const moveLoginAfter = ref('/main/more-main');

const handleSetting = async () => {
  // 더미API모드 설정
  commonStore.setDummyApiMode(isDummyApiMode.value);

  const devAuthLoginModeStorage = useStorage(LocalStorageKey.DEV_AUTO_LOGIN_MODE, false);
  devAuthLoginModeStorage.value = isDevAutoLoginMode.value;

  router.push({ path: moveLoginAfter.value });
};

// 로그인 버튼 클릭
const handleLogin = async () => {
  const sampleAuthReq: SampleAuthReq = {
    mblOsKndCd: 'I',
    moappVer: '2.4.2',
    moappMbrsSno: '*9Tester3^',
    rnwlDtm: '2024-05-29 13:53:56',
    mbphHwId: 'A0E4684F-20EC-42B3-8A71-CCB0D4BC9C84',
    mbphOsVer: '17.1.1'
  };

  // 더미API모드 설정
  commonStore.setDummyApiMode(isDummyApiMode.value);

  if (isDummyApiMode.value) {
    // 더미서버 모드일 경우는 에뮬레이터에서 인증정보 가져옴
    await authStore.getAuthTokenAction();
    router.push({ path: moveLoginAfter.value });
  } else {
    // 인증정보 조회
    const sampleAuth = await sampleAuthStore.getHttpAuthAction(sampleAuthReq);
    if (sampleAuth) {
      // 개발자동로그인모드 설정
      const devAuthLoginModeStorage = useStorage(LocalStorageKey.DEV_AUTO_LOGIN_MODE, false);
      devAuthLoginModeStorage.value = isDevAutoLoginMode.value;

      const authInfo: AuthInfoInterface = {
        token: sampleAuth.authToken,
        uuid: sampleAuthReq.mbphHwId,
        appCode: 'MIC',
        osKnd: sampleAuthReq.mblOsKndCd,
        osVer: sampleAuthReq.mbphOsVer,
        appVerCode: '2.4.2',
        appVer: sampleAuthReq.moappVer,
        mbrNm: sampleAuth.userName,
        moappMbrsSno: sampleAuth.moappMbrsSno,
        mbrBrdt: sampleAuth.userBirthDate,
        mbrphNo: sampleAuth.userPhoneNumber,
        ondaAuthToken: '',
        genderCode: 'M'
      };
      await authStore.setAuthTokenAction(authInfo);
      router.push({ path: moveLoginAfter.value });
    }
  }
};
</script>

<script lang="ts">
export default {
  name: 'loginPage',
  inheritAttrs: false,
  customOptions: {}
};
</script>

<style scoped>
.round_box .box_title {
  margin-bottom: 1rem;
}
.button-container {
  margin-top: 20px; /* Adjust this value as needed */
  text-align: right;
}
.login-button {
  margin-left: 20px;
}
</style>
