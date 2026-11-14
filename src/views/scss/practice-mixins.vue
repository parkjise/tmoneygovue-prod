<script setup>
import ScssRecipeCatalog from '@/components/examples/ScssRecipeCatalog.vue';
const module = {
  name: 'mixins',
  heading: '실무 스타일 믹스인',
  summary: '기존 8종 + 토큰 기반 button · badge · input · overlay 등 총 24종',
  notes: [
    '레이아웃·표면·반응형·말줄임·포커스 스타일을 재사용하는 믹스인 모듈입니다.',
    'surface, respond, container-up은 @content 블록을 받아 스타일을 확장합니다.',
    'tokens와 functions를 함께 사용합니다. 파일 선택에 필요한 의존 파일도 제공됩니다.'
  ]
};
const forwardCode = "@forward 'mixins';";
const usage = "@use '@/assets/styles/practice' as ui;";
</script>
<template>
  <section class="demo forward-source">
    <ScssRecipeCatalog topic="practice-mixins" />
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
