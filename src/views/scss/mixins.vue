<script setup>
import { ref } from 'vue';
import MixinCatalog from '@/components/examples/MixinCatalog.vue';
const density = ref('comfortable');
const panelWidth = ref(660);
const lines = ref(2);
const expanded = ref(false);
const sampleText =
  '긴 설명은 카드의 높이를 크게 만들 수 있습니다. line-clamp로 표시 줄 수를 제한하고, 중요한 정보에는 전체 내용을 펼쳐서 읽는 동작을 함께 제공합니다. 부모 너비가 달라져도 텍스트가 안전하게 줄바꿈되도록 설계하세요. 여러 문장이 이어져도 목록에서 균일한 높이를 유지할 수 있습니다.';
const align = ref('center');
const elevated = ref(true);
</script>
<template>
  <section class="demo">
    <MixinCatalog />
    <section class="mixin-live" aria-label="공통 믹스인 동작 예시">
      <h3>추가한 믹스인, 화면에서 확인하기</h3>
      <label>
        데모 부모 너비 {{ panelWidth }}px
        <input v-model.number="panelWidth" type="range" min="260" max="900" step="20" />
      </label>
      <div class="mixin-live__container" :style="{ width: panelWidth + 'px' }">
        <section class="mixin-live__grid">
          <article v-for="number in 4" :key="number">
            <strong>카드 {{ number }}</strong>
            <p>auto-grid · 최소 180px</p>
          </article>
        </section>
        <section class="mixin-live__query">
          <strong>container-query</strong>
          <p>부모가 480px 이상이면 이 영역은 2열입니다.</p>
        </section>
      </div>
      <section class="mixin-live__panel">
        <h4>line-clamp · 줄 수 제한</h4>
        <label>
          표시 줄 수
          <select v-model.number="lines" aria-label="말줄임 줄 수">
            <option :value="1">1줄</option>
            <option :value="2">2줄</option>
            <option :value="3">3줄</option>
          </select>
        </label>
        <p class="mixin-live__text" :class="expanded ? '' : 'mixin-live__text--' + lines">
          {{ sampleText }}
        </p>
        <button :aria-expanded="expanded" @click="expanded = !expanded">
          {{ expanded ? '접기' : '전체 설명 보기' }}
        </button>
      </section>
      <section class="mixin-live__panel">
        <h4>field-base · placeholder · focus-ring</h4>
        <label>
          프로젝트 이름
          <input class="mixin-live__input" placeholder="키보드 Tab으로 포커스를 확인하세요" />
        </label>
        <div class="mixin-live__actions">
          <button class="mixin-live__icon" type="button">
            <span aria-hidden="true">＋</span>
            <span class="mixin-live__sr">새 프로젝트 추가 예시</span>
          </button>
          <span>touch-target + visually-hidden · 아이콘 버튼에 접근 가능한 이름 제공</span>
          <button class="mixin-live__disabled" disabled>비활성 버튼</button>
        </div>
      </section>
      <section class="mixin-live__panel">
        <h4>horizontal-scroll · 카드 목록</h4>
        <div class="mixin-live__scroll" tabindex="0" aria-label="가로 스크롤 카드">
          <article v-for="number in 6" :key="number">카드 {{ number }}</article>
        </div>
      </section>
      <section class="mixin-live__panel" aria-label="스켈레톤 모양 예시">
        <h4>skeleton · 로딩 자리표시자</h4>
        <p>모양을 보여주는 상시 데모입니다. 운영체제의 움직임 줄이기 설정에서는 정지합니다.</p>
        <span class="mixin-live__skeleton" aria-hidden="true" />
      </section>
    </section>
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

.mixin-live {
  @include stack(20px);
  min-width: 0;
  padding-block: 24px;
  border-block: 1px solid var(--border);
  label {
    @include stack(8px);
    font-size: 12px;
  }
  h3 {
    font-size: 18px;
  }
  h4 {
    font-size: 14px;
    margin-bottom: 12px;
  }
  p {
    font-size: 12px;
    line-height: 1.8;
  }
  &__container {
    @include container-context(card);
    max-width: 100%;
  }
  &__grid {
    @include auto-grid(180px, 12px);
    article {
      @include card-surface;
      @include stack(8px);
      padding: 16px;
    }
  }
  &__query {
    @include stack(8px);
    padding: 16px;
    margin-top: 12px;
    background: var(--soft);
    border-radius: 8px;
    @include container-query(480px, card) {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  &__panel {
    @include stack(12px);
    padding: 18px;
    border: 1px solid var(--border);
    border-radius: 10px;
    min-width: 0;
  }
  &__text {
    max-width: 360px;
    &--1 {
      @include line-clamp(1);
    }
    &--2 {
      @include line-clamp(2);
    }
    &--3 {
      @include line-clamp(3);
    }
  }
  &__input {
    @include field-base;
    @include placeholder(var(--muted));
    @include focus-ring;
  }
  &__actions {
    @include cluster(12px);
    span {
      font-size: 11px;
      color: var(--muted);
    }
  }
  &__icon {
    @include button-reset;
    @include touch-target;
    @include focus-ring;
    border: 1px solid var(--border);
    border-radius: 8px;
    @include hover-capable {
      background: var(--soft);
    }
  }
  &__sr {
    @include visually-hidden;
  }
  &__disabled {
    @include disabled-state;
  }
  &__scroll {
    @include horizontal-scroll(12px);
    padding: 5px;
    article {
      width: 180px;
      padding: 25px;
      border: 1px solid var(--border);
      border-radius: 8px;
    }
  }
  &__skeleton {
    @include skeleton;
    display: block;
    height: 64px;
    border-radius: 8px;
  }
}
</style>
