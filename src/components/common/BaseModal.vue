<script setup>
import { ref, watch, nextTick, useId } from 'vue';
const model = defineModel({ type: Boolean, default: false });
defineProps({ title: { type: String, default: '상세 정보' } });
const dialog = ref(null);
const titleId = useId();
let previousFocus;
watch(
  model,
  async (open) => {
    await nextTick();
    if (open && !dialog.value.open) {
      previousFocus = document.activeElement;
      dialog.value.showModal();
    } else if (!open && dialog.value.open) {
      dialog.value.close();
      previousFocus?.focus();
    }
  },
  { immediate: true }
);
</script>
<template>
  <dialog
    ref="dialog"
    class="base-modal"
    :aria-labelledby="titleId"
    @cancel.prevent="model = false"
    @close="model = false"
    @click="
      (e) => {
        if (e.target === dialog) model = false;
      }
    "
  >
    <header class="base-modal__header">
      <h2 :id="titleId">{{ title }}</h2>
      <button aria-label="닫기" @click="model = false">×</button>
    </header>
    <section class="base-modal__body"><slot /></section>
  </dialog>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-modal {
  @include card-surface;
  color: var(--text);
  width: min(520px, calc(100% - 32px));
  padding: 24px;
  max-height: 85vh;
  &::backdrop {
    background: #0f172a88;
    backdrop-filter: blur(4px);
  }
  &__header {
    @include flex-between;
    margin-bottom: 22px;
    h2 {
      font-size: 19px;
    }
  }
  &__body {
    display: grid;
    gap: 16px;
  }
}
</style>
