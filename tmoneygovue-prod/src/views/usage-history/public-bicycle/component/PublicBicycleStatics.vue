<template>
  <round-box hide-title>
    <uu-tabs class="segment_tab" @selected="onSelected">
      <uu-tab title="1개월"></uu-tab>
      <uu-tab title="3개월"></uu-tab>
      <uu-tab title="6개월" active></uu-tab>
    </uu-tabs>
    <ul class="normal_list" v-if="!!item.data">
      <li>
        <div class="list_tit">{{ t('usageHistory.det_009_001_012') }}</div>
        <div class="list_txt">{{ item.data.cumUtlzDrtm ? item.data.cumUtlzDrtm : '0' }}분</div>
      </li>
      <li>
        <div class="list_tit">{{ t('usageHistory.det_009_001_014') }}</div>
        <div class="list_txt">{{ item.data.cumMvmnDist === 0 ? '0.0' : item.data.cumMvmnDist }}km</div>
      </li>
      <li>
        <div class="list_tit">{{ t('usageHistory.det_009_001_015') }}</div>
        <div class="list_txt">{{ item.data.cumConsumeCal === 0 ? '0.0' : item.data.cumConsumeCal }}kcal</div>
      </li>
      <li>
        <div class="list_tit">{{ t('usageHistory.det_009_001_016') }}</div>
        <div class="list_txt">{{ item.data.cumCrbnSvng === 0 ? '0.0' : item.data.cumCrbnSvng }}kg</div>
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
  item: {
    type: Object as () => BikeScooterDtaModel,
    required: true
  }
});

/**
 * 공공자전거 기간 탭 변경 시 이벤트
 * @param index
 */
const onSelected = (index: number) => {
  emit('changeTab', '0' + (index + 1).toString());
};
</script>
