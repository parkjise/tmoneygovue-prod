<script setup>
import { ref } from 'vue';
const tone = ref('primary');
const size = ref('md');
const spacing = ref(3);
</script>
<template>
  <section class="demo">
    <aside class="demo__output">
      <strong>@each와 Map으로 변형을 생성하세요.</strong>
      <p>
        상태별 색상과 사이즈는 Map으로 관리하고, 제한된 간격 스케일은 @for로 생성합니다. 생성하는
        클래스 수는 필요한 범위로 제한하세요.
      </p>
    </aside>
    <div class="demo__row">
      <label>
        상태
        <select v-model="tone" aria-label="상태 색상">
          <option>primary</option>
          <option>success</option>
          <option>warning</option>
          <option>danger</option>
        </select>
      </label>
      <label>
        크기
        <select v-model="size" aria-label="뱃지 크기">
          <option>sm</option>
          <option>md</option>
          <option>lg</option>
        </select>
      </label>
      <label>
        간격 단계 {{ spacing }}
        <input v-model.number="spacing" type="range" min="1" max="6" aria-label="간격 단계" />
      </label>
    </div>
    <section class="loop-demo" :class="'loop-demo--space-' + spacing">
      <span
        class="loop-badge"
        :class="['loop-badge--' + tone, 'loop-badge--' + size]"
        data-testid="generated-badge"
      >
        {{ tone }} · {{ size }}
      </span>
      <span class="loop-badge" :class="['loop-badge--' + tone, 'loop-badge--' + size]">
        자동 생성된 변형
      </span>
    </section>
    <div class="demo__row">
      <span
        v-for="t in ['primary', 'success', 'warning', 'danger']"
        :key="t"
        class="loop-badge loop-badge--md"
        :class="'loop-badge--' + t"
      >
        {{ t }}
      </span>
    </div>
    <p class="demo__muted">
      사용처: 상태 뱃지, 버튼 사이즈, 제한된 유틸리티. Sass Map과 Vue 옵션은 값이 서로 일치하도록
      관리하세요.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/practice' as ui;
@use 'sass:color';
@use 'sass:list';
.demo {
  @include custom-scrollbar;
}
.loop-badge {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  font-weight: 600;
  @each $name, $color in ui.$tones {
    &--#{$name} {
      color: color.adjust($color, $lightness: -18%);
      background: color.change($color, $alpha: 0.12);
      border: 1px solid color.change($color, $alpha: 0.3);
    }
  }
  $sizes: (
    sm: (
      4px,
      9px,
      11px
    ),
    md: (
      6px,
      12px,
      13px
    ),
    lg: (
      8px,
      16px,
      15px
    )
  );
  @each $name, $values in $sizes {
    &--#{$name} {
      padding: list.nth($values, 1) list.nth($values, 2);
      font-size: list.nth($values, 3);
    }
  }
}
.loop-demo {
  @include ui.surface;
  @include ui.cluster;
  @for $step from 1 through 6 {
    &--space-#{$step} {
      gap: ui.space($step);
      padding: ui.space($step);
    }
  }
}
</style>
