<template>
  <!-- 최초 회원가입시 약관동의 팝업 -->
  <common-modal v-model="showPopup" type="confirm" hide-overlay @ok="emit('accept')" @close="emit('close')">
    <template #modal_header>티머니GO 회원 서비스</template>
    <template #modal_body>
      <p style="color: #111111">
        약관 동의 화면으로 이동하시겠습니까?<br />
      </p>
      <br />
      <p>
        티머니GO 회원 서비스를 처음 이용하시는 고객님께서는 최초 1회 이용약관
        동의 절차가 필요합니다.<br />
      </p>
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" btn-style="line" :label="'아니요'" aria-label="아니요" @click="btnActions.close" />
      <uu-button btn-color="primary" :label="'네, 이동할게요'" aria-label="네, 이동할게요" @click="btnActions.ok" />
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import CommonModal from '@/views/common/components/CommonModal.vue';

const props = defineProps({
  isShow: { type: Boolean, default: false }
});
const emit = defineEmits(['accept', 'close']);
const showPopup = ref(false);

watch(
  () => props.isShow,
  () => {
    showPopup.value = props.isShow;
  }
);
</script>
