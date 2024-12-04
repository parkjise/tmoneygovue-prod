<template>
  <common-modal
    ref="modalRef"
    v-model="showModal"
    type="confirm"
    @ok="noRtnAmt ? emits('close') : emits('ok')"
    @close="emits('no')"
  >
    <template #modal_header> 예매 취소 </template>
    <template #modal_body>
      취소 완료 시간에 따라 취소 수수료가 아래와 같이 부과됩니다. 예매 취소 후 카드환불까지 3~5영업일 소요될 수
      있습니다.
      <p class="notice_txt" v-if="noRtnAmt">* 반환금액이 없거나 결제금액보다 적을 수 있습니다.</p>
      <div class="charge_box">
        <div class="charge_detail">
          <div class="charge_detail_item">
            <div>총 결제금액</div>
            <div class="detail_price">
              <span class="price">{{ props.data.totalAmt }}</span
              >원
            </div>
          </div>
          <div class="charge_detail_item">
            <div>취소 수수료</div>
            <div class="detail_price">
              <span class="price">{{ props.data.pnltAmt }}</span
              >원
            </div>
          </div>
        </div>
        <div class="charge_total">
          <uuIc v-bind="{ name: 'coin', size: '24' }" />
          <div class="total_txt">총 반환금액</div>
          <div class="total_price">
            <span class="price">{{ props.data.returnAmt }}</span
            >원
          </div>
        </div>
      </div>
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-style="line" label="아니요" aria-label="아니요" @click="btnActions.close" />
      <uu-button btn-color="primary" label="네" aria-label="네" @click="btnActions.ok" />
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import CommonModal from '@/views/common/components/CommonModal.vue';

interface Data {
  data: {
    isShow: boolean;
    totalAmt: string;
    pnltAmt: string;
    returnAmt: string;
  };
}
const props = defineProps<Data>();
const emits = defineEmits(['ok', 'no', 'close']);

const modalRef = ref();
const showModal = ref(false);

watch(
  () => props.data.isShow,
  () => {
    showModal.value = props.data.isShow;
  }
);
/**
 * 반환금액여부
 */
const noRtnAmt = computed(() => {
  return Number(props.data.returnAmt || 0) <= 0;
});
</script>
