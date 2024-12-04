<template>
    <sub-header :title="'약관 동의'" :hide-title="true" :bg-color="'#F4F4F4'" :click-callback="close"/>
    <main class="main verification">
        <div class="container bottom_btns pt12">
            <p class="img_area">
            <img src="/assets/images/kakao_logo.svg" alt="카카오앱" />
            </p>
            <div class="verification_txt">
            <p class="b_txt">
                카카오뱅크  앱에서<br>인증을 진행해 주세요.
            </p>
            <p class="s_txt">
                입력하신 휴대폰으로<br>
                인증 요청 메시지를 보냈습니다.
            </p>
            </div>
            <round-box :title="'카카오뱅크 앱이 열리지 않나요?'" class="verification_box">
            <ul class="verification_list">
                <li><i class="circle"></i><span>카카오뱅크 알림 수신 여부를 확인해 주세요.</span></li>
            </ul>
            </round-box>
            <div class="btn_area">
            <uu-button
                :size="'xl'"
                :btn-color="'primary'"
                :label="'인증 완료'"
                @click="openTerms"
                :disabled="!isCertCompleted"
            />
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import subHeader from '@/components/layout/SubHeader.vue';
import { onMounted, ref } from 'vue';
import UuButton from '@/components/uu-components/UuButton.vue';
import RoundBox from '@/components/layout/RoundBox.vue';
import router from '@/router';
import { FlexResponseCode } from '@/utils/hybrid/type';
import { getAppBridge } from '@/utils';
import { debounce } from 'lodash-es';
import { useAuthStore } from '@/service/auth/authModule';
import { useRoute } from 'vue-router';
import { useMemberStore } from '@/service/member/memberModule';
import { storeToRefs } from 'pinia';
import type { reqUpdatePushToken } from '@/service/member/model/memberModel';
import { formatDate } from '@/utils/dateUtils';

const route = useRoute()
const isCertCompleted = ref(false);
const authStore = useAuthStore();
const memberStore = useMemberStore();
const { getIdentityInfo } = storeToRefs(authStore);
const entryPath: keyof string | any = route.query?.path || 'S'

// 카카오 인증 호출
const startKakaoCert = () => {
    console.log('카카오 인증 호출');
    kakaoCert(); //카카오뱅크 앱 브릿지 호출
};

// 카카오인증 호출
const kakaoCert = async () => {
    const reg = await authStore.actionCallVerify(0);
    await authStore.getAuthTokenAction();

    if (reg && reg.response.code === FlexResponseCode.OK) {
        // 인증 완료 버튼 활성화
        isCertCompleted.value = true;
    }else{
        isCertCompleted.value = false;
        // 인증 실패시 화면 노출 
        router.push({path:'/verification/fail'});
    }
};

/**
 * @description 약관동의 팝업 노출
 */
 const openTerms = async () => {
   // 최초회원가입 유무에 따라 팝업 노출해야함
   if(getIdentityInfo.value.prsnAuthResult?.joinYn != 'Y'){
      callTerms();
    }else{ // 기존회원인 경우
      const myInfo = await authStore.getAuthTokenAction();
      
      //푸시토큰 업데이트
      try{
          const param = {
            pushTkn: myInfo.pushToken, //푸시토큰
            pushSvcDvsCd: myInfo.osKnd == 'A' ? '1' : '2' //푸시서비스구분코드
          } as reqUpdatePushToken
          await memberStore.updatePushToken(param);
        }catch(error) {
            console.error(error);
        }

      if(entryPath == 'S'){ // 서비스화면에서 진입한게 아닌경우
        console.log('로그인 성공')
        moveTmoneyGo
      }else{
        // 이용서비스 약관 동의 여부
        const lnkgYn = await getLinkedServiceCodeList()
        if(lnkgYn){
          moveTmoneyGo// 웹뷰 닫기
        }else{
          callTerms();// 약관화면으로 이동
        }
      }
    }
  };

// 회원 연동 서비스 조회
async function getLinkedServiceCodeList() {
  const param = {
    inqrDtm: formatDate(new Date(), 'YYYYMMDDHHmmss')
  };
  const codeList = await memberStore.setLinkedServiceCodeList(param);
  return codeList.lnkgSvcList.find((e) => e.lnkgSvcCd == entryPath )?.lnkgYn == 'Y';  
}

/**
 * @description 약관동의 화면 호출
 */
const callTerms = debounce(async () => {
const { useTermsStore } = await import('@/service/terms/termsModule');
    const termsStore = useTermsStore();

    const param = {
        svcDvsCd: "1", 
        stplGrpCd: "MJ" 
    };
    termsStore.initParam(param, moveTmoneyGo);

    //호출하는 페이지 코드
    const page = "S";
    router.push({ path: '/verification/terms', query: { page: page } });
}, 300);

/**
 * 티머니고 홈으로 이동(웹뷰 닫기)
 */
const moveTmoneyGo = async () => {
    console.log('moveTmoneyGo');
    const appBridge = await getAppBridge();
    await appBridge.closeWebView();
};

/**
 * 웹뷰 닫기
 */
 const close = async () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    const appBridge = await getAppBridge();
    await appBridge.closeWebView();
  }
}


onMounted(() => {
    startKakaoCert();
});
</script>
