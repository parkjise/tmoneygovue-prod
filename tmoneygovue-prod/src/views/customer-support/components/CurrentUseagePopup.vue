<template>
  <common-modal
    v-model="showPopup"
    type="full"
    title="자전거 최근 이용 내역"
    full-content
    hide-footer
    has-bg
    :isBack="false"
    @close="closeCallback"
  >
    <template #modal_body>
      <div class="bike_report_use" ref="scrollTarget">
        <!-- 데이터 있는 경우 -->
        <div class="use_list" v-if="bikeRentalHistoryList.length !== 0">
          <div
            class="use"
            v-for="(rental, index) in bikeRentalHistoryList"
            :key="index"
            @click="okCallback(rental.bcclNo, rental.utlzSvcDvsCd)"
          >
            <div class="num_area">
              <p class="date">
                <span class="img_area">
                  <img src="/assets/images/ic/ic_vehicle_bike.svg" alt="자전거 아이콘" />
                </span>
                <span>{{ formatDate(rental.rntDtm, 'YYYY.MM.DD') }}</span>
              </p>
              <p class="time" :class="rental.addFeeYn === 'Y' ? 'red' : ''">{{ rental.utlzDrtm }}분 이용</p>
            </div>
            <ul class="info_list">
              <li>
                <div class="left">
                  <p class="title">대여</p>
                  <p class="info">
                    <span class="num">{{ Number(rental.rntPlc.split('.')[0]) }}.</span>
                    {{ rental.rntPlc.split('.')[1] }}
                  </p>
                </div>
                <div class="right">{{ formatDate(rental.rntDtm, 'MM.DD HH:mm') }}</div>
              </li>
              <li>
                <div class="left">
                  <p class="title">반납</p>
                  <p class="info">
                    <span class="num">{{ Number(rental.rtrnPlc.split('.')[0]) }}.</span>
                    {{ rental.rtrnPlc.split('.')[1] }}
                  </p>
                </div>
                <div class="right">{{ formatDate(rental.rtrnDtm, 'MM.DD HH:mm') }}</div>
              </li>
              <li>
                <div class="left">
                  <p class="title">이동거리</p>
                  <p class="info">
                    <span class="num">{{ rental.mvmnDist / 10.0 }}km</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <br ref="lastItemRef" />
        </div>

        <!-- 데이터 없는 경우 -->
        <div class="no_data" v-else>
          <uu-ic size="48" name="exclamation" />
          <p>이용 내역이 없습니다.</p>
        </div>
        <!-- // 데이터 없는 경우 -->
      </div>
    </template>
  </common-modal>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import CommonModal from '@/views/common/components/CommonModal.vue';
import { useReportBikeStore } from '@/service/customer-support/reportBikeModule';
import { useIntersectionObserver } from '@vueuse/core';
import { watch } from 'vue';

const props = defineProps({ isShowPopup: { type: Boolean, default: false } });
const emit = defineEmits(['fetchRentalData', 'ok', 'close']);

const lastItemRef = ref(null); // 스크롤 더보기용 element ref
const pageNo = ref(1);
const showPopup = ref(false);

const bikeRentalHistoryList = computed(() => reportBikeStore.bikeRentalHistoryList);
const isLast = computed(() => reportBikeStore.isHistoryLast);

const reportBikeStore = useReportBikeStore();

onMounted(() => {
  getBikeRentalHistory();
});

// 최근 이용 내역 조회
const getBikeRentalHistory = async () => {
  const param = {
    pmGrpDvsCd: 'T',
    utlzSvcDvsCd: 'A',
    pageNo: pageNo.value,
    termDvsCd: '02',
    reportYn: 'Y'
  };
  await reportBikeStore.setBikeRentalHistory(param);
};

// 최근 이용 내역 더보기용 Observer
useIntersectionObserver(
  lastItemRef,
  ([{ isIntersecting }]) => {
    if (!isIntersecting || isLast.value) return;
    updateRentalHistoryList();
  },
  { threshold: 0.5 }
);

// 최근 이용 내역 추가
const updateRentalHistoryList = async () => {
  pageNo.value++;
  await getBikeRentalHistory();
};

const okCallback = (bcclNo: string, utlzSvcDvsCd: string) => {
  emit('ok', bcclNo, utlzSvcDvsCd);
};

const closeCallback = () => {
  emit('close');
};

// 날짜 format
const formatDate = (txt: string, formatType: string) => {
  if (formatType === 'YYYY.MM.DD') {
    return txt.substring(0, 10);
  }
  if (formatType === 'MM.DD HH:mm') {
    return txt.substring(5, 16);
  }
  return txt;
};

watch(
  () => props.isShowPopup,
  () => {
    showPopup.value = props.isShowPopup;
  }
);
</script>
