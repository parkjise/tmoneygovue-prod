<script setup>
const module = {
  name: 'functions',
  heading: '공통 계산 함수',
  summary: 'space($step) · rem($pixels, $base)',
  notes: [
    'space($step)는 기본 간격 단위에 배수를 곱해 길이를 반환합니다.',
    'rem($pixels, $base: 16px)는 픽셀 길이를 rem 단위로 변환합니다.',
    'sass:math, sass:meta와 tokens 모듈에 의존합니다. 파일 선택에서 tokens 원본도 확인할 수 있습니다.'
  ]
};
const forwardCode = "@forward 'functions';";
const usage = "@use '@/assets/styles/practice' as ui;";
</script>
<template>
  <section class="demo forward-source">
    <header>
      <h3>{{ module.heading }}</h3>
      <p>src/assets/styles/practice/_{{ module.name }}.scss</p>
    </header>
    <section class="forward-source__entry">
      <p>_index.scss에서 공개하는 모듈</p>
      <code>{{ forwardCode }}</code>
    </section>
    <p class="forward-source__summary">{{ module.summary }}</p>
    <ul>
      <li v-for="note in module.notes" :key="note">{{ note }}</li>
    </ul>
    <section>
      <h4>프로젝트에서 가져오기</h4>
      <code class="forward-source__usage">{{ usage }}</code>
      <p class="demo__muted">
        @forward는 진입점에서 API를 공개하고, 사용처는 @use와 ui 네임스페이스로 접근합니다.
      </p>
    </section>
    <nav class="demo__row" aria-label="Practice 소스 탐색">
      <RouterLink to="/scss/practice-source">전체 진입점</RouterLink>
      <RouterLink
        v-for="name in ['tokens', 'functions', 'mixins'].filter((name) => name !== module.name)"
        :key="name"
        :to="'/scss/practice-' + name"
      >
        {{ name }} 원본 →
      </RouterLink>
    </nav>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.forward-source {
  @include custom-scrollbar;
  min-width: 0;
  header p {
    font-size: 12px;
    color: var(--caption);
    margin-top: 6px;
    overflow-wrap: anywhere;
  }
  &__entry {
    @include card-surface;
    padding: 16px;
    background: var(--soft);
    p {
      font-size: 12px;
      color: var(--muted);
      margin-bottom: 6px;
    }
    code {
      color: var(--primary);
    }
  }
  &__summary {
    font-size: 13px;
    font-weight: 600;
    overflow-wrap: anywhere;
  }
  ul {
    margin: 0;
    padding-left: 20px;
    font-size: 13px;
    color: var(--muted);
    li + li {
      margin-top: 8px;
    }
  }
  &__usage {
    display: block;
    padding: 14px 0;
    overflow-wrap: anywhere;
  }
  nav a {
    font-size: 12px;
    color: var(--primary);
    @include focus-ring;
  }
}
</style>
