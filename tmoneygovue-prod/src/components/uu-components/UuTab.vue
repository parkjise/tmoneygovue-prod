<script setup lang="ts">
import { ref, watch, onMounted, inject } from 'vue';
import type { TabInterface } from './UuTabs.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'TabName',
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  isFocus: {
    type: Boolean,
    default: true
  }
});

const tabs = inject<TabInterface>('tabs-state');
const randomString = ref();
const index = ref<number>(0);
const isActive = ref(props.active !== undefined ? props.active : false);

onMounted(() => {
  tabs &&
    (tabs.array.push(props.title),
    tabs.active.push(props.active),
    tabs.disabled.push(props.disabled),
    (index.value = tabs.count),
    tabs.count++,
    tabs.active.map((item, i) => {
      randomString.value = tabs.id + i;
    }));

  isActive.value = index.value === tabs?.selected;
});

watch(
  () => tabs?.selected,
  () => {
    isActive.value = index.value === tabs?.selected;
  }
);

watch(
  () => props.active,
  (newValue) => {
    isActive.value = newValue;
  }
);
</script>
<template>
  <div
    role="tabpanel"
    :id="`${randomString}tab`"
    class="tab_content_panel"
    :class="isActive ? 'is_active' : ''"
    :aria-labelledby="`${randomString}tabs`"
    v-show="isActive"
  >
    <div class="tab_panel_inner">
      <slot />
    </div>
  </div>
</template>

<style></style>
