<template>
  <div class="setting_area">
    <HistoryMonthCalendar @updateCalendar="handleCalendar" />
  </div>
  <div class="usage_list_area">
    <template v-if="isLinked && airplaneHistoryList.length > 0">
      <ul class="usage_list">
        <li v-for="(item, index) in airplaneHistoryList" :key="index">
          <button type="button" class="usage_btn" @click="goDetail(item)">
            <div class="usage_info">
              <p class="title">
                <span class="ic_area">
                  <object :data="imageBasePath + '/assets/images/ic/ic_vehicle_airport.svg'" />
                </span>
                {{ item.deptAirportName }} - {{ item.arrAirportName }}
              </p>
              <p class="status">
                {{ item.jrnySttName }}
              </p>
            </div>
            <ul class="normal_list">
              <li>
                <div class="list_tit">출발일시</div>
                <div class="list_txt num" :aria-label="formatA11yDateTime(item.departureDate)">
                  {{ setDate(item.departureDate) }}
                </div>
              </li>
              <li v-if="item.jrnySttName === '예약취소' || item.jrnySttName === '취소완료'">
                <div class="list_tit">취소일시</div>
                <div class="list_txt num" :aria-label="formatA11yDateTime(item.cancDtm)">
                  {{ setDate(item.cancDtm) }}
                </div>
              </li>
              <li v-else>
                <div class="list_tit">결제일시</div>
                <div class="list_txt num" :aria-label="formatA11yDateTime(item.pymDtm)">{{ setDate(item.pymDtm) }}</div>
              </li>
              <li>
                <div class="list_tit">등급</div>
                <div class="list_txt num">{{ setPerson(item) }}</div>
              </li>
              <li>
                <div class="list_tit">좌석등급</div>
                <div class="list_txt num">{{ item.cabinClass }}</div>
              </li>
            </ul>
          </button>
        </li>
      </ul>
    </template>
    <template v-else>
      <NoServiceComponent category="airplane" />
    </template>
  </div>
</template>

<script setup lang="ts">
// 응답에 대한 인터페이스 정의
import { computed, onMounted, ref } from 'vue';
import { formatDate, getToday } from '@/utils/dateUtils';
import { useIntersectionObserver } from '@vueuse/core';
import type { AirplaneHistoryModel, ReqAirplaneHistoryModel } from '@/service/usage-history/model/airplaneModel';
import { useUsageHistoryStore } from '@/service/usage-history/usageHistoryModule';
import { storeToRefs } from 'pinia';
import NoServiceComponent from '@/views/usage-history/component/NoServiceComponent.vue';
import HistoryMonthCalendar from '@/views/usage-history/component/HistoryMonthCalendar.vue';
import { getAppBridge } from '@/utils';
import { FlexResponseCode } from '@/utils/hybrid/type';
import { formatA11yDateTime } from '@/utils/dateUtils';
import { linkedServiceYN } from '@/service/usage-history/usageHistoryUtils';
import { serviceCode } from '@/utils/constants/usageHistoryConstants';

const imageBasePath = import.meta.env.VITE_IMAGE_BASE_PATH;
const pageNo = ref<number>(0);
const isLoading = ref<boolean>(false);
const loadMoreRef = ref(null);
const date = ref<string>(formatDate(getToday(), 'YYYYMM'));

const usageHistoryStore = useUsageHistoryStore();
const { getAirplaneHistoryList, isLast, getInqrMonth } = storeToRefs(usageHistoryStore);

const airplaneHistoryList = computed(() => {
  return getAirplaneHistoryList.value;
});

const isLinked = computed(() => {
  return linkedServiceYN(serviceCode.airplane);
});

/**
 * 항공 이용 내역 조회
 * @param isNew
 */
async function requestAirplaneHistoryList(isNew: boolean) {
  if (!isLinked.value) return;
  if (!isLoading.value && !isLast.value) {
    isLoading.value = true;
    pageNo.value++;

    const resResult = await usageHistoryStore.actionAirplaneHistoryList(isNew, {
      pageNo: pageNo.value.toString(),
      inqrMonth: date.value
    } as ReqAirplaneHistoryModel);

    isLoading.value = false;

    if (resResult.jrnyList.length < 1) {
      airplaneListObserver.stop();
    } else {
      return resResult;
    }
  }
}

const handleCalendar = (param: string) => {
  isLast.value = false;
  date.value = param;
  pageNo.value = 0;
  requestAirplaneHistoryList(true);
};

let airplaneListObserver = useIntersectionObserver(
  loadMoreRef,
  ([{ isIntersecting }]) => {
    if (!isIntersecting || isLoading.value || isLast.value) return;
    requestAirplaneHistoryList(false);
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
function setPerson(item: AirplaneHistoryModel) {
  let returnStr = '';

  if (item.adtCnt) {
    returnStr += '성인 ' + item.adtCnt;
  }
  if (item.chdCnt) {
    returnStr += (returnStr.length > 0 ? ', 소아 ' : '소아 ') + item.chdCnt;
  }
  if (item.infCnt) {
    returnStr += (returnStr.length > 0 ? ', 유아 ' : '유아 ') + item.infCnt;
  }
  return returnStr;
}

const goDetail = async (item: AirplaneHistoryModel) => {
  const appBridge = await getAppBridge();

  if (item) {
    const res = await appBridge.openView({
      url: 'history/airplane/detail',
      viewType: 'native',
      viewJsonValue: JSON.stringify(item)
    });
    if (res && res.response.code === FlexResponseCode.OK) {
      window.scrollTo(0, 0);
      pageNo.value = 0;
      await requestAirplaneHistoryList(true);
    }
  }
};

onMounted(async () => {
  isLast.value = false;
  if (getInqrMonth.value) date.value = getInqrMonth.value;
  await requestAirplaneHistoryList(true);
});
</script>
