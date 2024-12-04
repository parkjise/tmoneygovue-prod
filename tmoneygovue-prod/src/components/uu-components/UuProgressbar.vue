<script setup lang="ts">
import { type PropType } from 'vue';

type progressType = 'progressbar' | 'step';
type wholeStepType = {
  order: Number;
  done: boolean;
  active: boolean;
};

const props = defineProps({
  /**
   * 프로그레스 바 Type
   * progressType = "progressbar" | "step"
   * default = "progressbar"
   */
  type: {
    type: String as PropType<progressType>,
    default: 'progressbar'
  },
  value: {
    type: Number,
    default: 50
  },
  wholeStep: {
    type: Array as PropType<Array<wholeStepType>>,
    default: () => []
  }
});
</script>
<template>
  <template v-if="type == 'progressbar'">
    <div class="progressbar_wrap">
      <progress id="progressBar" class="progressbar" :value="props.value" max="100" />
      <label for="progressBar" class="progressbar_value_txt"> {{ props.value }}% </label>
    </div>
  </template>
  <template v-else>
    <ol class="step_progressbar_wrap">
      <li
        v-for="(item, index) in props.wholeStep"
        :key="index"
        class="step"
        :class="{ done: item.done, active: item.active }"
        :aria-current="item.active"
      >
        <span class="step_num">{{ item.order }}</span>
      </li>
    </ol>
  </template>
</template>

<style></style>
