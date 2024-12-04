<template>
  <router-view :key="$route.fullPath"></router-view>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, watchEffect } from 'vue';

import { loadGlobalEventListner, removeGlobalEventListner } from '@/bootstraps/globalEventHandler';
import { loadNativeToWebBridge, loadEmulWebToNativeBridge } from './utils';
import { useRoute } from 'vue-router';

const route = useRoute();

onMounted(() => {
  loadEmulWebToNativeBridge(); // 개발용 브릿지 애뮬레이터 로드(PC환경일떄만 로드)
  loadNativeToWebBridge(); // 네이티브에서 웹으로 브릿지 로드(Native to Web)
  loadGlobalEventListner(); // 전역 이벤트 리스너 등록
});
onUnmounted(() => {
  removeGlobalEventListner(); // 전역 이벤트 리스너 제거
});

watchEffect(() => {
  document.title = route.meta?.cusTitle || '티머니고';
});
</script>

<style scoped></style>
