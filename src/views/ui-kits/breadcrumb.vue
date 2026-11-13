<script setup>
import { ref, computed } from 'vue';
const depth = ref(3);
const steps = ['Workspace', 'Projects', 'Vue Atelier', 'Components'];
const visible = computed(() => steps.slice(0, depth.value));
</script>
<template>
  <section class="demo">
    <label>
      경로 깊이
      <input v-model.number="depth" type="range" min="1" max="4" />
    </label>
    <nav class="breadcrumb-demo" aria-label="예제 경로">
      <template v-for="(step, i) in visible" :key="step">
        <span v-if="i">/</span>
        <button v-if="i < visible.length - 1" @click="depth = i + 1">{{ step }}</button>
        <strong v-else aria-current="page">{{ step }}</strong>
      </template>
    </nav>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.breadcrumb-demo {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 18px;
  background: var(--canvas);
  border-radius: 10px;
  span {
    color: var(--caption);
  }
  button {
    border: 0;
    background: none;
    color: var(--muted);
    padding: 0;
  }
  strong {
    color: var(--primary);
    font-weight: 500;
  }
}
</style>
