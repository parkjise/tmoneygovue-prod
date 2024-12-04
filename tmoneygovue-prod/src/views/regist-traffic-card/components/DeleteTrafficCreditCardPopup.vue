<template>
  <common-modal v-model="showPopup" type="confirm" hide-overlay @ok="okCallback" @close="close">
    <template #modal_header> 교통카드 삭제 </template>
    <template #modal_body>
      <p class="modal_des">{{ props.item?.crcmNm }} {{ props.item?.trcrNo }}</p>
      <p>카드를 삭제하시겠습니까?</p>
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
import type { RefundCardInfoModel } from '@/service/regist-traffic-card/model/registTrafficCardModel';

const emit = defineEmits(['ok', 'close']);
const props = defineProps({
  isShowPopup: { type: Boolean, default: false },
  item: { type: Object as () => RefundCardInfoModel }
});

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

<style></style>
