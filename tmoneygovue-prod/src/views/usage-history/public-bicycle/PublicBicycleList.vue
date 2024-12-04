<template>
  <PublicBicycleStatics :item="publicBicycleStatic" @changeTab="handleTab" />
  <div class="use_ticket_list_btn_wrap">
    <button type="button" class="use_ticket_list_btn" @click="clickGotoLink">
      {{ t('usageHistory.det_011_001_001') }}
    </button>
  </div>
  <div class="setting_area bike">
    <HistoryMonthCalendar @updateCalendar="handleCalendar" />
  </div>

  <!-- 공공자전거 이용내역 -->
  <PublicBicycleComponent
    @updateList="updateList"
    :items="publicBicycleHistory"
    :isLast="isLast"
    :isLoading="isLoading"
    :pageNo="pageNo"
    :isLinked="isLinked"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { ReqBikeScooterModel } from '@/service/usage-history/model/bikeScooterModel';
import { useUsageHistoryStore } from '@/service/usage-history/usageHistoryModule';
import { storeToRefs } from 'pinia';
import PublicBicycleStatics from '@/views/usage-history/public-bicycle/component/PublicBicycleStatics.vue';
import PublicBicycleComponent from '@/views/usage-history/public-bicycle/component/PublicBicycleComponent.vue';
import { useRouter } from 'vue-router';
import HistoryMonthCalendar from '@/views/usage-history/component/HistoryMonthCalendar.vue';
import { getToday } from '@/utils/dateUtils';
import { useI18n } from '@/composables/useI18n';
import { linkedServiceYN } from '@/service/usage-history/usageHistoryUtils';
import { serviceCode } from '@/utils/constants/usageHistoryConstants';

const { t } = useI18n();
const usageHistoryStore = useUsageHistoryStore();
const { getBikeScooterDta, isLast, getInqrMonth } = storeToRefs(usageHistoryStore);
const router = useRouter();

const pageNo = ref(0);
const date = ref<string>(getToday().format('YYYYMM'));
const isLoading = ref<boolean>(false);
const termDvsCd = ref<string>('03');

const publicBicycleHistory = computed(() => {
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
    requestPublicBicycleHistory(false);
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
  requestPublicBicycleHistory(true);
};

const isLinked = computed(() => {
  return linkedServiceYN(serviceCode.bike);
});

/**
 * 공공자전거 이용 내역 조회
 * @param isNew
 */
async function requestPublicBicycleHistory(isNew: boolean) {
  // 타슈의 경우 연동 내역이 없으므로 목록 조회 필수
  // if (!isLinked.value)
  if (!isLoading.value) {
    isLoading.value = true;
    pageNo.value++;

    const res = await usageHistoryStore.actionHttpBikeScooterList(isNew, {
      pageNo: pageNo.value,
      pmGrpDvsCd: 'T',
      termDvsCd: termDvsCd.value,
      utlzSvcDvsCd: 'A',
      inqrMonth: date.value
    } as ReqBikeScooterModel);

    isLoading.value = false;

    if (res) {
      return res;
    }
  }
}

/**
 * 공공자전거 기간 탭 변경 시 이벤트
 * @param tab
 */
const handleTab = (tab: string) => {
  if (tab) {
    pageNo.value = 0;
    termDvsCd.value = tab;
    isLast.value = false;
    requestPublicBicycleHistory(true);
  }
};

/**
 * 이용권 사용내역 페이지 이동
 */
const clickGotoLink = () => {
  router.push({
    path: '/usage-history/voucher-list'
  });
};

onMounted(async () => {
  isLast.value = false;
  if (getInqrMonth.value) date.value = getInqrMonth.value;
  await requestPublicBicycleHistory(true);
});
</script>
