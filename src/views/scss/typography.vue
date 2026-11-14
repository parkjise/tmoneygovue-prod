<script setup>
import ScssRecipeCatalog from '@/components/examples/ScssRecipeCatalog.vue';
import { ref } from 'vue';
const lines = ref(2);
const width = ref(440);
const text = ref(
  '실무에서 긴 제목과 설명을 안전하게 다루는 방법. SCSS 믹스인으로 한 줄 말줄임과 여러 줄 말줄임을 재사용하고, rem과 clamp()로 읽기 편한 타이포그래피를 구성합니다. 콘텐츠 길이가 달라져도 카드 레이아웃은 안정적으로 유지됩니다.'
);
</script>
<template>
  <section class="demo">
    <ScssRecipeCatalog topic="typography" />
    <aside class="demo__output">
      <strong>긴 콘텐츠와 유연한 글자 크기에 대비하세요.</strong>
      <p>
        한 줄 말줄임에는 너비 제한이 필요합니다. 여러 줄 말줄임은 내용을 시각적으로만 자르며, 원문은
        아래에서 펼쳐 읽을 수 있습니다.
      </p>
    </aside>
    <label class="demo__field">
      예제 텍스트
      <textarea v-model="text" rows="3" />
    </label>
    <div class="demo__row">
      <label>
        표시 줄 수
        <select v-model.number="lines" aria-label="말줄임 줄 수">
          <option :value="1">1줄</option>
          <option :value="2">2줄</option>
          <option :value="3">3줄</option>
        </select>
      </label>
      <label>
        최대 너비 {{ width }}px
        <input v-model.number="width" type="range" min="220" max="720" />
      </label>
    </div>
    <article class="type-card" :style="{ width: width + 'px' }">
      <h3>Fluid typography</h3>
      <p class="type-card__text" :class="'type-card__text--' + lines" data-testid="truncated-text">
        {{ text }}
      </p>
      <details>
        <summary>원문 전체 읽기</summary>
        <p>{{ text }}</p>
      </details>
    </article>
    <p class="demo__muted">
      사용처: 상품명, 뉴스 카드, 테이블 셀. clamp()는 최솟값과 최댓값을 모두 지정하고 브라우저
      확대를 고려해 rem을 섞어 사용하세요.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/practice' as ui;
.demo {
  @include custom-scrollbar;
}

.type-card {
  @include ui.surface;
  @include ui.stack;
  max-width: 100%;
  container-type: inline-size;
  h3 {
    font-size: clamp(1.125rem, 1rem + 1.5cqi, 1.75rem);
    line-height: 1.35;
  }
  &__text {
    font-size: ui.rem(15px);
    line-height: 1.8;
    overflow-wrap: anywhere;
    &--1 {
      @include ui.truncate(1);
    }
    &--2 {
      @include ui.truncate(2);
    }
    &--3 {
      @include ui.truncate(3);
    }
  }
  details {
    font-size: ui.rem(12px);
    color: var(--muted);
    summary {
      cursor: pointer;
      color: var(--primary);
    }
    p {
      margin-top: ui.space(3);
      overflow-wrap: anywhere;
    }
  }
}
</style>
