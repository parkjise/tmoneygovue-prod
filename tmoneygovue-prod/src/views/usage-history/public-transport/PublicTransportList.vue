<template>
  <div class="setting_area public">
    <HistoryMonthCalendar @updateCalendar="handleDate"></HistoryMonthCalendar>
    <TrafficCardList @updateCardSno="handleCardSno" :items="cardList" :pageNo="pageNo" />
  </div>
  <div class="usage_list_area">
    <template v-if="!isLinked || cardList.length < 1">
      <NoServiceComponent category="public"></NoServiceComponent>
    </template>
    <!-- 대중교통 이용내역 목록 -->
    <template v-else-if="publicTransportHistoryList.length > 0">
      <PublicTransportHistoryComponent
        :items="publicTransportHistoryList"
        :isLast="isLast"
        :isLoading="isLoading"
        :pageNo="pageNo"
        @updateList="updateList"
      />
    </template>
    <!--// 대중교통 이용내역 목록 -->
    <template v-else>
      <div class="no_result">
        <uuIc v-bind="{ name: 'exclamation', size: '48' }" />
        <div class="no_result_txt">{{ t('usageHistory.det_004_002_001') }}</div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { formatDate, getToday } from '@/utils/dateUtils';
import PublicTransportHistoryComponent from '@/views/usage-history/public-transport/component/PublicTransportComponent.vue';
import TrafficCardList from '@/views/traffic-card/component/TrafficCardList.vue';
import { useTrafficCardListStore } from '@/service/traffic-card/trafficCardModule';
import { useUsageHistoryStore } from '@/service/usage-history/usageHistoryModule';
import type { RequestPublicTransportHistoryModel } from '@/service/usage-history/model/publicTransportModel';
import { storeToRefs } from 'pinia';
import NoServiceComponent from '@/views/usage-history/component/NoServiceComponent.vue';
import HistoryMonthCalendar from '@/views/usage-history/component/HistoryMonthCalendar.vue';
import { useI18n } from '@/composables/useI18n';
import { linkedServiceYN } from '@/service/usage-history/usageHistoryUtils';
import { serviceCode } from '@/utils/constants/usageHistoryConstants';

const { t } = useI18n();
const usageHistoryStore = useUsageHistoryStore();
const { getPublicTransportHistory, isLast, getInqrMonth } = storeToRefs(usageHistoryStore);

const pageNo = ref<number>(0);
const cardSno = ref<string>('');
const date = ref<string>(formatDate(getToday(), 'YYYYMM'));
const isLoading = ref<boolean>(false);

const publicTransportHistoryList = computed(() => {
  return getPublicTransportHistory.value;
});

const updateList = async () => {
  if (!isLast.value) {
    await requestPublicTransportHistoryList(false);
  }
};

const isLinked = computed(() => {
  return linkedServiceYN(serviceCode.public);
});
/**
 * 대중교통 이용내역 목록 조회
 * @param isNew
 */
const requestPublicTransportHistoryList = async (isNew: boolean) => {
  if (!isLinked.value) return;
  if (!isLoading.value) {
    isLoading.value = true;
    pageNo.value++;
    await usageHistoryStore.actionHttpPublicTransportHistoryList(isNew, {
      pageNo: pageNo.value,
      trcrSno: cardSno.value,
      inqrMonth: date.value
    } as RequestPublicTransportHistoryModel);

    isLoading.value = false;
  }
};

const trafficCardStore = useTrafficCardListStore();
const { getCardList } = storeToRefs(trafficCardStore);

const cardList = computed(() => {
  return getCardList.value;
});

/**
 * 교통카드 목록 조회
 */
async function requestCardList() {
  const res = await trafficCardStore.actionHttpTrafficCardList('0');

  if (res) {
    return res;
  }
}

/**
 * 캘린더 변경 시 이벤트
 * @param value
 */
async function handleDate(value: string) {
  if (value && pageNo.value > 0) {
    date.value = value;
  }
  pageNo.value = 0;
  isLast.value = false;
  await requestPublicTransportHistoryList(true);
}

/**
 * 교통카드 변경 시 이벤트
 * @param value
 */
async function handleCardSno(value: string) {
  if (pageNo.value > 0) {
    cardSno.value = value;
    pageNo.value = 0;
    isLast.value = false;
    await requestPublicTransportHistoryList(true);
  }
}

onMounted(async () => {
  isLast.value = false;
  if (getInqrMonth.value) date.value = getInqrMonth.value;
  await requestCardList();
  await requestPublicTransportHistoryList(true);
});
</script>
