<script setup>
import { ref, computed } from 'vue';
import ActivityChart from '@/components/common/ActivityChart.vue';
const mode = ref('conversations');
const values = computed(() =>
  mode.value === 'conversations'
    ? [25, 40, 35, 60, 55, 80, 65, 95]
    : [18, 25, 32, 40, 48, 65, 72, 85]
);
</script>
<template>
  <section class="demo">
    <label>
      지표
      <select v-model="mode">
        <option value="conversations">대화 수</option>
        <option value="contacts">신규 연락처</option>
      </select>
    </label>
    <ActivityChart :values="values" />
    <p class="demo__muted">순수 SVG · 키보드로 각 데이터 포인트에 접근할 수 있습니다.</p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
