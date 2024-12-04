<template>
  <div class="setting_area">
    <HistoryMonthCalendar @updateCalendar="handleCalendar" />
  </div>
  <div class="usage_list_area">
    <template v-if="isLinked && carRentHistoryList.length > 0">
      <ul class="usage_list">
        <li v-for="(item, index) in carRentHistoryList" :key="index">
          <button type="button" class="usage_btn" @click="goDetail(item)">
            <div class="usage_info">
              <p class="title">
                <span class="ic_area">
                  <object :data="imageBasePath + '/assets/images/ic/ic_vehicle_rentcar.svg'" />
                </span>
                {{ item.subMdlNm }}
              </p>
              <p class="status">
                {{ item.mrnpStaNm }}
              </p>
            </div>
            <ul class="normal_list">
              <li>
                <div class="list_tit">대여일시</div>
                <div class="list_txt num" :aria-label="formatA11yDateTime(item.pickupAt, '', true)" role="text">
                  {{ setDate(item.pickupAt) }}
                </div>
              </li>
              <li>
                <div class="list_tit">반납일시</div>
                <div class="list_txt num" :aria-label="formatA11yDateTime(item.dropoffAt, '', true)" role="text">
                  {{ setDate(item.dropoffAt) }}
                </div>
              </li>
              <li v-if="item.mrnpStaNm === '취소'">
                <div class="list_tit">취소일시</div>
                <div class="list_txt num" :aria-label="formatA11yDateTime(item.cancDtm, '', true)" role="text">
                  {{ setDate(item.cancDtm) }}
                </div>
              </li>
              <li v-else>
                <div class="list_tit">결제일시</div>
                <div class="list_txt num" :aria-label="formatA11yDateTime(item.pymDtm, '', true)" role="text">
                  {{ setDate(item.pymDtm) }}
                </div>
              </li>
              <li>
                <div class="list_tit">대여/반납 위치</div>
                <div class="list_txt num">
                  {{ !!item.pickupPoi ? item.pickupPoi : !!item.dropoffPoi ? item.dropoffPoi : '' }}
                </div>
              </li>
              <li>
                <div class="list_tit">담당업체</div>
                <div class="list_txt num">{{ item.rncrEntrNm }}</div>
              </li>
            </ul>
          </button>
        </li>
        <li v-if="!isLast" ref="loadMoreRef" class="loading"></li>
      </ul>
    </template>
    <template v-else>
      <NoServiceComponent category="rentCar" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useIntersectionObserver } from '@vueuse/core';
import { useUsageHistoryStore } from '@/service/usage-history/usageHistoryModule';
import { formatDate, getToday } from '@/utils/dateUtils';
import NoServiceComponent from '@/views/usage-history/component/NoServiceComponent.vue';
import HistoryMonthCalendar from '@/views/usage-history/component/HistoryMonthCalendar.vue';
import type {
  CarRentalHistoryModel,
  ReqCarRentalHistoryModel
} from '@/service/usage-history/model/carRentalHistoryModel';
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
const { getCarRentHistoryList, isLast, getInqrMonth } = storeToRefs(usageHistoryStore);

const carRentHistoryList = computed(() => {
  return getCarRentHistoryList.value;
});

const isLinked = computed(() => {
  return linkedServiceYN(serviceCode.rent);
});
/**
 * 렌트카 이용내역 조회
 * @param isNew
 */
async function requestCarRentHistoryList(isNew: boolean) {
  if (!isLinked.value) return;
  if (!isLoading.value && !isLast.value) {
    isLoading.value = true;

    if (isNew) {
      pageNo.value = 0;
    }
    pageNo.value++;

    const resResult = await usageHistoryStore.actionCarRentHistoryList(isNew, {
      pageNo: pageNo.value.toString(),
      inqrMonth: date.value
    } as ReqCarRentalHistoryModel);

    isLoading.value = false;

    if (resResult.resevList.length < 1) {
      carRentListObserver.stop();
    } else {
      return resResult;
    }
  }
}

const handleCalendar = (param: string) => {
  date.value = param;
  pageNo.value = 0;
  requestCarRentHistoryList(true);
};

let carRentListObserver = useIntersectionObserver(
  loadMoreRef,
  ([{ isIntersecting }]) => {
    if (!isIntersecting || isLoading.value || isLast.value) return;
    requestCarRentHistoryList(false);
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

const goDetail = async (item: CarRentalHistoryModel) => {
  const appBridge = await getAppBridge();

  if (item) {
    const res = await appBridge.openView({
      url: 'history/rentcar/detail',
      viewType: 'native',
      viewJsonValue: JSON.stringify(item)
    });
    if (res && res.response.code === FlexResponseCode.OK) {
      window.scrollTo(0, 0);
      await requestCarRentHistoryList(true);
    }
  }
};

onMounted(async () => {
  isLast.value = false;
  if (getInqrMonth.value) date.value = getInqrMonth.value;
  await requestCarRentHistoryList(true);
});
</script>
