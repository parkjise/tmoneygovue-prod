<template>
  <!-- header -->
  <sub-header title="설정" />
  <!-- // header -->
  <!-- main -->
  <main id="main" class="main mor">
    <div class="container">
      <round-box title="마케팅 정보 알림">
        <div class="setting">
          <div class="toggle">
            <uu-checkbox
              label="마케팅 정보 수신 동의 (PUSH, SMS)"
              v-model="marketingAgreementYn"
              toggle-switch
              :disabled="!authStore.getIsLogin"
              @click.stop.prevent="onClickMarketingStateChanged"
            />
          </div>
          <div class="terms">
            <p :class="{ disabled: !authStore.getIsLogin }">다양한 이벤트 및 쿠폰 혜택 정보를 받을 수 있도록 허용</p>
            <uu-button
              label="약관동의"
              btn-style="line"
              size="s"
              :disabled="!authStore.getIsLogin"
              @click="onClickMarketingAgreementDetailPage()"
            />
          </div>
          <ul class="flex_area">
            <li>
              <uu-button @click="onClickPageRouterPush('/app-setting/terms-and-policies')">
                약관 및 정책
                <uu-ic size="16" name="arrow_right_gray" />
              </uu-button>
            </li>
            <li>
              <uu-button @click="onClickTermPage('개인정보 처리방침', 'https://maas.tmoney.co.kr/terms/?privacy')">
                개인정보 처리방침
                <uu-ic size="16" name="arrow_right_gray" />
              </uu-button>
            </li>
            <li>
              <uu-button @click="onClickPageRouterPush('/app-setting/open-source-license')">
                오픈소스 라이선스
                <uu-ic size="16" name="arrow_right_gray" />
              </uu-button>
            </li>
            <li>
              <uu-button href="/app-setting/legal-notice-and-info-provider">
                법적 공지/정보 제공처
                <uu-ic size="16" name="arrow_right_gray" />
              </uu-button>
            </li>
            <li>
              <uu-button
                @click="sendAdbrix(AdbrixEvtId.setBusiness), router.push({ path: '/app-setting/business-info' })"
              >
                사업자 정보
                <uu-ic size="16" name="arrow_right_gray" />
              </uu-button>
            </li>
            <li>
              <p>버전 정보</p>
              <p>Ver. {{ authStore.getAuthInfo.appVer + ' / ' + authStore.getAuthInfo.appVerCode }}</p>
            </li>
          </ul>
        </div>
      </round-box>
    </div>
  </main>
  <marketing-agreement-popup
    :isShowPopup="isShowPopup"
    :title="title"
    :message="message"
    :okBtnLabel="okBtnLabel"
    :closeBtnLabel="closeBtnLabel"
    @ok="setMarketingAgreement"
    @isClose="isShowPopup = false"
  />
  <marketing-agreement-detail-popup
    :isShowPopup="marketingAgreementDetail"
    @isClose="marketingAgreementDetail = false"
  />
  <!-- // main -->
</template>

<script setup lang="ts">
import MarketingAgreementPopup from '@/views/app-setting/components/MarketingAgreementPopup.vue';
import MarketingAgreementDetailPopup from '@/views/app-setting/components/MarketingAgreementDetail.vue';
import { computed, onMounted, ref } from 'vue';
import { useAppSetting } from '@/service/app-setting/appSettingModule';
import { useAuthStore } from '@/service/auth/authModule';
import { formatDate } from '@/utils/dateUtils';
import { getAppBridge } from '@/utils';
import { useRouter } from 'vue-router';

import { sendAdbrix } from '@/utils/sendAdbrixUtil';
import { AdbrixEvtId } from '@/utils/hybrid/type';

const router = useRouter();
const settingStore = useAppSetting();
const authStore = useAuthStore();

const marketingAgreementDetail = ref(false); // 마케팅 정보 수신 동의 약관 팝업
const isShowPopup = ref(false); // 마케팅 정보 수신 동의/해지 확인 팝업
const title = ref(''); // 수신 동의/해지 확인 팝업 title
const message = ref(''); // 수신 동의/해지 확인 팝업 message
const okBtnLabel = ref(''); // 수신 동의/해지 확인 팝업 ok 버튼 label
const closeBtnLabel = ref(''); // 수신 동의/해지 확인 팝업 close 버튼 label

const marketingAgreementYn = computed(() => settingStore.marketingAgreementInfo.mrkgRcvYn == 'Y'); // 마케팅 수신여부 Y

// 회원 수신 동의 정보
async function getMarketingAgreementInfo() {
  const param = {
    inqrDtm: formatDate(new Date(), 'YYYYMMDDHHmmss')
  };
  await settingStore.setMarketingAgreementInfo(param);
}

// 마케팅 정보 수신 동의 약관 상세
function onClickMarketingAgreementDetailPage() {
  marketingAgreementDetail.value = true;
}

// 페이지 이동
const onClickPageRouterPush = (path: string) => {
  router.push({
    path: path
  });
};

// 약관 상세
async function onClickTermPage(title: string, url: string) {
  // openView 브릿지 호출
  const appBridge = await getAppBridge();
  await appBridge.openView({
    url: url,
    headerTitle: title,
    viewType: 'in'
  });
}

// 회원 수신 동의 정보 변경 요청
async function updateMarketingAgreement(mrkgRcvYn: string) {
  const param = {
    mrkgRcvYn: mrkgRcvYn
  };
  await settingStore.updateMarketingAgreement(param);
}

// 회원 수신 동의 정보 변경
const setMarketingAgreement = async () => {
  const appBridge = await getAppBridge();
  if (marketingAgreementYn.value) {
    // 마케팅 정보 수신 동의
    updateMarketingAgreement('N');
    isShowPopup.value = false;
    settingStore.marketingAgreementInfo.mrkgRcvYn = 'N';
    await appBridge.showToast({
      message: `[티머니GO] 마케팅 수신동의 여부가 수신 거부로 처리되었습니다.(${formatDate(new Date(), 'YYYY.MM.DD')})`
    });
  } else {
    // 마케팅 정보 수신 거부
    updateMarketingAgreement('Y');
    isShowPopup.value = false;
    settingStore.marketingAgreementInfo.mrkgRcvYn = 'Y';
    await appBridge.showToast({
      message: `[티머니GO] 마케팅 수신동의 여부가 수신 동의로 처리되었습니다.(${formatDate(new Date(), 'YYYY.MM.DD')})`
    });
  }
};

// 수신동의/해지 click
function onClickMarketingStateChanged() {
  if (!authStore.getIsLogin) {
    return;
  }
  if (!marketingAgreementYn.value) {
    title.value = '마케팅 정보 알림을 위해 마케팅<br> 정보 수신을 동의하시겠습니까?';
    message.value = '';
    okBtnLabel.value = '네, 동의합니다';
    closeBtnLabel.value = '아니오';
    isShowPopup.value = true;
  } else {
    title.value = '마케팅 정보를 수신을<br> 해지하시겠습니까?';
    message.value = '마케팅 정보를 수신하시면 다양한 혜택정보를 받아보실 수 있습니다.';
    okBtnLabel.value = '네, 해지합니다';
    closeBtnLabel.value = '아니오';
    isShowPopup.value = true;
  }
}

onMounted(() => {
  if (authStore.getIsLogin) {
    getMarketingAgreementInfo();
  }
});
</script>
