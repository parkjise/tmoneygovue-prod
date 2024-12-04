<script setup lang="ts">
import { ref, watch } from 'vue';
import { useActiveElement } from '@vueuse/core';
import { getRandomId } from '@/assets/script/randomString';

const props = defineProps({
  /**
   * 토스트 팝업 메세지 Text
   */
  message: {
    type: String,
    default: 'Toast'
  },
  /**
   * close되는 시간
   */
  delay: {
    type: Number,
    default: 2000
  },
  /**
   * close 버튼이 있으며, 버튼을 클릭해야 닫힘
   */
  btnClose: {
    type: Boolean,
    default: false
  },
  /**
   * show(true)/hide(false) 값
   */
  modelValue: {
    type: Boolean,
    default: false
  },
  addClass: {
    type: String,
    default: ''
  }
});
const emit = defineEmits([
  /**
   * 토스트 팝업의 open(show) 상태
   */
  'open',
  /**
   * 토스트 팝업의 close 상태
   */
  'close',
  /**
   * show(true)/hide(false) 값
   */
  'update:modelValue'
]);
const randomString = getRandomId();
const toastDelay = ref();
const toast = ref();
const activator = ref();
const activeElement = useActiveElement();
const activeEl = ref<HTMLElement | null | undefined>();

// onMounted(() => {
//   props.modelValue && showToast()
// })
watch(activeElement, (el) => {
  activeEl.value = el;
});

const showToast = (e: Event) => {
  emit('open');
  emit('update:modelValue', true);
  activator.value = e.target;
  !props.btnClose &&
    (toastDelay.value = setTimeout(() => {
      closeToast();
    }, props.delay));
  toast.value?.focus();
};
const closeToast = () => {
  emit('close');
  emit('update:modelValue', false);
  clearTimeout(toastDelay.value);
  activator.value.focus();
};

const focusLoop = (e: KeyboardEvent) => {
  // a11y
  if (toast.value !== undefined) {
    const focusEls = toast.value.querySelectorAll(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]'
    );
    const firstEl = focusEls[0] as HTMLElement;
    const lastEl = focusEls[focusEls?.length - 1] as HTMLElement;
    const isTab = e.key === 'Tab' || e.keyCode === 9;
    const isEsc = e.key === 'Escape' || e.keyCode === 27;
    if (!isTab) {
      if (isEsc) {
        closeToast();
      }
      return;
    }
    if (e.shiftKey) {
      // shift + tab
      if (activeEl.value === firstEl) {
        lastEl.focus();
        e.preventDefault();
      }
    } else {
      // tab
      if (activeEl.value === lastEl) {
        firstEl.focus();
        e.preventDefault();
      }
    }
  }
};

defineExpose({
  showToast,
  closeToast
});
</script>
<template>
  <Teleport to="body">
    <div
      :id="`${randomString}Toast`"
      ref="toast"
      class="toast"
      :class="[{ is_show: props.modelValue }, addClass]"
      role="alert"
      aria-live="assertive"
      :aria-atomic="true"
      tabindex="0"
      @keydown.stop="focusLoop"
    >
      <div class="toast_area">
        <slot>
          <p>
            {{ props.message }}
          </p>
        </slot>
        <button v-if="props.btnClose" type="button" class="btn_close" @click="closeToast">
          <span class="sr_only">닫기</span>
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style></style>
