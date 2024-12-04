<template>
  <!-- 검색 영역 -->
  <uu-input
    ref="keywordRef"
    v-model="keyword"
    type="search"
    class="search_bar_input"
    placeholder="여행 상품, 테마, 지역 검색"
    aria-label="검색어입력"
    has-ic
    hide-label
    btn-clear
    @keyup.enter="reqSearch"
  >
    <template #ic_name>
      <uu-ic v-bind="{ name: 'back', size: '24', src: '/assets/images/ic/ic_24_back.png' }" @click="goBack" />
    </template>
  </uu-input>
  <main id="main" class="main" v-if="reqComplete">
    <div class="container pt12 bg_white" v-show="!showAutoBox">
      <!-- 최근 검색 -->
      <div v-if="getRecentlyKwdList.length > 0">
        <h2 class="section_tit">
          최근 검색
          <button type="button" aria-label="전체삭제" class="side_txt_btn" @click="allDelete">전체삭제</button>
        </h2>
        <ul class="recent_search_list">
          <li v-for="(item, index) in getRecentlyKwdList" :key="index">
            <button type="button" :aria-label="`${item}`">
              <span @click="goProductList(item)">{{ item }}</span>
              <button type="button" aria-label="검색어 삭제" class="close_btn" @click="deleteKwd(index)">
                <uu-ic name="close_gray" size="16" />
              </button>
            </button>
          </li>
        </ul>
      </div>
      <!-- 인기 검색어 -->
      <template v-if="!reqRes.keywordErr && keywordList.length > 0">
        <h2 class="section_tit">인기 검색어</h2>
        <ul class="popular_search_list">
          <li v-for="(item, index) in keywordList" :key="index">
            <button :aria-label="`${item}`" type="button" @click="goProductList(item)">
              <span>{{ item }}</span>
            </button>
          </li>
        </ul>
      </template>
      <!-- 이달의 추천 기획전 -->
      <h2 class="section_tit">
        이달의 추천 기획전
        <button type="button" class="side_txt_btn" @click="allExhibition">전체 기획전 보기</button>
      </h2>
      <ul class="recommend_exhibition_list">
        <li v-for="(item, index) in srchPlanList" :key="index">
          <button :aria-label="`${item.title}이동`" type="button" @click="exhibitionDetail(item)">
            <span>{{ item.title }}</span>
          </button>
        </li>
      </ul>
      <div class="bottom_fixed_area" v-if="!reqRes.bannerErr && srchBannerList.length > 0">
        <!-- 영역 표시 용 style 적용 -->
        <uu-swiper type="custom" :options="swiperOptions" navi-pagination class="bottom_event_banner_swiper">
          <swiper-slide v-for="(item, index) in srchBannerList" :key="index">
            <div class="swiper_inner">
              <button type="button" :aria-label="`${item.title} 이동`" @click="clickBanner(item)">
                <img :src="item.imageUrl" :alt="`${item.title} 이미지`" />
              </button>
            </div>
          </swiper-slide>
        </uu-swiper>
      </div>
    </div>
    <!-- 검색어 자동완성 -->
    <trvl-search-auto-box v-show="showAutoBox" :keyword="keyword" @search="setKeyword" @detail="goDetail" />
  </main>
</template>

<script setup lang="ts">
import TrvlSearchAutoBox from '@/views/travel/search/component/TrvlSearchAutoBox.vue';
import { SwiperSlide } from 'swiper/vue';

import { useRouter } from 'vue-router';
import { useTrvlSrchStore } from '@/service/travel/searchModule';

import { onMounted, ref, computed } from 'vue';
import type { SrchPlanData } from '@/service/travel/model/searchModel';
import { productDtlUrlParsing, saveLocalKeyword } from '@/views/travel/travelUtils';
import { LocalStorageKey } from '@/utils/constants/globalConstants';
import { swiperOptions, LOC_KWRD } from '@/service/travel/travelConsts';
import { storeToRefs } from 'pinia';
import { isEqual } from 'lodash-es';
import type { BannerData } from '@/service/travel/model/introModel';

const router = useRouter();

const searchStore = useTrvlSrchStore();
const { keywordList, srchPlanList, srchBannerList } = storeToRefs(searchStore);

const reqComplete = ref(false);

const reqRes = ref();

const keywordRef = ref();

const keyword = ref(''); // 검색어
const recentlyKwrdList = ref<string[]>([]); // 최근검색어

onMounted(async () => {
  recentlyKwrdList.value = localStorage.getItem(LocalStorageKey.RCTLY_KEYWORD)?.split(LOC_KWRD.split) || [];
  reqRes.value = await searchStore.reqTrvlSearch();
  reqComplete.value = true;
});

const showAutoBox = computed(() => {
  return !isEqual(keyword.value, '');
});
/**
 * @description 최근검색어
 */
const getRecentlyKwdList = computed(() => {
  return recentlyKwrdList.value
    .filter((keyword) => keyword !== '')
    .slice()
    .reverse();
});

/**
 * @description 최근 검색어 삭제
 * @param index 선택 키워드 인덱스
 */
const deleteKwd = (index: number) => {
  recentlyKwrdList.value = getRecentlyKwdList.value.filter((keyword, idx) => index !== idx).reverse();
  localStorage.setItem(LocalStorageKey.RCTLY_KEYWORD, recentlyKwrdList.value.join(LOC_KWRD.split));
};

/**
 * @description 최근검색어 전체 삭제
 */
const allDelete = () => {
  recentlyKwrdList.value = [];
  localStorage.setItem(LocalStorageKey.RCTLY_KEYWORD, recentlyKwrdList.value.join(LOC_KWRD.split));
};

/**
 * @description 자동완성검색어 > 검색어로 세팅
 * @param kwd
 */
const setKeyword = (kwd: string) => {
  keyword.value = kwd;
  reqSearch();
};
/**
 * @description 상품조회
 */
const reqSearch = () => {
  // 최근검색어 저장
  saveLocalKeyword(keyword.value);
  goProductList(keyword.value);
};

const allExhibition = () => {
  router.push({
    name: 'exhibition'
  });
};

const exhibitionDetail = (item: SrchPlanData) => {
  router.push({
    name: 'exhibition-detail',
    query: { planId: item.planId }
  });
};

const goProductList = (keyword: string) => {
  router.push({
    name: 'travel-product',
    query: { keyword: keyword }
  });
};

const goDetail = (trvlPrdId: string) => {
  router.push({ name: 'product-detail', query: { trvlPrdId: trvlPrdId } });
};

const clickBanner = (item: BannerData) => {
  const res = productDtlUrlParsing(item.linkUrl);
  if (res) goDetail(res.id);
};

const goBack = () => {
  router.back();
};
</script>
