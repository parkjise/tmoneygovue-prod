<template>
  <common-modal v-model="showPopup" type="confirm" hide-overlay @ok="ok">
    <template #modal_header> 마일리지 전환 완료 </template>
    <template #modal_body>
      <ul class="mileage_complete">
        <li>
          <p>전환 일시</p>
          <p>
            <span>{{ getMileageExchangeInfo.mlgSwtcDtm }}</span>
          </p>
        </li>
        <li>
          <p>전환 GO마일리지</p>
          <p>
            <strong>{{ formatAmount(getMileageExchangeInfo.mlgSwtcAmt) }}</strong
            >M
          </p>
        </li>
        <li>
          <p>잔여 GO마일리지</p>
          <p>
            <strong>{{ formatAmount(getMileageExchangeInfo.rmnTmgMlgAmt) }}</strong
            >M
          </p>
        </li>
        <li>
          <p>잔여 T마일리지</p>
          <p>
            <strong>{{ formatAmount(getMileageExchangeInfo.rmnTmnyMlgAmt) }}</strong
            >M
          </p>
        </li>
      </ul>
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" label="확인" @click="btnActions.ok" />
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import { useGoMileageStore } from '@/service/mileage/goMileageModule';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { formatAmount } from '@/utils/amountUtils';
import CommonModal from '@/views/common/components/CommonModal.vue';

const milegeStore = useGoMileageStore();
const { getMileageExchangeInfo } = storeToRefs(milegeStore);

const showPopup = ref(false);
const emit = defineEmits(['ok']);
const props = defineProps({ isShow: { type: Boolean, required: true } });

watch(
  () => props.isShow,
  () => {
    showPopup.value = props.isShow;
  }
);

const ok = () => {
  emit('ok');
};
</script>
