<script setup>
import { ref, useId } from 'vue';
const visible = ref(false);
const id = useId();
</script>
<template>
  <section class="demo">
    <section class="tooltip">
      <button
        :aria-describedby="visible ? id : undefined"
        @mouseenter="visible = true"
        @mouseleave="visible = false"
        @focus="visible = true"
        @blur="visible = false"
        @keydown.esc="visible = false"
      >
        마우스를 올리거나 Tab으로 이동하세요
      </button>
      <span v-if="visible" :id="id" role="tooltip" class="tooltip__content">
        키보드 포커스에서도 정보를 제공합니다.
      </span>
    </section>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.tooltip {
  position: relative;
  padding: 45px 0;
  &__content {
    position: absolute;
    bottom: 100%;
    left: 0;
    transform: translateY(40px);
    background: var(--code);
    color: #fff;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 12px;
    max-width: 280px;
  }
}
</style>
