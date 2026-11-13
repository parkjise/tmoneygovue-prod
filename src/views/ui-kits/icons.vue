<script setup>
import { ref } from 'vue';
import { Heart, Star, Settings, Code2, Search, Bell, Calendar, Layers } from 'lucide-vue-next';
const size = ref(24);
const icons = { Heart, Star, Settings, Code2, Search, Bell, Calendar, Layers };
</script>
<template>
  <section class="demo">
    <label>
      아이콘 크기 {{ size }}px
      <input v-model.number="size" type="range" min="16" max="40" />
    </label>
    <section class="icons-demo">
      <article v-for="(icon, name) in icons" :key="name">
        <component :is="icon" :size="size" />
        <code>{{ name }}</code>
      </article>
    </section>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.icons-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 12px;
  article {
    @include card-surface;
    @include flex-center;
    min-height: 100px;
    flex-direction: column;
    gap: 12px;
    color: var(--primary);
  }
  code {
    font-size: 10px;
    color: var(--caption);
  }
}
</style>
