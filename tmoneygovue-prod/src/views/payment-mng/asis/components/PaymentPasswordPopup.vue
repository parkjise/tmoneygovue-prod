<!-- 
  결제 비밀번호 입력
  pubPath: tmoney/Spa/DET/DET069.vue
  @author inu.jeong
 -->
 <template>
  <common-modal
    ref="modal01Ref"
    v-model="modal01"
    type="full"
    hide-overlay
    hide-title
    :title="inputTextInfos.title"
    hide-footer
    @close="close"
    :isBack="false"
  >
    <template #modal_body>
      <div class="payment_password" v-show="!checkView">
        <h4 ref="infoTextRef" :aria-live="checkTextInfos.ariaLive as 'polite' || 'polite'">{{ inputTextInfos.title }}</h4>
        <div class="text" :class="inputTextInfos.class" :aria-live="checkTextInfos.ariaLive as 'polite' || 'polite'">
          <p v-html="santizedHtml(inputTextInfos.infoText)"></p>
        </div>
        <div class="password_mark" @click="passwordRef.focus">
          <uu-input
            ref="passwordRef"
            :fixId="'password'"
            inputmode="none"
            v-model="password"
            hide-label
            label="결제 비밀번호"
            type="password"
            :max-length="6"
            placeholder=""
            class="sr_only"
          />
          <input type="hidden" v-model="passwordEnc" />
          <div class="dots">
            <span v-for="num in 6" :key="num" class="dot" />
            <div class="dots_full">
              <span v-for="item in password" :key="item" class="dot full">
                <span class="sr_only">{{ item }}</span>
              </span>
            </div>
          </div>
        </div>
        <uu-button
          label="비밀번호를 잊어버리셨나요?"
          btn-style="text"
          class="btn_forget_password"
          @click="callAuth"
          v-if="initType !== 'first-input' && checkCnt > 0"
          >{{ t('paymentMng.det_036_001_003') }}</uu-button
        >
        <template v-if="isPay">
          <p class="skip_password_txt">매번 비밀번호를 입력하기 번거로우신가요?</p>
          <uu-checkbox class="skip_password" label="다음부터 입력하지 않기" v-model="isSkip" />
        </template>
      </div>
      <div class="payment_password" v-show="checkView">
        <h4 ref="infoTextRef" :aria-live="checkTextInfos.ariaLive as 'polite' || 'polite'">{{ checkTextInfos.title }}</h4>
        <div class="text" :class="checkTextInfos.class" :aria-live="checkTextInfos.ariaLive as 'polite' || 'polite'">
          <p>{{ checkTextInfos.infoText }}</p>
        </div>
        <div class="password_mark">
          <uu-input
            ref="passwordCheckRef"
            :fixId="'passwordCheck'"
            v-model="passwordCheck"
            hide-label
            label="결제 비밀번호"
            type="password"
            :max-length="6"
            placeholder=""
            class="sr_only"
            inputmode="none"
          />
          <input type="hidden" v-model="passwordCheckEnc" />
          <div class="dots">
            <span v-for="num in 6" :key="num" class="dot" />
            <div class="dots_full">
              <span v-for="item in passwordCheck" :key="item" class="dot full">
                <span class="sr_only">{{ item }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import CommonModal from '@/views/common/components/CommonModal.vue';
import { computed, nextTick, onBeforeUnmount, onMounted, onUnmounted, ref, watch } from 'vue';
import {
  inqrPymStatusInfo,
  reqPymPwdAuthInfo,
  reqPymPwdCfrm,
  reqPymPwdLockInfo,
  reqPymPwdRgtInfo,
  reqPymPwdUseYnInfo
} from '@/service/payment/api/paymentApi';
import { usePaymentManageStore } from '@/service/payment/paymentManageModule';
import { getAppBridge } from '@/utils';
import type { openEncKeypadRequest } from '@/utils/hybrid/etc/etc.type';
import { useMessageModal } from '@/composables/useMessageModal';
import { VerifyType } from '@/utils/hybrid/etc/etc.type';
import { storeToRefs } from 'pinia';
import type { RequestPaymentPassword } from '@/service/payment/model/requestModel';
import { FlexResponseCode } from '@/utils/hybrid/type';
import { santizedHtml } from '@/utils';
import { useI18n } from '@/composables/useI18n';
import { useAuthStore } from '@/service/auth/authModule';
const { getAuthInfo } = storeToRefs(useAuthStore());

const { t } = useI18n();

// 모달 오픈
const { createErrorModal } = useMessageModal();

onMounted(async () => {
  // visibilityState blur 이벤트리스너 추가. 앱이 닫히고 다시 열릴때 키패드가 열리는 현상 대응
  addVisibilityChangeListener();
});

onBeforeUnmount(() => {
  // visibilityState blur 이벤트리스너 제거
  removeVisibilityChangeListener();
});

// 결제비밀번호관련
const paymentManagementStore = usePaymentManageStore();
const { paymentStatusInfo } = storeToRefs(paymentManagementStore);

const modal01Ref = ref();
const modal01 = ref<boolean>(false);
const checkView = ref(false);
const props = defineProps({
  initType: {
    type: String
  }
});
const initType = ref(props.initType ?? '');
// input일 경우
const passwordRef = ref();
const password = ref('');
const passwordEnc = ref('');
// 타이틀 및 입력정보
let inputTextInfos = ref({
  title: t('paymentMng.det_034_001_001'), // 결제 비밀번호 입력
  infoText: '비밀번호 6자리를 입력해주세요',
  class: '',
  ariaLive: "polite",
});
// 비밀번호 검증 횟수( 5회될시 잠금처리 )
const checkCnt = ref(0);
// 결제요청시 비밀번호 재입력 요청 제어
// 비밀번호 초기 입력, 변경이 아닌 경우
const isSkip = ref(false);
const isPay = computed(() => {
  return initType.value !== 'first-input' && initType.value !== 'change-input';
});


// check일 경우
const passwordCheckRef = ref();
const passwordCheck = ref('');
const passwordCheckEnc = ref('');
let checkTextInfos = ref({
  title: t('paymentMng.det_035_001_001'), // 결제 비밀번호 다시 입력
  infoText: t('paymentMng.det_034_001_002'), // 결제시 사용할 비밀번호를 입력해주세요
  class: '',
  ariaLive: "polite",
});

const updateMessage = (newTitle: string, newInfoText: string, newClass = "info", ariaLive = "polite") => {
  checkTextInfos.value.title = newTitle;
  checkTextInfos.value.infoText = newInfoText;
  checkTextInfos.value.class = newClass;
  checkTextInfos.value.ariaLive = ariaLive;
};

const open = async () => {
  // 열자마자 체크적용, 잠금일 경우 본인인증 연결
  const res = await inqrPymStatusInfo();
  if (res && res.pwdUseYn === 'Y' && res.pwdLockYn === 'Y') {
    createErrorModal(t('paymentMng.det_038_001_001'), t('paymentMng.det_038_001_002'), async () => {
      callAuth();
    });
    return;
  }
  checkCnt.value = 0;
  password.value = '';
  passwordCheck.value = '';
  checkView.value = false;
  modal01.value = true;

  changeTextInfo();

  // 비밀번호 안내 문구 업데이트 결제 비밀번호 다시 입력, 결제시 사용할 비밀번호를 입력해주세요
  updateMessage(t('paymentMng.det_035_001_001'), t('paymentMng.det_034_001_002'), '', 'assertive')
  
  await closeKeypad();

  openKeypad(6, 'P', false, 'password', 'passwordEnc');
};

const close = () => {
  closeKeypad();
  modal01.value = false;
  password.value = '';
  passwordCheck.value = '';
  checkView.value = false;
  changeTextInfo();

   // 비밀번호 안내 문구 업데이트 결제 비밀번호 다시 입력, 결제시 사용할 비밀번호를 입력해주세요
   updateMessage(t('paymentMng.det_035_001_001'), t('paymentMng.det_034_001_002'), '', 'assertive')
};
defineExpose({ open });

const infoTextRef = ref();
const accessState = ref(false);

// 암호화 키패드 호출 bridge
const openKeypad = async (
  maxLength: number,
  type: string,
  isAddCardPwkb: boolean,
  $event: any,
  encRef: 'passwordEnc' | 'passwordCheckEnc'
) => {
  const appBridge = await getAppBridge();

  const id = typeof $event === 'string' ? $event : $event.target.id;
  let params: openEncKeypadRequest = {
    inputMaxLength: maxLength,
    keypadType: type,
    isAddCardPwKb: isAddCardPwkb,
    inputFieldId: id
  };

  // 결제비밀번호 재입력 시 접근성 처리
  if (encRef === 'passwordCheckEnc') {
    await nextTick();

    if (getAuthInfo.value.osKnd === 'I') {
      infoTextRef.value.setAttribute('aria-live', 'polite');
      infoTextRef.value.setAttribute('tabindex', '-1');
      infoTextRef.value.focus();
      infoTextRef.value.removeAttribute('tabindex');
    } else {
      infoTextRef.value.focus();
    }

  }

  try {
    let accessibility = (await appBridge.getAccessibility());
    accessState.value = accessibility?.state;
  } catch (e) {
    // 접근성 여부 조회 실패 시 비활성화 default
    accessState.value = false;
  }

  if (getAuthInfo.value.osKnd === 'I' && accessState.value) {
    setTimeout(() => {
      openEncKeypad();
    }, 1000)
  } else {
    openEncKeypad();
  }

  async function openEncKeypad() {
    // ios 1초 뒤에 오픈 
    const res = await appBridge.openEncKeypad(params);
    if (res) {
      switch (encRef) {
        case 'passwordEnc': {
          passwordEnc.value = res.encInputValue;
          // 비밀번호 입력 완료 관련 로직 하위에 연결
          passwordComplete();
          break;
        }
        case 'passwordCheckEnc': {
          passwordCheckEnc.value = res.encInputValue;
          // 비밀번호 체크 완료 관련 로직 하위에 연결
          passwordCheckComplete();
          break;
        }
      }
    }
  }
};

const closeKeypad = async () => {
  const appBridge = await getAppBridge();
  await appBridge.closeEncKeypad();
};

// 입력종류에 따른 노출 텍스트 변경
const changeTextInfo = () => {
  switch (initType.value) {
    // 첫입력
    case 'first-input': {
      inputTextInfos.value = {
        title: t('paymentMng.det_034_001_001'), // 결제 비밀번호 입력
        infoText: t('paymentMng.det_034_001_002'), // 결제 시 사용할 비밀번호를 입력해주세요
        class: '',
        ariaLive: 'assertive'
      };
      break;
    }
    // 비밀번호 변경( 초기화 )
    case 'change-input': {
      inputTextInfos.value = {
        title: t('paymentMng.det_036_001_001'), // 결제 비밀번호 변경
        infoText: t('paymentMng.det_036_001_002'), // 사용중인 결제 비밀번호 입력
        class: '',
        ariaLive: 'assertive'
      };
      break;
    }
    // 씽씽 결제 비밀번호 입력
    case 'xingxing-password-input': {
      inputTextInfos.value = {
        title: t('paymentMng.det_034_001_001'), // 결제 비밀번호 입력
        infoText: '반납 시 등록하신 결제수단으로 자동결제됩니다',
        class: '',
        ariaLive: 'assertive'
      };
      break;
    }
    // 온다 결제 비밀번호 입력
    case 'onda-password-input': {
      inputTextInfos.value = {
        title: t('paymentMng.det_036_001_001'), // 결제 비밀번호 변경
        infoText: '도착 후 등록하신 결제수단으로 자동결제됩니다',
        class: '',
        ariaLive: 'assertive'
      };
      break;
    }
    // 비밀번호 입력
    // 자전거 결제 비밀번호 입력
    // 기본
    case 'password-input':
    case 'bike-password-input':
    default: {
      inputTextInfos.value = {
        title: t('paymentMng.det_034_001_001'), // 결제 비밀번호 입력
        infoText: '비밀번호 6자리를 입력해주세요',
        class: '',
        ariaLive: 'assertive'
      };
      break;
    }
  }
};

const emits = defineEmits(['ok', 'error']);
// 비밀번호 입력
const passwordComplete = async () => {
  if (password.value.length === 6) {
    // 비밀번호 초기 설정 시 check(이중체크 적용) input 활성화
    if (initType.value === 'first-input') {
      closeKeypad();
      checkView.value = true;
      openKeypad(6, 'P', false, 'passwordCheck', 'passwordCheckEnc');
    } else {
      // 등록된 비밀번호로 검증
      const params: RequestPaymentPassword = {
        encPwd: passwordEnc.value,
        pwdUseYn: isPay.value ? (isSkip.value ? 'N' : 'Y') : paymentStatusInfo.value.pwdUseYn
      };
      const check = await reqPymPwdAuthInfo(params).catch(() => {
        createErrorModal('', '체크중 오류가 발생했습니다...');
        close();
        return;
      });
      if (check) {
        if (check.scsYn === 'Y') {
          // 비밀번호 변경의 경우 검증 성공시 재입력 요청
          if (initType.value === 'change-input') {
            initType.value = 'first-input';
            open();
            return;
          } else {
            // 결제이면서 다음에 미이용 체크시 결제비밀번호 미사용 처리
            if (isPay.value && isSkip.value) {
              await reqPymPwdUseYnInfo('N');
            }
            emits('ok', passwordEnc.value);
            close();
            return;
          }
        }
        // 5회되면 잠금
        checkCnt.value = checkCnt.value + 1;
        inputTextInfos.value.infoText =
          `결제 비밀번호가 일치하지 않습니다.(${checkCnt.value}/5)` +
          (checkCnt.value > 3 ? t('paymentMng.det_037_002_001') : '');

        inputTextInfos.value.class = 'text-red';
        // inputTextInfos.value.ariaLive = 'assertive';

        if (getAuthInfo.value.osKnd === 'I') {
          infoTextRef.value.setAttribute('aria-live', 'polite');
          infoTextRef.value.setAttribute('tabindex', '0');
          infoTextRef.value.focus();
          infoTextRef.value.removeAttribute('tabindex');
        }

        password.value = '';
        passwordCheck.value = '';
        
        // 5회 실패 시 openKeypad 안함
        if (checkCnt.value < 5)  {
          if (getAuthInfo.value.osKnd === 'I' && accessState.value) {
            setTimeout(() => {
              openKeypad(6, 'P', false, 'password', 'passwordEnc');
            }, 3000);
          } else {
            openKeypad(6, 'P', false, 'password', 'passwordEnc');
          }
        }

        if (checkCnt.value > 4) {
          const res = await reqPymPwdLockInfo();
          if (res) {
            if (res.scsYn === 'Y') {
              // 잠금적용 후 상태조회
              paymentManagementStore.requestPaymentStatusInfo();
              createErrorModal(t('paymentMng.det_038_001_001'), t('paymentMng.det_038_001_002'), async () => {
                callAuth();
              });
            }
          }
        }
      }
    }
  }
};

// 비밀번호 재입력
// 비밀번호 초기입력시에만 노출(변경 검증 후 초기입력으로 재오픈)
const passwordCheckComplete = async () => {
  if (passwordCheck.value.length === 6) {
    const passCfrn = await reqPymPwdCfrm({
      encPwd: passwordEnc.value,
      encPwdCfrm: passwordCheckEnc.value
    });
    if (passCfrn) {
      if (passCfrn.scsYn !== 'Y') {
        checkTextInfos.value.infoText = t('paymentMng.det_036_003_001'); // 설정한 결제 비밀번호가 일치하지 않습니다.
        checkTextInfos.value.class = 'text-red';

        openKeypad(6, 'P', false, 'passwordCheck', 'passwordCheckEnc');
        return;
      }
    }
    const res = await reqPymPwdRgtInfo(passwordEnc.value);
    if (res) {
      if (res.scsYn === 'Y') {
        // 결제비밀번호 사용처리
        await reqPymPwdUseYnInfo('Y');
        paymentManagementStore.requestPaymentStatusInfo();
        const appBridge = await getAppBridge();
        await appBridge.showToast({
          message: t('paymentMng.det_035_002_001') // 결제 비밀번호가 설정되었습니다.
        });
        close();
      }
    }
  }
};

const callAuth = async () => {
  const appBridge = await getAppBridge();
  const res = await appBridge.callIdentityVerify({
    verifyType: VerifyType.PASSWORD_RESET
  });
  if (res && res.response.code === FlexResponseCode.OK) {
    paymentManagementStore.requestPaymentStatusInfo();
    initType.value = 'first-input';
    open();
    return;
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

// init관련값
watch(
  () => props.initType,
  (newVal) => {
    initType.value = newVal ?? '';
  }
);

watch(
  () => modal01.value,
  () => {
    initType.value = props.initType ?? '';
  }
);

// 안드로이드 물리백키 대응용 키패드 닫기 수정
onUnmounted(() => {
  closeKeypad();
});
</script>
