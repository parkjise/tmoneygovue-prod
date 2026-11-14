<script setup>
import ScssRecipeCatalog from '@/components/examples/ScssRecipeCatalog.vue';
import { ref } from 'vue';
const accent = ref('#6366f1');
const compact = ref(false);
const mode = ref('light');
</script>
<template>
  <section class="demo">
    <ScssRecipeCatalog topic="tokens" />
    <aside class="demo__output">
      <strong>색상·간격을 토큰으로 통일하세요.</strong>
      <p>
        Sass 변수는 빌드 시 고정됩니다. 사용자 테마처럼 실행 중 바뀌는 값은 CSS Custom Properties로
        전달하세요.
      </p>
    </aside>
    <div class="demo__row">
      <label>
        브랜드 색상
        <input v-model="accent" type="color" />
      </label>
      <label>
        <input v-model="compact" type="checkbox" />
        Compact
      </label>
      <label>
        로컬 테마
        <select v-model="mode">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
    </div>
    <article
      class="token-card"
      :class="{ 'token-card--compact': compact, 'token-card--dark': mode === 'dark' }"
      :style="{ '--recipe-accent': accent }"
    >
      <span class="token-card__badge">DESIGN TOKENS</span>
      <h3>한 번 정의하고, 일관되게 사용하기</h3>
      <p>
        간격은 ui.space(6), 반경은 ui.$radius를 사용합니다. 색상은 --recipe-accent를 통해 실시간으로
        변경됩니다.
      </p>
      <button>브랜드 액션</button>
    </article>
    <p class="demo__muted">
      사용처: 화이트라벨 서비스, 브랜드 테마, 밀도 설정. 전역 변수를 덮어쓰지 않고 컴포넌트 범위에
      CSS 변수를 선언하세요.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/practice' as ui;
.demo {
  @include custom-scrollbar;
}

.token-card {
  --recipe-accent: #6366f1;
  --recipe-bg: #fff;
  --recipe-text: #0f172a;
  @include ui.stack(ui.space(4));
  padding: ui.space(6);
  border: 1px solid var(--recipe-accent);
  border-radius: ui.$radius;
  background: var(--recipe-bg);
  color: var(--recipe-text);
  &--compact {
    padding: ui.space(3);
    gap: ui.space(2);
  }
  &--dark {
    --recipe-bg: #1a1e2e;
    --recipe-text: #f1f5f9;
  }
  &__badge {
    color: var(--recipe-accent);
    font-size: ui.rem(11px);
    letter-spacing: 0.12em;
  }
  h3 {
    font-size: ui.rem(20px);
  }
  p {
    max-width: 65ch;
    font-size: ui.rem(14px);
  }
  button {
    align-self: flex-start;
    border-color: var(--recipe-accent);
    color: var(--recipe-accent);
    background: transparent;
  }
}
</style>
