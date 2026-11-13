<script setup>
import { ref, useId } from 'vue';
const open = ref(false);
const id = useId();
</script>
<template>
  <section class="demo">
    <section class="popover" @keydown.esc="open = false">
      <button :aria-expanded="open" :aria-controls="id" @click="open = !open">프로젝트 정보</button>
      <article v-if="open" :id="id" class="popover__content">
        <h3>Vue Atelier</h3>
        <p>Vue 3 + SCSS 기반의 개발자 워크스페이스</p>
        <button @click="open = false">닫기</button>
      </article>
    </section>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.popover {
  position: relative;
  min-height: 190px;
  &__content {
    @include card-surface;
    position: absolute;
    top: 50px;
    left: 0;
    max-width: 300px;
    padding: 20px;
    z-index: 2;
    h3 {
      font-size: 14px;
    }
    p {
      font-size: 12px;
      color: var(--muted);
      margin: 8px 0 14px;
    }
  }
}
</style>
