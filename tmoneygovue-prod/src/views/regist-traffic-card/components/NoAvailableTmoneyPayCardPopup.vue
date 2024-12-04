<template>
  <common-modal v-model="showPopup" type="confirm" hide-overlay @ok="ok" @close="close">
    <template #modal_header> 알림 </template>
    <template #modal_body>
      <p class="modal_des">등록 가능한 교통카드가 없습니다.</p>
      <p class="mt8">
        티머니 홈페이지로 이동하시겠습니까?
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
