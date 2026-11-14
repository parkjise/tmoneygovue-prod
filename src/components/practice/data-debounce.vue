<script setup>
import { ref, computed, watch } from 'vue';
const input = ref('');
const query = ref('');
const waiting = ref(false);
const items = ['Vue Guide', 'Vite Build', 'Vue Router'];
watch(input, (value, _old, onCleanup) => {
  waiting.value = true;
  const timer = setTimeout(() => {
    query.value = value.trim();
    waiting.value = false;
  }, 350);
  onCleanup(() => clearTimeout(timer));
});
const results = computed(() =>
  items.filter((item) => item.toLowerCase().includes(query.value.toLowerCase()))
);
</script>
<template>
  <section class="workshop">
    <label>
      검색
      <input v-model="input" placeholder="Vue" />
    </label>
    <p role="status">{{ waiting ? '입력 대기 중…' : results.length + '개 결과' }}</p>
    <ul>
      <li v-for="item in results" :key="item">{{ item }}</li>
    </ul>
    <p v-if="!results.length">검색 결과가 없습니다.</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
