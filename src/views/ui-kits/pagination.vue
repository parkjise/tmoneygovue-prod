<script setup>
import { ref, computed } from 'vue';
import BasePagination from '@/components/common/BasePagination.vue';
const page = ref(1);
const items = Array.from({ length: 28 }, (_, i) => 'Reference ' + (i + 1));
const visible = computed(() => items.slice((page.value - 1) * 5, page.value * 5));
</script>
<template>
  <section class="demo">
    <ul class="demo__list">
      <li v-for="item in visible" :key="item" class="demo__item">{{ item }}</li>
    </ul>
    <BasePagination v-model="page" :total="items.length" :page-size="5" />
    <output>현재 {{ page }} 페이지 / 총 28개 항목</output>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
