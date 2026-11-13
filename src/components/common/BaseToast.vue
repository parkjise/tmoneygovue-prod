<script setup>
import { useToast } from '@/composables/useToast';
const { messages, dismiss } = useToast();
</script>
<template>
  <aside class="base-toast" aria-live="polite" aria-label="알림">
    <article
      v-for="item in messages"
      :key="item.id"
      class="base-toast__item"
      :class="{ 'base-toast__item--error': item.type === 'error' }"
    >
      <span>{{ item.type === 'error' ? '!' : '✓' }} {{ item.text }}</span>
      <button aria-label="알림 닫기" @click="dismiss(item.id)">×</button>
    </article>
  </aside>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 200;
  max-width: calc(100vw - 48px);
  display: grid;
  gap: 8px;
  &__item {
    @include card-surface;
    @include flex-between;
    padding: 12px 18px;
    border-left: 4px solid var(--success);
    &--error {
      border-left-color: var(--danger);
    }
    button {
      padding: 2px 9px;
    }
  }
}
</style>
