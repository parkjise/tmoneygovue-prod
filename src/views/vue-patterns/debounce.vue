<script setup>
import { ref, computed, watch } from 'vue';
const input = ref('');
const query = ref('');
const category = ref('all');
const pending = ref(false);
const items = [
  { id: 1, name: 'Vue 3 Guide', category: '문서' },
  { id: 2, name: 'Vite Build', category: '도구' },
  { id: 3, name: 'Vue Router', category: '도구' },
  { id: 4, name: 'SCSS Design System', category: '문서' }
];
watch(input, (value, old, onCleanup) => {
  pending.value = true;
  const timer = setTimeout(() => {
    query.value = value.trim();
    pending.value = false;
  }, 350);
  onCleanup(() => clearTimeout(timer));
});
const results = computed(() =>
  items.filter(
    (i) =>
      i.name.toLowerCase().includes(query.value.toLowerCase()) &&
      (category.value === 'all' || i.category === category.value)
  )
);
</script>
<template>
  <section class="demo">
    <div class="demo__row">
      <label>
        검색
        <input v-model="input" placeholder="Vue를 검색해 보세요" />
      </label>
      <label>
        분류
        <select v-model="category" aria-label="분류">
          <option value="all">전체</option>
          <option>문서</option>
          <option>도구</option>
        </select>
      </label>
      <span role="status">
        {{ pending ? '입력 대기 중 (350ms)…' : results.length + '개 결과' }}
      </span>
    </div>
    <ul class="demo__list">
      <li v-for="item in results" :key="item.id" class="demo__item">
        {{ item.name }}
        <small>{{ item.category }}</small>
      </li>
    </ul>
    <p v-if="!results.length">검색 결과가 없습니다.</p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
