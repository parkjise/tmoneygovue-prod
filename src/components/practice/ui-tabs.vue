<script setup>
import { ref, computed } from 'vue';
const selected = ref('intro');
const tabs = [
  { id: 'intro', label: '소개', content: '서비스를 소개합니다.' },
  { id: 'price', label: '가격', content: '기본 요금은 월 10,000원입니다.' },
  { id: 'review', label: '후기', content: '사용자 후기를 확인하세요.' }
];
const current = computed(() => tabs.find((tab) => tab.id === selected.value));
</script>
<template>
  <section class="workshop">
    <nav class="row" aria-label="콘텐츠 선택">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="{ active: selected === tab.id }"
        :aria-pressed="selected === tab.id"
        @click="selected = tab.id"
      >
        {{ tab.label }}
      </button>
    </nav>
    <section class="box">
      <h3>{{ current.label }}</h3>
      <p>{{ current.content }}</p>
    </section>
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
