<!-- 검색 필터 바텀시트 -->
<template>
  <common-modal
    ref="filterBottomRef"
    v-model="filterBottom"
    type="bottom"
    add-class="filter_modal"
    hide-close-btn
    @ok="clickApplyBtn"
    @close="close"
    title="필터"
  >
    <!-- <template #modal_header> 필터 </template> -->
    <template #modal_header_right_btn>
      <uu-ic v-bind="{ name: 'reload', size: '16' }" @click="resetFilter" />
      <span class="btn_txt" @click="resetFilter">초기화</span>
    </template>
    <template #modal_body>
      <form>
        <p class="title">정렬</p>
        <div class="form_radio_btn_wrap">
          <uu-radio v-for="(item, index) in Sort" :key="index" v-model="sort" :value="item.value">
            <template #label>
              <p>{{ item.sortName }}</p>
            </template>
          </uu-radio>
        </div>
        <p class="title">금액</p>
        <div class="form_inline_input_wrap">
          <uu-input
            v-model.number="lowPrice"
            :placeholder="lowPricePlaceHolder"
            label="최저가 입력"
            size="xs"
            hide-label
            inputmode="numeric"
            :max="maxPrice"
            @input="oninput(true)"
            @focus="lowPricePlaceHolder = ''"
            @blur="onBlur(true)"
            @click="lowPrice = lowPrice.replaceAll(',', '')"
          />
          <span>~</span>
          <uu-input
            v-model.number="highPrice"
            :placeholder="highPricePlaceHolder"
            label="최고가 입력"
            size="xs"
            hide-label
            inputmode="numeric"
            :max="maxPrice"
            @input="oninput(false)"
            @focus="highPricePlaceHolder = ''"
            @blur="onBlur(false)"
            @click="highPrice = highPrice.replaceAll(',', '')"
          />
        </div>
        <p class="title">지역</p>
        <div class="form_check_btn_wrap">
          <uu-checkbox
            v-for="(item, index) in getAreaList"
            :key="index"
            v-model="selAreaList"
            :value="item.value"
            check-btn
            :disabled="item.value === ALL_CODE && selAreaList.includes(ALL_CODE)"
            @change="checkArea(item.value, $event)"
          >
            <span>{{ item.label }}</span>
          </uu-checkbox>
        </div>
        <p class="title">카테고리</p>
        <div class="form_radio_btn_wrap">
          <uu-radio
            v-for="(item, index) in getCategoryList"
            :key="index"
            v-model="selCategory"
            :value="item.value"
            @change="changeCategory"
          >
            <template #label>
              <p>{{ item.label }}</p>
            </template>
          </uu-radio>
        </div>
        <p class="title">테마</p>
        <div class="form_check_btn_wrap">
          <uu-checkbox
            v-for="(item, index) in getThemeList"
            :key="index"
            v-model="selThemeList"
            :value="item.value"
            check-btn
            :disabled="item.value === ALL_CODE && selThemeList.includes(ALL_CODE)"
            @change="checkTheme(item.value, $event)"
          >
            <span>{{ item.label }}</span>
          </uu-checkbox>
        </div>
      </form>
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" label="적용하기" aria-label="필터 적용하기" size="xl" @click="btnActions.ok" />
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useTrvlIntroStore } from '@/service/travel/introModule';
import { useProductStore, type FilterState } from '@/service/travel/productModule';
import type { Category } from '@/service/travel/model/trvlCmmModel';
import { ALL_CODE, Sort } from '@/service/travel/travelConsts';
import { formatAmount } from '@/utils/amountUtils';
import CommonModal from '@/views/common/components/CommonModal.vue';

const props = defineProps({
  isShow: { type: Boolean, default: false },
  categoryId: { type: String, default: '' }
});
const emits = defineEmits(['reset', 'apply', 'close']);

const introStore = useTrvlIntroStore();
const prdStore = useProductStore();

const filterBottomRef = ref<HTMLElement | null>();
const filterBottom = ref(false);

const themeList = ref<Category[]>([]);

const selAreaList = ref<string[]>([ALL_CODE]); // 선택 지역ID 리스트
const selCategory = ref<string>(ALL_CODE); // 선택 카테고리
const selThemeList = ref<string[]>([ALL_CODE]); // 선택 테마ID 리스트

const sort = ref(Sort.RECOMMEND.value);
const lowPrice = ref('');
const highPrice = ref('');

const lowText = '최저가 입력';
const highText = '최고가 입력';
const maxPrice = 1000000000;
const lowPricePlaceHolder = ref(lowText);
const highPricePlaceHolder = ref(highText);

onMounted(() => {
  changeCategory();
});

watch(
  () => props.isShow,
  () => {
    filterBottom.value = props.isShow;
    if (props.isShow) {
      lowPricePlaceHolder.value = lowText;
      highPricePlaceHolder.value = highText;
      selAreaList.value = prdStore.filter?.areaIds || [ALL_CODE];
      selCategory.value = prdStore.filter?.categoryId || ALL_CODE;
      selThemeList.value = prdStore.filter.themeIds || [ALL_CODE];
      if (prdStore.filter.lowPrice) lowPrice.value = formatAmount(prdStore.filter.lowPrice);
      else lowPrice.value = '';
      if (prdStore.filter.highPrice) highPrice.value = formatAmount(prdStore.filter.highPrice);
      else highPrice.value = '';
      sort.value = prdStore.filter.sort ?? Sort.RECOMMEND.value;
    }
  }
);
watch(
  () => props.categoryId,
  () => {
    selCategory.value = props.categoryId;
    changeCategory();
  }
);

/**
 * @description 대분류 카테고리 변경 시 테마 초기화
 */
const changeTabCategory = () => {
  return new Promise((resolve) => {
    themeList.value = [
      {
        categoryId: ALL_CODE,
        categoryName: '전체'
      }
    ];
    themeList.value.push(
      ...(introStore.categoryList.find((item) => item.categoryId === selCategory.value)?.subCategories || [])
    );
    resolve(true);
  });
};

/**
 * @description 지역리스트
 */
const getAreaList = computed(() => {
  return introStore.areaList.map((item) => {
    return {
      label: item.areaName,
      value: item.areaId
    };
  });
});

/**
 * @description 카테고리리스트
 */
const getCategoryList = computed(() => {
  return introStore.categoryList.map((item) => {
    return {
      label: item.categoryName,
      value: item.categoryId
    };
  });
});

/**
 * @description 테마리스트
 */
const getThemeList = computed(() => {
  return themeList.value.map((item) => {
    return {
      label: item.categoryName,
      value: item.categoryId
    };
  });
});
/**
 * @description 필터 초기화
 */
const resetFilter = () => {
  lowPricePlaceHolder.value = lowText;
  highPricePlaceHolder.value = highText;
  selCategory.value = ALL_CODE;
  sort.value = Sort.RECOMMEND.value;
  lowPrice.value = '';
  highPrice.value = '';
  checkArea(ALL_CODE, true);
  changeCategory();
};
/**
 * @description 필터 저장 및 적용
 */
const clickApplyBtn = async () => {
  const options: FilterState = {
    areaIds: selAreaList.value,
    categoryId: selCategory.value,
    themeIds: selThemeList.value,
    sort: sort.value,
    lowPrice: lowPrice.value === '' ? 0 : Number(lowPrice.value.replaceAll(',', '')),
    highPrice: highPrice.value === '' ? 0 : Number(highPrice.value.replaceAll(',', ''))
  };
  emits('apply', options);
};

const oninput = (isLowPrice: boolean) => {
  const regx = /^\D+/g;
  if (isLowPrice) lowPrice.value = lowPrice.value.toString().replaceAll(regx, '');
  else highPrice.value = highPrice.value.toString().replaceAll(regx, '');
};

const onBlur = (isLowPrice: boolean) => {
  const regx = /^\D+/g;
  const regx2 = /^0+/g;
  if (isLowPrice) {
    lowPrice.value = lowPrice.value.toString().replaceAll(regx, '');
    lowPrice.value = lowPrice.value.toString().replaceAll(regx2, '');
    if (lowPrice.value === '') lowPricePlaceHolder.value = lowText;
    else lowPrice.value = formatAmount(Number(lowPrice.value));
  } else {
    highPrice.value = highPrice.value.toString().replaceAll(regx, '');
    highPrice.value = highPrice.value.toString().replaceAll(regx2, '');
    if (highPrice.value === '') highPricePlaceHolder.value = highText;
    else highPrice.value = formatAmount(Number(highPrice.value));
  }
};

/**
 * @description 체크박스 이벤트
 * @param list
 * @param value
 * @param checked
 */
const changeCheck = (list: string[], value: string, checked: boolean) => {
  if (value === ALL_CODE || list.length === 0) return [ALL_CODE];
  if (checked) return list.filter((item) => item !== ALL_CODE);
  return list;
};

/**
 * @description 지역 체크박스 이벤트
 */
const checkArea = (value: string, checked: boolean) => {
  selAreaList.value = changeCheck(selAreaList.value, value, checked);
};
/**
 * @description 카테고리 라디오 이벤트
 */
const changeCategory = async () => {
  await changeTabCategory();
  checkTheme(ALL_CODE, true);
};

/**
 * @description 테마 체크박스 이벤트
 */
const checkTheme = (value: string, checked: boolean) => {
  selThemeList.value = changeCheck(selThemeList.value, value, checked);
};

const close = () => {
  emits('close');
};
</script>
