<template>
  <!-- Modal -->
  <uu-modal ref="modal01Ref" v-model="modal01" type="bottom" hide-footer>
    <template #modal_header> 적용 받을 대상 선택 </template>
    <template #modal_body>
      <form>
        <uu-radio
          v-for="satInfo in orderInfo.selSatsList"
          :key="satInfo.busTckKndCd"
          v-model="radio01"
          :value="satInfo.busTckKndCd"
          dropdown-radio
          class="apply"
          :disabled="satInfo.fee * 0.5 < satInfo.cpnDcntFee"
        >
          <template #label>
            <span class="badge">{{ satInfo.busTckKndNm }}</span>
            <span class="option_num"
              ><span>-{{ formatAmount(satInfo.cpnDcntFee) }}</span
              >원
            </span>
          </template>
        </uu-radio>
      </form>
    </template>
  </uu-modal>
  <!-- // Modal -->
</template>
<script setup lang="ts">
import { useOrderStore } from '@/service/order/orderModule';
import { formatAmount } from '@/utils/amountUtils';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
const orderStore = useOrderStore();
const { orderInfo } = storeToRefs(orderStore);

const props = defineProps({ init: Boolean });

// 모달 제어 관련 값
const modal01Ref = ref();
const modal01 = ref<boolean>(false);

// 쿠폰적용 티켓구분값
const radio01 = ref('');

const open = () => {
  modal01.value = true;
  if (props.init) radio01.value = '';
};
const close = () => (modal01.value = false);
const emit = defineEmits(['update']);

watch(radio01, () => {
  if (radio01.value) {
    emit('update', radio01.value);
    close();
  }
});
defineExpose({ open });
</script>
