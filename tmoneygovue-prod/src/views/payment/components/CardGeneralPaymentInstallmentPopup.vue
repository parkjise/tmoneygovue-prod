<!-- 
    결제수단-카드간편결제
    할부개월수 선택
    pubPath: tmoney/Transit/TIP05003_1.vue
    @author dahye.kim
 -->
<template>
  <!-- Modal -->
  <common-modal
    v-model="cardGeneralPayModal"
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
              v-for="n in installmentMaxMonth"
              :key="n"
              v-model="monthlyInstallment"
              :value="n == 1 ? '00' : String(n).padStart(2, '0')"
              dropdown-radio
              :label="n == 1 ? '일시불' : `${n}개월`"
              @changeEvent="changeEvent"
            />
          </div>
          <div class="right">
            <uu-radio
              v-for="n in installmentMaxMonth"
              :key="n"
              v-model="monthlyInstallment"
              :value="String(n + installmentMaxMonth).padStart(2, '0')"
              dropdown-radio
              :label="`${n + installmentMaxMonth}개월`"
              @changeEvent="changeEvent"
            />
          </div>
        </form>
      </div>
    </template>
  </common-modal>
  <!-- // Modal -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CommonModal from '@/views/common/components/CommonModal.vue';

const cardGeneralPayModal = ref<boolean>(false); // v-model
const monthlyInstallment = ref<string>('00');
const open: any = () => {
  cardGeneralPayModal.value = true;
};
defineExpose({ open });
const emit = defineEmits(['monthlyInstallment']);

defineProps({
  // 할부개월수 최대값
  installmentMaxMonth: {
    type: Number,
    required: true
  }
});

const changeEvent = () => {
  emit('monthlyInstallment', monthlyInstallment.value);
  cardGeneralPayModal.value = false;
};
</script>
