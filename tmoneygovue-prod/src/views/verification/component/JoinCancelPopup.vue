<template>
  <!-- 회원가입 취소 팝업 -->
  <common-modal v-model="showPopup" type="confirm" hide-overlay @ok="emit('accept')" @close="emit('close')">
    <template #modal_header>가입취소</template>
    <template #modal_body>
      <p>
        회원가입이 완료되지 않았습니다.<br />
        가입 신청을 취소하시겠습니까?
      </p>
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" btn-style="line" :label="'아니요'" aria-label="아니요" @click="btnActions.close" />
      <uu-button btn-color="primary" :label="'네, 취소하겠습니다.'" aria-label="네, 취소하겠습니다." @click="btnActions.ok" />
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
