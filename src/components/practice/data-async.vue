<script setup>
import { ref, onUnmounted } from 'vue';
const loading = ref(false);
const fail = ref(false);
const error = ref('');
const rows = ref([]);
const loaded = ref(false);
let timer;
function load() {
  if (loading.value) return;
  const shouldFail = fail.value;
  loading.value = true;
  error.value = '';
  loaded.value = false;
  rows.value = [];
  timer = setTimeout(() => {
    if (shouldFail) error.value = '조회에 실패했습니다. 다시 시도하세요.';
    else {
      rows.value = ['컴포넌트 설계', '접근성 검토'];
      loaded.value = true;
    }
    loading.value = false;
  }, 650);
}
onUnmounted(() => clearTimeout(timer));
</script>
<template>
  <section class="workshop">
    <label>
      <input v-model="fail" :disabled="loading" type="checkbox" />
      실패 테스트
    </label>
    <button :disabled="loading" @click="load">{{ loading ? '조회 중…' : '조회 / 재시도' }}</button>
    <p v-if="loading" role="status">불러오는 중입니다.</p>
    <p v-else-if="error" class="error" role="alert">{{ error }}</p>
    <ul v-else-if="loaded">
      <li v-for="row in rows" :key="row">{{ row }}</li>
    </ul>
    <p v-else>조회 전입니다.</p>
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
