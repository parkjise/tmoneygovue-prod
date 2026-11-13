<script setup>
import { ref } from 'vue';
const columns = ref(3);
const gap = ref(16);
</script>
<template>
  <section class="demo">
    <div class="demo__row">
      <label>
        열 수
        <input v-model.number="columns" type="range" min="1" max="4" />
      </label>
      <label>
        간격
        <input v-model.number="gap" type="range" min="4" max="32" />
      </label>
    </div>
    <section
      class="grid-demo"
      :style="{ gridTemplateColumns: `repeat(${columns},minmax(0,1fr))`, gap: gap + 'px' }"
    >
      <article v-for="n in 8" :key="n">Column {{ n }}</article>
    </section>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.grid-demo {
  display: grid;
  article {
    @include flex-center;
    padding: 30px 8px;
    background: var(--soft);
    color: var(--primary);
    border-radius: 10px;
    font-size: 12px;
  }
}
</style>
