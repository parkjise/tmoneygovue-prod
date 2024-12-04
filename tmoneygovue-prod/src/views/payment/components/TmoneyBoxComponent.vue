<!-- 
    결제하기>결제수단>모바일 티머니
    pubPath: tmoney/Transit/TIP05003.vue
             tmoney/Spa/DET/DET043_1.vue
    @author inu.jeong
 -->
<template>
  <div class="radio_box tmoney">
    <uu-radio v-model="orderInfo.pymKndCd" :value="PaymentCd.TMONEY" @change="changeValue">
      <template #label>
        <div class="mo_tmoney_pay">
          <div class="mo_tmoney_left">
            <span class="logo_area">
              <img src="/assets/images/logo/logo_mobiletmoney.png" alt="Mobile Tmoney 로고" />
            </span>
            <span v-if="!getTmoneyPayInfoRegistered" class="noregist_badge"
              ><img src="/assets/images/payment/img_badge_notregist.png" alt="미등록"
            /></span>
          </div>
          <template v-if="!getTmoneyPayInfoRegistered">
            <div class="mo_tmoney_header_btn">
              <div class="mo_tmoney_btn">
                <uu-button
                  label="모바일티머니란?"
                  size="xs"
                  btn-style="none"
                  @click="
                    onClickWebBrowser('https://pay.tmoney.co.kr/ncs/pct/tpay/ReadTmnyPay.dev')
                  "
                  >{{ t('paymentMng.det_028_004_001') }}</uu-button
                >
                <uu-ic size="12" name="arrow" />
              </div>
            </div>
          </template>
        </div>
      </template>
    </uu-radio>
    <div class="mo_tmoney_body">
      <div class="mo_tmoney_con">
        <div v-if="!getTmoneyPayInfoRegistered">
          <uu-button
            label="모바일티머니 등록하기"
            @click="regTmoneyPay"
            class="regist before mo_tmoney_con_btn"
          >
            <div>
              <img src="/assets/images/ic/ic_t_card.svg" alt="Tmoney 로고" />
              {{ t('paymentMng.det_028_004_002') }}
            </div>
            <uu-ic size="16" name="arrow_right_white" />
          </uu-button>
        </div>
        <div
          v-if="(orderInfo.pymKndCd === PaymentCd.TMONEY && getTmoneyPayInfoRegistered)"
          class="hide_area mo_tomey_slide"
        >
          <uu-swiper
            type="custom"
            :options="
              (paymentManagement.tmoneyPayInfo?.elwlProdList.length || 0) < 2 ? optionOne : options
            "
            @swiper="onSwiper"
            @slide-change="onSlideChange"
            class="credit_slide"
            navi-pagination
          >
            <swiper-slide
              v-for="(elwl, index) in paymentManagement.tmoneyPayInfo?.elwlProdList"
              :key="index"
              :class="[
                (paymentManagement.tmoneyPayInfo?.elwlProdList.length || 0) < 2 ? 'one' : ''
              ]"
            >
              <div class="swiper_inner">
                <div
                  class="card"
                  :class="[
                    elwl.elwlPrdCd === '2100400801' ? 'paygo' : '',
                    (paymentManagement.tmoneyPayInfo?.elwlProdList.length || 0) < 2 ? 'one' : ''
                  ]"
                >
                  <p class="title">
                    {{ elwl.elwlPrdCd === '2100400801' ? '티머니Pay&GO' : '페이머니' }}
                  </p>
                  <div class="tmoney_card" v-if="elwl.elwlPrdCd === '2100400801'">
                    <img
                      class="tmoney_card_logo"
                      src="/assets/images/logo/logo_shinhancard_wh.png"
                      alt="Pay&GO로고"
                    />
                  </div>
                  <div class="balance_area" v-if="elwl.elwlPrdCd !== '2100400801'">
                    <p class="balance_title">현재잔액</p>
                    <p class="balance">
                      <span>{{ formatAmount(elwl.rtnAmt) }}</span
                      >원
                    </p>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </uu-swiper>
        </div>
        <div v-if="paymentManagement.tmoneyPayInfo?.bnrImgPathVal && paymentManagement.tmoneyPayInfo?.bnrImgPathVal != ''" class="mo_tmoney_con_box" @click="moveEventDetail()">
          <!-- 이미지 영역-->
          <uu-button class="px0">
            <img
              :src="`${paymentManagement.tmoneyPayInfo?.bnrImgPathVal}`"
              :alt="`${paymentManagement.tmoneyPayInfo?.bnrImgTxt} 배너 이미지`"
            />
          </uu-button>
        </div>
        <div
          v-if="(orderInfo.pymKndCd === PaymentCd.TMONEY && getTmoneyPayInfoRegistered)"
          class="hide_area"
        >
          <form>
            <uu-input
              ref="useTMltAmtRef"
              v-model="tMlgAmt"
              inputmode="numeric"
              label="btn-clear"
              placeholder="T마일리지를 입력해주세요 "
              :btn-clear="showBtnClear"
              hide-label
              :max="mlgMaxLimit"
              :disabled="!mileageValidate"
              @blur="handleBlur"
              @focus="handleFocus"
            />
            <uu-button
              label="모두 사용"
              btn-style="line"
              size="xl"
              :disabled="!mileageValidate"
              class="btn_use"
              @click="acceptAllMileage"
            />
          </form>
          <div class="has_mileage">
            <uu-ic size="20" name="mileage" />
            <p class="title">보유 <span>T</span>마일리지</p>
            <p>{{ formatAmount(mbrMileageCouponCntInfo.tMlgAmt) || 0 }}M</p>
            <p class="desc">(10M 단위 사용 가능)</p>
          </div>
          <p class="pay_desc">(페이머니와 T마일리지 결제 후 취소 시 페이머니로 전액 충전됩니다.)</p>
        </div>
        <div class="mo_tmoney_con_txt mo_notice_area">
          <div v-for="(item, index) in paymentManagement.tmoneyPayInfo?.pblcPhrsCtt" :key="index">
            <div class="notice">
              <p class="badge">안내</p>
              <p class="text" v-html="item"></p>
              <!-- 각 항목을 v-html로 출력 -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { SwiperSlide } from 'swiper/vue'
import type { SwiperOptions } from 'swiper/types'
import { storeToRefs } from 'pinia'
import { PaymentCd, useOrderStore } from '@/service/order/orderModule'
import { formatAmount } from '@/utils/amountUtils'
import { getAppBridge } from '@/utils'
import { formatDate } from '@/utils/dateUtils'
import type { swiperType } from '@/components/uu-components/UuSwiper.vue'
import { FlexResponseCode } from '@/utils/hybrid/type'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useCommonStore } from '@/service/common/commonModule'
import { encodeUriRouterPath } from '@/utils/linkUtils'

const orderStore = useOrderStore()
const {
  mbrMileageCouponCntInfo,
  orderInfo,
  paymentManagement,
  getTmoneyPayInfoRegistered,
  tmoneyMoreContent
} = storeToRefs(orderStore)
const { t } = useI18n()
const useTMltAmtRef = ref()
const tMlgAmt = ref('')
const showBtnClear = ref(false) // 마일리지 input clear버튼 여부
const router = useRouter()

// 티머니결제 리스트 노출 swiper
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
    renderFraction: function (currentClass, totalClass) {
      return (
        '<span class="' +
        currentClass +
        '"></span>' +
        '<span class="swiper_pagination_separator">/</span>' +
        '<span class="' +
        totalClass +
        '"></span>'
      )
    }
  }
}
const optionOne: SwiperOptions = {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  slidesPerView: 1,
  spaceBetween: 8,
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
    renderFraction: function (currentClass, totalClass) {
      return (
        '<span class="' +
        currentClass +
        ' primary"></span>' +
        '<span class="swiper_pagination_separator gray">/</span>' +
        '<span class="' +
        totalClass +
        ' gray"></span>'
      )
    }
  }
}

// swiper이동시 활성화된 결제키 적용
const onSwiper = (swiper: swiperType) => {
  orderInfo.value.paymentKey =
    paymentManagement.value.tmoneyPayInfo?.elwlProdList[swiper.activeIndex].tmcrNo ?? ''
}
const onSlideChange = (swiper: swiperType) => {
  orderInfo.value.paymentKey =
    paymentManagement.value.tmoneyPayInfo?.elwlProdList[swiper.activeIndex].tmcrNo ?? ''
}

// 마일리지 최대 금액
const mlgMaxLimit = computed(() => {
  if (mbrMileageCouponCntInfo.value.tMlgAmt < orderStore.getAmountLimit('t')) {
    return Math.floor(mbrMileageCouponCntInfo.value.tMlgAmt / 10) * 10
  } else {
    return orderStore.getAmountLimit('t')
  }
})

//마일리지 전부 적용
const acceptAllMileage = async () => {
  orderInfo.value.tMlgAmt = mlgMaxLimit.value
  tMlgAmt.value = mlgMaxLimit.value.toLocaleString()
  nextTick(() => {
    useTMltAmtRef.value.onInput()
  })
}

// 마일리지 유효성체크 및
// 유효성에 맞지 않을때는 마일리지값 초기화
const mileageValidate = computed(() => {
  return mlgMaxLimit.value >= 10
})
watch(mileageValidate, (newValue: boolean) => {
  if (!newValue) {
    orderInfo.value.tMlgAmt = 0
    tMlgAmt.value = ''
  }
})

const handleFocus = () => {
  showBtnClear.value = true
  tMlgAmt.value = tMlgAmt.value.replaceAll(',', '')
}

const handleBlur = (event: any) => {
  showBtnClear.value = false
  let value = event
  value = Math.floor(value / 10) * 10
  orderInfo.value.tMlgAmt = value

  if (value > 0) tMlgAmt.value = value.toLocaleString()
  else tMlgAmt.value = ''
}

//수단 변경시 초기화
const changeValue = () => {
  orderInfo.value.paymentKey = ''
  if (orderInfo.value.pymKndCd !== PaymentCd.TMONEY) {
    orderInfo.value.tMlgAmt = 0
    tmoneyMoreContent.value = false
  } else {
    orderInfo.value.pymMnsId = 'TMPY'
    tmoneyMoreContent.value = true
  }
}

// drawer 오픈
const moreBtn = () => {
  tmoneyMoreContent.value = !tmoneyMoreContent.value
}

// 공통
// 외부브라우저 오픈
const onClickWebBrowser = async (url: string) => {
  const appBridge = await getAppBridge()
  await appBridge.openView({
    url: url,
    viewType: 'ex'
  })
}

// 티머니페이
// 등록
const regTmoneyPay = async () => {
  const appBridge = await getAppBridge()
  const res = await appBridge.openView({
    url: `${import.meta.env.VITE_TMONEY_PAY_WEB_VIEW}`,
    viewType: 'native'
  })
  if (res && res.response.code === FlexResponseCode.OK) {
    orderStore.requestPaymentManagement()
    await appBridge.showToast({
      message: `모바일티머니 등록 처리 되었습니다.\n(${formatDate(new Date(), 'YYYY.MM.DD')})`
    })
  } else if (res && res.response.code === FlexResponseCode.CANCEL) {
    return
  } else {
    await appBridge.showToast({
      message: res.response.message || '티머니 등록에 실패했습니다.'
    })
  }
}

// 배너 상세 이동(이벤트 상세)
const moveEventDetail = () => {
  console.log('moveEventDetail')
  let url = paymentManagement.value.tmoneyPayInfo?.bnrUrlVal

  if (url != undefined && url != null) {
    const commonStore = useCommonStore()
    commonStore.setRouterHeaderTitle(paymentManagement.value.tmoneyPayInfo?.bnrTtlNm ?? null)
    router.push({ path: encodeUriRouterPath(url) })
  }
}
</script>
