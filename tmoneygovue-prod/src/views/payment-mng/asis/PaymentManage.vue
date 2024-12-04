<!-- 
  결제수단 관리
  pubPath: tmoney/Spa/DET/DET044.vue
  @author dh.kim
 -->
<template>
  <sub-header title="결제수단 관리" />
  <main class="main det">
    <div class="container">
      <div class="payment_manage_area">
        <TmoneyBizPayComponent />
        <NaverPayComponent />
        <TossPayComponent />
        <SmpcPayComponent />
        <PaymentPasswordComponent />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import subHeader from '@/components/layout/SubHeader.vue';
import TmoneyBizPayComponent from './components/TmoneyBizPayComponent.vue';
import NaverPayComponent from './components/NaverPayComponent.vue';
import TossPayComponent from './components/TossPayComponent.vue';
import SmpcPayComponent from './components/SmpcPayComponent.vue';
import PaymentPasswordComponent from './components/PaymentPasswordComponent.vue';
import { usePaymentManageStore } from '@/service/payment/paymentManageModule';
import { onMounted } from 'vue';
import { formatDate } from '@/utils/dateUtils';

const paymentManagementStore = usePaymentManageStore();

// mounted시 실행
onMounted(() => {
  const today = formatDate(new Date(), 'YYYYMMDDHHmmss');
  const params = {
    reqDtm: today,
    inqrDtm: today
  };
  // 대표결제수단 조회
  paymentManagementStore.requestRepresentManagement(params);
  // 사용자별 결제 수단 목록 조회
  paymentManagementStore.requestPaymentManagement();
  // 결제 비밀번호 상태 조회
  paymentManagementStore.requestPaymentStatusInfo();
});
</script>
