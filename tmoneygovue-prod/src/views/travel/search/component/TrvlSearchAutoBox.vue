<template>
  <div class="container no_padding">
    <ul class="search_result_list">
      <!-- 결과가 지역의 경우 -->
      <li v-for="(item, index) in srchAreaList" :key="index" @click="clickKeyword('A', index)">
        <!-- 지역검색어 -->
        <uu-ic v-bind="{ name: 'location', size: '20' }" />
        <div class="search_item" ref="areaKwdRef">
          <span class="search_txt">{{ getKeyword(item.areaName, index, 'A') }}</span>
          <div class="whole_item">상품 전체 보기</div>
        </div>
      </li>
      <!-- 결과가 검색어의 경우 -->
      <li v-for="(item, index) in keywords" :key="index" @click="clickKeyword('K', index)">
        <!-- 검색어배열 -->
        <uu-ic v-bind="{ name: 'search', size: '24' }" />
        <div class="search_item" ref="keywordRef">
          {{ getKeyword(item, index, 'K') }}
        </div>
      </li>
      <!-- 상품목록 -->
      <li v-for="(item, index) in prdList" :key="index" @click="clickKeyword('P', index)">
        <uu-ic v-bind="{ name: 'suitcase', size: '20' }" />
        <div class="search_item" ref="prdKwdRef">
          {{ getKeyword(item.trvlPrdNm, index, 'P') }}
        </div>
      </li>
    </ul>
    <!-- 상품 검색 결과가 없을 경우 -->
    <div class="no_result search_result" v-show="reqComplete && !existResult">
      <uu-ic v-bind="{ name: 'exclamation', size: '48' }" />
      <div class="no_result_txt">검색 결과가 없습니다.</div>
    </div>
    <travel-exception v-if="!reqComplete" :search-page="true" @retry="reqSrchKwd" />
  </div>
</template>

<script setup lang="ts">
import TravelException from '@/views/travel/component/TravelException.vue';

import { useTrvlSrchStore } from '@/service/travel/searchModule';
import { useProductStore } from '@/service/travel/productModule';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { isEqual, throttle } from 'lodash-es';

const searchStore = useTrvlSrchStore();
const prdStore = useProductStore();

const { srchAreaList, keywords, prdList } = storeToRefs(searchStore);

const props = defineProps({ keyword: { type: String, default: '' } });
const emits = defineEmits(['search', 'detail']);

const areaKwdRef = ref([]); // 지역목록배열ref
const keywordRef = ref([]); // 검색어배열ref
const prdKwdRef = ref([]); // 상품목록배열ref

const reqComplete = ref(true);

type KeywordType = 'A' | 'K' | 'P'; // 검색어타입 (지역, 검색어, 상품)

watch(
  () => props.keyword,
  () => {
    if (isEqual(props.keyword, '')) return;
    reqSrchKwd();
  }
);

const existResult = computed(() => {
  return srchAreaList.value.length > 0 || keywords.value.length > 0 || prdList.value.length > 0;
});

/**
 * @description 자동완성 스타일 적용문구
 * @param text 자동완성 문자열
 * @param index 자동완성 인덱스
 * @param type 지역/검색어/상품 타입
 */
const getKeyword = (text: string, index: number, type: KeywordType) => {
  const textList = text.split(' ');
  let el = null;
  let strSpan = '<span class="search_txt">';
  let endSpan = '</span>';
  let returnText = '';

  if (type === 'A') {
    el = areaKwdRef.value[index] as HTMLElement;
  } else if (type === 'K') {
    el = keywordRef.value[index] as HTMLElement;
  } else if (type === 'P') {
    el = prdKwdRef.value[index] as HTMLElement;
  }

  if (el) {
    for (let idx = 0; idx < textList.length; idx++) {
      const str = textList[idx];
      const startIndex = str.indexOf(props.keyword);
      if (startIndex > -1) {
        const endIndex = startIndex + props.keyword.length;
        returnText += `${str.substring(0, startIndex)}${strSpan}${props.keyword}${endSpan}${str.substring(endIndex)}`;
        continue;
      }
      returnText += ` ${str}`;
    }
    el.innerHTML = returnText;
  }
};

/**
 * @description 연관검색어 조회
 */
const clickKeyword = (type: KeywordType, index: number) => {
  let searchKwd = '';
  switch (type) {
    case 'A':
      searchKwd = srchAreaList.value[index].areaName;
      prdStore.setFilter({ areaIds: [srchAreaList.value[index].areaId] });
      emits('search', searchKwd);
      break;
    case 'K':
      searchKwd = keywords.value[index];
      emits('search', searchKwd);
      break;
    case 'P':
      searchKwd = prdList.value[index].trvlPrdNm;
      emits('detail', prdList.value[index].trvlPrdId);
      break;
  }
};
/**
 * 검색어 자동완성 조회 API
 */
const reqSrchKwd = throttle(async () => {
  reqComplete.value = await searchStore.reqPrdSrchKwd(props.keyword);
}, 500);
</script>
