<script lang="ts" setup>
import { computed, type PropType } from 'vue';

export type ButtonColorType = 'none' | 'primary' | 'secondary';
export type ButtonStyleType = 'none' | 'line' | 'text';
export type ButtonSizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonLinkTargetType = '_blank' | '_self';

const props = defineProps({
  id: {
    type: String,
    default: null
  },
  class: {
    type: [String, Object, Array],
    default: null
  },
  label: {
    type: String,
    default: ''
  },
  /**
   * color = 'none' | 'primary' | 'secondary'
   */
  btnColor: {
    type: String as PropType<ButtonColorType>,
    default: 'none'
  },
  /**
   * style = 'none' | 'line' | 'text';
   */
  btnStyle: {
    type: String as PropType<ButtonStyleType>,
    default: 'none'
  },
  /**
   * size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
   */
  size: {
    type: String as PropType<ButtonSizeType>,
    default: 'md'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  href: {
    type: String,
    default: null
  },
  target: {
    type: String as PropType<ButtonLinkTargetType>,
    default: null
  },
  calender: {
    type: Boolean,
    default: false
  },
  ariaLabel: {
    type: String,
    default: ''
  }
});

const colorClasses = computed(() => ({
  btn_transparent: props.btnColor === 'none',
  btn_primary: props.btnColor === 'primary',
  btn_secondary: props.btnColor === 'secondary'
}));
const styleClasses = computed(() => ({
  btn_none: props.btnStyle === 'none',
  btn_line: props.btnStyle === 'line',
  btn_text: props.btnStyle === 'text'
}));
</script>
<template>
  <router-link
    v-if="props.href !== null"
    :to="props.href"
    :class="['btn', colorClasses, styleClasses, 'btn_' + props.size, props.class]"
    :title="`${props.label} 페이지 이동`"
  >
    <slot>{{ props.label }}</slot>
  </router-link>
  <button v-else-if="calender" v-bind="props" type="button" class="btn calender_btn">
    <slot name="ic_name" />
    <slot name="label_first" />
    <slot name="label_second" />
  </button>
  <button v-else v-bind="props" type="button" :class="['btn', colorClasses, styleClasses, 'btn_' + props.size]" :aria-label="props.ariaLabel">
    <slot>{{ props.label }}</slot>
    <slot name="label" />
  </button>
</template>
