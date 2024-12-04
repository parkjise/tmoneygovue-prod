<template>
  <div class="no_service" :class="setClass()">
    <uu-ic v-bind="{ name: 'exclamation', size: '48' }" />
    <div class="no_servie_txt">{{ serviceItem?.comment }}</div>
    <div class="btn_wrap" :class="category">
      <uu-button btn-color="primary" btn-style="line" @click="openToMain(serviceItem?.link)">
        {{ serviceItem?.buttonText }}
        <uuIc name="arrow2" size="16" />
      </uu-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { encodeUriRouterPath } from '@/utils/linkUtils';
import UuButton from '@/components/uu-components/UuButton.vue';
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();
const router = useRouter();

const serviceItem = computed(() => {
  return serviceItems[props.category as keyof typeof serviceItems];
});

const props = defineProps({
  category: {
    type: String,
    required: true
  }
});

/**
 * 카테고리 메인화면 이동
 * @param link
 */
const openToMain = async (link: string) => {
  await router.push(encodeUriRouterPath(link));
};

const setClass = () => {
  if (props.category === 'bike' || props.category === 'kickboard' || props.category === 'public') {
    return 'statics';
  }
};
const serviceItems = reactive({
  public: {
    comment: t('usageHistory.det_001_001_008'),
    buttonText: t('usageHistory.det_001_001_009'),
    link: 'tmoneytia://reward/transfer/main'
  },
  bus: {
    comment: t('usageHistory.det_001_002_001'),
    buttonText: t('usageHistory.det_001_002_002'),
    link: 'tmoneytia://bus/main'
  },
  travel: {
    comment: '여행 서비스를 지금 바로 이용해보세요!',
    buttonText: '여행 시작하기',
    link: '/travel/main'
  },
  taxi: {
    comment: t('usageHistory.det_001_003_001'),
    buttonText: t('usageHistory.det_001_003_002'),
    link: 'tmoneytia://onda/main'
  },
  bike: {
    comment: t('usageHistory.det_001_004_001'),
    buttonText: t('usageHistory.det_001_004_002'),
    link: 'tmoneytia://bike/main'
  },
  kickboard: {
    comment: t('usageHistory.det_001_005_001'),
    buttonText: t('usageHistory.det_001_005_002'),
    link: 'tmoneytia://xingxing/main'
  },
  train: {
    comment: t('usageHistory.det_001_008_001'),
    buttonText: t('usageHistory.det_001_008_002'),
    link: 'tmoneytia://train/main'
  },
  airplane: {
    comment: t('usageHistory.det_001_006_004'),
    buttonText: t('usageHistory.det_001_006_005'),
    link: 'tmoneytia://airplane/main'
  },
  rentCar: {
    comment: t('usageHistory.det_001_007_001'),
    buttonText: t('usageHistory.det_001_007_002'),
    link: 'tmoneytia://rentercar/main'
  }
});
</script>
