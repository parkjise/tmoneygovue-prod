<template>
  <common-modal
    v-model="isShow"
    type="full"
    title="결제 상세정보"
    has-bg
    full-content
    :is-back="false"
    @close="emits('isClose')"
    hide-footer
  >
    <main id="main" class="main no_padding det" v-if="reqComplete">
      <div class="container pt12">
        <div class="pay_detail_area travel">
          <div class="pay_title">
            <p class="title">
              <span class="ic_area">
                <img src="/assets/images/ic/ic_vehicle_travel.svg" alt="여행 아이콘" role="presentation" />
              </span>
              여행
            </p>
            <p class="status">{{ paymentDtl?.trvlPymPrcgStaNm || '' }}</p>
          </div>
          <round-box hide-title>
            <p class="travel_place">{{ paymentDtl?.trvlPrdNm || '' }}</p>
            <ul class="detail_list between">
              <li>
                <p class="title">여행일정</p>
                <p
                  class="num"
                  :aria-label="formatA11yDateTime(paymentDtl?.deprDt ?? '', paymentDtl?.deprTime, true)"
                  role="text"
                >
                  {{ getDateText(`${paymentDtl?.deprDt}${paymentDtl?.deprTime}`, true) }}
                </p>
              </li>
              <li v-if="isPayCancel === false">
                <p class="title">여행인원</p>
                <p class="num">{{ paymentDtl?.busTckKndNm ?? '' }}</p>
              </li>
              <li>
                <p class="title">출발장소</p>
                <p class="num">{{ paymentDtl?.deprTrmlNm }}</p>
              </li>
            </ul>
          </round-box>
          <round-box title="결제금액">
            <ul class="detail_list payment">
              <li>
                <p class="title">승인금액</p>
                <p class="num">
                  <span>{{ getPriceText(paymentDtl?.pymAmt) }}</span
                  >원
                </p>
              </li>
              <template v-if="isPayCancel">
                <li>
                  <p class="title">환불금액</p>
                  <p class="num">
                    <span>{{ getPriceText(getRefundAmt) }}</span
                    >원
                  </p>
                </li>
              </template>
              <li class="sum_area">
                <p class="title" :class="isPayCancel ? 'cancel' : ''">총 결제금액</p>
                <p class="num" :class="isPayCancel ? 'cancel' : ''">
                  <span>{{ getPriceText(getTotPayAmt + (paymentDtl?.cancBrkpAmt ?? 0)) }}</span
                  >원
                </p>
                <template v-if="isPayCancel">
                  <ul class="discount">
                    <li>
                      <p class="title">상품금액</p>
                      <p class="num">
                        <span>{{ getPriceText(getTotPayAmt) }}</span
                        >원
                      </p>
                    </li>
                    <li>
                      <p class="title">취소 수수료</p>
                      <p class="num red">
                        <span>{{ getPriceText(paymentDtl?.cancBrkpAmt) }}</span
                        >원
                      </p>
                    </li>
                  </ul>
                </template>
              </li>
            </ul>
          </round-box>
          <round-box hide-title>
            <div class="box_title">
              결제상세
              <uu-button
                btn-style="line"
                label="영수증"
                aria-label="영수증"
                class="btn_payment"
                @click="showReceipt = true"
              />
            </div>
            <ul class="detail_list between">
              <li>
                <p class="title">결제일시</p>
                <p class="num" :aria-label="formatA11yDateTime(paymentDtl?.pymDtm ?? '', '', true)" role="text">
                  {{ getDateText(paymentDtl?.pymDtm, true) }}
                </p>
              </li>
              <li v-if="isPayCancel">
                <p class="title">환불일시</p>
                <p class="num" :aria-label="formatA11yDateTime(paymentDtl?.pymCancDtm ?? '', '', true)" role="text">
                  {{ getDateText(paymentDtl?.pymCancDtm, true) }}
                </p>
              </li>
              <li>
                <p class="title">결제수단</p>
                <p class="num">{{ paymentDtl?.pymMnsNm ?? '' }}</p>
              </li>
              <li class="sum_area">
                <p class="title">{{ isPayCancel ? '결제금액' : '최종 결제금액' }}</p>
                <p class="num">
                  <span>{{ getPriceText(getPymAmt) }}</span
                  >원
                </p>
                <ul class="discount">
                  <li v-if="getUseCouponAmt > 0">
                    <p class="title">쿠폰</p>
                    <p class="num">
                      <span>-{{ getPriceText(getUseCouponAmt) }}</span
                      >원
                    </p>
                  </li>
                  <li v-if="getUseTmgMlgAmt > 0">
                    <p class="title">GO마일리지</p>
                    <p class="num">
                      <span>-{{ getPriceText(getUseTmgMlgAmt) }}</span
                      >M
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
          </round-box>
          <round-box title="여행사 정보">
            <ul class="detail_list between">
              <li>
                <p class="title">업체명</p>
                <p class="info">{{ paymentDtl?.busCacmNm || '' }}</p>
              </li>
              <li>
                <p class="title">주소</p>
                <p class="info">{{ paymentDtl?.busCacmAddr || '' }}</p>
              </li>
              <li>
                <p class="title">연락처</p>
                <p class="info">{{ paymentDtl?.busCacmTelNo || '' }}</p>
              </li>
            </ul>
          </round-box>
          <div class="ticket_notice">
            <ul>
              <li>실제 요금과 다를 수 있습니다.</li>
              <li>부가가치세법 상 적격 증빙이 필요한 경우 카드사에서 발급하는 카드 전표를 이용하여 주시기 바랍니다.</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 결제영수증 풀팝업 -->
      <trvl-pym-receipt :is-show="showReceipt" @close="showReceipt = false" />
    </main>
  </common-modal>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useHistoryStore } from '@/service/usage-history/travelHistoryModule';
import { getDateText, getPriceText } from '@/views/travel/travelUtils';
import { formatA11yDateTime } from '@/utils/dateUtils';

import TrvlPymReceipt from '@/views/usage-history/travel/component/TrvlPymReceipt.vue';
import CommonModal from '@/views/common/components/CommonModal.vue';

const trvlHistoryStore = useHistoryStore();

const { paymentDtl, isPayCancel } = storeToRefs(trvlHistoryStore);

const utlzSvcDvsCd = ref<string>('');
const svcPymSno = ref<string>('');

const showReceipt = ref(false);
const reqComplete = ref(false);

const props = defineProps({
  svcPymSnoParam: {
    type: String,
    required: true
  },
  utlzSvcDvsCdParam: {
    type: String,
    required: true
  },
  isShow: {
    type: Boolean,
    default: false
  }
});

const isShow = ref<boolean>(props.isShow);

onMounted(async () => {
  svcPymSno.value = props.svcPymSnoParam;
  utlzSvcDvsCd.value = props.utlzSvcDvsCdParam;

  // 결제내역상세 조회
  trvlHistoryStore.setReqMrnpDtlParam({ trvlMrnpSno: svcPymSno.value });
  reqComplete.value = await trvlHistoryStore.reqPaymentDtl();
});

const getRefundAmt = computed(() => {
  let amt = 0;
  if (paymentDtl.value) {
    amt = paymentDtl.value.pmmtCancAmt + paymentDtl.value.tmgMlgCancAmt + paymentDtl.value.evcpUseCancAmt;
  }
  return amt > 0 ? `-${amt}` : amt;
});

const getPymAmt = computed(() => {
  if (!paymentDtl.value) return 0;
  return paymentDtl.value.pmmtPymAmt - paymentDtl.value.pmmtCancAmt;
});

const getUseCouponAmt = computed(() => {
  if (!paymentDtl.value) return 0;
  return paymentDtl.value.evcpUseAmt - paymentDtl.value.evcpUseCancAmt;
});

const getUseTmgMlgAmt = computed(() => {
  if (!paymentDtl.value) return 0;
  return paymentDtl.value.tmgMlgPymAmt - paymentDtl.value.tmgMlgCancAmt;
});

/**
 * @description 총 결제금액 = 결제금액 - 결제취소금액
 */
const getTotPayAmt = computed(() => {
  if (!paymentDtl.value) return 0;
  if (paymentDtl.value.pymAmt <= 0) return 0;
  return paymentDtl.value.pymAmt - paymentDtl.value.pymCancAmt;
});

const emits = defineEmits(['isClose']);
</script>
