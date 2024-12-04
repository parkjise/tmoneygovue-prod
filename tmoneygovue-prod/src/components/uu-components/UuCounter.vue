<script setup lang="ts">
import { ref } from 'vue';
import uuIc from '@/components/uu-components/UuIc.vue';

const props = defineProps({
  maxCount: {
    type: Number,
    default: null
  }
});

const count = ref(0);
const maxCount = props.maxCount;

const plusCount = () => {
  if (count.value == maxCount) {
    return false;
  } else {
    count.value++;
  }
};

const minusCount = () => {
  if (count.value > 0) count.value--;
};
</script>

<template>
  <div class="counter">
    <button type="button" class="minus_btn" :disabled="count == 0" @click="minusCount">
      <uu-ic name="minus" size="16" />
    </button>
    <div class="count_num">
      {{ count }}
    </div>
    <button v-if="count == maxCount" type="button" class="plus_btn">
      <uu-ic name="plus" size="16" />
    </button>
    <button v-else type="button" class="plus_btn" @click="plusCount">
      <uu-ic name="plus" size="16" />
    </button>
  </div>
</template>
