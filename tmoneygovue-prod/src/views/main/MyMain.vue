<template>
  <!-- header -->
  <sub-header title="마이" hide-back />
  <!-- // header -->
  <!-- main -->
  <main id="main" class="main miy">
    <div class="container">
      <div class="main_area">
        <round-box
          v-for="myScrnMrk in myScrnMrkList"
          :key="myScrnMrk.svcCd"
          :class="roundBoxClass(myScrnMrk.svcCd)"
          :padding="roundBoxPadding(myScrnMrk.svcCd)"
          :style="roundBoxStyle(myScrnMrk)"
          hide-title
        >
          <!-- 마일리지 카드 영역 START -->
          <my-main-mileage
            v-if="myScrnMrk.svcCd == 'U0'"
            :myMileageScrnMrk="myScrnMrk"
            @onClickMovePage="onClickMovePage"
          />
          <!-- 마일리지 카드 영역 END -->
          <my-main-use-type
            v-else-if="myScrnMrk.svcCd == 'T0'"
            :myUseTypeScrnMrk="myScrnMrk"
            @onClickMovePage="onClickMovePage"
          />
          <!-- ESG 캠페인 카드 영역 START -->
          <my-main-esg-campaign
            v-else-if="myScrnMrk.svcCd == 'E0'"
            :esgCampaignScrnMrk="myScrnMrk"
            @onClickMovePage="onClickMovePage"
          ></my-main-esg-campaign>
          <!-- ESG 캠페인 카드 영역 END -->
          <!-- 티머니GO 교통비 카드 영역 START -->
          <my-main-trafic-fee
            v-else-if="myScrnMrk.svcCd == 'C0'"
            :myTraficFeeScrnMrk="myScrnMrk"
            @onClickMovePage="onClickMovePage"
          />
          <!-- 티머니GO 교통비 카드 영역 END -->
          <!-- 티머니GO 총 이동거리 START -->
          <my-main-sum-distance
            v-else-if="myScrnMrk.svcCd == 'D0'"
            :mySumDistanceScrnMrk="myScrnMrk"
            :myMvmnDistance="myMvmnDistance"
            @onClickMovePage="onClickMovePage"
          />
          <!-- 티머니GO 총 이동거리 END -->
          <!-- 티머니GO 분석한 월별 교통비 카드 영역 START-->
          <my-main-use-report
            v-else-if="myScrnMrk.svcCd == 'R0'"
            :useReportScrnMrk="myScrnMrk"
            @onClickMovePage="onClickMovePage"
          />
          <!-- 티머니GO 분석한 월별 교통비 카드 영역 END-->
        </round-box>

        <Transition name="btn-ani">
          <div v-if="isShowTraficRegistBtn" class="btn_area">
            <uu-button @click="sendAdbrix(AdbrixEvtId.tapMyTpc), onClickMovePage('tmoneytia://reward/main', null)">
              <img
                src="/assets/images/button/button_regist_card.png"
                alt="교통카드 등록 후 더 많은 정보화 혜택을 받아보세요."
              />
              <uu-button class="btn_close">
                <uu-ic size="24" name="close_white" />
              </uu-button>
            </uu-button>
          </div>
        </Transition>
        <div ref="bottomObserverRef" class="bottom_observer"></div>
      </div>
    </div>
  </main>
  <!-- // main -->
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue';
import subHeader from '@/components/layout/SubHeader.vue';
import RoundBox from '@/components/layout/RoundBox.vue';
import UuButton from '@/components/uu-components/UuButton.vue';
import UuIc from '@/components/uu-components/UuIc.vue';
import { useIntersectionObserver } from '@vueuse/core';
import { useMyMainStore } from '@/service/main/myMainModule';
import { encodeUriRouterPath } from '@/utils/linkUtils';
import { useRouter } from 'vue-router';
import MyMainMileage from './components/MyMainMileage.vue';
import MyMainUseType from './components/MyMainUseType.vue';
import MyMainEsgCampaign from './components/MyMainEsgCampaign.vue';
import MyMainTraficFee from './components/MyMainTraficFee.vue';
import MyMainSumDistance from './components/MyMainSumDistance.vue';
import MyMainUseReport from './components/MyMainUseReport.vue';
import { useCommonStore } from '@/service/common/commonModule';
import type { myScrnMrkListModel } from '@/service/main/model/myMainModel';
import { formatAmount } from '@/utils/amountUtils';
import { useAuthStore } from '@/service/auth/authModule';
import { storeToRefs } from 'pinia';
import { useRegistTrafficCardStore } from '@/service/regist-traffic-card/registTrafficCardModule';
import { formatDate } from '@/utils/dateUtils';

import { AdbrixEvtId } from '@/utils/hybrid/type';
import { sendAdbrix } from '@/utils/sendAdbrixUtil';

const myMainStore = useMyMainStore();
const authStore = useAuthStore();
const trafficStore = useRegistTrafficCardStore();
const router = useRouter();

const isLogin = computed(() => authStore.getIsLogin); // 로그인 여부

const { registeredTrafficCnt } = storeToRefs(trafficStore);

// 마이 서비스 정보 조회
const getmyServiceSettingInfo = async () => {
  if (!isLogin.value) {
    return;
  }
  // 마이 서비스 정보가 기존에 조회되었으면 조회하지 않음
  if (myMainStore.getmyServiceSettingInfo.rspCd === '0000') {
    return;
  }

  await myMainStore.setMyServiceSettingInfoAction();
};

// 마이 서비스 목록
const myScrnMrkList = computed(() => {
  return myMainStore.myServiceSettingInfo.myScrnMrkList;
});

// 나의 총 이동 거리
const myMvmnDistance = computed(() => {
  return formatAmount(myMainStore.myServiceSettingInfo.myMvmnDist);
});

// 페이지 이동
const onClickMovePage = (link: string, headerTitle?: string | null) => {
  const commonStore = useCommonStore();
  commonStore.setRouterHeaderTitle(headerTitle || null);
  router.push({ path: encodeUriRouterPath(link) });
};

const roundBoxClass = (svcCd: string) => {
  if (svcCd == 'R0') {
    return 'report';
  } else if (svcCd == 'E0') {
    return 'tree';
  }
  return '';
};

const roundBoxPadding = (svcCd: string) => {
  if (svcCd == 'E0') {
    return '2rem 2rem 5.3rem';
  }
  return '2rem';
};

const roundBoxStyle = (myScrnMrk: myScrnMrkListModel) => {
  if (myScrnMrk.svcCd == 'R0') {
    return {
      background: `linear-gradient(180deg, ${myScrnMrk.scrnMrkSttLrCd} 0%, ${myScrnMrk.scrnMrkEndLrCd} 100%)`
    };
  }
};
/**
 * 교통 카드등록 화면이동 버튼 영역. 노출 여부 처리
 * esg캠페인 영역이 보였을떄 버튼 노출. 30% 이상 보였을때 버튼 노출
 */
const bottomObserverRef = ref<HTMLElement | null | undefined>();
const isShowTraficRegistBtn = ref(false);
const bottomObserver = useIntersectionObserver(
  bottomObserverRef,
  ([{ isIntersecting }]) => {
    isShowTraficRegistBtn.value =
      isIntersecting && registeredTrafficCnt.value.dpcCnt < 1 && registeredTrafficCnt.value.prcrCnt < 1;
  },
  { threshold: 0.3 }
);

onMounted(async () => {
  // 마이 서비스 정보 조회
  await getmyServiceSettingInfo();
  // 교통카드 불러오기
  await trafficStore.requestRegisteredTrafficCardCnt(formatDate(new Date(), 'YYYYMMDDHHmmss'));
  nextTick(() => {
    // dom이 업데이트 되기전에 하단 영역이 노출되어 observer intersect가 안되게 하기 위해 초기에 none로 처리. 렌더링 된 후 block
    if (bottomObserverRef.value) {
      bottomObserverRef.value.style.display = 'block';
    }
  });
});

onUnmounted(() => {
  // 하단 교통카드 등록 카드 observer stop
  bottomObserver.stop();
});
</script>
