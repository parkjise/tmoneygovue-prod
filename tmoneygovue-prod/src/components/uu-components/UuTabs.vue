<script setup lang="ts">
import { reactive, provide, onMounted, watch, nextTick } from 'vue';
import { getRandomId } from '@/assets/script/randomString';

export interface TabInterface {
  id: string;
  array: string[];
  count: number;
  selected: number;
  active: boolean[];
  disabled: boolean[];
}

const props = defineProps({
  ownSizeTab: {
    type: Boolean,
    default: false
  },
  linkTab: {
    type: Boolean,
    default: false
  },
  tabIndex: {
    type: Number,
    default: 0
  },
  focused: {
    type: Boolean,
    default: false
  },
  tabHide: {
    type: Boolean,
    default: false
  },
  tabLinkHide: {
    type: Boolean,
    default: false
  },
  tabClass: {
    type: String,
    default: null,
    required: false
  }
});
const emit = defineEmits([
  /**
   * Update Active Index
   * @return index
   */
  'selected'
]);
const randomString = getRandomId();
const state = reactive<TabInterface>({
  id: randomString,
  array: [],
  count: 0,
  selected: props.tabIndex,
  active: [],
  disabled: []
});

onMounted(() => {
  state.active.map((item, i) => {
    item ? (state.selected = i) : null;
  });

  nextTick(() => {
    if (props.focused) {
      const focusElement = document.getElementById(`${randomString + state.selected}` + 'tabs') as HTMLButtonElement;
      focusElement.focus();
      focusElement.scrollIntoView({ behavior: 'instant', inline: 'center' });
      setTimeout(() => {
        scrollToElementIfNeeded();
      }, 500);
    }
  });

  // emit('selected', state.selected);
});

watch(
  () => props.tabIndex,
  () => {
    if (props.tabIndex < 0) state.selected = 0;
    else {
      state.selected = props.tabIndex;
    }
  }
);

const scrollToElementIfNeeded = () => {
    const focusElement = document.getElementById(`${randomString + state.selected}` + 'tabs') as HTMLButtonElement;
    if (focusElement) {
      focusElement.focus();
      setTimeout(() => {
        const rect = focusElement.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        // 요소가 화면의 좌측/우측 뷰포트 밖에 있는지 확인
        const isOutOfViewLeft = rect.left < 0; // 요소의 왼쪽이 뷰포트 밖에 있음
        const isOutOfViewRight = rect.right > viewportWidth; // 요소의 오른쪽이 뷰포트 밖에 있음

        if (isOutOfViewLeft || isOutOfViewRight) {
          // 요소를 화면 중앙으로 정렬
          focusElement.scrollIntoView({
            behavior: 'smooth', // 부드러운 스크롤 애니메이션
            block: 'nearest', // 세로 방향은 변경하지 않음
            inline: 'center', // 가로 방향에서 중앙으로 이동
          });
        }
      }, 100);
    }
}

const selectedTab = (i: number) => {
  state.selected = i;
  state.active.map((item, index, arr) => {
    i === index ? (arr[index] = true) : (arr[index] = false);
  });
  emit('selected', state.selected);
};

const keyRight = (e: KeyboardEvent) => {
  const target = e.currentTarget as HTMLButtonElement;
  const nextEl = target.nextElementSibling as HTMLButtonElement;
  if (nextEl !== null) {
    nextEl.focus();
    nextEl.click();
  }
};

const keyLeft = (e: KeyboardEvent) => {
  const target = e.currentTarget as HTMLButtonElement;
  const prevEl = target.previousElementSibling as HTMLButtonElement;
  if (prevEl !== null) {
    prevEl.focus();
    prevEl.click();
  }
};

provide('tabs-state', state);
</script>

<template>
  <div class="tab" :class="{ tab_hide: props.tabHide }">
    <!-- Tab links -->
    <div class="tab_link" :class="{ own_size_tab: props.ownSizeTab }" role="tablist" v-show="!tabLinkHide">
      <button
        role="tab"
        type="button"
        :id="`${randomString + index}tabs`"
        :key="index"
        class="tab_link_btn"
        :class="[state.selected === index ? 'is_active' : '']"
        :disabled="state.disabled[index]"
        :aria-controls="`${randomString + index}tab`"
        :aria-selected="state.selected === index"
        :tabindex="state.selected === index ? '0' : '-1'"
        @click="selectedTab(index)"
        @keyup.right="keyRight($event)"
        @keyup.left="keyLeft($event)"
        v-for="(item, index) in state.array"
      >
        <!-- {{ item }} -->
        <div v-html="item"></div>
      </button>
      <slot name="tab_slot" />
    </div>
    <!-- Tab content -->
    <div v-show="!linkTab" role="tabpanel" class="tab_content" :class="props.tabClass">
      <slot />
    </div>
  </div>
</template>
