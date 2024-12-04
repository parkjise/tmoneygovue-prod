<template>
  <common-modal
    v-model="isShow"
    type="full"
    title="결제 상세정보"
    has-bg
    full-content
    is-back
    @close="closeAction"
    hide-footer
  >
    <main id="main" class="main no_padding det" v-if="isInit">
      <div class="container pt12">
        <div class="pay_detail_area">
          <div class="pay_title">
            <p class="title">
              <span class="ic_area">
                <img
                  v-if="props.utlzSvcDvsCd === 'T'"
                  src="/assets/images/ic/ic_vehicle_seoulbike.svg"
                  alt="자전거 아이콘"
                  role="presentation"
                />
                <img v-else src="/assets/images/ic/ic_vehicle_tashu.svg" alt="자전거 아이콘" role="presentation"/>
              </span>
              {{ props.svcNm }}
            </p>
            <p class="status" :class="setColor(bikePaymentHistory.pymStaCd)">
              {{ setStatus(bikePaymentHistory.pymStaCd) }}
            </p>
          </div>

          <round-box hide-title>
            <div class="box_title">
              {{
                bikePaymentHistory.rntHstSno ? t('paymentHistory.det_010_001_010') : t('paymentHistory.det_015_001_004')
              }}
              <uu-button
                v-if="bikePaymentHistory.rntHstSno"
                btn-style="line"
                label="초과이용상세"
                class="btn_payment"
                @click="clickGotoUsageDetail"
              />
            </div>
            <ul class="detail_list">
              <!-- 결제일 -->
              <li>
                <p class="title">{{ t('paymentHistory.det_015_001_005') }}</p>
                <!-- <p class="num" :aria-label="formatA11yDateTime(bikePaymentHistory.pymAprvDt.slice(0, 10))">
                  {{ bikePaymentHistory.pymAprvDt ? bikePaymentHistory.pymAprvDt.slice(0, 10) : '' }}
                </p> -->
                <!-- <span id="pymAprvDt" class="sr_only">{{
                  formatA11yDateTime(bikePaymentHistory.pymAprvDt.slice(0, 10))
                }}</span> -->
                <p class="num" :aria-label="formatA11yDateTime(bikePaymentHistory.pymAprvDt.slice(0, 10))" role="text">
                  {{ bikePaymentHistory.pymAprvDt ? bikePaymentHistory.pymAprvDt.slice(0, 10) : '' }}
                </p>
              </li>
              <!--// 결제일 -->
              <!-- 이용권 -->
              <li>
                <p class="title">{{ t('paymentHistory.det_015_001_006') }}</p>
                <p class="num">{{ bikePaymentHistory.cpnDvsNm }}</p>
              </li>
              <!--// 이용권 -->
            </ul>
          </round-box>

          <round-box hide-title>
            <div class="box_title">
              {{ t('paymentHistory.det_015_001_008') }}
              <uu-button
                v-if="bikePaymentHistory.pymCancPsbYn === 'Y'"
                btn-style="line"
                label="결제취소"
                class="btn_payment"
                @click="clickCancelButton"
              />

              <uu-button
                v-if="bikePaymentHistory.ryPsbYn === 'Y'"
                btn-style="line"
                label="환불신청"
                class="btn_payment"
                @click="bikePaymentHistory.msg ? (refundShow = true) : clickRefundButton()"
              />
            </div>
            <ul class="detail_list payment">
              <!-- 요금 -->
              <li>
                <p class="title">{{ setAddFeeDetail(bikePaymentHistory) }}</p>
                <p class="num">
                  <span>{{ formatAmount(bikePaymentHistory.pymAmt) }}</span
                  >원
                </p>
              </li>
              <!-- 쿠폰할인 -->
              <li v-if="!!bikePaymentHistory.cpnUseAmt">
                <p class="title">{{ t('paymentHistory.det_015_001_011') }}</p>
                <p class="num discount">
                  <span>-{{ formatAmount(bikePaymentHistory.cpnUseAmt) + '원' }}</span>
                </p>
              </li>
              <!-- GO 마일리지 -->
              <li v-if="!!bikePaymentHistory.tmgMlgUseAmt">
                <p class="title">{{ t('paymentHistory.det_015_001_013') }}</p>
                <p class="num discount">
                  <span>-{{ formatAmount(bikePaymentHistory.tmgMlgUseAmt) }}</span
                  >M
                </p>
              </li>
              <!-- 총 결제금액 -->
              <li class="sum_area">
                <p class="title">{{ t('paymentHistory.det_015_001_014') }}</p>
                <p class="num">
                  <span>{{ formatAmount(bikePaymentHistory.atlPymAmt) }}</span
                  >원
                </p>
              </li>
            </ul>
          </round-box>
          <round-box title="환불금액" v-if="bikePaymentHistory.pymStaCd === 'BIS_002'">
            <ul class="detail_list payment">
              <!-- 이용권요금 -->
              <li>
                <p class="title">{{ t('paymentHistory.det_015_001_009') }}</p>
                <ul class="info">
                  <li>
                    <p class="num">
                      <span>{{ formatAmount(bikePaymentHistory.pymAmt) }}</span
                      >원
                    </p>
                  </li>
                </ul>
              </li>
              <!-- 이용요금 -->
              <li>
                <p class="title">이용요금</p>
                <ul class="info">
                  <li>
                    <p class="num red">
                      <span>-{{ formatAmount(bikePaymentHistory.totUtlzAmt) }}</span
                      >원
                    </p>
                  </li>
                </ul>
              </li>
              <template v-if="bikePaymentHistory.totRyAmt > 0">
                <!-- 총 환불금액 -->
                <li class="sum_area">
                  <p class="title">총 환불금액</p>
                  <p class="num">
                    <span>{{ formatAmount(bikePaymentHistory.totRyAmt) }}</span
                    >원
                  </p>
                </li>
                <li v-if="bikePaymentHistory.pymRyAmt > 0">
                  <p class="title has_icon">{{ bikePaymentHistory.pymMnsIdnnVal }}</p>
                  <p class="num">
                    <span>{{ formatAmount(bikePaymentHistory.pymRyAmt) }}</span
                    >원
                  </p>
                </li>
                <!-- 쿠폰 -->
                <li v-if="bikePaymentHistory.cpnRyAmt > 0">
                  <p class="title has_icon">쿠폰</p>
                  <p class="num">
                    <span>{{ formatAmount(bikePaymentHistory.cpnRyAmt) }}</span
                    >원
                  </p>
                </li>
                <li v-if="bikePaymentHistory.tmgMlgRyAmt > 0">
                  <p class="title has_icon">마일리지</p>
                  <p class="num">
                    <span>{{ formatAmount(bikePaymentHistory.tmgMlgRyAmt) }}</span
                    >원
                  </p>
                </li>
              </template>
            </ul>
          </round-box>
          <round-box title="결제상세">
            <ul class="detail_list">
              <!-- 결제일시 -->
              <li>
                <p class="title">{{ t('paymentHistory.det_015_001_016') }}</p>
                <p class="num" :aria-label="getFormatA11yDate(bikePaymentHistory.pymAprvDt.slice(0, 19))" role="text">
                  {{ bikePaymentHistory.pymAprvDt ? bikePaymentHistory.pymAprvDt.slice(0, 19) : '' }}
                </p>
              </li>
              <template v-if="bikePaymentHistory.atlPymAmt > 0">
                <!-- 결제수단 -->
                <li>
                  <p class="title">{{ t('paymentHistory.det_015_001_017') }}</p>
                  <ul class="info">
                    <li>
                      <p class="tool">{{ bikePaymentHistory.pymMnsIdnnVal }}</p>
                    </li>
                  </ul>
                </li>
                <!-- 결제 금액 -->
                <li>
                  <p class="title">{{ t('paymentHistory.det_015_001_008') }}</p>
                  <ul class="info">
                    <li>
                      <p class="num">
                        <span>{{ formatAmount(bikePaymentHistory.pymAmt) }}</span>
                        {{ bikePaymentHistory.pymMnsCd === 'BIM_013' ? 'M' : '원' }}
                      </p>
                    </li>
                  </ul>
                </li>
              </template>
            </ul>
          </round-box>
          <div class="ticket_notice" v-if="!!bikePaymentHistory.rntHstSno">
            <p class="title">
              <uu-ic size="16" name="exclamation_gray090" />
              {{ t('paymentHistory.det_010_001_016') }}
            </p>
            <p class="desc">
              {{ t('paymentHistory.det_010_001_017') }}
            </p>
          </div>
          <!-- 이용권 환불 안내 -->
          <div
            class="ticket_notice"
            v-if="bikePaymentHistory.pymStaCd === 'BIS_002' || bikePaymentHistory.pymStaCd === 'BIS_004'"
          >
            <p class="title">
              <uu-ic size="16" name="exclamation_gray090" />
              {{ t('paymentHistory.det_023_001_010') }}
            </p>
            <p class="desc">
              {{ t('paymentHistory.det_023_001_012') }}
            </p>
            <p class="desc">사용하신 쿠폰/GO마일리지 소멸기간이 경과될 시 복원되지 않습니다.</p>
          </div>
          <!--// 이용권 환불 안내 -->
          <!-- 이용권 사용 안내 -->
          <div class="ticket_notice" v-else>
            <p class="title">
              <uu-ic size="16" name="exclamation_gray090" />
              {{ t('paymentHistory.det_020_001_017') }}
            </p>
            <p class="desc">
              {{ t('paymentHistory.det_020_001_018') }}
            </p>
          </div>
          <!--// 이용권 사용 안내 -->
        </div>
      </div>
    </main>
  </common-modal>

  <!-- GO마일리지 소멸 확인 confirm -->
  <common-modal v-model="refundShow" type="confirm" @ok="clickRefundButton">
    <template #modal_header> 환불 안내 </template>
    <template #modal_body>
      {{ bikePaymentHistory.msg }}
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" label="확인" @click="btnActions.ok" />
    </template>
  </common-modal>

  <!-- GO마일리지 소멸 확인 confirm -->
  <common-modal v-model="mileageShow" type="confirm" @ok="cancelShow = true" @close="mileageShow = false">
    <template #modal_header> {{ t('paymentHistory.det_021_001_001') }} </template>
    <template #modal_body>
      {{ t('paymentHistory.det_021_001_002') }}
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-style="line" label="아니요" @click="btnActions.close" />
      <uu-button btn-color="primary" label="네" @click="btnActions.ok" />
    </template>
  </common-modal>

  <!-- 이용권 결제 취소 확인 confirm -->
  <common-modal v-model="cancelShow" type="confirm" @ok="cancelPayment" @close="cancelShow = false">
    <template #modal_header> {{ t('paymentHistory.det_016_001_001') }} </template>
    <template #modal_body> {{ bikePaymentHistory.cpnDvsNm }}을 결제 취소 하시겠습니까? </template>
    <template #modal_footer="btnActions">
      <uu-button btn-style="line" label="아니요" @click="btnActions.close" />
      <uu-button btn-color="primary" label="네" @click="btnActions.ok" />
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import { usePaymentHistoryStore } from '@/service/payment/paymentHistoryModule';
import type {
  BikePaymentHistoryModel,
  ReqBikePaymentHistoryModel,
  RequestSaveBcclVchrPrchCancInf
} from '@/service/payment/model/paymentHistoryModel';
import { computed, onMounted, ref } from 'vue';
import { formatAmount } from '@/utils/amountUtils';
import { storeToRefs } from 'pinia';
import { useGoMileageStore } from '@/service/mileage/goMileageModule';
import { getAppBridge } from '@/utils';
import CommonModal from '@/views/common/components/CommonModal.vue';
import { useI18n } from '@/composables/useI18n';
import { formatA11yDateTime } from '@/utils/dateUtils';

const { t } = useI18n();
const paymentHistoryStore = usePaymentHistoryStore();
const goMileageStore = useGoMileageStore();
const { getBikePaymentHistory } = storeToRefs(paymentHistoryStore);

const bikePaymentHistory = computed(() => {
  return getBikePaymentHistory.value;
});

const emit = defineEmits(['isClose']);
const props = defineProps({
  isShow: {
    type: Boolean,
    required: true
  },
  pymSno: {
    type: String,
    required: true
  },
  utlzSvcDvsCd: {
    type: String,
    required: true
  },
  svcNm: {
    type: String,
    required: true
  }
});

const isInit = ref<boolean>(false);
const isShow = ref<boolean>(props.isShow);
const cancelShow = ref<boolean>(false);
const mileageShow = ref<boolean>(false);
const refundShow = ref<boolean>(false);

const closeAction = () => {
  emit('isClose');
};

/**
 * 상세 조회
 */
async function requestBikePaymentHistory() {
  isInit.value = false;
  await paymentHistoryStore.actionGetBikePaymentHistory({
    pymSno: props.pymSno,
    utlzSvcDvsCd: props.utlzSvcDvsCd
  } as ReqBikePaymentHistoryModel);
  isInit.value = true;
}

/**
 * 환불신청 버튼 클릭 이벤트
 */
const clickRefundButton = async () => {
  refundShow.value = false;

  const appBridge = await getAppBridge();

  const refund = await appBridge.openView({
    url: 'payment/bike/refund',
    viewType: 'native',
    viewJsonValue: JSON.stringify({ utlzSvcDvsCd: props.utlzSvcDvsCd, data: bikePaymentHistory.value })
  });

  if (refund.response.code === '0000') {
    await requestBikePaymentHistory();
  }
};

/**
 * 결제취소 버튼 클릭 이벤트
 */
const clickCancelButton = async () => {
  // 마일리지 소멸 확인
  const inqrMlgExpiYn = await goMileageStore.requestMileageExpiredYn();
  if (inqrMlgExpiYn === 'Y') {
    // 마일리지 소멸 확인 confirm
    mileageShow.value = true;
  } else {
    // 이용권 결제 취소 확인 confirm
    cancelShow.value = true;
  }
};

/**
 * 결제취소 로직
 */
const cancelPayment = async () => {
  const paymentResult = await paymentHistoryStore.requestMemberPaymentMethodInfo();

  if (paymentResult) {
    const cancelInfo = await paymentHistoryStore.requestSaveBcclVchrPrchCancInf({
      pymSno: bikePaymentHistory.value.pymSno,
      cancRyDvsCd: 'RF',
      utlzSvcDvsCd: 'T'
    } as RequestSaveBcclVchrPrchCancInf);

    if (cancelInfo) {
      const appBridge = await getAppBridge();
      if (cancelInfo.data.ctrnYn === 'Y') {
        appBridge.showToast({ message: '이용권 결제가 취소되었습니다.' });
        await requestBikePaymentHistory();
      } else {
        appBridge.showToast({
          message:
            '이용권 결제 취소에 실패하였습니다.\n다시 시도하거나 고객센터(1644-9255)로\n문의하여 주시기 바랍니다.'
        });
      }
    }
  }
};

/**
 * 상태값에 따른 라벨 명 설정
 * @param pymStaCd
 */
const setStatus = (pymStaCd: string) => {
  switch (pymStaCd) {
    case 'BIS_001':
      return t('paymentHistory.det_014_001_010'); // 결제완료
    case 'BIS_002':
      return t('paymentHistory.det_014_001_031'); // 환불완료
    case 'BIS_003':
      return t('paymentHistory.det_014_001_029'); // 결제취소
    case 'BIS_004':
      return t('paymentHistory.det_014_001_030'); // 환불예정
    default:
      return '';
  }
};

/**
 * 취소/환불 시 색상 설정
 * @param pymStaCd
 */
const setColor = (pymStaCd: string) => {
  switch (pymStaCd) {
    case 'BIS_001':
      return '';
    case 'BIS_002':
    case 'BIS_003':
    case 'BIS_004':
      return 'red';
    default:
      return '';
  }
};

/**
 * 추가요금 라벨 값 설정
 * @param item
 */
const setAddFeeDetail = (item: BikePaymentHistoryModel) => {
  if (item.rntHstSno) {
    return '추가요금';
  }
  if (item.pymStaCd) {
    return t('paymentHistory.det_015_001_009'); // 이용권요금
  }
};

/**
 * 자전거 이용내역 상세 브릿지
 */
const clickGotoUsageDetail = async () => {
  const appBridge = await getAppBridge();

  if (bikePaymentHistory.value.rntHstSno) {
    appBridge.openView({
      url: 'history/bike/detail',
      viewType: 'native',
      viewJsonValue: JSON.stringify({
        pmGrpDvsCd: 'T',
        utlzSvcDvsCd: props.utlzSvcDvsCd,
        rntHstSno: bikePaymentHistory.value.rntHstSno
      })
    });
  }
};

const getFormatA11yDate = (date: string) => {
  const weekday: string | null = date.match(/\((.*?)\)/)?.[1] || null;
  const dt = date.replace(/[^0-9]/g, '');
  const y = date.substring(0, 4);
  const m = dt.substring(4, 6);
  const d = dt.substring(6, 8);
  const h = dt.substring(8, 10);
  const minute = dt.substring(10, 12);

  return `${y}년${m}월${d}일${weekday}요일${h}시${minute}분`;
};

onMounted(() => {
  requestBikePaymentHistory();
});
</script>
