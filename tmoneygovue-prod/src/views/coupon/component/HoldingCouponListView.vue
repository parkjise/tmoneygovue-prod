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
      <uu-button v-if="item.giftPsbYn === 'Y'" btn-style="line" size="xs" @click="giftCoupon(item.cpnSno)">
        <span>선물하기</span>
      </uu-button>
    </div>
    <div v-if="!!item.cpnImgPath" class="coupon_img">
      <img :src="url + item.cpnImgPath" alt="이벤트 이미지" />
    </div>
  </round-box>
  <CouponGift :isShow="isShow" :cpnSno="cpnSno" @isClose="closeAction" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { formatDate, formatA11yDateTime } from '@/utils/dateUtils';

import type { CouponModel } from '@/service/coupon/model/couponModel';

import CouponGift from '@/views/coupon/CouponGift.vue';

const isShow = ref<boolean>(false);
const cpnSno = ref<string>('');
const url = import.meta.env.VITE_TMONEY_URL;

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

/**
 * 쿠폰 선물하기 모달 창 호출
 * @param value
 */
const giftCoupon = (value: string) => {
  isShow.value = true;
  cpnSno.value = value;
};

/**
 * 쿠폰 선물하기 모달 창 닫기
 */
const closeAction = () => {
  isShow.value = false;
};

/**
 * 날짜 포맷
 * @param date
 */
function setDate(date: string) {
  return formatDate(date, 'YYYY.MM.DD').toString();
}
</script>
