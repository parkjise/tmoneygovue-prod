<template>
  <round-box hide-title class="disabled" v-for="(item, index) in items" :key="index">
    <div class="coupon_data">
      <p>{{ item.cpnNm }}</p>
      <p class="title">{{ item.dcCtt }}</p>
      <div class="desc_area">
        <p
          class="date"
          :aria-label="`${formatA11yDateTime(item.useSttDtm.substring(0, 8))}~${formatA11yDateTime(item.useEndDtm.substring(0, 8))}`"
          role="text"
        >
          사용기간 : {{ setDate(item.useSttDtm) }} ~ {{ setDate(item.useEndDtm) }}
        </p>
        <p>{{ item.cndtCtt }}</p>
        <p>{{ item.crpcNm }}</p>
      </div>
      <div class="badge_area">
        <uu-Badge :label="adpt" v-for="(adpt, index) in item.adptSvcNmList" :key="index" />
      </div>
    </div>
    <div class="coupon_status">
      <div class="use">{{ item.cpnStaNm }}</div>
    </div>
  </round-box>
</template>

<script setup lang="ts">
import type { CouponModel } from '@/service/coupon/model/couponModel';
import { formatDate, formatA11yDateTime } from '@/utils/dateUtils';

function setDate(date: string) {
  return formatDate(date, 'YYYY.MM.DD').toString();
}

defineProps({
  items: {
    type: Array as () => CouponModel[],
    required: true
  }
});
</script>
