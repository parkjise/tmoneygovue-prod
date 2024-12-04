<template>
  <common-modal v-model="showPopup" type="confirm" hide-overlay add-class="traffic_modal" @ok="ok">
    <template #modal_header> 카드등록 불가 </template>
    <template #modal_body>
      <p class="modal_des">카드 등록이 최대 개수(5개)를 초과했습니다.</p>
      <p class="mt8">
        등록을 원하시면 모바일티머니 앱이나 티머니 홈페이지에서 기존 카드를 삭제해 주세요.
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
