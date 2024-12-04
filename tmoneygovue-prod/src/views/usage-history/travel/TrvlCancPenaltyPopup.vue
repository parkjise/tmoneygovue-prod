<template>
  <common-modal v-model="showPopup" type="full" title="취소 및 환불 규정" full-content hide-footer>
    <template #modal_body>
      <div class="penalty_content" v-html="santizedHtml(props.content)" />
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { santizedHtml } from '@/utils';
import CommonModal from '@/views/common/components/CommonModal.vue';

const props = defineProps({ isShow: { type: Boolean, default: false }, content: { type: String, default: '' } });
const showPopup = ref(false);

watch(
  () => props.isShow,
  () => (showPopup.value = props.isShow)
);
</script>
