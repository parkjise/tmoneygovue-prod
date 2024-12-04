<template>
  <dd v-if="props.evcpUseAmt > 0">
    <div class="list_tit">쿠폰</div>
    <div class="list_txt">
      <span class="price">{{ !props.isPayCancel ? '-' : '' }}{{ getPriceText(props.evcpUseAmt) }}</span
      >원
    </div>
  </dd>
  <dd v-if="props.tmgMlgPymAmt > 0">
    <div class="list_tit">GO마일리지</div>
    <div class="list_txt">
      <span class="price">{{ !props.isPayCancel ? '-' : '' }}{{ getPriceText(props.tmgMlgPymAmt) }}</span
      >M
    </div>
  </dd>
</template>

<script setup lang="ts">
import { getPriceText } from '@/views/travel/travelUtils';

const props = defineProps({
  isPayCancel: { type: Boolean, default: false },
  evcpUseAmt: { type: Number, default: 0 },
  tmgMlgPymAmt: { type: Number, default: 0 }
});
</script>
