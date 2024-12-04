<template>
  <sub-header :title="'약관 동의'" :hide-title="true" :bg-color="'#FFF'" :click-callback="close" />
    <!-- main -->
    <main class="main verification">
      <div class="container bg-white bottom_btns pt12">
        <div class="verification_txt">
          <p class="b_txt">
            지금 바로 티머니GO를<br>시작해볼까요?
          </p>
          <p class="s_txt">
            인증방식을 선택해 주세요.
          </p>
        </div>
        <div class="btn_area verification_btn">
          <p class="verification_message">
            토스페이도 연동할 수 있어요!
          </p>
          <uu-button 
            :size="'xl'"
            :btn-color="'primary'"
            :label="'토스로 시작하기'"
            @click="openTossCert"
            class="toss"
          />
          <!-- <uu-button 
            :size="'xl'"
            :btn-color="'primary'"
            :label="'카카오뱅크로 시작하기'"
            @click="openKakaoCert"
            class="kakao"
          /> -->
          <uu-button
            :size="'xl'"
            :btn-color="'primary'"
            :label="'휴대폰 본인 인증으로 시작하기'"
            @click="loginConfirmCallback"
            class="pass"
          />
        </div>
      </div>
    </main>
</template>

<script setup lang="ts">
import subHeader from '@/components/layout/SubHeader.vue';
import { onMounted, ref } from 'vue';
import UuButton from '@/components/uu-components/UuButton.vue';
import router from '@/router';
import { getAppBridge } from '@/utils';
import { FlexResponseCode } from '@/utils/hybrid/type';
import { useAuthStore } from '@/service/auth/authModule';
import { debounce } from 'lodash-es';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { formatDate } from '@vueuse/core';
import { useMemberStore } from '@/service/member/memberModule';
import type { reqUpdatePushToken } from '@/service/member/model/memberModel';
import type { reqPrsnAuthInfo } from '@/utils/hybrid/etc/etc.type';

const route = useRoute()
const entryPath: keyof string | any = route.query?.path || 'S'
const authStore = useAuthStore();
const memberStore = useMemberStore();
const { getIdentityInfo } = storeToRefs(authStore);
const prePage = authStore.getPreVerification

// 로그인 브릿지 호출
const loginConfirmCallback = async () => {
    console.log('pass 호출 : ',entryPath);
    const reg = await authStore.actionCallVerify(0);

    console.log('reg : ',reg);
    if (reg && reg.response.code === FlexResponseCode.OK) {
      const getAuthToken = await authStore.getAuthTokenAction();
      console.log('getAuthToken : ',getAuthToken);
      
      // 최초로그인인 경우
      if(reg.prsnAuthResult?.joinYn != 'Y'){
        console.log('비회원')
        // 약관동의 화면으로 이동
        callTerms();
      } else{ // 기존회원인 경우
        console.log('기존회원')
        const appParam : (reqPrsnAuthInfo) = {
          prsnAuthScsYn : reg.prsnAuthResult?.prsnAuthScsYn,
          moappMbrsSno : reg.prsnAuthResult?.moappMbrsSno,
          joinYn : reg.prsnAuthResult?.joinYn,
          prsnAuthSno : reg.prsnAuthResult?.prsnAuthSno,
          userNm : reg.prsnAuthResult?.userNm,
          userBrdt : reg.prsnAuthResult?.userBrdt,
          mbphNo : reg.prsnAuthResult?.mbphNo,
          authTkn : reg.prsnAuthResult?.authTkn,
          prsnAuthRstMsg : null,
          tGo1Yn : reg.prsnAuthResult?.tGo1Yn,
          prsnAuthErmsCtt : null,
          drmbYn : reg.prsnAuthResult?.drmbYn,
          frndInvnTgtYn : reg.prsnAuthResult?.frndInvnTgtYn,
          ageDvsCd : reg.prsnAuthResult?.ageDvsCd,
          prntAuthSno : reg.prsnAuthResult?.prntAuthSno,
          gndrCd : reg.prsnAuthResult?.gndrCd
        }
        if(entryPath == 'S'){ // 서비스화면에서 진입한게 아닌경우
          console.log('로그인 성공')
          //회원가입 정보 전달 앱브릿지 호출
          try{
            console.log('appParam : ',appParam);
            const appBridge = await getAppBridge();
            await appBridge.getPrsnAuthInfo(appParam);
          }catch(error) {
              console.error('회원가입 정보 전달 앱브릿지 호출 실패: ',error);
          }
          close()
        }else{
          // 이용서비스 약관 동의 여부
          const lnkgYn = await getLinkedServiceCodeList()
          console.log('lnkgYn : ',lnkgYn);
          if(lnkgYn){
            //회원가입 정보 전달 앱브릿지 호출
            try{
              console.log('appParam : ',appParam);
              const appBridge = await getAppBridge();
              await appBridge.getPrsnAuthInfo(appParam);
            }catch(error) {
                console.error('회원가입 정보 전달 앱브릿지 호출 실패: ',error);
            }
            close()// 웹뷰 닫기
          }else{
            callTerms();// 약관화면으로 이동
          }
        }
      }
    }else{
      //인증 실패 화면 노출
      router.push({path:'/verification/fail'});
    }
  };

// 회원 연동 서비스 조회
async function getLinkedServiceCodeList() {
  const param = {
    inqrDtm: formatDate(new Date(), 'YYYYMMDDHHmmss')
  };
  const codeList = await memberStore.setLinkedServiceCodeList(param);
  console.log('codeList : ',codeList);
  return codeList.lnkgSvcList.find((e) => e.lnkgSvcCd == entryPath )?.lnkgYn == 'Y';  
}


// 토스 인증 대기 화면 이동
const openTossCert = async () => {
  console.log('토스 호출');
    router.push({path:'/verification/toss-login'});
  };

// 카카오 인증 대기 화면 이동
const openKakaoCert = async () => {
    console.log('카카오 호출');
    router.push({path:'/verification/kakao', query: { path: entryPath } });
  };

/**
 * 닫기
 */
 const close = async () => {
  console.log('close 호출')
  if (prePage) {
    console.log('prePage : ',prePage)
    authStore.setPreVerification(null);
    router.replace({ path: '/main/more-main' })
  } else {
    console.log('closeWebView')
    const appBridge = await getAppBridge();
    await appBridge.closeWebView();
  }
}

/**
 * @description 약관동의 화면 호출
 */
 const callTerms = debounce(async () => {
  console.log('callTerms 호출')
  const { useTermsStore } = await import('@/service/terms/termsModule');
  const termsStore = useTermsStore();

  const param = {
    svcDvsCd: "1", 
    stplGrpCd: "MJ" 
  };
  termsStore.initParam(param, null);

  //호출하는 페이지 코드
  const page = entryPath;

  router.push({ path: '/verification/terms', query: { page: page } });
}, 300);

</script>
