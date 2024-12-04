<template>
  <sub-header title="이용권 사용내역" />
  <main id="main" class="main det usage_detail_page">
    <div class="container no_padding">
      <ul class="ticket_list">
        <li v-for="(item, i) in bicycleVoucherHistoryList" :key="i">
          <div class="ticket_title">
            {{ item.cpnDvsNm }}
            <div class="status primary">{{ setStatus(item) }}</div>
          </div>
          <ul class="normal_list">
            <li>
              <div class="list_tit">{{ t('usageHistory.det_011_001_004') }}</div>
              <div class="list_txt">{{ item.pymAprvDtm }}</div>
            </li>
            <li>
              <div class="list_tit">{{ t('usageHistory.det_011_001_005') }}</div>
              <div class="list_txt">{{ setPeriod(item.useSttDtm, item.useEndDtm) }}</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import type {
  BicycleVoucherHistoryModel,
  ReqBicycleVoucherHistoryModel
} from '@/service/usage-history/model/bikeScooterModel';
import { useUsageHistoryStore } from '@/service/usage-history/usageHistoryModule';
import { formatDate, getToday } from '@/utils/dateUtils';
import { storeToRefs } from 'pinia';
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();
const usageHistoryStore = useUsageHistoryStore();
const { getBicycleVoucherHistoryList } = storeToRefs(usageHistoryStore);

const bicycleVoucherHistoryList = computed(() => {
  return getBicycleVoucherHistoryList.value;
});

/**
 * 이용권 사용내역 조회
 */
async function requestApiHttpBicycleVoucherHistoryList() {
  await usageHistoryStore.actionHttpBicycleVoucherHistoryList({
    reqDtm: formatDate(getToday(), 'YYYYMMDDhhmmss'),
    utlzSvcDvsCd: 'T'
  } as ReqBicycleVoucherHistoryModel);
}

function setStatus(item: BicycleVoucherHistoryModel) {
  let str: string;

  if (item.cpnUseYn === 'Y') {
    str = t('usageHistory.det_011_001_009'); // 사용
  } else {
    str = t('usageHistory.det_011_001_003'); // 미사용
  }

  if (item.pymStaCd === 'BIS_004') {
    str = t('usageHistory.det_011_001_008'); // 환불예정
  } else if (item.pymStaCd === 'BIS_002') {
    str = t('usageHistory.det_011_001_007'); // 환불완료
  }

  return str;
}

const setPeriod = (useSttDtm: string, useEndDtm: string) => {
  if (checkStr(useSttDtm) && checkStr(useEndDtm)) {
    return useSttDtm + ' ~ ' + useEndDtm;
  } else {
    return '~';
  }
};

const checkStr = (str: string) => {
  return str && str != 'null';
};

onMounted(() => {
  requestApiHttpBicycleVoucherHistoryList();
});
</script>
