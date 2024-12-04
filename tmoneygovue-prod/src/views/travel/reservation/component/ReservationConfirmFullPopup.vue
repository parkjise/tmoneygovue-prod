<template>
  <common-modal
    ref="rsvrConfFullRef"
    v-model="showPopup"
    type="full"
    title="예약하기"
    full-content
    :ok-update-value="false"
    :close-update-value="false"
    addClass="reserve_modal"
    @ok="emits('next')"
    @close="emits('close')"
  >
    <template #modal_body>
      <div class="bg_gray">
        <div class="content_wrap has_btm_content">
          <div class="btn_wrap">
            <button aria-label="취소" type="button" class="btn_cancel" @click="showConfirmDialog">취소</button>
          </div>
          <round-box hide-title>
            <div class="product">
              <div class="date">{{ getDateText }}</div>
              <div class="product_name">{{ props.prdNm }}</div>
            </div>
            <ul class="ticket_info_list">
              <li v-if="props.isTicket === false">
                <div class="ticket_title">
                  <uuIc v-bind="{ name: 'location', size: '16' }" />
                  출발
                </div>
                <div class="ticket_content">{{ getDAlcnInfo?.deprTrmlNm ?? '' }}</div>
              </li>
              <li>
                <div class="ticket_title">
                  <uuIc v-bind="{ name: 'fare', size: '16' }" />
                  금액
                </div>
                <div class="ticket_content">
                  {{ getTotalCnt }}명
                  <p class="price" tabindex="0" :aria-label="`${getTotalPrice.toLocaleString()}원`">
                    <strong aria-hidden="true"> {{ getTotalPrice.toLocaleString() }} </strong>
                    <span aria-hidden="true">원</span>
                  </p>
                </div>
                <ul class="detail_list" v-for="item in selSatsList" :key="item.busTckKndCd">
                  <li v-if="item.busTckCnt > 0">
                    <div class="list_tit">{{ item.busTckKndNm }} {{ item.busTckCnt }}명</div>
                    <div class="price" tabindex="0" :aria-label="`${getPriceText(item.fee * item.busTckCnt)}원`">
                      <span aria-hidden="true"> {{ getPriceText(item.fee * item.busTckCnt) }} </span>
                      <span aria-hidden="true">원</span>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </round-box>
        </div>
        <div class="total_price_wrap">
          <div class="total_price_title">총 결제금액 ({{ getTotalCnt }}명)</div>
          <div class="price_wrap" tabindex="0" :aria-label="`${getPriceText(getTotalPrice)}원`">
            <span class="price" aria-hidden="true">{{ getPriceText(getTotalPrice) }}</span
            ><span aria-hidden="true">원</span>
          </div>
        </div>
      </div>
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" size="xl" label="결제하기" aria-label="결제하기" @click="btnActions.ok" />
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useReservationStore } from '@/service/travel/reservationModule';
import { formatDate, getDayWeek } from '@/utils/dateUtils';
import { useMessageModal } from '@/composables/useMessageModal';
import { getPriceText } from '@/views/travel/travelUtils';
import CommonModal from '@/views/common/components/CommonModal.vue';

const router = useRouter();
const rsrvStore = useReservationStore();
const { getDAlcnInfo, selSatsList } = storeToRefs(rsrvStore);

const { createConfirmModalByFunction } = useMessageModal();

const props = defineProps({
  isShow: { type: Boolean, required: true, default: false },
  prdNm: { type: String, required: true, default: '' },
  isTicket: { type: Boolean, required: true, default: false }
});
const emits = defineEmits(['close', 'next', 'main']);

const showPopup = ref(false);
const rsvrConfFullRef = ref();

watch(
  () => props.isShow,
  () => {
    showPopup.value = props.isShow;
  }
);

/**
 * @description 날짜 및 시간 텍스트
 */
const getDateText = computed(() => {
  const date = `${formatDate(getDAlcnInfo.value.atlDeprDt, 'YYYY.MM.DD')}(${getDayWeek(getDAlcnInfo.value.atlDeprDt)})`;
  const time = `${getDAlcnInfo.value.atlDeprTime.substring(0, 2)}:${getDAlcnInfo.value.atlDeprTime.substring(2, 4)}`;
  return `${date} ${time}`;
});
/**
 * @description 총예매인원수
 */
const getTotalCnt = computed(() => {
  return selSatsList.value.reduce((acc, cur) => {
    return acc + cur.busTckCnt;
  }, 0);
});
/**
 * @description 총결제금액
 */
const getTotalPrice = computed(() => {
  return selSatsList.value.reduce((acc, cur) => {
    return acc + cur.busTckCnt * cur.fee;
  }, 0);
});
/**
 * @description 상품취소 confirm 팝업
 */
const showConfirmDialog = () => {
  createConfirmModalByFunction(
    '알림',
    `현재 추가된 상품이 있습니다.</br>상품을 취소하시겠습니까?`,
    modalOkCallback,
    '네',
    true,
    () => {},
    '아니요',
    'primary',
    'none',
    'none',
    'line'
  );
};
/**
 * @description 예약취소 콜백 > 메인 이동
 */
const modalOkCallback = () => {
  // 모달의 footer로 접근하는 함수가 아니라서 클래스 직접 삭제 필요(메인 이동 시 스크롤 이슈)
  document.documentElement.classList.remove('modal_open');
  router.replace({ name: 'travel-main' });
};
</script>
