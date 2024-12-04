<!-- 
    결제하기>결제수단
    pubPath: tmoney/Transit/TIP05003.vue
    @author inu.jeong
 -->
<template>
  <round-box title="결제수단">
    <div class="radio_area">
      <!-- 모바일 티머니 -->
      <tmoneyBoxComponent v-if="getTmoneyPayInfoDisplay" />
      <!-- 네이버페이 -->
      <NaverBoxComponent v-if="getNaverPayInfoDisplay" />
      <!-- 토스페이 -->
      <TossBoxComponent v-if="getTossPayInfoDisplay" />
      <!-- 간편결제 -->
      <SmpcBoxComponent v-if="getSmpcPayInfoDisplay" ref="smpcPym" />
    </div>
  </round-box>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';

import tmoneyBoxComponent from './TmoneyBoxComponent.vue';
import NaverBoxComponent from './NaverBoxComponent.vue';
import TossBoxComponent from './TossBoxComponent.vue';
import SmpcBoxComponent from '../SmpcBoxComponent.vue';
import { PaymentCd, useOrderStore, PaymentType } from '@/service/order/orderModule';
import { storeToRefs } from 'pinia';
import { getAppBridge } from '@/utils';

const orderStore = useOrderStore();
const smpcPym = ref();
const {
  getTmoneyPayInfoDisplay,
  getNaverPayInfoDisplay,
  getTossPayInfoDisplay,
  getSmpcPayInfoDisplay,
  getNaverPayRegistered,
  getTossPayRegistered,
  representPaymentManagement,
  orderInfo,
  tmoneyMoreContent,
  paymentManagementLoad,
  paymentManagement
} = storeToRefs(orderStore);

watch(paymentManagementLoad, async (newValue) => {
  if (newValue) {
    if (orderInfo.value.pymKndCd !== '') {
      return;
    }
    tmoneyMoreContent.value = false;
    const appBridge = await getAppBridge();

    // 1. 대표수단결제의 정보 가져오기
    // 대표결제수단 있을시 CARD 설정
    const rprnPaymentKey = orderStore.getRepresentPaymentManagement.rprnPaymentKey;
    if (rprnPaymentKey) {
      orderInfo.value.pymKndCd = PaymentCd.CARD;
      orderInfo.value.paymentKey = representPaymentManagement.value.rprnPaymentKey;
    } else {
      // 2. 이전 결제 수단
      const previousPayment = await appBridge.getPreviousPaymentType();
      if (previousPayment.paymentType > 0 && Object.values(PaymentType).includes(previousPayment.paymentType)) {
        if (previousPayment.paymentType === PaymentType.CARD) {
          orderInfo.value.pymKndCd = PaymentCd.CARD;
        } else if (previousPayment.paymentType === PaymentType.TMONEY) {
          orderInfo.value.pymKndCd = PaymentCd.TMONEY;
        } else if (previousPayment.paymentType === PaymentType.NAVER_PAY) {
          orderInfo.value.pymKndCd = PaymentCd.NAVER_PAY;
          // 자동결제키 paymentKey에 할당
          if (getNaverPayRegistered.value) {
            orderInfo.value.paymentKey = paymentManagement.value.npayautPymInfo?.automaticPayId || '';
          }
        } else if (previousPayment.paymentType === PaymentType.TOSS_PAY) {
          orderInfo.value.pymKndCd = PaymentCd.TOSS_PAY;
          // 자동결제키 paymentKey에 할당
          if (getTossPayRegistered.value) {
            orderInfo.value.paymentKey = paymentManagement.value.tspyautPymInfo?.billingKey || '';
          }
        }
      } else {
        // 3. 목록 순서대로( display:y인 값 적용 필요 )
        // tmoney, bizpay는 둘다 tmoney로 치환
        // 저장할시 paymentType은 한개로 해야함
        if (getTmoneyPayInfoDisplay) {
          orderInfo.value.pymKndCd = PaymentCd.TMONEY;
        } else if (getNaverPayInfoDisplay) {
          orderInfo.value.pymKndCd = PaymentCd.NAVER_PAY;
          if (getNaverPayRegistered.value) {
            orderInfo.value.paymentKey = paymentManagement.value.npayautPymInfo?.automaticPayId || '';
          }
        } else if (getTossPayInfoDisplay) {
          orderInfo.value.pymKndCd = PaymentCd.TOSS_PAY;
          if (getTossPayRegistered.value) {
            orderInfo.value.paymentKey = paymentManagement.value.tspyautPymInfo?.billingKey || '';
          }
        } else {
          orderInfo.value.pymKndCd = PaymentCd.CARD;
        }
      }
    }

    switch (orderInfo.value.pymKndCd) {
      case PaymentCd.TMONEY: {
        orderInfo.value.pymMnsId = 'TMPY';
        tmoneyMoreContent.value = true;
        break;
      }
      case PaymentCd.CARD: {
        orderInfo.value.pymMnsId = 'PRPM';
        break;
      }
      case PaymentCd.NAVER_PAY: {
        orderInfo.value.pymMnsId = getNaverPayRegistered.value ? 'NPAYA' : 'NPAY';
        break;
      }
      case PaymentCd.TOSS_PAY: {
        orderInfo.value.pymMnsId = getTossPayRegistered.value ? 'TSPYA' : 'TSPY';
        break;
      }
      default: {
        orderInfo.value.pymMnsId = '';
        break;
      }
    }
  }
});

defineExpose({ smpcPym });
</script>
