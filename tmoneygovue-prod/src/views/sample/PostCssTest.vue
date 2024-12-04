<template>
  <sub-header title="이용내역" right-content>
    <template #header_right>
      <button type="button" class="btn pay_history_btn" @click="payHistory">결제내역</button>
    </template>
  </sub-header>
  <main id="main" class="main det tabs">
    <div class="container no_padding">
      <uu-tabs-test own-size-tab @selected="handleTabChange" :tabIndex="currentTab" focused>
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
      </uu-tabs-test>
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
import UuTabsTest from '@/components/uu-components/UuTabsTest.vue';

const usageHistoryStore = useUsageHistoryStore();
const router = useRouter();
const route = useRoute();

const currentTab = ref<number>(0);
const currentComponent = shallowRef<null | object>(null);

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
      //탭 변경 시에만 라우터 replace 하도록
      await router.replace({ query: { category: code } });
    }
    infoList.value = tabItems.value[tab].string;
    currentComponent.value = tabItems.value[tab].component;
    if (!keepMonth) {
      await usageHistoryStore.setInqrMonth('');
    }
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
    text: '대중교통',
    code: 'public',
    component: PublicTransportList,
    string: [
      '최근 1년까지의 이력만 조회 가능합니다.',
      '탑승일 기준 2일 뒤 거래부터 확인 가능합니다.',
      '수도권 외 지역 대중교통은 버스와 지하철 표출만 가능합니다.'
    ]
  },
  {
    text: '고속·시외',
    code: 'bus',
    component: BusHistoryList,
    string: ['최근 1년까지의 이력만 조회 가능합니다.']
  },
  {
    text: '택시',
    code: 'taxi',
    component: TaxiHistoryList,
    string: ['최근 1년까지의 이력만 조회 가능합니다.']
  },
  {
    text: '공공자전거',
    code: 'bike',
    component: PublicBicycleList,
    string: [
      '최근 1년까지의 이력만 조회 가능합니다.',
      '이용 서비스에 따라 수집되는 정보가 다를 수 있습니다.',
      '티머니GO를 통해 이용한 정보만 제공됩니다.'
    ]
  },
  {
    text: '자전거/킥보드',
    code: 'kickboard',
    component: BikeScooterList,
    string: [
      '최근 1년까지의 이력만 조회 가능합니다.',
      '이용 서비스에 따라 수집되는 정보가 다를 수 있습니다.',
      '티머니GO를 통해 이용한 정보만 제공됩니다.'
    ]
  },
  {
    text: '기차',
    code: 'train',
    component: TrainHistoryList,
    string: ['최근 1년까지의 이력만 조회 가능합니다.']
  },
  {
    text: '항공',
    code: 'airplane',
    component: AirplaneHistoryList,
    string: ['최근 1년까지의 이력만 조회 가능합니다.']
  },
  {
    text: '렌터카',
    code: 'rentercar',
    component: CarRentHistoryList,
    string: ['최근 1년까지의 이력만 조회 가능합니다.']
  },
  {
    text: '여행',
    code: 'travel',
    component: TravelHistoryList,
    string: ['최근 1년까지의 이력만 조회 가능합니다.']
  }
]);

const infoList = ref<string[]>(tabItems.value[0].string);

onMounted(() => {
  const category = route.query.category as string;

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
