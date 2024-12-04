<!-- 
    결제수단
    pubPath: tmoney/Transit/TIP05003.vue
    @author dahye.kim
 -->
<template>
  <div class="radio_box credit">
    <uu-radio
      v-model="orderInfo.pymKndCd"
      :value="PaymentCd.CARD"
      label="신용/체크 등록 간편결제"
      @change="changeValue"
    />
    <div v-if="orderInfo.pymKndCd === PaymentCd.CARD" class="hide_area">
      <uu-swiper
        type="custom"
        :options="
          !paymentManagement.smpcPymInfo?.smpcPymList || paymentManagement.smpcPymInfo?.smpcPymList.length === 0
            ? optionOne
            : options
        "
        @swiper="onSwiper"
        @slide-change="onSlideChange"
        :initialIndex="selectedIndex"
        class="credit_slide"
        navi-pagination
      >
        <template v-if="getSmpcPayRegistered">
          <swiper-slide
            v-for="cardInfo in paymentManagement.smpcPymInfo?.smpcPymList"
            :key="cardInfo.paymentKey"
            :class="[(paymentManagement.smpcPymInfo?.smpcPymList.length || 0) === 0 ? 'one' : '']"
          >
            <div class="swiper_inner">
              <div class="card credit" :class="[CardClass[Number(cardInfo.crpcId ?? '366')]]">
                <p class="title">
                  <span class="main_badge" v-if="representPaymentManagement.rprnPaymentKey === cardInfo.paymentKey">
                    <img src="/assets/images/payment/img_badge_maincard.png" alt="주카드" />
                  </span>
                  <span class="logo_area">
                    <img :src="`${imgUrl}${cardInfo.path2}`" :alt="`${cardInfo.cardName}로고`" />
                  </span>
                </p>
                <div class="card_info">
                  <p class="card_num">
                    <span> {{ cardInfo.maskCardNo.split('*')[0] }} </span>
                    <span>●●●●</span>
                    <span>●●●●</span>
                    <span>
                      {{ cardInfo.maskCardNo.split('*').length > 1 ? cardInfo.maskCardNo.split('*').pop() : '' }}
                    </span>
                  </p>
                  <p class="card_category">
                    {{
                      cardInfo.cardAliasName !== undefined &&
                      cardInfo.cardAliasName !== null &&
                      cardInfo.cardAliasName !== ''
                        ? cardInfo.cardAliasName
                        : cardInfo.cardName
                    }}
                  </p>
                </div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="swiper_inner" @click="regSmpyPay">
              <uu-button
                class="card"
                :class="[(paymentManagement.smpcPymInfo?.smpcPymList.length || 0) === 0 ? 'one' : '']"
              >
                <uu-ic size="40" name="plus" />
                신용/체크카드 등록
              </uu-button>
            </div>
          </swiper-slide>
        </template>
        <template v-else>
          <swiper-slide>
            <div class="swiper_inner" @click="regSmpyPay">
              <uu-button
                class="card"
                :class="[
                  ((getSmpcPayRegistered && paymentManagement.smpcPymInfo?.smpcPymList.length) || 0) === 0 ? 'one' : ''
                ]"
              >
                <uu-ic size="40" name="plus" />
                신용/체크카드 등록
              </uu-button>
            </div>
          </swiper-slide>
        </template>
      </uu-swiper>
      <uu-button
        class="btn_installment"
        btn-style="line"
        :disabled="getPaymentAmount < 50000"
        @click="installmentPopupOpen"
      >
        {{ getInstallment }}
        <uu-ic size="20" name="arrow" />
      </uu-button>
      <div class="notice">
        <p class="badge">안내</p>
        <p>티머니 Pay & GO 신한카드는 모바일티머니를 등록하여 결제 시 할인 적용됩니다.</p>
      </div>
    </div>
  </div>
  <!-- <SmpcRegPopup ref="regPopup" /> -->
  <SmpcInstallmentsPopup ref="installmentPopup" />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { SwiperSlide } from 'swiper/vue';
import type { SwiperOptions } from 'swiper/types';
// import SmpcRegPopup from '@/views/payment-mng/components/SmpcRegPopup.vue';
import SmpcInstallmentsPopup from './SmpcInstallmentsPopup.vue';
import { PaymentCd, useOrderStore } from '@/service/order/orderModule';
import { storeToRefs } from 'pinia';
import { CardClass } from '@/utils/constants/cardConstants';
import type { swiperType } from '@/components/uu-components/UuSwiper.vue';
import { useRouter } from 'vue-router';
import { getAppBridge } from '@/utils';
import { usePaymentManageStore } from '@/service/payment/paymentManageModule';

const orderStore = useOrderStore();
const {
  getSmpcPayRegistered,
  paymentManagement,
  getPaymentAmount,
  orderInfo,
  getInstallment,
  representPaymentManagement,
  tmoneyMoreContent
} = storeToRefs(orderStore);
const paymentManagementStore = usePaymentManageStore();

const imgUrl = import.meta.env.VITE_IMG_URL;

// 신용/체크카드 등록
// const regPopup = ref();
const router = useRouter();
const regSmpyPay = async () => {
  // regPopup.value.open();
  // router.push({ path: '/payment/smpc-card-register' });

  // TODO 여행분리에 따른 수정. repository를 분리하게 되면 불필요소스
  const webBase = import.meta.env.VITE_AXIOS_BASE_TARGET || 'TMONEY2';
  if (webBase === 'TRAVEL') {
    const appBridge = await getAppBridge();
    await appBridge.openView({
      url: '/payment/smpc-card-register',
      headerTitle: '신용/체크카드 등록',
      viewType: 'in'
    });

    // 결제수단관리 조회(다른웹뷰에서 처리된 정보를 가져오기 위해서 재조회)
    paymentManagementStore.requestPaymentManagement();

    // 결제하기 결제 수단 정보 재조회(다른웹뷰에서 처리된 정보를 가져오기 위해서 재조회)
    orderStore.requestPaymentManagement();
  } else {
    router.push({ path: '/payment/smpc-card-register' });
  }
};

// 신용/체크카드 할부개월수
const installmentPopup = ref();
const installmentPopupOpen = () => installmentPopup.value.open();

// 결제수단 구분 변경
const changeValue = () => {
  tmoneyMoreContent.value = false;
  orderInfo.value.paymentKey = '';
  if (orderInfo.value.pymKndCd !== PaymentCd.CARD) {
    orderInfo.value.paymentKey = '';
  } else {
    orderInfo.value.pymMnsId = 'PRPM';
  }
};

// 사전결제카드 리스트 노출 swiper
// options : 다중 리스트 (사전결제카드 등록시)
// optionOne : 한개 (사전결제카드 미등록시)
const options: SwiperOptions = {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  slidesPerView: 'auto',
  spaceBetween: 8,
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
    formatFractionCurrent: function (number) {
      const totalSlides = document.querySelectorAll('.credit_slide .swiper-slide').length - 1;
      if (number > totalSlides) {
        return number - 1;
      } else {
        return number;
      }
    },
    formatFractionTotal: function () {
      return document.querySelectorAll('.credit_slide .swiper-slide').length - 1;
    },
    renderFraction: function (currentClass, totalClass) {
      return (
        '<span class="' +
        currentClass +
        '"></span>' +
        '<span class="swiper_pagination_separator">/</span>' +
        '<span class="' +
        totalClass +
        '"></span>'
      );
    }
  },
  centeredSlides: true
};

const optionOne: SwiperOptions = {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  slidesPerView: 'auto',
  spaceBetween: 8,
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
    renderFraction: function () {
      return '<span class=""></span>' + '<span class="swiper_pagination_separator"></span>' + '<span class=""></span>';
    }
  }
};

// swiper이동시 활성화된 결제키 적용
const onSwiper = (swiper: swiperType) => {
  if (getSmpcPayRegistered.value) {
    orderInfo.value.paymentKey = paymentManagement.value.smpcPymInfo?.smpcPymList[swiper.activeIndex]?.paymentKey ?? '';
  }
};
const onSlideChange = (swiper: swiperType) => {
  if (getSmpcPayRegistered.value) {
    orderInfo.value.paymentKey = paymentManagement.value.smpcPymInfo?.smpcPymList[swiper.activeIndex]?.paymentKey ?? '';
  }
};

// 쿠폰적용 화면 이동 후 재접근 시 선택했던 카드 활성화
const selectedIndex = computed(() => {
  if (getSmpcPayRegistered.value) {
    const index = paymentManagement.value.smpcPymInfo?.smpcPymList?.findIndex(
      (smpc) => smpc.paymentKey === orderInfo.value.paymentKey
    );
    return index !== -1 ? index : 0;
  }
  return 0;
});

// 결제수단 결제금액 변동시 5만원 미만이면 일시불로 초기화
watch(getPaymentAmount, (newAmount: number) => {
  if (newAmount < 50000) {
    orderInfo.value.installment = '00';
  }
});
</script>
