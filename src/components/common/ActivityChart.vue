<script setup>
import { computed, ref, useId } from 'vue';
const props = defineProps({
  values: { type: Array, default: () => [32, 48, 39, 68, 52, 79, 66, 88, 73, 91, 78, 98] },
  secondary: { type: Array, default: () => [18, 28, 23, 37, 31, 48, 37, 56, 49, 65, 52, 72] },
  labels: { type: Array, default: () => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  height: { type: Number, default: 210 }
});
const active = ref(-1);
const gradientId = useId();
const points = computed(() =>
  props.values
    .map((v, i) => `${40 + (i * 660) / Math.max(props.values.length - 1, 1)},${180 - v * 1.5}`)
    .join(' ')
);
const secondaryPoints = computed(() =>
  props.secondary
    .map((v, i) => `${40 + (i * 660) / Math.max(props.secondary.length - 1, 1)},${180 - v * 1.5}`)
    .join(' ')
);
</script>
<template>
  <figure class="activity-chart">
    <svg
      viewBox="0 0 740 225"
      role="img"
      aria-label="활동 추이 차트"
      :style="{ height: height + 'px' }"
    >
      <defs>
        <linearGradient :id="gradientId" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#6366f1" stop-opacity=".18" />
          <stop offset="100%" stop-color="#6366f1" stop-opacity="0" />
        </linearGradient>
      </defs>
      <g v-for="(n, i) in [100, 75, 50, 25, 0]" :key="n">
        <line
          x1="40"
          x2="710"
          :y1="30 + i * 38"
          :y2="30 + i * 38"
          stroke="currentColor"
          stroke-opacity=".08"
          stroke-dasharray="3 5"
        />
        <text x="6" :y="34 + i * 38" fill="currentColor" opacity=".45" font-size="9">{{ n }}k</text>
      </g>
      <polygon :points="'40,180 ' + points + ' 700,180'" :fill="`url(#${gradientId})`" />
      <polyline
        :points="secondaryPoints"
        fill="none"
        stroke="#b7a3ed"
        stroke-width="2"
        stroke-dasharray="5 5"
        stroke-linejoin="round"
      />
      <polyline
        :points="points"
        fill="none"
        stroke="#6366f1"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <g v-for="(value, i) in values" :key="i">
        <circle
          :cx="40 + (i * 660) / Math.max(values.length - 1, 1)"
          :cy="180 - value * 1.5"
          r="7"
          fill="transparent"
          tabindex="0"
          :aria-label="`포인트 ${i + 1}: ${value}천`"
          @mouseenter="active = i"
          @mouseleave="active = -1"
          @focus="active = i"
          @blur="active = -1"
        />
        <text
          v-if="active === i"
          :x="40 + (i * 660) / Math.max(values.length - 1, 1)"
          :y="165 - value * 1.5"
          text-anchor="middle"
          fill="currentColor"
          font-size="10"
        >
          {{ value }}k
        </text>
      </g>
      <text
        v-for="(label, i) in labels"
        :key="label"
        :x="40 + (i * 660) / Math.max(labels.length - 1, 1)"
        y="212"
        text-anchor="middle"
        fill="currentColor"
        opacity=".5"
        font-size="10"
      >
        {{ label }}
      </text>
    </svg>
    <figcaption class="activity-chart__caption">
      실행 수(실선) · 이전 기간(점선), 단위: 천 회
    </figcaption>
  </figure>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.activity-chart {
  margin: 0;
  width: 100%;
  svg {
    width: 100%;
    overflow: visible;
  }
  &__caption {
    font-size: 10px;
    color: var(--caption);
    text-align: center;
  }
}
</style>
