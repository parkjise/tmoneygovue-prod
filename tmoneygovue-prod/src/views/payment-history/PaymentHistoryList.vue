<template>
  <sub-header title="결제내역" />
  <main id="main" class="main det">
    <div class="container no_padding payment">
      <div class="pay_area">
        <uu-tabs own-size-tab @selected="handleTabChange" :tabIndex="currentTab" focused>
          <uu-tab v-for="(tab, index) in categories" :key="index" :title="tab.text" :isFocus="false">
            <!-- [240520] 월단위 추가 -->
            <div class="fixed_area">
              <p class="notice">
                <uu-ic size="16" name="exclamation_gray070" />
                {{ t('paymentHistory.det_014_001_008') }}
              </p>
              <div class="date">
                <uu-button :id="`prevMonth${index}`" :disabled="disabledLeft" :aria-disabled="disabledLeft" aria-label="이전달 이동" @click="handleDate('L', index)">
                  <uu-ic size="24" name="navi_right" direction="down" />
                </uu-button>
               <span 
                    :aria-label="
                      (disabledRight 
                        ? '다음 달로 이동할 수 없습니다. ' 
                        : disabledLeft 
                          ? '이전 달로 이동할 수 없습니다. ' 
                          : '') + formatA11yDateTime(`${date.slice(0, 4) + date.slice(-2)}`)
                    " 
                    role="text" 
                    :id="`currentMonth${index}`"
                    tabindex="0">

                      <span aria-hidden="true">{{
                  date.slice(0, 4) + '.' + date.slice(-2)
                }}</span></span>
                <uu-button :id="`nextMonth${index}`"  :disabled="disabledRight" :aria-disabled="disabledRight" aria-label="다음달 이동" @click="handleDate('R',index)">
                  <uu-ic size="24" name="navi_right" />
                </uu-button>
              </div>
            </div>
            <!-- 결제내역 목록 -->
            <PaymentHistoryListView
              v-if="paymentHistoryList.length !== 0"
              @updateList="updateList"
              @showDetail="showDetail"
              :items="paymentHistoryList"
              :isLast="isLast"
              :isLoading="isLoading"
              :pageNo="pageNo"
            />
            <!--// 결제내역 목록 -->
            <div v-else>
              <div class="no_data">
                <uu-ic size="48" name="exclamation" />
                <p>결제내역이 없습니다.</p>
              </div>
            </div>
          </uu-tab>
        </uu-tabs>

        <!-- 공공자전거 결제 상세 정보 -->
        <BikePaymentHistoryDetail
          v-if="isBikeShow"
          :isShow="isBikeShow"
          @isClose="isBikeShow = false"
          :pymSno="pymSno"
          :utlzSvcDvsCd="utlzSvcDvsCdDetail"
          :svcNm="svcNm"
        />
        <!-- 렌터카 결제 상세 정보 -->
        <RentCarPaymentHistoryDetail
          v-if="isRentShow"
          :isShow="isRentShow"
          @isClose="isRentShow = false"
          :pymSno="pymSno"
          :utlzSvcDvsCd="utlzSvcDvsCdDetail"
        />
        <!-- 여행 결제 상세 정보 -->
        <TravelPaymentHistoryDetailModal
          v-if="isTravelShow"
          :isShow="isTravelShow"
          @isClose="isTravelShow = false"
          :utlzSvcDvsCdParam="utlzSvcDvsCdDetail"
          :svcPymSnoParam="pymSno"
        />
        <!-- Go패스 결제 상세 정보 -->
        <GoPassPaymentHistoryDetail ref="goPassRef" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from 'vue';
import PaymentHistoryListView from '@/views/payment-history/component/PaymentHistoryListComponent.vue';
import type { PaymentHistoryModel, ReqPaymentHistoryListModel } from '@/service/payment/model/paymentHistoryModel';
import { usePaymentHistoryStore } from '@/service/payment/paymentHistoryModule';
import { addDate, formatA11yDateTime, formatDate, getToday, subtractDate } from '@/utils/dateUtils';
import { storeToRefs } from 'pinia';
import BikePaymentHistoryDetail from '@/views/payment-history/BikePaymentHistoryDetail.vue';
import UuTabs from '@/components/uu-components/UuTabs.vue';
import RentCarPaymentHistoryDetail from '@/views/payment-history/RentCarPaymentHistoryDetail.vue';
import { useRoute, useRouter } from 'vue-router';
import TravelPaymentHistoryDetailModal from '@/views/payment-history/TravelPaymentHistoryDetailModal.vue';
import { useI18n } from '@/composables/useI18n';
import GoPassPaymentHistoryDetail from './GoPassPaymentHistoryDetail.vue';

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const paymentHistoryStore = usePaymentHistoryStore();
const { getPaymentHistoryList, isLast } = storeToRefs(paymentHistoryStore);

const pageNo = ref<number>(0);
const isLoading = ref<boolean>(false);
const isBikeShow = ref<boolean>(false);
const isRentShow = ref<boolean>(false);
const isTravelShow = ref<boolean>(false);

const date = ref<string>(formatDate(getToday(), 'YYYYMM'));
const disabledLeft = ref<boolean>(false);
const disabledRight = ref<boolean>(true);

const utlzSvcDvsCd = ref<string>('A');
const utlzSvcDvsCdDetail = ref<string>('');

const svcNm = ref<string>('');
const pymSno = ref<string>('');
const currentTab = ref<number>(0);

const goPassRef = ref();
const statusMessage = ref('');

const paymentHistoryList = computed(() => {
  window.scrollTo({
    top: 0,
    behavior: 'instant'
  });
  return getPaymentHistoryList.value;
});

/**
 * 결제내역 목록 조회
 * @param tabChange
 */
async function requestPaymentHistoryList(tabChange: boolean) {
  if (!isLoading.value) {
    isLoading.value = true;
    pageNo.value++;

    await paymentHistoryStore.actionGetPaymentHistoryList(tabChange, {
      pageNo: pageNo.value.toString(),
      utlzSvcDvsCd: utlzSvcDvsCd.value,
      inqrMonth: date.value
    } as ReqPaymentHistoryListModel);

    isLoading.value = false;
  }
}

/**
 * 목록 추가 조회
 */
const updateList = () => {
  requestPaymentHistoryList(false);
};

/**
 * 탭 변경 시 이벤트
 * @param tab
 */
const handleTabChange = (tab: number) => {
  if (categories[tab].value) {
    currentTab.value = tab;
    const code = categories[tab].code;
    if (code) {
      router.replace({ query: { category: code } });
    } else {
      router.replace({ query: {} });
    }
    date.value = formatDate(getToday(), 'YYYYMM');
    setDisabled(date.value, '');
    utlzSvcDvsCd.value = categories[tab].value;
    pageNo.value = 0;
    isLast.value = false;
    requestPaymentHistoryList(true);
  }
};

/**
 * 월 달력 변경 시 이벤트
 * @param month
 */
function handleDate(month: string, index: number) {
  let changeDate = date.value;

  if (month === 'L' && !disabledLeft.value) {
    changeDate = formatDate(subtractDate(date.value, 1, 'month'), 'YYYYMM');
  } else if (month === 'R' && !disabledRight.value) {
    changeDate = formatDate(addDate(date.value, 1, 'month'), 'YYYYMM');
  }
  
  setDisabled(changeDate, index?.toString());

  if (date.value !== changeDate) {
    date.value = changeDate;
  }
  isLast.value = false;
  pageNo.value = 0;
  requestPaymentHistoryList(true);
}

/**
 * 최대/최소값일 경우 버튼 비 활성화 이벤트
 * @param changeDate
 */
function setDisabled(changeDate: string, index: string) {
  const min = formatDate(subtractDate(getToday(), 11, 'month'), 'YYYYMM');
  const max = formatDate(getToday(), 'YYYYMM');
  if (changeDate <= min) {
    disabledLeft.value = true;
    disabledRight.value = false;
    nextTick(() => {
      // 포커스 복구
      const currentId = document.getElementById("currentMonth"+index);
      if(currentId) {
        currentId.focus({ preventScroll: true })
        statusMessage.value = '첫 번째 달입니다.';
      }
    });
  } else if (changeDate >= max) {
    disabledLeft.value = false;
    disabledRight.value = true;

    nextTick(() => {
      // 포커스 복구
      const currentId = document.getElementById("currentMonth"+index);
      if(currentId) {
        currentId.focus({ preventScroll: true })
        statusMessage.value = '마지막 달입니다.';
      }
    });
  } else {
    disabledLeft.value = false;
    disabledRight.value = false;
    statusMessage.value = '';
  }
}

/**
 * SPA 결제 상세 이동
 * @param item
 */
const showDetail = (item: PaymentHistoryModel) => {
  pymSno.value = item.ognPymKeyVal;
  utlzSvcDvsCdDetail.value = item.utlzSvcDvsCd;
  svcNm.value = item.svcNm;
  if (['T', 'D', 'E', 'I'].includes(item.utlzSvcDvsCd)) {
    // 공공자전거
    isBikeShow.value = true;
  } else if (item.utlzSvcDvsCd === 'L') {
    // 렌터카
    isRentShow.value = true;
  } else if (item.utlzSvcDvsCd === 'FG') {
    // 여행
    isTravelShow.value = true;
  } else if (item.utlzSvcDvsCd === 'S') {
    // 정기상품권
    goPassRef.value.open(item.ognPymKeyVal);
  }
};

const categories = reactive([
  {
    text: '전체',
    code: '',
    value: 'A'
  },
  {
    text: '고속·시외',
    code: 'bus',
    value: 'B'
  },
  {
    text: '택시',
    code: 'taxi',
    value: 'O'
  },
  {
    text: '공공자전거',
    code: 'bike',
    value: 'T'
  },
  {
    text: '자전거/킥보드',
    code: 'kickboard',
    value: 'X'
  },
  {
    text: '기차',
    code: 'train',
    value: 'R'
  },
  {
    text: '항공',
    code: 'airplane',
    value: 'U'
  },
  {
    text: '렌터카',
    code: 'rentercar',
    value: 'L'
  },
  {
    text: '여행',
    code: 'travel',
    value: 'FG'
  }
]);

onMounted(() => {
  const category = route.query.category as string;
  const moappMbrsSno = route.query.moappMbrsSno as string;
  const passPrchSno = route.query.passPrchSno as string;

  if (moappMbrsSno && passPrchSno) {
    // get방식으로 진입 시 결제상세 모달 오픈
    goPassRef.value.open(passPrchSno, moappMbrsSno);
  } else if (category) {
    handleTabChange(categories.findIndex((c) => c.code === category));
  }

  isLast.value = false;
  requestPaymentHistoryList(true);
});
</script>
