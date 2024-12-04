<template>
  <div class="inv_code_wrap code_link">
    <ul class="code_top">
      <li class="left_text">나의 초대코드</li>
      <li class="right_code tmoney">{{ getFrndInvnSno }}</li>
    </ul>
    <ul class="link_bottom">
      <li @click="clickCopyBtn">
        <img src="/assets/images/invite_promotion/icon_invitation_code_copy.svg" aria-label="코드복사" />
        <p>코드복사</p>
      </li>
      <li @click="clickKakaoBtn">
        <img src="/assets/images/invite_promotion/icon_invitation_kakao_link.svg" aria-label="카카오톡 초대하기" />
        <p>카카오톡 초대하기</p>
      </li>
    </ul>
    <div class="snack_bar">
      <p></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { getAppBridge } from '@/utils';
import { storeToRefs } from 'pinia';
import { useInvnStore } from '@/service/invite-friend/inviteModule';
import { useAuthStore } from '@/service/auth/authModule';
import { checkAppVersion } from '@/utils/validateUtil';
import { useMessageModal } from '@/composables/useMessageModal';

const { getFrndInvnSno } = storeToRefs(useInvnStore());

const { copy } = useClipboard({ source: getFrndInvnSno.value });
const clickCopyBtn = async () => {
  copy(getFrndInvnSno.value);
  const appBridge = await getAppBridge();
  appBridge.showToast({ message: `초대코드가 복사되었습니다.` });
};

const { authInfo } = storeToRefs(useAuthStore());
const minVersion = '2.4.3'; // 앱 최소버전
const { createSuccessModal } = useMessageModal();
const clickKakaoBtn = async () => {
  const checkVersion = checkAppVersion(minVersion, authInfo.value.appVer);
  if (!checkVersion) {
    // 앱버전 ~ 2.4.2
    createSuccessModal(
      '알림',
      '코드복사를 이용해 주세요. 카카오톡 공유 기능을 사용하시려면 앱 업데이트(v2.4.3 이상)가 필요합니다.'
    );
  } else {
    // 앱버전 2.4.3 이상
    const appBridge = await getAppBridge();
    appBridge.shareLink({
      target: 'kakao',
      tempId: '37032',
      data: JSON.stringify({
        code: getFrndInvnSno.value
      })
    });
  }
};
</script>
