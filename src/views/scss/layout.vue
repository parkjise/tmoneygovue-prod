<script setup>
import ScssRecipeCatalog from '@/components/examples/ScssRecipeCatalog.vue';
import { ref } from 'vue';
const min = ref('180');
const gap = ref('4');
const count = ref(4);
</script>
<template>
  <section class="demo">
    <ScssRecipeCatalog topic="layout" />
    <aside class="demo__output">
      <strong>콘텐츠 수에 반응하는 레이아웃.</strong>
      <p>
        auto-fit + minmax로 열 수를 자동 결정하고, min(100%, 최소 너비)로 좁은 부모에서도 넘침을
        막습니다.
      </p>
    </aside>
    <div class="demo__row">
      <label>
        카드 최소 너비
        <select v-model="min" aria-label="카드 최소 너비">
          <option value="140">140px</option>
          <option value="180">180px</option>
          <option value="260">260px</option>
        </select>
      </label>
      <label>
        간격
        <select v-model="gap" aria-label="그리드 간격">
          <option value="2">8px</option>
          <option value="4">16px</option>
          <option value="6">24px</option>
        </select>
      </label>
      <label>
        카드 수
        <input v-model.number="count" type="range" min="1" max="8" />
      </label>
    </div>
    <section
      class="layout-grid"
      :class="['layout-grid--min-' + min, 'layout-grid--gap-' + gap]"
      data-testid="layout-grid"
    >
      <article v-for="n in count" :key="n">
        <span>0{{ n }}</span>
        <h3>Workspace {{ n }}</h3>
        <p>내용이 길어져도 안전한 반응형 카드</p>
        <footer>
          <span>Vue · SCSS</span>
          <button :aria-label="'Workspace ' + n + ' 선택'">↗</button>
        </footer>
      </article>
    </section>
    <p class="demo__muted">
      사용처: 대시보드 KPI, 상품 카드, 갤러리. flex 아이템에는 min-width: 0, 가변 그리드 열에는
      minmax(0, 1fr)도 함께 검토하세요.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/practice' as ui;
.demo {
  @include custom-scrollbar;
}

.layout-grid {
  @include ui.auto-grid;
  @each $min in (140, 180, 260) {
    &--min-#{$min} {
      @include ui.auto-grid($min: $min * 1px);
    }
  }
  @each $step in (2, 4, 6) {
    &--gap-#{$step} {
      gap: ui.space($step);
    }
  }
  article {
    @include ui.surface;
    @include ui.stack(ui.space(3));
    min-width: 0;
    > span {
      font-size: ui.rem(24px);
      color: var(--primary);
    }
    h3 {
      font-size: ui.rem(15px);
    }
    p {
      font-size: ui.rem(12px);
      color: var(--muted);
    }
  }
  footer {
    @include ui.cluster(ui.space(2));
    margin-top: auto;
    font-size: ui.rem(11px);
    color: var(--caption);
    button {
      margin-left: auto;
    }
  }
}
</style>
