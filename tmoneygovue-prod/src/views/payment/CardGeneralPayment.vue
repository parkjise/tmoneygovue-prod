<template>
  <common-modal
    ref="cardGeneralPaymentModalRef"
    v-model="cardGeneralPaymentModal"
    type="full"
    title="신용/체크 일반결제"
    add-class="modal_card_regist credit"
    @close="closeKeypadAndWebView"
  >
    <template #modal_body>
      <round-box hide-title>
        <form>
          <div class="card card_num">
            <p class="card_label logo" v-if="cardBinInfo && cardBinInfo?.crpcId !== ''">
              <img :src="`${imgUrl}${cardBinInfo?.cardImgPath}`" :alt="`${cardBinInfo?.cardName} 로고`" />
              {{ cardBinInfo?.crpcNm }}
            </p>
            <p class="card_label" v-else>카드 번호</p>
            <div class="inline_form_wrap">
              <uu-input
                ref="cardNum1Ref"
                v-model="cardDetails.cardNum1"
                inline
                hideLabel
                placeholder="1234"
                :aria-label="`카드번호 첫번째 영역의 ${cardDetails.cardNum1 ? cardDetails.cardNum1.length + '자리 입력됨':'네자리를 입력해주세요. 힌트'}`"
                :maxLength="4"
                :fixId="'cardNum1'"
                inputmode="none"
                @input="checkLengthAfterFocus($event, 4, cardNum1Ref, cardNum2Ref, cardDetails.cardNum2)"
                @focus="openKeypad(4, '', false, $event, 'cardNumEnc1',cardNum1Ref)"
                @blur="cardNumCloseKeypad"
                @focusin="lockScrollPosition"
              />
              <input type="hidden" id="cardNumEnc1" v-model="cardDetails.cardNumEnc1" />
              <span class="dash" aria-hidden="true">-</span>
              <uu-input
                ref="cardNum2Ref"
                v-model="cardDetails.cardNum2"
                inline
                hideLabel
                :aria-label="`카드번호 두번째 영역의 ${cardDetails.cardNum2 ? cardDetails.cardNum2.length + '자리 입력됨':'네자리를 입력해주세요. 힌트'}`"
                placeholder="1234"
                :maxLength="4"
                :fixId="'cardNum2'"
                inputmode="none"
                @input="checkLengthAfterFocus($event, 4, cardNum2Ref, cardNum3Ref, cardDetails.cardNum3)"
                @focus="openKeypad(4, '', false, $event, 'cardNumEnc2',cardNum2Ref)"
                @blur="cardNumCloseKeypad"
                @focusin="lockScrollPosition"
              />
              <input type="hidden" id="cardNumEnc2" v-model="cardDetails.cardNumEnc2" />
              <span class="dash" aria-hidden="true">-</span>
              <uu-input
                ref="cardNum3Ref"
                v-model="cardDetails.cardNum3"
                inline
                hideLabel
                :aria-label="`카드번호 세번째 영역의 ${cardDetails.cardNum3 ? cardDetails.cardNum3.length + '자리 입력됨':'네자리를 입력해주세요. 힌트'}`"
                placeholder="1234"
                :maxLength="4"
                :fixId="'cardNum3'"
                :type="'password'"
                inputmode="none"
                @input="checkLengthAfterFocus($event, 4, cardNum3Ref, cardNum4Ref, cardDetails.cardNum4)"
                @focus="openKeypad(4, '', false, $event, 'cardNumEnc3',cardNum3Ref)"
                @blur="cardNumCloseKeypad"
                @focusin="lockScrollPosition"
              />
              <input type="hidden" id="cardNumEnc3" v-model="cardDetails.cardNumEnc3" />
              <span class="dash" aria-hidden="true">-</span>
              <uu-input
                ref="cardNum4Ref"
                v-model="cardDetails.cardNum4"
                inline
                hideLabel
                :aria-label="`카드번호 네번째 영역의 ${cardDetails.cardNum4 ? cardDetails.cardNum4.length + '자리 입력됨':'네자리를 입력해주세요. 힌트'}`"
                placeholder="1234"
                :maxLength="4"
                :fixId="'cardNum4'"
                :type="'password'"
                inputmode="none"
                @focus="openKeypad(4, 'F', false, $event, 'cardNumEnc4', cardNum4Ref)"
                @focusin="lockScrollPosition"
              />
              <input type="hidden" id="cardNumEnc4" v-model="cardDetails.cardNumEnc4" />
            </div>
            <div class="flex_area">
              <uu-checkbox v-model="corpCdYn" label="법인공용카드" value="법인공용카드" @change="changeCorpCdYn"/>
              <uu-button btn-style="none" @click="scanOCR">
                <uu-ic size="16" name="camera" />
                카드스캔하기
              </uu-button>
            </div>
          </div>
          <div class="card card_info">
            <uu-input
              type="text"
              ref="exdtRef"
              v-model="cardDetails.exdt"
              inputmode="numeric"
              label="카드 유효기간 (MMYY)"
              placeholder="MMYY"
              aria-label="카드유효기간 월,연도를 M M Y Y 포맷으로 입력해주세요"
              :max-length="4"
              @input="checkExDtCheck($event)"
              @focus="restoreScrollPosition"
              @focusin="lockScrollPosition"
            />
            <uu-input
              :fixId="'cardPwd'"
              :type="'password'"
              ref="cardPwdRef"
              v-model="cardDetails.cardPwd"
              label="카드 비밀번호"
              placeholder="앞 2자리"
              :max-length="2"
              inputmode="none"
              @input="
                checkLengthAfterFocus(
                  $event,
                  2,
                  exdtRef,
                  corpCdYn ? companyNumber1Ref : birthRef,
                  corpCdYn ? companyNumber1 : cardDetails.birth
                )
              "
              @focus="openKeypad(2, 'F', true, $event, 'cardPwdEnc', cardPwdRef, 'cardPwdEncKb')"
              @focusin="lockScrollPosition"
            />
          </div>
          <div class="card card_birth" v-show="!corpCdYn">
            <p class="label">생년월일</p>
            <uu-input
              :fixId="'birth'"
              ref="birthRef"
              v-model="cardDetails.birth"
              inline
              hide-label
              placeholder="YYMMDD"
              aria-label="생년월일을 Y Y M M D D 포맷으로 입력해주세요"
              :max-length="6"
              class="first"
              inputmode="none"
              @focus="openKeypad(6, 'F', false, $event, 'birthEnc', birthRef)"
              @focusin="lockScrollPosition"
            />
          </div>
          <div class="card card_company" v-show="corpCdYn">
            <p class="label">사업자 등록 번호</p>
            <div class="inline_form_wrap" :aria-label="`사업자 등록 번호 열자리를 입력해주세요.`" @click="openKeypad(10, '', false, 'companyNumber', 'companyNumberEnc')">
              <uu-input
                inline
                hide-label
                label="사업자 등록 번호"
                :aria-label="`사업자 등록 번호 첫번째 영역 ${companyNumber1 ? companyNumber1 + '자리 입력됨':'입력해주세요. 힌트'}`"
                placeholder="123"
                ref="companyNumber1Ref"
                v-model="companyNumber1"
                :maxLength="3"
                inputmode="none"
                @blur="closeKeypad"
                @focusin="lockScrollPosition"
              />
              <uu-input
                inline
                hide-label
                label="사업자 등록 번호"
                :aria-label="`사업자 등록 번호 두번째 영역 ${companyNumber2 ? companyNumber2 + '자리 입력됨':'입력해주세요. 힌트'}`"
                placeholder="12"
                ref="companyNumber2Ref"
                v-model="companyNumber2"
                :maxLength="2"
                inputmode="none"
                @blur="closeKeypad"
                @focusin="lockScrollPosition"
              />
              <uu-input
                inline
                hide-label
                label="사업자 등록 번호"
                :aria-label="`사업자 등록 번호 세번째 영역 ${companyNumber3 ? companyNumber3 + '자리 입력됨':'입력해주세요. 힌트'}`"
                placeholder="12345"
                ref="companyNumber3Ref"
                v-model="companyNumber3"
                :maxLength="5"
                inputmode="none"
                @blur="closeKeypad"
                @focusin="lockScrollPosition"
              />
              <input type="hidden" v-model="cardDetails.companyNumber" id="companyNumber" />
              <input type="hidden" v-model="cardDetails.companyNumberEnc" id="companyNumberEnc" />
            </div>
            <p class="desc">기명 법인카드의 경우 카드 종류를 개인카드로 선택해주세요.</p>
          </div>
          <div class="card card_installment">
            <p class="card_label">할부 개월수 <span>(편도 기준 5만원 이상만)</span></p>
            <uu-button
              btn-style="line"
              :disabled="!isInstallment || totalPaymentAmount < 50000"
              @click="cardGeneralPaymentInstallmentPopupOpen"
            >
              {{ installmentText }}
              <uu-ic size="20" name="arrow" />
            </uu-button>
          </div>
          <div class="card_ticket_notice">
            <uu-ic size="16" name="exclamation" />
            <p>카드번호, 유효기간(MMYY), 생년월일(YYMMDD)을 확인해 주십시오.</p>
          </div>
        </form>
      </round-box>
      <round-box hide-title>
        <div class="price_area">
          <p>최종 결제금액</p>
          <p class="price">
            <strong>{{ formatAmount(totalPaymentAmount) }}</strong> 원
          </p>
        </div>
      </round-box>
    </template>
    <template #modal_footer>
      <uu-button btn-color="primary" size="xl" label="결제하기" @click="sendCaedInfo" :disabled="btnDisabled" />
    </template>
  </common-modal>
  <card-general-payment-installment-popup
    ref="cardGeneralPaymentInstallmentPopupRef"
    :installmentMaxMonth="6"
    @monthlyInstallment="handleMonthlyInstallment"
  />
  <card-general-payment-installment-confirm
    ref="cardGeneralPaymentInstallmentConfirmRef"
    :popupContent="'<p>카드번호를 수정하면 입력된 정보가 초기화됩니다.</p>'"
    @ok="popupOk"
  />
</template>

<script setup lang="ts">
import CommonModal from '@/views/common/components/CommonModal.vue';
import { ref, watch, computed, onMounted, reactive, nextTick, onBeforeUnmount } from 'vue';
import CardGeneralPaymentInstallmentPopup from '@/views/payment/components/CardGeneralPaymentInstallmentPopup.vue';
import CardGeneralPaymentInstallmentConfirm from './components/CardGeneralPaymentInstallmentConfirm.vue';
import { useMessageModal } from '@/composables/useMessageModal';
import { getAppBridge } from '@/utils';
import { FlexResponseCode } from '@/utils/hybrid/type';
import { formatAmount } from '@/utils/amountUtils';
import type { openEncKeypadResponse } from '@/utils/hybrid/etc/etc.type';
import type { sendCardGeneralPaymentRequest } from '@/utils/hybrid/payment/payment.type';
import { usePaymentStore } from '@/service/payment/paymentModule';
import { debounce } from 'lodash-es';
import type { CardDetailInfo } from '@/service/payment/model/paymentModel';

const paymentStore = usePaymentStore();

onMounted(async () => {
  // visibilityState blur 이벤트리스너 추가. 앱이 닫히고 다시 열릴때 키패드가 열리는 현상 대응
  addVisibilityChangeListener();

  // 카드정보 초기화
  initCardBinInfo();

  // OCR 호출
  scanOCR();

  // 카드 일반결제 조회 브릿지 호출
  await getCardGeneralPaymentInfo();
});

onBeforeUnmount(() => {
  // visibilityState blur 이벤트리스너 제거
  removeVisibilityChangeListener();
});

const isInstallment = ref(false); // 할부여부
const totalPaymentAmount = ref(0); // 결제금액
// 카드 일반결제 정보 조회
const getCardGeneralPaymentInfo = async () => {
  const appBridge = await getAppBridge();
  const res = await appBridge.getCardGeneralPayment();
  isInstallment.value = res.isInstallment;
  totalPaymentAmount.value = res.paymentAmount;
};

const initCardBinInfo = () => {
  paymentStore.initCardBinInfo();
};

// 신용/체크카드 할부개월수
const monthlyInstallment = ref('00');
const cardGeneralPaymentInstallmentPopupRef = ref();
const cardGeneralPaymentInstallmentPopupOpen = () => cardGeneralPaymentInstallmentPopupRef.value.open();

const handleMonthlyInstallment = (value: string) => {
  monthlyInstallment.value = value;
};

const installmentText = computed(() => {
  return monthlyInstallment.value == '00' ? '일시불' : `${+monthlyInstallment.value}개월`;
});

// 스크롤 관련 핸들링
const scrollTop = ref(0);
const lockScrollPosition = () => {
  scrollTop.value = window.scrollY;
};
const restoreScrollPosition = () => {
  window.scrollTo(0, scrollTop.value);
};

// 카드 일반결제 모달
const cardGeneralPaymentModal = ref(true);
const cardGeneralPaymentModalRef = ref();

const open = () => {
  resetInputInfo();
};
defineExpose({ open });

// confirm용 value 설정
const cardGeneralPaymentInstallmentConfirmRef = ref();
const popupContent = ref();
const popupOk = ref();

// 메시지용
const { createErrorModal } = useMessageModal();

// 카드정보 관련
const imgUrl = import.meta.env.VITE_IMG_URL;

const cardDetails: CardDetailInfo = reactive({
  cardNum1: '',
  cardNum2: '',
  cardNum3: '',
  cardNum4: '',
  cardNumEnc1: '',
  cardNumEnc2: '',
  cardNumEnc3: '',
  cardNumEnc4: '',
  exdt: '',
  cardPwd: '',
  cardPwdEnc: '',
  cardPwdEncKb: '',
  birth: '',
  birthEnc: '',
  companyNumber: '',
  companyNumberEnc: ''
});

const corpCdYn = ref(false);
const cardNum1Ref = ref();
const cardNum2Ref = ref();
const cardNum3Ref = ref();
const cardNum4Ref = ref();
const exdtRef = ref();
const cardPwdRef = ref();
const birthRef = ref();
const companyNumber1Ref = ref();
const companyNumber2Ref = ref();
const companyNumber3Ref = ref();

const cardBinInfo = computed(() => paymentStore.cardBinInfo);
const blurChangeFocusComanyNumber = ref(false);

// 카드 정보 초기화
const resetCardInfo = () => {
  cardDetails.cardNum1 = '';
  cardDetails.cardNum2 = '';
  cardDetails.cardNum3 = '';
  cardDetails.cardNum4 = '';
  cardDetails.cardNumEnc1 = '';
  cardDetails.cardNumEnc2 = '';
  cardDetails.cardNumEnc3 = '';
  cardDetails.cardNumEnc4 = '';
  cardDetails.exdt = '';
  cardDetails.cardPwd = '';
  cardDetails.cardPwdEnc = '';
  cardDetails.cardPwdEncKb = '';
  cardDetails.birth = '';
  cardDetails.birthEnc = '';
};

// 카드 정보 전부 초기화
const resetInputInfo = async () => {
  resetCardInfo();
  paymentStore.initCardBinInfo();
  cardDetails.companyNumber = '';
  cardDetails.companyNumberEnc = '';
};

// 사업자등록번호 관련 체크
function createCompanyNumberSection(start: number, end?: number) {
  return computed({
    get: () => cardDetails.companyNumber.slice(start, end || undefined),
    set: (value) => {
      const before = cardDetails.companyNumber.slice(0, start);
      const after = end ? cardDetails.companyNumber.slice(end) : '';
      cardDetails.companyNumber = before + value + after;
    }
  });
}

const companyNumber1 = createCompanyNumberSection(0, 3);
const companyNumber2 = createCompanyNumberSection(3, 5);
const companyNumber3 = createCompanyNumberSection(5);
watch(
  () => cardDetails.companyNumber,
  async () => {
    if (cardDetails.companyNumber.length === 3) {
      await nextTick();
      blurChangeFocusComanyNumber.value = true;
      companyNumber2Ref.value.focus();
    }
    if (cardDetails.companyNumber.length === 5) {
      await nextTick();
      blurChangeFocusComanyNumber.value = true;
      companyNumber3Ref.value.focus();
    }
  }
);

// 브릿지로 카드 정보 전달
const sendCaedInfo = async () => {
  const sendCardGeneralPaymentParam: sendCardGeneralPaymentRequest = {
    cardSecDat1: cardDetails.cardNumEnc1, // 암호화 카드번호1
    cardSecDat2: cardDetails.cardNumEnc2, // 암호화 카드번호2
    cardSecDat3: cardDetails.cardNumEnc3, // 암호화 카드번호3
    cardSecDat4: cardDetails.cardNumEnc4, // 암호화 카드번호4
    cardSecLen1: cardDetails.cardNum1.length, // 카드번호1 길이
    cardSecLen2: cardDetails.cardNum2.length, // 카드번호2 길이
    cardSecLen3: cardDetails.cardNum3.length, // 카드번호3 길이
    cardSecLen4: cardDetails.cardNum4.length, // 카드번호4 길이
    cardPw: cardDetails.cardPwdEnc, // 암호화 카드 비밀번호
    cardPwkb: cardDetails.cardPwdEncKb, // 암호화 카드 비밀번호 KB
    validity: cardDetails.exdt, // 유효기간
    crpcId: cardBinInfo.value.crpcId, // 카드사 코드
    crpcNm: cardBinInfo.value.crpcNm, // 카드사 이름
    checkCardYN: cardBinInfo.value.checkCardYN, // 체크카드 여부
    // cprtCardYn: cardBinInfo.value.cprtCardYN, // 법인카드 여부
    cprtCardYn: corpCdYn.value ? 'Y' : 'N', // 법인카드 여부
    issurCd: cardBinInfo.value.issurCd, // 발급사 코드
    cardImgPath: cardBinInfo.value.cardImgPath, // 카드 이미지 경로
    cardSecBirth: corpCdYn.value ? '' : cardDetails.birthEnc, // 암호화 생년월일
    companyNumber: cardDetails.companyNumberEnc, // 암호화 사업자등록번호
    monthlyInstallment: monthlyInstallment.value // 할부개월수
  };

  // 브릿지로 신용/체크 일반결제 정보 전달
  const appBridge = await getAppBridge();
  const resSendCardGeneralPayment = await appBridge.sendCardGeneralPayment(sendCardGeneralPaymentParam);
  if (!resSendCardGeneralPayment || resSendCardGeneralPayment.response.code != FlexResponseCode.OK) {
    const message = resSendCardGeneralPayment.response.message;
    createErrorModal('', message);
  }
};

const changeCorpCdYn = () => {
  if(corpCdYn.value) {
    cardDetails.birth = '';
    cardDetails.birthEnc = '';
  } else {
    cardDetails.companyNumberEnc = '';
    cardDetails.companyNumber = '';
  }
};

// 카드유효기간 number타입 아닌 문자열 복사/붙이기 방지
const checkExDtCheck = (e: InputEvent) => {
  if (Number.isNaN(Number(cardDetails.exdt))) {
    nextTick(() => {
      cardDetails.exdt = '';
    });
    return;
  }
  checkLengthAfterFocus(e, 4, exdtRef.value, cardPwdRef.value, cardDetails.cardPwd);
};

// input 작성 후 포커스 이동
const checkLengthAfterFocus = debounce(
  async (
    event: any,
    max: number,
    eventRef: HTMLInputElement | null,
    lcnsNoRef: HTMLInputElement | null,
    lcnsNoRefValue: string,
    min?: number
  ) => {
    if (lcnsNoRef == null || eventRef == null) {
      return;
    }
    if (eventRef === cardNum1Ref.value || eventRef === cardNum2Ref.value) {
      const binCheck = await cardBinCheck();
      if (!binCheck) {
        eventRef.blur();
        return;
      }
    }
    if (min && event.length >= min) {
      if (lcnsNoRefValue !== '') {
        eventRef.blur();
        return;
      }
      lcnsNoRef.focus();
      return;
    }
    if (event.length === max && lcnsNoRef) {
      if (lcnsNoRefValue !== '') {
        eventRef.blur();
        return;
      }
      lcnsNoRef.focus();
    }
  },
  500
);

// OCR 브릿지 호출
const scanOCR = async () => {
  const appBridge = await getAppBridge();
  const res = await appBridge.readOCR();
  if (res && res.response.code === FlexResponseCode.OK) {
    const cardInfo = res;
    cardDetails.cardNum1 = cardInfo.cardNum1;
    cardDetails.cardNum2 = cardInfo.cardNum2;
    cardDetails.cardNum3 = cardInfo.cardNum3;
    cardDetails.cardNum4 = cardInfo.cardNum4;
    cardDetails.cardNumEnc1 = cardInfo.encCardNum1;
    cardDetails.cardNumEnc2 = cardInfo.encCardNum2;
    cardDetails.cardNumEnc3 = cardInfo.encCardNum3;
    cardDetails.cardNumEnc4 = cardInfo.encCardNum4;
    await cardBinCheck();
    if (cardInfo.exdt === '' || Number.isNaN(Number(cardInfo.exdt.replaceAll(/\//g, '')))) cardInfo.exdt = '';
    cardDetails.exdt = cardInfo.exdt;
  }
};

const keypadApplied = ref(true);
const currentEncTarget = ref('');
const accessState = ref(false);
// 암호화 키패드 호출 bridge
const openKeypad = async (
  maxLength: number,
  type: string,
  isAddCardPwkb: boolean,
  $event: any,
  encRef:
    | 'cardNumEnc1'
    | 'cardNumEnc2'
    | 'cardNumEnc3'
    | 'cardNumEnc4'
    | 'cardPwdEnc'
    | 'birthEnc'
    | 'companyNumberEnc',
  inputRef?: any,
  encKb?: 'cardPwdEncKb'
) => {
  keypadApplied.value = false;
  restoreScrollPosition();
  const appBridge = await getAppBridge();
  const id = typeof $event === 'string' ? $event : $event.target.id;

  // input 초기화(키패드 재호출시에 기존 값을 지우기 위함)
  if (typeof id === 'string' && id in cardDetails) {
    cardDetails[id as keyof CardDetailInfo] = '';
  }
  if (currentEncTarget.value === id) {
    return;
  }
  currentEncTarget.value = id;

  // 접근성 활성화 여부 조회 후 키패드타입 지정
  if (type === '') {
     try {
       let accessibility = (await appBridge.getAccessibility());
       accessState.value = accessibility?.state;
     } catch (e) {
       // 접근성 여부 조회 실패 시 비활성화 default
       accessState.value = false;
     }
     type = accessState.value ? 'F' : 'M';
   }

  let params = {
    inputMaxLength: maxLength,
    keypadType: type,
    isAddCardPwKb: isAddCardPwkb,
    inputFieldId: id
  };

  if (
    (accessState.value && (encRef === 'cardNumEnc1' || encRef === 'cardNumEnc2' || encRef === 'cardNumEnc3')) ||
    encRef === 'cardNumEnc4' || encRef === 'cardPwdEnc' || encRef === 'birthEnc' || encRef === 'companyNumberEnc') {
    params = {
      ...params,
      ...getKeypadOptionalData(encRef)
    };
  }

  const handleEncryptionResult = (res: openEncKeypadResponse) => {
    if (!res) return;
    const encryptionFields = {
      cardNumEnc1: () => (cardDetails.cardNumEnc1 = res.encInputValue),
      cardNumEnc2: () => (cardDetails.cardNumEnc2 = res.encInputValue),
      cardNumEnc3: () => (cardDetails.cardNumEnc3 = res.encInputValue),
      cardNumEnc4: () => (cardDetails.cardNumEnc4 = res.encInputValue),
      cardPwdEnc: () => (cardDetails.cardPwdEnc = res.encInputValue),
      birthEnc: () => (cardDetails.birthEnc = res.encInputValue),
      companyNumberEnc: () => (cardDetails.companyNumberEnc = res.encInputValue)
    };
    encryptionFields[encRef]?.();

    if (isAddCardPwkb && encKb === 'cardPwdEncKb' && res.encCardPwKb) {
      cardDetails.cardPwdEncKb = res.encCardPwKb;
    }
  };

  if (
    cardBinInfo.value.rspCd == '0000' &&
    $event.target &&
    ($event.target.id === 'cardNum1' || $event.target.id === 'cardNum2')
  ) {
    popupContent.value = '<p>카드번호를 수정하면 입력된 정보가 초기화됩니다.</p>';
    popupOk.value = async () => {
      resetInputInfo();
      const res = await appBridge.openEncKeypad(params);
      handleEncryptionResult(res);
      document.getElementById("cardNum1")?.focus();
    };
    cardGeneralPaymentInstallmentConfirmRef.value.open();
    return;
  }

  const res = await appBridge.openEncKeypad(params);
  handleEncryptionResult(res);
  keypadApplied.value = true;
  currentEncTarget.value = '';
  if (!res || res.response.code !== FlexResponseCode.OK) {
    if (inputRef) {
      inputRef.blur();
    }
  }
};

// 암호화 키패드 닫기 bridge
const closeKeypad = async () => {
  if (blurChangeFocusComanyNumber.value) {
    blurChangeFocusComanyNumber.value = false;
    return;
  }

  const appBridge = await getAppBridge();
  await appBridge.closeEncKeypad();
  keypadApplied.value = true;
  currentEncTarget.value = '';
};

// ios18 풀보안키패드 open 후 포커스가 옮겨가면서 blur처리 되는 현상이 있어서 접근성 비활성화 시에만 closeKeypad처리
const cardNumCloseKeypad = async () => {
  if (!accessState.value) closeKeypad();
};

// 암호화 키패드와 웹뷰 닫기 bridge
const closeKeypadAndWebView = async () => {
  const appBridge = await getAppBridge();
  await appBridge.closeEncKeypad();
  keypadApplied.value = true;
  await appBridge.closeWebView();
};

// 키패드 옵션 데이터
interface openEncKeypadOptionalRequest {
  inputMaxLength: number;
  inputMinLength: number;
  label: string;
  hint: string;
  maxAlert: string;
  minAlert: string;
}
type InputRefType =   
  | 'cardNumEnc1'
  | 'cardNumEnc2'
  | 'cardNumEnc3'
  | 'cardNumEnc4' 
  | 'cardPwdEnc' 
  | 'birthEnc'
  | 'companyNumberEnc';
const getKeypadOptionalData = (inputRef: InputRefType): openEncKeypadOptionalRequest => {
  const inputConfigurations: { [key in InputRefType]: openEncKeypadOptionalRequest } = {
    cardNumEnc1: {
      inputMinLength: 2,
      inputMaxLength: 4,
      label: '카드 번호 첫번째 영역의 네자리를 입력해 주세요.',
      hint: '카드 번호 네자리',
      minAlert: '최소 두자를 입력해주세요',
      maxAlert: '최대 네자를 입력해주세요'
    },
    cardNumEnc2: {
      inputMinLength: 2,
      inputMaxLength: 4,
      label: '카드 번호 두번째 영역의 네자리를 입력해 주세요.',
      hint: '카드 번호 네자리',
      minAlert: '최소 두자를 입력해주세요',
      maxAlert: '최대 네자를 입력해주세요'
    },
    cardNumEnc3: {
      inputMinLength: 2,
      inputMaxLength: 4,
      label: '카드 번호 세번째 영역의 네자리를 입력해 주세요.',
      hint: '카드 번호 네자리',
      minAlert: '최소 두자를 입력해주세요',
      maxAlert: '최대 네자를 입력해주세요'
    },
    cardNumEnc4: {
      inputMinLength: 2,
      inputMaxLength: 4,
      label: '카드 번호 네번째 영역의 네자리를 입력해 주세요.',
      hint: '카드 번호 네자리',
      minAlert: '최소 두자를 입력해주세요',
      maxAlert: '최대 네자를 입력해주세요'
    },
    cardPwdEnc: {
      inputMinLength: 2,
      inputMaxLength: 2,
      label: '카드 비밀번호 앞 두자리를 입력해 주세요.',
      hint: '카드 비밀번호 앞 두자리',
      minAlert: '최소 두자를 입력해주세요',
      maxAlert: '최대 두자를 입력해주세요'
    },
    birthEnc: {
      inputMinLength: 6,
      inputMaxLength: 6,
      label: '주민등록번호 앞자리를 입력해 주세요.',
      hint: '주민번호 앞 여섯자리',
      minAlert: '최소 여섯자를 입력해주세요',
      maxAlert: '최대 여섯자를 입력해주세요'
    },
    companyNumberEnc: {
      inputMinLength: 10,
      inputMaxLength: 10,
      label: '사업자등록번호 열자리를 입력해 주세요.',
      hint: '사업자등록번호 열자리',
      minAlert: '최소 열자를 입력해주세요',
      maxAlert: '최대 열자를 입력해주세요'
    }
  };

  const defaultConfig = {
    inputMaxLength: 0,
    inputMinLength: 0,
    label: '',
    hint: '',
    maxAlert: '',
    minAlert: ''
  };

  return { ...defaultConfig, ...(inputConfigurations[inputRef] || {}) };
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

// 카드 빈 체크
const cardBinCheck = async () => {
  if (cardDetails.cardNum1.length === 4 && cardDetails.cardNum2.length === 4) {
    const res = await paymentStore.requestInqrCardBinInfoASIS(`${cardDetails.cardNum1}${cardDetails.cardNum2}`);
    if (!res) return false;
    if (res && res.rspCd != '0000') {
      createErrorModal('', `${cardDetails.cardNum1}${cardDetails.cardNum2}는 등록할수 없는 카드번호입니다.`, () => {
        console.log(document.getElementById("cardNum1"));
        
        document.getElementById("cardNum1")?.focus();
      });
      cardDetails.cardNum1 = '';
      cardDetails.cardNumEnc1 = '';
      cardDetails.cardNum2 = '';
      cardDetails.cardNumEnc2;
      return false;
    }
  }
  return true;
};

// watch 카드번호 1, 2
// watch(
//   [() => cardDetails.cardNum1, () => cardDetails.cardNum2],
//   async () => {
//     if (cardDetails.cardNum1.length === 4 && cardDetails.cardNum2.length === 4) {
//       const res = await paymentStore.requestInqrCardBinInfoASIS(`${cardDetails.cardNum1}${cardDetails.cardNum2}`);
//       if (res && res.rspCd != '0000') {
//         createErrorModal('', `${cardDetails.cardNum1}${cardDetails.cardNum2}는 등록할수 없는 카드번호입니다.`);
//         cardDetails.cardNum1 = '';
//         cardDetails.cardNumEnc1 = '';
//         cardDetails.cardNum2 = '';
//         cardDetails.cardNumEnc2;
//       }
//     }
//   },
//   { deep: true }
// );

// watch 등록 조건 체크
watch(
  [() => cardDetails, corpCdYn, keypadApplied],

  () => btnState(),
  { deep: true }
);
// 하단 버튼 상태 변경
const btnDisabled = ref(true);
const btnState = () => {
  if (
    cardDetails.cardNum1.length > 3 &&
    cardDetails.cardNum2.length > 3 &&
    cardDetails.cardNum3.length > 3 &&
    cardDetails.cardNum4.length > 2 &&
    cardDetails.exdt?.length === 4 &&
    cardDetails.cardPwd &&
    ((!corpCdYn.value && cardDetails.birth?.length === 6) ||
      (corpCdYn.value && cardDetails.companyNumber?.length === 10)) &&
    keypadApplied.value
  ) {
    btnDisabled.value = false;
  } else {
    btnDisabled.value = true;
  }
};
</script>

<style lang="scss" scoped></style>
