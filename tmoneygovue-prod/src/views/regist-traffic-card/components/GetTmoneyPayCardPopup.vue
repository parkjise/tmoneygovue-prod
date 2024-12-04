<template>
  <common-modal v-model="showPopup" type="confirm" hide-overlay @ok="okCallback" @close="close">
    <template #modal_header> 모바일티머니 교통카드 등록 </template>
    <template #modal_body>
      <p>
        모바일티머니 카드가 {{ props.tmoneyPayCardCnt }}개 조회되었습니다.<br />
        등록하시겠습니까?<br />
        교통카드는 최대 5개 까지 등록 가능합니다.
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

const props = defineProps({
  isShowPopup: { type: Boolean, default: false },
  tmoneyPayCardCnt: { type: String, required: true }
});
const emit = defineEmits(['ok', 'close']);

const showPopup = ref(false);

const okCallback = () => {
  emit('ok');
};

const close = () => {
  emit('close');
};

watch(
  () => props.isShowPopup,
  () => {
    showPopup.value = props.isShowPopup;
  }
);
</script>
