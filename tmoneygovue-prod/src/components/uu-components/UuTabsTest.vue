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
        v-for="(item, index) in state.array"
        :id="`${randomString + index}tabs`"
        :key="index"
        type="button"
        class="tab_link_btn"
        :class="[state.selected === index ? 'is_active' : '']"
        role="tab"
        :disabled="state.disabled[index]"
        :aria-controls="`${randomString + index}tab`"
        :aria-selected="state.selected === index"
        :tabindex="state.selected === index ? '0' : '-1'"
        @click="selectedTab(index)"
        @keyup.right="keyRight($event)"
        @keyup.left="keyLeft($event)"
      >
        {{ item }}
      </button>
      <slot name="tab_slot" />
    </div>
    <!-- Tab content -->
    <div v-show="!linkTab" class="tab_content" :class="props.tabClass">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tab {
  border-radius: 1rem;
  overflow: hidden;
  .tab_link {
    overflow-x: scroll;
    overflow-y: hidden;
    display: flex;
    padding: 0 2rem;
    border-bottom: 0.1rem solid #eee;
    &.own_size_tab {
      .tab_link_btn {
        flex-grow: 0;
        flex-shrink: 0;
        width: auto;
      }
      &_center {
        justify-content: center;
        .tab_link_btn {
          flex-grow: 0;
          flex-shrink: 0;
          width: auto;
        }
      }
    }
    &_btn {
      // flex-grow: 1;
      // flex-shrink: 0;
      width: 100%;
      height: 5.4rem;
      color: #888;
      //   @include fontHeight(1.6);
      font-family: 'Noto Sans KR', sans-serif;
      letter-spacing: -0.1rem;
      & ~ .tab_link_btn {
        margin-left: 2rem;
      }
      &.is_active {
        position: relative;
        font-weight: 500;
        color: #111;
        &::after {
          position: absolute;
          left: 0;
          bottom: 0rem;
          width: 100%;
          height: 0.3rem;
          background-color: #8e0d80;
          content: '';
        }
      }
    }
    &::-webkit-scrollbar {
      display: none;
    }
    &::before,
    &::after {
      flex: none;
      width: auto;
      content: normal;
    }
  }
}
</style>
