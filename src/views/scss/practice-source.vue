<script setup>
import SyntaxCode from '@/components/common/SyntaxCode.vue';
import ScssRecipeCatalog from '@/components/examples/ScssRecipeCatalog.vue';
const files = [
  {
    name: '_index.scss',
    path: '/scss/practice-source',
    description: '@forward로 토큰·함수·믹스인을 공개하는 진입점'
  },
  {
    name: '_tokens.scss',
    path: '/scss/practice-tokens',
    description: '기본값과 간격·반경·폰트·레이어·모션 등 토큰 15개 그룹'
  },
  {
    name: '_functions.scss',
    path: '/scss/practice-functions',
    description: '단위·토큰·색상·타입·모션 계산 함수 16종과 인자 검사'
  },
  {
    name: '_mixins.scss',
    path: '/scss/practice-mixins',
    description: '레이아웃·반응형과 토큰 기반 UI를 구성하는 믹스인 24종'
  }
];
const usage =
  "@use '@/assets/styles/practice' as ui;\n\n.my-card {\n  @include ui.surface($padding: ui.space(6));\n  @include ui.stack(ui.space(4));\n  font-size: ui.rem(16px);\n}";
</script>
<template>
  <section class="demo practice-source">
    <ScssRecipeCatalog topic="practice-source" />
    <header>
      <h3>@/assets/styles/practice</h3>
      <p>실제 진입점: src/assets/styles/practice/_index.scss</p>
    </header>
    <p class="demo__muted">
      폴더 경로를 @use하면 _index.scss를 읽습니다. 아래 파일 선택에서 진입점과 @forward / @use 의존
      파일과 추가 공통 의존성의 원본을 각각 확인·복사하세요.
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
      <SyntaxCode :code="usage" language="scss" label="Practice 모듈 사용 예시" />
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
