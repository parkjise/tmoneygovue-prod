<template>
  <sub-header :title="'약관 동의'" :hide-title=true :bg-color="'#FFF'" />
  <main class="main verification">
      <div class="container bg-white bottom_btns pt12">
        <p class="img_area">
          <img src="/assets/images/toss_logo.svg" alt="토스앱" />
        </p>
        <div class="verification_txt">
          <p class="b_txt">
            토스(TOSS)앱에서<br>인증을 진행해 주세요.
          </p>
          <p class="s_txt">
            입력하신 휴대폰으로<br>
            인증 요청 메시지를 보냈습니다.
          </p>
        </div>
        <round-box :title="'알림이 오지 않으셨나요?'" class="verification_box">
          <ul class="verification_list">
            <li><i class="circle"></i><span>토스 앱 설치 여부를 확인해 주세요.</span></li>
            <li><i class="circle"></i><span>토스 알림 수신 여부를 확인해 주세요.</span></li>
            <li><i class="circle"></i><span>토스 앱 > 하단 바 ‘전체’ 메뉴 > 설정 > 인증서 > 토스 인증서에서 인증요청 내용을 확인하실 수 있어요.</span></li>
            <li><i class="circle"></i><span>문제가 계속된다면, 토스 고객센터(1599-4905)로 문의해 주세요.</span></li>
          </ul>
        </round-box>
        <div class="btn_area">
          <uu-button
            :size="'xl'"
            :btn-color="'primary'"
            :label="'인증 완료'"
            @click="openTerms"
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
import { getAppBridge } from '@/utils';
import { debounce } from 'lodash-es';
import { useAuthStore } from '@/service/auth/authModule';
import { useRoute } from 'vue-router';
import { formatDate } from '@vueuse/core';
import { useMemberStore } from '@/service/member/memberModule';
import type { reqUpdatePushToken, reqTossAuthResultModel } from '@/service/member/model/memberModel';
import type { reqPrsnAuthInfo, verifyResponse } from '@/utils/hybrid/etc/etc.type';
import { storeToRefs } from 'pinia/dist/pinia';

const route = useRoute()
const authStore = useAuthStore();
const memberStore = useMemberStore();
const entryPath: keyof string | any = route.query?.path || 'S'
const prePage = authStore.getPreVerification
const tossAuth = memberStore.getTossAuth;
const { getIdentityInfo } = storeToRefs(authStore);


onMounted(async()=>{
  // 토스앱 호출
  try {
    const appBridge = await getAppBridge()
    await appBridge.openView({
      url: memberStore.getTossAuth.data?.appScheme || '',
      viewType: 'urlscheme'
    })
  } catch (error) {
    console.error('앱 브릿지 호출 실패:', error)
  }
})
/**
 * @description 약관동의 팝업 노출
 */
 const openTerms = async () => {
    const param = {
      txId: tossAuth.data?.txId,
    } as reqTossAuthResultModel
    try{
      //토스 회원본인인증 확인 api 
      const authResult = await memberStore.getTossAuthResult(param)
      console.log('authResult : ',authResult);

      if(authResult.rspCd && authResult.rspCd == '0000'){
        const authInfo = {
          prsnAuthResult : {
            prsnAuthScsYn: authResult.data?.prsnAuthScsYn,
            prsnAuthSno: authResult.data?.prsnAuthSno, //본인인증일련번호
            mbphNo: authResult.data?.mbphNo,
            ageDvsCd: authResult.data?.ageDvsCd, // 연령코드 0: unknown, 1: 성인, 2: 만 13세, 3: 만 13세 미만
            userBrdt: authResult.data?.userBrdt,
            frndInvnTgtYn: authResult.data?.frndInvnTgtYn,
            userNm: authResult.data?.userNm,
            drmbYn: authResult.data?.drmbYn,
            moappMbrsSno: authResult.data?.moappMbrsSno,
            joinYn: authResult.data?.joinYn, // 기존 회원 유무,
            authTkn: authResult.data?.authTkn,
            tGo1Yn: authResult.data?.tGo1Yn,
            gndrCd: authResult.data?.gndrCd || 'M'
          },
          response: {
            code: '0000', // 예시 코드
            message: 'OK'
          }
        } as verifyResponse
        console.log('authInfo param: ',authInfo)
        authStore.setIdentityInfo(authInfo);
        await authStore.getAuthTokenAction();

        if(authResult.data?.joinYn){
          // 최초회원가입 유무에 따라 팝업 노출해야함
          if(authResult.data?.joinYn != 'Y'){
            // 약관화면으로 이동
            callTerms();
          } else { // 기존회원인 경우
            const appParam : (reqPrsnAuthInfo) = {
              prsnAuthScsYn : getIdentityInfo.value.prsnAuthResult?.prsnAuthScsYn,
              moappMbrsSno : getIdentityInfo.value.prsnAuthResult?.moappMbrsSno,
              joinYn : getIdentityInfo.value.prsnAuthResult?.joinYn,
              prsnAuthSno : getIdentityInfo.value.prsnAuthResult?.prsnAuthSno,
              userNm : getIdentityInfo.value.prsnAuthResult?.userNm,
              userBrdt : getIdentityInfo.value.prsnAuthResult?.userBrdt,
              mbphNo : getIdentityInfo.value.prsnAuthResult?.mbphNo,
              authTkn : getIdentityInfo.value.prsnAuthResult?.authTkn,
              prsnAuthRstMsg : null,
              tGo1Yn : getIdentityInfo.value.prsnAuthResult?.tGo1Yn,
              prsnAuthErmsCtt : null,
              drmbYn : getIdentityInfo.value.prsnAuthResult?.drmbYn,
              frndInvnTgtYn : getIdentityInfo.value.prsnAuthResult?.frndInvnTgtYn,
              ageDvsCd : getIdentityInfo.value.prsnAuthResult?.ageDvsCd,
              prntAuthSno : getIdentityInfo.value.prsnAuthResult?.prntAuthSno,
              gndrCd : getIdentityInfo.value.prsnAuthResult?.gndrCd
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
              if(lnkgYn){
                //회원가입 정보 전달 앱브릿지 호출
                try{
                  console.log('appParam : ',appParam);
                  const appBridge = await getAppBridge();
                  await appBridge.getPrsnAuthInfo(appParam);
                }catch(error) {
                  console.error('회원가입 정보 전달 앱브릿지 호출 실패: ',error);
                }
                close() // 웹뷰 닫기
              }else{
                callTerms();// 약관화면으로 이동
              }
            }
          }
        }
      }else{
        router.replace({path:'/verification/fail'});
      }
    }catch(err){
      console.error(err);
      router.replace({path:'/verification/fail'});
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
  const page = entryPath;

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
 * 닫기
 */
 const close = async () => {
  if (prePage) {
    authStore.setPreVerification(null);
    router.replace({ path: '/main/more-main' })
  } else {
    const appBridge = await getAppBridge();
    await appBridge.closeWebView();
  }
}

</script>
