<template>
  <common-modal v-model="showDeletePopup" type="confirm" hide-overlay @ok="okCallback" @close="close">
    <template #modal_header> 신고내역을 삭제하시겠습니까? </template>
    <template #modal_body>
      <p>삭제된 내역은 복구되지 않습니다.</p>
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" btn-style="line" label="아니요" @click="btnActions.close" />
      <uu-button btn-color="primary" label="네" @click="btnActions.ok" />
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import CommonModal from '@/views/common/components/CommonModal.vue';

const emit = defineEmits(['ok', 'close']);
const props = defineProps({ isShow: { type: Boolean, default: false } });

const showDeletePopup = ref(false);

const okCallback = () => {
  emit('ok');
};

const close = () => {
  emit('close');
};

watch(
  () => props.isShow,
  () => {
    showDeletePopup.value = props.isShow;
  }
);
</script>
