<!-- 
    결제하기>쿠폰-마일리지 적용
    pubPath: tmoney/Transit/TIP05003.vue
    @author inu.jeong
 -->
<template>
  <round-box title="쿠폰 및 GO마일리지" class="coupon">
    <div class="coupon_area">
      <uu-button
        btn-style="line"
        class="btn_coupon"
        :disabled="couponError"
        @click="router.push({ path: '/travel/payment-coupon' })"
      >
        <span v-if="!getOrderCouponApplied">
          {{
            `${getPsnCouponCount > 0 ? `적용 가능한 쿠폰 ${getPsnCouponCount}` : '적용 가능한 쿠폰 0'} ${getIssueCouponCount > 0 ? ` - 발급 가능 쿠폰 확인` : ''}`
          }}
        </span>
        <span v-else class="coupon_name">{{ orderInfo.cpn?.cpnNm }} 적용</span>
        <uu-ic size="20" name="arrow" direction="left" />
      </uu-button>
      <form novalidate>
        <uu-input
          ref="useGoMltAmtRef"
          inputmode="numeric"
          v-model="tmgMlgPymAmt"
          label="btn-clear"
          placeholder="마일리지를 입력해 주세요"
          :btn-clear="showBtnClear"
          hide-label
          :max="mlgMaxLimit"
          :disabled="!mileageValidate"
          @keydown="handleEnter"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="checkGoMiligeValidate"
          novalidate 
        />
        <uu-button
          label="모두 사용"
          btn-style="line"
          size="xl"
          class="btn_use"
          @click="acceptAllMileage"
          :disabled="!mileageValidate"
        />
      </form>
      <div
        class="has_mileage"
        tabindex="0"
        :aria-label="`보유 GO마일리지 ${formatAmount(mbrMileageCouponCntInfo.GoMlgAmt) || 0} 마일리지`"
      >
        <uu-ic size="20" name="mileage" />
        <p class="title" aria-hidden="true">보유 <span>GO</span>마일리지</p>
        <p aria-hidden="true">{{ formatAmount(mbrMileageCouponCntInfo.GoMlgAmt) || 0 }}M</p>
      </div>
    </div>
  </round-box>
</template>
<script setup lang="ts">
import { useOrderStore } from '@/service/order/orderModule';
import { storeToRefs } from 'pinia';
import { computed, nextTick, ref, watch } from 'vue';
import { formatAmount } from '@/utils/amountUtils';
import { useRouter } from 'vue-router';
import UuInput from '@/components/uu-components/UuInput.vue';
import { debounce } from 'lodash-es';

const orderStore = useOrderStore();
const {
  mbrMileageCouponCntInfo,
  orderInfo,
  getPsnCouponCount,
  getOrderCouponApplied,
  couponError,
  getIssueCouponCount
} = storeToRefs(orderStore);
const useGoMltAmtRef = ref();
const router = useRouter();

const tmgMlgPymAmt = ref(''); // 사용할 마일리지
const showBtnClear = ref(false); // 마일리지 input clear버튼 여부

// Go마일리지 최대입력값 제어
const mlgMaxLimit = computed(() => {
  // 마일리지 적용가능 금액보다 보유 마일리지 적을 경우 마일리지액으로 고정
  if (mbrMileageCouponCntInfo.value.GoMlgAmt < orderStore.getAmountLimit('go')) {
    return Math.floor(mbrMileageCouponCntInfo.value.GoMlgAmt / 10) * 10;
  } else {
    return orderStore.getAmountLimit('go');
  }
});

//마일리지 전부 적용
const acceptAllMileage = () => {
  showBtnClear.value = true;
  // orderInfo.value.tmgMlgPymAmt = mlgMaxLimit.value;
  tmgMlgPymAmt.value = mlgMaxLimit.value.toLocaleString();
  nextTick(() => {
    useGoMltAmtRef.value.onInput();
  });
};

const handleEnter = (event: KeyboardEvent) => {
  if(event.keyCode == 13) {
    event.preventDefault(); // 기본 이동 버튼 동작 방지
  }
}

// 마일리지 유효성체크 및
// 유효성에 맞지 않을때는 마일리지값 초기화
const mileageValidate = computed(() => {
  return mlgMaxLimit.value >= 10;
});
watch(mileageValidate, (newValue: boolean) => {
  if (!newValue) {
    // orderInfo.value.tmgMlgPymAmt = 0;
    tmgMlgPymAmt.value = '';
  }
});

// 쿠폰/마일리지 UI가이드 적용
const handleFocus = () => {
  showBtnClear.value = true;
  tmgMlgPymAmt.value = tmgMlgPymAmt.value.replaceAll(',', '');
};

const handleBlur = (event: any) => {
  showBtnClear.value = false;
  let value = event;
  value = Math.floor(value / 10) * 10;

  if (value > 0) tmgMlgPymAmt.value = value.toLocaleString();
  else tmgMlgPymAmt.value = '';

  orderInfo.value.tmgMlgPymAmt = value;
  // t마일리지 적용금액 초기화
  orderInfo.value.tMlgAmt = 0;
};

/**
 * 입력 값이 숫자인지 확인하고, 숫자가 아닌 문자는 제거.
 * watch를 사용하면 model만 업데이트 되고 사용자한테는 0001과 같은 유효하지 않은 숫자가 그대로 보임
 * @param miligeAmount
 */
const checkGoMiligeValidate = debounce((miligeAmount: string) => {
  if (!miligeAmount || !(typeof miligeAmount === 'string')) {
    return;
  }
  let miligeAmountNumber = miligeAmount.replace(/\D/g, '');

  if (miligeAmountNumber) {
    miligeAmountNumber = String(parseInt(miligeAmountNumber, 10));
  }
  orderInfo.value.tmgMlgPymAmt = parseInt(miligeAmountNumber);
}, 100);
</script>
