<template>
  <div class="overlay">
    <div ref="spinnerContainer" class="spinner-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useCommonStore } from '@/service/common/commonModule';
import lottie, { type AnimationItem } from 'lottie-web';
import animationData from '@/assets/lottie/GO_loading.json';

const commonStore = useCommonStore();
const spinnerContainer = ref<HTMLElement | null>(null);
let animationInstance: AnimationItem | null = null;

const props = defineProps({
  destroySpinnerFuction: {
    type: Function,
    required: true
  }
});

onMounted(() => {
  if (spinnerContainer.value) {
    animationInstance = lottie.loadAnimation({
      container: spinnerContainer.value, // 애니메이션을 표시할 DOM 요소
      renderer: 'svg', // 렌더링 방식 ('svg', 'canvas', 'html' 중 선택)
      loop: true, // 애니메이션을 반복할지 여부
      autoplay: true, // 애니메이션을 자동으로 재생할지 여부
      animationData: animationData, // 애니메이션 데이터가 있는 JSON 파일의 경로
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet'
      }
    });
  }
  //  debugger
});

onUnmounted(() => {
  if (animationInstance) {
    animationInstance.destroy(); // 애니메이션 인스턴스 제거
  }
});

watch(
  () => commonStore.getCommonUseAxiosSpinnerIsShowedSpinner,
  (isShowedSpinner) => {
    if (!isShowedSpinner) {
      props.destroySpinnerFuction();
    }
  }
);
</script>

<style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* 높은 z-index 값으로 다른 요소 위에 표시 */
  pointer-events: auto; /* 포인터 이벤트 비활성화 */
}

.spinner-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 6.448rem;
  height: 6.58rem;
  transform: translate(-50%, -50%);
}
</style>
