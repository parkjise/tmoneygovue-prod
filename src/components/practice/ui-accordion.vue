<script setup>
import { ref, useId } from 'vue';
const openId = ref(null);
const uid = useId();
const items = [
  { id: 1, question: '배송은 얼마나 걸리나요?', answer: '영업일 기준 2~3일입니다.' },
  { id: 2, question: '반품은 어떻게 하나요?', answer: '주문 내역에서 반품을 신청하세요.' }
];
function toggle(id) {
  openId.value = openId.value === id ? null : id;
}
</script>
<template>
  <section class="workshop">
    <section v-for="item in items" :key="item.id" class="box">
      <button
        :aria-expanded="openId === item.id"
        :aria-controls="uid + item.id"
        @click="toggle(item.id)"
      >
        {{ item.question }}
      </button>
      <p :id="uid + item.id" v-show="openId === item.id">{{ item.answer }}</p>
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
