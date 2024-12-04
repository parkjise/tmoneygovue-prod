<!-- 출발지 선택 > 인원선택 바텀시트 -->
<template>
  <common-modal
    ref="personnelBottomRef"
    v-model="personnelBottom"
    type="bottom"
    hide-header
    @ok="emits('ok', countList)"
    @close="emits('close')"
  >
    <template #modal_body>
      <!-- 티켓상품인 경우 -->
      <div v-if="props.isTicket" class="num_count_info">
        <div class="product_date">
          <p class="date">
            {{ formatDate(props.selectDate, 'YYYY.MM.DD') }}
          </p>
          <button aria-label="날짜변경" type="button" class="cal_btn" @click="emits('change')">
            <span>날짜변경</span>
            <uu-ic size="16" name="arrow_right" />
          </button>
        </div>
        <div
          class="ticket_remain"
          v-if="result"
          tabindex="0"
          :aria-label="props.maxCnt === 0 ? `매진` : `잔여 매수 ${props.maxCnt}매`"
        >
          <p>잔여 매수</p>
          <p class="num" :class="{ zero: props.maxCnt === 0 }">
            <template v-if="props?.maxCnt ?? 0 > 0">
              {{ props.maxCnt }}
            </template>
            <template v-else> 0 </template>
          </p>
          <p>매</p>
          <p v-if="props.maxCnt === 0" class="soldout">매진</p>
        </div>
      </div>
      <!-- 카운팅영역 -->
      <div class="num_count_area" v-if="result">
        <div class="age_group" v-for="item in countList" :key="item.busTckKndCd">
          <div class="age_assort">{{ item.busTckKndNm || '' }}</div>
          <div class="price">{{ getPriceText(item.fee ?? 0) }}원</div>
          <div class="counter">
            <button
              aria-label="1감소"
              type="button"
              class="minus_btn"
              :disabled="item.busTckCnt === 0"
              @click="minusCount(item)"
            >
              <uu-ic name="minus" size="16" />
            </button>
            <div class="count_num">
              {{ item.busTckCnt || 0 }}
            </div>
            <button aria-label="1증가" type="button" class="plus_btn" @click="plusCount(item)">
              <uu-ic name="plus" size="16" />
            </button>
          </div>
        </div>
        <!-- 총 결제금액 -->
        <div class="total_price_wrap">
          <div class="total_price_title">총 결제금액 ({{ getTotalCnt }}명)</div>
          <div class="price_wrap" tabindex="0" :aria-label="`${getPriceText(getTotalPrice)}원`">
            <span class="price" aria-hidden="true">{{ getPriceText(getTotalPrice) }}</span
            ><span aria-hidden="true">원</span>
          </div>
        </div>
      </div>
      <no-reseult-component v-if="result === false" message="예약 가능한 잔여좌석이 없습니다." class="no_count" />
    </template>
    <template #modal_footer="btnActions">
      <uu-button
        btn-color="primary"
        label="선택완료"
        aria-label="선택완료"
        size="xl"
        @click="btnActions.ok"
        :disabled="getTotalPrice <= 0"
      />
    </template>
  </common-modal>
</template>
<script setup lang="ts">
import NoReseultComponent from '@/views/travel/component/NoResultComponent.vue';
import CommonModal from '@/views/common/components/CommonModal.vue';

import { ref, watch, computed } from 'vue';
import dayjs from 'dayjs';
import { getAppBridge } from '@/utils';
import { getPriceText } from '../../travelUtils';
import type { TckData } from '@/service/travel/reservationModule';
import { formatDate } from '@/utils/dateUtils';
import { cloneDeep } from 'lodash-es';

const personnelBottomRef = ref(); // 인원 선택 바텀시트 ref
const personnelBottom = ref(false);

const emits = defineEmits(['ok', 'close', 'change', 'plus', 'minus']);
const props = defineProps({
  isShow: { type: Boolean, default: false },
  selectDate: { type: dayjs, default: dayjs() },
  maxCnt: { type: Number, defualt: 0 },
  tckData: { type: Array<TckData>, default: [] },
  isTicket: { type: Boolean, default: false, required: false },
  date: { type: String, default: '', required: false }
});

const countList = ref<TckData[]>([]); // 티켓 타입별 카운팅 리스트
const result = ref(false);

watch(
  () => props.isShow,
  () => {
    personnelBottom.value = props.isShow;
    if (personnelBottom.value) {
      countList.value = cloneDeep(props.tckData);
      result.value = (props.maxCnt ?? 0) > 0;
    }
  }
);

const getTotalCnt = computed(() => {
  return countList.value.reduce((acc, cur) => {
    return acc + cur.busTckCnt;
  }, 0);
});

/**
 * @description 총 결제금액
 */
const getTotalPrice = computed(() => {
  return countList.value.reduce((acc, cur) => {
    return acc + cur.busTckCnt * cur.fee;
  }, 0);
});

const plusCount = async (item: TckData) => {
  const appBridge = await getAppBridge();
  if (getRemainingSats.value === props.maxCnt || getRemainingSats.value > 0) {
    item.busTckCnt++;
    return;
  }
  appBridge.showToast({ message: `예약 가능 인원은 ${props.maxCnt}명 입니다.` });
};

const minusCount = (item: TckData) => {
  if (item.busTckCnt > 0) item.busTckCnt--;
};

/**
 * @description 남은 예매 가능 수
 */
const getRemainingSats = computed(() => {
  if (props.maxCnt && props.maxCnt > 0) return props.maxCnt - getTotalCnt.value;
  return 0;
});
</script>
