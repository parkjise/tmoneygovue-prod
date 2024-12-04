<template>
  <div class="setting_area">
    <HistoryMonthCalendar @updateCalendar="handleChange" />
  </div>
  <div class="usage_list_area">
    <template v-if="isLinked && getTrvlHistoryList.length > 0">
      <ul class="usage_list">
        <li v-for="(item, index) in getTrvlHistoryList" :key="index" @click="goTrvlHistory(item)">
          <button type="button" class="usage_btn">
            <div ref="usageInfoRef" class="usage_info">
              <p class="title">
                <span class="ic_area">
                  <img src="/assets/images/ic/ic_vehicle_travel.svg" alt="여행" />
                </span>
                <span ref="titleRef" class="title_area" :class="ellipsis(index)">
                  {{ item.trvlPrdNm ?? '' }}
                </span>
                <span class="num_area">{{ item.tissuNcnt }}</span>
              </p>
              <p class="status" :class="item.trvlMrsStaCd === TrvlMrsSta.CANC ? ' status red' : 'status'">
                {{ item.trvlMrsStaNm ?? '' }}
              </p>
            </div>
            <ul class="normal_list">
              <li>
                <div class="list_tit">출발일시</div>
                <div class="list_txt num">
                  <span :aria-label="formatA11yDateTime(item.deprDt, item.deprTime, true)">
                    {{ getDateText(`${item.deprDt}${item.deprTime}`, true) }}
                  </span>
                </div>
              </li>
              <li>
                <div class="list_tit">{{ item.trvlMrsStaCd === TrvlMrsSta.SUCCESS ? '결제일시' : '취소일시' }}</div>
                <div class="list_txt num">
                  <span :aria-label="formatA11yDateTime(item.pymDtm, '', true)">
                    {{ getDateText(item.pymDtm, true) }}
                  </span>
                </div>
              </li>
              <li>
                <div class="list_tit">출발장소</div>
                <div class="list_txt">{{ item.deprTrmlNm }}</div>
              </li>
            </ul>
          </button>
        </li>
        <li ref="loadMoreRef" class="loading"></li>
      </ul>
    </template>
    <template v-else>
      <NoServiceComponent category="travel"></NoServiceComponent>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useUsageHistoryStore } from '@/service/usage-history/usageHistoryModule';
import type { TrvlHistoryModel } from '@/service/usage-history/model/travelHistoryModel';
import { getDateText } from '@/views/travel/travelUtils';
import { TrvlMrsSta } from '@/service/travel/travelConsts';
import NoServiceComponent from '@/views/usage-history/component/NoServiceComponent.vue';
import HistoryMonthCalendar from '@/views/usage-history/component/HistoryMonthCalendar.vue';
import dayjs from 'dayjs';
import { formatDate } from '@/utils/dateUtils';
import { useRouter } from 'vue-router';
import { formatA11yDateTime } from '@/utils/dateUtils';
import { linkedServiceYN } from '@/service/usage-history/usageHistoryUtils';
import { serviceCode } from '@/utils/constants/usageHistoryConstants';

const router = useRouter();

const loadMoreRef = ref<HTMLElement | null>(null);
const usageInfoRef = ref([]);
const titleRef = ref([]);

const usageHistoryStore = useUsageHistoryStore();
const { getTrvlHistoryList, getTrvlShow, getTrvlMrsStaCd, getTrvlMrnpSno, getTrvlMrnpCancSqno, getInqrMonth } =
  storeToRefs(usageHistoryStore);

const trvlMrnpSno = ref<string>('');
const trvlMrsStaCd = ref<string>('');
const trvlMrnpCancSqno = ref<string>('');

onMounted(async () => {
  if (getInqrMonth.value) {
    handleChange(getInqrMonth.value);
    // await usageHistoryStore.actionTrvlHistoryList(true, getInqrMonth.value);
  } else {
    handleChange(formatDate(dayjs(), 'YYYYMM'));
    // await usageHistoryStore.actionTrvlHistoryList(true, formatDate(dayjs(), 'YYYYMM'));
  }
  if (getTrvlShow.value) {
    trvlMrsStaCd.value = getTrvlMrsStaCd.value;
    trvlMrnpSno.value = getTrvlMrnpSno.value;
    trvlMrnpCancSqno.value = getTrvlMrnpCancSqno.value;
  }
});

// css 말줄임 처리를 하려면 width가 고정값이어야하는데 텍스트가 짧아서 말줄임이 되지 않을 경우 num_area가 동떨어지게 되는 현상이 생김
// 말줄임처리가 안될 때는 width를 주지 않도록 함
const ellipsis = (index: number) => {
  const usageInfoEls = usageInfoRef.value as HTMLElement[];
  const titleEls = titleRef.value as HTMLElement[];
  if (usageInfoEls[index] && titleEls[index]) {
    const usageInfoWidth = usageInfoEls[index].offsetWidth;
    const titleWidth = titleEls[index].offsetWidth;

    return titleWidth >= usageInfoWidth * 0.5 ? 'ellipsis' : '';
  }
  return '';
};

const isLinked = computed(() => {
  return linkedServiceYN(serviceCode.travel);
});
const handleChange = async (value: string) => {
  if (!isLinked.value) return;
  await usageHistoryStore.actionTrvlHistoryList(true, value);
};

const goTrvlHistory = async (item: TrvlHistoryModel) => {
  router.push({
    name: 'travel-history-detail',
    query: {
      trvlMrnpSno: item.trvlMrnpSno,
      trvlMrsStaCd: item.trvlMrsStaCd,
      ...(item.trvlPymCancSno && item.trvlPymCancSno !== '' && { trvlMrnpCancSqno: item.trvlPymCancSno })
    }
  });
};
</script>
