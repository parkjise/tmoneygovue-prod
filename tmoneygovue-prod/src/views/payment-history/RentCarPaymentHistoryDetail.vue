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
              <span class="ic_area" role="presentation">
                <object :data="imageBasePath + '/assets/images/ic/ic_vehicle_rentcar.svg'" />
              </span>
              렌트카
            </p>
          </div>
          <!-- 결제 취소 상세 -->
          <round-box title="환불금액" v-if="isCancel">
            <ul class="detail_list payment">
              <li>
                <p class="title">총 대여요금</p>
                <p class="num">
                  <span>{{ formatAmount(rentCarPaymentHistory.paidInfo?.totPymAmt) }}</span
                  >원
                </p>
              </li>
              <li>
                <div class="title">취소 수수료</div>
                <div class="num red">
                  <span>-{{ formatAmount(rentCarPaymentHistory.paidInfo?.pymCancCmm) }}</span
                  >원
                </div>
              </li>
              <li class="sum_area">
                <div class="title">총 환불금액</div>
                <p class="num">
                  <span>{{ formatAmount(rentCarPaymentHistory.paidInfo?.totCancAmt) }}</span
                  >원
                </p>
              </li>
              <li v-if="rentCarPaymentHistory.paidInfo?.pmmtPymAmt > 0">
                <div class="title has_icon">{{ rentCarPaymentHistory.paidInfo?.pymMnsNm }}</div>
                <div class="num">
                  <span>{{ formatAmount(rentCarPaymentHistory.paidInfo?.pmmtCancAmt) }}</span
                  >원
                </div>
              </li>
              <li v-if="rentCarPaymentHistory.paidInfo?.evcpUseCancAmt > 0">
                <div class="title has_icon">쿠폰할인</div>
                <div class="num discount">
                  <span>{{ formatAmount(rentCarPaymentHistory.paidInfo?.evcpUseCancAmt) }}</span
                  >원
                </div>
              </li>
              <li v-if="rentCarPaymentHistory.paidInfo?.tmgMlgCancAmt > 0">
                <div class="title has_icon">GO마일리지</div>
                <div class="num discount">
                  <span>{{ formatAmount(rentCarPaymentHistory.paidInfo?.tmgMlgCancAmt) }}</span
                  >원
                </div>
              </li>
            </ul>
          </round-box>
          <!--//결제 취소 상세 -->
          <!-- 결제상세 -->
          <round-box title="결제상세" v-else>
            <ul class="detail_list payment">
              <li>
                <p class="title">결제금액</p>
                <p class="num">
                  <span>{{ formatAmount(rentCarPaymentHistory.paidInfo?.totPymAmt) }}</span
                  >원
                </p>
              </li>
              <li v-if="rentCarPaymentHistory.paidInfo?.evcpUseAmt > 0">
                <div class="title">쿠폰할인</div>
                <div class="num discount">
                  <span>-{{ formatAmount(rentCarPaymentHistory.paidInfo?.evcpUseAmt) }}</span
                  >원
                </div>
              </li>
              <li v-if="rentCarPaymentHistory.paidInfo?.tmgMlgPymAmt > 0">
                <div class="title">GO마일리지</div>
                <div class="num discount">
                  <span>-{{ formatAmount(rentCarPaymentHistory.paidInfo?.tmgMlgPymAmt) }}</span
                  >M
                </div>
              </li>
              <li class="sum_area">
                <div class="title">총 결제금액</div>
                <p class="num">
                  <span>{{ formatAmount(rentCarPaymentHistory.paidInfo?.pmmtPymAmt) }}</span
                  >원
                </p>
              </li>
              <li v-if="rentCarPaymentHistory.paidInfo?.pmmtPymAmt > 0">
                <div class="title has_icon">{{ rentCarPaymentHistory.paidInfo?.pymMnsNm }}</div>
                <div class="num">
                  <span>{{ formatAmount(rentCarPaymentHistory.paidInfo?.pmmtPymAmt) }}</span
                  >원
                </div>
              </li>
            </ul>
          </round-box>
          <!-- //결제상세 -->
          <!-- 결제정보 -->
          <round-box title="결제정보" v-if="rentCarPaymentHistory.paidInfo?.pmmtPymAmt > 0">
            <ul class="detail_list payment">
              <li>
                <p class="title">결제수단</p>
                <p class="num">
                  <span>{{ rentCarPaymentHistory.paidInfo?.pymMnsNm }}</span>
                </p>
              </li>
              <li v-if="rentCarPaymentHistory.paidInfo?.mipTerm">
                <p class="title">할부개월</p>
                <p class="num">
                  <span>{{ rentCarPaymentHistory.paidInfo?.mipTerm }}</span>
                </p>
              </li>
              <li v-if="rentCarPaymentHistory.paidInfo?.crdNo">
                <p class="title">카드번호</p>
                <p class="num">
                  <span>{{ rentCarPaymentHistory.paidInfo?.crdNo }}</span>
                </p>
              </li>
              <li v-if="rentCarPaymentHistory.paidInfo?.pymDtm">
                <p class="title">거래일시</p>
                <p
                  class="num"
                  :aria-label="formatA11yDateTime(rentCarPaymentHistory.paidInfo?.pymDtm, '', true)"
                  role="text"
                >
                  <span>{{ formatDate(rentCarPaymentHistory.paidInfo?.pymDtm, 'YYYY.MM.DD(ddd) HH:mm') }}</span>
                </p>
              </li>
              <li v-if="rentCarPaymentHistory.paidInfo?.pymCancDtm">
                <p class="title">취소일시</p>
                <p
                  class="num"
                  :aria-label="formatA11yDateTime(rentCarPaymentHistory.paidInfo?.pymCancDtm, '', true)"
                  role="text"
                >
                  <span>{{ formatDate(rentCarPaymentHistory.paidInfo?.pymCancDtm, 'YYYY.MM.DD(ddd) HH:mm') }}</span>
                </p>
              </li>
              <li v-if="rentCarPaymentHistory.paidInfo?.crdtAprvNo">
                <p class="title">승인번호</p>
                <p class="num">
                  <span>{{ rentCarPaymentHistory.paidInfo?.crdtAprvNo }}</span>
                </p>
              </li>
              <li v-if="rentCarPaymentHistory.paidInfo?.pmmtPymAmt > 0">
                <p class="title">결제금액</p>
                <p class="num">
                  <span>{{ formatAmount(rentCarPaymentHistory.paidInfo?.pmmtPymAmt) }}</span
                  >원
                </p>
              </li>
            </ul>
          </round-box>
          <!--//결제정보 -->
          <!-- 업체정보 -->
          <round-box title="업체정보">
            <ul class="detail_list">
              <li>
                <p class="title">업체명</p>
                <p class="num">{{ rentCarPaymentHistory.rncrEntrNm }}</p>
              </li>
              <li>
                <p class="title">주소</p>
                <p class="num">{{ rentCarPaymentHistory.rncrEntrAddr }}</p>
              </li>
              <li>
                <p class="title">연락처</p>
                <p class="num">{{ rentCarPaymentHistory.rncrEntrTelNo }}</p>
              </li>
            </ul>
          </round-box>
          <!--//업체정보 -->
          <div class="ticket_notice">
            <ul>
              <li>실제 요금과 다를 수 있습니다.</li>
              <li>부가가치세법 상 적격 증빙이 필요한 경우 카드사에서 발급하는 카드 전표를 이용하여 주시기 바랍니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </common-modal>
</template>

<script setup lang="ts">
import { usePaymentHistoryStore } from '@/service/payment/paymentHistoryModule';
import { computed, onMounted, ref } from 'vue';
import { formatAmount } from '@/utils/amountUtils';
import RoundBox from '@/components/layout/RoundBox.vue';
import { storeToRefs } from 'pinia';
import { formatDate } from '@/utils/dateUtils';
import CommonModal from '@/views/common/components/CommonModal.vue';
import { formatA11yDateTime } from '@/utils/dateUtils';

const paymentHistoryStore = usePaymentHistoryStore();
const { getRentCarPaymentHistory } = storeToRefs(paymentHistoryStore);

const rentCarPaymentHistory = computed(() => {
  return getRentCarPaymentHistory.value;
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
  }
});

const imageBasePath = import.meta.env.VITE_IMAGE_BASE_PATH;
const isInit = ref<boolean>(false);
const isShow = ref<boolean>(props.isShow);
const isCancel = ref<boolean>(false);

const closeAction = () => {
  emit('isClose');
};

async function requestRentCarPaymentHistory() {
  isInit.value = false;
  const res = await paymentHistoryStore.actionGetRentCarPaymentHistory(props.pymSno);
  if (res) {
    if (res.mrnpStaCd === 'cancelled' || res.mrnpStaCd === 'cs_canc') {
      isCancel.value = true;
    }
  }
  isInit.value = true;
}

onMounted(() => {
  requestRentCarPaymentHistory();
});
</script>
