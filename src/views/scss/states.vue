<script setup>
import { ref } from 'vue';
const disabled = ref(false);
const busy = ref(false);
const count = ref(0);
</script>
<template>
  <section class="demo">
    <aside class="demo__output">
      <strong>Hover뿐 아니라 Focus, Disabled, Reduced Motion까지.</strong>
      <p>
        BEM 변형과 의사 클래스로 상태를 구분하세요. Tab 키로 버튼에 이동하면 공통 포커스 믹스인이
        적용됩니다.
      </p>
    </aside>
    <div class="demo__row">
      <label>
        <input v-model="disabled" type="checkbox" />
        비활성화
      </label>
      <label>
        <input v-model="busy" type="checkbox" />
        로딩 상태
      </label>
    </div>
    <div class="demo__row">
      <button
        v-for="variant in ['primary', 'outline', 'danger']"
        :key="variant"
        class="state-button"
        :class="['state-button--' + variant, { 'state-button--busy': busy }]"
        :disabled="disabled || busy"
        :aria-busy="busy"
        @click="count++"
      >
        <span v-if="busy" class="state-button__spinner" aria-hidden="true" />
        {{ busy ? '처리 중…' : variant }}
      </button>
    </div>
    <output class="demo__output" aria-live="polite">실행 횟수: {{ count }}</output>
    <p class="demo__muted">
      사용처: 저장·삭제 버튼. hover는 마우스 환경에서만 적용하고, 로딩 중에는 중복 클릭을
      차단하세요. 모션 감소 환경에서는 회전 애니메이션을 정지합니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/practice' as ui;
.demo {
  @include custom-scrollbar;
}

@mixin action($color, $solid: true) {
  border: 1px solid $color;
  @if $solid {
    background: $color;
    color: #fff;
  } @else {
    background: transparent;
    color: $color;
  }
  @media (hover: hover) {
    &:hover:not(:disabled) {
      filter: brightness(0.92);
    }
  }
}
.state-button {
  @include ui.cluster(ui.space(2));
  @include ui.focus-visible;
  justify-content: center;
  min-height: 44px;
  font-weight: 600;
  transition:
    transform 0.18s,
    filter 0.18s;
  &--primary {
    @include action(#4f46e5);
  }
  &--outline {
    @include action(var(--primary), $solid: false);
  }
  &--danger {
    @include action(#dc2626);
  }
  &:active:not(:disabled) {
    transform: translateY(1px);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &--busy {
    cursor: progress;
  }
  &__spinner {
    width: 14px;
    height: 14px;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: recipe-spin 0.7s linear infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &__spinner {
      animation: none;
    }
  }
}
@keyframes recipe-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
