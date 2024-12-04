<template>
  <sub-header title="GO마일리지 내역" />
  <!-- main -->
  <main id="main" class="main mor">
    <div class="container no_padding">
      <div class="go_mileage">
        <round-box hide-title>
          <div
            class="total_mileage"
            :aria-label="`GO마일리지 ${formatAmount(getMileageHistoryList.mbrsMlgAmt)}마일리지`"
            tabindex="0"
          >
            <p class="text" aria-hidden="true">
              <uu-ic size="20" name="mileage" />
              GO마일리지
            </p>
            <p class="mileage" aria-hidden="true">
              <span class="strong">{{ formatAmount(getMileageHistoryList.mbrsMlgAmt) }}</span>
              <span>M</span>
            </p>
          </div>
          <ul class="flex_area">
            <li class="this_month" aria-labelledby="thisMonth" tabindex="0">
              <p id="thisMonth" aria-hidden="true" class="sr_only">
                {{ getMonth(getToday()) }}월 소멸예정 {{ formatAmount(getMileageHistoryList.monExpiSchdAmt) }}마일리지
              </p>
              <p aria-hidden="true">{{ getMonth(getToday()) }}월 소멸예정</p>
              <p aria-hidden="true">
                {{ formatAmount(getMileageHistoryList.monExpiSchdAmt) }}
                <span>M</span>
              </p>
            </li>
            <li
              :aria-label="`${getMonth(addDate(getToday(), 1, 'month'))}월 소멸예정 ${formatAmount(getMileageHistoryList.nxtMonExpiSchdAmt)}마일리지`"
              tabindex="0"
            >
              <p aria-hidden="true">{{ getMonth(addDate(getToday(), 1, 'month')) }}월 소멸예정</p>
              <p aria-hidden="true">
                {{ formatAmount(getMileageHistoryList.nxtMonExpiSchdAmt) }}
                <span>M</span>
              </p>
            </li>
            <li
              :aria-label="`${getMonth(addDate(getToday(), 2, 'month'))}월 소멸예정 ${formatAmount(getMileageHistoryList.aftNxtMonExpiSchdAmt)}마일리지`"
              tabindex="0"
            >
              <span aria-hidden="true">{{ getMonth(addDate(getToday(), 2, 'month')) }}월 소멸예정</span>
              <span aria-hidden="true">
                {{ formatAmount(getMileageHistoryList.aftNxtMonExpiSchdAmt) }}
                <span>M</span>
              </span>
            </li>
          </ul>
          <div class="use_mileage">
            <div class="item">
              <p class="text">
                적립예정
                <uu-tooltip
                  content="마일리지는 교통수단 결제 후 익일에 적립됩니다. <br>적립 한도에 따라 예정 마일리지는 변동될 수있습니다."
                >
                </uu-tooltip>
              </p>
              <p
                class="mileage"
                :aria-label="`${formatAmount(getMileageHistoryList.mlgAcmtSchdAmt)}마일리지`"
                tabindex="0"
              >
                <span class="strong" aria-hidden="true">{{ formatAmount(getMileageHistoryList.mlgAcmtSchdAmt) }}</span>
                <span aria-hidden="true">M</span>
              </p>
            </div>
            <div class="item">
              <p class="text">이번 달 사용</p>
              <p
                class="mileage orange"
                :aria-label="`${formatAmount(getMileageHistoryList.mlgUseAmt)}마일리지`"
                tabindex="0"
              >
                <span class="strong" aria-hidden="true">{{ formatAmount(getMileageHistoryList.mlgUseAmt) }}</span>
                <span aria-hidden="true">M</span>
              </p>
            </div>
          </div>
        </round-box>
        <div class="sticky_area" :class="[{ noData: mileageHistoryList.length == 0 }]">
          <div class="sticky" :class="[{ noData: mileageHistoryList.length == 0 }]">
            <div class="date">
              <uu-button @click="clickPreviousMonth" aria-label="이전달 이동">
                <uu-ic size="24" name="navi_right" direction="down" />
              </uu-button>
              <!-- <span>{{ selectedDate }}</span> -->
              <span :aria-label="formatA11yDateTime(formatDate(getToday(), 'YYYYMM'))" role="text">{{
                selectedDate
              }}</span>
              <uu-button
                aria-label="다음달 이동"
                :disabled="formatDate(getToday(), 'YYYYMM') === formatDate(getCurrentDate, 'YYYYMM') ? true : false"
                @click="clickNextMonth"
              >
                <uu-ic size="24" name="navi_right" />
              </uu-button>
            </div>
            <div class="division">
              <uu-button @click="showSortBottom = true">
                {{ sort }}
                <uu-ic size="20" name="arrow_gray" />
              </uu-button>
            </div>
          </div>
          <ul class="accumulate_list" v-if="mileageHistoryList.length != 0 && isShow">
            <li v-for="(item, index) in mileageHistoryList" :key="index">
              <p :class="`status ${statusClass(item.type)}`">{{ item.type }}</p>
              <div class="info">
                <p class="info_title">{{ item.mlgUtlzNm }}</p>
                <p class="info_time" :aria-label="formatA11yDateTime(item.mlgUtlzDtm)" role="text">
                  {{ formatDate(item.mlgUtlzDtm, 'YYYY.MM.DD HH:mm') }}
                </p>
              </div>
              <p
                :class="`point ${statusClass(item.type)}`"
                :aria-label="`${formatAmount(item.mlgAmt)}마일리지`"
                tabindex="0"
              >
                <span class="strong" aria-hidden="true">{{ formatAmount(item.mlgAmt) }}</span>
                <span aria-hidden="true">M</span>
              </p>
            </li>
            <li ref="loadMoreRef" v-if="!isLast"></li>
          </ul>

          <div class="no_data" v-if="mileageHistoryList.length == 0 && isShow">
            <uu-ic size="48" name="exclamation" />
            <p>적립/사용된 GO마일리지가 없습니다.</p>
          </div>
        </div>

        <div class="btn_area">
          <uu-button @click="onClickTermsBottom">
            <img
              src="/assets/images/button/button_gomilige_event.png"
              alt="다양한 참여를 통해 GO마일리지를 무료로 적립해보세요"
            />
          </uu-button>
        </div>
      </div>
    </div>
  </main>

  <!-- <main id="main" class="main mor" v-else>
    <div class="container no_padding">
      <div class="go_mileage">
        <round-box hide-title>
          <div class="total_mileage">
            <p class="text">
              <uu-ic size="20" name="mileage" />
              GO마일리지
            </p>
            <p class="mileage">
              <strong>{{ getMileageHistoryList.mbrsMlgAmt }}</strong
              >M
            </p>
          </div>
          <ul class="ticket_notice">
            <li>
              <uu-ic size="16" name="exclamation_gray070" />
              최초 적립 월로부터 12개월 뒤 소멸됩니다.
            </li>
            <li>
              <uu-ic size="16" name="exclamation_gray070" />
              GO마일리지는 월 최대 5,000M까지 적립 가능합니다.
            </li>
          </ul>
          <uu-button btn-style="line" class="btn_notice" @click="moveGoMileageGuide">
            GO마일리지 적립/사용 안내
            <uu-ic size="20" name="arrow" direction="left" />
          </uu-button>
        </round-box>
        <div class="no_data">
          <uu-ic size="48" name="exclamation" />
          <p>적립/사용된 GO마일리지가 없습니다.</p>
        </div>
      </div>
    </div>
  </main> -->
  <!-- // main -->
  <!-- 조회 기준 선택-->
  <mileage-select-tab :is-show="showSortBottom" @ok="selectedOption" @close="showSortBottom = false" />
  <!-- 마일리지 적립 약관동의 팝업-->
  <mileage-terms-popup :isShowTerm="isShowTerm" @close="isShowTerm = false" @ok="registerTermAgreeYN" />
</template>

<script setup lang="ts">
import { useGoMileageStore } from '@/service/mileage/goMileageModule';
import { storeToRefs } from 'pinia';
import { onMounted, computed, ref } from 'vue';
import MileageTermsPopup from './components/MileageTermsPopup.vue';
import MileageSelectTab from './components/MileageSelectTab.vue';
import { addDate, formatDate, getMonth, getToday, subtractDate, formatA11yDateTime } from '@/utils/dateUtils';
import type { reqSpfStplAgreeInfo } from '@/service/terms/model/requestModel';
import { useRouter } from 'vue-router';
import { encodeUriRouterPath } from '@/utils/linkUtils';
import { useAuthStore } from '@/service/auth/authModule';
import { formatAmount } from '@/utils/amountUtils';
import { useIntersectionObserver } from '@vueuse/core';
import { AdbrixEvtId } from '@/utils/hybrid/type';
import { sendAdbrix } from '@/utils/sendAdbrixUtil';

const router = useRouter();
const authStore = useAuthStore();
const milegeStore = useGoMileageStore();
const { getMileageHistoryList, getSpfStplInfo, isLast } = storeToRefs(milegeStore);

const showSortBottom = ref(false);
const isShowTerm = ref(false);
const loadMoreRef = ref(null);

const getCurrentDate = ref(getToday()); // 오늘 날짜
const selectedDate = ref(formatDate(getToday(), 'YYYY년 MM월'));
const sort = ref('전체');
const sortValue = ref('00');
const pageNo = ref(1);
const isShow = ref(false);
const mileageHistoryList = computed(() =>
  getMileageHistoryList.value.mlgList.map((item) => ({
    ...item,
    type: setOption(item.mlgUseTypCd)
  }))
);

onMounted(() => mileageHistoryListApi(false));

/**
 * @description GO마일리지 내역 API
 */
const mileageHistoryListApi = async (isMore: boolean) => {
  if (!isMore) window.scrollTo({ top: 0 });
  pageNo.value = isMore ? pageNo.value + 1 : 1;

  const param = {
    pageNo: pageNo.value,
    inqrMon: formatDate(getCurrentDate.value, 'YYYYMM'),
    mlgDvsCd: sortValue.value ? sortValue.value : '00'
  };
  await milegeStore.requestMileageHistoryList(param, isMore);
  isShow.value = true;
};

/**
 * @description GO마일리지 내역 스크롤 더보기 옵저버
 */
let mileageHistoryListObserver = useIntersectionObserver(
  loadMoreRef,
  ([{ isIntersecting }]) => {
    if (!isIntersecting || isLast.value) return;
    mileageHistoryListApi(true);
  },
  { threshold: 0.5 }
);

// 저번달
const clickPreviousMonth = () => {
  const previousMonth = subtractDate(getCurrentDate.value, 1, 'month');
  selectedDate.value = formatDate(previousMonth, 'YYYY년 MM월');
  getCurrentDate.value = previousMonth;
  mileageHistoryListApi(false);
};

// 다음달
const clickNextMonth = () => {
  const nextMonth = addDate(getCurrentDate.value, 1, 'month');
  selectedDate.value = formatDate(nextMonth, 'YYYY년 MM월');
  getCurrentDate.value = nextMonth;
  mileageHistoryListApi(false);
};

const setOption = (selectedOption: string) => {
  switch (selectedOption) {
    case '00':
      return '전체';
    case '01':
      return '적립';
    case '02':
      return '사용';
    case '03':
      return '취소';
    case '04':
      return '소멸';
    default:
      return '전체';
  }
};

// 선택한 조회 기준
const selectedOption = (selectedOption: string) => {
  showSortBottom.value = false;
  sort.value = setOption(selectedOption);
  sortValue.value = selectedOption;
  mileageHistoryListApi(false);
};

const statusClass = (selectedOption?: string) => {
  switch (selectedOption) {
    case '적립':
      return '';
    case '사용':
      return 'use';
    case '취소':
      return 'cancel';
    case '소멸':
      return 'passing';
  }
};

// const moveGoMileageGuide = () => {
//   // 고객지원 -> 티머니 GO 이용가이드 -> GO마일리지 탭으로 이동
//   router.push({ path: ' /customer-support/user-guide' });
// };

// 약관동의
const onClickTermsBottom = async () => {
  sendAdbrix(AdbrixEvtId.tapMlgOfferwall);
  await milegeStore.requestSpfStplAgrmYN('A');
  if (getSpfStplInfo.value.every((item) => item.stplAgrmYn === 'Y')) {
    // GO마일리지 무료적립 이벤트 화면으로 이동
    movePage('tmoneytia://mileage/center');
  } else {
    // 약관동의 팝업 open
    isShowTerm.value = true;
  }
};

// 약관동의 > 동의버튼
const registerTermAgreeYN = async () => {
  isShowTerm.value = false;
  // 약관동의
  let stplList = [] as reqSpfStplAgreeInfo[];

  getSpfStplInfo.value.forEach((item) => {
    stplList.push({ stplAgrmYn: 'Y', stplSno: item.stplSno });
  });

  const param = {
    moappMbrsSno: authStore.getAuthInfo.moappMbrsSno || '',
    stplList
  };
  const res = await milegeStore.requestRegisterTermAgreeYN(param);
  if (res?.rspCd === '0000') {
    // GO마일리지 무료적립 이벤트 화면으로 이동
    movePage('tmoneytia://mileage/center');
  }
};

const movePage = (link: string) => {
  router.push({ path: encodeUriRouterPath(link) });
};
</script>
