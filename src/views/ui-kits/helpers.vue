<script setup>
import { ref } from 'vue';
const compact = ref(false);
const align = ref('left');
</script>
<template>
  <section class="demo">
    <div class="demo__row">
      <label>
        <input v-model="compact" type="checkbox" />
        Compact spacing
      </label>
      <label>
        정렬
        <select v-model="align">
          <option>left</option>
          <option>center</option>
          <option>right</option>
        </select>
      </label>
    </div>
    <article
      class="helpers__box"
      :class="{ 'helpers__box--compact': compact }"
      :style="{ textAlign: align }"
    >
      <h3>SCSS helper composition</h3>
      <p>컴포넌트 내부에서 card-surface, text-ellipsis, focus-ring 믹스인을 조합합니다.</p>
    </article>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.helpers__box {
  @include card-surface;
  padding: 40px;
  transition: padding 0.2s;
  p {
    @include text-ellipsis;
    color: var(--caption);
    margin-top: 12px;
  }
  &--compact {
    padding: 16px;
  }
}
</style>
