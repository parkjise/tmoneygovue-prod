<script setup>
import ScssRecipeCatalog from '@/components/examples/ScssRecipeCatalog.vue';
const module = {
  name: 'tokens',
  heading: '디자인 토큰',
  summary: '기본 4종 + 간격·반경·글자·레이어·모션 등 토큰 15개 그룹',
  notes: [
    '빌드 시 사용하는 기본 간격·반경·브레이크포인트·상태 색상을 정의합니다.',
    '!default로 선언되어 첫 @use 시 with (…)로 설정할 수 있습니다.',
    '브라우저에서 바뀌는 테마 값은 Sass 변수 대신 CSS 변수를 사용하세요.'
  ]
};
const forwardCode = "@forward 'tokens';";
const usage = "@use '@/assets/styles/practice' as ui;";
</script>
<template>
  <section class="demo forward-source">
    <ScssRecipeCatalog topic="practice-tokens" />
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
