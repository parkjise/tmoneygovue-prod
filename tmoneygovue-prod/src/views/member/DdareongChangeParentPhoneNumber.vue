<template>
  <sub-header title="따릉이 보호자 휴대전화 변경" />
  <main id="main" class="main mor" v-if="switchingPage">
    <div class="container pt16 bottom_btns">
      <div class="withdraw">
        <p class="notice">만 14세 미만 회원은 법정대리인의 동의가 필요합니다.</p>
        <form>
          <uu-checkbox
            label="위 상세내용을 확인하였으며,법정대리인<br/>인증 절차를 진행합니다."
            v-model="checked"
            :isHtmlLabel="isHtmlLabel"
          />
        </form>
      </div>
      <div class="btn_area">
        <uu-button
          size="xl"
          btn-color="primary"
          label="보호자 본인인증 하기"
          :disabled="!checked"
          @click="changeParentPhoneNumber"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMessageModal } from '@/composables/useMessageModal';
import { useMemberStore } from '@/service/member/memberModule';
import { getAppBridge } from '@/utils';
import { useRouter } from 'vue-router';

const router = useRouter();
const memberStore = useMemberStore();
const { createNotificationModal } = useMessageModal();

const checked = ref(false);
const switchingPage = ref(true);
const isHtmlLabel = true;

// 부모 전화번호 변경
async function changeParentPhoneNumber() {
  switchingPage.value = false;
  const appBridge = await getAppBridge();
  const resPrntAuthSno = await appBridge.callIdentityVerify({ verifyType: 2 });
  const res = await memberStore.changeParentPhoneNumber(resPrntAuthSno.prntAuthSno as string);
  router.back();

  if (res.scsYn === 'Y') {
    createNotificationModal('알림', '보호자 휴대전화번호 변경이 완료되었습니다.');
  } else {
    createNotificationModal('법적대리인 인증', '인증이 정상적으로 완료되지 않았습니다. 재시도 해주시기 바랍니다.');
  }
}
</script>
