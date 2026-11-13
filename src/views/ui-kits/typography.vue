<script setup>
import { ref } from 'vue';
const scale = ref(1);
</script>
<template>
  <section class="demo">
    <label>
      배율
      <input v-model.number="scale" type="range" min="0.8" max="1.4" step="0.1" />
    </label>
    <article class="typography" :style="{ fontSize: scale + 'rem' }">
      <h1>Design with intention.</h1>
      <h2>좋은 인터페이스의 시작</h2>
      <h3>일관된 타입 스케일</h3>
      <p>
        읽기 편한 문장은 분명한 계층에서 시작합니다.
        <strong>굵게 강조</strong>
        ,
        <em>기울임</em>
        ,
        <mark>중요한 정보</mark>
        를 적절하게 사용하세요.
      </p>
      <blockquote>작은 디테일이 좋은 경험을 만듭니다.</blockquote>
      <code>const idea = ref('hello')</code>
    </article>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.typography {
  display: grid;
  gap: 18px;
  h1 {
    font-size: 2em;
    letter-spacing: -1px;
  }
  h2 {
    font-size: 1.5em;
  }
  h3 {
    font-size: 1.2em;
  }
  p {
    font-size: 1em;
    color: var(--muted);
  }
  blockquote {
    border-left: 3px solid var(--primary);
    margin: 0;
    padding: 12px 20px;
    background: var(--soft);
  }
}
</style>
