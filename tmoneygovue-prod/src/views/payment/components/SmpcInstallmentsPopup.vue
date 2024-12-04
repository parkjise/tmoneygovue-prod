<!-- 
    결제수단-카드간편결제
    할부개월수 선택
    pubPath: tmoney/Transit/TIP05003_1.vue
    @author dahye.kim
 -->
<template>
  <!-- // Modal Activator -->
  <!-- Modal -->
  <uu-modal
    ref="modal01Ref"
    v-model="modal01"
    type="bottom"
    title="할부 개월 수를 선택하세요"
    hide-footer
    add-class="card_select_bottom_sheet"
  >
    <template #modal_body>
      <div class="installment_month">
        <form>
          <div class="left">
            <uu-radio
              v-for="n in 6"
              :key="n"
              v-model="orderInfo.installment"
              :value="n == 1 ? '00' : String(n).padStart(2, '0')"
              dropdown-radio
              :label="n == 1 ? '일시불' : `${n}개월`"
              @changeEvent="changeEvent"
            />
          </div>
          <div class="right">
            <uu-radio
              v-for="n in 6"
              :key="n"
              v-model="orderInfo.installment"
              :value="String(n + 6).padStart(2, '0')"
              dropdown-radio
              :label="`${n + 6}개월`"
              @changeEvent="changeEvent"
            />
          </div>
        </form>
      </div>
    </template>
  </uu-modal>
  <!-- // Modal -->
</template>

<script setup lang="ts">
import { useOrderStore } from '@/service/order/orderModule';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const orderStore = useOrderStore();
const { orderInfo } = storeToRefs(orderStore);

const modal01Ref = ref(); // Ref
const modal01 = ref<boolean>(false); // v-model

const open: any = () => {
  modal01.value = true;
};
defineExpose({ open });

function changeEvent() {
  modal01.value = false;
}
</script>
