<template>
  <common-modal ref="alertRef" v-model="showAlert" type="alert" @ok="clickOk" @close="emits('close')">
    <template #modal_header> {{ getNotice?.ntcMttrTtlNm || '' }} </template>
    <template #modal_body>
      {{ getNotice?.ntcMttrCtt || '' }}
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" label="확인" aria-label="확인" @click="btnActions.ok" />
    </template>
  </common-modal>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { NtcMttrData } from '@/service/travel/model/introModel';
import CommonModal from '@/views/common/components/CommonModal.vue';

interface Prop {
  isShow: boolean;
  list: NtcMttrData[];
}
const props = defineProps<Prop>();
const emits = defineEmits(['close']);

const alertRef = ref();
const showAlert = ref(false);

const noticeIdx = ref(0);

watch(
  () => props.isShow,
  () => {
    showAlert.value = props.isShow;
  }
);

watch(
  () => noticeIdx.value,
  () => {
    showAlert.value = true;
  }
);

/**
 * @description 공지사항
 */
const getNotice = computed(() => {
  return props.list[noticeIdx.value];
});

const clickOk = () => {
  if (noticeIdx.value + 1 === props.list.length) return;
  noticeIdx.value++;
};
</script>
