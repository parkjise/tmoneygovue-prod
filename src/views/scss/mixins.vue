<script setup>
import { ref } from 'vue';
const density = ref('comfortable');
const align = ref('center');
const elevated = ref(true);
</script>
<template>
  <section class="demo">
    <aside class="demo__output">
      <strong>반복되는 선언 묶음을 @mixin으로 추출하세요.</strong>
      <p>
        기본값, 이름 있는 인자, @content를 조합하면 변형이 많은 카드와 툴바도 한 곳에서 관리할 수
        있습니다.
      </p>
    </aside>
    <div class="demo__row">
      <label>
        간격
        <select v-model="density" aria-label="믹스인 간격">
          <option value="comfortable">Comfortable · 24px</option>
          <option value="compact">Compact · 12px</option>
        </select>
      </label>
      <label>
        정렬
        <select v-model="align" aria-label="믹스인 정렬">
          <option value="center">Center</option>
          <option value="start">Start</option>
        </select>
      </label>
      <label>
        <input v-model="elevated" type="checkbox" />
        그림자
      </label>
    </div>
    <article
      class="mixin-card"
      :class="['mixin-card--' + density, { 'mixin-card--flat': !elevated }]"
      data-testid="mixin-card"
    >
      <header
        class="mixin-card__toolbar"
        :class="{ 'mixin-card__toolbar--start': align === 'start' }"
      >
        <span class="mixin-card__icon">✦</span>
        <section>
          <h3>Reusable surface</h3>
          <p>surface($padding, $radius) + @content</p>
        </section>
        <button>작업 추가</button>
      </header>
      <p>
        같은 믹스인을 사용하면서 인자로 간격을 조정합니다. @content 블록에서는 카드마다 필요한
        테두리만 추가합니다.
      </p>
      <footer><code>@include ui.surface($padding: ui.space(6))</code></footer>
    </article>
    <p class="demo__muted">
      사용처: 카드, 버튼 변형, flex 툴바. 값 하나만 반환한다면 @function을 사용하고, 여러 CSS 선언을
      출력한다면 @mixin을 사용하세요.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/practice' as ui;
.demo {
  @include custom-scrollbar;
}

.mixin-card {
  @include ui.surface($padding: ui.space(6), $radius: 16px) {
    border-left: 3px solid var(--primary);
  }
  @include ui.stack(ui.space(5));
  &--compact {
    @include ui.surface($padding: ui.space(3));
    @include ui.stack(ui.space(3));
    border-left: 3px solid var(--primary);
  }
  &--flat {
    box-shadow: none;
  }
  &__toolbar {
    @include ui.cluster($gap: ui.space(3), $align: center);
    button {
      margin-left: auto;
    }
    &--start {
      align-items: flex-start;
    }
  }
  &__icon {
    @include flex-center;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: var(--soft);
    color: var(--primary);
    font-size: 24px;
  }
  h3 {
    font-size: ui.rem(16px);
  }
  p {
    font-size: ui.rem(13px);
    color: var(--muted);
  }
  footer {
    border-top: 1px solid var(--border);
    padding-top: ui.space(3);
    overflow-wrap: anywhere;
    color: var(--primary);
  }
}
</style>
