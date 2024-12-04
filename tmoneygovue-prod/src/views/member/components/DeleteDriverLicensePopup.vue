<template>
  <common-modal v-model="deletePopup" type="confirm" @ok="okCallback" @close="close">
    <template #modal_header> 운전면허 </template>
    <template #modal_body>
      <p>킥보드 이용시 운전면허 등록이 필수 입니다.</p>
      <p>운전면허정보를 삭제하시겠습니까?</p>
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-style="line" label="아니요" @click="btnActions.close" />
      <uu-button btn-color="primary" label="네, 삭제하겠습니다." @click="btnActions.ok" />
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import CommonModal from '@/views/common/components/CommonModal.vue';

const props = defineProps({ isShowPopup: { type: Boolean, default: false } });
const emit = defineEmits(['ok', 'close']);

const deletePopup = ref<boolean>(false);

const okCallback = () => {
  emit('ok');
};

const close = () => {
  emit('close');
};

watch(
  () => props.isShowPopup,
  () => (deletePopup.value = props.isShowPopup)
);
</script>
