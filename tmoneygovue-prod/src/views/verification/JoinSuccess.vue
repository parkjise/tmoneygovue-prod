<template>
  <sub-header :title="'회원 가입 완료'" :hide-title="true" :hideBack="true" :bg-color="'#F4F4F4'" />
  <main class="main verification">
    <div class="container bottom_btns pt12">
      <div class="join_success">
        <p class="img_area">
          <img
            src="/assets/images/invite_friends/invite_img_04.svg"
            alt="티머니버스이미지"
          />
        </p>
        <div class="verification_txt">
          <p class="b_txt">회원 가입 완료</p>
          <p class="s_txt">티머니GO에 오신 것을 환영해요!</p>
          <p class="s_txt_02">
            티머니GO와 함께<br />
            스마트한 모빌리티 라이프를 시작하세요!
          </p>
        </div>
      </div>

      <div class="btn_area">
        <uu-button
          :size="'xl'"
          :btn-color="'primary'"
          :label= "'티머니GO 시작하기'"
          @click="next"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import subHeader from '@/components/layout/SubHeader.vue'
import { computed, onMounted, ref } from 'vue'
import UuButton from '@/components/uu-components/UuButton.vue'
import router from '@/router'
import { getAppBridge } from '@/utils'
import { useAuthStore } from '@/service/auth/authModule'
import type { reqPrsnAuthInfo } from '@/utils/hybrid/etc/etc.type'

const authStore = useAuthStore();
const prePage = authStore.getPreVerification
const authInfo = computed(() => ( authStore.getIdentityInfo ))

 const next = async () => {
    close()
  };

/**
 * 티머니고 홈으로 이동(웹뷰 닫기)
 */
 const moveTmoneyGo = async () => {
  console.log('moveTmoneyGo');
  const appBridge = await getAppBridge();
  await appBridge.closeWebView();
};

/**
 * 닫기
 */
 const close = async () => {
  const appParam : (reqPrsnAuthInfo) = {
    prsnAuthScsYn : authInfo.value.prsnAuthResult?.prsnAuthScsYn,
    moappMbrsSno : authInfo.value.prsnAuthResult?.moappMbrsSno,
    joinYn : authInfo.value.prsnAuthResult?.joinYn,
    prsnAuthSno : authInfo.value.prsnAuthResult?.prsnAuthSno,
    userNm : authInfo.value.prsnAuthResult?.userNm,
    userBrdt : authInfo.value.prsnAuthResult?.userBrdt,
    mbphNo : authInfo.value.prsnAuthResult?.mbphNo,
    authTkn : authInfo.value.prsnAuthResult?.authTkn,
    prsnAuthRstMsg : null,
    tGo1Yn : authInfo.value.prsnAuthResult?.tGo1Yn,
    prsnAuthErmsCtt : null,
    drmbYn : authInfo.value.prsnAuthResult?.drmbYn,
    frndInvnTgtYn : authInfo.value.prsnAuthResult?.frndInvnTgtYn,
    ageDvsCd : authInfo.value.prsnAuthResult?.ageDvsCd,
    prntAuthSno : authInfo.value.prsnAuthResult?.prntAuthSno,
    gndrCd : authInfo.value.prsnAuthResult?.gndrCd
  }
  try{
    console.log('appParam : ',appParam);
    const appBridge = await getAppBridge();
    await appBridge.getPrsnAuthInfo(appParam);
  } catch(error) {
    console.error('회원가입 정보 전달 앱브릿지 호출 실패: ',error);
  }

  if (prePage) {
    authStore.setPreVerification(null);
    router.replace({ path: '/main/more-main' })
  } else {
    moveTmoneyGo()
  }
}

onMounted(() => {
  console.log('회원가입 성공화면')
})
</script>
