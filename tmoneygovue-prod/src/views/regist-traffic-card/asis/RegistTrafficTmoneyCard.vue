<template>
  <sub-header title="티머니 교통카드 등록/변경" />
  <main class="main mor" role="presentation">
    <div class="container">
      <round-box title="티머니 카드번호를 입력하세요." class="regist">
        <div class="tmoney_regist">
          <p class="desc">(최대 5개 등록 가능)</p>
          <form>
            <label for="tmoney_input01" class="tmoney_label sr_only">교통카드 카드번호 1번째</label>
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
              @input="inputCardNum($event, strCardNum02Ref)"
            />
            <label for="tmoney_input02" class="tmoney_label sr_only">교통카드 카드번호 2번째</label>
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
              @input="inputCardNum($event, strCardNum03Ref)"
            />
            <label for="tmoney_input03" class="tmoney_label sr_only">교통카드 카드번호 3번째</label>
            <input
              ref="strCardNum03Ref"
              v-model="strCardNum03"
              maxlength="4"
              id="tmoney_input03"
              class="tmoney_input"
              type="text"
              inputmode="numeric"
              pattern="\d*"
              placeholder="4자리"
              @input="inputCardNum($event, strCardNum04Ref)"
            />
            <label for="tmoney_input04" class="tmoney_label sr_only">교통카드 카드번호 4번째</label>
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
            <uu-button btn-style="line" label="등록" @click="onclickRegistTmoneyCard()" :disabled="isDisabled" />
          </form>
          <uu-button btn-style="line" size="xl" label="교통카드 불러오기" @click="onClickGetTmoneyPayCard()" />
          <div class="notice">
            <p>
              <uu-ic size="16" name="exclamation_gray090" />
              유의사항
            </p>
            <ul v-for="(item, i) in tmoneyNotes" :key="i" :class="{ no_dots: !item.includes('·') }">
              <li v-html="item.includes('·') ? item.replace(/^· /, '') : '&nbsp&nbsp' + item"></li>
            </ul>
          </div>
        </div>
      </round-box>
      <!-- 등록된 티머니 카드 목록-->
      <RegisteredTmoneyCardList
        @ok="isCompleteDisabled = false"
        :callTmoneyList="callTmoneyList"
        @listCallback="callTmoneyList = false"
      />
      <uu-button
        label="완료"
        @click="goBack"
        btn-color="primary"
        size="xl"
        class="primary_full"
        :disabled="isCompleteDisabled"
      />
    </div>
  </main>
  <!-- 티머니페이 카드 등록 팝업-->
  <GetTmoneyPayCardPopup
    :isShowPopup="isShowGetTmoneyPayCardPopup"
    :tmoneyPayCardCnt="getTmoneyCardCnt.tmpyRgtCnt"
    @ok="registTmoneyPayCallback"
    @close="isShowGetTmoneyPayCardPopup = false"
  />

  <!-- 티머니페이 미등록 사용자 팝업 -->
  <UnRegistTmoneyPayCardPopup :isShow="showUnRegistPopup" @ok="TmoneyApp" @close="showUnRegistPopup = false" />
  <!-- 교통카드 등록 성공 팝업 -->
  <regist-success-popup :isShow="successPopup" :cardType="cardType" @ok="registSuccess" />
  <!-- 혜택뽑기 팝업 -->
  <benefit-event-popup ref="eventPopupRef" @close="goBack" />
</template>

<script setup lang="ts">
import GetTmoneyPayCardPopup from '../components/GetTmoneyPayCardPopup.vue';
import UnRegistTmoneyPayCardPopup from '../components/UnRegistTmoneyPayCardPopup.vue';
import BenefitEventPopup from '../components/BenefitEventPopup.vue';
import { onMounted, computed, ref } from 'vue';
import { useRegistTrafficCardStore } from '@/service/regist-traffic-card/registTrafficCardModule';
import { storeToRefs } from 'pinia';
import RegisteredTmoneyCardList from '../components/RegisteredTmoneyCardList.vue';
import { useMessageModal } from '@/composables/useMessageModal';
import { formatDate } from '@/utils/dateUtils';
import { getAppBridge } from '@/utils';
import { AdbrixEvtId, FlexResponseCode } from '@/utils/hybrid/type';
import { useRouter } from 'vue-router';
import RegistSuccessPopup from '../components/RegistSuccessPopup.vue';
import { useAuthStore } from '@/service/auth/authModule';
import { sendAdbrix } from '@/utils/sendAdbrixUtil';

const router = useRouter();
const { createErrorModal } = useMessageModal();
const registTrafficCardStore = useRegistTrafficCardStore();
const { authInfo } = storeToRefs(useAuthStore());
const { getTmoneyCardCnt, getRegistTmoneyCardInfo, getTmoneyNotesInfo } = storeToRefs(registTrafficCardStore);

const strCardNum01 = ref('');
const strCardNum02 = ref('');
const strCardNum03 = ref('');
const strCardNum04 = ref('');
const strCardNum01Ref = ref();
const strCardNum02Ref = ref();
const strCardNum03Ref = ref();
const strCardNum04Ref = ref();

const cardType = 'T';
const successPopup = ref(false); // 교통카드 등록 성공 팝업
const showUnRegistPopup = ref(false); // 티머니페이 미등록 사용자 팝업
const isShowGetTmoneyPayCardPopup = ref(false); // 티머니페이 카드 등록 팝업
const isCompleteDisabled = ref(true); // 완료버튼 비활성화
const callTmoneyList = ref(false); // 티머니 교통카드 목록 api 호출

const eventPopupRef = ref(); // 대중교통 챌린지 이벤트팝업

/**
 * @description: 유의사항
 */
const tmoneyNotes = computed(() => {
  const delimiter = getTmoneyNotesInfo.value.includes('\r\n') ? '\r\n' : '\n';
  return getTmoneyNotesInfo.value.split(delimiter);
});

onMounted(async () => {
  await registTrafficCardStore.requestTmoneyNotes('TrcrReg3'); // 유의사항
});

// 교통카드 불러오기 버튼
const onClickGetTmoneyPayCard = async () => {
  await registTrafficCardStore.requestGetTmoneyPayCardASIS();
  if (
    getTmoneyCardCnt.value.tmpyRgtCnt == undefined ||
    getTmoneyCardCnt.value.tmpyRgtCnt == null ||
    getTmoneyCardCnt.value.tmpyRgtCnt === '0'
  ) {
    // 티머니페이 미등록 사용자
    // createErrorModal(
    //   '모바일티머니 미등록 사용자',
    //   '등록 가능한 카드가 조회되지 않습니다.<br/>모바일티머니/삼성페이/티머니 홈페이지에 등록여부를 확인해주세요.'
    // );
    showUnRegistPopup.value = true;
  } else {
    // 티머니페이 등록 사용자
    isShowGetTmoneyPayCardPopup.value = true;
  }
};

// 티머니페이 카드 등록 => 교통카드 불러오기로 가져온 카드
const registerTmoneyPayCard = async () => {
  const reqDtm = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss');
  const { rgtYn } = await registTrafficCardStore.requestRegisterTmoneyPayCardNoASIS(reqDtm);

  if (rgtYn === 'Y') {
    // 성공
    isCompleteDisabled.value = false;
    callTmoneyList.value = true; // 등록된 티머니카드 조회 api
    // 성공팝업 오픈
    successPopup.value = true;
  } else {
    createErrorModal('알림', '문제가 발생했지만, 원격 서버에서 이유를 응답하지 않았습니다.');
  }
};

const registTmoneyPayCallback = () => {
  isShowGetTmoneyPayCardPopup.value = false;
  registerTmoneyPayCard(); // 티머니페이 카드 등록 api
};

// 등록 버튼
const onclickRegistTmoneyCard = async () => {
  const body = {
    trcrDvsCd: '1', // 선불:1
    trcrNo1: strCardNum01.value,
    trcrNo2: strCardNum02.value,
    trcrNo3: strCardNum03.value,
    trcrNo4: strCardNum04.value,
    reqEncYn: 'Y'
  };
  const res = await registTrafficCardStore.requestRegisterTmoneyCardNoASIS(body);
  if (res.scsYn === 'Y') {
    // 카드등록 성공
    const appBridge = await getAppBridge();
    // 카드번호 복호화 브릿지
    const getScsYn = await appBridge.decScsYn({ encScsYn: res.encScsYn, encDtm: res.encDtm });

    if (getScsYn.response.code === FlexResponseCode.OK && getScsYn.decScsYn === 'Y') {
      strCardNum01.value = '';
      strCardNum02.value = '';
      strCardNum03.value = '';
      strCardNum04.value = '';
      successPopup.value = true; // 카드등록 성공 팝업 open
      sendAdbrix(AdbrixEvtId.rTmoney);
    } else {
      createErrorModal('알림', '문제가 발생했지만, 원격 서버에서 이유를 응답하지 않았습니다.', () => {
        strCardNum01.value = '';
        strCardNum02.value = '';
        strCardNum03.value = '';
        strCardNum04.value = '';
        strCardNum01Ref.value.focus();
      });
    }
  } else {
    // 카드등록실패
    createErrorModal('알림', `${getRegistTmoneyCardInfo.value.msg}`, () => {
      strCardNum01.value = '';
      strCardNum02.value = '';
      strCardNum03.value = '';
      strCardNum04.value = '';
      strCardNum01Ref.value.focus();
    });
  }
};

// 교통카드 등록 성공
const registSuccess = () => {
  successPopup.value = false;
  isCompleteDisabled.value = false;
  callTmoneyList.value = true; // 등록된 티머니카드 조회 api

  eventPopupRef.value.open();
};

// 완료버튼
const goBack = () => router.go(-1);

/**
 * @description: 카드번호 검증
 */
const inputCardNum = async (event: any, nextRef?: any) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;

  // maxLength check
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
  // Input focus
  if (event.target.value.length === 4 && nextRef) {
    nextRef.focus();
  }
};

// 모바일티머니 앱 호출
const TmoneyApp = async () => {
  showUnRegistPopup.value = false;
  // 앱열기
  const aosTmoneyPkg = import.meta.env.VITE_AOS_TMONEY_PKG;
  const iosTmoneyPkg = import.meta.env.VITE_IOS_TMONEY_PKG;

  // 스토어링크
  const aosTmoneyStore = import.meta.env.VITE_AOS_TMONEY_STORE;
  const iosTmoneyStore = import.meta.env.VITE_IOS_TMONEY_STORE;

  const appBridge = await getAppBridge();
  const version = await appBridge.getOtherAppVersionList();
  const appState = version.appState || 'N';
  if (appState === 'Y') {
    await appBridge.openView({
      url: authInfo.value.osKnd === 'A' ? aosTmoneyPkg : iosTmoneyPkg,
      viewType: 'app'
    });
  } else {
    await appBridge.openView({
      url: authInfo.value.osKnd === 'A' ? aosTmoneyStore : iosTmoneyStore,
      viewType: 'ex'
    });
  }
};

const isDisabled = computed(() => {
  if (
    strCardNum01.value.length === 4 &&
    strCardNum02.value.length === 4 &&
    strCardNum03.value.length === 4 &&
    strCardNum04.value.length === 4
  ) {
    return false;
  } else {
    return true;
  }
});

// const movePage = (link: string) => {
//   router.push(link);
// };
</script>
