<script setup>
import { computed, watch } from 'vue';
const props = defineProps({
  total: { type: Number, default: 0 },
  pageSize: { type: Number, default: 5 }
});
const page = defineModel({ type: Number, default: 1 });
const count = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)));
const pages = computed(() =>
  Array.from({ length: count.value }, (_, i) => i + 1).filter(
    (n) => n === 1 || n === count.value || Math.abs(n - page.value) < 2
  )
);
watch(count, (value) => {
  if (page.value > value) page.value = value;
});
</script>
<template>
  <nav aria-label="페이지 탐색" class="base-pagination">
    <button :disabled="page <= 1" aria-label="이전 페이지" @click="page--">←</button>
    <button
      v-for="n in pages"
      :key="n"
      :aria-current="page === n ? 'page' : undefined"
      :class="{ 'base-pagination__page--active': page === n }"
      @click="page = n"
    >
      {{ n }}
    </button>
    <button :disabled="page >= count" aria-label="다음 페이지" @click="page++">→</button>
  </nav>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-pagination {
  @include flex-center;
  gap: 6px;
  button {
    padding: 6px 12px;
  }
  &__page--active {
    background: var(--primary);
    color: white;
  }
}
</style>
