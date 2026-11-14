<script setup>
import MixinCatalog from '@/components/examples/MixinCatalog.vue';
const importCode = "@use '@/assets/styles/mixins' as mix;";
</script>
<template>
  <section class="demo mixin-source">
    <header>
      <h3>@/assets/styles/mixins</h3>
      <p>실제 파일: src/assets/styles/_mixins.scss</p>
    </header>
    <code class="demo__output">{{ importCode }}</code>
    <p class="demo__muted">
      실제 공통 모듈을 40종으로 확장했습니다. 기존 호출을 유지하면서
      레이아웃·반응형·텍스트·접근성·컨트롤·스크롤 패턴을 추가했습니다. 각 정의에는 인자와 기본값,
      예시, 주의사항을 주석으로 적었습니다.
    </p>
    <MixinCatalog />
    <RouterLink to="/scss/mixins">실제 화면에서 믹스인 동작 확인하기 →</RouterLink>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.mixin-source {
  @include custom-scrollbar;
  min-width: 0;
  h3,
  code {
    overflow-wrap: anywhere;
  }
  header p {
    color: var(--caption);
    font-size: 12px;
    margin-top: 6px;
  }
  a {
    color: var(--primary);
    font-size: 12px;
  }
}
</style>
