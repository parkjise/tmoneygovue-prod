<template>
  <common-modal
    ref="modal01Ref"
    v-model="modal01"
    type="full"
    title="카드 등록"
    add-class="modal_card_regist"
    @close="close"
    :isBack="false"
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
                :aria-label="`카드번호 첫번째 영역의 ${cardDetails.cardNum1 ? cardDetails.cardNum1.length + '자리 입력됨':'네자리를 입력해주세요. 힌트'}`"
                placeholder="1234"
                :maxLength="4"
                :fixId="'cardNum1'"
                inputmode="none"
                @input="checkLengthAfterFocus($event, 4, cardNum1Ref, cardNum2Ref, cardDetails.cardNum2)"
                @focus="openKeypad(4, '', false, $event, 'cardNumEnc1', cardNum1Ref)"
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
                @focus="openKeypad(4, '', false, $event, 'cardNumEnc2', cardNum2Ref)"
                @blur="cardNumCloseKeypad"
                @focusin="lockScrollPosition"
              />
              <input type="hidden" id="cardNumEnc2" v-model="cardDetails.cardNumEnc2" />
              <span class="dash" aria-hidden="true">-</span>
              <uu-input
                type="password"
                ref="cardNum3Ref"
                v-model="cardDetails.cardNum3"
                inline
                hideLabel
                :aria-label="`카드번호 세번째 영역의 ${cardDetails.cardNum3 ? cardDetails.cardNum3.length + '자리 입력됨':'네자리를 입력해주세요. 힌트'}`"
                placeholder="1234"
                :maxLength="4"
                :fixId="'cardNum3'"
                inputmode="none"
                @input="checkLengthAfterFocus($event, 4, cardNum3Ref, cardNum4Ref, cardDetails.cardNum4)"
                @focus="openKeypad(4, '', false, $event, 'cardNumEnc3', cardNum3Ref)"
                @blur="cardNumCloseKeypad"
                @focusin="lockScrollPosition"
              />
              <input type="hidden" id="cardNumEnc3" v-model="cardDetails.cardNumEnc3" />
              <span class="dash" aria-hidden="true">-</span>
              <uu-input
                type="password"
                ref="cardNum4Ref"
                v-model="cardDetails.cardNum4"
                inline
                hideLabel
                :aria-label="`카드번호 네번째 영역의 ${cardDetails.cardNum4 ? cardDetails.cardNum4.length + '자리 입력됨':'네자리를 입력해주세요. 힌트'}`"
                placeholder="1234"
                :maxLength="4"
                :fixId="'cardNum4'"
                inputmode="none"
                @focus="openKeypad(4, 'F', false, $event, 'cardNumEnc4', cardNum4Ref)"
                @focusin="lockScrollPosition"
              />
              <input type="hidden" id="cardNumEnc4" v-model="cardDetails.cardNumEnc4" />
            </div>
            <div class="flex_area">
              <uu-checkbox v-model="corpCdYn" :label="'법인공용카드'" aria-label="'법인공용카드'" @change="changeCorpCdYn"/>
              <uu-button btn-style="none" @click="scanOCR">
                <uu-ic size="16" name="camera" />
                카드스캔하기
              </uu-button>
            </div>
          </div>
          <div class="card card_info">
            <uu-input
              ref="exdtRef"
              type="text"
              v-model="cardDetails.exdt"
              inputmode="numeric"
              label="카드 유효기간 (MMYY)"
              placeholder="MMYY"
              :aria-label="'카드유효기간 월,연도를 M M Y Y 포맷으로 입력해주세요'"
              :max-length="4"
              @input="checkExDtCheck($event)"
              @focus="restoreScrollPosition"
              @blur="closeKeypad"
              @focusin="lockScrollPosition"
            />
            <uu-input
              type="password"
              ref="cvcRef"
              :fixId="'cvc'"
              v-model="cardDetails.cvc"
              label="CVC 번호"
              :aria-label="'CVC 번호 카드 뒤 세~네자리를 입력해주세요'"
              placeholder="카드 뒤 3~4자리"
              :max-length="4"
              inputmode="none"
              @input="checkLengthAfterFocus($event, 4, cvcRef, cardPwdRef, cardDetails.cardPwd, 3)"
              @focus="openKeypad(4, 'F', false, $event, 'cvcEnc', cvcRef)"
              @focusin="lockScrollPosition"
            />
            <input type="hidden" id="cvcEnc" v-model="cardDetails.cvcEnc" />
          </div>
          <div class="card card_password">
            <uu-input
              type="password"
              ref="cardPwdRef"
              :fixId="'cardPwd'"
              v-model="cardDetails.cardPwd"
              label="카드 비밀번호"
              :aria-label="'카드 비밀번호 앞 두자리를 입력해주세요'"
              placeholder="앞 2자리"
              :max-length="2"
              inputmode="none"
              @input="
                checkLengthAfterFocus(
                  $event,
                  2,
                  cardPwdRef,
                  corpCdYn ? companyNumber1Ref : birthRef,
                  corpCdYn ? companyNumber1 : cardDetails.birth
                )
              "
              @focus="openKeypad(2, 'F', true, $event, 'cardPwdEnc', cardPwdRef, 'cardPwdEncKb')"
              @focusin="lockScrollPosition"
            />
            <input type="hidden" id="cardPwdEnc" v-model="cardDetails.cardPwdEnc" />
            <input type="hidden" id="cardPwdEncKb" v-model="cardDetails.cardPwdEncKb" />
          </div>
          <div class="card card_resident_num" v-show="!corpCdYn">
            <p class="label">주민등록번호 앞 7자리 (YYMMDD)</p>
            <div class="inline_form_wrap">
              <uu-input
                ref="birthRef"
                :fixId="'birth'"
                v-model="cardDetails.birth"
                inline
                hide-label
                label="생년월일"
                :aria-label="'생년월일 앞여섯자리를 입력해주세요'"
                placeholder="생년월일"
                :max-length="6"
                class="first"
                inputmode="none"
                @input="checkLengthAfterFocus($event, 6, birthRef, genderRef, cardDetails.gender)"
                @focus="openKeypad(6, 'F', false, $event, 'birthEnc', birthRef)"
                @focusin="lockScrollPosition"
              />
              <input type="hidden" id="birthEnc" v-model="cardDetails.birthEnc" />
              <span class="dash" aria-hidden="true">-</span>
              <uu-input
                ref="genderRef"
                v-model="cardDetails.gender"
                :fixId="'gender'"
                inline
                hide-label
                placeholder="0"
                :aria-label="'주민등록번호 뒤 첫번째를 입력해주세요'"
                :max-length="1"
                class="last"
                type="text"
                inputmode="numeric"
                @focus="restoreScrollPosition"
                @focusin="lockScrollPosition"
              />
              <div class="resident_mark">
                <p v-for="item in 6" :key="item" />
                <!-- <span class="sr_only" :tabindex="-1">주민등록번호 {{ item + 1 }}번째 자리</span>
                </p> -->
              </div>
            </div>
          </div>
          <div class="card card_company" v-show="corpCdYn">
            <p class="label">사업자 등록 번호</p>
            <div class="inline_form_wrap" :aria-label="`사업자 등록 번호 열자리를 입력해주세요.`" @click="openKeypad(10, '', false, 'companyNumber', 'companyNumberEnc')">
              <uu-input
                ref="companyNumber1Ref"
                inline
                hide-label
                :aria-label="`사업자 등록 번호 첫번째 영역 ${companyNumber1 ? companyNumber1 + '자리 입력됨':'입력해주세요. 힌트'}`"
                placeholder="123"
                v-model="companyNumber1"
                :maxLength="3"
                inputmode="none"
                @blur="closeKeypad"
                @focusin="lockScrollPosition"
              />
              <uu-input
                ref="companyNumber2Ref"
                inline
                hide-label
                :aria-label="`사업자 등록 번호 두번째 영역 ${companyNumber2 ? companyNumber2 + '자리 입력됨':'입력해주세요. 힌트'}`"
                placeholder="12"
                v-model="companyNumber2"
                :maxLength="2"
                inputmode="none"
                @blur="closeKeypad"
                @focusin="lockScrollPosition"
              />
              <uu-input
                ref="companyNumber3Ref"
                inline
                hide-label
                :aria-label="`사업자 등록 번호 세번째 영역 ${companyNumber3 ? companyNumber3 + '자리 입력됨':'입력해주세요. 힌트'}`"
                placeholder="12345"
                v-model="companyNumber3"
                :maxLength="5"
                inputmode="none"
                @blur="closeKeypad"
                @focusin="lockScrollPosition"
              />
              <input ref="companuNumberRef" type="hidden" v-model="cardDetails.companyNumber" id="companyNumber" />
              <input type="hidden" v-model="cardDetails.companyNumberEnc" id="companyNumberEnc" />
            </div>
            <p class="desc">기명 법인카드의 경우 카드 종류를 개인카드로 선택해주세요.</p>
          </div>
          <div class="card card_nickname">
            <uu-input v-model="cardDetails.nickName" label="카드 별명 (선택)" placeholder="7자 이하" :max-length="7" />
          </div>
          <div class="card_checkbox">
            <div class="flex_area" v-for="agreeInfo in stplList" :key="agreeInfo.stplSno">
              <uu-checkbox v-model="agreeInfo.stplCheck" :aria-label="agreeInfo.stplTtlNm">
                {{ agreeInfo.stplTtlNm }}
              </uu-checkbox>
              <uu-button
                :label="`${agreeInfo.stplTtlNm}`"
                @click="goHistoryPage(agreeInfo)"
                :aria-label="`${agreeInfo.stplTtlNm} 상세 내용 보기, 링크`"
              >
                <uu-ic size="16" name="arrow_right_gray" />
              </uu-button>
            </div>
          </div>
          <div class="card_ticket_notice">
            <uu-ic size="16" name="exclamation" />
            <p aria-label="카드번호, 유효기간 M M Y Y, 생년월일 Y Y M M D D 을 확인해 주십시오.">카드번호, 유효기간(MMYY), 생년월일(YYMMDD)을 확인해 주십시오.</p>
          </div>
        </form>
      </round-box>
    </template>
    <template #modal_footer>
      <uu-button btn-color="primary" size="xl" label="등록하기" @click="regist" :disabled="btnDisabled" />
    </template>
  </common-modal>
  <ConfirmPopup :popupContent="popupContent" ref="confirmPopup" @ok="popupOk" />
  <!-- 등록 프로모션 바텀시트 -->
  <traffic-terms-bottom :isShowBottomSheet="isShowTypeBottomSheet" @ok="registTrafficCard" @close="closeTrafficCard" />
  <!-- 교통카드 등록 성공 팝업 -->
  <regist-success-popup :isShow="successPopup" @ok="closeTrafficCardSuccess" />
</template>

<script setup lang="ts">
import CommonModal from '@/views/common/components/CommonModal.vue';
import { getAppBridge } from '@/utils';
import { ref, watch, computed, reactive, onMounted, nextTick, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import ConfirmPopup from '@/views/payment-mng/components/ConfirmPopup.vue';
import type { StplAgreeInfo } from '@/service/terms/model/termsModel';
import { useMessageModal } from '@/composables/useMessageModal';
import { cardSmpcPymRgt } from '@/service/payment/api/smpcPaymentApi';
import { useOrderStore } from '@/service/order/orderModule';
import { usePaymentManageStore } from '@/service/payment/paymentManageModule';
import type { openEncKeypadRequest, openEncKeypadResponse } from '@/utils/hybrid/etc/etc.type';
import { AdbrixEvtId, FlexResponseCode } from '@/utils/hybrid/type';
import type { AppSmpcCardRegRequest } from '@/utils/hybrid/payment/payment.type';
import { debounce } from 'lodash-es';
import type { CardDetailRegistInfo } from '@/service/payment/model/paymentModel';
import { usePaymentStore } from '@/service/payment/paymentModule';
import TrafficTermsBottom from '@/views/regist-traffic-card/components/TrafficTermsBottom.vue';
import RegistSuccessPopup from '@/views/regist-traffic-card/components/RegistSuccessPopup.vue';
import { useRegistTrafficCardStore } from '@/service/regist-traffic-card/registTrafficCardModule';
import { storeToRefs } from 'pinia';
import { sendAdbrix } from '@/utils/sendAdbrixUtil';
import { checkAppVersion } from '@/utils/validateUtil';
import { useAuthStore } from '@/service/auth/authModule';

// 스크롤 관련 핸들링
const scrollTop = ref(0);
const lockScrollPosition = () => {
  scrollTop.value = window.scrollY;
};
const restoreScrollPosition = () => {
  window.scrollTo(0, scrollTop.value);
};

// modal 오픈용
const modal01 = ref(true);
const modal01Ref = ref();
// 약관, 결제수단 재조회
const paymentManagementStore = usePaymentManageStore();
const orderStore = useOrderStore();
const isShowTypeBottomSheet = ref(false); // 교통카드 등록 약관동의 바텀시트
const successPopup = ref(false); // 교통카드 등록 성공 팝업
const registTrafficCardStore = useRegistTrafficCardStore();
const { getRegistTmoneyCardInfo } = storeToRefs(registTrafficCardStore);

onMounted(() => {
  // visibilityState blur 이벤트리스너 추가. 앱이 닫히고 다시 열릴때 키패드가 열리는 현상 대응
  addVisibilityChangeListener();

  // 카드정보 초기화
  initCardBinInfo();

  resetInputInfo();

  // 진입 하자마자 ocr 호출
  scanOCR();
});

onBeforeUnmount(() => {
  // visibilityState blur 이벤트리스너 제거
  removeVisibilityChangeListener();
});

const router = useRouter();
const close = async () => {
  const appBridge = await getAppBridge();
  await appBridge.closeEncKeypad();

  // TODO 여행분리에 따른 수정. repository를 분리하게 되면 불필요소스
  const webBase = import.meta.env.VITE_AXIOS_BASE_TARGET || 'TMONEY2';
  if (webBase === 'TRAVEL') {
    const appBridge = await getAppBridge();
    appBridge.closeWebView();
  } else {
    router.back();
  }
};

// confirm용 value 설정
const confirmPopup = ref();
const popupContent = ref();
const popupOk = ref();

// 메시지용
const { createErrorModal, createSuccessModal } = useMessageModal();

// 카드정보 관련
const imgUrl = import.meta.env.VITE_IMG_URL;

const cardDetails: CardDetailRegistInfo = reactive({
  cardNum1: '',
  cardNum2: '',
  cardNum3: '',
  cardNum4: '',
  cardNumEnc1: '',
  cardNumEnc2: '',
  cardNumEnc3: '',
  cardNumEnc4: '',
  exdt: '',
  cvc: '',
  cvcEnc: '',
  cardPwd: '',
  cardPwdEnc: '',
  cardPwdEncKb: '',
  birth: '',
  birthEnc: '',
  companyNumber: '',
  companyNumberEnc: '',
  gender: '',
  nickName: ''
});

const cardNum1Ref = ref<HTMLInputElement | null>(null);
const cardNum2Ref = ref<HTMLInputElement | null>(null);
const cardNum3Ref = ref<HTMLInputElement | null>(null);
const cardNum4Ref = ref<HTMLInputElement | null>(null);
const corpCdYn = ref(false); // 법인카드 여부
const exdtRef = ref<HTMLInputElement | null>(null);
const cvcRef = ref<HTMLInputElement | null>(null);
const cardPwdRef = ref<HTMLInputElement | null>(null);
const birthRef = ref<HTMLInputElement | null>(null);
const companyNumber1Ref = ref<HTMLInputElement | null>(null);
const companyNumber2Ref = ref<HTMLInputElement | null>(null);
const companyNumber3Ref = ref<HTMLInputElement | null>(null);
const genderRef = ref<HTMLInputElement | null>(null);
let stplList = reactive<StplAgreeInfo[]>([]); // 약관 리스트

const btnDisabled = ref(true);

// 카드 bin정보
const paymentStore = usePaymentStore();
const initCardBinInfo = () => {
  paymentStore.initCardBinInfo();
};
const cardBinInfo = computed(() => paymentStore.cardBinInfo);

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
  cardDetails.cvc = '';
  cardDetails.cvcEnc = '';
  cardDetails.cardPwd = '';
  cardDetails.cardPwdEnc = '';
  cardDetails.cardPwdEncKb = '';
  cardDetails.birth = '';
  cardDetails.birthEnc = '';
  cardDetails.companyNumber = '';
  cardDetails.companyNumberEnc = '';
};

const resetInputInfo = async () => {
  resetCardInfo();
  // 약관 리스트 동의 여부 조회, 반응성을 위하여 splice
  const newList = await paymentManagementStore.requestAutoPaymentAgreeList('A');
  stplList.splice(0, stplList.length, ...newList);
};

// 카드 등록
const regist = async () => {
  // API카드 등록용 Param
  const param = {
    brdt: corpCdYn.value ? "" : cardDetails.birthEnc,
    // carCod: cardBinInfo.value.crcmCd,
    carCod: getCardCode(cardBinInfo.value.crpcId),
    cardAliasName: cardDetails.nickName,
    cardNo1: cardDetails.cardNumEnc1,
    cardNo2: cardDetails.cardNumEnc2,
    cardNo3: cardDetails.cardNumEnc3,
    cardNo4: cardDetails.cardNumEnc4,
    cardPw: cardDetails.cardPwdEnc,
    cardPwKB: cardDetails.cardPwdEncKb,
    crpcId: cardBinInfo.value.crpcId,
    cvv: cardDetails.cvcEnc,
    encVer: '3',
    exdt: cardDetails.exdt,
    issuerCd: cardBinInfo.value.issurCd,
    krn: cardDetails.gender,
    brn: corpCdYn.value ? cardDetails.companyNumberEnc : "", 
    stplList: stplList.map((item) => {
      return {
        stplSno: item.stplSno,
        stplAgrmYn: item.stplCheck ? 'Y' : 'N'
      };
    })
  };
  // AppDatabase 등록용 Param
  const appParam: AppSmpcCardRegRequest = {
    cardSecData1: cardDetails.cardNumEnc1,
    cardSecData2: cardDetails.cardNumEnc2,
    cardSecData3: cardDetails.cardNumEnc3,
    cardSecData4: cardDetails.cardNumEnc4,
    cardSecBirth: corpCdYn.value ? cardDetails.companyNumberEnc : cardDetails.birthEnc,
    cardSecLen1: cardDetails.cardNum1.length.toString(),
    cardSecLen2: cardDetails.cardNum2.length.toString(),
    cardSecLen3: cardDetails.cardNum3.length.toString(),
    cardSecLen4: cardDetails.cardNum4.length.toString(),
    cardSecLenBirth: corpCdYn.value ? cardDetails.companyNumber.length.toString() : cardDetails.birth.length.toString(),
    cardName: cardBinInfo.value.cardName,
    validity: cardDetails.exdt,
    paymentSystem: 'Y',
    cardCode: cardBinInfo.value.crpcId,
    cardKinds: corpCdYn.value,
    companyNumber: cardDetails.companyNumberEnc,
    nickName: cardDetails.nickName,
    path1: cardBinInfo.value.cardImgPath,
    path2: cardBinInfo.value.path2
  };

  // api 등록
  const res = await cardSmpcPymRgt(param).catch(() => {
    return {
      fnlScsYn: 'N',
      fnlRstMsg: '카드등록 통신에러',
      hspdResultStatus: 'N',
      trcrRgtYn : null
    };
  });

  if (!res || res.fnlScsYn === 'N') {
    createErrorModal('카드 정보가 잘못 입력되었습니다.', res?.fnlRstMsg || '카드등록에 실패했습니다');
    return;
  }

  if (res.hspdResultStatus === 'Y') {
    //사전결제 승인여부 res에서 받아서 등록
    appParam.paymentSystem = res.hspdResultStatus || 'N';
    // AppDatabase 등록
    const appBridge = await getAppBridge();
    await appBridge.registCard(appParam);
  }
  // 사용자별 결제수단재조회
  paymentManagementStore.requestPaymentManagement();
  orderStore.requestPaymentManagement();

  const { authInfo } = storeToRefs(useAuthStore());
  const minVersion = '2.4.5'; // 앱 최소버전
  const checkVersion = checkAppVersion(minVersion, authInfo.value.appVer);
  if (!checkVersion) {
    // 앱버전 ~ 2.4.5
    createSuccessModal('', res?.fnlRstMsg || '카드등록에 성공했습니다', () => close());
  } else {
    // 앱버전 2.4.5 이상
    createSuccessModal('', res?.fnlRstMsg || '카드등록에 성공했습니다', () => {
      if(res.trcrRgtYn && res.trcrRgtYn == 'Y'){
        close(); //이미 교통카드로 등록되어 있다면 close
      }else{
        isShowTypeBottomSheet.value= true;
      }
    });
  }
};

//교통카드 등록
const registTrafficCard = async () => {
  isShowTypeBottomSheet.value = false;

  const body = {
    trcrDvsCd: "2", // 선불:1, 후불:2
    crcmCd: cardBinInfo.value.crcmCd,
    trcrNo1: cardDetails.cardNumEnc1,
    trcrNo2: cardDetails.cardNumEnc2,
    trcrNo3: cardDetails.cardNumEnc3,
    trcrNo4: cardDetails.cardNumEnc4,
    encType: 'MTK', // 암호화 타입(교통카드 등록 : STK, 카드간편결제등록: 'MTK')
    reqEncYn: 'Y'
  };
  const res = await registTrafficCardStore.requestRegisterTmoneyCardNo(body);
  if (res.scsYn === 'Y') {// 카드등록 성공
    successPopup.value = true; // 카드등록 성공 팝업 open
    sendAdbrix(AdbrixEvtId.rCredit);
  } else {
    // 카드등록실패
    createErrorModal('알림', `${getRegistTmoneyCardInfo.value.msg}`, () => {});
    close();
  }
};

//교통카드 등록성공팝업 닫기
const closeTrafficCardSuccess = async () => {
  successPopup.value = false
  close();
};

//교통카드 등록팝업 닫기
const closeTrafficCard = async () => {
  isShowTypeBottomSheet.value = false;
  close();
};

// 카드유효기간 number타입 아닌 문자열 복사/붙이기 방지
const checkExDtCheck = (e: InputEvent) => {
  if (Number.isNaN(Number(cardDetails.exdt))) {
    nextTick(() => {
      cardDetails.exdt = '';
    });
    return;
  }
  checkLengthAfterFocus(e, 4, exdtRef.value, cvcRef.value, cardDetails.cvc);
};
// input event
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

const changeCorpCdYn = () => {
  if(corpCdYn.value) {
    cardDetails.birth = '';
    cardDetails.birthEnc = '';
    cardDetails.gender = '';
  } else {
    cardDetails.companyNumberEnc = '';
    cardDetails.companyNumber = '';
  }
};

// OCR 브릿지 호출
const scanOCR = async () => {
  const appBridge = await getAppBridge();
  const resOCR = await appBridge.readOCR();
  if (resOCR && resOCR.response.code === FlexResponseCode.OK) {
    cardDetails.cardNum1 = resOCR.cardNum1;
    cardDetails.cardNum2 = resOCR.cardNum2;
    cardDetails.cardNum3 = resOCR.cardNum3;
    cardDetails.cardNum4 = resOCR.cardNum4;
    cardDetails.cardNumEnc1 = resOCR.encCardNum1;
    cardDetails.cardNumEnc2 = resOCR.encCardNum2;
    cardDetails.cardNumEnc3 = resOCR.encCardNum3;
    cardDetails.cardNumEnc4 = resOCR.encCardNum4;
    await cardBinCheck();
    if (resOCR.exdt === '' || Number.isNaN(Number(resOCR.exdt.replaceAll(/\//g, '')))) resOCR.exdt = '';
    cardDetails.exdt = resOCR.exdt;
  }
};

const keypadApplyed = ref(true);
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
    | 'cvcEnc'
    | 'cardPwdEnc'
    | 'birthEnc'
    | 'companyNumberEnc',
  inputRef?: any,
  encKb?: 'cardPwdEncKb'
) => {
  restoreScrollPosition();
  const appBridge = await getAppBridge();
  const id = typeof $event === 'string' ? $event : $event.target.id;
  // input 초기화(키패드 재호출시에 기존 값을 지우기 위함)
  if (typeof id === 'string' && id in cardDetails) {
    cardDetails[id as keyof CardDetailRegistInfo] = '';
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

  let params: openEncKeypadRequest = {
    inputMaxLength: maxLength,
    keypadType: type,
    isAddCardPwKb: isAddCardPwkb,
    inputFieldId: id
  };

  if (
    (accessState.value && (encRef === 'cardNumEnc1' || encRef === 'cardNumEnc2' || encRef === 'cardNumEnc3')) ||
    encRef === 'cardNumEnc4' ||
    encRef === 'cvcEnc' ||
    encRef === 'cardPwdEnc' ||
    encRef === 'birthEnc' ||
    encRef === 'companyNumberEnc'
  ) {
    params = {
      ...params,
      ...getKeypadOptionalData(encRef)
    };
  }

  // if (encRef === 'cardNumEnc4' || encRef === 'cvcEnc' || encRef === 'cardPwdEnc' || encRef === 'birthEnc') {
  //   params = {
  //     ...params,
  //     ...getKeypadOptionalData(encRef)
  //   };
  // }
  const handleEncryptionResult = async (res: openEncKeypadResponse) => {
    if (!res) return;
    const encryptionFields = {
      cardNumEnc1: () => (cardDetails.cardNumEnc1 = res.encInputValue),
      cardNumEnc2: () => (cardDetails.cardNumEnc2 = res.encInputValue),
      cardNumEnc3: () => (cardDetails.cardNumEnc3 = res.encInputValue),
      cardNumEnc4: () => (cardDetails.cardNumEnc4 = res.encInputValue),
      cardPwdEnc: () => (cardDetails.cardPwdEnc = res.encInputValue),
      cvcEnc: () => (cardDetails.cvcEnc = res.encInputValue),
      birthEnc: () => (cardDetails.birthEnc = res.encInputValue),
      companyNumberEnc: () => (cardDetails.companyNumberEnc = res.encInputValue)
    };
    encryptionFields[encRef]?.();

    if (isAddCardPwkb && encKb === 'cardPwdEncKb' && res.encCardPwKb) {
      cardDetails.cardPwdEncKb = res.encCardPwKb;
    }
  };

  if (cardBinInfo.value.cardName && $event && (id === 'cardNum1' || id === 'cardNum2')) {
    popupContent.value = '<p>카드번호를 수정하면 입력된 정보가 초기화됩니다.</p>';
    popupOk.value = async () => {
      initCardBinInfo();
      resetCardInfo();
      keypadApplyed.value = false;
      const res = await appBridge.openEncKeypad(params);

      handleEncryptionResult(res);
      keypadApplyed.value = true;

      document.getElementById("cardNum1")?.focus();
    };
    confirmPopup.value.open();
    return;
  }
  keypadApplyed.value = false;
  const res = await appBridge.openEncKeypad(params);
  handleEncryptionResult(res);
  keypadApplyed.value = true;
  currentEncTarget.value = '';
  if (!res || res.response.code !== FlexResponseCode.OK) {
    if (inputRef) {
      inputRef.blur();
    }
  }
};

// 암호화 키보드 닫기
const closeKeypad = async () => {
  if (blurChangeFocusCompanyNumber.value) {
    blurChangeFocusCompanyNumber.value = false;
    return;
  }

  const appBridge = await getAppBridge();
  await appBridge.closeEncKeypad();
  keypadApplyed.value = true;
  currentEncTarget.value = '';
};

// ios18 풀보안키패드 open 후 포커스가 옮겨가면서 blur처리 되는 현상이 있어서 접근성 비활성화 시에만 closeKeypad처리
const cardNumCloseKeypad = async () => {
  if (!accessState.value) closeKeypad();
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
  | 'cvcEnc'
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
    cvcEnc: {
      inputMinLength: 3,
      inputMaxLength: 3,
      label: 'CVC번호를 입력해 주세요.',
      hint: '카드 뒷면 세자리',
      minAlert: '최소 세자를 입력해주세요',
      maxAlert: '최대 세자를 입력해주세요'
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
      hint: '주민번호 앞 6자리',
      minAlert: '최소 6자를 입력해주세요',
      maxAlert: '최대 6자를 입력해주세요'
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

// watch(
//   [() => cardDetails.cardNum1, () => cardDetails.cardNum2],
//   async () => {
//     if (cardDetails.cardNum1.length === 4 && cardDetails.cardNum2.length === 4) {
//       const res = await paymentStore.requestInqrCardBinInfo(`${cardDetails.cardNum1}${cardDetails.cardNum2}`);
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

// 이용약관 전체 체크
const getStplListCanAgree = computed(() => {
  if (!Array.isArray(stplList) || stplList.length === 0) {
    return false;
  }
  return stplList
    .filter((item: StplAgreeInfo) => item.stplMndtYn === 'Y')
    .every((item: StplAgreeInfo) => item.stplCheck === true);
});

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

// 포커스 변경을 관리하기 위한 ref 생성
const blurChangeFocusCompanyNumber = ref(false);
// companyNumber의 변경 사항을 감지하고 포커스를 관리하는 watch 함수
watch(
  () => cardDetails.companyNumber,
  async () => {
    if (cardDetails.companyNumber.length === 3) {
      await nextTick();
      blurChangeFocusCompanyNumber.value = true;
      if (companyNumber2Ref.value) {
        companyNumber2Ref.value.focus();
      }
    }
    if (cardDetails.companyNumber.length === 5) {
      await nextTick();
      blurChangeFocusCompanyNumber.value = true;
      if (companyNumber3Ref.value) {
        companyNumber3Ref.value.focus();
      }
    }
  }
);

// watch 등록 조건 체크
watch([cardDetails, corpCdYn, getStplListCanAgree, keypadApplyed], () => btnState(), { deep: true });
// 하단 버튼 상태 변경
const btnState = () => {
  if (
    cardDetails.cardNum1.length > 3 &&
    cardDetails.cardNum2.length > 3 &&
    cardDetails.cardNum3.length > 3 &&
    cardDetails.cardNum4.length > 2 &&
    cardDetails.exdt.length === 4 &&
    cardDetails.cvc.length >= 3 &&
    cardDetails.cvc.length <= 4 &&
    cardDetails.cardPwd &&
    ((!corpCdYn.value && cardDetails.birth.length === 6 && cardDetails.gender.length === 1) ||
      (corpCdYn.value && cardDetails.companyNumber.length === 10)) &&
    getStplListCanAgree.value &&
    keypadApplyed.value
  ) {
    btnDisabled.value = false;
  } else {
    btnDisabled.value = true;
  }
};

// 약관상세 선택시
const url = `${import.meta.env.VITE_TMONEY_URL}/webview/mbrs/stpl/v2/`;
const goHistoryPage = async (agreeInfo: StplAgreeInfo) => {
  const appBridge = await getAppBridge();
  let urlPath = '';
  if (agreeInfo.extlUrl !== undefined && agreeInfo.extlUrl !== null && agreeInfo.extlUrl !== '') {
    urlPath = agreeInfo.extlUrl;
  } else if (agreeInfo.stplUrl?.startsWith('http')) {
    urlPath = agreeInfo.stplUrl;
  } else {
    urlPath = `${url}${agreeInfo.stplSno}.do`;
  }
  if (urlPath !== '') {
    await appBridge.openView({
      url: urlPath,
      viewType: 'in',
      headerTitle: agreeInfo.stplTtlNm
    });
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

const getCardCode = (crpcId: string) => {
  switch (crpcId) {
    /// 우리카드
    case '41':
      return '12';
    /// 새마을카드
    case '45':
      return '85';
    /// 신협
    case '48':
      return '13';
    /// 우체국
    case '71':
      return '90';
    /// BC카드
    case '361':
      return '02';
    /// 광주카드
    case '364':
      return '10';
    /// 삼성카드
    case '365':
      return '03';
    /// 신한카드
    case '366':
      return '04';
    /// 현대카드
    case '367':
      return '07';
    /// 롯데카드
    case '368':
      return '06';
    /// 수협카드
    case '369':
      return '80';
    /// 시티카드
    case '370':
      return '09';
    /// NH카드
    case '371':
      return '01';
    /// 전북카드
    case '372':
      return '05';
    /// 하나SK카드
    case '374':
      return '60';
    /// KB국민카드
    case '381':
      return '08';
    default:
      return '';
  }
};
</script>
