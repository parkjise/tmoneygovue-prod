<template>
  <uu-modal ref="modal01Ref" v-model="modal01" type="confirm" hide-overlay @ok="callOk">
    <template #modal_header> 알림 </template>
    <template #modal_body>
      <p>
        예약하신 상품의 출발지 <strong>‘{{ props.deprTrmlNm }}’</strong>(은)는 버스 연계가 가능합니다.
      </p>
      <p>연계되는 교통수단을 확인하시겠습니까?</p>
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" btn-style="line" label="아니요" @click="modal01 = false" />
      <uu-button btn-color="primary" label="네" @click="btnActions.ok" />
    </template>
  </uu-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import uuModal from '@/components/uu-components/UuModal.vue';
import uuButton from '@/components/uu-components/UuButton.vue';

// 연계관련 모달화면 제어
const modal01Ref = ref();
const modal01 = ref<boolean>(false);

const props = defineProps({
  deprTrmlNm: {
    type: String,
    default: null
  }
});

const open = () => {
  modal01.value = true;
};
const callOk = () => {
  emit('ok');
};
defineExpose({ open });
const emit = defineEmits(['ok']);
</script>
