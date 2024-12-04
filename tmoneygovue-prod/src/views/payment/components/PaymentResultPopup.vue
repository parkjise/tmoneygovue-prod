<!-- 
    결제완료
    pubPath: tmoney/Transit/TIP05010.vue
    tmoney/Transit/TIP05010_1.vue
    tmoney/Transit/TIP05010_2.vue
    tmoney/Transit/TIP05010_3.vue
    @author inu.jeong
 -->
<template>
  <uu-modal
    ref="modal01Ref"
    v-model="modal01"
    type="full"
    :title="staticValues.title"
    has-bg
    round-footer
    @close="close"
    :isBack="false"
  >
    <template #modal_body>
      <div class="payment_result" :class="result.sucCd ? 'success' : ''">
        <div class="result">
          <div class="img_area">
            <img :src="staticValues.img" :alt="staticValues.imgAlt" />
          </div>
          <p>{{ staticValues.p }}</p>
        </div>
        <round-box hide-title>
          <p class="product_name">{{ productDtl?.trvlPrdNm }}</p>
          <div class="fail_desc" v-if="!result.sucCd">
            <template v-if="staticValues.error">
              <p>예매가 불가능하여 결제되지 않았습니다.</p>
              <p class="error">{{ staticValues.error }}</p>
            </template>
          </div>
          <ul class="list">
            <li>
              <p>예약일시</p>
              <p class="num">
                {{
                  formatDate(orderInfo.dAlcnInfo?.atlDeprDt + orderInfo.dAlcnInfo?.atlDeprTime, 'YYYY.MM.DD(dd) HH:mm')
                }}
              </p>
            </li>
            <li>
              <p>예약인원</p>
              <p class="num">{{ txtMem }}</p>
            </li>
            <li v-if="result.sucCd && !getIsTicketPrd">
              <p>출발장소</p>
              <p class="num">{{ orderInfo.dAlcnInfo?.deprTrmlNm }}</p>
            </li>
            <li v-else>
              <p>결제금액</p>
              <p class="num">{{ formatAmount(getTotalFee ?? 0) }}원</p>
            </li>
          </ul>
        </round-box>
        <round-box title="결제정보" v-if="result.sucCd">
          <ul class="list pay_list">
            <li>
              <p>결제일시</p>
              <p class="num">{{ formatDate(result.payDate, 'YYYY.MM.DD(dd) HH:mm') }}</p>
            </li>
            <li>
              <p>결제수단</p>
              <p class="num card">{{ getPymMnsNm }}</p>
            </li>
            <li class="discount">
              <p>결제금액</p>
              <p class="num">
                <strong> {{ formatAmount(getTotalFee) }} </strong>원
              </p>
              <ul>
                <li v-show="orderInfo.cpn?.cpnSno !== ''">
                  <p>쿠폰</p>
                  <p class="num">
                    <strong> -{{ formatAmount(orderInfo.cpn?.applyAmt) }} </strong>원
                  </p>
                </li>
                <li v-show="orderInfo.tmgMlgPymAmt > 0">
                  <p>GO마일리지</p>
                  <p class="num">
                    <strong> -{{ formatAmount(orderInfo.tmgMlgPymAmt) }} </strong>M
                  </p>
                </li>
                <li v-show="orderInfo.tMlgAmt > 0">
                  <p>T마일리지</p>
                  <p class="num">
                    <strong> -{{ formatAmount(orderInfo.tMlgAmt) }} </strong>M
                  </p>
                </li>
              </ul>
            </li>
            <li class="sum">
              <p>총 결제금액</p>
              <p class="num">
                <strong> {{ formatAmount(getPaymentAmount) }} </strong>원
              </p>
            </li>
          </ul>
        </round-box>
      </div>
    </template>
    <template #modal_footer>
      <div class="btn_area">
        <uu-button btn-color="primary" size="xl" label="확인" @click="close" />
      </div>
    </template>
  </uu-modal>
  <!-- TODO 고속버스 연계구분 값 적용 필요 -->
  <BusConnectPopup ref="busPopup" @ok="connectBus" :deprTrmlNm="orderInfo.dAlcnInfo?.deprTrmlNm || ''" />
</template>
<script setup lang="ts">
import { useOrderStore } from '@/service/order/orderModule';
import type { PaymentResultInfo } from '@/service/payment/model/paymentModel';
import { useProductStore } from '@/service/travel/productModule';
import { formatDate } from '@/utils/dateUtils';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { formatAmount } from '@/utils/amountUtils';
import { useRouter } from 'vue-router';
import BusConnectPopup from './BusConnectConfirmPopup.vue';
import { getAppBridge } from '@/utils';

const router = useRouter();
const orderStore = useOrderStore();
const { getTotalFee, orderInfo, getPymMnsNm, getPaymentAmount, getTotalPsngCount, getCntSatsList } =
  storeToRefs(orderStore);
const productStore = useProductStore();
const { productDtl, getIsTicketPrd } = storeToRefs(productStore);

const modal01 = ref(false);
const modal01Ref = ref();

const busPopup = ref();
let result = ref<PaymentResultInfo>({
  sucCd: false,
  resMessage: '',
  payDate: new Date()
});

// 인원상세 문구
// {전체인원수} ({티켓구분명} {구분별승객수})
const txtMem = computed(() => {
  return `${getTotalPsngCount.value} (${getCntSatsList.value
    .map((item) => `${item.busTckKndNm} ${item.busTckCnt}`)
    .join(', ')})`;
});

// 결과에 따른 이미지 설정
const imgUrl = import.meta.env.VITE_IMAGE_BASE_PATH;
const imgSuccess = `${imgUrl}/assets/images/img_tmoney_character_success.png`;
const imgFail = `${imgUrl}/assets/images/img_tmoney_character_fail.png`;

const staticValues = computed(() => {
  if (result.value.sucCd) {
    return {
      title: '결제완료',
      img: imgSuccess,
      imgAlt: '결제완료 티머니 캐릭터',
      p: '결제가 완료되었습니다.',
      error: ''
    };
  } else {
    return {
      title: '결제실패',
      img: imgFail,
      imgAlt: '결제실패 티머니 캐릭터',
      p: '결제에 실패했습니다.',
      error: result.value.resMessage
    };
  }
});

const close = () => {
  router.push({ path: '/travel/main' });
};

const open = (payRes: PaymentResultInfo) => {
  result.value = payRes;
  modal01.value = true;
  if (result.value.sucCd && result.value.paymetResponse?.areaThruTrmlYn === 'Y') {
    busPopup.value.open();
  }
};
defineExpose({ open });

// 고속버스연계 연결
const connectBus = async () => {
  const appBridge = await getAppBridge();
  await appBridge.openView({
    url: 'tmoneytia://bus/main',
    viewType: 'deeplink'
  });
};
</script>
