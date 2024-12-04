<template>
  <common-modal ref="modal01Ref" v-model="modal01" type="confirm" hide-title>
    <template #modal_body>
      <div v-html="props.popupContent"></div>
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" btn-style="line" :label="props.closeLabel" @click="close" />
      <uu-button btn-color="primary" :label="props.okLabel" @click="btnActions.ok" />
    </template>
  </common-modal>
</template>

<script setup lang="ts">
// TODO 파일삭제. 컨펌팝업 컴포넌트 사용하지 않고 usemessageModal 사용
import { ref } from 'vue';
import CommonModal from '@/views/common/components/CommonModal.vue';

const modal01Ref = ref(); // Ref
const modal01 = ref<boolean>(false); // v-model

const props = defineProps({
  popupContent: {
    type: String,
    default: 'test'
  },
  closeLabel: {
    type: String,
    default: '아니요'
  },
  okLabel: {
    type: String,
    default: '네'
  }
});

const open = () => {
  modal01.value = true;
};
const close = () => {
  modal01.value = false;
};
defineExpose({ open });
</script>
