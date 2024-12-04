<template>
  <sub-header title="혜택" hide-back />
  <main id="main" class="main bef">
    <div class="container">
      <!-- 마일리지 -->
      <div class="bef_box">
        <uu-button
          @click="onClickMovePage('/mileage/mileage-history')"
          class="btn_mileage"
          btn-style="none"
          :aria-label="`나의 마일리지 ${formatAmount(mileageAmt || '0')}마일리지 GO마일리지 내역 페이지 이동`"
        >
          <uu-ic size="24" name="mileage" />
          <span class="my_mileage">
            <span class="title">나의 마일리지</span>
            <span class="point_area">
              <span class="mileage">{{ formatAmount(mileageAmt || '0') }}</span>
              <span class="point">M</span>
            </span>
          </span>
          <uu-ic size="24" name="navi_right" />
        </uu-button>
      </div>
      <!-- 출석체크 -->
      <div class="bef_box">
        <uu-button
          @click="
            sendAdbrix(AdbrixEvtId.tapBenefitAttend),
              onClickMovePageAndGetMbrMileage(
                filterdAtnBenefitScrnMrk?.svcImgChcMvmnPath || '',
                filterdAtnBenefitScrnMrk?.svcMvmnTitlNm || null
              )
          "
          class="btn_attend"
          btn-style="none"
          tabindex="0"
        >
          <span class="sr_only">
            이번 달 출석 현황 {{ monthAtncCheckPrcn }}일 중 {{ dayAtncCheckPrcn }}일 출석,
            지금 바로 출석하고 마일리지 받기 페이지 이동
          </span>
          <span class="top" aria-hidden="true">
            <span class="text_area">
              <span class="title">이번 달 출석 현황</span>
              <span class="month_area">
                <span class="attend">{{ dayAtncCheckPrcn }}&nbsp;</span>
                <span class="month">/&nbsp;{{ monthAtncCheckPrcn }}</span>
              </span>
            </span>
            <span class="img_area"
              ><img
                src="/assets/images/img_benefit_attend_check.png"
                role="presentation"
              />
            </span>
          </span>
          <span class="bottom" aria-hidden="true">지금 바로 출석하고 마일리지 받기</span>
        </uu-button>
      </div>
      <!-- 혜택 스크린 목록-->
      <div class="bef_box" v-for="(item, index) in filterdNotAtnBenefitScrnMrkList" :key="index">
        <uu-button @click="onclickBefScrnMrk(item)" class="btn_banner card_regist" btn-style="none" label="banner 영역">
          <span class="img_area"> <img :src="item.svcImgPath" :alt="item.svcImgDescCtt" /></span>
        </uu-button>
      </div>
      <!-- 이벤트 목록-->
      <div class="bef_box" v-for="(item, index) in benefitEvntList" :key="index">
        <uu-button
          @click="onClickMovePage(item.svcImgChcMvmnPath)"
          class="btn_event full"
          btn-style="none"
          :label="item.svcImgNm"
        >
          <span class="img_area">
            <img :src="item.svcImgPath" :alt="item.svcImgNm" />
          </span>
        </uu-button>
      </div>
      <div class="bef_box">
        <uu-button @click="onClickMovePage('/event/event-list')" class="btn_all_event" label="이벤트 전체보기">
          <span>이벤트 전체보기</span>
          <uu-ic size="24" name="navi_right" />
        </uu-button>
      </div>
    </div>
  </main>
  <!-- // main -->
</template>

<script setup lang="ts">
import { useBenefitMainStore } from '@/service/main/benefitMainModule';
import { useAuthStore } from '@/service/auth/authModule';
import { useMoreMainStore } from '@/service/main/moreMainModule';
import { computed, onMounted } from 'vue';
import subHeader from '@/components/layout/SubHeader.vue';
import uuIc from '@/components/uu-components/UuIc.vue';
import uuButton from '@/components/uu-components/UuButton.vue';
import { useRouter } from 'vue-router';
import { encodeUriRouterPath } from '@/utils/linkUtils';
import { getAppBridge } from '@/utils';
import { formatAmount } from '@/utils/amountUtils';
import { useCommonStore } from '@/service/common/commonModule';

import { AdbrixEvtId } from '@/utils/hybrid/type';
import { sendAdbrix } from '@/utils/sendAdbrixUtil';
import type { benefitScrnMrkListModel } from '@/service/main/model/benefitMainModel';

const benefitMainStore = useBenefitMainStore();
const authStore = useAuthStore();
const moreMainStore = useMoreMainStore();
const router = useRouter();

const isLogin = computed(() => authStore.getIsLogin); // 로그인 여부

onMounted(() => {
  getBenefitServiceSettingInfo(); // 혜택 서비스 정보 조회
  getMbrMileageCouponCntInfo(); // 마일리지, 출석 정보 조회
});

// 혜택 서비스 정보 조회
const getBenefitServiceSettingInfo = async () => {
  if (!isLogin.value) {
    return;
  }
  // 혜택 서비스는 1번만 조회 처리
  if (benefitMainStore.benefitServiceSettingInfo?.rspCd !== '0000') {
    await benefitMainStore.setBenefitServiceSettingInfoAction();
  }
};

const onclickBefScrnMrk = (item: benefitScrnMrkListModel) => {
  if (item.svcLocDvsCd === 'C') sendAdbrix(AdbrixEvtId.tapBenefitTpc);
  else if (item.svcLocDvsCd === 'M') sendAdbrix(AdbrixEvtId.tapBenefitOfferWall);
  else if (item.svcLocDvsCd === 'A') sendAdbrix(AdbrixEvtId.tapBenefitAttend);
  onClickMovePage(item.svcImgChcMvmnPath, item.svcMvmnTitlNm);
};

// 페이지 이동
const onClickMovePage = (link: string, headerTitle?: string | null) => {
  const commonStore = useCommonStore();
  commonStore.setRouterHeaderTitle(headerTitle || null);
  router.push({ path: encodeUriRouterPath(link) });
};

// 화면 이동 및 마일리지, 출석 정보 조회
const onClickMovePageAndGetMbrMileage = async (link: string, headerTitle: string | null) => {
  const appBridge = await getAppBridge();
  await appBridge.openView({ url: link, viewType: 'in', headerTitle: headerTitle });

  // 마일리지, 출석 정보 조회
  await getMbrMileageCouponCntInfo();
};

/**
 * 마일리지, 출석 정보
 */
// 회원 마일리지, 쿠폰 정보 조회
async function getMbrMileageCouponCntInfo() {
  if (!isLogin.value) {
    return;
  }
  const param = {
    atncChkYn: 'Y', // 출석 체크 여부
    cpnChkYn: 'N', // 쿠폰 체크 여부
    dotChkYn: 'Y', // 도트 체크 여부
    goMlgChkYn: 'Y', // GO 마일리지 체크 여부
    offwallMlgChkYn: 'N', // 오프월 마일리지 체크 여부
    tMlgInqrYn: 'N', // T 마일리지 조회 여부
    trPrwnCpnYn: 'N' // TR 프라운 쿠폰 여부
  };

  await moreMainStore.setMbrMileageCouponCntInfoAction(param);
}
const mileageAmt = computed(() => moreMainStore.getMbrMileageCouponCntInfo?.GoMlgAmt); // 마일리지 금액
const dayAtncCheckPrcn = computed(() => moreMainStore.getMbrMileageCouponCntInfo?.atncCheckPrcn.split('/')[0]); // 출석현황 데이터
const monthAtncCheckPrcn = computed(() => moreMainStore.getMbrMileageCouponCntInfo?.atncCheckPrcn.split('/')[1]); // 출석현황 데이터

/**
 * 혜택 서비스 정보
 */
const filterdAtnBenefitScrnMrk = computed(() =>
  benefitMainStore.benefitServiceSettingInfo?.benefitScrnMrkList.find((item) => item.svcLocDvsCd === 'A')
); // 출석체크 데이터(스크린 데이터 배열에 구분값으로 필터링해서 처리)
const filterdNotAtnBenefitScrnMrkList = computed(() =>
  benefitMainStore.benefitServiceSettingInfo?.benefitScrnMrkList.filter((item) => item.svcLocDvsCd !== 'A')
); // 출석체크 데이터를 제외한 스크린 데이터

/**
 * 이벤트 정보
 */
const benefitEvntList = computed(() => benefitMainStore.benefitServiceSettingInfo?.benefitEvntList); // 이벤트 목록
</script>

<script lang="ts">
export default {
  name: 'benfitMain',
  inheritAttrs: false,
  customOptions: {}
};
</script>
