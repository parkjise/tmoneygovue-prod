<template>
  <common-modal ref="modal01Ref" v-model="modal01" type="confirm">
    <template #modal_header><span v-html="santizedHtml(props.title)"></span></template>
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
import { ref } from 'vue';
import uuButton from '@/components/uu-components/UuButton.vue';
import CommonModal from '@/views/common/components/CommonModal.vue';
import { santizedHtml } from '@/utils';

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
  },
  title: { type: String, default: '' }
});

const open = () => {
  modal01.value = true;
};
const close = () => {
  modal01.value = false;
};
defineExpose({ open });
</script>
