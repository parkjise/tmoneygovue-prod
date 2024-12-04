<template>
  <subHeader title="여행 기획전" />
  <main class="main exhibition" v-if="isMounted" role="presentation">
    <div v-if="reqComplete" class="container no_padding" :class="{ no_result: getNoResult }">
      <ul class="exhibition_list" v-if="!getNoResult">
        <li v-for="(item, index) in exhbtList.planList" :key="index" @click="clickExhibition(item)">
          <button type="button" :aria-label="`${item.title} 이동`">
            <div>
              <div class="exhibition_title">{{ item.title }}</div>
              <div class="exhibition_date">{{ getTotalDate(item) }}</div>
            </div>
            <div class="exhibition_thumb" :style="{ backgroundImage: `url('${item.imageUrl}')` }" />
          </button>
        </li>
        <li ref="lastItemRef" v-if="exhbtList.totalPages > 1" />
      </ul>
      <div class="no_result" v-else>
        <uu-ic v-bind="{ name: 'exclamation', size: '48' }" />
        <div class="no_result_txt">
          <div class="bold_txt">기획전 준비중</div>
          다양한 기획전과 더 좋은 상품을 <br />
          제공해 드리기 위해 준비중에 있습니다.
        </div>
      </div>
    </div>
    <travel-exception v-else @retry="reqExhbtList" />
  </main>
</template>
<script setup lang="ts">
import TravelException from '../component/TravelException.vue';

import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import { formatDate } from '@/utils/dateUtils';
import type { PlanData } from '@/service/travel/model/exhibitionModel';
import { useTrvlExbhtStore } from '@/service/travel/exhibitionModule';
import { useIntersectionObserver } from '@vueuse/core';

const router = useRouter();
const exhbtStore = useTrvlExbhtStore();

const { exhbtList } = storeToRefs(exhbtStore);

const lastItemRef = ref();
const isLoading = ref(true);

const isMounted = ref(false);
const reqComplete = ref(true);

onMounted(async () => {
  await reqExhbtList();
  isMounted.value = true;
});

const reqExhbtList = async (isMore?: boolean) => {
  isLoading.value = true;
  reqComplete.value = await exhbtStore.reqExhbtList(isMore);
  isLoading.value = false;
};

/**
 * @description 기획전 데이터 존재여부
 */
const getNoResult = computed(() => {
  return exhbtList.value.planList.length < 1;
});

/**
 * @description 기획전 기간
 */
const getTotalDate = (item: PlanData) => {
  return `${formatDate(item.startDate, 'YYYY.MM.DD')} - ${formatDate(item.endDate, 'YYYY.MM.DD')}`;
};

/**
 * @description 기획전 상세 이동
 */
const clickExhibition = (item: PlanData) => {
  router.push({ name: 'exhibition-detail', query: { planId: item.planId } });
};

/**
 * @description 스크롤 더보기 옵저버
 */
useIntersectionObserver(
  lastItemRef,
  async ([{ isIntersecting }]) => {
    if (!isIntersecting || isLoading.value) return;
    reqExhbtList(true);
  },
  { threshold: 0.5 }
);
</script>
