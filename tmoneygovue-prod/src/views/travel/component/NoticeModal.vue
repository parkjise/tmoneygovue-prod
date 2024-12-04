<!-- 공지사항 팝업 -->
<template>
  <!-- Modal Activator -->
  <uu-button
    label="공지사항 팝업"
    btn-color="primary"
    :aria-haspopup="true"
    aria-controls="modal01"
    @click="modal01Ref.showModal($event)"
  />
  <!-- // Modal Activator -->
  <!-- Modal -->
  <common-modal ref="modal01Ref" v-model="modal01" type="confirm">
    <template #modal_header> 알림 </template>
    <template #modal_body>
      현재 페이지 접속이 원활하지 않습니다.<br />
      잠시 후에 다시 접속해주세요.
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" label="확인" @click="btnActions.ok" />
    </template>
  </common-modal>
  <!-- // Modal -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CommonModal from '@/views/common/components/CommonModal.vue';

const modal01Ref = ref();
const modal01 = ref<boolean>(true);
</script>
