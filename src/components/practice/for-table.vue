<script setup>
import { ref } from 'vue';
const orders = ref([
  { id: 1, name: '노트북', done: false },
  { id: 2, name: '마우스', done: true }
]);
</script>
<template>
  <section class="workshop">
    <table>
      <caption>주문 목록</caption>
      <thead>
        <tr>
          <th scope="col">주문</th>
          <th scope="col">상태</th>
          <th scope="col">변경</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.name }}</td>
          <td :class="{ active: order.done }">{{ order.done ? '배송 완료' : '준비 중' }}</td>
          <td><button @click="order.done = !order.done">상태 전환</button></td>
        </tr>
      </tbody>
    </table>
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
