<template>
  <sub-header title="탈퇴하기" />
  <main id="main" class="main mor">
    <div class="container pt16 bottom_btns">
      <div class="withdraw">
        <p class="notice">
          티머니GO 회원 탈퇴 시, <br />
          <span>GO마일리지 및 이용기록이 삭제</span>되며 복구되지 않습니다.
        </p>
        <p>(재 가입 시 신규가입 혜택을 받을 수 없습니다.)</p>
        <h4 class="sub_title">연계서비스</h4>
        <p>티머니GO에서 이용하시던 서비스 중 함께 탈퇴하고자하는 서비스를 선택해주세요.</p>
        <p class="info info_desc">
          <uu-ic size="16" name="exclamation" />
          <span> 티머니GO를 탈퇴하더라도 고속·시외버스 티머니 및 티머니 onda앱에서 계속 이용이 가능합니다. </span>
        </p>
        <form>
          <uu-checkbox label="고속·시외버스" value="B" v-model="checked" @click.stop.prevent="onClickBus" />
        </form>
        <p class="info">
          <uu-ic size="16" name="exclamation_gray070" />
          <span> 따릉이 회원 탈퇴는 따릉이 앱 또는 홈페이지에서 가능합니다. </span>
        </p>
        <p class="info">
          <uu-ic size="16" name="exclamation_gray070" />
          <span> 기타 연동된 서비스 계정은 모두 탈퇴됩니다. </span>
        </p>
      </div>
      <div class="btn_area">
        <uu-button size="xl" btn-color="primary" label="탈퇴하기" @click="onClickWithdrawMembership" />
      </div>
    </div>
  </main>

  <!-- 탈퇴/블랙리스트 확인 팝업-->
  <member-confirm-popup
    :isShowPopup="isShowPopup"
    :title="title"
    :message="message"
    :okBtnLabel="okBtnLabel"
    :closeBtnLabel="closeBtnLabel"
    @ok="okCallback"
    @isClose="isShowPopup = false"
  />
</template>

<script setup lang="ts">
import MemberConfirmPopup from '@/views/member/components/MemberConfirmPopup.vue';
import { onMounted, ref } from 'vue';
import { useMemberStore } from '@/service/member/memberModule';
import { formatDate } from '@/utils/dateUtils';
import { useMessageModal } from '@/composables/useMessageModal';
import { useAuthStore } from '@/service/auth/authModule';
import { getAppBridge } from '@/utils';
import { logger } from '@/utils/logger';

const memberStore = useMemberStore();
const authStore = useAuthStore();
const { createNotificationModal, createErrorModal } = useMessageModal();

const checked = ref(false);
const isShowPopup = ref(false);
const title = ref('');
const message = ref('');
const okBtnLabel = ref('');
const closeBtnLabel = ref('');
const okCallback = ref(); // 탈퇴 or 블랙리스트 확인

// 탈퇴 팝업
function onClickWithdrawMembership() {
  title.value = '정말 탈퇴하시겠습니까?';
  message.value = checked.value
    ? '선택하신 <font color=#222222><b>티머니GO, 고속·시외</b></font> 회원 계정이 삭제됩니다.'
    : '선택하신 <font color=#222222><b>티머니GO</b></font> 회원 계정이 삭제됩니다.';
  okBtnLabel.value = '네, 탈퇴하겠습니다';
  closeBtnLabel.value = '아니오';
  okCallback.value = checkBlackList;
  isShowPopup.value = true;
}

// 탈퇴 성공 팝업
function cancelMembershipSuccessPopup() {
  createNotificationModal(
    '회원 탈퇴 완료',
    checked.value
      ? '티머니GO, 고속·시외 회원 탈퇴 처리가 완료되었습니다.<br/>티머니GO에서 꼭 다시 만나요!'
      : '티머니GO 회원 탈퇴 처리가 완료되었습니다.<br/>티머니GO에서 꼭 다시 만나요!',
    () => terminateApp()
  );
}

// 앱 종료
async function terminateApp() {
  logger.debug('앱 종료 브릿지 호출');
  const appBridge = await getAppBridge();
  await appBridge.terminateApp();
}

// 블랙리스트 팝업
async function checkBlackList() {
  isShowPopup.value = false;
  const checkBlackListParam = { moappMbrsSno: authStore.getAuthInfo.moappMbrsSno ?? '' };
  const resCheckBlackList = await memberStore.getBlackListYn(checkBlackListParam);
  //isShowPopup.value = false;
  if (resCheckBlackList.blYn == 'Y') {
    // 블랙리스트 경고
    title.value = '알림';
    message.value =
      resCheckBlackList.msg == '' || resCheckBlackList.msg == null
        ? '부정사용 등 방지를 위해 탈퇴 후<br>30일 경과 후 재가입이 가능합니다.<br>탈퇴하시겠습니까?'
        : resCheckBlackList.msg;
    okBtnLabel.value = '네, 탈퇴하겠습니다';
    closeBtnLabel.value = '아니오';
    okCallback.value = withdrawMembership;
    isShowPopup.value = true;
  } else {
    // 탈퇴
    withdrawMembership();
  }
}

/**
 * 메뉴 연동서비스코드(lnkgSvcCd)
 * T: 따릉이
 * X: 씽씽
 * B: 시외/고속
 * O: 온다
 */
// 회원 탈퇴
async function withdrawMembership() {
  const withdrawParam = { lnkgSvcList: [{ lnkgSvcCd: 'T' }, { lnkgSvcCd: 'X' }] };
  if (checked.value) {
    // 고속·시외버스 체크
    withdrawParam.lnkgSvcList.push({ lnkgSvcCd: 'B' });
  }
  const resWithdraw = await memberStore.withdrawMembership(withdrawParam);
  isShowPopup.value = false;
  if (resWithdraw.scsYn == 'Y') {
    // 탈퇴 성공
    const appBridge = await getAppBridge();
    await appBridge.removeMemberData();
    cancelMembershipSuccessPopup();
  } else {
    // 탈퇴 실패
    let title = '알려드립니다';
    // let message = `회원님께서는 앱에서 바로 탈퇴가 되지 않습니다.고객센터로 연락주시기 바랍니다.`;
    const message =
      !resWithdraw.msg || resWithdraw.msg === ''
        ? '회원님께서는 앱에서 바로 탈퇴가 되지 않습니다.고객센터로 연락주시기 바랍니다.'
        : resWithdraw.msg;
    const failureCode = resWithdraw.scsnStatCd;
    if ('02' == failureCode || '03' == failureCode || '04' == failureCode) {
      title = '확인해주세요';
      // message = '모빌리티 서비스를 대여중 또는 예약중일 경우 앱에서 바로 탈퇴가 되지 않습니다.';
    } else if ('05' == failureCode || '08' == failureCode || '09' == failureCode) {
      title = '확인해주세요';
      // message = `미납요금이나 초과요금이 남아있을 경우 앱에서 바로 탈퇴가 되지 않습니다.`;
    } else if ('06' == failureCode || '07' == failureCode || '12' == failureCode) {
      title = '확인해주세요';
      // message = `따릉이 이용권, GO패스 및 고속/시외 승차권을 보유하고 계신 경우 앱에서 바로 탈퇴가 되지 않습니다.`;
    } else if ('10' == failureCode) {
      title = '확인해주세요';
      // message = `우주패스ALL 서비스 연동 중입니다. T우주 홈페이지에서 연동 해지 후 티머니GO 탈퇴가 가능합니다.`;
    }
    createErrorModal(title, message);
  }
}

// 회원 연동 서비스 조회
async function getLinkedServiceCodeList() {
  const param = {
    inqrDtm: formatDate(new Date(), 'YYYYMMDDHHmmss')
  };
  await memberStore.setLinkedServiceCodeList(param);
}

// 고속·시외버스 체크 박스 event
async function onClickBus() {
  const appBridge = await getAppBridge();
  if (!memberStore.isJoinBus) {
    await appBridge.showToast({
      message: '해당 서비스를 가입하지 않았습니다.'
    });
  } else {
    checked.value = !checked.value;
  }
}

onMounted(() => {
  getLinkedServiceCodeList();
});
</script>
