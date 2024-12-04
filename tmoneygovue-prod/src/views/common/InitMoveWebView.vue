<template>
  <uu-modal
    v-model="isShowInitMoveWebViewModal"
    type="full"
    title="화면이동"
    has-bg
    has-header-bg
    hide-title
    hide-footer
    hideCloseBtn
  >
    <template #modal_body>
      <div class="error_area">
        <div class="img_area">
          <img src="/assets/images/img_tmoney_character_success.png" alt="성공 티머니 캐릭터" />
        </div>
        <div class="desc_area">
          <p class="title">화면이동 중 입니다</p>
          <p class="desc">잠시만 기다려주세요</p>
        </div>
      </div>
    </template>
  </uu-modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import UuModal from '@/components/uu-components/UuModal.vue';
import { getAppBridge, checkLoadNativeToWebBridge } from '@/utils';

const isShowInitMoveWebViewModal = ref(true);

onMounted(async () => {
  await callReadyForMoveWebView();
});
// 화면이동 준비 브릿지 호출
const callReadyForMoveWebView = async () => {
  await checkLoadNativeToWebBridge();
  const appBridge = await getAppBridge();
  await appBridge.readyForMoveWebView();
};
</script>
