<template>
  <round-box hide-title>
    <uu-tabs class="segment_tab" @selected="onSelected">
      <uu-tab title="1개월"></uu-tab>
      <uu-tab title="3개월"></uu-tab>
      <uu-tab title="6개월" active></uu-tab>
    </uu-tabs>
    <ul class="normal_list" v-if="!!responseDta.data">
      <li>
        <div class="list_tit">{{ t('usageHistory.det_012_001_014') }}</div>
        <div class="list_txt">{{ responseDta.data.totMvmnCnt }}회</div>
      </li>
      <li>
        <div class="list_tit">{{ t('usageHistory.det_012_001_016') }}</div>
        <div class="list_txt">
          <span :aria-label="getFormatA11yMonth(responseDta.data.totMvmnTime ?? '')" role="text"
            >{{ responseDta.data.totMvmnTime !== ':' ? responseDta.data.totMvmnTime : '00:00' }}분</span
          >
        </div>
      </li>
      <li>
        <div class="list_tit">{{ t('usageHistory.det_012_001_018') }}</div>
        <div class="list_txt">
          {{ responseDta.data.totMvmnDist ? responseDta.data.totMvmnDist.toLocaleString() : 0 }}km
        </div>
      </li>
    </ul>
  </round-box>
</template>

<script setup lang="ts">
import type { BikeScooterDtaModel } from '@/service/usage-history/model/bikeScooterModel';
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();

const emit = defineEmits(['changeTab']);

defineProps({
  responseDta: {
    type: Object as () => BikeScooterDtaModel,
    required: true
  }
});

/**
 * 기간 탭 변경 시 이벤트
 * @param index
 */
const onSelected = (index: number) => {
  emit('changeTab', '0' + (index + 1).toString());
};

const getFormatA11yMonth = (time: string) => {
  const t = time.replaceAll(/[.\-:/\s]/g, '');
  const h = t.substring(0, 2) === '00' ? '0' : t.substring(0, 2);
  const m = t.substring(2, 4);

  return `${h}시간${m}분`;
};
</script>
