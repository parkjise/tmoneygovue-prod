<script setup lang="ts">
import { type PropType } from 'vue';

type icDirectionType = 'right' | 'left' | 'down';

const props = defineProps({
  /**
   * ic Size (px, rem단위 생략)
   */
  size: {
    type: [String, Number],
    default: '16',
    required: true
  },
  /**
   * ic Name
   */
  name: {
    type: String,
    default: '',
    required: true
  },
  /**
   * ic Color (white, gray..) <br>
   * default: black
   */
  color: {
    type: String,
    default: ''
  },
  /**
   * ic Status (active/disabled)
   */
  status: {
    type: String,
    default: ''
  },
  /**
   * ic Rotate <br>
   * icDirectionType = 'right' | 'left' | 'down'<br>
   * default: up
   */
  direction: {
    type: String as PropType<icDirectionType>,
    default: ''
  },
  src: {
    type: String,
    default: ''
  },
  update: {
    type: Boolean,
    default: false
  },
  ariaHidden: {
    type: Boolean,
    default: true
  }
});
</script>
<template>
  <i
    class="ic"
    :class="[
      `ic_${props.size}_${props.name}${props.color ? '_' + props.color : ''}${props.status ? '_' + props.status : ''}`,
      props.direction,
      { is_new: props.update }
    ]"
    :aria-hidden="ariaHidden"
  ></i>
</template>
