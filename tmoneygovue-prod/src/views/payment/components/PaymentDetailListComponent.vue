<!-- 
    결제하기>결제상세
    pubPath: tmoney/Transit/TIP05003.vue
    tmoney/Spa/DET/DET043_3.vue
    @author inu.jeong
 -->
<template>
  <round-box title="결제상세">
    <ul class="payment_list">
      <li>
        <p class="title">상품금액</p>
        <p class="num" tabindex="0" :aria-label="`${formatAmount(getTotalFee)}원`">
          <span class="strong" aria-hidden="true">{{ formatAmount(getTotalFee) }}</span
          ><span aria-hidden="true">원</span>
        </p>
      </li>
      <li v-show="orderInfo.cpn?.cpnSno !== ''">
        <p class="title">ㄴ 쿠폰</p>
        <p class="num purple" tabindex="0" :aria-label="`${formatAmount(orderInfo.cpn?.applyAmt)}원`">
          <span class="strong" aria-hidden="true">-{{ formatAmount(orderInfo.cpn?.applyAmt) }}</span>
          <span aria-hidden="true">원</span>
        </p>
      </li>
      <li v-show="orderInfo.tmgMlgPymAmt > 0">
        <p class="title">ㄴ GO마일리지</p>
        <p class="num purple" tabindex="0" :aria-label="`${formatAmount(orderInfo.tmgMlgPymAmt)}마일리지`">
          <span class="strong" aria-hidden="true">-{{ formatAmount(orderInfo.tmgMlgPymAmt) }}</span>
          <span aria-hidden="true">M</span>
        </p>
      </li>
      <li class="sum_amount">
        <p>최종 결제금액</p>
        <p class="num" tabindex="0" :aria-label="`${formatAmount(getPaymentAmount)}원`">
          <span class="strong" aria-hidden="true">{{ formatAmount(getPaymentAmount) }}</span>
          <span aria-hidden="true">원</span>
        </p>
      </li>
      <li v-if="orderInfo.productDtl?.famtFxrtDvsCd == '20'">
        <div class="mileage">
          <uu-ic size="16" name="mileage" />
          <p class="title purple">GO마일리지 {{ orderInfo.productDtl?.ctRt }}% 적립</p>
        </div>
        <p class="num purple" :aria-label="`${formatAmount(getTmgAcmtAmt) || 0} 마일리지`">
          {{ formatAmount(getTmgAcmtAmt) || 0 }}M
        </p>
      </li>
      <li v-if="orderInfo.productDtl?.famtFxrtDvsCd == '10' || orderInfo.productDtl?.famtFxrtDvsCd == '20'">
        <div class="mileage_notice">
          <p class="title">
            마일리지 적립으로 <span class="title">{{ formatAmount(getPaymentAmount - getTmgAcmtAmt) }}</span> 원에 대여
            효과!
          </p>
        </div>
      </li>
    </ul>
  </round-box>
</template>
<script setup lang="ts">
import { useOrderStore } from '@/service/order/orderModule';
import { storeToRefs } from 'pinia';
import { formatAmount } from '@/utils/amountUtils';

const orderStore = useOrderStore();
const { orderInfo, getPaymentAmount, getTotalFee, getTmgAcmtAmt } = storeToRefs(orderStore);
</script>
