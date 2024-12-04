<!-- 예매취소 예상 위약금 팝업 -->
<template>
  <common-modal ref="exptcPnltyRef" v-model="exptcPnlty" type="confirm" :footer="footer">
    <template #modal_header> 예매 취소 </template>
    <template #modal_body>
      취소 완료 시간에 따라 취소 수수료가 아래와 같이 부과됩니다. 예매 취소 후 카드환불까지 3~5영업일 소요될 수
      있습니다.
      <div class="charge_box">
        <div class="charge_detail">
          <div class="charge_detail_item">
            <div>총 결제금액</div>
            <div class="detail_price"><span class="price">39,700</span>원</div>
          </div>
          <div class="charge_detail_item">
            <div>취소 수수료</div>
            <div class="detail_price"><span class="price">1,000</span>원</div>
          </div>
        </div>
        <div class="charge_total">
          <uuIc v-bind="{ name: 'coin', size: '24' }" />
          <div class="total_txt">총 반환금액</div>
          <div class="total_price"><span class="price">38,700</span>원</div>
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
import { ref, watch } from 'vue';
import CommonModal from '@/views/common/components/CommonModal.vue';

const props = defineProps({ isShow: { type: Boolean, default: false } });
const emit = defineEmits(['ok', 'close']);

const exptcPnltyRef = ref();
const exptcPnlty = ref(false);

watch(
  () => props.isShow,
  () => (exptcPnlty.value = props.isShow)
);
const footer = [
  {
    name: 'close',
    label: '아니요',
    click: () => {
      closeCallback();
    },
    disabled: false,
    line: true
  },
  {
    name: 'ok',
    label: '확인',
    click: () => {
      okCallback();
    },
    disabled: false,
    color: 'primary'
  }
];
const okCallback = () => {
  emit('ok');
};

const closeCallback = () => {
  emit('close');
};
</script>
