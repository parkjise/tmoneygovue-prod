<template>
  <div class="set_date">
    <button type="button" aria-label="이전달로 이동" @click="handleDate('L')">
      <uu-ic size="24" name="arrow" :status="disabledLeft" class="ic_left" />
    </button>
    <div class="date">
      <span :aria-label="formatA11yDateTime(date.slice(0, 4) + date.slice(-2))" role="text">{{
        date.slice(0, 4) + '.' + date.slice(-2)
      }}</span>
    </div>
    <button type="button" aria-label="다음달로 이동" @click="handleDate('R')">
      <uu-ic size="24" name="arrow" :status="disabledRight" class="ic_right" />
    </button>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { addDate, formatDate, getToday, subtractDate, formatA11yDateTime } from '@/utils/dateUtils';
import { useUsageHistoryStore } from '@/service/usage-history/usageHistoryModule';
import { storeToRefs } from 'pinia';

const date = ref<string>(formatDate(getToday(), 'YYYYMM'));

const usageHistoryStore = useUsageHistoryStore();
const { getInqrMonth } = storeToRefs(usageHistoryStore);

const disabledLeft = ref<string>('');
const disabledRight = ref<string>('disabled');

const min = formatDate(subtractDate(getToday(), 11, 'month'), 'YYYYMM');
const max = formatDate(getToday(), 'YYYYMM');

const emit = defineEmits(['updateCalendar']);
/**
 * 캘린더 변경 시 이벤트
 * @param value
 */
async function handleDate(value: string) {
  let changeDate = date.value;

  if (value === 'L' && disabledLeft.value === '') {
    changeDate = formatDate(subtractDate(date.value, 1, 'month'), 'YYYYMM');
  } else if (value === 'R' && disabledRight.value === '') {
    changeDate = formatDate(addDate(date.value, 1, 'month'), 'YYYYMM');
  }
  setDisabled(changeDate);

  if (date.value !== changeDate) {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
    date.value = changeDate;
    await usageHistoryStore.setInqrMonth(changeDate);
    emit('updateCalendar', date.value);
  }
}

/**
 * 월선택 최대/최소 값 설정을 위한 설정
 * @param changeDate
 */
function setDisabled(changeDate: string) {
  if (changeDate <= min) {
    disabledLeft.value = 'disabled';
    disabledRight.value = '';
  } else if (changeDate >= max) {
    disabledLeft.value = '';
    disabledRight.value = 'disabled';
  } else {
    disabledLeft.value = '';
    disabledRight.value = '';
  }
}

onMounted(() => {
  if (getInqrMonth.value) {
    date.value = getInqrMonth.value;
    setDisabled(date.value);
  }
});
</script>
