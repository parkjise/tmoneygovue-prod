<script setup>
import ScssRecipeCatalog from '@/components/examples/ScssRecipeCatalog.vue';
import { ref } from 'vue';
const compact = ref(false);
</script>
<template>
  <section class="demo">
    <ScssRecipeCatalog topic="modules" />
    <aside class="demo__output">
      <strong>@use / @forward로 스타일 모듈을 설계하세요.</strong>
      <p>
        @forward로 공개 API를 모으고 @use '.../practice' as ui로 가져옵니다. 전역 이름 충돌을 줄이고
        모듈당 한 번만 평가합니다.
      </p>
    </aside>
    <ol class="module-steps">
      <li>
        <code>_tokens.scss</code>
        <span>!default 설정값과 Map</span>
      </li>
      <li>
        <code>_functions.scss</code>
        <span>space(), rem() 값 계산</span>
      </li>
      <li>
        <code>_mixins.scss</code>
        <span>surface(), stack(), respond()</span>
      </li>
      <li>
        <code>_index.scss</code>
        <span>@forward로 공개 진입점 구성</span>
      </li>
    </ol>
    <label>
      <input v-model="compact" type="checkbox" />
      모듈을 재사용한 Compact 카드
    </label>
    <article
      class="module-card"
      :class="{ 'module-card--compact': compact }"
      data-testid="module-card"
    >
      <h3>작은 모듈에서 시작하는 디자인 시스템</h3>
      <p>이 페이지를 포함한 SCSS 예제들은 실제로 같은 Sass 모듈을 가져와 컴파일합니다.</p>
      <code>
        padding: ui.space(6);
        <br />
        font-size: ui.rem(16px);
      </code>
    </article>
    <p class="demo__muted">
      코드 보기 → 파일 선택에서 _index.scss와 하위 파일까지 확인·복사할 수 있습니다. @use는 일반
      스타일 규칙보다 먼저 선언해야 합니다. !default 값은 첫 로드 시 @use … with (…)로 설정하세요.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/practice' as ui;
.demo {
  @include custom-scrollbar;
}

.module-steps {
  @include ui.auto-grid($min: 160px);
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: step;
  li {
    @include ui.surface(ui.space(4));
    @include ui.stack(ui.space(2));
    counter-increment: step;
    &::before {
      content: '0' counter(step);
      color: var(--primary);
      font-weight: 600;
    }
    code {
      overflow-wrap: anywhere;
    }
    span {
      font-size: ui.rem(12px);
      color: var(--muted);
    }
  }
}
.module-card {
  @include ui.surface(ui.space(6));
  @include ui.stack;
  h3 {
    font-size: ui.rem(18px);
  }
  p {
    font-size: ui.rem(14px);
    color: var(--muted);
  }
  code {
    color: var(--primary);
  }
  &--compact {
    padding: ui.space(3);
    gap: ui.space(2);
  }
}
</style>
