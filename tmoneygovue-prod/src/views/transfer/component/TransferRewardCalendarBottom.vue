<template>
  <common-modal v-model="showBottom" type="bottom" @ok="okCallback">
    <template #modal_header>날짜 선택</template>
    <template #modal_body>
      <uu-date-picker :data="date" :default-index="defaultIndex" @date-change="(e, data) => handleChange(e, data)" />
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" label="선택" size="xl" @click="btnActions.ok" />
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import uuDatePicker from '@/components/uu-components/UuDatePicker.vue';
import CommonModal from '@/views/common/components/CommonModal.vue';
import type { ChangedEvent } from '@egjs/vue3-flicking';
import { formatDate, getToday } from '@/utils/dateUtils';

const emit = defineEmits(['ok']);
const showBottom = ref<boolean>(false);

const currentYear = Number(formatDate(getToday(), 'YYYY')); // 현재 년도
//const currentYear = new Date().getFullYear();
const yearsBefore = Array.from({ length: 100 }, (_, index) => currentYear - index);
const yearsAfter = Array.from({ length: 100 }, (_, index) => currentYear + index);
const allYears = [...yearsBefore.reverse().filter((year) => year != currentYear), ...yearsAfter]; // 년도

/**
 * @description 년도, 월, 일
 */
const date = ref([
  allYears,
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
]);
/**
 * @description 오늘 날짜
 */
const today = ref(
  [formatDate(getToday(), 'YYYY'), formatDate(getToday(), 'MM'), formatDate(getToday(), 'DD')].map(Number)
);
/**
 * @description 오늘 날짜
 */
const defaultIndex = ref([
  date.value[0].indexOf(today.value[0]),
  date.value[1].indexOf(today.value[1]),
  date.value[2].indexOf(today.value[2])
]);
/**
 * @description 선택한 날짜
 */
const dateArr = ref(today.value);

/**
 * @description 날짜 변경 event
 */
const handleChange = (e: ChangedEvent, data: number) => {
  const index = Number(e.currentTarget.panels[0].element.getAttribute('data-panel'));
  dateArr.value[index] = data;
  //const yearPanel = e.currentTarget.panels.find((item) => Number(item.element.textContent?.replace('년', '')) == data);

  // // active 안되어있을때 active 추가
  // if (yearPanel) {
  //   // 년도
  //   if (!yearPanel.element.classList.contains('active')) {
  //     yearPanel.element.classList.add('active');
  //   }
  // } else {
  //   // 월, 일
  //   if (!e.currentTarget.panels[data - 1].element.classList.contains('active')) {
  //     e.currentTarget.panels[data - 1].element.classList.add('active');
  //   }
  // }
  // if (!e.currentTarget.panels[data - 1].element.classList.contains('active')) {
  //   e.currentTarget.panels[data - 1].element.classList.add('active');
  // }
};

const open = () => (showBottom.value = true);
defineExpose({ open });

const okCallback = () => {
  emit('ok', dateArr.value);
};
</script>
