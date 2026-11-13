<script setup>
import DataTable from '@/components/common/DataTable.vue';
import { people } from '@/data/people';
</script>
<template>
  <section class="demo">
    <DataTable :initial-rows="people" />
    <p class="demo__muted">
      전체 선택은 현재 페이지에 적용됩니다. CSV는 검색 결과 전체를 내보내며 수식으로 해석될 수 있는
      문자열을 이스케이프합니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
