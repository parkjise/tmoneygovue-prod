<template>
  <div class="setting_area">
    <HistoryMonthCalendar @updateCalendar="handleCalendar" />
  </div>
  <div class="usage_list_area">
    <!-- 기차 이용내역 목록 -->
    <template v-if="isLinked && trainHistoryList.length > 0">
      <ul class="usage_list">
        <li v-for="(item, index) in trainHistoryList" :key="index">
          <button type="button" class="usage_btn" @click="goDetail(item)">
            <div class="usage_info">
              <p class="title">
                <span class="ic_area">
                  <object :data="imageBasePath + '/assets/images/ic/ic_vehicle_srt.svg'" />
                </span>
                {{ item.dptRsStnNm1 }} - {{ item.arvRsStnNm1 }}
              </p>
              <p class="status">
                {{ item.rsvStsNm }}
              </p>
            </div>
            <ul class="normal_list">
              <li>
                <div class="list_tit">출발일시</div>
                <div class="list_txt num" :aria-label="formatA11yDateTime(item.dptDt1, item.dptTm1, true)">
                  {{ setDate(item.dptDt1 + item.dptTm1) }}
                </div>
              </li>
              <li v-if="item.rsvStsNm === '예약취소' || item.rsvStsNm === '취소완료'">
                <div class="list_tit">취소일시</div>
                <div class="list_txt num" :aria-label="formatA11yDateTime(item.pymCancDt, item.pymCancTm, true)">
                  {{ setDate(item.pymCancDt + item.pymCancTm) }}
                </div>
              </li>
              <li v-else>
                <div class="list_tit">결제일시</div>
                <div class="list_txt num" :aria-label="formatA11yDateTime(item.pymDt, item.pymTm, true)">
                  {{ setDate(item.pymDt + item.pymTm) }}
                </div>
              </li>
              <li>
                <div class="list_tit">상세인원</div>
                <div class="list_txt num">{{ setPerson(item) }}</div>
              </li>
              <li>
                <div class="list_tit">결제정보</div>
                <div class="list_txt num">{{ item.stlMnsNm }}</div>
              </li>
            </ul>
          </button>
        </li>
        <li ref="loadMoreRef" class="loading"></li>
      </ul>
    </template>
    <!--// 기차 이용내역 목록 -->
    <template v-else>
      <NoServiceComponent category="train" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useIntersectionObserver } from '@vueuse/core';
import type { ReqTrainHistoryModel, TrainHistoryModel } from '@/service/usage-history/model/trainHistoryModel';
import { useUsageHistoryStore } from '@/service/usage-history/usageHistoryModule';
import { formatDate, getToday } from '@/utils/dateUtils';
import NoServiceComponent from '@/views/usage-history/component/NoServiceComponent.vue';
import HistoryMonthCalendar from '@/views/usage-history/component/HistoryMonthCalendar.vue';
import { getAppBridge } from '@/utils';
import { FlexResponseCode } from '@/utils/hybrid/type';
import { formatA11yDateTime } from '@/utils/dateUtils';
import { linkedServiceYN } from '@/service/usage-history/usageHistoryUtils';
import { serviceCode } from '@/utils/constants/usageHistoryConstants';

const pageNo = ref<number>(0);
const isLoading = ref<boolean>(false);
const loadMoreRef = ref(null);
const date = ref<string>(formatDate(getToday(), 'YYYYMM'));
const imageBasePath = import.meta.env.VITE_IMAGE_BASE_PATH;

const usageHistoryStore = useUsageHistoryStore();
const { getTrainHistory, isLast, getInqrMonth } = storeToRefs(usageHistoryStore);

const trainHistoryList = computed(() => {
  return getTrainHistory.value;
});

const isLinked = computed(() => {
  return linkedServiceYN(serviceCode.train);
});
/**
 * 기차(SRT) 이용내역 조회
 * @param isNew
 */
async function requestTrainHistoryList(isNew: boolean) {
  if (!isLinked.value) return;
  if (!isLoading.value && !isLast.value) {
    isLoading.value = true;
    pageNo.value++;

    const resResult = await usageHistoryStore.actionHttpTrainHistoryList(isNew, {
      pageNo: pageNo.value.toString(),
      inqrMonth: date.value
    } as ReqTrainHistoryModel);

    isLoading.value = false;

    if (resResult.jrnyList.length < 1) {
      trainListObserver.stop();
    } else {
      return resResult;
    }
  }
}

const handleCalendar = (param: string) => {
  date.value = param;
  pageNo.value = 0;
  requestTrainHistoryList(true);
};

let trainListObserver = useIntersectionObserver(
  loadMoreRef,
  ([{ isIntersecting }]) => {
    if (!isIntersecting || isLoading.value || isLast.value) return;
    requestTrainHistoryList(false);
  },
  { threshold: 0.5 }
);

/**
 * 날짜 포맷
 * @param date
 */
function setDate(date: string) {
  return formatDate(date, 'YYYY.MM.DD(ddd) HH:mm').toString();
}

/**
 * 인원 수 세팅
 * @param item
 */
function setPerson(item: TrainHistoryModel) {
  let returnStr = '';

  if (item.stlPsgNtalCnt1) {
    returnStr += '어른(보훈) ' + item.stlPsgNtalCnt1;
  }
  if (item.stlPsgNtalGrdCnt1) {
    returnStr += (returnStr.length > 0 ? ', 어른(보호자) ' : '어른(보호자) ') + item.stlPsgNtalGrdCnt1;
  }
  if (item.stlPsgCnt1) {
    returnStr += (returnStr.length > 0 ? ', 어른 ' : '어른 ') + item.stlPsgCnt1;
  }
  if (item.stlPsgCnt3) {
    returnStr += (returnStr.length > 0 ? ', 어린이 ' : '어린이 ') + item.stlPsgCnt3;
  }
  if (item.stlPsgCnt8) {
    returnStr += (returnStr.length > 0 ? ', 유아 ' : '유아 ') + item.stlPsgCnt8;
  }
  if (item.stlPsgCnt7) {
    returnStr += (returnStr.length > 0 ? ', 경로 ' : '경로 ') + item.stlPsgCnt7;
  }
  return returnStr;
}

const goDetail = async (item: TrainHistoryModel) => {
  const appBridge = await getAppBridge();

  if (item) {
    const res = await appBridge.openView({
      url: 'history/train/detail',
      viewType: 'native',
      viewJsonValue: JSON.stringify(item)
    });
    if (res && res.response.code === FlexResponseCode.OK) {
      window.scrollTo(0, 0);
      pageNo.value = 0;
      await requestTrainHistoryList(true);
    }
  }
};

onMounted(async () => {
  isLast.value = false;
  if (getInqrMonth.value) date.value = getInqrMonth.value;
  await requestTrainHistoryList(true);
});
</script>
