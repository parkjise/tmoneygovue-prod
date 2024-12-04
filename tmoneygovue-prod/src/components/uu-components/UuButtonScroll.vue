<script setup lang="ts">
import { ref, onMounted, type PropType } from 'vue';
import uuButton, {
  type ButtonSizeType,
  type ButtonColorType,
  type ButtonStyleType
} from '@/components/uu-components/UuButton.vue';

type scrollType = 'tab' | 'filter';
type asType = 'a' | 'button';

export interface arrayType {
  label: string;
  href?: string;
  active: boolean;
}

const props = defineProps({
  type: {
    type: String as PropType<scrollType>,
    default: ''
  },
  array: {
    type: Array<arrayType>,
    default: () => [
      {
        label: 'label',
        href: '#',
        active: false
      }
    ]
  },
  size: {
    type: String as PropType<ButtonSizeType>,
    default: 'lg'
  },
  btnColor: {
    type: String as PropType<ButtonColorType>,
    default: 'none'
  },
  btnStyle: {
    type: String as PropType<ButtonStyleType>,
    default: 'none'
  },
  as: {
    type: String as PropType<asType>,
    default: 'button'
  }
});

const emit = defineEmits(['click']);

const btnScroll = ref();

onMounted(() => {
  props.array.map((item, index) => {
    item.active && btnEvent(index);
  });
});

const btnEvent = (i: number) => {
  props.array.map((item, index, arr) => {
    i === index ? (arr[i].active = true) : (item.active = false);
    item.active && emit('click', item, i);
  });
  // window.innerWidth < target.offsetLeft ? btnScroll.value.scrollLeft = target.offsetLeft : null
  // console.log(window.innerWidth < target.offsetLeft)
  // btnScroll.value.scrollLeft =+ target.offsetLeft - 20
  // console.log('전체:'+ btnScroll.value.scrollWidth, '타겟: ' + target.offsetLeft)
};
</script>
<template>
  <div ref="btnScroll" class="btn_area btn_scroll" :class="`${props.type}_style`">
    <slot name="prepend" />
    <uu-button
      v-for="(item, i) in props.array"
      :key="i"
      :size="props.size"
      :label="item.label"
      :btn-color="props.btnColor"
      :btn-style="props.btnStyle"
      :href="props.as === 'a' ? item.href : undefined"
      :class="[{ is_active: item.active }, { 'btn_round btn_line btn_arrow': props.type === 'filter' }]"
      @click.prevent.stop="btnEvent(i)"
    />
    <slot name="append" />
  </div>
</template>
