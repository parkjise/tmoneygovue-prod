<!-- 날짜 선택 바텀시트 -->
<template>
  <common-modal ref="dateBottomRef" v-model="dateBottom" type="bottom" hide-header @ok="okCallback">
    <template #modal_body>
      <uu-calendar
        :highlighted-dates="getAlcnList"
        :holiday-dates="holidayDates"
        :disabled-dates="getDisabledDates"
        :max-date="getMaxDate"
        showPrice
        @day-change="handleChange"
        @select-date="selectDate"
      />
    </template>
    <template #modal_footer="btnActions">
      <uu-button
        btn-color="primary"
        label="선택완료"
        aria-label="선택완료"
        size="xl"
        :disabled="getDisabled"
        @click="btnActions.ok"
      />
    </template>
  </common-modal>
</template>
<script setup lang="ts">
import { onMounted, computed, ref, watch } from 'vue';
import type { HighlightedDate } from '@/components/uu-components/UuCalendar.vue';

import { useReservationStore } from '@/service/travel/reservationModule';
import dayjs from 'dayjs';
import { countDays, formatDate } from '@/utils/dateUtils';
import type { ReqMntlAlcnList } from '@/service/travel/model/reservationModel';
import { useProductStore } from '@/service/travel/productModule';
import { useCalendarStore } from '@/service/calendar/calendarModule';
import CommonModal from '@/views/common/components/CommonModal.vue';

const prdStore = useProductStore();
const rsrvStore = useReservationStore();
const calendarStore = useCalendarStore();

const dateBottomRef = ref();
const dateBottom = ref(false);

const props = defineProps({ isShow: { type: Boolean, default: false } });
const emit = defineEmits(['ok']);

const selectedMonth = ref(dayjs().month() + 1); // 캘린더에 선택된 달
const selectedDate = ref(dayjs()); // 선택일자

onMounted(() => {
  reqMntlAlcnList();
});

watch(
  () => props.isShow,
  async () => {
    dateBottom.value = props.isShow;
  }
);

/**
 * @description 월간배차목록조회
 */
const reqMntlAlcnList = async () => {
  const param: ReqMntlAlcnList = {
    reqSttDt: dayjs().format('YYYYMMDD'), // 오늘
    reqEndDt: dayjs().add(3, 'month').format('YYYYMMDD'), // 오늘기준 3개월 후
    trvlRotId: prdStore.productDtl?.trvlRotId || ''
  };
  await rsrvStore.reqMntlAlcnList(param);
};

/**
 * @description 3개월치 배차목록
 */
const getAlcnList = computed((): HighlightedDate[] => {
  return rsrvStore.resMntlAlcnList.map((data) => {
    return {
      date: new Date(formatDate(dayjs(data.alcnDt))),
      price: data.adltFee.toString()
    };
  });
});

/**
 * @description 공휴일정보
 */
const holidayDates = computed(() =>
  calendarStore.publicHolidays.pbhlList.map((data) => ({
    holiday: new Date(formatDate(dayjs(data.pbhlDt)))
  }))
);

/**
 * @description 선택불가 날짜(전일, 배차목록없음, 3개월 이후)
 */
const getDisabledDates = computed(() => {
  if (getAlcnList.value.length < 1) return;

  let allDayList: string[] = []; // 오늘 ~ 3개월 모든 날짜 리스트
  let returnList: Date[] = [];

  // 오늘 ~ 3개월후 모든 일자 저장
  const dayCnt = countDays(dayjs(), dayjs().add(3, 'month'));
  for (let i = 0; i < dayCnt; i++) {
    allDayList.push(formatDate(dayjs().add(i, 'day')));
  }

  // 조회한 배차목록에 없는 날짜 제거
  getAlcnList.value.forEach((data) => (allDayList = allDayList.filter((date) => formatDate(data.date) !== date)));
  allDayList.forEach((monthDt) => {
    returnList.push(new Date(monthDt));
  });
  return returnList;
});

/**
 * @description 최대 조회 날짜 3개월 지정
 */
const getMaxDate = computed(() => {
  const maxDate = dayjs().add(3, 'month').format('YYYY-MM-DD');
  return new Date(maxDate);
});

/**
 * @description 선택완료 버튼 활성화여부
 */
const getDisabled = computed(() => {
  return !getAlcnList.value.some((data) => data.date.getMonth() + 1 === selectedMonth.value);
});

/**
 * @description 해당 월에 선택 가능한 일자가 없는 경우 체크
 */
const handleChange = (year: number, month: number) => {
  selectedMonth.value = month;
};

/**
 * @description 선택 날짜
 */
const selectDate = (date: Date) => {
  selectedDate.value = dayjs(date);
};

const okCallback = async () => {
  // 선택일자 저장
  rsrvStore.setSelectedDate(selectedDate.value);
  emit('ok');
};
</script>
