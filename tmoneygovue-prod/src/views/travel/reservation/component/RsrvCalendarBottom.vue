<!-- 날짜 선택 바텀시트 -->
<template>
  <common-modal ref="dateBottomRef" v-model="dateBottom" type="bottom" hide-header @ok="okCallback" @close="close">
    <template #modal_body>
      <uu-calendar
        :default-date="getDefaultDate"
        :highlighted-dates="getAlcnList"
        :holiday-dates="holidayDates"
        :disabled-dates="getDisabledDates"
        :min-date="getMinDate"
        :max-date="getMaxDate"
        :prevent-min-max-navigation="true"
        after-month="3"
        show-price
        before-disabled
        after-disabled
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
        :disabled="!isSelected"
        @click="btnActions.ok"
      />
    </template>
  </common-modal>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { type HighlightedDate } from '@/components/uu-components/UuCalendar.vue';
import type { ReqMntlAlcnList } from '@/service/travel/model/reservationModel';
import dayjs, { Dayjs } from 'dayjs';
import { countDays, formatDate } from '@/utils/dateUtils';
import { useReservationStore } from '@/service/travel/reservationModule';
import { useCalendarStore } from '@/service/calendar/calendarModule';
import { storeToRefs } from 'pinia';
import CommonModal from '@/views/common/components/CommonModal.vue';

const rsrvStore = useReservationStore();
const calendarStore = useCalendarStore();

const { resMntlAlcnList } = storeToRefs(rsrvStore);

const dateBottomRef = ref();
const dateBottom = ref(false);

const selectedDate = ref();
const reqSttDt = ref(dayjs());
const isSelected = ref(false);
const threeMonLater = ref(dayjs().add(3, 'month'));
const defaultDate = ref<Date | undefined>(undefined); //월배차목록 조회 중 가장 빠른 날짜

const props = defineProps({
  isShow: { type: Boolean, default: false },
  date: { type: Date, default: undefined, required: false },
  mounted: { type: Boolean, default: true },
  rotId: { type: String, default: '' }
});
const emits = defineEmits(['ok', 'monthChange', 'close']);

const firstMonth = ref(dayjs().month() + 1); // 가장 처음 조회하는 달(이번달이 기본이지만, 이번달 배차정보가 없을 경우 순차적으로 다음달 조회를 위해)

watch(
  () => props.isShow,
  async () => {
    defaultDate.value = undefined;
    firstMonth.value = dayjs().month() + 1;
    if (props.isShow) {
      if (props.date) {
        defaultDate.value = props.date;
        setReqSttDt(dayjs(props.date));
      }
      const dayjsDate = dayjs(props.date);
      setReqSttDt(dayjs(formatDate(`${dayjsDate.year()}-${dayjsDate.month() + 1}-01`)));
      reqMntlAlcnList().then(() => {
        dateBottom.value = true;
      });

      // 기본 선택 날짜는 선택가능한 가장 빠른 날짜 (날짜 변경이 안되었을 경우만)
      // if (props.mounted)
      //   defaultDate.value = new Date(formatDate(resMntlAlcnList.value[0]?.alcnDt ?? null, 'YYYY-MM-DD'));
    } else dateBottom.value = props.isShow;
  }
);
/**
 * @description 캘린더 default 날짜
 */
const getDefaultDate = computed(() => {
  return defaultDate.value ? new Date(formatDate(defaultDate.value, 'YYYY-MM-DD')) : undefined;
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
 * @description 이번달 배차목록
 */
const getAlcnList = computed((): HighlightedDate[] => {
  return resMntlAlcnList.value
    .filter((data) => data.alcnDt !== '')
    .map((data) => {
      return {
        date: new Date(formatDate(dayjs(data.alcnDt))),
        price: data.adltFee >= 10000 ? `${formatNumber(data.adltFee / 10000)}만` : `${data.adltFee.toLocaleString()}원`
      };
    });
});

/**
 * @description 선택불가 날짜(전일, 배차목록없음, 3개월 이후)
 */
const getDisabledDates = computed(() => {
  let allDayList: string[] = []; // 오늘 ~ 3개월 모든 날짜 리스트
  let returnList: Date[] = [];

  // 오늘 ~ 3개월후 모든 일자 저장
  const dayCnt = countDays(dayjs(), dayjs().add(3, 'month'));
  for (let i = 0; i < dayCnt; i++) {
    allDayList.push(formatDate(dayjs().add(i, 'day')));
  }

  // 조회한 배차목록에 없는 날짜 제거
  if (getAlcnList.value.length > 0)
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
 * @description 최소 조회 날짜 지정
 */
const getMinDate = computed(() => {
  const minDate = dayjs().format('YYYY-MM-DD');
  return new Date(minDate);
});

/**
 * @description 캘린더 금액 표기
 */
const formatNumber = (num: number) => {
  let formatted = num.toFixed(1);
  return formatted.slice(-1) === '0' ? parseInt(formatted) : parseFloat(formatted);
};

/**
 * @description 월간배차목록조회 요청
 */
// const reqMntlAlcnList = async () => {
//   let endDt = dayjs(`${reqSttDt.value.format('YYYYMM')}${reqSttDt.value.daysInMonth()}`);
//   if (dayjs(endDt).isAfter(threeMonLater.value)) {
//     endDt = threeMonLater.value;
//   }

//   const param: ReqMntlAlcnList = {
//     reqSttDt: reqSttDt.value.format('YYYYMMDD'),
//     reqEndDt: formatDate(endDt, 'YYYYMMDD'),
//     trvlRotId: props.rotId
//   };
//   const res = await rsrvStore.reqMntlAlcnList(param);
//   // if (res) reqSttDt.value = dayjs(resMntlAlcnList.value[0].alcnDt);
//   // 현재 달에 배차 정보가 없을 경우, 이후의 달을 순차적으로 조회하여 기본 선택일을 지정한다. 최대 3개월
//   if (!defaultDate.value) {
//     if (res) {
//       defaultDate.value = new Date(formatDate(resMntlAlcnList.value[0]?.alcnDt, 'YYYY-MM-DD'));
//       return;
//     } else {
//       // 최대 3개월까지만 조회하기
//       if (firstMonth.value === dayjs().add(3, 'month').month() + 1) return;
//       firstMonth.value += 1;
//       handleChange(dayjs().year(), firstMonth.value);
//     }
//   }
//   // if (res && !defaultDate.value) {
//   //   defaultDate.value = new Date(formatDate(resMntlAlcnList.value[0]?.alcnDt, 'YYYY-MM-DD'));
//   //   // reqSttDt.value = dayjs(resMntlAlcnList.value[0].alcnDt);
//   // }
// };

const reqMntlAlcnList = async () => {
  let endDt = dayjs(`${reqSttDt.value.format('YYYYMM')}${reqSttDt.value.daysInMonth()}`);
  if (dayjs(endDt).isAfter(threeMonLater.value)) {
    endDt = threeMonLater.value;
  }

  const param: ReqMntlAlcnList = {
    reqSttDt: reqSttDt.value.format('YYYYMMDD'),
    reqEndDt: formatDate(endDt, 'YYYYMMDD'),
    trvlRotId: props.rotId
  };

  try {
    const res = await rsrvStore.reqMntlAlcnList(param);

    // 현재 달에 배차 정보가 없을 경우, 이후의 달을 순차적으로 조회하여 기본 선택일을 지정한다. 최대 3개월
    if (!defaultDate.value) {
      if (res) {
        defaultDate.value = new Date(formatDate(resMntlAlcnList.value[0]?.alcnDt, 'YYYY-MM-DD'));
      } else {
        // 최대 3개월까지만 조회하기
        if (firstMonth.value === dayjs().add(3, 'month').month() + 1) return;
        firstMonth.value += 1;
        await handleChange(dayjs().year(), firstMonth.value);
      }
    }
    return true; // 작업 성공 시 true 반환
  } catch (error) {
    console.error('Error in reqMntlAlcnList:', error);
    throw error; // 오류 처리
  }
};

/**
 * @description 해당 월에 선택 가능한 일자가 없는 경우 체크
 */
const handleChange = async (year: number, month: number) => {
  if (month < dayjs().month() + 1 || month > dayjs().month() + 4) return;
  setReqSttDt(dayjs(`${year}-${String(month).padStart(2, '0')}-01`));
  await reqMntlAlcnList(); // 월간 배차목록 조회
};

const setReqSttDt = (selectedDate: Dayjs) => {
  if (selectedDate.isBefore(getMinDate.value)) {
    reqSttDt.value = dayjs(getMinDate.value);
  } else if (selectedDate.isAfter(getMaxDate.value)) {
    reqSttDt.value = dayjs(getMaxDate.value);
  } else {
    reqSttDt.value = selectedDate;
  }
};

/**
 * @description 선택 날짜
 */
const selectDate = (date: Date) => {
  if (date) {
    selectedDate.value = date;
    isSelected.value = true;
  } else isSelected.value = false;
};

const okCallback = () => {
  emits('ok', selectedDate.value);
};

const close = () => {
  emits('close');
};
</script>
