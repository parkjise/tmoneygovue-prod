<script setup>
import BaseAccordion from '@/components/common/BaseAccordion.vue';
const items = [
  { title: '개요', content: 'Vue 3 표준 문법과 재사용 가능한 UI를 제공합니다.' },
  { title: '설치 방법', content: 'npm install 후 npm run dev로 개발 서버를 실행하세요.' },
  {
    title: '소스 코드',
    content: '하단 코드 보기에서 전체 Vue 파일과 의존 파일을 확인할 수 있습니다.'
  }
];
</script>
<template>
  <section class="demo">
    <BaseAccordion :items="items" />
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
