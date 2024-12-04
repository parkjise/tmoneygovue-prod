<script setup lang="ts">
import { ref, type PropType } from 'vue';

type posOpt = {
  bottom?: Number;
  right?: Number;
  zIndex?: Number;
};

const props = defineProps({
  pos: {
    type: Object as PropType<posOpt>,
    default: () => {
      return {
        bottom: 28,
        right: 22,
        zIndex: 89
      };
    }
  },
  always: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['click']);

const btnClick = () => {
  emit('click');
};

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const showFloatingBtn = ref(false);

window.addEventListener('scroll', function () {
  const isTop = window.scrollY;
  if (isTop !== 0) {
    showFloatingBtn.value = true;
  } else {
    showFloatingBtn.value = false;
  }
});
</script>

<template>
  <Teleport to="body">
    <template v-if="!always">
      <button
        v-if="showFloatingBtn"
        type="button"
        class="btn_floating btn_top"
        :style="{
          bottom: `${props.pos.bottom ? props.pos.bottom : 10}` + 'px',
          right: `${props.pos.right ? props.pos.right : 10}` + 'px',
          zIndex: `${props.pos.zIndex}`
        }"
        @click="scrollTop()"
      >
        <i class="ic ic_30_arrowTop" :aria-hidden="true" />
        <span class="sr_only">Scroll Top</span>
      </button>
    </template>
    <template v-else>
      <button
        type="button"
        class="btn_floating"
        :style="{
          bottom: `${props.pos.bottom ? props.pos.bottom : 10}` + 'px',
          right: `${props.pos.right ? props.pos.right : 10}` + 'px',
          zIndex: `${props.pos.zIndex}`
        }"
        @click="btnClick"
      >
        <slot name="ic" />
      </button>
    </template>
  </Teleport>
</template>

<style scoped></style>
