<template>
  <ul class="usage_list">
    <li v-for="(item, index) in items" :key="index">
      <button type="button" class="usage_btn" @click="goDetail(item)">
        <div class="usage_info">
          <p class="title">
            <span class="ic_area">
              <img v-if="item.BUS_DVS_CD === 'H'" src="/assets/images/ic/ic_vehicle_xtz.svg" alt="고속" />
              <img v-else src="/assets/images/ic/ic_vehicle_xzz.svg" alt="시외" />
            </span>
            {{ item.FR_NAM }} - {{ item.TO_NAM }}
            <span class="num_area">{{ item.CNT }}</span>
          </p>
          <p class="status">{{ item.STATUS ? item.STATUS : item.BMG_COD === '4' ? '예매취소' : '예매완료' }}</p>
        </div>
        <ul class="normal_list">
          <li>
            <div class="list_tit">출발일시</div>
            <div class="list_txt num" :aria-label="formatA11yDateTime(item.TIM_DTE, item.TIM_TIM, true)">
              {{ setDate(item.TIM_DTE, item.DAY, item.TIM_TIM) }}
            </div>
          </li>
          <li>
            <div class="list_tit">{{ item.BMG_COD === '4' ? '취소일시' : '결제일시' }}</div>
            <div class="list_txt num" :aria-label="formatA11yDateTime(item.SORT_DTE, '', true)">
              {{ setDate(item.SORT_DTE, item.CAL_DAY, '') }}
            </div>
          </li>
          <li>
            <div class="list_tit">등급</div>
            <div class="list_txt">{{ item.BD_COD_NAM }}</div>
          </li>
          <li>
            <div class="list_tit">운행회사</div>
            <div class="list_txt">{{ item.COR_NAM }}</div>
          </li>
        </ul>
      </button>
    </li>
    <!--TODO 버스 Paging 처리 안되어있음-->
    <!--    <li ref="loadMoreRef" class="loading"></li>-->
  </ul>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';
import { ref } from 'vue';
import type { BusHistoryModel } from '@/service/usage-history/model/busHistoryModel';
import { getAppBridge } from '@/utils';
import { FlexResponseCode } from '@/utils/hybrid/type';
import { formatA11yDateTime } from '@/utils/dateUtils';

const emit = defineEmits(['updateList']);
const loadMoreRef = ref<HTMLElement | null>(null);

const props = defineProps({
  items: {
    type: Array as () => BusHistoryModel[],
    required: true
  },
  isLast: {
    type: Boolean,
    required: true
  },
  isLoading: {
    type: Boolean,
    required: true
  },
  pageNo: {
    type: Number,
    required: true
  }
});

let busHistoryListObserver = useIntersectionObserver(
  loadMoreRef,
  ([{ isIntersecting }]) => {
    if (!isIntersecting || props.isLoading || props.isLast) {
      busHistoryListObserver.stop;
      return;
    }
    emit('updateList');
  },
  { threshold: 0.5 }
);

/**
 * 버스 이용내역 상세 브릿지
 * @param item
 */
const goDetail = async (item: BusHistoryModel) => {
  const appBridge = await getAppBridge();

  if (item) {
    const res = await appBridge.openView({
      url: 'history/bus/detail',
      viewType: 'native',
      viewJsonValue: JSON.stringify(item)
    });
    if (res && res.response.code === FlexResponseCode.OK) {
      emit('updateList');
    }
  }
};
/**
 * 날짜 포맷
 * @param date
 * @param day
 * @param time
 */
function setDate(date: string, day: string, time: string) {
  let returnDate = '';

  returnDate += date.slice(0, 4) + '.';
  returnDate += date.slice(4, 6) + '.';
  returnDate += date.slice(6, 8);
  returnDate += ' (' + day + ') ';

  if (time) {
    returnDate += time.slice(0, 2) + ':';
    returnDate += time.slice(2, 4);
  } else {
    returnDate += date.slice(8, 10) + ':';
    returnDate += date.slice(10, 12);
  }

  return returnDate;
}
</script>
