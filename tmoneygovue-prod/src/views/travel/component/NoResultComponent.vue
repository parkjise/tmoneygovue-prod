<template>
  <div class="no_result" :class="props.class">
    <uu-ic v-bind="{ name: 'exclamation', size: '48' }" />
    <div class="no_result_txt">{{ props.message ?? '조회 상품이 없습니다.' }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  message: { type: String, default: '조회 상품이 없습니다.' },
  class: { type: String, default: '' }
});
</script>
