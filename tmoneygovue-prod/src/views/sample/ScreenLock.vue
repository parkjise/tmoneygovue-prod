<template>
  <!-- header -->
  <sub-header hide-title title="" class="bg_transparent" />
  <!-- // header -->
  <div class="pattern_area">
    <div ref="patternWrapper" class="pattern_wrapper" />
    <p class="pattern_txt">
      수동검표 모드가 활성화되었습니다.<br />
      검표 제스처를 입력하세요.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PatternLock from 'vanilla-pattern-lock';
import { useMessageModal } from '@/composables/useMessageModal';

const { createNotificationModal } = useMessageModal();
const patternWrapper = ref<HTMLElement | null>(null);

// screen lock pass
const pass = 1235789;

onMounted(() => {
  // screen lock 렌더링
  randerScreenLock();
});

// screen lock 렌더링
const randerScreenLock = () => {
  if (!patternWrapper.value) {
    return;
  }
  patternWrapper.value.addEventListener('touchstart', () => {}, { passive: false });
  patternWrapper.value.addEventListener('touchmove', () => {}, { passive: false });
  patternWrapper.value.addEventListener('touchend', () => {}, { passive: false });

  const lock = new PatternLock({ vibrate: false });
  lock.render(patternWrapper.value);
  lock.on('complete', (pattern: number) => {
    if (pattern === pass) {
      lock.success();
      createNotificationModal('알림', '검표 성공하였습니다.');
      lock.clear();
    } else {
      createNotificationModal('알림', '검표 실패하였습니다.');
      lock.clear();
    }
  });

  // svg viewBox 변경
  const patternLockSvg = patternWrapper.value.querySelector('.pattern-lock');
  if (patternLockSvg) {
    patternLockSvg.setAttribute('viewBox', '0 0 100 200');
  }
  // circle 크기 변경
  const lockDotsGroup = patternWrapper.value.querySelector('.lock-dots');
  if (lockDotsGroup) {
    const circleElements = lockDotsGroup.querySelectorAll('circle');
    circleElements.forEach((circle) => {
      circle.setAttribute('r', '5');
      // cy 값 2배 증가
      const currentCy = parseInt(circle.getAttribute('cy') || '0', 10);
      circle.setAttribute('cy', (currentCy * 2).toString());
    });
  }
};
</script>
