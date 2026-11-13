<script setup>
import { ref } from 'vue';
const label = ref('NEW');
</script>
<template>
  <section class="demo">
    <label>
      리본 텍스트
      <input v-model="label" maxlength="15" />
    </label>
    <article class="ribbon">
      <span class="ribbon__label">{{ label }}</span>
      <h3>Thoughtfully designed.</h3>
      <p>재사용 가능한 카드에 작은 포인트를 더하세요.</p>
    </article>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.ribbon {
  @include card-surface;
  position: relative;
  overflow: hidden;
  padding: 70px 30px 30px;
  h3 {
    margin-bottom: 12px;
  }
  p {
    color: var(--caption);
  }
  &__label {
    position: absolute;
    right: 0;
    top: 20px;
    background: var(--primary);
    color: white;
    padding: 5px 25px;
    font-size: 11px;
    border-radius: 5px 0 0 5px;
  }
}
</style>
