<template>
  <ul class="usage_list">
    <li v-for="(item, index) in items" :key="index">
      <button class="usage_btn">
        <div class="usage_info">
          <div class="title">
            <img v-if="item.mntnCd === '1'" src="/assets/images/ic/ic_rot_bus_total.svg" alt="버스" />
            <img v-else src="/assets/images/ic/ic_rot_subway_total.svg" alt="지하철" />
            {{ item.rotNm }}
          </div>
          <div class="usage_assort" :class="item.raaDvsCd === '1' ? 'primary' : ''">{{ item.raaDvsNm }}</div>
          <div class="date" :aria-label="formatA11yDateTime(item.trdDtm)">{{ item.trdDtm }}</div>
        </div>
        <div class="price_wrap">
          <span class="price">{{ item.trdAmt }}</span
          >원
        </div>
      </button>
    </li>
    <li ref="loadMoreRef" class="loading"></li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { PublicTransportModel } from '@/service/usage-history/model/publicTransportModel';
import { useIntersectionObserver } from '@vueuse/core';
import { formatA11yDateTime } from '@/utils/dateUtils';

const emit = defineEmits(['updateList']);
const loadMoreRef = ref(null);

const props = defineProps({
  items: {
    type: Array as () => PublicTransportModel[],
    required: true
  },
  isLast: {
    type: Boolean,
    required: true
  },
  isLoading: {
    type: Boolean,
    required: true
  },
  pageNo: {
    type: Number,
    required: true
  }
});

let publicTransportListObserver = useIntersectionObserver(
  loadMoreRef,
  ([{ isIntersecting }]) => {
    if (!isIntersecting || props.isLoading || props.isLast) {
      publicTransportListObserver.stop;
      return;
    }
    emit('updateList');
  },
  { threshold: 0.5 }
);
</script>
