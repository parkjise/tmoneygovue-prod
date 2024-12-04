<template>
  <!-- Modal -->
  <common-modal v-model="showPopup" type="confirm" hide-overlay @close="closeCallback" @ok="okCallback">
    <template #modal_header>작성을 취소하시겠습니까?</template>
    <template #modal_body>
      <span>작성중인 내용은 저장되지 않습니다.</span>
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" btn-style="line" label="아니오" @click="btnActions.close" />
      <uu-button btn-color="primary" label="네,취소합니다." @click="btnActions.ok" />
    </template>
  </common-modal>
  <!-- // Modal -->
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import CommonModal from '@/views/common/components/CommonModal.vue';

const showPopup = ref(false);

const props = defineProps({
  isShowPopup: { type: Boolean, default: false }
});
const emit = defineEmits(['ok', 'isClose']);

const okCallback = () => {
  emit('ok');
};

const closeCallback = () => {
  emit('isClose');
};

watch(
  () => props.isShowPopup,
  () => {
    showPopup.value = props.isShowPopup;
  }
);
</script>
