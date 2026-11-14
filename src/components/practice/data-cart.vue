<script setup>
import { ref, computed } from 'vue';
const items = ref([
  { id: 1, name: '키보드', price: 30000, quantity: 1 },
  { id: 2, name: '마우스', price: 18000, quantity: 1 }
]);
function setQuantity(item, event) {
  const number = Number(event.target.value);
  item.quantity = Number.isFinite(number) ? Math.min(5, Math.max(1, Math.trunc(number))) : 1;
  event.target.value = String(item.quantity);
}
const total = computed(() =>
  items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
</script>
<template>
  <section class="workshop">
    <label v-for="item in items" :key="item.id">
      {{ item.name }} · {{ item.price.toLocaleString() }}원
      <input
        type="number"
        :value="item.quantity"
        min="1"
        max="5"
        step="1"
        @input="setQuantity(item, $event)"
      />
    </label>
    <output>합계 {{ total.toLocaleString() }}원</output>
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
