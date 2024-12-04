<!-- 
  결제수단 관리>신용/체크 카드 추가 설정>바텀시트(카드별명)
  pubPath: tmoney/Spa/DET/DET059.vue
 -->
<template>
  <common-modal
    ref="modal02Ref"
    v-model="modal02"
    type="bottom"
    add-class="card_nickname_modal"
    hide-overlay
    hide-footer
    @close="close"
  >
    <template #modal_header>{{ t('paymentMng.det_031_001_001') }} </template>
    <template #modal_body>
      <div class="nickname_input">
        <form>
          <uu-input
            v-model="nickName"
            label="카드별명 텍스트를 입력해주세요."
            :maxLength="7"
            placeholder="텍스트를 입력해주세요."
            btn-clear
            hide-label
          />
          <uu-button label="저장" btn-style="line" size="lg" @click="changeCardAliasName" />
        </form>
        <p>
          <uu-ic size="16" name="exclamation_gray070" />
          {{ t('paymentMng.det_031_001_003') }}
        </p>
      </div>
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import CommonModal from '@/views/common/components/CommonModal.vue';
import uuButton from '@/components/uu-components/UuButton.vue';
import UuInput from '@/components/uu-components/UuInput.vue';
import UuIc from '@/components/uu-components/UuIc.vue';
import { useMessageModal } from '@/composables/useMessageModal';
import { getAppBridge } from '@/utils';
import { cardSmpcPymAlsMod } from '@/service/payment/api/smpcPaymentApi';
import { usePaymentManageStore } from '@/service/payment/paymentManageModule';
import { FlexResponseCode } from '@/utils/hybrid/type';
import { useOrderStore } from '@/service/order/orderModule';
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();

const paymentManagementStore = usePaymentManageStore();
const orderStore = useOrderStore();

const modal02Ref = ref();
const modal02 = ref<boolean>(false);

const props = defineProps({
  paymentKey: {
    type: String,
    required: true
  },
  cardAliasName: {
    type: String,
    required: true
  },
  issuerCd: {
    type: String,
    required: true
  },
  smpcType: {
    type: String,
    required: true
  }
});

// props를 통해 받아온 nickname값 노출
const nickName = ref('');
watch(
  () => props.cardAliasName,
  (newVal) => {
    nickName.value = newVal;
  }
);
const { createNotificationModal, createErrorModal } = useMessageModal();

const open = () => {
  modal02.value = true;
  resetInputInfo();
};
const close = () => {
  modal02.value = false;
};
defineExpose({ open });

const resetInputInfo = () => {
  nickName.value = '';
};

// 별명 변경
const changeCardAliasName = async () => {
  if (props.paymentKey === null || props.paymentKey === '') {
    createNotificationModal('', '유효한 카드 정보가 아닙니다.');
    return;
  }
  const appBridge = await getAppBridge();
  // 별명변경 API 택시
  if (props.smpcType === 'mobility') {
    const res = await cardSmpcPymAlsMod({
      paymentKey: props.paymentKey,
      issuerCd: props.issuerCd,
      cardAliasName: nickName.value
    });
    if (res && res.respCd === '0000') {
      paymentManagementStore.requestPaymentManagement();
      orderStore.requestPaymentManagement();
      close();
      await appBridge.showToast({
        message: '별명 변경이 완료되었습니다.'
      });
    } else {
      createErrorModal('', '별명 변경이 불가합니다.');
    }
  } else {
    // 별명변경 App Database 고속시외
    const res = await appBridge.changeNickNameCard({
      pKey: props.paymentKey,
      nickName: nickName.value
    });
    if (res && res.response.code === FlexResponseCode.OK) {
      paymentManagementStore.requestPaymentManagement();
      close();
      await appBridge.showToast({
        message: '별명 변경이 완료되었습니다.'
      });
    } else {
      createErrorModal('', '별명 변경이 불가합니다.');
    }
  }
};
</script>
