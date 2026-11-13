<script setup>
import { ref, computed } from 'vue';
const index = ref(0);
const slides = [
  { title: 'Create with curiosity.', text: '아이디어를 실험하는 공간', color: '#eeebff' },
  { title: 'Build with Vue.', text: '반응형 UI를 손쉽게', color: '#e5f4ef' },
  { title: 'Make it yours.', text: '작은 디테일로 완성하세요', color: '#fff0df' }
];
const slide = computed(() => slides[index.value]);
function move(n) {
  index.value = (index.value + n + slides.length) % slides.length;
}
</script>
<template>
  <section class="demo">
    <section
      class="carousel"
      aria-roledescription="캐러셀"
      aria-label="프로젝트 소개"
      @keydown.left="move(-1)"
      @keydown.right="move(1)"
    >
      <article :style="{ background: slide.color }" aria-live="polite">
        <small>{{ index + 1 }} / {{ slides.length }}</small>
        <h2>{{ slide.title }}</h2>
        <p>{{ slide.text }}</p>
      </article>
      <footer>
        <button aria-label="이전 슬라이드" @click="move(-1)">←</button>
        <button
          v-for="(_, i) in slides"
          :key="i"
          :aria-label="i + 1 + '번 슬라이드'"
          :aria-pressed="index === i"
          @click="index = i"
        >
          {{ i + 1 }}
        </button>
        <button aria-label="다음 슬라이드" @click="move(1)">→</button>
      </footer>
    </section>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.carousel {
  article {
    padding: 60px 30px;
    text-align: center;
    border-radius: 14px;
    color: #514b66;
    h2 {
      font-size: 30px;
      margin: 12px 0;
    }
    p {
      color: #8d849e;
    }
  }
  footer {
    @include flex-center;
    gap: 8px;
    margin-top: 18px;
    button[aria-pressed='true'] {
      background: var(--primary);
      color: white;
    }
  }
}
</style>
