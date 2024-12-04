<template>
  <!-- 이용자 정보 인력 안내 바텀시트 -->
  <common-modal
    v-model="showBottom"
    type="confirm"
    add-class="notice_bottom_sheet"
    hide-close-btn
    @ok="close"
    @close="close"
  >
    <template #modal_header> 이용자 정보 입력 안내 </template>
    <template #modal_body>
      <ul class="notice_list">
        <li>이용자 정보는 <strong class="primary_color">최소 1명</strong>은 입력하셔야 합니다.</li>
        <li>입력하신 정보는 <strong>더보기 - 이용내역</strong>에서 확인 및 변경 하실 수 있습니다.</li>
      </ul>
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" label="확인" aria-label="확인" size="md" @click="btnActions.ok" />
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CommonModal from '@/views/common/components/CommonModal.vue';

const showBottom = ref(false);

const open = () => {
  showBottom.value = true;
};
const close = () => {
  showBottom.value = false;
};
defineExpose({ open });
</script>
