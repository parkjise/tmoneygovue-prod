<template>
  <round-box hide-title v-for="(item, index) in items" :key="index">
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
        <template v-if="item.utlzSvcDvsCd !== 'A'">
          <uu-Badge :label="adpt" v-for="(adpt, index) in item.adptSvcNmList" :key="index" />
        </template>
        <uu-Badge v-else label="전체" />
      </div>
    </div>
    <div class="coupon_status">
      <uu-button btn-style="line" size="xs" @click="requestApiHttpReqIssueCoupon(item.cpnDfntSno)">
        <uu-ic size="14" name="download" />
        <span>발급</span>
      </uu-button>
    </div>
    <div v-if="!!item.cpnImgPath" class="coupon_img">
      <img :src="url + item.cpnImgPath" alt="이벤트 이미지" />
    </div>
  </round-box>
</template>

<script setup lang="ts">
import type { CouponModel } from '@/service/coupon/model/couponModel';
import { useCouponStore } from '@/service/coupon/couponModule';

import { formatDate, formatA11yDateTime } from '@/utils/dateUtils';
import { getAppBridge } from '@/utils';

const emit = defineEmits(['updateList']);
const couponListStore = useCouponStore();
const url = import.meta.env.VITE_TMONEY_URL;

/**
 * 쿠폰 발급
 * @param cpnDfntSno
 */
async function requestApiHttpReqIssueCoupon(cpnDfntSno: string) {
  const result = await couponListStore.actionReqIssueCoupon(cpnDfntSno);
  if (result) {
    const appBridge = await getAppBridge();
    if (result.rspCd === '0000') {
      appBridge.showToast({ message: '쿠폰이 발급되었습니다.' });
      emit('updateList');
    }
  }
}

/**
 * 날짜 포맷
 * @param date
 */
function setDate(date: string) {
  return formatDate(date, 'YYYY.MM.DD').toString();
}

defineProps({
  items: {
    type: Array as () => CouponModel[],
    required: true
  },
  isLoading: {
    type: Boolean,
    required: true
  }
});
</script>

<style scoped></style>
