<!-- 
  결제수단 관리>토스페이
  pubPath: tmoney/Spa/DET/DET044.vue
 -->
<template>
  <round-box title="토스페이">
    <div class="pay toss">
      <p class="img_area">
        <img src="/assets/images/logo/logo_pay_tosspay.svg" alt="토스페이" />
      </p>
      <uu-button
        v-if="!getTossPayRegistered"
        btn-color="secondary"
        size="xs"
        label="간편등록"
        class="btn_easy_regist"
        @click="regTossPay"
        >{{ t('paymentMng.det_028_001_005') }}</uu-button
      >
      <template v-else>
        <p class="card_info">
          {{
            `${paymentManagement.tspyPymInfo?.cardCpNm}(${paymentManagement.tspyPymInfo?.cardNum4th})`
          }}
        </p>
        <uu-button
          label="등록해제"
          class="unregister_btn"
          size="xs"
          btn-style="line"
          @click="cancelTossPay"
          >{{ t('paymentMng.det_028_005_010') }}</uu-button
        >
      </template>
    </div>
    <div class="mo_tmoney_con_txt mo_notice_area">
      <div v-for="(item, index) in paymentManagement.tspyPymInfo?.pblcPhrsCtt" :key="index">
        <div class="notice">
          <p class="badge">안내</p>
          <p class="text" v-html="item"></p>
          <!-- 각 항목을 v-html로 출력 -->
        </div>
      </div>
    </div>
  </round-box>
  <ConfirmPopup :popupContent="popupContent" ref="confirmPopup" @ok="popupOk" />
</template>

<script setup lang="ts">
import { billingKey, billingKeyRemove } from '@/service/payment/api/tossPaymentApi'
import { usePaymentManageStore } from '@/service/payment/paymentManageModule'
import { storeToRefs } from 'pinia'
import ConfirmPopup from './ConfirmPopup.vue'
import { ref } from 'vue'
import { useMessageModal } from '@/composables/useMessageModal'
import { getAppBridge } from '@/utils'
import { formatDate } from '@/utils/dateUtils'
import { FlexResponseCode } from '@/utils/hybrid/type'
import { useOrderStore } from '@/service/order/orderModule'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n();
const paymentManagementStore = usePaymentManageStore();
const { paymentManagement, getTossPayRegistered } = storeToRefs(paymentManagementStore);
const orderStore = useOrderStore();
const confirmPopup = ref();
const popupContent = ref();
const popupOk = ref();
const { createErrorModal, createSuccessModal } = useMessageModal();
const props = defineProps({
  onDeletionPossibility: {
    type: Function,
    required: true
  }
});

// 토스페이
// 토스페이 등록
const regTossPay = async () => {
  const res = await billingKey()
  const appBridge = await getAppBridge()
  if (res && res.rspCd === '0000') {
    // 웹뷰 호출
    const reg = await appBridge.openView({
      url: 'payment/tosspay',
      viewType: 'native',
      viewJsonValue: `{"checkoutPage" : "${res.checkoutPage}"}`
    })
    if (reg && reg.response.code === FlexResponseCode.OK) {
      paymentManagementStore.requestPaymentManagement()
      orderStore.requestPaymentManagement()
      await appBridge.showToast({
        message: `토스페이 등록 처리 되었습니다.\n(${formatDate(new Date(), 'YYYY.MM.DD')})`
      })
    }
  } else {
    await appBridge.showToast({
      message: res.rspMsg ?? '토스페이 등록에 실패하였습니다.'
    })
  }
}

// 토스페이 등록 해제
const cancelTossPay = () => {
  const billingKey = paymentManagement.value.tspyPymInfo?.billingKey
  if (billingKey === undefined || billingKey === null || billingKey === '') {
    createErrorModal('', '삭제가 불가합니다.')
    return
  }

  popupContent.value = '<p>등록된 토스페이 정보가 초기화됩니다.</p>';
  popupOk.value = () => deleteTossPay();
  confirmPopup.value.open();
};

const deleteTossPay = async () => {
  const billingKey = paymentManagement.value.tspyPymInfo?.billingKey ?? '';

  props.onDeletionPossibility({pymMnsId: paymentManagement.value.tspyPymInfo?.pymMnsId}, async (isPossibility: boolean) => {
    if(isPossibility) {
      const res = await billingKeyRemove(billingKey);
      if (res) {
        if (res.rspCd === '0000') {
          createSuccessModal('', '토스페이가 삭제되었습니다.');
          paymentManagementStore.requestPaymentManagement();
          orderStore.requestPaymentManagement();
        } else {
          createErrorModal('', res.rspMsg ?? '토스페이 삭제에 실패하였습니다.');
        }
      }
    }
  });
};
</script>
