<template>
  <div class="setting_area">
    <HistoryMonthCalendar @updateCalendar="handleCalendar" />
  </div>
  <div class="usage_list_area">
    <template v-if="isLinked && taxiHistoryList.length > 0">
      <ul class="usage_list">
        <li v-for="(item, index) in taxiHistoryList" :key="index">
          <div class="usage_btn" @click="goDetail(item)" tabindex="0">
            <div class="usage_info">
              <p class="title num">
                <span class="ic_area">
                  <object :data="imageBasePath + '/assets/images/ic/ic_vehicle_taxi.svg'" />
                </span>
                <span :aria-label="formatA11yDateTime(item.regdate)" role="text">
                  {{ formattedDate(item.regdate) }}
                </span>
              </p>
              <!-- <button type="button" @click.stop="bookmarkAction(index, item.taxiType, item.callKey)">
                <UuIc v-if="item.isMyCall === 'Y'" name="bookmark_active" size="20" />
                <UuIc v-else name="bookmark" size="20" />
              </button> -->
              <div
                role="button"
                tabindex="0"
                :aria-label="item.isMyCall === 'Y' ? '북마크 추가' : '북마크 해제'"
                :aria-pressed="item.isMyCall === 'Y' ? 'true' : 'false'"
                @click.stop="bookmarkAction(index, item.taxiType, item.callKey)"
              >
                <uu-ic v-if="item.isMyCall === 'Y'" name="bookmark_active" size="20" />
                <uu-ic v-else name="bookmark" size="20" />
              </div>
            </div>
            <ul class="normal_list">
              <li v-if="item.isForOtherRider">
                <div class="list_tit">탑승자</div>
                <div class="list_txt">{{ setName(item.riderName, item.riderMbphNo) }}님</div>
              </li>
              <li>
                <div class="list_tit">출발</div>
                <div class="list_txt">
                  {{ item.startPoiName ? item.startPoiName : item.start }}
                  <address v-if="item.start !== item.startAddress">{{ item.startAddress }}</address>
                </div>
              </li>
              <li>
                <div class="list_tit">도착</div>
                <div class="list_txt">
                  {{ item.endPoiName ? item.endPoiName : item.end }}
                  <address v-if="item.end !== item.endAddress">{{ item.endAddress }}</address>
                </div>
              </li>
              <li>
                <div class="list_tit">택시정보</div>
                <div class="list_txt split">
                  <span>{{ item.taxiName }}</span>
                  <span v-if="item.showPhoneNumber" class="taxi_info">
                    {{ item.carNumber }}
                    <uu-ic
                      name="phone"
                      size="16"
                      @click.stop="callToDriver(item.phoneNumber)"
                      tabindex="0"
                      aria-label="전화 걸기"
                      role="button"
                      :aria-hidden="false"
                    />
                  </span>
                </div>
              </li>
              <li>
                <div class="list_tit">결제정보</div>
                <div class="list_txt">{{ item.payTypeString }}</div>
              </li>
            </ul>
            <div class="btn_area" v-if="item.driverEvaluationDisplay">
              <uu-button
                label="평가하기"
                tabindex="0"
                btn-style="line"
                size="lg"
                @click.stop="openEvaluate(index, item)"
              />
            </div>
          </div>
        </li>
        <li ref="loadMoreRef" class="loading"></li>
      </ul>
    </template>
    <template v-else>
      <NoServiceComponent category="taxi" />
    </template>
    <common-modal v-model="isPopShow" type="confirm" hide-overlay @close="isPopShow = false" @ok="getPhoneNumber">
      <template #modal_header><p tabindex="0">기사님께 전화연결을 하시겠습니까?</p></template>
      <template #modal_body><p tabindex="0">기사님께 연락시에는 연락처가 노출될 수 있습니다.</p></template>
      <template #modal_footer="btnActions">
        <uu-button btn-style="line" label="아니요" @click="btnActions.close()" />
        <uu-button btn-color="primary" label="네,연결합니다." @click="btnActions.ok" />
      </template>
    </common-modal>
  </div>
</template>

<script setup lang="ts">
import type { ReqTaxiHistoryModel, TaxiHistoryModel } from '@/service/usage-history/model/taxiHistoryModel';

import { computed, onMounted, ref } from 'vue';

import { formatDate, getToday } from '@/utils/dateUtils';
import { OndataxiResultCodeEnum } from '@/utils/http/axios/enum/httpEnum';
import { useUsageHistoryStore } from '@/service/usage-history/usageHistoryModule';
import { useIntersectionObserver } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import type { ReqMyCallModel } from '@/service/usage-history/model/taxiModel';
import { getAppBridge } from '@/utils';
import NoServiceComponent from '@/views/usage-history/component/NoServiceComponent.vue';
import HistoryMonthCalendar from '@/views/usage-history/component/HistoryMonthCalendar.vue';
import CommonModal from '@/views/common/components/CommonModal.vue';
import { FlexResponseCode } from '@/utils/hybrid/type';
import { formatA11yDateTime } from '@/utils/dateUtils';
import { useAuthStore } from '@/service/auth/authModule';
import { linkedServiceYN } from '@/service/usage-history/usageHistoryUtils';
import { serviceCode } from '@/utils/constants/usageHistoryConstants';

const imageBasePath = import.meta.env.VITE_IMAGE_BASE_PATH;
const isPopShow = ref<boolean>(false);
const pageNo = ref<number>(0);
const isLoading = ref<boolean>(false);
const loadMoreRef = ref(null);
const date = ref<string>(formatDate(getToday(), 'YYYYMM'));
const phoneNumber = ref<string>('');

const usageHistoryStore = useUsageHistoryStore();
const { getTaxiHistory, isLast, getInqrMonth } = storeToRefs(usageHistoryStore);

const taxiHistoryList = computed(() => {
  return getTaxiHistory.value;
});

const isLinked = computed(() => {
  return linkedServiceYN(serviceCode.taxi);
});

/**
 * 택시 이용내역 조회
 * @param isNew
 */
async function requestTaxiHistoryList(isNew: boolean) {
  if (!isLinked.value) return;
  if (!isLoading.value && !isLast.value) {
    isLoading.value = true;

    if (isNew) {
      pageNo.value = 0;
    }

    const resResult = await usageHistoryStore.actionHttpTaxiHistoryList(isNew, {
      currentPage: pageNo.value,
      //As-Is 기준 20개
      pageCount: '20',
      inqrMonth: date.value
    } as ReqTaxiHistoryModel);

    //택시는 페이지 0부터 시작이라고 기재되어있으나 테스트 필요
    pageNo.value++;
    isLoading.value = false;

    if (resResult.callHistoryInfoList && resResult.callHistoryInfoList.length < 1) {
      taxiListObserver.stop();
    } else {
      return resResult;
    }
  }
}

const handleCalendar = (param: string) => {
  isLast.value = false;
  date.value = param;
  pageNo.value = 0;
  requestTaxiHistoryList(true);
};

let taxiListObserver = useIntersectionObserver(
  loadMoreRef,
  ([{ isIntersecting }]) => {
    if (!isIntersecting || isLoading.value || isLast.value) return;
    requestTaxiHistoryList(false);
  },
  { threshold: 0.5 }
);

/**
 * 택시 즐겨찾기 추가
 * @param index
 * @param taxiType
 * @param callKey
 */
async function requestApiHttpAddMyCall(index: number, taxiType: string, callKey: string) {
  //API 호출
  const resResult = await usageHistoryStore.actionHttpAddMyCall(
    {
      taxiType: taxiType,
      callKey: callKey
    } as ReqMyCallModel,
    index
  );
  if (resResult.err_code === OndataxiResultCodeEnum.SUCCESS) {
    const appBridge = await getAppBridge();
    appBridge.showToast({ message: '택시 즐겨찾기에 추가되었습니다.' });
  }
}

/**
 * 택시 즐겨찾기 삭제
 * @param index
 * @param taxiType
 * @param callKey
 */
async function requestApiHttpDeleteMyCall(index: number, taxiType: string, callKey: string) {
  //API 호출
  const resResult = await usageHistoryStore.actionHttpDeleteMyCall(
    {
      taxiType: taxiType,
      associatedCallKey: callKey
    } as ReqMyCallModel,
    index
  );
  if (resResult.err_code === OndataxiResultCodeEnum.SUCCESS) {
    const appBridge = await getAppBridge();
    appBridge.showToast({ message: '택시 즐겨찾기에서 삭제되었습니다.' });
  }
}

/**
 * 즐겨찾기 버튼 이벤트
 * @param index
 * @param taxiType
 * @param callKey
 */
const bookmarkAction = (index: number, taxiType: string, callKey: string) => {
  if (taxiHistoryList.value[index].isMyCall === 'N') {
    requestApiHttpAddMyCall(index, taxiType, callKey);
  } else {
    requestApiHttpDeleteMyCall(index, taxiType, callKey);
  }
};

/**
 * 날짜 포맷
 * @param date
 */
function formattedDate(date: string) {
  return date.slice(0, 4) + '.' + date.slice(5, 7) + '.' + date.slice(8, 10);
}

/**
 * 탑승자명 포맷
 * @param name
 * @param phone
 */
function setName(name: string, phone: string) {
  if (name === phone) {
    if (phone.startsWith('02')) {
      return phone.replaceAll('(\\d{2})(\\d{3,4})(\\d{4})', '$1-$2-$3');
    } else {
      return phone.replaceAll('(\\d{3})(\\d{3,4})(\\d{4})', '$1-$2-$3');
    }
  } else {
    return name;
  }
}

const callToDriver = (num: string) => {
  isPopShow.value = true;
  phoneNumber.value = num;
};

const getPhoneNumber = () => {
  location.href = `tel:${phoneNumber.value}`;
  isPopShow.value = false;
};

const { authInfo } = storeToRefs(useAuthStore());
const goDetail = async (item: TaxiHistoryModel) => {
  const appBridge = await getAppBridge();

  // AOS일 때 serialId 체크
  let callKey = item.callKey;
  if (authInfo.value.osKnd === 'A') {
    callKey = item.serialId ? item.serialId : item.callKey;
  }

  if (item) {
    await appBridge.openView({
      url: 'history/taxi/detail',
      viewType: 'native',
      viewJsonValue: JSON.stringify({ callId: callKey, taxiType: item.taxiType })
    });
  }
};

/**
 * 평가하기
 * @param index
 * @param item
 */
const openEvaluate = async (index: number, item: TaxiHistoryModel) => {
  const appBridge = await getAppBridge();

  if (item) {
    const evaluate = await appBridge.openView({
      url: 'history/taxi/evaluation',
      viewType: 'native',
      viewJsonValue: JSON.stringify({ callId: item.callKey, taxiType: item.taxiType })
    });

    console.log(evaluate);

    if (evaluate && evaluate.response.code === FlexResponseCode.OK) {
      window.scrollTo(0, 0);
      pageNo.value = 0;
      await requestTaxiHistoryList(true);
    }
  }
};

onMounted(async () => {
  isLast.value = false;
  if (getInqrMonth.value) date.value = getInqrMonth.value;
  await requestTaxiHistoryList(true);
});
</script>
