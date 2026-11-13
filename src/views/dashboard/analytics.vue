<script setup>
import { ref, computed } from 'vue';
import ActivityChart from '@/components/common/ActivityChart.vue';
const period = ref('week');
const metrics = [
  ['방문자', '38,492'],
  ['페이지뷰', '128,940'],
  ['평균 체류', '3m 42s'],
  ['이탈률', '28.4%']
];
const values = computed(() =>
  period.value === 'week' ? [22, 41, 35, 68, 52, 73, 65, 92] : [31, 25, 48, 44, 61, 70, 58, 88]
);
</script>
<template>
  <section class="demo">
    <header class="demo__row">
      <h2>Audience overview</h2>
      <label>
        기간
        <select v-model="period">
          <option value="week">이번 주</option>
          <option value="month">이번 달</option>
        </select>
      </label>
    </header>
    <section class="demo__grid">
      <article v-for="(metric, i) in metrics" :key="metric[0]" class="demo__panel metric">
        <small>{{ metric[0] }}</small>
        <strong>
          {{ period === 'week' ? metric[1] : ['128,240', '486,392', '4m 12s', '24.8%'][i] }}
        </strong>
        <p>↗ {{ 8 + i * 3 }}.2% 지난 기간 대비</p>
      </article>
    </section>
    <article class="demo__panel">
      <h3>추이 분석</h3>
      <ActivityChart :values="values" />
    </article>
    <p class="demo__muted">기간별 샘플 데이터를 사용한 인터랙티브 대시보드입니다.</p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.metric {
  display: grid;
  gap: 10px;
  small {
    color: var(--muted);
  }
  strong {
    font-size: 28px;
  }
  p {
    color: var(--success);
    font-size: 11px;
  }
}
</style>
