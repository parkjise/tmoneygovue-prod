<template>
  <div class="pay_btn_area">
    <uu-button btn-style="none" class="btn_pay" v-for="(item, index) in items" :key="index" @click="openDetail(item)">
      <div class="pay_title">
        <p class="title">
          <span class="ic_area_22">
            <object :data="imageBasePath + utlzSvcDvsCdValues[item.utlzSvcDvsCd].imgSrc" />
          </span>
          <span class="title_area">{{ item.svcNm }}</span>
          <span
            v-if="item.utlzSvcDvsCd === 'C' || item.utlzSvcDvsCd === 'H' || item.utlzSvcDvsCd === 'FG'"
            class="num_area"
            >{{ item.utlzSvcNm }}</span
          >
        </p>
        <p v-if="isCancel(item.pymPrcgStaNm)" class="status red">{{ item.pymPrcgStaNm }}</p>
        <p v-else class="status">{{ item.pymPrcgStaNm }}</p>
      </div>
      <ul class="payment_list">
        <!-- 결제 일시 -->
        <li>
          <!-- <p class="sub_title">{{ item.utlzSvcDvsCd === 'FG' ? '출발일시' : '결제일시' }}</p> -->
          <p class="sub_title">{{ t('paymentHistory.det_014_001_011') }}</p>
          <p class="num" :aria-label="formatA11yDateTime(item.pymDtm)">{{ item.pymDtm }}</p>
        </li>
        <li v-if="utlzSvcDvsCdValues[item.utlzSvcDvsCd].title">
          <p class="sub_title">{{ utlzSvcDvsCdValues[item.utlzSvcDvsCd].title }}</p>
          <p class="num">{{ item.utlzSvcNm }}</p>
        </li>
        <!--// 결제 일시 -->
        <!-- 결제 수단 -->
        <li class="info_area">
          <p class="sub_title">{{ t('paymentHistory.det_014_001_012') }}</p>
          <ul class="info">
            <li v-if="item.pymAmt && item.pymAmt !== '0'">
              <p class="tool">{{ item.pymMnsNm }}</p>
              <p class="num payment">
                <span>{{ formatAmount(item.pymAmt) + '원' }}</span>
              </p>
            </li>
            <li v-if="item.cpnUseAmt !== '0' && item.cpnUseAmt">
              <p :class="item.pymAmt !== '0' && item.pymAmt ? 'tool has_ic' : 'tool'">
                {{ t('paymentHistory.det_015_001_011') }}
              </p>
              <p class="num payment">
                <span>{{ formatAmount(item.cpnUseAmt) + '원' }}</span>
              </p>
            </li>
            <li v-if="item.mlgUseAmt !== '0' && item.mlgUseAmt">
              <p :class="item.pymAmt !== '0' && item.pymAmt ? 'tool has_ic' : 'tool'">
                {{ t('paymentHistory.det_015_001_013') }}
              </p>
              <p class="num payment">
                <span>{{ formatAmount(item.mlgUseAmt) + 'M' }}</span>
              </p>
            </li>
          </ul>
        </li>
        <!--// 결제 수단 -->
        <!-- 결제 금액 -->
        <li class="sum_area">
          <p class="sub_title">{{ t('paymentHistory.det_014_001_015') }}</p>
          <p class="num payment">
            <span>{{ formatAmount(item.ttutAmt) + '원' }}</span>
          </p>
        </li>
        <!--// 결제 금액 -->
      </ul>
    </uu-button>
    <div ref="loadMoreRef" class="load_more_btn_wrap" v-if="!props.isLast"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { PaymentHistoryModel } from '@/service/payment/model/paymentHistoryModel';
import { useIntersectionObserver } from '@vueuse/core';
import { formatAmount } from '@/utils/amountUtils';
import { getAppBridge } from '@/utils';
import { useI18n } from '@/composables/useI18n';
import { formatA11yDateTime } from '@/utils/dateUtils';

const { t } = useI18n();
const imageBasePath = import.meta.env.VITE_IMAGE_BASE_PATH;
const loadMoreRef = ref<HTMLElement | null>(null);
const isShow = ref<boolean>(false);

const emit = defineEmits(['updateList', 'showDetail']);

const props = defineProps({
  items: {
    type: Array as () => PaymentHistoryModel[],
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
  }
});

let paymentHistoryObserver = useIntersectionObserver(
  loadMoreRef,
  ([{ isIntersecting }]) => {
    if (!isIntersecting || props.isLoading || props.isLast) {
      paymentHistoryObserver.stop;
      return;
    }
    emit('updateList');
  },
  { threshold: 0.5 }
);

/**
 * 상세 화면 호출
 * @param item
 */
const openDetail = async (item: PaymentHistoryModel) => {
  const appBridge = await getAppBridge();

  if (['T', 'D', 'L', 'FG', 'S'].includes(item.utlzSvcDvsCd)) {
    emit('showDetail', item);
    isShow.value = true;
    return;
  } else if (['M', 'J', 'E', 'I', 'W', 'G', 'K', 'X', 'Q'].includes(item.utlzSvcDvsCd)) {
    if (item) {
      appBridge.openView({
        url: 'history/kickboard/detail',
        viewType: 'native',
        viewJsonValue: JSON.stringify({
          pmGrpDvsCd: 'X',
          utlzSvcDvsCd: item.utlzSvcDvsCd,
          rntHstSno: item.ognPymKeyVal
        })
      });
    }
  } else if (['FC', 'FD', 'O'].includes(item.utlzSvcDvsCd)) {
    if (item) {
      appBridge.openView({
        url: 'history/taxi/detail',
        viewType: 'native',
        viewJsonValue: JSON.stringify({ callId: item.ognPymKeyVal })
      });
    }
  }
};

/**
 * 결제진행상태명으로 취소 된 내역인지 확인
 * @param pymPrcgStaNm
 */
function isCancel(pymPrcgStaNm: string) {
  switch (pymPrcgStaNm) {
    case t('paymentHistory.det_014_001_029'): // 결제취소
    case t('paymentHistory.det_014_001_017'): // 예매취소
    case t('paymentHistory.det_014_001_031'): // 환불완료
    case t('paymentHistory.det_014_001_030'): // 환불예정
    case '망상취소':
    case '부분결제':
    case '미결제':
      return true;
  }
  return false;
}

const imgSrc: { [key: string]: string } = {
  expressBus: '/assets/images/ic/ic_vehicle_xzz.svg',
  intercityBus: '/assets/images/ic/ic_vehicle_xtz.svg',
  tashu: '/assets/images/ic/ic_vehicle_tashu.svg',
  seoulbike: '/assets/images/ic/ic_vehicle_seoulbike.svg',
  swing: '/assets/images/ic/ic_vehicle_swing.svg',
  xingxing: '/assets/images/ic/ic_vehicle_ssing.svg',
  gqoo: '/assets/images/ic/ic_vehicle_gqoo.svg',
  kickgo: '/assets/images/ic/ic_vehicle_kickgo.svg',
  elecle: '/assets/images/ic/ic_vehicle_elecle.svg',
  beam: '/assets/images/ic/ic_vehicle_beam.svg',
  taxi: '/assets/images/ic/ic_vehicle_taxi.svg',
  train: '/assets/images/ic/ic_vehicle_srt.svg',
  rentCar: '/assets/images/ic/ic_vehicle_rentcar.svg',
  airplane: '/assets/images/ic/ic_vehicle_airport.svg',
  travel: '/assets/images/ic/ic_vehicle_travel.svg',
  gopass: '/assets/images/ic/ic_tmoney_gopass_22.svg'
};

interface ServiceInfo {
  title: string;
  imgSrc: string;
}

const utlzSvcDvsCdValues: { [key: string]: ServiceInfo } = {
  C: { title: '', imgSrc: imgSrc['expressBus'] },
  H: { title: '', imgSrc: imgSrc['intercityBus'] },
  T: { title: t('paymentHistory.det_015_001_006'), imgSrc: imgSrc['seoulbike'] }, // 이용권
  D: { title: t('paymentHistory.det_015_001_006'), imgSrc: imgSrc['tashu'] }, // 이용권
  M: { title: '이용시간', imgSrc: imgSrc['swing'] },
  J: { title: '이용시간', imgSrc: imgSrc['elecle'] },
  E: { title: '이용시간', imgSrc: imgSrc['gqoo'] },
  I: { title: '이용시간', imgSrc: imgSrc['kickgo'] },
  W: { title: '이용시간', imgSrc: imgSrc['swing'] },
  G: { title: '이용시간', imgSrc: imgSrc['gqoo'] },
  K: { title: '이용시간', imgSrc: imgSrc['kickgo'] },
  X: { title: '이용시간', imgSrc: imgSrc['xingxing'] },
  Q: { title: '이용시간', imgSrc: imgSrc['beam'] },
  S: { title: '', imgSrc: imgSrc['gopass'] },
  FC: { title: '', imgSrc: imgSrc['taxi'] },
  FD: { title: '', imgSrc: imgSrc['taxi'] },
  O: { title: '', imgSrc: imgSrc['taxi'] },
  R: { title: '', imgSrc: imgSrc['train'] },
  L: { title: '', imgSrc: imgSrc['rentCar'] },
  U: { title: '', imgSrc: imgSrc['airplane'] },
  FG: { title: '', imgSrc: imgSrc['travel'] }
};
</script>
