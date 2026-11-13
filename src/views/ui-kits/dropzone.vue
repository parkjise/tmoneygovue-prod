<script setup>
import { ref } from 'vue';
import BaseDropzone from '@/components/common/BaseDropzone.vue';
const files = ref([]);
</script>
<template>
  <section class="demo">
    <BaseDropzone v-model="files" />
    <output>{{ files.length }}개 파일 선택됨</output>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
