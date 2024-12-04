<template>
  <round-box title="결제 비밀번호">
    <div class="password">
      <form>
        <uu-checkbox
          label="결제 비밀번호 사용"
          v-model="paymentStatusInfo.pwdUseYn"
          value="Y"
          fValue="N"
          toggle-switch
          @change="pwdUseChange"
          ref="inputRef"
          tabindex="0"
          >{{ t('paymentMng.det_032_001_020') }}</uu-checkbox
        >
      </form>
      <uu-button btn-style="none" class="btn_repassword" @click="changePwd">
        <span>{{ t('paymentMng.det_032_001_021') }}</span>
        <uu-ic size="24" name="arrow" />
      </uu-button>
    </div>
  </round-box>
  <payPwdPopup ref="pwdPopup" :initType="initType" />
</template>

<script setup lang="ts">
import { useMessageModal } from '@/composables/useMessageModal';
import { reqPymPwdUseYnInfo } from '@/service/payment/api/paymentApi';
import { usePaymentManageStore } from '@/service/payment/paymentManageModule';
import { storeToRefs } from 'pinia';
import { nextTick, ref } from 'vue';
import payPwdPopup from './PaymentPasswordPopup.vue';
import { getAppBridge } from '@/utils';
import { VerifyType } from '@/utils/hybrid/etc/etc.type';
import { useI18n } from '@/composables/useI18n';
import { FlexResponseCode } from '@/utils/hybrid/type';

const { t } = useI18n();
const paymentManagementStore = usePaymentManageStore();
const { getPasswordLocked, getPasswordExist, paymentStatusInfo } = storeToRefs(paymentManagementStore);
const { createNotificationModal, createErrorModal } = useMessageModal();
const pwdPopup = ref();
const initType = ref('');
const inputRef = ref();

// 결제 비밀번호
const pwdUseChange = async (useYn: boolean) => {
  // 결제 비밀번호 5회 실패시 잠금처리
  if (getPasswordLocked.value) {
    createErrorModal('비밀번호가 잠금 처리 되었습니다.', '본인 인증 후 재사용 가능합니다.', async () => {
      paymentManagementStore.setPaymentPasswordUse(useYn ? 'N' : 'Y');
      const appBridge = await getAppBridge();
      const res = await appBridge.callIdentityVerify({
        verifyType: VerifyType.PASSWORD_RESET
      });
      // 본인인증 완료 후 결제 비밀번호 상태 재조회
      if (res.response.code === FlexResponseCode.OK) {
        await reqPymPwdUseYnInfo(useYn ? 'Y' : 'N');
        paymentManagementStore.requestPaymentStatusInfo();
        return;
      }
    });
    return;
  }
  // 결제 비밀번호 없을시 설정 화면이동
  if (!getPasswordExist.value && useYn) {
    nextTick(() => {
      const inputElement = inputRef.value.$el.querySelector('input');
      if (inputElement) {
        inputElement.checked = !useYn;
      }
    });
    initType.value = 'first-input';
    pwdPopup.value.open();
    return;
  }
  // 결제 비밀번호 있을시 결제 비밀번호 사용/미사용 적용
  const res = await reqPymPwdUseYnInfo(paymentStatusInfo.value.pwdUseYn);
  if (res?.scsYn === 'Y') {
    paymentManagementStore.setPaymentPasswordUse(paymentStatusInfo.value.pwdUseYn);
  }
};

const changePwd = () => {
  if (!getPasswordExist.value) {
    createNotificationModal('', '결제 비밀번호를 설정하세요', () => {
      initType.value = 'first-input';
      pwdPopup.value.open();
    });
    return;
  }
  initType.value = 'change-input';
  pwdPopup.value.open();
};
</script>
