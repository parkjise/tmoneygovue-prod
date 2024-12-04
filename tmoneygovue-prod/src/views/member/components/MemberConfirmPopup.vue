<template>
  <common-modal v-model="showPopup" type="confirm" hide-overlay @close="closeCallback" @ok="okCallback">
    <template #modal_header>{{ props.title }}</template>
    <template #modal_body>
      <span v-html="santizedHtml(props.message)"></span>
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" btn-style="line" :label="props.closeBtnLabel" @click="btnActions.close" />
      <uu-button btn-color="primary" :label="props.okBtnLabel" @click="btnActions.ok" />
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import CommonModal from '@/views/common/components/CommonModal.vue';
import { santizedHtml } from '@/utils';

const props = defineProps({
  isShowPopup: { type: Boolean, default: false },
  title: { type: String, default: '' },
  okBtnLabel: { type: String, default: '' },
  message: { type: String, default: '' },
  closeBtnLabel: { type: String, default: '' }
});
const emit = defineEmits(['ok', 'isClose']);

const showPopup = ref(false);

const okCallback = () => {
  emit('ok');
};

const closeCallback = () => {
  emit('isClose');
};

watch(
  () => props.isShowPopup,
  () => (showPopup.value = props.isShowPopup)
);
</script>
