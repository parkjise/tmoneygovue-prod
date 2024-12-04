<template>
  <div class="setting_area">
    <HistoryMonthCalendar @updateCalendar="handleCalendar" />
  </div>
  <div class="usage_list_area">
    <BusHistoryComponent
      v-if="isLinked && busHistoryList.length > 0"
      @updateList="updateList"
      :items="busHistoryList"
      :isLast="isLast"
      :isLoading="isLoading"
      :pageNo="pageNo"
    />
    <NoServiceComponent v-else category="bus" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { formatDate, getEndDate, getStartDate, getToday } from '@/utils/dateUtils';
import { storeToRefs } from 'pinia';

import { useUsageHistoryStore } from '@/service/usage-history/usageHistoryModule';
import type { ReqBusHistoryModel } from '@/service/usage-history/model/busHistoryModel';
import BusHistoryComponent from '@/views/usage-history/bus/component/BusHistoryComponent.vue';
import NoServiceComponent from '@/views/usage-history/component/NoServiceComponent.vue';
import HistoryMonthCalendar from '@/views/usage-history/component/HistoryMonthCalendar.vue';
import { linkedServiceYN } from '@/service/usage-history/usageHistoryUtils';
import { serviceCode } from '@/utils/constants/usageHistoryConstants';

const pageNo = ref(0);
const isLoading = ref<boolean>(false);
const date = ref<string>(formatDate(getToday(), 'YYYYMM'));

const usageHistoryStore = useUsageHistoryStore();
const { getBusHistory, isLast, getInqrMonth } = storeToRefs(usageHistoryStore);

const busHistoryList = computed(() => {
  return getBusHistory.value;
});

/**
 * 목록 더보기
 * TODO 현재Api는 paging 처리 되어 있지 않음
 */
const updateList = () => {
  requestBusHistoryList(true);
  // if (!isLast.value) {
  //   requestBusHistoryList(false);
  // }
};

const handleCalendar = (param: string) => {
  isLast.value = false;
  date.value = param;
  pageNo.value = 0;
  requestBusHistoryList(true);
};

const isLinked = computed(() => {
  return linkedServiceYN(serviceCode.bus);
});
/**
 * 버스 이용내역 조회
 * @param isNew
 */
async function requestBusHistoryList(isNew: boolean) {
  if (!isLinked.value) return;
  if (!isLoading.value) {
    //const today = formatDate(getToday(), 'YYYYMMDD');
    //const startDate = formatDate(subtractDate(today, 6, 'month'), 'YYYYMMDD');

    isLoading.value = true;
    pageNo.value++;

    const res = await usageHistoryStore.actionHttpBusHistoryList(isNew, {
      inqrCtVal: 'T',
      rideStatCd: '0',
      inqrSttDt: getStartDate(date.value),
      inqrEndDt: getEndDate(date.value),
      jrnyYn: 'N',
      inqrMonth: date.value
    } as ReqBusHistoryModel);

    isLoading.value = false;

    if (res) {
      return res;
    }
  }
}

onMounted(async () => {
  isLast.value = false;
  if (getInqrMonth.value) date.value = getInqrMonth.value;
  await requestBusHistoryList(true);
});
</script>
