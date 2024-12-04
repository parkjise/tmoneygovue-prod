<script setup lang="ts">
import { ref, reactive, nextTick, type PropType, watchEffect } from 'vue';
import { getRandomId } from '@/assets/script/randomString';
import { vOnClickOutside } from '@vueuse/components';
import uuButton from '@/components/uu-components/UuButton.vue';
import uuIc from '@/components/uu-components/UuIc.vue';

type positionType = {
  x?: 'left' | 'center' | 'right';
  y?: 'top' | 'bottom';
};
type tooltipType = 'primary' | 'white' | 'dark' | 'line';

interface tooltipInterface {
  active: boolean;
  target?: HTMLButtonElement;
  content?: HTMLDivElement; 
}

const props = defineProps({
  /**
   * 툴팁 내용
   */
  content: {
    type: String,
    default: ''
  },
  /**
   * 툴팁 위치 <br>
   * :position={ x: 'left', y: 'bottom' }<br>
   * x: 'left' | 'center' | 'right';<br>
   * y: 'top' | 'bottom';
   */
  position: {
    type: Object as PropType<positionType>,
    default: () => {
      return {
        x: 'left',
        y: 'bottom'
      };
    }
  },
  /**
   * tooltipType: 'primary' | 'white' | 'dark' | 'line'
   */
  type: {
    type: String as PropType<tooltipType>,
    default: 'primary'
  },
  /** show(true) & hide(false) */
  modelValue: {
    type: Boolean,
    default: false
  },
  hideTarget: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits([
  /**
   * 툴팁 열림 상태
   */
  'open',
  /**
   * 툴팁 닫힘 상태
   */
  'close'
]);

const randomString = getRandomId();
const tooltipBtn = ref();
const tooltipContent = ref();
const state = reactive<tooltipInterface>({
  active: props.modelValue,
  target: undefined,
  content: undefined
});

const open = (e: Event) => {
  emit('open');
  state.active = true;
  nextTick(() => {
    state.target = e.target as HTMLButtonElement;
    state.content = state.target.nextElementSibling as HTMLDivElement;
  });
};

const close = () => {
  emit('close');
  state.active = false;
};

watchEffect(() => {
  state.active = props.modelValue;
});

const onOutside = () => {
  props.modelValue ? null : close();
};

// const a11y = (e: KeyboardEvent) => {
//   nextTick(() => {
//     e.key === 'Enter' && tooltipContent.value.focus();
//     e.key === 'Escape' && (state.target?.focus(), close());
//   });
// };

defineExpose({
  open,
  close
});
</script>

<template>
  <span class="tooltip_wrap">
    <uu-button
      v-if="!hideTarget"
      ref="tooltipBtn"
      btn-color="none"
      btn-style="none"
      size="xs"
      class="btn_tooltip"
      :aria-label="state.active ? '툴팁 닫힘' : '툴팁 열림'"
      :aria-describedby="`${randomString}Tooltip`"
      @click="open($event)"
    >
      <slot name="target">
        <uu-ic name="question" size="16" />
      </slot>
    </uu-button>
    <span
      v-if="state.active"
      :id="`${randomString}Tooltip`"
      v-on-click-outside="onOutside"
      class="tooltip_area"
      :class="[`tooltip_${props.position.x}`, `tooltip_${props.position.y}`, `tooltip_${props.type}`]"
      role="tooltip"
      :aria-hidden="!state.active"
    >
      <span ref="tooltipContent" class="tooltip_content" v-html="props.content"> 
      </span>
      <uu-button class="btn_close" @click="close()" aria-label="툴팁 닫기"></uu-button>
    </span>
  </span>
</template>

<style></style>
