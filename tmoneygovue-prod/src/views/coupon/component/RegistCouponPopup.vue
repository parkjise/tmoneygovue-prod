<template>
  <common-modal v-model="isShowPopUp" type="alert" @ok="close" @close="close">
    <template #modal_header_top_cont></template>
    <template #modal_header>
      <img src="/assets/images/ic/ic_20_exclamation.png" alt="느낌표" />
      <p>쿠폰 등록이 불가합니다.</p>
    </template>
    <template #modal_body> {{ message }} </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" label="확인" size="xl" @click="btnActions.ok" />
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import CommonModal from '@/views/common/components/CommonModal.vue';

const message = ref<string>('');

const props = defineProps({
  isShow: { type: Boolean, required: true },
  rspCd: { type: String, required: true }
});

const emit = defineEmits(['isClose']);

const isShowPopUp = ref<boolean>(false);

const close = () => {
  emit('isClose');
};

function setMessage() {
  if (props.rspCd === '0010') {
    message.value = '이미 사용된 쿠폰입니다.\n쿠폰 번호를 다시 확인해주세요.';
  } else if (props.rspCd === '0011') {
    message.value = '유효기간이 지난 쿠폰입니다.\n쿠폰 번호를 다시 확인해주세요.';
  } else {
    message.value = '쿠폰 번호를 다시 확인해주세요.';
  }
}

watch(
  () => props.isShow,
  () => {
    isShowPopUp.value = props.isShow;
    setMessage();
  }
);

onMounted(() => {
  setMessage();
});
</script>
