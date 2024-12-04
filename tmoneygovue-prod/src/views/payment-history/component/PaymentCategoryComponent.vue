<template>
  <uu-tabs own-size-tab @selected="handleTabChange">
    <uu-tab v-for="(tab, index) in items" :key="index" :title="tab.text">
      <p class="notice_fixed">
        <uu-ic size="16" name="exclamation_gray070" />
        {{ t('paymentHistory.det_014_001_008') }}
      </p>
    </uu-tab>
  </uu-tabs>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();

const emit = defineEmits(['updateCategory']);

const handleTabChange = (tab: number) => {
  emit('updateCategory', items[tab].value);
};

const items = reactive([
  {
    text: t('paymentHistory.det_014_001_002'), // 전체
    value: 'A'
  },
  {
    text: t('paymentHistory.det_014_001_003'), // 고속·시외
    value: 'B'
  },
  {
    text: t('paymentHistory.det_014_001_004'), // 택시
    value: 'O'
  },
  {
    text: t('paymentHistory.det_014_001_005'), // 공공자전거
    value: 'T'
  },
  {
    text: t('paymentHistory.det_014_001_006'), //자전거/킥보드
    value: 'X'
  },
  {
    text: '기차',
    value: 'R'
  },
  {
    text: t('paymentHistory.det_014_001_007'),
    value: 'U'
  },
  {
    text: '렌터카',
    value: 'L'
  }
]);
</script>
