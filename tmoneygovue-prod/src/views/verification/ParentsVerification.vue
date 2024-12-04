<template>
  <sub-header :title="'보호자 본인인증'" :hide-title="true"  :click-callback="() => {cancelPopup = true}" :bg-color="'#F4F4F4'" />
  <main class="main verification">
    <div class="container bottom_btns pt12">
      <div class="verification_txt">
        <p class="b_txt">만 13세는 보호자 동의와<br />본인인증이 필요해요.</p>
        <p class="s_txt gray090">
          보호자(부모,법정대리인)의 동의와<br />
          본인인증을 통해서 회원가입해주세요.
        </p>
        <p class="point_txt">
          만 13세 회원은 티머니GO에서 제공하는<br />
          공공자전거 대여 서비스만 이용이 가능해요.
        </p>
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
        <div class="all_agree">
          <div class="all_agree_check">
            <uu-checkbox
              label="이용 안내 사항 확인 <span>(필수)</span>"
              value="이용 안내 사항 확인"
              v-model="isCertCompleted"
              class="all"
              :isHtmlLabel="true"
              @change= "!isCertCompleted"
            />
            <p class="agree_discription">
              위 상세내용을 확인하였으며, 법정대리인 인증 절차를 진행하여 회원가입을 진행합니다.
            </p>
          </div>
        </div>
      </round-box>
      <div class="btn_area">
        <uu-button
          :size="'xl'"
          :btn-color="'primary'"
          :label="'보호자 본인인증하기'"
          @click="loginConfirmCallback"
          :disabled="!isCertCompleted"
        />
      </div>
    </div>
  </main>
  <!-- 회원가입 취소 팝업 -->
  <join-cancel-popup :is-show="cancelPopup" @accept="close" @close="cancelPopup = false" />
</template>

<script setup lang="ts">
import subHeader from '@/components/layout/SubHeader.vue'
import { computed, onMounted, ref } from 'vue'
import UuButton from '@/components/uu-components/UuButton.vue'
import RoundBox from '@/components/layout/RoundBox.vue'
import router from '@/router'
import { FlexResponseCode } from '@/utils/hybrid/type'
import { getAppBridge } from '@/utils'
import JoinCancelPopup from '@/views/verification/component/JoinCancelPopup.vue';
import { useAuthStore } from '@/service/auth/authModule'
import { formatDate } from '@/utils/dateUtils';

const authStore = useAuthStore();
const cancelPopup = ref(false); 
const isCertCompleted = ref(false)
const authInfo = computed(() => ( authStore.getIdentityInfo ))
const prePage = authStore.getPreVerification

// 로그인 브릿지 호출
const loginConfirmCallback = async () => {
    console.log('보호자 본인인증 호출');
    const reg = await authStore.actionCallVerify(2);
    
    console.log('reg : ',reg);
    if (reg && reg.response.code === FlexResponseCode.OK) {
      // 회원가입 성공화면으로 이동
    //   const age = "C"; // A : adult, C: child
    //   router.push({ path: '/verification/success', query: { type: age } });
    
        //회원정보 확인 페이지로 이동
        router.push({path:'/verification/my'});
    }else{
      //인증 실패 화면 노출
      router.push({path:'/verification/fail'});
    }
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
  if (prePage) {
    authStore.setPreVerification(null);
    router.replace({ path: '/main/more-main' })
  } else {
    moveTmoneyGo()
  }
}


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

</script>
