<script setup>
import { ref } from 'vue';
const active = ref(1);
const items = [
  { id: 1, name: 'Design system', count: 12 },
  { id: 2, name: 'Components', count: 24 },
  { id: 3, name: 'Patterns', count: 6 }
];
</script>
<template>
  <section class="demo">
    <ul class="list-demo">
      <li v-for="item in items" :key="item.id">
        <button :aria-pressed="active === item.id" @click="active = item.id">
          <span>{{ item.name }}</span>
          <small>{{ item.count }}</small>
        </button>
      </li>
    </ul>
    <p class="demo__muted">선택한 목록: {{ items.find((i) => i.id === active)?.name }}</p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.list-demo {
  padding: 0;
  margin: 0;
  list-style: none;
  display: grid;
  gap: 8px;
  button {
    @include flex-between;
    width: 100%;
    padding: 15px 18px;
    &[aria-pressed='true'] {
      background: var(--soft);
      color: var(--primary);
      border-color: var(--primary);
    }
  }
  small {
    background: var(--canvas);
    border-radius: 9999px;
    padding: 2px 9px;
  }
}
</style>
