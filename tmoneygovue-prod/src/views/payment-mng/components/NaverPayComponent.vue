<!-- 
  결제수단 관리>네이버페이
  path: tmoney/Spa/DET/DET044.vue
 -->
<template>
  <round-box title="네이버페이">
    <div class="pay naver">
      <p class="img_area">
        <img src="/assets/images/logo/logo_naverpay.svg" alt="네이버페이" />
      </p>
      <uu-button
        v-if="!getNaverPayRegistered"
        btn-color="secondary"
        size="xs"
        label="간편등록"
        class="btn_easy_regist"
        @click="regNPay"
        >{{ t('paymentMng.det_028_001_005') }}</uu-button
      >

      <template v-else>
        <p class="card_info">
          {{
            `${paymentManagement.npayPymInfo?.cardCpNm}(${paymentManagement.npayPymInfo?.cardNum4th})`
          }}
        </p>
        <uu-button
          label="등록해제"
          class="unregister_btn"
          size="xs"
          btn-style="line"
          @click="cancelNPay"
          >{{ t('paymentMng.det_028_005_010') }}</uu-button
        >
      </template>
    </div>
    <div class="mo_tmoney_con_txt mo_notice_area">
      <div v-for="(item, index) in paymentManagement.npayPymInfo?.pblcPhrsCtt" :key="index">
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
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import UuButton from '@/components/uu-components/UuButton.vue';
import RoundBox from '@/components/layout/RoundBox.vue';
import ConfirmPopup from './ConfirmPopup.vue';
import { naverPayAutoCancel, naverPayAutoRegReserve } from '@/service/payment/api/naverPaymentApi';
import { useMessageModal } from '@/composables/useMessageModal';
import { useOrderStore } from '@/service/order/orderModule';
import { usePaymentManageStore } from '@/service/payment/paymentManageModule';
import { getAppBridge } from '@/utils';
import { formatDate } from '@/utils/dateUtils';
import { FlexResponseCode } from '@/utils/hybrid/type';
import { useI18n } from '@/composables/useI18n';


const { t } = useI18n();
const paymentManagementStore = usePaymentManageStore();
const { paymentManagement, getNaverPayRegistered } = storeToRefs(paymentManagementStore);
const orderStore = useOrderStore();
const confirmPopup = ref();
const popupContent = ref();
const popupOk = ref();

const props = defineProps({
  onDeletionPossibility: {
    type: Function,
    required: true
  }
});

const { createErrorModal, createSuccessModal } = useMessageModal();

// 네이버페이
// 네이버페이 자동결제 등록
const regNPay = async () => {
  const res = await naverPayAutoRegReserve()
  if (res && res.rspCd === '0000') {
    const appBridge = await getAppBridge()
    const reg = await appBridge.openView({
      url: 'payment/naverpay',
      viewType: 'native',
      viewJsonValue: `{"checkoutPage" : "${res.checkoutPage}"}`
    })
    if (reg && reg.response.code === FlexResponseCode.OK) {
      paymentManagementStore.requestPaymentManagement()
      orderStore.requestPaymentManagement()
      await appBridge.showToast({
        message: `네이버페이 등록 처리 되었습니다.\n(${formatDate(new Date(), 'YYYY.MM.DD')})`
      })
    }
  } else {
    createErrorModal('', res.rspMsg ?? '네이버페이 등록에 실패하였습니다.')
  }
}

// 네이버페이 등록 해제
const cancelNPay = () => {

  const automaticPayId = paymentManagement.value.npayPymInfo?.automaticPayId;
  if (automaticPayId === undefined || automaticPayId === null || automaticPayId === '') {
    createErrorModal('', '삭제가 불가합니다.')
    return
  }

  popupContent.value = '<p>등록된 네이버페이 정보가 초기화됩니다.</p>';
  popupOk.value = () => deleteNPay();
  confirmPopup.value.open();

};

const deleteNPay = async () => {
  const automaticPayId = paymentManagement.value.npayPymInfo?.automaticPayId ?? ''
  const params = {
    automaticPayId: automaticPayId,
    cancelType: 'U',
    cancelReason: '사용자 요청에 의한 해지'
  };

  props.onDeletionPossibility({pymMnsId: paymentManagement.value.npayPymInfo?.pymMnsId}, async (isPossibility: boolean) => {
    if(isPossibility) {
      const res = await naverPayAutoCancel(params);
      if (res && res.rspCd === '0000') {
        createSuccessModal('', '네이버페이가 삭제되었습니다.');
        paymentManagementStore.requestPaymentManagement();
        orderStore.requestPaymentManagement();
      } else {
        createErrorModal('', res.rspMsg ?? '네이버페이 삭제에 실패하였습니다.');
      }
    }
  });
  
};
</script>
