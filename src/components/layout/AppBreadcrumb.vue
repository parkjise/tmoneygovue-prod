<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const category = computed(() => route.meta.category || 'Workspace');
</script>
<template>
  <nav aria-label="현재 위치" class="app-breadcrumb">
    <RouterLink to="/">Workspace</RouterLink>
    <span>/</span>
    <span>{{ category }}</span>
    <span>/</span>
    <strong aria-current="page">{{ route.meta.title }}</strong>
  </nav>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.app-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: var(--caption);
  font-size: 10px;
  margin-bottom: 22px;
  strong {
    color: var(--muted);
    font-weight: 500;
  }
  a {
    @include focus-ring;
  }
}
</style>
