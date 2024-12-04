<template>
  <common-modal
    v-model="showQrScreen"
    type="full"
    add-class="qr_modal"
    hide-title
    full-content
    :is-back="false"
    white-back
    hide-footer
    @close="emits('close')"
  >
    <div class="pattern_area">
      <div ref="patternWrapper" class="pattern_wrapper" />
      <p class="pattern_txt red" v-if="patternFail">
        제스처가 일치하지 않습니다.<br />
        다시 입력해주세요.
      </p>
      <p class="pattern_txt">
        수동검표 모드가 활성화되었습니다.<br />
        검표 제스처를 입력하세요.
      </p>
    </div>
  </common-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import PatternLock from 'vanilla-pattern-lock';
import { useMessageModal, type modalFooterType } from '@/composables/useMessageModal';
import type { ReqChkByPltf } from '@/service/usage-history/model/travelHistoryModel';
import { useHistoryStore } from '@/service/usage-history/travelHistoryModule';
import CommonModal from '@/views/common/components/CommonModal.vue';

const historyStore = useHistoryStore();
const { createNotificationModalAndOption, createConfirmModalByFunction, defaultCloseModal } = useMessageModal();

const patternWrapper = ref<HTMLElement | null>(null);

const props = defineProps({ isShow: Boolean });
const emits = defineEmits(['close']);

const pass = 1235789;
const patternFail = ref(false);

const showQrScreen = ref(false);
let paramsObj: ReqChkByPltf = {
  tmgMbrsSno: '',
  trvlMrnpSno: '',
  trvlTissuId: '',
  chtkCancDvs: ''
};

watch(
  () => props.isShow,
  () => {
    showQrScreen.value = props.isShow;
    if (props.isShow) {
      randerScreenLock();
      openWarnPopup();
    } else patternFail.value = false;
  }
);

/**
 * @description 검표요청
 */
const reqChkByPltf = async () => {
  const res = await historyStore.reqChkByPltf(paramsObj);
  if (res && res.chtkDtm) openPopup('검표 성공하였습니다.');
  else openPopup('검표 실패하였습니다.');
};

const openPopup = (content: string) => {
  createNotificationModalAndOption(
    {
      title: '알림',
      footer: [
        {
          name: 'close',
          label: '확인',
          click: async () => {
            emits('close');
          }
        }
      ] as Array<modalFooterType>
    },
    content
  );
};
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
  lock.on('complete', async (pattern: number) => {
    paramsObj.chtkCancDvs = pattern === pass ? '1' : '0';
    if (pattern === pass) {
      lock.success();
      patternFail.value = false;
      await reqChkByPltf();
    } else {
      patternFail.value = true;
    }
    lock.clear();
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

const openWarnPopup = () => {
  createConfirmModalByFunction(
    '[경고] 수동검표기능',
    '패턴 검표는 해당 승무사원만 사용 가능한 메뉴입니다. 사용자가 직접 패턴 검표를 수행할 경우 승차권은 검표 처리되어 승차권 취소 및 환불되지 않으니 유의하시기 바랍니다.',
    () => {
      defaultCloseModal();
    },
    '확인',
    false,
    () => {
      defaultCloseModal();
      emits('close');
    },
    '취소',
    'primary',
    'none',
    'none',
    'line'
  );
};
</script>
