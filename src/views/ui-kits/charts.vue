<script setup>
import { ref, computed } from 'vue';
import ActivityChart from '@/components/common/ActivityChart.vue';
const multiplier = ref(1);
const values = computed(() =>
  [22, 42, 35, 65, 48, 78, 62, 91].map((v) => Math.round(v * multiplier.value))
);
</script>
<template>
  <section class="demo">
    <label>
      데이터 배율
      <input v-model.number="multiplier" type="range" min="0.3" max="1" step="0.1" />
    </label>
    <ActivityChart :values="values" />
    <p class="demo__muted">
      외부 차트 라이브러리 없이 SVG를 Vue 상태와 연결했습니다. 포인트에 마우스나 키보드 포커스를
      올려 값을 확인하세요.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
