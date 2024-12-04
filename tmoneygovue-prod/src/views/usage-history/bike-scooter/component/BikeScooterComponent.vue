<template>
  <div class="usage_list_area" v-if="items && items.length > 0">
    <!-- 자전거/킥보드 이용내역 목록 -->
    <template v-if="((isLinked && items.find(x=> x.utlzSvcDvsCd == 'X')) || items.find(x=> x.utlzSvcDvsCd != 'X'))">
      <ul class="usage_list">
        <li v-for="(item, index) in items" :key="index">
          <button type="button" class="usage_btn" @click="clickGotoDetail(item)">
            <div class="usage_info">
              <p class="title num">
                <span class="ic_area" :aria-label="labels[item.utlzSvcDvsCd]">
                  <object v-if="isMounted" :data="imageBasePath + imgSrc[item.utlzSvcDvsCd]" />
                </span>
                <span :aria-label="formatA11yDateTime(item.rntDtm.slice(0, 10))">
                  {{ item.rntDtm.slice(0, 10) }}
                </span>
              </p>
              <div class="use_time red_font">
                {{ item.useTime.slice(0, 2) !== '00' ? item.useTime.slice(0, 2) + '시간' : '' }}
                {{ item.useTime.slice(3, 5) !== '00' ? item.useTime.slice(3, 5) + '분' : '' }}
                {{ item.useTime.slice(6, 8) !== '00' ? item.useTime.slice(6, 8) + '초' : '' }}
                이용
              </div>
            </div>
            <ul class="normal_list">
              <li>
                <div class="list_tit">{{ t('usageHistory.det_012_001_020') }}</div>
                <div class="list_txt" :aria-label="getFormatA11yMonth(item.rntDtm)">{{ item.rntDtm }}</div>
              </li>
              <li>
                <div class="list_tit">{{ t('usageHistory.det_012_001_021') }}</div>
                <div class="list_txt" :aria-label="getFormatA11yMonth(item.rtrnDtm)">
                  {{ item.rtrnDtm }}
                </div>
              </li>
              <li>
                <div class="list_tit">{{ t('usageHistory.det_012_001_022') }}</div>
                <div class="list_txt">{{ item.mvmnDist ? item.mvmnDist.toLocaleString() : 0 }}m</div>
              </li>
            </ul>
          </button>
        </li>
      </ul>
      <div ref="loadMoreRef" class="load_more_btn_wrap" v-if="!props.isLast"></div>
    </template>
    <!--// 자전거/킥보드 이용내역 목록 -->
    <template v-else>
      <NoServiceComponent category="kickboard" />
    </template>
  </div>
  <div class="usage_list_area" v-else>
    <NoServiceComponent category="kickboard" />
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
const loadMoreRef = ref<HTMLElement | null>(null);

const emit = defineEmits(['updateList']);

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
  isMounted: {
    type: Boolean,
    required: true
  },
  isLinked: {
    type: Boolean,
    required: true
  }
});

let bikeScooterListObserver = useIntersectionObserver(
  loadMoreRef,
  ([{ isIntersecting }]) => {
    if (!isIntersecting || props.isLoading || props.isLast) {
      bikeScooterListObserver.stop;
      return;
    }
    emit('updateList');
  },
  { threshold: 0.5 }
);

/**
 * 킥보드 이용내역 상세 브릿지
 * @param item
 */
const clickGotoDetail = async (item: BikeScooterModel) => {
  //deeplink -> native 호출로 변경
  /*const path = 'tmoneytia://rental/xingxing/detail?rntHstSno=' + item.rntHstSno + '&type=' + item.utlzSvcDvsCd;

  const commonStore = useCommonStore();

  commonStore.setRouterHeaderTitle('킥보드 이용 상세정보');
  await router.push(encodeUriRouterPath(path));*/

  const appBridge = await getAppBridge();

  if (item) {
    appBridge.openView({
      url: 'history/kickboard/detail',
      viewType: 'native',
      viewJsonValue: JSON.stringify({
        pmGrpDvsCd: 'X',
        utlzSvcDvsCd: item.utlzSvcDvsCd,
        rntHstSno: item.rntHstSno,
        rntReqSno: item.rntReqSno
      })
    });
  }
};

const imgSrc: { [key: string]: string } = {
  M: '/assets/images/ic/ic_vehicle_swing.svg',
  W: '/assets/images/ic/ic_vehicle_swing.svg',
  X: '/assets/images/ic/ic_vehicle_ssing.svg',
  E: '/assets/images/ic/ic_vehicle_gqoo.svg',
  G: '/assets/images/ic/ic_vehicle_gqoo.svg',
  I: '/assets/images/ic/ic_vehicle_kickgo.svg',
  K: '/assets/images/ic/ic_vehicle_kickgo.svg',
  J: '/assets/images/ic/ic_vehicle_elecle.svg',
  Q: '/assets/images/ic/ic_vehicle_beam.svg'
};

const labels: { [key: string]: string } = {
  M: '스윙',
  W: '스윙',
  X: '씽씽',
  E: '지쿠',
  G: '지쿠',
  I: '킥고잉',
  K: '킥고잉',
  J: '일레클',
  Q: '빔'
};

const getFormatA11yMonth = (date: string) => {
  const dt = date.replaceAll(/[.\-:/\s]/g, '');
  const m = dt.substring(4, 6);
  const d = dt.substring(6, 8);
  const h = dt.substring(8, 10);
  const minute = dt.substring(10, 12);
  const second = dt.substring(12, 14);

  return `${m}월${d}일${h}시${minute}분${second}초`;
};
</script>
