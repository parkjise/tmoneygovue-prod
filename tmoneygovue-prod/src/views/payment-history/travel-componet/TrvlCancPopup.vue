<template>
  <common-modal ref="cancelPopupRef" v-model="showPopup" type="alert" @close="emits('close')">
    <template #modal_header> 예매 취소 안내 </template>
    <template #modal_body>
      여행 상품 취소는 운영 여행사의 최종 승인 후 환불이 진행되며 업무 처리 절차에 의해 취소일로부터 영업일(주말, 공휴일
      제외) 기준 3-5일 후 카드 취소 확인 가능합니다.
      <ol class="charge_notice_list">
        <li>(1) 예매 취소 일자 기준 취소 수수료 부과</li>
        <li>(2) 예매 일자와 취소 일자가 다른 경우</li>
        <li>(3) 취소 수수료가 부과되는 경우</li>
      </ol>
      예매 후 취소한 티켓의 최종 환불은 결제하신 카드사를 통해 처리가 되므로 해당 카드사를 통해 확인해 주시길
      바라겠습니다.
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" label="확인" aria-label="확인" @click="btnActions.close" />
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import CommonModal from '@/views/common/components/CommonModal.vue';

const props = defineProps({ isShow: { type: Boolean, default: false } });
const emits = defineEmits(['close']);

const cancelPopupRef = ref();
const showPopup = ref(false);

watch(
  () => props.isShow,
  () => (showPopup.value = props.isShow)
);
</script>
