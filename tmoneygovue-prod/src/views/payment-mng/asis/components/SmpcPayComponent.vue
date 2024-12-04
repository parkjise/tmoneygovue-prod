<!-- 
  결제수단 관리>신용/체크 카드
  pubPath: tmoney/Spa/DET/DET044.vue
 -->
<template>
  <round-box title="신용/체크 카드" class="card">
    <uu-tabs class="segment_tab" :tabIndex="smpcTabIndex">
      <uu-tab title="고속･시외･항공･기차">
        <div class="card_regist_area">
          <uu-accordion multiple>
            <uu-accordion-item
              v-for="cardInfo in paymentManagement.appSmpcPymList"
              :key="cardInfo.pKey"
              :class="[CardClass[Number(cardInfo.cardCode ?? '366')]]"
            >
              <template #accordion_header>
                <span class="card">
                  <span class="card_title">
                    {{
                      cardInfo.cardNickName !== undefined &&
                      cardInfo.cardNickName !== null &&
                      cardInfo.cardNickName !== ''
                        ? cardInfo.cardNickName
                        : cardInfo.cardName
                    }}
                    <span class="main_badge" v-if="cardInfo.rprnCardYn === 'Y'">
                      <img src="/assets/images/payment/img_badge_maincard.png" alt="주카드" />
                    </span>
                  </span>
                  <span class="card_logo">
                    <img :src="`${imgUrl}${cardInfo.cardCIImageWhite}`" :alt="`${cardInfo.cardName}로고`" />
                  </span>
                </span>
              </template>
              <template #accordion_body>
                <div class="card_info">
                  <p class="card_num">
                    <span> {{ cardInfo.cardDecDat1 }} </span>
                    <span class="card_astar_num">●●●●</span>
                    <span class="card_astar_num">●●●●</span>
                    <span>{{ cardInfo.cardDecDat4 }}</span>
                  </p>
                  <div class="card_btn_area">
                    <uu-button label="별명 변경" btn-style="none" @click="changeAppCardAliasPopup(cardInfo)">{{
                      t('paymentMng.det_032_007_001')
                    }}</uu-button>
                    <uu-button
                      v-if="cardInfo.rprnCardYn === 'Y'"
                      label="주카드 취소"
                      btn-style="none"
                      @click="registRepresentAppCardInfo(cardInfo, 'cancel')"
                      >{{ t('paymentMng.det_032_007_002') }}</uu-button
                    >
                    <uu-button
                      v-else
                      label="주카드 등록"
                      btn-style="none"
                      @click="registRepresentAppCardInfo(cardInfo, 'regist')"
                    />
                    <uu-button label="카드 삭제" btn-style="none" @click="deleteConfirm(cardInfo, 'bus')">{{
                      t('paymentMng.det_032_007_003')
                    }}</uu-button>
                  </div>
                </div>
              </template>
            </uu-accordion-item>
          </uu-accordion>
          <!-- 신용/체크 카드 등록 -->
          <uu-button class="btn_card_regist" @click="regSmpyPay">
            <div class="btn_card_text">
              <uu-ic size="20" name="plus" />
              {{ t('paymentMng.det_033_001_010') }}
            </div>
          </uu-button>
          <div class="notice">
            <p class="badge">안내</p>
            <p class="text">티머니Pay&GO 신한카드는 모바일티머니를 등록하여 결제 시 할인 적용됩니다.</p>
          </div>
        </div>
      </uu-tab>
      <uu-tab title="택시･자전거･킥보드･</br>렌터카･여행">
        <div class="card_regist_area">
          <uu-accordion multiple>
            <uu-accordion-item
              v-for="cardInfo in paymentManagement.smpcPymInfo?.smpcPymList"
              :key="cardInfo.paymentKey"
              :class="[CardClass[Number(cardInfo.crpcId ?? '366')]]"
              :aria-label="`${cardInfo.cardName}카드`"
            >
              <template #accordion_header>
                <span class="card">
                  <span class="card_title">
                    {{
                      cardInfo.cardAliasName !== undefined &&
                      cardInfo.cardAliasName !== null &&
                      cardInfo.cardAliasName !== ''
                        ? cardInfo.cardAliasName
                        : cardInfo.cardName
                    }}
                    <span class="main_badge" v-if="representPaymentManagement.rprnPaymentKey === cardInfo.paymentKey">
                      <img src="/assets/images/payment/img_badge_maincard.png" alt="주카드" />
                    </span>
                  </span>
                  <span class="card_logo">
                    <img :src="`${imgUrl}${cardInfo.path2}`" :alt="`${cardInfo.cardName}로고`" />
                  </span>
                </span>
                <span class="card_badge" v-if="getSmpcTaglist(cardInfo.usePsbSvc)">
                  <span v-for="(tag, index) in getSmpcTaglist(cardInfo.usePsbSvc)" :key="index">{{ tag }}</span>
                </span>
              </template>
              <template #accordion_body>
                <div class="card_info">
                  <p class="card_num">
                    <span> {{ cardInfo.maskCardNo.split('*')[0] }} </span>
                    <span>●●●●</span>
                    <span>●●●●</span>
                    <span>
                      {{ cardInfo.maskCardNo.split('*').length > 1 ? cardInfo.maskCardNo.split('*').pop() : '' }}
                    </span>
                  </p>
                  <div class="card_btn_area">
                    <uu-button label="별명 변경" btn-style="none" @click="changeCardAliasPopup(cardInfo)">{{
                      t('paymentMng.det_032_007_001')
                    }}</uu-button>
                    <uu-button
                      v-if="representPaymentManagement.rprnPaymentKey === cardInfo.paymentKey"
                      label="주카드 취소"
                      btn-style="none"
                      @click="registRepresentCardInfo(cardInfo, 'cancel')"
                      >{{ t('paymentMng.det_032_007_002') }}</uu-button
                    >
                    <uu-button
                      v-else
                      label="주카드 등록"
                      btn-style="none"
                      @click="registRepresentCardInfo(cardInfo, 'regist')"
                    />
                    <uu-button label="카드 삭제" btn-style="none" @click="deleteConfirm(cardInfo, 'mobility')">{{
                      t('paymentMng.det_032_007_003')
                    }}</uu-button>
                  </div>
                </div>
              </template>
            </uu-accordion-item>
          </uu-accordion>
          <!-- 신용/체크 카드 등록 -->
          <uu-button class="btn_card_regist" @click="regSmpyPay">
            <div class="btn_card_text">
              <uu-ic size="20" name="plus" />
              {{ t('paymentMng.det_033_001_010') }}
            </div>
          </uu-button>
          <div class="notice">
            <p class="badge">안내</p>
            <p class="text">티머니Pay&GO 신한카드는 모바일티머니를 등록하여 결제 시 할인 적용됩니다.</p>
          </div>
        </div>
      </uu-tab>
    </uu-tabs>
  </round-box>
  <div class="main_card_notice">
    <p class="badge">
      <img src="/assets/images/payment/img_badge_maincard.png" alt="주카드" />
    </p>
    <p class="notice">{{ t('paymentMng.det_032_001_018') }}</p>
  </div>
  <!-- <reg-smpc-popup ref="regPopup" /> -->
  <changeNicknamePopup
    ref="changePopup"
    :paymentKey="changeCardInfo.paymentKey"
    :cardAliasName="changeCardInfo.cardAliasName"
    :issuerCd="changeCardInfo.issuerCd"
    :smpcType="smpcType"
  />
  <ConfirmPopup :popupContent="popupContent" :title="popupTitle" ref="confirmPopup" @ok="popupOk" />
</template>

<script setup lang="ts">
import { cardPymKeyRgt } from '@/service/payment/api/paymentApi';
import { cardSmpcPymCncn } from '@/service/payment/api/smpcPaymentApi';
import type { AppSmpcPym, SmpcPym } from '@/service/payment/model/paymentModel';
import { usePaymentManageStore } from '@/service/payment/paymentManageModule';
import { CardClass } from '@/utils/constants/cardConstants';
import { getSmpcTaglist } from '@/utils/cardUtils';
import { storeToRefs } from 'pinia';
// import regSmpcPopup from './SmpcRegPopup.vue';
import changeNicknamePopup from './SmpcNicknamePopup.vue';
import { ref } from 'vue';
import { useMessageModal } from '@/composables/useMessageModal';
import { getAppBridge } from '@/utils';
import ConfirmPopup from './ConfirmPopup.vue';
import { cloneDeep } from 'lodash-es';
import { FlexResponseCode } from '@/utils/hybrid/type';
import { formatDate } from '@/utils/dateUtils';
import { useOrderStore } from '@/service/order/orderModule';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();
const paymentManagementStore = usePaymentManageStore();
const orderStore = useOrderStore();
const { paymentManagement, representPaymentManagement } = storeToRefs(paymentManagementStore);

// 사전결제카드등록 팝업
// const regPopup = ref<InstanceType<typeof regSmpcPopup> | null>();

// 별명변경 팝업
const changePopup = ref<InstanceType<typeof changeNicknamePopup> | null>();
const cardInfoInit = {
  issuerCd: '',
  cardName: '',
  maskCardNo: '',
  paymentKey: '',
  cardAliasName: '',
  usePsbSvc: ''
};
const changeCardInfo = ref<SmpcPym>(cloneDeep(cardInfoInit));
const smpcType = ref('');

const confirmPopup = ref();
const popupContent = ref();
const popupTitle = ref('');
const popupOk = ref();

const imgUrl = import.meta.env.VITE_IMG_URL;
const { createNotificationModal } = useMessageModal();

const smpcTabIndex = ref(0);
onMounted(async () => {
  smpcTabIndex.value = (router.currentRoute.value.query['mobility'] || 'false') === 'true' ? 1 : 0;
});

//간편결제
//등록
const router = useRouter();
const regSmpyPay = () => {
  // regPopup.value?.open();
  router.push({ path: '/payment/smpc-card-register' });
};

//카드별칭변경
const changeCardAliasPopup = (cardInfo: SmpcPym) => {
  if (cardInfo.paymentKey === null || cardInfo.paymentKey === '') {
    createNotificationModal('', '유효한 카드 정보가 아닙니다.');
    return;
  }
  changeCardInfo.value.paymentKey = cardInfo.paymentKey;
  changeCardInfo.value.issuerCd = cardInfo.issuerCd;
  changeCardInfo.value.cardAliasName = cardInfo.cardAliasName || '';
  smpcType.value = 'mobility';
  changePopup.value?.open();
};
const changeAppCardAliasPopup = (cardInfo: AppSmpcPym) => {
  if (cardInfo.pKey === null || cardInfo.pKey === '') {
    createNotificationModal('', '유효한 카드 정보가 아닙니다.');
    return;
  }
  changeCardInfo.value.paymentKey = cardInfo.pKey;
  changeCardInfo.value.issuerCd = '';
  changeCardInfo.value.cardAliasName = cardInfo.cardNickName || '';
  smpcType.value = 'bus';
  changePopup.value?.open();
};

// 주카드 설정 API
// regist:등록, cancel:취소
const registRepresentCardInfo = async (cardInfo: SmpcPym, type: string) => {
  if (type === 'regist' && (cardInfo.paymentKey === null || cardInfo.paymentKey === '')) {
    createNotificationModal('', '유효한 카드 정보가 아닙니다.');
    return;
  }
  let params;
  switch (type) {
    case 'regist': {
      params = {
        pymMnsId: 'PRPM',
        paymentKey: cardInfo.paymentKey,
        issuerCd: cardInfo.issuerCd
      };
      break;
    }
    default: {
      params = {
        pymMnsId: '',
        paymentKey: '0000000000000000',
        issuerCd: ''
      };
      break;
    }
  }
  const res = await cardPymKeyRgt(params);
  if (res) {
    const appBridge = await getAppBridge();
    if (res.respCd === '0000') {
      // 대표결제수단 재조회
      const today = formatDate(new Date(), 'YYYYMMDDHHmmss');
      const params = {
        reqDtm: today,
        inqrDtm: today
      };
      paymentManagementStore.requestRepresentManagement(params);
      orderStore.requestRepresentManagement(params);
      paymentManagementStore.requestPaymentManagement();
      orderStore.requestPaymentManagement();
      await appBridge.showToast({
        message: cardInfo.cardName + ' 주카드로 설정되었습니다.'
      });
    } else {
      await appBridge.showToast({
        message: cardInfo.cardName + ' 주카드 설정이 취소 되었습니다.'
      });
    }
  }
};
// 주카드설정 AppDatabase
// regist:등록, cancel:취소
const registRepresentAppCardInfo = async (cardInfo: AppSmpcPym, type: string) => {
  if (type === 'regist' && (cardInfo.pKey === null || cardInfo.pKey === '')) {
    createNotificationModal('', '유효한 카드 정보가 아닙니다.');
    return;
  }

  const params = {
    pKey: cardInfo.pKey,
    type: type === 'regist' ? 'C' : 'U'
  };
  const appBridge = await getAppBridge();
  const res = await appBridge.updateCard(params);
  if (res && res.response.code === FlexResponseCode.OK) {
    // 카드정보 재호출
    paymentManagementStore.requestPaymentManagement();
    await appBridge.showToast({
      message: `주카드 ${type === 'regist' ? '변경' : '취소'} 완료`
    });
  } else {
    await appBridge.showToast({
      message: '주카드 변경 불가'
    });
  }
};

// 삭제
const deleteConfirm = (cardInfo: SmpcPym | AppSmpcPym, smpcType: string) => {
  popupContent.value = '<p>등록된 카드를 삭제합니다.</p>';
  popupTitle.value = '카드를 삭제하시겠습니까?';
  popupOk.value = () => {
    if (smpcType === 'bus') {
      deleteAppCardInfo(cardInfo as AppSmpcPym);
    } else {
      deleteCardInfo(cardInfo as SmpcPym);
    }
  };
  confirmPopup.value.open();
};
// 삭제 API
const deleteCardInfo = async (cardInfo: SmpcPym) => {
  const params = {
    paymentKey: cardInfo.paymentKey,
    issuerCd: cardInfo.issuerCd
  };
  const res = await cardSmpcPymCncn(params);
  if (res) {
    const appBridge = await getAppBridge();
    if (res.respCd === '0000') {
      paymentManagementStore.requestPaymentManagement();
      orderStore.requestPaymentManagement();
      await appBridge.showToast({
        message: '삭제 완료'
      });
    } else {
      await appBridge.showToast({
        message: res.respMsg
      });
    }
  }
};
// 삭제 AppDatabase
const deleteAppCardInfo = async (cardInfo: AppSmpcPym) => {
  const params = {
    pKey: cardInfo.pKey,
    type: 'D'
  };
  const appBridge = await getAppBridge();
  const res = await appBridge.updateCard(params);
  if (res && res.response.code === FlexResponseCode.OK) {
    paymentManagementStore.requestPaymentManagement();
    await appBridge.showToast({
      message: '등록된 카드가 삭제되었습니다.'
    });
  } else {
    await appBridge.showToast({
      message: '등록된 카드 삭제에 실패하였습니다.'
    });
  }
};
</script>
