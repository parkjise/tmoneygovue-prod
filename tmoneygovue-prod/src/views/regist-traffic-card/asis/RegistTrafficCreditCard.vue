<template>
  <sub-header title="신용(체크)카드 등록/변경" />
  <main id="main" class="main mor">
    <div class="container">
      <round-box title="신용(체크) 카드번호를 입력하세요.">
        <div class="tmoney_regist card">
          <!-- 카드 로고 -->
          <div class="card_logo" v-if="isCardImg">
            <img :src="cardImg" :alt="cardName" /><span>{{ cardName }}</span>
          </div>
          <!-- // 카드 로고 -->
          <form>
            <label for="tmoney_input01" class="tmoney_label sr_only">티머니 카드번호 1번째</label>
            <input
              ref="strCardNum01Ref"
              v-model="strCardNum01"
              id="tmoney_input01"
              class="tmoney_input"
              type="text"
              inputmode="numeric"
              pattern="\d*"
              placeholder="4자리"
              maxlength="4"
              @input="inputCardNum($event, strCardNum02Ref, strCardNum01Ref)"
            />
            <label for="tmoney_input02" class="tmoney_label sr_only">티머니 카드번호 2번째</label>
            <input
              ref="strCardNum02Ref"
              v-model="strCardNum02"
              id="tmoney_input02"
              class="tmoney_input"
              type="text"
              inputmode="numeric"
              pattern="\d*"
              placeholder="4자리"
              maxlength="4"
              @input="inputCardNum($event, strCardNum03Ref, strCardNum02Ref)"
            />
            <label for="tmoney_input03" class="tmoney_label sr_only">티머니 카드번호 3번째 4자리</label>
            <input
              ref="strCardNum03Ref"
              v-model="strCardNum03"
              id="tmoney_input03"
              class="tmoney_input"
              type="text"
              inputmode="none"
              placeholder="4자리"
              maxlength="4"
              @input="inputCardNum($event, strCardNum04Ref)"
              @focus="callKeypad(4, 'K')"
              @blur="closeKeypad"
              :style="{ 'padding-top': strCardNum03 ? '0.6rem' : '0' }"
            />
            <label for="tmoney_input04" class="tmoney_label sr_only">티머니 카드번호 4번째 4자리</label>
            <input
              ref="strCardNum04Ref"
              v-model="strCardNum04"
              id="tmoney_input04"
              class="tmoney_input"
              type="text"
              inputmode="numeric"
              pattern="\d*"
              placeholder="4자리"
              maxlength="4"
              @input="inputCardNum($event)"
            />
          </form>
        </div>
      </round-box>
      <!-- 약관 동의 -->
      <round-box hide-title style="margin-top: 2rem">
        <div class="tmoney_regist card agree">
          <uu-checkbox
            label="후불 교통카드 등록 전체 동의"
            value="unchecked"
            class="all_checkbox"
            v-model="allChecked"
            @change="setAllCheck"
          />
          <ul class="flex_area">
            <li v-for="(item, i) in creditCardStplList" :key="i">
              <uu-checkbox :label="`${item.stplTtlNm}`" v-model="item.stplCheck" @change="isCheckTerm" />
              <uu-button v-if="item.extlUrl != null" @click="clickTermsDetail(item)">
                <uu-ic size="16" name="arrow_right_gray" />
              </uu-button>
            </li>
          </ul>
        </div>
      </round-box>
      <!--// 약관 동의 -->
      <!-- 배너 영역 -->
      <div class="tmoney_regist card slide" v-if="getCreditCardBanner && getCreditCardBanner.length > 0">
        <uu-swiper type="custom" class="swiper_banner" navi-pagination :options="swiperOptions">
          <swiper-slide v-for="(banner, i) in getCreditCardBanner" :key="i">
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
      <div class="tmoney_regist card ticket_notice">
        <p class="title">
          <uu-ic size="16" name="exclamation_gray090" />
          유의사항
        </p>
        <ul v-for="(item, i) in creditCardNotes" :key="i" :class="{ no_dots: !item.includes('·') }">
          <li v-html="item.includes('·') ? item.replace(/^· /, '') : '&nbsp&nbsp' + item"></li>
        </ul>
      </div>
      <!--// 유의사항 -->
      <uu-button
        label="카드등록"
        btn-color="primary"
        size="xl"
        class="primary_full"
        @click="onclickRegistCreditCard()"
        :disabled="disabledButton"
      />
    </div>
  </main>
  <!-- 교통카드 등록 성공 팝업 -->
  <regist-success-popup :isShow="successPopup" :cardType="cardType" @ok="registSuccess" />
  <!-- 혜택뽑기 팝업 -->
  <benefit-event-popup ref="eventPopupRef" @close="router.go(-1)" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import BenefitEventPopup from '../components/BenefitEventPopup.vue';
import uuSwiper from '@/components/uu-components/UuSwiper.vue';
import { type SwiperOptions } from 'swiper/types';
import { SwiperSlide } from 'swiper/vue';
import { useRegistTrafficCardStore } from '@/service/regist-traffic-card/registTrafficCardModule';
import { storeToRefs } from 'pinia';
import { useMessageModal } from '@/composables/useMessageModal';
import { computed } from 'vue';
import type { bannerInfo, stplInfo } from '@/service/regist-traffic-card/model/registTrafficCardModel';
import { useRouter } from 'vue-router';
import { encodeUriRouterPath } from '@/utils/linkUtils';
import { getAppBridge } from '@/utils';
import type { openEncKeypadRequest } from '@/utils/hybrid/etc/etc.type';
import { useCommonStore } from '@/service/common/commonModule';
import { AdbrixEvtId, FlexResponseCode } from '@/utils/hybrid/type';
import RegistSuccessPopup from '../components/RegistSuccessPopup.vue';
import { throttle } from 'lodash-es';
import { sendAdbrix } from '@/utils/sendAdbrixUtil';

const router = useRouter();
const { createErrorModal } = useMessageModal();
const registTrafficCardStore = useRegistTrafficCardStore();
const { getCreditCardNotesInfo, getCreditCardBanner, getCreditCardStplList, getCardBinInfo } =
  storeToRefs(registTrafficCardStore);

const strCardNum01 = ref('');
const strCardNum02 = ref('');
const strCardNum03 = ref('');
const strCardNum04 = ref('');
const strCardNum01Ref = ref();
const strCardNum02Ref = ref();
const strCardNum03Ref = ref();
const strCardNum04Ref = ref();
const encToken = ref(''); // 암호화 token
const encHmac = ref(''); // 암호화 encHmac
const encInputValue = ref(''); // 암호화 입력 값

const imgUrl = import.meta.env.VITE_IMG_URL;
const isCardImg = ref(false); // 카드로고 이미지 노출 여부
const cardImg = ref('');
const cardName = ref('');
const allChecked = ref(false); // 약관 전체동의 여부
const creditCardStplList = reactive<stplInfo[]>([]); // 약관목록
const successPopup = ref(false); // 교통카드 등록 성공 팝업
const cardType = 'C';

const eventPopupRef = ref(); // 챌린지 팝업

/**
 * @description: 유의사항
 */
const creditCardNotes = computed(() => {
  const delimiter = getCreditCardNotesInfo.value.includes('\r\n') ? '\r\n' : '\n';
  return getCreditCardNotesInfo.value.split(delimiter);
});

onMounted(async () => {
  // visibilityState blur 이벤트리스너 추가. 앱이 닫히고 다시 열릴때 키패드가 열리는 현상 대응
  addVisibilityChangeListener();

  await registTrafficCardStore.requestCreditNotes('TrcrReg2'); // 유의사항, 배너, 약관
  const cardStplList = getCreditCardStplList.value.map((item) => ({
    ...item,
    stplCheck: item.stplAgrmYn === 'Y' ? true : false // 체크
  })); // 약관목록

  creditCardStplList.splice(0, creditCardStplList.length, ...cardStplList);
});

onBeforeUnmount(() => {
  // visibilityState blur 이벤트리스너 제거
  removeVisibilityChangeListener();
});

/**
 * @description: 카드번호 검증
 */
const inputCardNum = throttle(async (event: any, nextRef?: any, currRef?: any) => {
  // maxLength check
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;

  if (target && typeof target.maxLength === 'number') {
    const maxLength = target.maxLength;

    if (target.value.length > maxLength) {
      target.value = target.value.slice(0, maxLength);
      if (target === strCardNum01Ref.value) {
        strCardNum01.value = target.value;
      } else if (target === strCardNum02Ref.value) {
        strCardNum02.value = target.value;
      } else if (target === strCardNum03Ref.value) {
        strCardNum03.value = target.value;
      } else if (target === strCardNum04Ref.value) {
        strCardNum04.value = target.value;
      }
    }
  }

  if (strCardNum01.value.length === 4 && strCardNum02.value.length === 4 && currRef) {
    // 카드 번호(앞8자리만) 검증
    const res = await registTrafficCardStore.requestInqrCardBinInfoASIS(`${strCardNum01.value}${strCardNum02.value}`);
    if (res && strCardNum01.value !== '' && strCardNum02.value !== '') {
      if (res.rspCd === '0000') {
        // 성공
        // 카드로고 이미지, 카드명 노출 -> cardImgPath crpcNm
        isCardImg.value = true;
        cardImg.value = `${imgUrl}${getCardBinInfo.value.cardImgPath}`;
        cardName.value = getCardBinInfo.value.crpcNm;
      } else {
        // 실패
        createErrorModal(
          '알림',
          `${strCardNum01.value}${strCardNum02.value}로 시작하는 카드번호는 등록할 수 없습니다.`,
          () => strCardNum01Ref.value.focus()
        );
        strCardNum01.value = '';
        strCardNum02.value = '';
        setTimeout(() => strCardNum02Ref.value.blur(), 0);
        return;
      }
    }
  } else if (strCardNum01.value.length != 4 || strCardNum02.value.length != 4) {
    // 첫번째 input, 두번째 input이 4자리가 아니면 카드로고 이미지 미노출
    isCardImg.value = false;
  }

  if (event.target.value.length === 4 && nextRef) {
    // 다음 input으로 focus
    nextRef.focus();
  } else if (event.target.value.length === 4 && !nextRef) {
    // 4번째 input 4자리 채워지면 blur 처리
    strCardNum04Ref.value.blur();
  }
}, 300);

// 암호화 키패드 닫기 bridge
const closeKeypad = async () => {
  strCardNum03Ref.value.blur();
  const appBridge = await getAppBridge();
  await appBridge.closeEncKeypad();
};

// 암호화 키패드 호출 bridge
const callKeypad = async (maxLength: number, type: string) => {
  const appBridge = await getAppBridge();
  let params: openEncKeypadRequest = {
    inputMaxLength: maxLength,
    keypadType: type,
    isAddCardPwKb: false,
    inputFieldId: 'tmoney_input03'
  };
  const encRes = await appBridge.openEncKeypad(params);
  if (encRes.response.code === FlexResponseCode.OK && encRes.encToken && encRes.encHmac) {
    encToken.value = encRes.encToken;
    encHmac.value = encRes.encHmac;
    encInputValue.value = encRes.encInputValue;
  }
};

// 카드등록 버튼
const onclickRegistCreditCard = async () => {
  const param = {
    trcrDvsCd: '2', // 후불 2
    crcmCd: getCardBinInfo.value.crcmCd,
    trcrNo1: strCardNum01.value,
    trcrNo2: strCardNum02.value,
    trcrNo3: encInputValue.value, // 암호화된값
    trcrNo4: strCardNum04.value,
    encToken: encToken.value,
    encHmac: encHmac.value,
    reqEncYn: 'Y'
  };

  const { scsYn, msg } = await registTrafficCardStore.requestRegisterCreditCardNoASIS(param);
  if (scsYn === 'Y') {
    // 교통카드 등록 성공
    successPopup.value = true;
    sendAdbrix(AdbrixEvtId.rCredit);
  } else {
    // 교통카드 등록 실패
    createErrorModal('알림', `${msg}`);
  }
};

// 교통카드 등록 성공
const registSuccess = () => {
  successPopup.value = false;
  if (!eventPopupRef.value.open()) router.go(-1);
};

// 배너 상세 이동(이벤트 상세)
const moveEventDetail = (bannerItem: bannerInfo) => {
  let url = bannerItem.bnrUrlVal;

  if (url != undefined && url != null) {
    const commonStore = useCommonStore();
    commonStore.setRouterHeaderTitle(bannerItem.webViewTtl ? bannerItem.webViewTtl : bannerItem.bnrTtlNm || null);
    router.push({ path: encodeUriRouterPath(url) });
  }
};

// 약관 상세 이동
const clickTermsDetail = async (item: stplInfo) => {
  const appBridge = await getAppBridge();
  if (item.extlUrl !== undefined && item.extlUrl !== null && item.extlUrl !== '') {
    await appBridge.openView({ url: item.extlUrl, headerTitle: item.stplTtlNm, viewType: 'in' });
  }
};

// 약관 체크 이벤트
const isCheckTerm = () => {
  if (creditCardStplList.filter((item) => item.stplCheck === false).length > 0) {
    allChecked.value = false;
  } else {
    allChecked.value = true;
  }
};

// 약관 전체동의 체크
const setAllCheck = (isChecked: boolean) => {
  creditCardStplList.forEach((item) => (item.stplCheck = isChecked));
};

// 카드등록 버튼 비활성화
const disabledButton = computed(() => {
  if (
    strCardNum01.value.length === 4 &&
    strCardNum02.value.length === 4 &&
    strCardNum03.value.length === 4 &&
    strCardNum04.value.length >= 2 &&
    creditCardStplList.filter((item) => item.stplCheck && item.stplMndtYn === 'Y').length ===
      creditCardStplList.filter((item) => item.stplMndtYn === 'Y').length
  ) {
    return false;
  } else {
    return true;
  }
});

// Custom Options
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
      );
    }
  },
  a11y: {
    prevSlideMessage: 'Previous slide',
    nextSlideMessage: 'Next slide'
  },
  autoplay: {
    delay: 3000
  }
};

const visibilityChangeHandler = () => {
  if (document.visibilityState === 'visible') {
    // 페이지가 다시 활성화될 때 실행될 코드
    (document.activeElement as HTMLElement)?.blur?.();
  }
};

// visibilityState blur 이벤트리스너 추가. 앱이 닫히고 다시 열릴때 키패드가 열리는 현상 대응
const addVisibilityChangeListener = () => {
  document.addEventListener('visibilitychange', visibilityChangeHandler);
};

// visibilityState blur 이벤트리스너 제거
const removeVisibilityChangeListener = () => {
  document.removeEventListener('visibilitychange', visibilityChangeHandler);
};
</script>
