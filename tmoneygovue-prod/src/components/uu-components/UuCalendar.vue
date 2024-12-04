<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { formatDate } from '@/utils/dateUtils';
import { onMounted } from 'vue';
// import dayjs from 'dayjs';
import { throttle } from 'lodash-es';

export interface HighlightedDate {
  date: Date;
  price?: string;
}

export interface HolidayDate {
  holiday: Date;
}

const props = defineProps({
  defaultDate: {
    type: Date,
    default: undefined,
    required: false
  },
  multiDates: {
    type: Boolean,
    default: false
  },
  highlightedDates: {
    type: Array<HighlightedDate>,
    default: [
      {
        date: new Date(),
        price: ''
      }
    ]
  },
  holidayDates: {
    type: Array<HolidayDate>
  },
  // highlightedDates: {
  //   type: Array<Date>,
  //   default: [new Date()]
  // },
  showPrice: {
    type: Boolean,
    default: false
  },
  disabledDates: {
    type: Array<Date>,
    default: []
  },
  minDate: {
    type: Date,
    default: new Date()
  },
  maxDate: {
    type: Date,
    default: new Date()
  },
  preventMinMaxNavigation: {
    type: Boolean,
    default: false,
    required: false
  },
  beforeDisabled: {
    type: Boolean,
    default: false
  },
  afterDisabled: {
    type: Boolean,
    default: false
  },
  afterMonth: {
    type: String,
    default: '0'
  }
});
const emits = defineEmits(['dayChange', 'selectDate']);

watch(
  () => props.defaultDate,
  () => {
    date.value = props.defaultDate;
  }
);

const getHighlightedDates = computed(() => {
  let dateList: Array<Date> = [];
  props.highlightedDates.forEach((data) => {
    dateList.push(data.date);
  });
  return dateList;
});

const getDisabledDates = computed(() => {
  return props.disabledDates;
});

/**
 * @description 하이라이트된 날짜 중에서 금액 표시하기
 */
const getPrice = computed(() => (date: Date) => {
  // let price = '';
  // const showPriceDate = props.highlightedDates.some((data) => formatDate(data.date) === formatDate(date));

  // if (props.highlightedDates.length > 0 && showPriceDate) {
  //   price = props.highlightedDates.find((data) => formatDate(data.date) === formatDate(date))?.price ?? '0원';
  //   return `${price}`;
  // }
  // return '';
  let price = '0원';
  const showPriceDate = props.highlightedDates.some((data) => formatDate(data.date) === formatDate(date));

  if (props.highlightedDates.length > 0 && showPriceDate)
    price = props.highlightedDates.find((data) => formatDate(data.date) === formatDate(date))?.price ?? '0원';
  return price;
});

/**
 * @description 하이라이트된 날짜 중에서 공휴일 표시하기
 */
const getHoliday = computed(() => (date: Date) => {
  if (!props.holidayDates) {
    return false;
  }
  return (
    props.highlightedDates.some((data) => formatDate(data.date) === formatDate(date)) &&
    props.holidayDates.some((data) => formatDate(data.holiday) === formatDate(date))
  );
});

/**
 * @description 하이라이트된 날짜 중에서 토요일 표시하기
 */
const getSaturday = computed(() => (date: Date) => {
  return props.highlightedDates.some((data) => formatDate(data.date) === formatDate(date)) && date.getDay() == 6;
});

/**
 * @description 하이라이트된 날짜 중에서 일요일 표시하기
 */
const getSunday = computed(() => (date: Date) => {
  return props.highlightedDates.some((data) => formatDate(data.date) === formatDate(date)) && date.getDay() == 0;
});

const handleDate = (year: number, month: number) => {
  emits('dayChange', year, month);
};

const selectDate = (date: Date | Date[]) => {
  emits('selectDate', date);
};

const date = ref<Date | undefined>(undefined);
// const month = ref(date.value.getMonth() + 1);
// const year = ref(date.value.getFullYear());

const startX = ref(0);
const startY = ref(0);
const threshold = 50; // swipe 인식 임계값 (px)
const handlePosition = ref(0); // 1: 다음달, -1: 이전달

/**
 * @description swiper
 */
const handleTouchStart = (e: TouchEvent) => {
  startX.value = e.touches[0].clientX;
  startY.value = e.touches[0].clientY;
  handlePosition.value = 0;
};

const handleTouchMove = (e: TouchEvent) => {
  const dx = e.touches[0].clientX - startX.value;
  const dy = e.touches[0].clientY - startY.value;
  if (Math.abs(dx) > threshold || Math.abs(dy) > threshold) {
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) {
        handlePosition.value = -1;
      } else {
        handlePosition.value = 1;
      }
    }
  }
};

const handleTouchEnd = throttle(() => {
  if (!element.value) return;
  if (handlePosition.value > 0) {
    (element.value.querySelector('.custom_ic.ic_right') as HTMLElement).click();
    // 다음달
    // if (formatDate(dayjs(props.maxDate), 'YYYYM') === `${year.value}${month.value}`) {
    //   return;
    // }
    // handleDate(year.value, month.value + 1);
    // month.value = month.value + 1;
  } else if (handlePosition.value < 0) {
    (element.value.querySelector('.custom_ic.ic_left') as HTMLElement).click();
    // 이전 달
    // if (formatDate(dayjs(props.minDate), 'YYYYM') === `${year.value}${month.value}`) {
    //   return;
    // }
    // handleDate(year.value, month.value - 1);
    // month.value = month.value - 1;
  }
}, 500);

const arrowDisabled = (isBefore: boolean, selMonth: string, afterMonth?: string) => {
  if (isBefore && Number(selMonth) <= new Date().getMonth() + 1) return true;
  if (!isBefore && Number(selMonth) >= new Date().getMonth() + 1 + Number(afterMonth)) return true;
  return false;
};

const element = ref(document.querySelector('.cal'));
onMounted(() => {
  element.value = document.querySelector('.cal');
  if (element.value) {
    element.value.addEventListener('touchstart', (e: Event) => handleTouchStart(e as TouchEvent));
    element.value.addEventListener('touchmove', (e: Event) => handleTouchMove(e as TouchEvent));
    element.value.addEventListener('touchend', handleTouchEnd);
  }
});
</script>

<template>
  <VueDatePicker
    v-model="date"
    class="cal"
    :locale="'ko-KR'"
    :inline="true"
    :enable-time-picker="false"
    :hide-offset-dates="true"
    :week-start="0"
    :month-change-on-scroll="false"
    :no-today="true"
    :highlight="{ dates: getHighlightedDates }"
    :multi-dates="props.multiDates ? props.multiDates : false"
    :disabled-dates="getDisabledDates"
    :min-date="props.minDate"
    :max-date="props.maxDate"
    :prevent-min-max-navigation="props.preventMinMaxNavigation"
    @internal-model-change="selectDate"
    :config="{ noSwipe: true }"
  >
    <template #month-year="{ month, year, handleMonthYearChange }">
      <span class="custom_ic ic_left" @click="handleMonthYearChange?.(false), handleDate(year, month)">
        <i
          class="ic"
          :class="beforeDisabled && arrowDisabled(true, month + 1) ? 'ic_24_arrow_disabled' : 'ic_24_arrow'"
          :aria-hidden="true"
        />
      </span>
      <button type="button" class="year_month" @click="handleDate(year, month + 1)">
        {{ year }}.{{ month + 1 < 10 ? '0' + (month + 1) : month + 1 }}
      </button>
      <span class="custom_ic ic_right" @click="handleMonthYearChange?.(true), handleDate(year, month + 2)">
        <i
          class="ic"
          :class="
            afterDisabled && arrowDisabled(false, month + 1, props.afterMonth ?? 0)
              ? 'ic_24_arrow_disabled'
              : 'ic_24_arrow'
          "
          :aria-hidden="true"
        />
      </span>
    </template>
    <template #month-year-wrap />
    <template #day="{ date: date }">
      <div class="day">
        <div class="date">
          <span
            :class="[
              getHoliday(date) ? 'holiday' : '',
              getSaturday(date) ? 'saturday' : '',
              getSunday(date) ? 'sunday' : ''
            ]"
            >{{ date.getDate() }}</span
          >
          <span class="sr_only">일</span>
          <!-- <span v-if="showPrice" class="price">39,700원</span> -->
        </div>
        <div class="price">
          <span v-if="showPrice" :class="getPrice(date) === '0원' ? 'no_show' : ''">{{ getPrice(date) }}</span>
        </div>
      </div>
    </template>
    <template #action-row />
  </VueDatePicker>
</template>

<style scoped></style>
