<template>
  <div class="travel error_area" :class="props.searchPage ? 'search_result' : 'prd_result'">
    <div class="img_area">
      <img src="/assets/images/img_tmoney_character_error.png" alt="에러 티머니 캐릭터" />
    </div>
    <div class="desc_area">
      <div class="err_result_txt">잠시 후 다시 시도해주세요.</div>
      <uu-button class="btn_area" label="재시도" aria-label="재시도" btn-style="line" @click="emits('retry')" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({ searchPage: Boolean });
const emits = defineEmits(['retry']);
</script>
