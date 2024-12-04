<template>
  <div class="radio_box tosspay">
    <uu-radio v-model="orderInfo.pymKndCd" :value="PaymentCd.TOSS_PAY" @change="changeValue">
      <template #label>
        <span class="logo_area">
          <img src="/assets/images/logo/logo_pay_tosspay.svg" alt="토스페이 로고" />
        </span>
      </template>
    </uu-radio>
    <div class="mo_tmoney_con_txt mo_notice_area"  v-if="paymentManagement.tspyautPymInfo?.pblcPhrsTtlNm">
      <div v-for="(item, index) in paymentManagement.tspyautPymInfo?.pblcPhrsTtlNm" :key="index">
        <div class="notice">
          <p class="badge">안내</p>
          <p class="text" v-html="item"></p>
          <!-- 각 항목을 v-html로 출력 -->
        </div>
      </div>
    </div>
    <div v-if="orderInfo.pymKndCd === PaymentCd.TOSS_PAY" class="hide_area">
      <uu-button
        btn-style="line"
        size="xl"
        class="btn_pay"
        :class="[orderInfo.pymMnsId === 'TSPYA' ? 'active' : '']"
        @click="setOption('TSPYA')"
        :disabled="!getTossPayRegistered"
      >
        <span>간편등록 결제</span>
        <span class="card_num" v-if="getTossPayRegistered">
          {{ `${paymentManagement.tspyautPymInfo?.cardCpNm}(${paymentManagement.tspyautPymInfo?.cardNum4th})` }}
        </span>
        <uu-button btn-color="secondary" label="간편등록" class="card override-disable" v-else @click="regTossPay" />
      </uu-button>
      <uu-button
        btn-style="line"
        size="xl"
        class="btn_pay"
        :class="[orderInfo.pymMnsId === 'TSPY' ? 'active' : '']"
        @click="setOption('TSPY')"
      >
        <span>토스앱 결제</span>
      </uu-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PaymentCd, useOrderStore } from '@/service/order/orderModule';
import { billingKey } from '@/service/payment/api/tossPaymentApi';
import { getAppBridge } from '@/utils';
import { formatDate } from '@/utils/dateUtils';
import { FlexResponseCode } from '@/utils/hybrid/type';
import { storeToRefs } from 'pinia';

const orderStore = useOrderStore();
const { getTossPayRegistered, paymentManagement, orderInfo, tmoneyMoreContent } = storeToRefs(orderStore);

// 결제수단 구분 변경
const changeValue = () => {
  tmoneyMoreContent.value = false;
  orderInfo.value.paymentKey = '';
  if (orderInfo.value.pymKndCd === PaymentCd.TOSS_PAY) {
    // TSPYA - 토스페이 자동결제, TSPY - 토스페이 일반결제
    orderInfo.value.pymMnsId = getTossPayRegistered.value ? 'TSPYA' : 'TSPY';
    // 자동결제키 paymentKey에 할당
    if (getTossPayRegistered.value) {
      orderInfo.value.paymentKey = paymentManagement.value.tspyautPymInfo?.billingKey || '';
    }
  }
};

// 결제수단 > 결제상세수단 변경
const setOption = (type: string) => {
  if (getTossPayRegistered.value) {
    orderInfo.value.paymentKey = paymentManagement.value.tspyautPymInfo?.billingKey || '';
  }
  // 자동결제가 등록되지 않은 경우 일반결제 고정
  // 클릭불가하게 설정
  if (!getTossPayRegistered.value) {
    orderInfo.value.pymMnsId = 'TSPY';
  } else {
    orderInfo.value.pymMnsId = type;
  }
};

// 토스페이 등록
const regTossPay = async () => {
  const res = await billingKey();
  const appBridge = await getAppBridge();
  if (res && res.rspCd === '0000') {
    // 웹뷰 호출
    const reg = await appBridge.openView({
      url: 'payment/tosspay',
      viewType: 'native',
      viewJsonValue: `{"checkoutPage" : "${res.checkoutPage}"}`
    });
    if (reg && reg.response.code === FlexResponseCode.OK) {
      orderStore.requestPaymentManagement();
      await appBridge.showToast({
        message: `토스페이 등록 처리 되었습니다.\n(${formatDate(new Date(), 'YYYY.MM.DD')})`
      });
    }
  } else {
    await appBridge.showToast({
      message: res.rspMsg ?? '토스페이 등록 실패'
    });
  }
};
</script>
