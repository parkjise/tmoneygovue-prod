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
    <main id="main" class="main no_padding det">
      <div class="container pt12">
        <div class="pay_detail_area go_pass">
          <div class="pay_title">
            <p class="title">
              <span class="ic_area" role="presentation">
                <object :data="imageBasePath + '/assets/images/ic/ic_tmoney_gopass_22.svg'" />
              </span>
              GO패스{{ isPaasDvsCdAU ? '(추가요금)' : `(${goPassPaymentHistory.cpnNm}) 결제` }}
            </p>
            <p class="status" :class="addClass">{{ getPymPrgsStaNm }}</p>
          </div>
          <!-- 구매정보 -->
          <round-box title="구매정보">
            <ul class="detail_list payment">
              <li>
                <p class="title">결제일</p>
                <p class="num" :aria-label="formatA11yDateTime(getPassPrchDtm(false))" role="text">
                  <span>{{ formatDate(getPassPrchDtm(false), 'YYYY.MM.DD') }}</span>
                </p>
              </li>
              <li>
                <div class="title">이용권</div>
                <div class="num">
                  <span>정기-{{ goPassPaymentHistory.cpnNm }}</span>
                </div>
              </li>
            </ul>
          </round-box>
          <!-- 결제금액 -->
          <round-box title="결제금액" v-if="!isPayCancel">
            <ul class="detail_list payment">
              <li v-if="Number(goPassPaymentHistory.passPrchAmt) > 0">
                <p class="title">{{ isPaasDvsCdAU ? '추가요금' : '이용권요금' }}</p>
                <p class="num">
                  <span>{{ formatAmount(goPassPaymentHistory.passPrchAmt) }}</span
                  >원
                </p>
              </li>
              <li v-if="Number(goPassPaymentHistory.tmgMlgUseAmt) > 0">
                <p class="title">GO마일리지</p>
                <p class="num discount">
                  <span>-{{ formatAmount(goPassPaymentHistory.tmgMlgUseAmt) }}</span
                  >원
                </p>
              </li>
              <li v-if="Number(goPassPaymentHistory.cpnUseAmt) > 0">
                <p class="title">쿠폰</p>
                <p class="num discount">
                  <span>-{{ formatAmount(goPassPaymentHistory.cpnUseAmt) }}</span
                  >원
                </p>
              </li>
              <li class="sum_area">
                <p class="title">총 결제금액</p>
                <p class="num">
                  <span>{{ formatAmount(goPassPaymentHistory.atlPymAmt) }}</span
                  >원
                </p>
              </li>
            </ul>
          </round-box>
          <!-- 결제상세 -->
          <round-box title="결제상세">
            <ul class="detail_list payment">
              <li>
                <p class="title">결제일시</p>
                <p class="num" :aria-label="formatA11yDateTime(getPassPrchDtm(true))" role="text">
                  <span>{{ formatDate(getPassPrchDtm(true), 'YYYY.MM.DD HH:mm') }}</span>
                </p>
              </li>
              <li>
                <p class="title">결제수단</p>
                <p class="num">
                  <span>{{ goPassPaymentHistory.pymMnsNm }}</span>
                </p>
              </li>
              <li>
                <p class="title">결제금액</p>
                <p class="num">
                  <span>{{ formatAmount(goPassPaymentHistory.atlPymAmt) }}</span
                  >원
                </p>
              </li>
            </ul>
          </round-box>
          <!-- 환불금액 -->
          <round-box title="환불금액" v-if="isPayCancel">
            <ul class="detail_list payment">
              <li>
                <p class="title">이용권 요금</p>
                <p class="num">
                  <span>{{ formatAmount(goPassPaymentHistory.ttutAmt) }}</span
                  >원
                </p>
              </li>
              <li>
                <p class="title">이용요금</p>
                <p class="num cancel">
                  <span>
                    {{ Number(goPassPaymentHistory.passUseDdctAmt) > 0 ? '-' : '' }}
                    {{ formatAmount(goPassPaymentHistory.passUseDdctAmt) }}</span
                  >원
                </p>
              </li>
              <li class="sum_area">
                <p class="title cancel go_pass">총 환불금액</p>
                <p class="num">
                  <span>{{ formatAmount(goPassPaymentHistory.totCancAmt) }}</span
                  >원
                </p>
                <ul class="discount">
                  <li v-if="Number(goPassPaymentHistory.pymCancAmt) > 0">
                    <p class="title">{{ goPassPaymentHistory.pymMnsNm }}</p>
                    <p class="num">
                      <span>{{ formatAmount(goPassPaymentHistory.pymCancAmt) }}</span
                      >원
                    </p>
                  </li>
                  <li v-if="Number(goPassPaymentHistory.mlgUseCancAmt) > 0">
                    <p class="title">GO마일리지</p>
                    <p class="num">
                      <span>{{ formatAmount(goPassPaymentHistory.mlgUseCancAmt) }}</span
                      >원
                    </p>
                  </li>
                  <li v-if="Number(goPassPaymentHistory.cpnUseCancAmt) > 0">
                    <p class="title">쿠폰</p>
                    <p class="num">
                      <span>{{ formatAmount(goPassPaymentHistory.cpnUseCancAmt) }}</span
                      >원
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
          </round-box>
          <!-- 유의사항 -->
          <div class="ticket_notice">
            <p class="title">
              <uu-ic
                size="16"
                name="exclamation_gray090"
                :aria-label="!isPayCancel ? t('paymentHistory.det_020_001_017') : t('paymentHistory.det_023_001_010')"
              />
              {{ !isPayCancel ? t('paymentHistory.det_020_001_017') : t('paymentHistory.det_023_001_010') }}
            </p>
            <p class="desc" v-if="!isPayCancel">
              {{ t('paymentHistory.det_020_001_019') }}<br />
              {{ t('paymentHistory.det_015_001_021') }}
            </p>
            <template v-else>
              <p class="desc">
                {{ t('paymentHistory.det_020_001_019') }}
              </p>
              <p class="desc">
                {{ t('paymentHistory.det_023_001_012') }}
              </p>
              <p class="desc">
                {{ t('paymentHistory.det_020_001_020') }}
              </p>
            </template>
          </div>
        </div>
      </div>
    </main>
  </common-modal>
</template>

<script setup lang="ts">
import {
  GoPassPassPrcgStaCode,
  GoPassPymPrcgStaCode,
  usePaymentHistoryStore
} from '@/service/payment/paymentHistoryModule';
import { computed, ref } from 'vue';
import { formatAmount } from '@/utils/amountUtils';
import RoundBox from '@/components/layout/RoundBox.vue';
import { storeToRefs } from 'pinia';
import { formatDate, formatA11yDateTime } from '@/utils/dateUtils';
import CommonModal from '@/views/common/components/CommonModal.vue';
import { useI18n } from 'vue-i18n';
import { useMessageModal } from '@/composables/useMessageModal';

const { t } = useI18n();

const paymentHistoryStore = usePaymentHistoryStore();
const { goPassPaymentHistory, isPayCancel, isPaasDvsCdAU } = storeToRefs(paymentHistoryStore);

const emit = defineEmits(['isClose']);

const imageBasePath = import.meta.env.VITE_IMAGE_BASE_PATH;
const isShow = ref<boolean>(false);

const { createErrorModal } = useMessageModal();

const addClass = computed(() => {
  if (!goPassPaymentHistory.value) return '';
  return goPassPaymentHistory.value.pymPrcgStaCd === GoPassPymPrcgStaCode.Y ? '' : 'red';
});

const getPassPrchDtm = (time?: boolean) => {
  if (!goPassPaymentHistory.value.passPrchDtm) return '';
  if (!time) return goPassPaymentHistory.value.passPrchDtm.substring(0, 8);
  return goPassPaymentHistory.value.passPrchDtm;
};

const getPymPrgsStaNm = computed(() => {
  if (!goPassPaymentHistory.value) return '';
  if (goPassPaymentHistory.value.passPrgsStaCd === GoPassPassPrcgStaCode.RT) return '환불완료';
  else if (goPassPaymentHistory.value.pymPrcgStaCd !== GoPassPymPrcgStaCode.Y) return '결제취소';
  else return '결제완료';
});

async function requestGoPassPaymentHistory(passPrchSno: string) {
  const res = await paymentHistoryStore.actionGetGoPassPaymentHistory(passPrchSno);
  return res;
}

const open = async (passPrchSno: string) => {
  const res = await requestGoPassPaymentHistory(passPrchSno);
  if (res.rspCd === '0000') isShow.value = true;
  else createErrorModal('알림', res.rspMsg);
};

const closeAction = () => {
  emit('isClose');
};
defineExpose({ open });
</script>
