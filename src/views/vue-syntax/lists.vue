<script setup>
import { ref, computed } from 'vue';
const query = ref('');
const tasks = ref([
  { id: 1, name: '컴포넌트 설계', done: true },
  { id: 2, name: 'API 연결', done: false },
  { id: 3, name: '접근성 검토', done: false }
]);
const profile = { name: 'Jise', role: 'Frontend', framework: 'Vue 3' };
const filtered = computed(() => tasks.value.filter((t) => t.name.includes(query.value)));
</script>
<template>
  <section class="demo">
    <label>
      할 일 검색
      <input v-model="query" placeholder="API" />
    </label>
    <ul class="demo__list">
      <template v-for="(task, index) in filtered" :key="task.id">
        <li class="demo__item">
          <label>
            <input v-model="task.done" type="checkbox" />
            {{ index + 1 }}. {{ task.name }}
          </label>
          <code>:key="{{ task.id }}"</code>
        </li>
      </template>
    </ul>
    <p v-if="!filtered.length">검색 결과가 없습니다.</p>
    <dl class="demo__output">
      <template v-for="(value, key, index) in profile" :key="key">
        <dt>{{ index + 1 }} · {{ key }}</dt>
        <dd>{{ value }}</dd>
      </template>
    </dl>
    <p class="demo__muted">필터링은 computed에서 처리하고 안정적인 고유 ID를 key로 사용합니다.</p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
