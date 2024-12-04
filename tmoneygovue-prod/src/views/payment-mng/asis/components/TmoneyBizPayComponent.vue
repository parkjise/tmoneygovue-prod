<!-- 
  결제수단 관리>티머니
  pubPath: tmoney/Spa/DET/DET044.vue
-->
<template>
  <round-box title="티머니" class="tmoney">
    <p class="text tmoney">{{ t('paymentMng.det_028_005_003') }}</p>
    <uu-accordion multiple class="tmoney">
      <uu-accordion-item :active="moreContent" :header="`Mobile Tmoney ${!getTmoneyPayInfoRegistered ? '미등록' : ''}`">
        <template #accordion_header>
          <img src="/assets/images/logo/logo_mobiletmoney.png" alt="Mobile Tmoney 로고" />
          <span v-if="!getTmoneyPayInfoRegistered" class="badge"
            ><img src="/assets/images/payment/img_badge_notregist.png" alt="미등록"
          /></span>
          <span class="sr_only">Mobile Tmoney</span>
        </template>
        <template #accordion_body>
          <div v-if="!getTmoneyPayInfoRegistered" class="regist before">
            <uu-button
              label="모바일티머니란?"
              size="xs"
              btn-style="line"
              @click="onClickWebBrowser('https://pay.tmoney.co.kr/ncs/pct/tpay/ReadTmnyPay.dev')"
              >{{ t('paymentMng.det_028_004_001') }}</uu-button
            >
            <uu-button label="모바일티머니 등록하기" size="xs" btn-style="line" @click="regTmoneyPay">{{
              t('paymentMng.det_028_004_002')
            }}</uu-button>
          </div>
          <div v-else class="regist after">
            <ul v-for="elwl in paymentManagement.tmoneyPayInfo?.elwlProdList" :key="elwl.seqNo" class="regist_list">
              <li>
                <p>
                  {{
                    elwl.elwlPrdCd === '2100400801' ? t('paymentMng.det_028_005_004') : t('paymentMng.det_028_005_005')
                  }}
                </p>
                <p>{{ elwl.elwlPrdCd === '2100400801' ? 'Pay&GO' : 'Pay money' }}</p>
              </li>
            </ul>
            <div class="bottom">
              <uu-button label="모바일티머니 가기" btn-style="none" @click="onClickOtherApp">{{
                t('paymentMng.det_028_005_006')
              }}</uu-button>
              <uu-button label="등록 해제하기" btn-style="none" @click="cancelTmoney">{{
                t('paymentMng.det_028_005_007')
              }}</uu-button>
            </div>
          </div>
        </template>
      </uu-accordion-item>
    </uu-accordion>
    <p
      class="text"
      v-if="paymentManagement.tmoneyPayInfo?.pblcPhrsTtlNm"
      v-html="paymentManagement.tmoneyPayInfo?.pblcPhrsTtlNm?.join('</br>')"
    />
    <uu-accordion multiple class="tmoney">
      <uu-accordion-item :header="`Tmoney Biz Pay ${!getBizPayInfoRegistered ? '미등록' : ''}`">
        <template #accordion_header>
          <img src="/assets/images/logo/logo_tmoneybizpay.png" alt="Tmoney Biz Pay 로고" />
          <span v-if="!getBizPayInfoRegistered" class="badge"
            ><img src="/assets/images/payment/img_badge_notregist.png" alt="미등록"
          /></span>
          <span class="sr_only">Tmoney Biz Pay</span>
        </template>
        <template #accordion_body>
          <div v-if="!getBizPayInfoRegistered" class="regist before">
            <uu-button
              label="티머니 비즈페이란?"
              size="xs"
              btn-style="line"
              @click="onClickWebBrowser('https://pay.tmoney.co.kr/ncs/pct/mblTmny/ReadMblTmnyGd.dev')"
              >{{ t('paymentMng.det_028_004_003') }}</uu-button
            >
            <uu-button label="티머니 비즈페이 등록하기" size="xs" btn-style="line" @click="regBizPay">
              {{ t('paymentMng.det_028_004_004') }}</uu-button
            >
          </div>
          <div v-else class="regist after">
            <ul class="regist_list">
              <li>
                <p>{{ t('paymentMng.det_028_005_008') }}</p>
                <p>Biz.Pay</p>
              </li>
            </ul>
            <div class="bottom">
              <uu-button label="등록 해제하기" btn-style="none" @click="cancelBizPay">{{
                t('paymentMng.det_028_005_007')
              }}</uu-button>
            </div>
          </div>
        </template>
      </uu-accordion-item>
    </uu-accordion>
    <p
      class="text"
      v-if="paymentManagement.bizPayInfo?.pblcPhrsTtlNm"
      v-html="paymentManagement.bizPayInfo?.pblcPhrsTtlNm?.join('</br>')"
    />
  </round-box>
  <CancelPayPopup :popupContent="popupContent" ref="cancelPayPopup" @ok="popupOk" okLabel="네,해제합니다" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

import { getAppBridge } from '@/utils';
import { formatDate } from '@/utils/dateUtils';
import { logger } from '@/utils/logger';
import { FlexResponseCode } from '@/utils/hybrid/type';

import { deleteMemberBizPay } from '@/service/payment/api/bizPaymentApi';
import { deleteMemberTMoneyPay } from '@/service/payment/api/tmoneyPaymentApi';
import { usePaymentManageStore } from '@/service/payment/paymentManageModule';
import { useAuthStore } from '@/service/auth/authModule';
import { useOrderStore } from '@/service/order/orderModule';

import CancelPayPopup from './ConfirmPopup.vue';
import { useRouter } from 'vue-router';
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();
const paymentManagementStore = usePaymentManageStore();
const { paymentManagement, getTmoneyPayInfoRegistered, getBizPayInfoRegistered } = storeToRefs(paymentManagementStore);
const orderStore = useOrderStore();
const authStore = useAuthStore();
const { authInfo } = storeToRefs(authStore);
const cancelPayPopup = ref();
const popupContent = ref();
const popupOk = ref();

// 앱열기
const aosTmoneyPkg = import.meta.env.VITE_AOS_TMONEY_PKG;
const iosTmoneyPkg = import.meta.env.VITE_IOS_TMONEY_PKG;

// 스토어링크
const aosTmoneyStore = import.meta.env.VITE_AOS_TMONEY_STORE;
const iosTmoneyStore = import.meta.env.VITE_IOS_TMONEY_STORE;

const router = useRouter();
const moreContent = ref(false);
onMounted(async () => {
  moreContent.value = (router.currentRoute.value.query['tmoney'] || 'false') === 'true';
});

// 티머니페이
// 등록
const regTmoneyPay = async () => {
  // webview url 생성을 위한 appVersion 호출
  const appBridge = await getAppBridge();
  const res = await appBridge.openView({
    url: `${import.meta.env.VITE_TMONEY_PAY_WEB_VIEW}`,
    viewType: 'native'
  });
  if (res && res.response.code === FlexResponseCode.OK) {
    paymentManagementStore.requestPaymentManagement();
    orderStore.requestPaymentManagement();
    await appBridge.showToast({
      message: `모바일티머니 등록 처리 되었습니다.\n(${formatDate(new Date(), 'YYYY.MM.DD')})`
    });
  } else if (res && res.response.code === FlexResponseCode.CANCEL) {
    return;
  } else {
    await appBridge.showToast({
      message: res.response.message || '모바일티머니 등록에 실패했습니다.'
    });
  }
};

// 티머니 등록 해제
const cancelTmoney = () => {
  popupContent.value = '<p>등록된 모바일티머니정보가 초기화됩니다.</p><p>등록을 해제하시겠습니까?</p>';
  popupOk.value = () => deleteTmoneyPay();
  cancelPayPopup.value.open();
};
const deleteTmoneyPay = async () => {
  const res = await deleteMemberTMoneyPay({
    inqrDtm: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
  });
  if (res) {
    const appBridge = await getAppBridge();
    if (res.dltYn === 'Y') {
      paymentManagementStore.requestPaymentManagement();
      orderStore.requestPaymentManagement();
      await appBridge.showToast({
        message: `등록된 모바일티머니가 해제 되었습니다.`
      });
    } else {
      await appBridge.showToast({
        message: res.rspMsg ?? '모바일티머니 해제가 불가합니다.'
      });
    }
  }
};

// 비즈페이
// 등록
const regBizPay = async () => {
  const appBridge = await getAppBridge();
  const res = await appBridge.openView({
    url: `${import.meta.env.VITE_BIZ_PAY_WEB_VIEW}`,
    viewType: 'native'
  });
  if (res && res.response.code === FlexResponseCode.OK) {
    paymentManagementStore.requestPaymentManagement();
    await appBridge.showToast({
      message: `티머니 비즈페이 등록 처리되었습니다.\n(${formatDate(new Date(), 'YYYY.MM.DD')})`
    });
  } else if (res && res.response.code === FlexResponseCode.CANCEL) {
    return;
  } else {
    await appBridge.showToast({
      message: res.response.message || `티머니 비즈페이 등록에 실패했습니다.`
    });
  }
};

// 비즈페이 등록 해제
const cancelBizPay = () => {
  popupContent.value = '<p>등록된 티머니 비즈페이 정보가 초기화됩니다.</p><p>등록을 해제하시겠습니까?</p>';
  popupOk.value = () => deleteBizPay();
  cancelPayPopup.value.open();
};
const deleteBizPay = async () => {
  const today = formatDate(new Date(), 'YYYYMMDDHHmmss');
  const params = {
    reqDtm: today,
    inqrDtm: today
  };
  const res = await deleteMemberBizPay(params);
  if (res) {
    const appBridge = await getAppBridge();
    if (res.rspCd === '0000') {
      paymentManagementStore.requestPaymentManagement();
      await appBridge.showToast({
        message: `등록된 비즈페이 해제 되었습니다.`
      });
    } else {
      await appBridge.showToast({
        message: res.rspMsg ?? '비즈페이 해제가 불가합니다.'
      });
    }
  }
};

// 공통
// 외부브라우저 오픈
const onClickWebBrowser = async (url: string) => {
  const appBridge = await getAppBridge();
  await appBridge.openView({
    url: url,
    viewType: 'ex'
  });
};
// 티머니 어플 켜기
const onClickOtherApp = async () => {
  const appBridge = await getAppBridge();
  const version = await appBridge.getOtherAppVersionList();
  const appState = version.appState || 'N';
  logger.debug('call onClickOtherApp');
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
</script>
