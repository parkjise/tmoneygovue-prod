<template>
  <sub-header title="이용내역" right-content>
    <template #header_right>
      <button type="button" class="btn pay_history_btn" @click="payHistory">
        {{ t('usageHistory.det_002_001_002') }}
      </button>
    </template>
  </sub-header>
  <main id="main" class="main det tabs">
    <div class="container no_padding usage">
      <uu-tabs own-size-tab @selected="handleTabChange" :tabIndex="currentTab" focused>
        <uu-tab v-for="(item, index) in tabItems" :key="index" :title="item.text" :isFocus="false">
          <div class="usage_area" :class="item.code">
            <div class="notice_wrap" :class="{ fixed: infoList.length == 1 }">
              <p v-for="(item, i) in infoList" :key="i">
                <uu-ic size="16" name="exclamation_gray070" />
                {{ item }}
              </p>
            </div>
            <template v-if="tabItems[index].component === currentComponent">
              <component :is="currentComponent" />
            </template>
          </div>
        </uu-tab>
      </uu-tabs>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, shallowRef } from 'vue';
import PublicTransportList from '@/views/usage-history/public-transport/PublicTransportList.vue';
import PublicBicycleList from '@/views/usage-history/public-bicycle/PublicBicycleList.vue';
import BusHistoryList from '@/views/usage-history/bus/BusHistoryList.vue';
import BikeScooterList from '@/views/usage-history/bike-scooter/BikeScooterList.vue';
import TaxiHistoryList from '@/views/usage-history/taxi/TaxiHistoryList.vue';
import TrainHistoryList from '@/views/usage-history/train/TrainHistoryList.vue';
import AirplaneHistoryList from '@/views/usage-history/airplane/AirplaneHistoryList.vue';
import CarRentHistoryList from '@/views/usage-history/carRent/CarRentHistoryList.vue';
import TravelHistoryList from '@/views/usage-history/travel/TravelHistoryList.vue';
import { useUsageHistoryStore } from '@/service/usage-history/usageHistoryModule';
import { useI18n } from '@/composables/useI18n';
import { formatDate } from '@/utils/dateUtils';
import { useMemberStore } from '@/service/member/memberModule';
import { storeToRefs } from 'pinia';

const usageHistoryStore = useUsageHistoryStore();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const currentTab = ref<number>(0);
const currentComponent = shallowRef<null | object>(null);
const memberStore = useMemberStore();
/**
 * 탭 변경 시 이벤트
 * @param tab
 * @param keepMonth
 */
const handleTabChange = async (tab: number, keepMonth: boolean) => {
  if (tabItems.value[tab]) {
    currentTab.value = tab;
    const code = tabItems.value[tab].code;
    if (!keepMonth) {
      await usageHistoryStore.setInqrMonth('');
      //탭 변경 시에만 라우터 replace 하도록
      await router.replace({ query: { category: code } });
    }
    infoList.value = tabItems.value[tab].string;
    currentComponent.value = tabItems.value[tab].component;
    // if (!keepMonth) {
    //   await usageHistoryStore.setInqrMonth('');
    // }
  }
};

/**
 * 결제내역 이동
 */
const payHistory = () => {
  router.push({
    path: '/payment/payment-history'
  });
};

/**
 * 이용내역 카테고리
 * 각 카테고리 값 별로 component를 지정하여 해당하는 카테고리 선택 시 컴포넌트 변경됨
 */
const tabItems = shallowRef([
  {
    text: t('usageHistory.det_002_001_003'),
    code: 'public',
    component: PublicTransportList,
    string: [t('usageHistory.det_002_001_008'), t('usageHistory.det_002_001_009'), t('usageHistory.det_002_001_010')]
  },
  {
    text: t('usageHistory.det_002_001_004'),
    code: 'bus',
    component: BusHistoryList,
    string: [t('usageHistory.det_002_001_008')]
  },
  {
    text: t('usageHistory.det_002_001_005'),
    code: 'taxi',
    component: TaxiHistoryList,
    string: [t('usageHistory.det_002_001_008')]
  },
  {
    text: t('usageHistory.det_002_001_006'),
    code: 'bike',
    component: PublicBicycleList,
    string: [
      t('usageHistory.det_002_001_008'),
      '이용 서비스에 따라 수집되는 정보가 다를 수 있습니다.',
      t('usageHistory.det_012_001_009')
    ]
  },
  {
    text: t('usageHistory.det_002_001_007'),
    code: 'kickboard',
    component: BikeScooterList,
    string: [
      t('usageHistory.det_002_001_008'),
      '이용 서비스에 따라 수집되는 정보가 다를 수 있습니다.',
      t('usageHistory.det_012_001_009')
    ]
  },
  {
    text: '기차',
    code: 'train',
    component: TrainHistoryList,
    string: [t('usageHistory.det_002_001_008')]
  },
  {
    text: '항공',
    code: 'airplane',
    component: AirplaneHistoryList,
    string: [t('usageHistory.det_002_001_008')]
  },
  {
    text: '렌터카',
    code: 'rentercar',
    component: CarRentHistoryList,
    string: [t('usageHistory.det_002_001_008')]
  },
  {
    text: '여행',
    code: 'travel',
    component: TravelHistoryList,
    string: ['최근 1년까지의 이력만 조회 가능합니다.']
  }
]);

const infoList = ref<string[]>(tabItems.value[0].string);
const { setIsLinked } = storeToRefs(usageHistoryStore);
onMounted(async () => {
  const category = route.query.category as string;
  // 이용내역 진입 시 서비스동의여부 조회
  if (!setIsLinked.value) {
    await memberStore.setLinkedServiceCodeList({ inqrDtm: formatDate(new Date(), 'YYYYMMDDHHmmss') });
    usageHistoryStore.setIsLinkedValue();
  }

  if (category) {
    handleTabChange(
      tabItems.value.findIndex((c) => c.code === category),
      true
    );
  } else {
    handleTabChange(0, true);
  }
});
</script>
