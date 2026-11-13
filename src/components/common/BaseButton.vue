<script setup>
defineProps({
  variant: { type: String, default: 'primary' },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false }
});
</script>
<template>
  <button :type="type" :disabled="disabled" class="base-button" :class="`base-button--${variant}`">
    <slot />
  </button>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-button {
  @include focus-ring;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  &--primary {
    background: var(--primary);
    color: #fff;
    border-color: var(--primary);
    &:hover:not(:disabled) {
      background: var(--hover);
    }
  }
  &--danger {
    background: var(--danger);
    color: #fff;
  }
}
</style>
