<template>
  <BikeScooterStatics :responseDta="publicBicycleStatic" @changeTab="handleTab" />
  <div class="setting_area bike">
    <HistoryMonthCalendar @updateCalendar="handleCalendar" />
  </div>
  <!-- 자전거/킥보드 이용 내역 -->
  <BikeScooterComponent
    @updateList="updateList"
    :items="bikeScooterHistory"
    :isLast="isLast"
    :isLoading="isLoading"
    :pageNo="pageNo"
    :isMounted="isMounted"
    :isLinked="isLinked"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { ReqBikeScooterModel } from '@/service/usage-history/model/bikeScooterModel';
import { useUsageHistoryStore } from '@/service/usage-history/usageHistoryModule';
import { storeToRefs } from 'pinia';
import BikeScooterComponent from '@/views/usage-history/bike-scooter/component/BikeScooterComponent.vue';
import BikeScooterStatics from '@/views/usage-history/bike-scooter/component/BikeScooterStatics.vue';
import HistoryMonthCalendar from '@/views/usage-history/component/HistoryMonthCalendar.vue';
import { getToday } from '@/utils/dateUtils';
import { linkedServiceYN } from '@/service/usage-history/usageHistoryUtils';
import { serviceCode } from '@/utils/constants/usageHistoryConstants';

const pageNo = ref(0);
const isLoading = ref<boolean>(false);
const isMounted = ref<boolean>(false);
const date = ref<string>(getToday().format('YYYYMM'));

const termDvsCd = ref<string>('03');
const usageHistoryStore = useUsageHistoryStore();
const { getBikeScooterDta, isLast, getInqrMonth } = storeToRefs(usageHistoryStore);

const bikeScooterHistory = computed(() => {
  if (getBikeScooterDta.value.data) {
    return getBikeScooterDta.value.data?.dtl;
  } else {
    return [];
  }
});

const publicBicycleStatic = computed(() => {
  return getBikeScooterDta.value;
});

/**
 * 목록 추가 조회
 */
const updateList = () => {
  if (!isLast.value) {
    requestBikeScooterList(false);
  }
};

/**
 * 월별 조회 달력 변경 이벤트
 * @param param
 */
const handleCalendar = (param: string) => {
  isLast.value = false;
  date.value = param;
  pageNo.value = 0;
  requestBikeScooterList(true);
};

const isLinked = computed(() => {
  return linkedServiceYN(serviceCode.kickboard);
});
/**
 * 자전거/킥보드 이용내역 조회
 * @param isNew
 */
async function requestBikeScooterList(isNew: boolean) {
  // 쏘카의 경우 연동 내역이 없으므로 목록 조회 필수
  // if (!isLinked.value) return;
  if (!isLoading.value && !isLast.value) {
    isLoading.value = true;
    pageNo.value++;

    const resResult = await usageHistoryStore.actionHttpBikeScooterList(isNew, {
      pageNo: pageNo.value,
      pmGrpDvsCd: 'X',
      termDvsCd: termDvsCd.value,
      utlzSvcDvsCd: 'A',
      inqrMonth: date.value
    } as ReqBikeScooterModel);

    isLoading.value = false;

    if (resResult) {
      return resResult;
    }
  }
}

/**
 * 이용내역 기간 탭 변경 시 이벤트
 * @param tab
 */
const handleTab = (tab: string) => {
  if (tab) {
    pageNo.value = 0;
    termDvsCd.value = tab;
    isLast.value = false;
    requestBikeScooterList(true);
  }
};

onMounted(async () => {
  isLast.value = false;
  if (getInqrMonth.value) date.value = getInqrMonth.value;
  await requestBikeScooterList(true);
  isMounted.value = true;
});
</script>
