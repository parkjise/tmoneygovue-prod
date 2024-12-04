<template>
  <common-modal v-model="showPopup" type="confirm" hide-overlay @ok="ok" @close="close">
    <template #modal_header> 모바일 티머니 미등록 사용자 </template>
    <template #modal_body>
      <p>
        모바일 티머니 미등록 사용자입니다.<br />
        모바일 티머니를 등록하시겠습니까?
      </p>
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" btn-style="line" label="아니요" @click="btnActions.close" />
      <uu-button btn-color="primary" label="네" @click="btnActions.ok" />
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import CommonModal from '@/views/common/components/CommonModal.vue';

const showPopup = ref(false);

const emit = defineEmits(['ok', 'close']);
const props = defineProps({ isShow: { type: Boolean, required: true } });

watch(
  () => props.isShow,
  () => {
    showPopup.value = props.isShow;
  }
);

const ok = () => {
  emit('ok');
};

const close = () => {
  emit('close');
};
</script>
