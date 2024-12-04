<template>
  <common-modal v-model="showPopup" type="confirm" hide-overlay @ok="emit('login')" @close="emit('close')">
    <template #modal_header> 회원 로그인 </template>
    <template #modal_body>
      <p>
        티머니GO 회원 전용 서비스 입니다.<br />
        로그인 하시겠습니까?<br />
      </p>
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" btn-style="line" label="아니요" aria-label="아니요" @click="btnActions.close" />
      <uu-button btn-color="primary" label="네" aria-label="네" @click="btnActions.ok" />
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import CommonModal from '@/views/common/components/CommonModal.vue';

const props = defineProps({
  isShow: { type: Boolean, default: false }
});
const emit = defineEmits(['login', 'close']);
const showPopup = ref(false);

watch(
  () => props.isShow,
  () => {
    showPopup.value = props.isShow;
  }
);
</script>
