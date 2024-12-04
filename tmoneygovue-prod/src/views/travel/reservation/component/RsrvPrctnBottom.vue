<template>
  <common-modal
    ref="rsrvtPrctnRef"
    v-model="rsrvtPrctn"
    type="confirm"
    add-class="notice_bottom_sheet"
    hideCloseBtn
    @ok="emits('ok')"
    @close="emits('close')"
  >
    <template #modal_header>예약 유의사항 안내</template>
    <template #modal_body>
      {{ props.content }}
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" label="확인" aria-label="확인" size="xl" @click="btnActions.ok" />
    </template>
  </common-modal>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import CommonModal from '@/views/common/components/CommonModal.vue';

const rsrvtPrctnRef = ref();
const rsrvtPrctn = ref(false);

const props = defineProps({ isShow: { type: Boolean, default: false }, content: { type: String, default: '' } });
const emits = defineEmits(['ok', 'close']);

watch(
  () => props.isShow,
  () => (rsrvtPrctn.value = props.isShow)
);
</script>
