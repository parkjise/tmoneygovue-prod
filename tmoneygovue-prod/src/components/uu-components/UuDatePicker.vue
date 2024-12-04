<script setup lang="ts">
import Flicking, { type ChangedEvent } from '@egjs/vue3-flicking';
import { ref, type PropType } from 'vue';

type dateType = 'year' | 'time';

const props = defineProps({
  type: {
    type: String as PropType<dateType>,
    default: 'year'
  },
  data: {
    type: Array<number[]>,
    default: []
  },
  defaultIndex: {
    type: Array<number>,
    default: [0, 0, 0]
  }
});

const emits = defineEmits(['dateChange']);
const today = ref(props.defaultIndex); // 오늘 날짜
const year = ref(props.defaultIndex[0]); // 선택한 년도
const month = ref(props.defaultIndex[1]); // 선택한 달
const day = ref(props.defaultIndex[2]); // 선택한 일

const handleUpdate = (e: ChangedEvent, data: number[]) => {
  const index = Number(e.currentTarget.panels[0].element.getAttribute('data-panel'));

  if (index == 0) {
    year.value = e.index;
  } else if (index == 1) {
    month.value = e.index;
  } else if (index == 2) {
    day.value = e.index;
  }

  if (index == 2) {
    // 일자 선택
    if (today.value[1] > month.value || today.value[0] > year.value) {
      // 이전 달 선택했을땐 모든 일자 선택 가능
      emits('dateChange', e, data[e.index]);
      return;
    } else {
      if (e.index > props.defaultIndex[index]) {
        // 선택한 일자 > 오늘 일자
        // 오늘 일자로 다시 위치 옮겨줌
        e.currentTarget.panels[e.index].element.classList.remove('active');
        const flicking = flickingRefs.value[index];
        const midPanel = flicking.getPanel(today.value[index]);

        flicking.moveTo(midPanel.index).catch(() => void 0);
        midPanel.element.classList.add('active');
      }
    }
  } else if (index == 1) {
    // 달 선택
    if (today.value[0] > year.value) {
      // 이전 년도 선택했을땐 모든 달 선택 가능
      emits('dateChange', e, data[e.index]);
      return;
    } else {
      if (e.index > props.defaultIndex[index]) {
        // 선택한 달 > 현재 달
        // 현재 달로 다시 위치 옮겨줌
        e.currentTarget.panels[e.index].element.classList.remove('active');
        const flicking = flickingRefs.value[index];
        const midPanel = flicking.getPanel(today.value[index]);

        flicking.moveTo(midPanel.index).catch(() => void 0);
        midPanel.element.classList.add('active');
      } else if (e.index == props.defaultIndex[index]) {
        // 선택한 달 = 현재 달
        if (day.value > today.value[2]) {
          // 선택한 일자 > 오늘 일자 이면 오늘 일자로 다시 위치 옮겨줌
          e.currentTarget.panels[e.index].element.classList.remove('active');
          const flicking = flickingRefs.value[2];
          const midPanel = flicking.getPanel(today.value[2]);

          flicking.moveTo(midPanel.index).catch(() => void 0);
          midPanel.element.classList.add('active');
        }
      }
    }
  } else {
    // 년도 선택
    if (e.index > props.defaultIndex[index]) {
      // 선택한 년도 > 현재 년도
      // 현재 년도로 다시 위치 옮겨줌
      e.currentTarget.panels[e.index].element.classList.remove('active');
      const flicking = flickingRefs.value[index];
      const midPanel = flicking.getPanel(today.value[index]);

      flicking.moveTo(midPanel.index).catch(() => void 0);
      midPanel.element.classList.add('active');
    } else if (e.index == props.defaultIndex[index]) {
      // 선택한 년도 == 현재 년도
      if (month.value > today.value[1]) {
        // 선택한 달 > 현재 달
        e.currentTarget.panels[e.index].element.classList.remove('active');
        const flicking = flickingRefs.value[1];
        const midPanel = flicking.getPanel(today.value[1]);

        flicking.moveTo(midPanel.index).catch(() => void 0);
        midPanel.element.classList.add('active');
      } else if (month.value == today.value[1]) {
        // 선택한 달 = 현재 달
        if (day.value > today.value[2]) {
          // 선택한 일자 > 오늘 일자 이면 오늘 일자로 다시 위치 옮겨줌
          e.currentTarget.panels[e.index].element.classList.remove('active');
          const flicking = flickingRefs.value[2];
          const midPanel = flicking.getPanel(today.value[2]);

          flicking.moveTo(midPanel.index).catch(() => void 0);
          midPanel.element.classList.add('active');
        }
      }
    }
  }

  // active 안되어있을 경우 active class 추가
  // 년도
  const yearPanel = e.currentTarget.panels.find(
    (item) => Number(item.element.innerText?.replace('년', '')) == data[e.index]
  );
  // 월, 일
  const monthDayPanel = e.currentTarget.panels[data[e.index] - 1];

  if (yearPanel) {
    if (!yearPanel.element.classList.contains('active')) {
      yearPanel.element.classList.add('active');
    }
  }

  if (monthDayPanel) {
    if (!monthDayPanel.element.classList.contains('active')) {
      e.currentTarget.panels[data[e.index] - 1].element.classList.add('active');
    }
  }

  emits('dateChange', e, data[e.index]);
};

// const handleMoveEnd = (e: any, idx: number) => {
//   const select = e.currentTarget.panels.find((panel: any) => panel.element.classList.contains('active'));

//   // if (e.currentTarget.panels.every((item) => !item.element.classList.contains('active'))) {
//   //   //e.currentTareget.panels[today.value[idx]].element.classList.add('active');
//   //   e.currentTarget.panels[today.value[idx]].element.classList.add('active');
//   //   return;
//   // }
//   if (select) {
//     if (select.index > today.value[idx]) {
//       // 오늘 날짜 이후를 선택한 경우
//       select.element.classList.remove('active');
//       const flicking = flickingRefs.value[idx];
//       const midPanel = flicking.getPanel(today.value[idx]);

//       flicking.moveTo(midPanel.index).catch(() => void 0);
//       midPanel.element.classList.add('active');
//     }
//   }
// };

const isActivePanel = (idx: number, i: number) => {
  return props.defaultIndex[idx] === i;
};

const flickingRefs = ref<Array<any>>([]);

const updateTransform = (e: any) => {
  e.currentTarget.panels.forEach((panel: any) => {
    const rotateVal = -panel.progress * 20;
    const sinRot = Math.sin(Math.abs((rotateVal * Math.PI) / 180));
    const depth = 150 * sinRot * sinRot;
    panel.element.style.transform = `translateZ(-${depth}px)`;
    //패널이 가운데에 있을 때 active 클래스를 추가
    const isCenter = Math.abs(panel.progress) < 0.5;
    panel.element.classList.toggle('active', isCenter);
  });
};

const readyTransform = (idx: number) => {
  const flicking = flickingRefs.value[idx];
  const midPanel = flicking.getPanel(props.defaultIndex[idx]);
  if (midPanel) {
    flicking.moveTo(midPanel.index, 0);
    midPanel.element.classList.add('active');
  }
};
</script>

<template>
  <div class="date_picker" :class="{ time: props.type == 'time' }">
    <Flicking
      v-for="(value, idx) in props.data"
      :key="idx"
      :ref="(el) => (flickingRefs[idx] = el)"
      :options="{
        horizontal: false,
        bounce: 0,
        defaultIndex: props.defaultIndex[idx],
        circular: true
      }"
      @changed="(e) => handleUpdate(e, data[idx])"
      @ready="readyTransform(idx)"
      @move="(e) => updateTransform(e)"
    >
      <div
        :data-panel="idx"
        v-for="(item, i) in value"
        :key="i"
        class="date_panel"
        :class="{ active: isActivePanel(idx, i) }"
      >
        <template v-if="type == 'year'">
          <template v-if="idx == 0"> {{ item }}년 </template>
          <template v-else-if="idx == 1"> {{ item }}월 </template>
          <template v-else> {{ item }}일 </template>
        </template>
        <template v-else>
          {{ item }}
        </template>
      </div>
      <template #viewport>
        <div class="date_panel_border" :class="`border_${idx == 0 ? 'left' : 'right'}`" />
        <div class="shadow shadow_top" />
        <div class="shadow shadow_bottom" />
      </template>
    </Flicking>
  </div>
</template>

<style scoped></style>
