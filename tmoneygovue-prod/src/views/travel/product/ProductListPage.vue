<template>
  <sub-header title="상품 조회" />
  <main class="main tabs">
    <div class="container search_page" :class="{ no_result: !existData }">
      <uu-tabs own-size-tab class="search_category_tab" :tab-index="getSelCtgrIdx" @selected="changeTab" focused>
        <uu-tab v-for="(item, index) in categoryList" :key="index" :title="item.categoryName">
          <!-- 검색영역 -->
          <div class="top_fixed_area">
            <uu-input
              v-model="keyword"
              type="search"
              has-ic
              hide-label
              size="sm"
              placeholder="검색어를 입력해주세요."
              aria-label="검색어"
              @keyup.enter="reqSearch"
            >
              <template #ic_name>
                <uu-ic v-bind="{ name: 'search_primary', size: '20' }" @click="reqSearch" />
              </template>
            </uu-input>
            <div class="filter_area">
              <div class="filter_condition">{{ getSort }}</div>
              <button type="button" class="filter_btn" aria-label="필터" @click="showBottom = true">
                <uu-ic v-bind="{ name: 'filter', size: '20' }" />
              </button>
            </div>
          </div>
          <!-- 상품목록 -->
          <template v-if="emptyScreen" />
          <template v-else-if="reqComplete">
            <ul v-if="existData" class="product_item_list">
              <li v-for="(item, index) in prdList" :key="index" @click="clickProduct(item)">
                <button type="button" :aria-label="`${item.trvlPrdNm}상세이동`">
                  <div class="img_area">
                    <img :src="item.imageUrl ?? ''" :alt="`${item.trvlPrdNm}이미지`" />
                  </div>
                  <!-- 상품상태에 따라 예약중지 배지 노출 -->
                  <uu-badge
                    v-if="item.prdStaCd === PrdStatus.PAUSE || item.prdStaCd === PrdStatus.CONFIRM"
                    :is-button="false"
                    class="pause_badge"
                    :label="item.prdStaNm"
                    :aria-label="item.prdStaNm"
                    badge-color="black"
                  />
                  <div class="product_info">
                    <div class="badge_area">
                      <!-- 카테고리 뱃지 -->
                      <span v-for="(category, idx) in item.categoryList" :key="idx" class="product_badge">
                        {{ category.categoryName }}
                      </span>
                    </div>
                    <div class="product_tit">
                      {{ item.trvlPrdNm }}
                    </div>
                    <div class="price_list">
                      <template v-if="item.dcPrice > 0 && item.dcPrice !== item.prdPrice">
                        <span>할인가</span>
                        <div class="price_wrap">
                          <span class="underline_price">{{ getPriceText(item.prdPrice) }}원</span>
                        </div>
                        <div class="price_wrap">
                          <span class="price">{{ getPriceText(item?.dcPrice) }}</span
                          >원
                        </div>
                      </template>
                      <div v-else class="price_wrap">
                        <span class="price">{{ getPriceText(item.prdPrice) }}</span
                        >원
                      </div>
                    </div>
                    <div class="mileage_area" v-if="item.dcAcmtPhrsCtt">
                      <uu-ic v-bind="{ name: 'mileage', size: '16' }" />
                      <span>{{ item.dcAcmtPhrsCtt }}</span>
                    </div>
                  </div>
                </button>
              </li>
              <!-- 상품목록이 짧은경우 스크롤이 없어도 재조회 됨 -->
              <li ref="lastItemRef" v-if="totalPages > 1" />
            </ul>
            <!-- 조회상품이 없는경우 -->
            <no-reseult-component v-else />
          </template>
          <!-- 상품목록 조회 오류 -->
          <travel-exception v-else :search-page="false" @retry="reqProductList(false)" />
        </uu-tab>
      </uu-tabs>
    </div>
  </main>
  <uu-floating v-if="existData" />
  <filter-bottom :is-show="showBottom" :category-id="selCategoryId" @apply="applyFilter" @close="showBottom = false" />
</template>
<script setup lang="ts">
import FilterBottom from './list/FilterBottom.vue';
import NoReseultComponent from '@/views/travel/component/NoResultComponent.vue';
import TravelException from '@/views/travel/component/TravelException.vue';

import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useIntersectionObserver } from '@vueuse/core';
import { throttle } from 'lodash-es';
import { useTrvlIntroStore } from '@/service/travel/introModule';
import { useProductStore, type FilterState } from '@/service/travel/productModule';

import { ALL_CODE, Sort, PrdStatus } from '@/service/travel/travelConsts';
import type { ProductData } from '@/service/travel/model/productModel';
import { saveLocalKeyword, getPriceText } from '../travelUtils';
import { storeToRefs } from 'pinia';

const router = useRouter();

const introStore = useTrvlIntroStore();
const prdStore = useProductStore();

const { categoryList, areaList } = storeToRefs(introStore);
const { totalPages, filter, prdList } = storeToRefs(prdStore);

const lastItemRef = ref(null); // 스크롤 더보기용 element ref
const showBottom = ref(false); // 필터 바텀시트
const isLoading = ref(true); // 상품조회 요청 여부
const selCategoryId = ref(ALL_CODE); // 대분류카테고리ID

const emptyScreen = ref(false); // 첫 진입 시 목록만 빈화면 처리
const reqComplete = ref(true); //조회요청 성공여부
const existData = ref(true); //상품목록 조회결과

const keyword = ref('');
const qureyFilterObj = ref({});

onUnmounted(() => {
  prdStore.initFilter();
});
onMounted(async () => {
  await parseFilter();
  await makeFilterQuery();
  if (!categoryList.value || categoryList.value.length < 1) await introStore.reqCatetory();
  if (!areaList.value || areaList.value.length < 1) await introStore.reqArea();

  selCategoryId.value = filter.value?.categoryId ? filter.value.categoryId : ALL_CODE;
  await reqProductList(false);
  emptyScreen.value = false;
});

/**
 * @description 필터값 store 저장
 */
const parseFilter = () => {
  return new Promise((resolve) => {
    let queryObj = router.currentRoute.value.query;
    let retFilter: { [key: string]: any } = {};

    const keys = Object.keys(queryObj);

    keys.forEach((key) => {
      if (queryObj[key]) {
        const value = (queryObj[key] as string).split(',');
        if (key === 'areaIds' || key === 'themeIds') retFilter[key] = value;
        else if (key === 'keyword') keyword.value = value.join('');
        else if (key === 'lowPrice' || key === 'highPrice') retFilter[key] = Number(value);
        else retFilter[key] = value.join('');
      }
    });
    prdStore.setFilter(retFilter);
    resolve(true);
  });
};

/**
 * @description 상품검색 시 필터 query 적용
 */
const makeFilterQuery = () => {
  return new Promise((resolve) => {
    const qureyFilter = {
      ...(filter.value.areaIds &&
        !filter.value.areaIds?.includes(ALL_CODE) && { areaIds: filter.value.areaIds.join(',') }),
      ...(filter.value.categoryId !== ALL_CODE && { categoryId: filter.value.categoryId }),
      ...(filter.value.themeIds &&
        !filter.value.themeIds?.includes(ALL_CODE) && { themeIds: filter.value.themeIds.join(',') }),
      ...(filter.value.lowPrice && filter.value.lowPrice > 0 && { lowPrice: filter.value.lowPrice }),
      ...(filter.value.highPrice && filter.value.highPrice > 0 && { highPrice: filter.value.highPrice }),
      sort: filter.value.sort
    };
    qureyFilterObj.value = qureyFilter;
    resolve(true);
  });
};

/**
 * @description 선택 탭 인덱스
 */
const getSelCtgrIdx = computed(() => {
  return categoryList.value.findIndex((item) => item.categoryId === selCategoryId.value);
});

/**
 * @description 정렬명 가져오기
 */
const getSort = computed(() => {
  const value = filter.value.sort ?? Sort.RECOMMEND.value;
  const keys = Object.keys(Sort);

  for (const key of keys) {
    if (Sort[key].value === value) {
      return Sort[key].sortName;
    }
  }
  return '';
});

/**
 * @description 탭 변경
 * @param idx
 */
const changeTab = async (idx: number) => {
  if (selCategoryId.value === categoryList.value[idx].categoryId) return;
  selCategoryId.value = categoryList.value[idx].categoryId;
  prdStore.setFilter({ categoryId: selCategoryId.value, themeIds: [ALL_CODE] });
  await makeFilterQuery();
  replaceRouter();
};
/**
 * @description 필터적용
 */
const applyFilter = async (applyFilter: FilterState) => {
  selCategoryId.value = applyFilter.categoryId || ALL_CODE;
  prdStore.setFilter(applyFilter);
  showBottom.value = false;
  await makeFilterQuery();
  replaceRouter();
};

/**
 * @description 검색어 저장 및 상품목록조회
 */
const reqSearch = throttle(async () => {
  // 검색어 저장
  saveLocalKeyword(keyword.value);
  // 상품목록 조회
  replaceRouter();
}, 500);

/**
 * @description 상품목록 스크롤 더보기 옵저버
 */
let productListObserver = useIntersectionObserver(
  lastItemRef,
  ([{ isIntersecting }]) => {
    if (!isIntersecting || isLoading.value) return;
    reqProductList(true);
  },
  { threshold: 0.5 }
);

const replaceRouter = async () => {
  if (qureyFilterObj.value) {
    await router.replace({
      name: 'travel-product',
      query: { ...(keyword.value !== '' && { keyword: keyword.value }), ...qureyFilterObj.value }
    });
  } else await router.replace({ name: 'travel-product' });
};

/**
 * @description 상품목록 조회 요청
 * @param isMore
 */
const reqProductList = async (isMore: boolean) => {
  isLoading.value = true;
  const res = await prdStore.reqPrdList(isMore, keyword.value);
  reqComplete.value = res;
  existData.value = prdList.value.length > 0;
  if (prdList.value.length < 1) {
    productListObserver.stop();
  }
  isLoading.value = false;
};

/**
 * @description 상품상세 이동
 */
const clickProduct = (item: ProductData) => {
  router.push({ name: 'product-detail', query: { trvlPrdId: item.trvlPrdId } });
};
</script>
