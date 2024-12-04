<template>
  <sub-header :title="'회원 정보 확인'" :hide-title="true" :click-callback="() => {cancelPopup = true}" :bg-color="'#F4F4F4'" />
  <main class="main verification">
    <div class="container bottom_btns pt12">
      <div class="verification_txt">
        <p class="b_txt">회원 정보 확인</p>
        <p class="s_txt gray090">티머니GO에서 사용하실 회원정보를 확인해주세요</p>
      </div>
      <round-box class="verification_box box_title_none">
        <ul class="veri_member_list">
          <li>
            <p class="veri_title">이름</p>
            <div class="veri_info_area">
              <p>{{ authInfo.prsnAuthResult?.userNm }}</p>
            </div>
          </li>
          <li>
            <p class="veri_title">생년월일</p>
            <div class="veri_info_area">
              <p class="veri_num">{{ formatDate(authInfo.prsnAuthResult?.userBrdt, 'YYYY.MM.DD') }}</p>
            </div>
          </li>
          <li>
            <p class="veri_title">휴대전화</p>
            <div class="veri_info_area">
              <p class="veri_num">{{ maskPhoneNumber(authInfo.prsnAuthResult?.mbphNo ? authInfo.prsnAuthResult?.mbphNo : '') }}</p>
            </div>
          </li>
        </ul>
      </round-box>
      <div class="invite_friends">
        <p class="invite_message">친구 초대를 받으셨나요?</p>
        <round-box>
          <form>
            <uu-input
              v-model="input"
              :maxLength="7"
              label="초대받은 분의 코드를 입력해 주세요"
              placeholder="초대코드 입력"
            />
          </form>
        </round-box>
      </div>
      <div class="btn_area">
        <uu-button :size="'xl'" :btn-color="'primary'" :label="'다음'" @click="next" />
      </div>
    </div>
  </main>
  <!-- 회원가입 취소 팝업 -->
  <join-cancel-popup :is-show="cancelPopup" @accept="close" @close="cancelPopup = false" />
</template>

<script setup lang="ts">
import subHeader from '@/components/layout/SubHeader.vue'
import { computed, ref } from 'vue'
import UuButton from '@/components/uu-components/UuButton.vue'
import RoundBox from '@/components/layout/RoundBox.vue'
import router from '@/router'
import { getAppBridge } from '@/utils'
import JoinCancelPopup from '@/views/verification/component/JoinCancelPopup.vue';
import { useAuthStore } from '@/service/auth/authModule'
import { formatDate } from '@/utils/dateUtils';
import type { reqSignUpModel } from '@/service/member/model/memberModel'

const input = ref('') //초대코드 입력받을 ref
const authStore = useAuthStore();
const cancelPopup = ref(false); 
const myInfo = computed(() => ( authStore.getAuthInfo ))
const authInfo = computed(() => ( authStore.getIdentityInfo ))
const prePage = authStore.getPreVerification

function maskPhoneNumber(phone: string): string {
  if(!phone){
    return '';
  }
  // 숫자만 추출
  const cleanedPhone = phone.replace(/\D/g, '');

  if (cleanedPhone.startsWith('02')) {
    // 서울 지역번호인 '02'인 경우 (예: 02-1234-5678 -> 02.***.5678)
    return `${cleanedPhone.slice(0, 2)}.${'****'}.${cleanedPhone.slice(-4)}`;
  } else {
    return `${cleanedPhone.slice(0, 3)}.${'****'}.${cleanedPhone.slice(-4)}`;
  }
}

/**
 * @description 회원가입 성공화면으로 이동
 */
const next = async () => {
  const { useTermsStore } = await import('@/service/terms/termsModule');
  const termsStore = useTermsStore();
  const stplAllList = termsStore.getStplAllList;
  const mrkgYn = termsStore.getMrkgYn;

  const param : (reqSignUpModel) = {
    moappMbrsSno : authInfo.value.prsnAuthResult?.moappMbrsSno || '', //모바일앱회원일련번호
    prsnAuthSno : authInfo.value.prsnAuthResult?.prsnAuthSno || '', //본인인증일련번호
    joinYn : authInfo.value.prsnAuthResult?.joinYn || '', //가입여부 
    mailRcvYn : mrkgYn && mrkgYn == 'Y' ? 'Y' : 'N', //이메일수신여부(Y/N)
    pushRcvYn : mrkgYn && mrkgYn == 'Y' ? 'Y' : 'N', //PUSH수신여부(Y/N) 
    mrkgRcvYn : mrkgYn && mrkgYn == 'Y' ? 'Y' : 'N', //마케팅수신여부(Y/N) 
    smsRcvYn : mrkgYn && mrkgYn == 'Y' ? 'Y' : 'N', //SMS수신여부(Y/N) 
    stplAllList : stplAllList,  //약관리스트
    mblOsKndCd : myInfo.value.osKnd, //모바일OS종류코드 
    mbphOsVer : myInfo.value.osVer, //휴대폰OS버전
    mbphHwId : myInfo.value.uuid, //휴대폰식별ID uuid
    moappVer :myInfo.value.appVer, //모바일앱버전
    tGo1Yn : authInfo.value.prsnAuthResult?.tGo1Yn || '', //티머니GO1.0회원여부(Y/N)
    frndInvnSno : input.value, //친구초대일련번호
    prntAuthSno : authInfo.value.prsnAuthResult?.prntAuthSno // 부모인증 후, 리턴되는 prntAuthSno 값을 사용
  }
  
  try {
    const { useMemberStore } = await import('@/service/member/memberModule');
    const memberStore = useMemberStore();
    const res = await memberStore.signUp(param);
    if(res && res.scsYn == 'Y'){
      //회원가입 성공화면으로 이동
      router.replace({ path: '/verification/success' })
    }
  } catch (error) {
    console.error(error);
  }
}

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
  if (prePage) {
    authStore.setPreVerification(null);
    router.replace({ path: '/main/more-main' })
  } else {
    moveTmoneyGo()
  }
}

</script>
