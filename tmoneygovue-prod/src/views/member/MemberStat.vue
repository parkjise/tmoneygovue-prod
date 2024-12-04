<template>
  <sub-header title="회원정보" />
  <main id="main" class="main mor" v-if="!isShowInit">
    <div class="container member_info">
      <round-box title="티머니GO 회원정보">
        <ul class="member_list">
          <li>
            <h2 class="title">이름</h2>
            <div class="info_area">
              <p>{{ memberInfo.mbrsNm }}</p>
              <uu-button btn-style="line" label="로그아웃" @click="onClickLogout" />
            </div>
          </li>
          <li>
            <h2 class="title">휴대전화번호</h2>
            <div class="info_area">
              <p class="num">{{ memberInfo.mbrsMbphNo }}</p>
            </div>
          </li>
          <li class="top">
            <h2 class="title">교통카드</h2>
            <div v-if="memberInfo.rgtTrcrCnt == '미등록'" class="info_area">
              <p>미등록</p>
            </div>
            <div v-else class="info_area">
              <div class="horizontal" aria-labelledby="tmoney" tabindex="0">
                <p id="tmoney" aria-hidden="true" class="sr_only">티머니{{ memberStore.getRegisteredCardCounts[0] }}개</p>
                <div aria-hidden="true">
                  티머니 
                  <strong class="purple">
                    {{ memberStore.getRegisteredCardCounts[0] }}
                  </strong>
                  개
                </div>
              </div>
              <div class="horizontal" aria-labelledby="creditcard" tabindex="0">
                <p id="creditcard" aria-hidden="true" class="sr_only">신용카드 와 체크카드 {{ memberStore.getRegisteredCardCounts[1] }}개</p>
                <div class="horizontal" aria-hidden="true">
                  신용/체크 
                  <strong class="gray">
                    {{ memberStore.getRegisteredCardCounts[1] }}
                    </strong>
                  개
                </div>
              </div>
            </div>
            <uu-button btn-style="line" label="변경" @click="onClickChangeCardPage" />
          </li>
        </ul>
        <uu-button btn-style="none" class="full" href="/member/withdraw-membership">
          <span>티머니GO 회원 탈퇴</span>
          <uu-ic size="16" name="arrow_right" color="gray" />
        </uu-button>
      </round-box>

      <!-- 따릉이 회원정보 -->
      <round-box title="따릉이 회원정보">
        <ul v-if="memberInfo.bcclMbrsId" class="member_list">
          <li>
            <p class="title">아이디</p>
            <div class="info_area">
              <p>{{ memberInfo.bcclMbrsId }}</p>
              <uu-button btn-style="line" label="연동해제" @click="onClickLogoutDdareongMember" />
            </div>
          </li>
          <li class="top">
            <p class="title">이메일</p>
            <div class="info_area">
              <p class="num">{{ getMaskingEmail(memberInfo.email) }}</p>
            </div>
            <uu-button btn-style="line" label="변경" href="/member/change-email" />
          </li>
          <li v-if="memberInfo.chldBcclYn === 'Y'">
            <p class="title">보호자<br />휴대전화번호</p>
            <div class="info_area">
              <p>{{ memberInfo.prntMbphNo }}</p>
              <uu-button btn-style="line" label="변경" href="/member/change-parent-phone-number" />
            </div>
          </li>
          <li>
            <p class="title">계정 비밀번호</p>
            <uu-button btn-style="line" label="변경" href="/member/change-pw" />
          </li>
          <li>
            <p class="title">체중</p>
            <div class="info_area">
              <p role="text" :aria-label="memberInfo.weight + 'kg'">
                <span>{{ memberInfo.weight }}</span
                >kg
              </p>
              <uu-button btn-style="line" label="변경" href="/member/change-weight" />
            </div>
            <p class="desc">
              운동량계산을 위해 필요한 정보입니다.<br />
              미기재시 65kg으로 계산됩니다.
            </p>
          </li>
        </ul>
        <uu-button v-else btn-style="line" size="xl" label="따릉이 가입하기" @click="onClickSignInDdareong" />
      </round-box>
      <!--//  따릉이 회원정보 -->

      <round-box title="운전면허 등록 여부">
        <ul class="member_list">
          <li>
            <p class="title">운전면허증</p>
            <div class="info_area">
              <p>{{ memberInfo.drvLcnsRgtYn == 'Y' ? '등록' : '미등록' }}</p>
              <uu-button
                v-if="memberInfo.drvLcnsRgtYn == 'Y'"
                btn-style="line"
                label="삭제"
                @click="isDeleteLicensePopup = true"
              />
              <uu-button v-else btn-style="line" label="등록" href="/member/check-driver-license" />
            </div>
          </li>
        </ul>
      </round-box>
    </div>
  </main>

  <!-- 로그아웃/따릉이 연동해제 팝업-->
  <member-confirm-popup
    :isShowPopup="isShowPopup"
    :title="title"
    :message="message"
    :okBtnLabel="okBtnLabel"
    :closeBtnLabel="closeBtnLabel"
    @ok="okCallback"
    @isClose="isShowPopup = false"
  />
  <!-- 따릉이 가입하기 약관동의 -->
  <sign-in-ddareong-terms-bottom
    :isShowTerm="isShowTermsBottom"
    @close="isShowTermsBottom = false"
    @ok="registerTermAgreeYN"
  />
  <!-- 운전면허 삭제 팝업 -->
  <delete-driver-license-popup
    :isShowPopup="isDeleteLicensePopup"
    @ok="deleteDriverLicense"
    @close="isDeleteLicensePopup = false"
  />
</template>

<script setup lang="ts">
import MemberConfirmPopup from '@/views/member/components/MemberConfirmPopup.vue';
import SignInDdareongTermsBottom from '@/views/member/components/SignInDdareongTermsBottom.vue';
import DeleteDriverLicensePopup from './components/DeleteDriverLicensePopup.vue';
import { useMessageModal } from '@/composables/useMessageModal';
import { computed, onMounted, ref } from 'vue';
import { useMemberStore } from '@/service/member/memberModule';
import { useDriverLicense } from '@/service/member/driverLicenseModule';
import { useCommonStore } from '@/service/common/commonModule';
import { encodeUriRouterPath } from '@/utils/linkUtils';
import { formatDate } from '@/utils/dateUtils';
import { getAppBridge } from '@/utils';
import { storeToRefs } from 'pinia';
import type { reqSpfStplAgreeInfo } from '@/service/terms/model/requestModel';
import { useRouter } from 'vue-router';
import { sendAdbrix } from '@/utils/sendAdbrixUtil';
import { AdbrixEvtId } from '@/utils/hybrid/type';

const TRANSFER_REWARD = import.meta.env.VITE_TMONEY_URL + '/webview/mlg/v2/inqrTrcrRewards.do';

const router = useRouter();
const { createNotificationModal } = useMessageModal();
const licenseStore = useDriverLicense();
const memberStore = useMemberStore();
const { getDdareongSpfStplInfo } = storeToRefs(memberStore);

const isShowInit = ref(true);
const isShowPopup = ref(false); // 로그아웃 / 따릉이 연동해제 팝업
const isShowTermsBottom = ref(false); // 따릉이 약관동의 팝업
const isDeleteLicensePopup = ref(false); // 운전면허 삭제 팝업
const title = ref('');
const message = ref('');
const okBtnLabel = ref('');
const closeBtnLabel = ref('');
const okCallback = ref(); // 탈퇴 or 로그아웃

const memberInfo = computed(() => memberStore.memberInfo);

// 회원 정보 조회
async function getMemberInfo() {
  isShowInit.value = true;
  const param = {
    inqrtDtm: formatDate(new Date(), 'YYYYMMDDHHmmss')
  };
  await memberStore.setMemberInfoAction(param);
  isShowInit.value = false;
}

// 로그아웃 click
function onClickLogout() {
  title.value = '로그아웃 하시겠습니까?';
  message.value = '티머니GO 회원을 로그아웃 하시겠습니까?';
  okBtnLabel.value = '네';
  closeBtnLabel.value = '아니오';
  isShowPopup.value = true;
  okCallback.value = logout;
}

// 로그아웃
async function logout() {
  const appBridge = await getAppBridge();
  isShowPopup.value = false;
  const res = await memberStore.logout(formatDate(new Date(), 'YYYYMMDDHHmmss'));
  if (res.scsYn === 'N') {
    return;
  }
  await appBridge.logoutClearTGoData();
  await appBridge.showToast({
    message: '로그아웃 되었습니다.'
  });
  await appBridge.terminateApp();
}

function onClickChangeCardPage() {
  sendAdbrix(AdbrixEvtId.tapProfileTpc);
  // openView 브릿지 호출
  const commonStore = useCommonStore();
  commonStore.setRouterHeaderTitle('교통카드 리워드');
  router.push({ path: encodeUriRouterPath(TRANSFER_REWARD) });
}

// 따릉이 가입하기 네이티브 화면 이동
async function onClickDdareongPage() {
  // openView 브릿지 호출
  const appBridge = await getAppBridge();
  await appBridge.openView({
    url: 'member/joinBike',
    viewType: 'native'
  });
  await getMemberInfo();
}

//따릉이 연동해제 클릭
function onClickLogoutDdareongMember() {
  title.value = '따릉이를 연동해제 하시겠습니까?';
  message.value = '티머니GO에서 연동해제하셔도 따릉이\n정보는 탈퇴되지 않습니다.';
  okBtnLabel.value = '네, 연동해제합니다';
  closeBtnLabel.value = '아니오';
  okCallback.value = logoutDdareong;
  isShowPopup.value = true;
}

//따릉이 연동해제
async function logoutDdareong() {
  isShowPopup.value = false;
  const res = await memberStore.logoutDdareong();
  if (!res.data) {
    createNotificationModal('따릉이 연동해제가 불가합니다.', '따릉이 반납 후 이용해 주세요.');
    return;
  }
  if (res.data.lnkgClrYn === 'Y') {
    createNotificationModal('따릉이 연동해제가 완료되었습니다.', '해제 후 다시 등록할 수 있습니다.');
    getMemberInfo(); // 회원 정보 조회 api
  } else if (res.data.lnkgRsn) {
    createNotificationModal('따릉이 연동해제가 불가합니다.', res.data.lnkgRsn);
  } else {
    createNotificationModal('따릉이 연동해제가 불가합니다.', '따릉이 반납 후 이용해 주세요.');
  }
}

// 따릉이 가입하기
async function onClickSignInDdareong() {
  await memberStore.requestSignInDdareongTerms('D'); // 약관동의
  if (getDdareongSpfStplInfo.value.filter((item) => item.stplMndtYn == 'Y').every((item) => item.stplAgrmYn === 'Y')) {
    //따릉이 가입하기 네이티브 화면
    onClickDdareongPage();
  } else {
    // 약관동의 Bottom
    isShowTermsBottom.value = true;
  }
}

// 약관동의 동의 callBack
async function registerTermAgreeYN() {
  isShowTermsBottom.value = false;
  // 약관동의
  let stplList = [] as reqSpfStplAgreeInfo[];

  getDdareongSpfStplInfo.value.forEach((item) => {
    stplList.push({ stplAgrmYn: 'Y', stplSno: item.stplSno });
  });

  const res = await memberStore.requestRegisterDdareongTerms({ stplList });
  if (res?.rspCd === '0000') {
    //따릉이 가입하기 네이티브 화면
    onClickDdareongPage();
  }
}

// 운전면허증 삭제
async function deleteDriverLicense() {
  const appBridge = await getAppBridge();
  const res = await licenseStore.removeDriverLicense({ utlzSvcDvsCd: 'K' });
  if (res.data.scsYn == 'Y') {
    // 네이티브에서 운전면허 등록 여부 체크하기 위해 callAppPreference 브릿지 호출하여 preference 값 설정
    await appBridge.callAppPreference({ type: 'set', key: 'sctrLicenseYN', value: 'N' });
    await appBridge.showToast({ message: '삭제하였습니다.' });
    memberInfo.value.drvLcnsRgtYn = 'N';
    isDeleteLicensePopup.value = false;
  } else {
    await appBridge.showToast({ message: '삭제에 실패하였습니다.' });
  }
}

// Email Masking
function getMaskingEmail(email: string) {
  if (!email) {
    return '';
  }
  const index = email.indexOf('@');
  if (index === -1) {
    return '';
  }
  const start = email.substring(0, index < 4 ? index - 1 : 3);
  const masking = '*'.repeat(index < 4 ? 1 : index - 4);
  const end = email.substring(index);
  return start.concat(masking, end);
}

onMounted(() => {
  getMemberInfo();
});
</script>
