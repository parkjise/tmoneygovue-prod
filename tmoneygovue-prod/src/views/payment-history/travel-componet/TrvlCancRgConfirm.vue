<template>
  <common-modal ref="confirmRef" v-model="showConfirm" type="confirm" @ok="emits('ok')" @close="emits('close')">
    <template #modal_header> 예매 취소 </template>
    <template #modal_body>
      티머니GO는 통신판매 중개자로서 통신판매 당사자가 아니며, 예매 취소 시 상품 판매처 확인 후 환불이 진행됩니다.
      <br />
      <br />
      취소 하시겠습니까?
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-style="line" label="아니요" aria-label="아니요" @click="btnActions.close" />
      <uu-button btn-color="primary" label="네" aria-label="네" @click="btnActions.ok" />
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import CommonModal from '@/views/common/components/CommonModal.vue';

const props = defineProps({ isShow: { type: Boolean, default: false } });
const emits = defineEmits(['ok', 'close']);

const confirmRef = ref(); // 예매취소컨펌팝업
const showConfirm = ref(false); // 예매취소컨펌팝업

watch(
  () => props.isShow,
  () => (showConfirm.value = props.isShow)
);
</script>
