<template>
  <sub-header title="교통카드 등록/변경" />
  <main id="main" class="main mor">
    <div class="container">
      <round-box :title="'카드등록'" class="regist">
        <div class="btn_load">
          <uu-button
            :btn-color="'none'"
            :label="'교통카드 불러오기'"
            @click="openTrafficTerms('getTrafficCard')"
          />
        </div>
        <div class="tmoney_regist traffic_card">
          <!-- 카드 로고 -->
          <div class="card_img logo-align" v-if="isCardImg">
            <img :src="cardImg" :alt="cardName" /><span>{{ cardName }}</span>
          </div>
          <form>
            <label for="tmoney_input01" class="tmoney_label sr_only">티머니 카드번호 1번째</label>
            <input
              ref="strCardNum01Ref"
              v-model="strCardNum01"
              maxlength="4"
              id="tmoney_input01"
              class="tmoney_input"
              type="text"
              inputmode="numeric"
              pattern="\d*"
              placeholder="4자리"
              @input="inputCardNum($event, strCardNum02Ref, strCardNum01Ref)"
            />
            <label for="tmoney_input02" class="tmoney_label sr_only">티머니 카드번호 2번째</label>
            <input
              ref="strCardNum02Ref"
              v-model="strCardNum02"
              maxlength="4"
              id="tmoney_input02"
              class="tmoney_input"
              type="text"
              inputmode="numeric"
              pattern="\d*"
              placeholder="4자리"
              @input="inputCardNum($event, strCardNum03Ref, strCardNum02Ref)"
            />
            <label for="tmoney_input03" class="tmoney_label sr_only">티머니 카드번호 3번째</label>
            <input
              ref="strCardNum03Ref"
              v-model="strCardNum03"
              maxlength="4"
              id="tmoney_input03"
              class="tmoney_input"
              type="text"
              inputmode="none"
              pattern="\d*"
              placeholder="4자리"
              @input="inputCardNum($event, strCardNum04Ref)"
              @focus="callKeypad(4, 'K')"
              @blur="closeKeypad"
            />
            <label for="tmoney_input04" class="tmoney_label sr_only">티머니 카드번호 4번째</label>
            <input
              ref="strCardNum04Ref"
              v-model="strCardNum04"
              maxlength="4"
              id="tmoney_input04"
              class="tmoney_input"
              type="text"
              inputmode="numeric"
              pattern="\d*"
              placeholder="4자리"
              @input="inputCardNum($event)"
            />
          </form>
          <uu-button
            :btn-color="'primary'"
            :size="'xl'"
            :label="'카드등록'"
            @click="openTrafficTerms('regist')"
            :disabled="isDisabled"
          />
        </div>
      </round-box>
      <RegisteredCardList
        @ok="isCompleteDisabled = false"
        :callTmoneyList="callTmoneyList"
        @listCallback="callTmoneyList = false"
      />
      <!-- 배너 영역 -->
      <div class="tmoney_regist card slide" v-if="getCreditCardBanner && getCreditCardBanner.length > 0">
        <uu-swiper
          :type="'custom'"
          class="swiper_banner traffic_card_swiper"
          navi-pagination
          :options="swiperOptions"
        >
          <swiper-slide v-for="(banner, index) in getCreditCardBanner" :key="index">
            <div class="swiper_inner" @click="moveEventDetail(banner)">
              <uu-button>
                <img :src="`${banner.bnrImgPathVal}`" :alt="`${banner.bnrTtlNm} 배너 이미지`" />
              </uu-button>
            </div>
          </swiper-slide>
        </uu-swiper>
      </div>
      <!--// 배너 영역 -->
      <!-- 유의사항 -->
      <div class="tmoney_regist" v-if="tmoneyNotes">
        <div class="notice">
          <p>
            <uu-ic :size="'16'" :name="'exclamation_gray090'" />
            유의사항
          </p>
          <ul v-for="(item, i) in tmoneyNotes" :key="i" :class="{ no_dots: !item.includes('·') }">
            <li v-html="item.includes('·') ? item.replace(/^· /, '') : '&nbsp&nbsp' + item"></li>
          </ul>
        </div>
      </div>
    </div>
  </main>
  <!-- 티머니페이 카드 등록 팝업-->
  <GetTmoneyPayCardPopup
    :isShowPopup="isShowGetTmoneyPayCardPopup"
    :tmoneyPayCardCnt="getTmoneyCardCnt.tmpyRgtCnt"
    @ok="registTmoneyPayCallback"
    @close="isShowGetTmoneyPayCardPopup = false"
  />
  <!-- 티머니페이 등록가능한 카드 미존재 -->
  <NoAvailableTmoneyPayCardPopup
    :isShow="showNoAvailablePopup"
    @ok="goBack"
    @close="showNoAvailablePopup = false"
  />
  <!-- 티머니페이 미등록 사용자 팝업 -->
  <UnRegistTmoneyPayCardPopup
    :isShow="showUnRegistPopup"
    @ok="TmoneyApp"
    @close="showUnRegistPopup = false"
  />
  <!-- 교통카드 등록 성공 팝업 -->
  <regist-success-popup :isShow="successPopup" @ok="registSuccess" />
  <!-- 교통카드 최대등록 개수 초과 팝업 -->
  <regist-exceed-popup :isShow="exceedPopup" @ok="exceedPopup = false" />
  <!-- 혜택뽑기 팝업 -->
  <benefit-event-popup ref="eventPopupRef" @close="goBack" />
  <!-- 등록 프로모션 바텀시트 -->
  <traffic-terms-bottom
    :isShowBottomSheet="isShowTypeBottomSheet"
    @ok="trafficTermsAgree"
    @close="closeTrafficTerms"
  />
</template>

<script setup lang="ts">
import GetTmoneyPayCardPopup from './components/GetTmoneyPayCardPopup.vue'
import UnRegistTmoneyPayCardPopup from './components/UnRegistTmoneyPayCardPopup.vue'
import NoAvailableTmoneyPayCardPopup from './components/NoAvailableTmoneyPayCardPopup.vue'
import BenefitEventPopup from './components/BenefitEventPopup.vue'
import TrafficTermsBottom from './components/TrafficTermsBottom.vue'
import { onMounted, computed, ref } from 'vue'
import { useRegistTrafficCardStore } from '@/service/regist-traffic-card/registTrafficCardModule'
import { storeToRefs } from 'pinia'
import RegisteredCardList from './RegisteredCardList.vue'
import { useMessageModal } from '@/composables/useMessageModal'
import { formatDate } from '@/utils/dateUtils'
import { getAppBridge } from '@/utils'
import { AdbrixEvtId, FlexResponseCode } from '@/utils/hybrid/type'
import { useRouter } from 'vue-router'
import RegistSuccessPopup from './components/RegistSuccessPopup.vue'
import RegistExceedPopup from './components/RegistExceedPopup.vue'
import { useAuthStore } from '@/service/auth/authModule'
import { sendAdbrix } from '@/utils/sendAdbrixUtil'
import { type SwiperOptions } from 'swiper/types'
import uuSwiper from '@/components/uu-components/UuSwiper.vue'
import { SwiperSlide } from 'swiper/vue'
import { throttle } from 'lodash-es'
import type { bannerInfo } from '@/service/regist-traffic-card/model/registTrafficCardModel'
import { useCommonStore } from '@/service/common/commonModule'
import { encodeUriRouterPath } from '@/utils/linkUtils'
import type { openEncKeypadRequest } from '@/utils/hybrid/etc/etc.type'

const router = useRouter()
const { createErrorModal } = useMessageModal()
const registTrafficCardStore = useRegistTrafficCardStore()
const { authInfo } = storeToRefs(useAuthStore())
const {
  getTmoneyCardCnt,
  getCreditCardBanner,
  getRegistTmoneyCardInfo,
  getTmoneyNotesInfo,
  getCardBinInfo,
  getRegisteredTrafficCnt
} = storeToRefs(registTrafficCardStore)

const strCardNum01 = ref('')
const strCardNum02 = ref('')
const strCardNum03 = ref('')
const strCardNum04 = ref('')
const strCardNum01Ref = ref()
const strCardNum02Ref = ref()
const strCardNum03Ref = ref()
const strCardNum04Ref = ref()
const encToken = ref('') // 암호화 token
const encHmac = ref('') // 암호화 encHmac
const encInputValue = ref('') // 암호화 입력 값

const successPopup = ref(false) // 교통카드 등록 성공 팝업
const exceedPopup = ref(false) // 교통카드 등록 성공 팝업
const showUnRegistPopup = ref(false) // 티머니페이 미등록 사용자 팝업
const showNoAvailablePopup = ref(false) // 티머니페이 등록가능한 카드 미존재 팝업
const isShowGetTmoneyPayCardPopup = ref(false) // 티머니페이 카드 등록 팝업
const isCompleteDisabled = ref(true) // 완료버튼 비활성화
const callTmoneyList = ref(false) // 티머니 교통카드 목록 api 호출

const eventPopupRef = ref() // 대중교통 챌린지 이벤트팝업
const isShowTypeBottomSheet = ref(false) // 약관동의 바텀시트

const imgUrl = import.meta.env.VITE_IMG_URL

const isCardImg = ref(false) // 카드로고 이미지 노출 여부
const cardImg = ref('')
const cardName = ref('')
const isExceed = ref(false) // 카드 등록 최대치 초과 여부

const selectedAction = ref('');

/**
 * @description: 유의사항
 */
const tmoneyNotes = computed(() => {
  const delimiter = getTmoneyNotesInfo.value
    ? getTmoneyNotesInfo.value.includes('\r\n')
      ? '\r\n'
      : '\n'
    : ''
  return getTmoneyNotesInfo.value?.split(delimiter)
})

onMounted(async () => {
  await registTrafficCardStore.requestTmoneyNotes('TrcrReg4') // 유의사항
  registeredTrafficTmoneyCardApi()
})

// 등록된 카드 목록 조회
const registeredTrafficTmoneyCardApi = async () => {
  registTrafficCardStore.initRegisteredCreditCardList()
  await registTrafficCardStore.requestRegisteredTrafficCardList('0') // 선/후불 전체조회

  // 등록된 교통카드 개수 조회
  const reqDtm = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
  await registTrafficCardStore.requestRegisteredTrafficCardCnt(reqDtm)
}

// 교통카드 불러오기 버튼
const onClickGetTmoneyPayCard = async () => {
  // 선불카드 등록 최대치 초과시 팝업 노출
  if (getRegisteredTrafficCnt.value.prcrCnt > 4) {
    exceedPopup.value = true
    return
  }

  await registTrafficCardStore.requestGetTmoneyPayCard()
  if (getTmoneyCardCnt.value.tmpyRgtYn == 'Y') {
    if (
      getTmoneyCardCnt.value.tmpyRgtCnt == undefined ||
      getTmoneyCardCnt.value.tmpyRgtCnt == null ||
      getTmoneyCardCnt.value.tmpyRgtCnt === '0'
    ) {
      showNoAvailablePopup.value = true
    } else {
      isShowGetTmoneyPayCardPopup.value = true
    }
  } else {
    // 티머니페이 미등록 사용자
    showUnRegistPopup.value = true
  }
}

// 암호화 키패드 닫기 bridge
const closeKeypad = async () => {
  strCardNum03Ref.value.blur()
  const appBridge = await getAppBridge()
  await appBridge.closeEncKeypad()
}

// 암호화 키패드 호출 bridge
const callKeypad = async (maxLength: number, type: string) => {
  const appBridge = await getAppBridge()
  let params: openEncKeypadRequest = {
    inputMaxLength: maxLength,
    keypadType: type,
    isAddCardPwKb: false,
    inputFieldId: 'tmoney_input03'
  }
  const encRes = await appBridge.openEncKeypad(params)
  if (encRes.response.code === FlexResponseCode.OK && encRes.encToken && encRes.encHmac) {
    encToken.value = encRes.encToken
    encHmac.value = encRes.encHmac
    encInputValue.value = encRes.encInputValue
  }
}

// 티머니페이 카드 등록 => 교통카드 불러오기로 가져온 카드
const registerTmoneyPayCard = async () => {
  const reqDtm = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
  const { rgtYn } = await registTrafficCardStore.requestRegisterTmoneyPayCardNo(reqDtm)

  if (rgtYn === 'Y') {
    // 성공
    isCompleteDisabled.value = false
    callTmoneyList.value = true // 등록된 티머니카드 조회 api
    // 성공팝업 오픈
    successPopup.value = true
  } else {
    createErrorModal('알림', '문제가 발생했지만, 원격 서버에서 이유를 응답하지 않았습니다.')
  }
}

const registTmoneyPayCallback = () => {
  isShowGetTmoneyPayCardPopup.value = false
  registerTmoneyPayCard() // 티머니페이 카드 등록 api
}

/**
 * 약관 팝업 오픈 
 * 카드 등록, 교통카드 불러오기 모두 약관 동의 후 next 진행
 * @param action (regist: 카드등록, getTrafficCard: 교통카드 불러오기)
 */
const openTrafficTerms = async (action: 'regist' | 'getTrafficCard') => {
  // 약관동의 팝업 오픈
  isShowTypeBottomSheet.value = true;
  selectedAction.value = action;
}

/**
 * 약관 팝업 닫기
 */
 const closeTrafficTerms = async () => {
  isShowTypeBottomSheet.value = false;
  selectedAction.value = '';
}

const trafficTermsAgree = () => {
  isShowTypeBottomSheet.value = false;

  if (selectedAction.value && selectedAction.value == 'regist') {
    registCard();
  } else {
    onClickGetTmoneyPayCard();
  }
};

//교통카드 등록
const registCard = async () => {
  isCardImg.value = false

  let code = getCardBinInfo.value.issurCd == 'TMC' ? '1' : '2'
  const body = {
    trcrDvsCd: code, // 선불:1, 후불:2
    crcmCd: getCardBinInfo.value.crcmCd,
    trcrNo1: strCardNum01.value,
    trcrNo2: strCardNum02.value,
    trcrNo3: encInputValue.value, // 암호화된값
    trcrNo4: strCardNum04.value,
    encType: 'STK', //암호화 타입(교통카드 등록 : STK, 카드간편결제등록: 'MTK')
    encToken: encToken.value,
    encHmac: encHmac.value,
    reqEncYn: 'Y'
  }
  const res = await registTrafficCardStore.requestRegisterTmoneyCardNo(body)
  if (res.scsYn === 'Y') {
    // 카드등록 성공
    // 등록된 카드 목록 조회
    registeredTrafficTmoneyCardApi()
    strCardNum01.value = ''
    strCardNum02.value = ''
    strCardNum03.value = ''
    strCardNum04.value = ''

    if (getCardBinInfo.value.issurCd == 'TMC') {
      // 카드번호 복호화 브릿지
      const appBridge = await getAppBridge()
      const getScsYn = await appBridge.decScsYn({ encScsYn: res.encScsYn, encDtm: res.encDtm })
      if (getScsYn.response.code === FlexResponseCode.OK && getScsYn.decScsYn === 'Y') {
        successPopup.value = true // 카드등록 성공 팝업 open
        sendAdbrix(AdbrixEvtId.rTmoney)
      } else {
        createErrorModal(
          '알림',
          '문제가 발생했지만, 원격 서버에서 이유를 응답하지 않았습니다.',
          () => {
            strCardNum01Ref?.value.focus()
          }
        )
      }
    } else {
      successPopup.value = true
      sendAdbrix(AdbrixEvtId.rCredit)
    }
  } else {
    // 카드등록실패
    createErrorModal('알림', `${getRegistTmoneyCardInfo.value.msg}`, () => {
      strCardNum01.value = ''
      strCardNum02.value = ''
      strCardNum03.value = ''
      strCardNum04.value = ''
      strCardNum01Ref.value?.focus()
    })
  }
}

// 교통카드 등록 성공
const registSuccess = () => {
  isCardImg.value = false
  successPopup.value = false
  isCompleteDisabled.value = false
  callTmoneyList.value = true // 등록된 티머니카드 조회 api

  eventPopupRef.value.open()
}

// 완료버튼
const goBack = () => router.go(-1)

/**
 * @description: 카드번호 검증
 */
const inputCardNum = throttle(async (event: any, nextRef?: any, currRef?: any) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement

  // maxLength check
  if (target && typeof target.maxLength === 'number') {
    const maxLength = target.maxLength

    if (target.value.length > maxLength) {
      target.value = target.value.slice(0, maxLength)
      if (target === strCardNum01Ref.value) {
        strCardNum01.value = target.value
      } else if (target === strCardNum02Ref.value) {
        strCardNum02.value = target.value
      } else if (target === strCardNum03Ref.value) {
        strCardNum03.value = target.value
      } else if (target === strCardNum04Ref.value) {
        strCardNum04.value = target.value
      }
    }
  }

  if (strCardNum01.value.length === 4 && strCardNum02.value.length === 4 && currRef) {
    // 카드 번호(앞8자리만) 검증
    const res = await registTrafficCardStore.requestInqrCardBinInfo(
      `${strCardNum01.value}${strCardNum02.value}`
    )
    if (res && strCardNum01.value !== '' && strCardNum02.value !== '') {
      console.log('res : ', res)
      if (res.rspCd === '0000') {
        // 성공
        // 카드로고 이미지, 카드명 노출 -> cardImgPath crpcNm
        isCardImg.value = true
        cardImg.value = `${imgUrl}${getCardBinInfo.value.cardImgPath}`
        cardName.value =
          getCardBinInfo.value.issurCd != 'TMC'
            ? getCardBinInfo.value.crpcNm
            : getCardBinInfo.value.cardName

        isExceed.value = false
        if (getCardBinInfo.value.issurCd != 'TMC') {
          if (getRegisteredTrafficCnt.value.dpcCnt > 4) {
            // 후불카드
            isExceed.value = true
          }
        } else {
          if (getRegisteredTrafficCnt.value.prcrCnt > 4) {
            // 선불카드
            isExceed.value = true
          }
        }
      } else {
        // 실패
        createErrorModal(
          '알림',
          `${strCardNum01.value}${strCardNum02.value}로 시작하는 카드번호는 등록할 수 없습니다.`,
          () => strCardNum01Ref.value?.focus()
        )
        isCardImg.value = false
        strCardNum01.value = ''
        strCardNum02.value = ''
        setTimeout(() => strCardNum02Ref.value.blur(), 0)
        return
      }
    }
  } else if (strCardNum01.value.length != 4 || strCardNum02.value.length != 4) {
    // 첫번째 input, 두번째 input이 4자리가 아니면 카드로고 이미지 미노출
    isCardImg.value = false
  }

  // Input focus
  if (event.target.value.length === 4 && nextRef) {
    nextRef.focus()
  } else if (event.target.value.length === 4 && !nextRef) {
    // 4번째 input 4자리 채워지면 blur 처리
    strCardNum04Ref.value.blur()
  }
})

// 배너 상세 이동(이벤트 상세)
const moveEventDetail = (bannerItem: bannerInfo) => {
  let url = bannerItem.bnrUrlVal

  if (url != undefined && url != null) {
    const commonStore = useCommonStore()
    commonStore.setRouterHeaderTitle(
      bannerItem.webViewTtl ? bannerItem.webViewTtl : bannerItem.bnrTtlNm || null
    )
    router.push({ path: encodeUriRouterPath(url) })
  }
}

// 모바일티머니 앱 호출
const TmoneyApp = async () => {
  showUnRegistPopup.value = false
  // 앱열기
  const aosTmoneyPkg = import.meta.env.VITE_AOS_TMONEY_PKG
  const iosTmoneyPkg = import.meta.env.VITE_IOS_TMONEY_PKG

  // 스토어링크
  const aosTmoneyStore = import.meta.env.VITE_AOS_TMONEY_STORE
  const iosTmoneyStore = import.meta.env.VITE_IOS_TMONEY_STORE

  const appBridge = await getAppBridge()
  const version = await appBridge.getOtherAppVersionList()
  const appState = version.appState || 'N'
  if (appState === 'Y') {
    await appBridge.openView({
      url: authInfo.value.osKnd === 'A' ? aosTmoneyPkg : iosTmoneyPkg,
      viewType: 'app'
    })
  } else {
    await appBridge.openView({
      url: authInfo.value.osKnd === 'A' ? aosTmoneyStore : iosTmoneyStore,
      viewType: 'ex'
    })
  }
}

const isDisabled = computed(() => {
  if (
    strCardNum01.value.length === 4 &&
    strCardNum02.value.length === 4 &&
    strCardNum03.value.length === 4 &&
    strCardNum04.value.length === 4 &&
    !isExceed.value // 등록최대치 초과여부
  ) {
    return false
  } else {
    return true
  }
})

const swiperOptions: SwiperOptions = {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
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
  },
  a11y: {
    prevSlideMessage: 'Previous slide',
    nextSlideMessage: 'Next slide'
  },
  autoplay: {
    delay: 3000
  }
}

// const movePage = (link: string) => {
//   router.push(link);
// };
</script>
<style>
.traffic_card_swiper {
  position: relative;
}
.traffic_card_swiper .navi_pagination_wrap {
  z-index: 2 !important;
}
</style>

<style scoped>
.logo-align {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}
</style>
