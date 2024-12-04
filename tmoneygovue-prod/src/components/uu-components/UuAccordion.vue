<script setup lang="ts">
import { provide, reactive } from 'vue';
import { getRandomId } from '@/assets/script/randomString';
export interface AccordionInterface {
  id: string;
  count: number;
  active: null | number;
  multiple: boolean;
  arrow: boolean;
}
const props = defineProps({
  /**
   * 여러개의 아코디언이 열림
   */
  multiple: {
    type: Boolean,
    default: false
  },
  /**
   * 아코디언 화살표 버튼으로 토글
   */
  arrow: {
    type: Boolean,
    default: false
  }
});
const randomString = getRandomId();
const accordion = reactive<AccordionInterface>({
  id: randomString,
  count: 0,
  active: null,
  multiple: props.multiple,
  arrow: props.arrow
});
provide<AccordionInterface>('accordion', accordion);
</script>
<template>
  <div
    :id="`${randomString}acc`"
    class="accordion"
    :class="[{ is_multiple: props.multiple }, { is_arrow: props.arrow }]"
  >
    <slot />
  </div>
</template>

<style></style>
