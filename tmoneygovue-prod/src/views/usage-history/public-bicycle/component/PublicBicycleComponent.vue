<template>
  <div class="usage_list_area" v-if="items && items.length > 0">
    <template v-if="((isLinked && items.find(x=> x.utlzSvcDvsCd == 'T')) || items.find(x=> x.utlzSvcDvsCd != 'T'))">
      <ul class="usage_list">
        <li v-for="(item, index) in items" :key="index" @click="clickGotoDetail(item)">
          <button type="button" class="usage_btn">
            <div class="usage_info">
              <p class="title num">
                <span class="ic_area">
                  <object :data="imageBasePath + imgSrc[item.utlzSvcDvsCd]" />
                </span>
                <span :aria-label="formatA11yDateTime(item.rntDtm.slice(0, 10))">
                  {{ item.rntDtm.slice(0, 10) }}
                </span>
              </p>
              <div class="use_time red_font">{{ item.utlzDrtm }}분 이용</div>
            </div>
            <ul class="normal_list">
              <li>
                <div class="list_tit">{{ t('usageHistory.det_010_001_006') }}</div>
                <div class="list_txt">
                  <span class="location">{{ item.rntPlc }}</span>
                  <span :aria-label="getFormatA11yMonth(item.rntDtm.slice(5, 16))">{{ item.rntDtm.slice(5, 16) }}</span>
                </div>
              </li>
              <li>
                <div class="list_tit">{{ t('usageHistory.det_010_001_009') }}</div>
                <div class="list_txt">
                  <span class="location">{{ item.rtrnPlc }}</span>
                  <span :aria-label="getFormatA11yMonth(item.rtrnDtm.slice(5, 16))">{{
                    item.rtrnDtm.slice(5, 16)
                  }}</span>
                </div>
              </li>
              <li>
                <div class="list_tit">{{ t('usageHistory.det_010_001_013') }}</div>
                <div class="list_txt">{{ item.mvmnDist }}m</div>
              </li>
            </ul>
          </button>
        </li>
      </ul>
      <div ref="loadMoreRef" class="load_more_btn_wrap" v-if="!props.isLast"></div>
    </template>
    <template v-else>
      <NoServiceComponent category="bike" />
    </template>
  </div>
  <div class="usage_list_area" v-else>
    <NoServiceComponent category="bike" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import type { BikeScooterModel } from '@/service/usage-history/model/bikeScooterModel';
import NoServiceComponent from '@/views/usage-history/component/NoServiceComponent.vue';
import { getAppBridge } from '@/utils';
import { useI18n } from '@/composables/useI18n';
import { formatA11yDateTime } from '@/utils/dateUtils';

const { t } = useI18n();
const imageBasePath = import.meta.env.VITE_IMAGE_BASE_PATH;
const emit = defineEmits(['updateList']);
const loadMoreRef = ref<HTMLElement | null>(null);

const props = defineProps({
  items: {
    type: Array as () => BikeScooterModel[],
    required: true
  },
  isLast: {
    type: Boolean,
    required: true
  },
  isLoading: {
    type: Boolean,
    required: true
  },
  pageNo: {
    type: Number,
    required: true
  },
  isLinked: {
    type: Boolean,
    required: true
  }
});

let publicBicycleListObserver = useIntersectionObserver(
  loadMoreRef,
  ([{ isIntersecting }]) => {
    if (!isIntersecting || props.isLoading || props.isLast) {
      publicBicycleListObserver.stop;
      return;
    }
    emit('updateList');
  },
  { threshold: 0.5 }
);

/**
 * 자전거 이용내역 상세 브릿지
 * @param item
 */
const clickGotoDetail = async (item: BikeScooterModel) => {
  //deeplink -> native 호출로 변경
  /*const path = 'tmoneytia://rental/history/detail?rntHstSno=' + item.rntHstSno + '&type=' + item.utlzSvcDvsCd;
  const commonStore = useCommonStore();

  commonStore.setRouterHeaderTitle('자전거 이용 상세정보');
  await router.push(encodeUriRouterPath(path));*/

  const appBridge = await getAppBridge();

  if (item) {
    appBridge.openView({
      url: 'history/bike/detail',
      viewType: 'native',
      viewJsonValue: JSON.stringify({
        pmGrpDvsCd: 'T',
        utlzSvcDvsCd: item.utlzSvcDvsCd,
        rntHstSno: item.rntHstSno,
        rntReqSno: item.rntReqSno
      })
    });
  }
};

const getFormatA11yMonth = (date: string) => {
  const dt = date.replaceAll(/[.\-:/\s]/g, '');
  const m = dt.substring(0, 2);
  const d = dt.substring(2, 4);
  const h = dt.substring(4, 6);
  const minute = dt.substring(6, 8);

  return `${m}월${d}일${h}시${minute}분`;
};

const imgSrc: { [key: string]: string } = {
  D: '/assets/images/ic/ic_vehicle_tashu.svg',
  T: '/assets/images/ic/ic_vehicle_seoulbike.svg'
};
</script>
