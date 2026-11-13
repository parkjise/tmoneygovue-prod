<script setup>
import { ref } from 'vue';
import BaseBadge from '@/components/common/BaseBadge.vue';
const tags = ref(['Vue 3', 'SCSS', 'Composition API']);
const input = ref('');
function add() {
  if (input.value.trim() && !tags.value.includes(input.value.trim()))
    tags.value.push(input.value.trim());
  input.value = '';
}
</script>
<template>
  <section class="demo">
    <div class="demo__row">
      <BaseBadge
        v-for="tone in ['primary', 'success', 'warning', 'danger']"
        :key="tone"
        :tone="tone"
      >
        {{ tone }}
      </BaseBadge>
    </div>
    <form class="demo__row" @submit.prevent="add">
      <input v-model="input" aria-label="새 태그" placeholder="태그 입력" />
      <button type="submit">+ 추가</button>
    </form>
    <div class="demo__row">
      <span v-for="tag in tags" :key="tag" class="tag">
        {{ tag }}
        <button :aria-label="tag + ' 제거'" @click="tags = tags.filter((t) => t !== tag)">×</button>
      </span>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--soft);
  color: var(--primary);
  border-radius: 9999px;
  padding: 4px 12px;
  font-size: 12px;
  button {
    border: 0;
    padding: 0;
    background: none;
    color: inherit;
  }
}
</style>
