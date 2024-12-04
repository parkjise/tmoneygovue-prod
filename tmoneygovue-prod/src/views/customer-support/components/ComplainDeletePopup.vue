<template>
  <common-modal v-model="showDeletePopup" type="confirm" @ok="okCallback" @close="close">
    <template #modal_header> 문의내역을 삭제하시겠습니까? </template>
    <template #modal_body> 삭제된 내역은 복구되지 않습니다. </template>
    <template #modal_footer="btnActions">
      <uu-button btn-style="line" label="아니요" @click="btnActions.close" />
      <uu-button btn-color="primary" label="네" @click="btnActions.ok" />
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import CommonModal from '@/views/common/components/CommonModal.vue';

const showDeletePopup = ref(false);

const emit = defineEmits(['ok', 'close']);
const props = defineProps({
  isDeletePopup: { type: Boolean, default: false },
  deleteCvcpSno: { type: String },
  deleteIndex: { type: Number }
});

watch(
  () => props.isDeletePopup,
  () => {
    showDeletePopup.value = props.isDeletePopup;
  }
);

const okCallback = () => {
  emit('ok');
};

const close = () => {
  emit('close');
};
</script>
