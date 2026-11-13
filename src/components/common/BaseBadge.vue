<script setup>
defineProps({ tone: { type: String, default: 'primary' } });
</script>
<template>
  <span class="base-badge" :class="`base-badge--${tone}`"><slot /></span>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-badge {
  @include flex-center;
  display: inline-flex;
  border-radius: 9999px;
  padding: 3px 10px;
  font-size: 11px;
  font-weight: 600;
  color: var(--primary);
  background: var(--soft);
  &--success {
    color: #059669;
    background: #10b98115;
  }
  &--warning {
    color: #b7790b;
    background: #f59e0b15;
  }
  &--danger {
    color: var(--danger);
    background: #ef444415;
  }
}
</style>
