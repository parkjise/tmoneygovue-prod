<template>
  <common-modal v-model="showPopup" type="confirm" hide-overlay add-class="traffic_modal" @ok="ok">
    <template #modal_header> 카드등록 완료 </template>
    <template #modal_body>
      <p class="modal_des">카드가 정상적으로 등록되었습니다.</p>
      <p class="mt8">
        대중교통 이용내역은 2일 뒤부터 확인<br />
        가능합니다.
      </p>
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" label="확인" @click="btnActions.ok" />
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import CommonModal from '@/views/common/components/CommonModal.vue';

const showPopup = ref(false);

const emit = defineEmits(['ok']);
const props = defineProps({
  isShow: { type: Boolean, required: true },
});

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
