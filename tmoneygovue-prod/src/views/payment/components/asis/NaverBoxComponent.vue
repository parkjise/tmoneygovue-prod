<template>
  <div class="radio_box naverpay">
    <uu-radio v-model="orderInfo.pymKndCd" :value="PaymentCd.NAVER_PAY" @change="changeValue">
      <template #label>
        <span class="logo_area">
          <img src="/assets/images/logo/logo_naverpay.svg" alt="네이버페이 로고" />
        </span>
      </template>
    </uu-radio>
    <div class="show_area">
      <p
        class="desc"
        v-if="paymentManagement.npayautPymInfo?.pblcPhrsTtlNm"
        v-html="paymentManagement.npayautPymInfo?.pblcPhrsTtlNm.join('</br>')"
      ></p>
    </div>
    <div v-if="orderInfo.pymKndCd === PaymentCd.NAVER_PAY" class="hide_area">
      <uu-button
        btn-style="line"
        size="xl"
        class="btn_pay"
        :class="[orderInfo.pymMnsId === 'NPAYA' ? 'active' : '']"
        @click="setOption('NPAYA')"
        :disabled="!getNaverPayRegistered"
      >
        <span>간편등록 결제</span>
        <span class="card_num" v-if="getNaverPayRegistered">
          {{ `${paymentManagement.npayautPymInfo?.cardCpNm}(${paymentManagement.npayautPymInfo?.cardNum4th})` }}
        </span>
        <uu-button btn-color="secondary" label="간편등록" class="card override-disable" v-else @click="regNPay" />
      </uu-button>
      <uu-button
        btn-style="line"
        size="xl"
        class="btn_pay"
        :class="[orderInfo.pymMnsId === 'NPAY' ? 'active' : '']"
        @click="setOption('NPAY')"
      >
        <span>네이버페이 결제</span>
      </uu-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PaymentCd, useOrderStore } from '@/service/order/orderModule';
import { storeToRefs } from 'pinia';
import { naverPayAutoRegReserve } from '@/service/payment/api/naverPaymentApi';
import { getAppBridge } from '@/utils';
import { formatDate } from '@/utils/dateUtils';
import { useMessageModal } from '@/composables/useMessageModal';
import { FlexResponseCode } from '@/utils/hybrid/type';

const orderStore = useOrderStore();
const { getNaverPayRegistered, paymentManagement, orderInfo, tmoneyMoreContent } = storeToRefs(orderStore);

const { createErrorModal } = useMessageModal();

// 결제수단 구분 변경
const changeValue = () => {
  tmoneyMoreContent.value = false;
  orderInfo.value.paymentKey = '';
  if (orderInfo.value.pymKndCd === PaymentCd.NAVER_PAY) {
    // NPAYA - 네이버 자동결제, NPAY - 네이버 일반결제
    orderInfo.value.pymMnsId = getNaverPayRegistered.value ? 'NPAYA' : 'NPAY';
    // 자동결제키 paymentKey에 할당
    if (getNaverPayRegistered.value) {
      orderInfo.value.paymentKey = paymentManagement.value.npayautPymInfo?.automaticPayId || '';
    }
  }
};

// 결제수단 > 결제상세수단 변경
const setOption = (type: string) => {
  if (getNaverPayRegistered.value) {
    orderInfo.value.paymentKey = paymentManagement.value.npayautPymInfo?.automaticPayId || '';
  }
  // 자동결제가 등록되지 않은 경우 일반결제 고정
  // 클릭불가하게 설정
  if (getNaverPayRegistered.value) {
    orderInfo.value.pymMnsId = type;
  } else {
    orderInfo.value.pymMnsId = 'NPAY';
  }
};

// 네이버페이 간편결제 등록 요청
const regNPay = async () => {
  const res = await naverPayAutoRegReserve();
  if (res && res.rspCd === '0000') {
    const appBridge = await getAppBridge();
    const reg = await appBridge.openView({
      url: 'payment/naverpay',
      viewType: 'native',
      viewJsonValue: `{"checkoutPage" : "${res.checkoutPage}"}`
    });
    if (reg && reg.response.code === FlexResponseCode.OK) {
      orderStore.requestPaymentManagement();
      await appBridge.showToast({
        message: `네이버페이 등록 처리 되었습니다.\n(${formatDate(new Date(), 'YYYY.MM.DD')})`
      });
    }
  } else {
    createErrorModal('', res.rspMsg ?? '네이버페이 등록 실패');
  }
};
</script>
