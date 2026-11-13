<script setup>
const files = [
  {
    name: '_index.scss',
    path: '/scss/practice-source',
    description: '@forward로 토큰·함수·믹스인을 공개하는 진입점'
  },
  {
    name: '_tokens.scss',
    path: '/scss/practice-tokens',
    description: '$unit, $radius, $breakpoints, $tones 기본값'
  },
  {
    name: '_functions.scss',
    path: '/scss/practice-functions',
    description: 'space($step), rem($pixels, $base) 계산과 인자 검사'
  },
  {
    name: '_mixins.scss',
    path: '/scss/practice-mixins',
    description:
      'stack, cluster, surface, respond, container-up, truncate, focus-visible, auto-grid'
  }
];
const usage =
  "@use '@/assets/styles/practice' as ui;\n\n.my-card {\n  @include ui.surface($padding: ui.space(6));\n  @include ui.stack(ui.space(4));\n  font-size: ui.rem(16px);\n}";
</script>
<template>
  <section class="demo practice-source">
    <header>
      <h3>@/assets/styles/practice</h3>
      <p>실제 진입점: src/assets/styles/practice/_index.scss</p>
    </header>
    <p class="demo__muted">
      폴더 경로를 @use하면 _index.scss를 읽습니다. 아래 파일 선택에서 진입점과 @forward / @use 의존
      파일 4개의 원본을 각각 확인·복사하세요.
    </p>
    <ul class="practice-source__files">
      <li v-for="file in files" :key="file.name">
        <RouterLink :to="file.path">
          <code>{{ file.name }} ↗</code>
        </RouterLink>
        <p>{{ file.description }}</p>
      </li>
    </ul>
    <section>
      <h4>컴포넌트에서 사용하기</h4>
      <pre class="demo__output"><code>{{ usage }}</code></pre>
    </section>
    <p class="demo__muted">
      surface·색상 등 런타임 테마는 전역 main.scss의 CSS 변수를 사용합니다. Sass 모듈은 빌드 시
      컴파일되며, ui 네임스페이스로 공통 Mixin과 이름이 충돌하지 않게 구성합니다.
    </p>
    <RouterLink to="/scss/modules">모듈·함수 설계 예제 보기 →</RouterLink>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/practice' as ui;
.practice-source {
  @include custom-scrollbar;
  min-width: 0;
  h3 {
    overflow-wrap: anywhere;
  }
  header p {
    font-size: 12px;
    color: var(--caption);
    margin-top: 6px;
  }
  &__files {
    @include ui.auto-grid(200px);
    padding: 0;
    margin: 0;
    list-style: none;
    li {
      @include ui.surface(ui.space(4));
      min-width: 0;
    }
    code {
      color: var(--primary);
    }
    p {
      font-size: 12px;
      color: var(--muted);
      margin-top: 8px;
      overflow-wrap: anywhere;
    }
  }
  pre {
    overflow: auto;
    @include custom-scrollbar;
    font-size: 12px;
    line-height: 1.8;
  }
  a {
    color: var(--primary);
    font-size: 12px;
  }
}
</style>
