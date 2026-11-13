<script setup>
import { ref } from 'vue';
import BaseRating from '@/components/common/BaseRating.vue';
const rating = ref(4);
</script>
<template>
  <section class="demo">
    <BaseRating v-model="rating" label="사용 경험" />
    <output class="demo__output">{{ rating }}점 · 키보드 방향키로도 조작할 수 있습니다.</output>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
