<script setup lang="ts">
import { ref, watch, reactive, type PropType, nextTick, onUnmounted, useSlots } from 'vue';
import { getRandomId } from '@/assets/script/randomString';
import { useActiveElement } from '@vueuse/core';
import uuButton from '@/components/uu-components/UuButton.vue';
import uuIc from '@/components/uu-components/UuIc.vue';
import { useCommonStore } from '@/service/common/commonModule';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/service/auth/authModule';

type modalType = 'alert' | 'confirm' | 'bottom' | 'full' | 'notification';
const props = defineProps({
  /**
   * Modal Type<br>
   * type='alert' | 'confirm' | 'bottom' | 'full' | 'notification'
   */
  type: {
    type: String as PropType<modalType>,
    default: 'alert',
    require: true
  },
  /**
   * Modal Show, Hide <br>
   * v-model="modelName"
   */
  modelValue: {
    type: Boolean,
    default: false
  },
  /**
   * Hidden Header
   */
  hideHeader: {
    type: Boolean,
    default: false
  },
  /**
   * Hidden Footer
   */
  hideFooter: {
    type: Boolean,
    default: false
  },
  /**
   * Header Title Text
   */
  title: {
    type: String,
    default: 'Modal title'
  },
  hideOverlay: {
    type: Boolean,
    default: false
  },
  dragBar: {
    type: Boolean,
    default: false
  },
  fullContent: {
    type: Boolean,
    default: false
  },
  addClass: {
    type: String,
    default: ''
  },
  hideCloseBtn: {
    type: Boolean,
    default: false
  },
  hideTitle: {
    type: Boolean,
    default: false
  },
  roundFooter: {
    type: Boolean,
    default: false
  },
  hasBg: {
    type: Boolean,
    default: false
  },
  hasHeaderBg: {
    type: Boolean,
    default: false
  },
  okUpdateValue: {
    type: Boolean,
    default: true
  },
  closeUpdateValue: {
    type: Boolean,
    default: true
  },
  isBack: {
    type: Boolean,
    default: true
  },
  whiteBack: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits([
  /**
   * Update v-model Value
   */
  'update:modelValue',
  /**
   * Close Button Event
   */
  'close',
  /**
   * OK Button Event
   */
  'ok',
  /**
   * Open Event
   */
  'open'
]);
const slots = useSlots();

const randomString = getRandomId();
const modalContent = ref<HTMLDivElement | undefined>();
const modalHeader = ref<HTMLDivElement | undefined>();
const modalTitle = ref<HTMLElement | undefined>();
const activator = ref<HTMLButtonElement | undefined>();
const activeElement = useActiveElement();
const activeEl = ref<HTMLElement | null | undefined>();
const modal = ref();
const state = reactive({
  transitionName: '' as string | null,
  modalcontent: false,
  overlay: !props.hideOverlay, // true
  drag: {
    isDragging: false,
    offsetY: 0,
    initY: 0
  }
});
// const arrayId = ref<string[]>([])

const commonStore = useCommonStore();
const modalId = `${randomString}Modal`;
const isModalOpen = ref(false);

watch(activeElement, (el) => {
  activeEl.value = el;
});

onUnmounted(() => {
  // show 모달 정보 store에서 제거. 화면이동을 통해서 모달을 닫지 못하고 이동할경우 store에서 제거
  commonStore.removeShowedModal(modalId);
});

onMounted(() => {
  // commonStore.getShowedModal 배열의 변경을 감시. 배열에 modalId가 없으면 closeModal 메소드를 호출. 외부(브릿지)에서 모달을 닫을때 사용.)
  watch(
    () => commonStore.getShowedModals,
    () => {
      if (
        isModalOpen.value === true &&
        props.modelValue === true &&
        !commonStore.getShowedModals.some((modal) => modal.modalId === modalId)
      ) {
        closeModal();
      }
    },
    { deep: true }
  );
});

// 안드로이드 modal 이슈
const { getAuthInfo } = storeToRefs(useAuthStore());
const updateAppAriaHidden = (isModalOpen: boolean) => {
  if (getAuthInfo.value.osKnd === 'I') return;

  const appElement = document.querySelector('#app');
  if (appElement) {
    appElement.setAttribute('aria-hidden', isModalOpen ? 'true' : 'false');
  }
  // a11y
  nextTick(() => {
    if (modalTitle.value !== undefined) {
      modalTitle.value?.focus();
    }
  });
};

// focus 마지막은 .btn_close 지정
const setFinalFocus = () => {
  if (modalContent.value) {
    // 모달의 내용 영역에서 focusable 요소를 찾음
    const focusableElementsSelector =
      'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const allFocusableElements = modalContent.value.querySelectorAll(
      focusableElementsSelector
    ) as NodeListOf<HTMLElement>;

    // tabindex="-1"인 input 요소 제외
    const focusableElements = Array.from(allFocusableElements).filter((el) => {
      return !(el.tagName === 'INPUT' && el.getAttribute('tabindex') === '-1');
    });

    // focusableElements 중에서 마지막 요소가 .btn_close가 되도록 보장
    const closeBtn = modalContent.value.querySelector('.btn_close') as HTMLElement;

    if (closeBtn) {
      // 포커스 가능한 요소가 하나만 있을 때 직접 닫기 버튼에 포커스 설정
      if (focusableElements.length === 1) {
        closeBtn.focus();
      }

      if (focusableElements.length > 0) {
        focusableElements[focusableElements.length - 1].addEventListener(
          'blur',
          () => {
            setTimeout(() => {
              if (document.activeElement !== closeBtn) {
                closeBtn.focus();
              }
            }, 0);
          },
          { once: true }
        );
      } else {
        closeBtn.focus();
      }
    }
  }
};

onMounted(() => {
  watch(
    () => props.modelValue,
    (newValue) => {
      if (newValue) {
        nextTick(() => {
          setFinalFocus();
        });
      }
    },
    { immediate: true }
  );
});

watch(
  () => props.modelValue,
  (newValue) => {
    updateAppAriaHidden(newValue);
    nextTick(() => {
      if (newValue) {
        document.documentElement.classList.add('modal_open');
        // 모달 상태를 감시하여 상태를 store에 추가/제거. show modal정보가 없으면 store에 push
        if (!commonStore.getShowedModals.some((modal) => modal.modalId === modalId)) {
          const showedModal = {
            modalId: modalId
          };

          commonStore.pushShowedModal(showedModal);
        }
        isModalOpen.value = true;

        nextTick(() => {
          if (modalContent.value !== undefined && modalHeader.value !== undefined) {
            // // 모든 열린 모달에 aria-hidden 속성 설정
            document.querySelectorAll('.modal').forEach((modalEl) => {
              const id = modalEl.id;
              if (id && id !== modalId) document.getElementById(id)?.setAttribute('aria-hidden', 'true');
              else document.getElementById(modalId)?.setAttribute('aria-hidden', 'false');
            });
            modalContent.value.focus();
          }
        });
      } else {
        document.documentElement.classList.remove('modal_open');
        // show 모달 정보 store에서 제거
        commonStore.removeShowedModal(modalId);
        isModalOpen.value = false;

        if (document.getElementById(modalId)) {
          document.getElementById(modalId)?.setAttribute('aria-hidden', 'true');
          document.getElementById(modalId)?.previousElementSibling?.setAttribute('aria-hidden', 'false');
        }
      }
      if (document.querySelectorAll('.modal.is_open').length > 0) {
        document.documentElement.classList.add('modal_open');
      }
    });
  },
  { immediate: true }
);

const scrollTop = () => {
  (modal.value as HTMLElement).getElementsByClassName('modal_body')[0].scrollTo({ top: 0 });
};

const showModal = (e: Event) => {
  activator.value = e.target as HTMLButtonElement;
  emit('open');
  emit('update:modelValue', true);
  updateAppAriaHidden(true);
  document.documentElement.classList.add('modal_open');

  if (props.type === 'bottom') {
    setModalOffsetY(0);
  }

  // a11y
  nextTick(() => {
    if (modalContent.value !== undefined) {
      modalContent.value.focus();
    }
  });
};
const closeModal = () => {
  emit('close');
  updateAppAriaHidden(false);
  // 닫기버튼 클릭 시 무조건 팝업을 닫지 않는 경우도 있기때문에 추가
  if (props.closeUpdateValue) emit('update:modelValue', false);
  // modal + modal 일때 닫아도 .modal_open 넣기
  document.documentElement.classList.remove('modal_open');
  if (document.querySelectorAll('.modal.is_open').length > 1) {
    document.documentElement.classList.add('modal_open');
  }
  // a11y
  activator.value?.focus();
};
const okModal = () => {
  emit('ok');
  updateAppAriaHidden(false);
  // 풀팝업에서 라우터 이동시 팝업이 먼저 닫히는 현상이 생기므로 추가
  if (props.okUpdateValue) emit('update:modelValue', false);
  // modal + modal 일때 닫아도 .modal_open 넣기
  document.documentElement.classList.remove('modal_open');
  if (document.querySelectorAll('.modal.is_open').length > 1) {
    document.documentElement.classList.add('modal_open');
  }
  // a11y
  activator.value?.focus();
};
const focusLoop = (e: KeyboardEvent) => {
  // a11y
  if (modalContent.value !== undefined) {
    const focusEls = modalContent.value.querySelectorAll(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]'
    );

    const firstEl = focusEls[0] as HTMLElement;
    const lastEl = focusEls[focusEls?.length - 1] as HTMLElement;
    const isTab = e.key === 'Tab' || e.keyCode === 9;
    const isEsc = e.key === 'Escape' || e.keyCode === 27;

    if (!isTab) {
      if (isEsc) {
        closeModal();
      }
      return;
    }
    if (e.shiftKey) {
      // shift + tab
      if (activeEl.value === firstEl) {
        lastEl.focus();
        e.preventDefault();
      }
    } else {
      // tab
      if (activeEl.value === lastEl) {
        firstEl.focus();
        e.preventDefault();
      }
    }
  }
};

// bottomsheet close
const setModalOffsetY = (newOffsetY: number) => {
  if (modalContent.value === undefined) {
    return;
  }
  state.drag.offsetY = newOffsetY;
  modalContent.value.style.top = `${newOffsetY}px`;
};
const onDragstart = (pageY: number) => {
  state.drag.initY = pageY;
  state.drag.isDragging = true;
};
const onDragmove = (pageY: number) => {
  if (state.drag.isDragging) {
    const newOffsetY = Math.max(pageY - state.drag.initY, 0);
    setModalOffsetY(newOffsetY);
  }
};
const onDragend = () => {
  state.drag.isDragging = false;
  if (state.drag.offsetY > 100) {
    closeModal();
  } else {
    setModalOffsetY(0);
  }
};
const getModalId = () => {
  return modalId;
};

defineExpose({
  showModal,
  closeModal,
  scrollTop,
  getModalId
});
</script>
<template>
  <Teleport to="body">
    <Transition :name="`modal_${props.type}`">
      <div
        v-show="modelValue"
        :id="`${randomString}Modal`"
        ref="modal"
        class="modal"
        :class="[type, { is_open: modelValue }, addClass]"
        :role="props.type === 'alert' || props.type === 'notification' ? 'alertdialog' : 'dialog'"
        :aria-modal="true"
        :aria-labelledby="type === 'full' ? `${randomString}modalTitle` : ''"
        :aria-hidden="!modelValue"
        tabindex="1"
      >
        <div class="modal_dialog" @click.self="closeModal">
          <div ref="modalContent" class="modal_content" @keydown.stop="focusLoop($event)">
            <uu-button
              v-if="type === 'bottom' && dragBar"
              btn-style="none"
              size="sm"
              class="modal_close_bar"
              @touchstart.passive="onDragstart($event.touches[0].pageY)"
              @touchmove.passive="onDragmove($event.touches[0].pageY)"
              @touchend.passive="onDragend"
              @mousedown.passive="onDragstart($event.pageY)"
              @mousemove.passive="onDragmove($event.pageY)"
              @mouseup.passive="onDragend"
            >
              <span class="sr_only">닫기</span>
            </uu-button>
            <div
              ref="modalHeader"
              class="modal_header"
              :class="[
                { is_hide: hideHeader },
                { full_popup_header: type == 'full' },
                { bg_gray010: hasHeaderBg },
                { is_hide: hideTitle }
              ]"
            >
              <template v-if="type == 'full' && !hideHeader && !hideCloseBtn">
                <button
                  type="button"
                  class="btn_close close_left"
                  :aria-label="isBack ? '뒤로가기' : '닫기'"
                  @click="closeModal"
                  tabindex="10"
                >
                  <uu-ic v-if="isBack" name="back" size="24" />
                  <uu-ic v-else-if="whiteBack" name="back" size="24" color="white" />
                  <uu-ic v-else name="close" size="24" />
                </button>
                <h3
                  :id="`${randomString}modalTitle`"
                  class="modal_title center_title"
                  :class="[{ is_hide: hideTitle }]"
                  ref="modalTitle"
                  tabindex="0"
                >
                  <slot name="modal_header">
                    <div v-html="props.title"></div>
                  </slot>
                </h3>
                <slot name="modal_header_right" />
              </template>
              <template v-else>
                <slot name="modal_header_top_cont" />
                <h3
                  :id="`${randomString}modalTitle`"
                  class="modal_title"
                  :class="[{ is_hide: hideTitle }]"
                  ref="modalTitle"
                  tabindex="0"
                >
                  <slot name="modal_header" >
                    <div v-html="props.title"></div>
                  </slot>
                </h3>
                <button type="button" class="modal_header_right_btn" v-if="slots.modal_header_right_btn">
                  <slot name="modal_header_right_btn" />
                </button>
              </template>
            </div>
            <div
              :id="`${randomString}Desc`"
              class="modal_body"
              :class="{ full_content: fullContent, bg_gray010: hasBg }"
            >
              <slot v-if="$slots.default"></slot>
              <slot v-else name="modal_body"></slot>
            </div>
            <div v-if="!hideFooter" class="modal_footer" :class="{ round_footer: roundFooter }">
              <slot name="modal_footer_content" />
              <div class="btn_area">
                <slot name="modal_footer" :close="closeModal" :ok="okModal">
                  <uu-button class="footer_close" btn-style="line" size="lg" label="취소" @click="closeModal" />
                  <uu-button btn-color="primary" size="lg" label="확인" @click="okModal" />
                </slot>
              </div>
            </div>
            <button
              v-if="type == 'bottom' && !hideHeader && !dragBar && !hideCloseBtn"
              type="button"
              class="btn_close close_right"
              aria-label="닫기"
              @click="closeModal"
              tabindex="10"
            >
              <uu-ic name="close" size="24" />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style></style>
