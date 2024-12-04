<template>
  <main-header
    :mbrNm
    :hide-icon="!isLogin"
    @onClickMoveMbrInfo="
      isLogin
        ? (sendAdbrix(AdbrixEvtId.mProfile), onClickMovePage('/member/member-info'))
        : (sendAdbrix(AdbrixEvtId.mProfile), onClickOpenLoginPage())
    "
    @onClickMoveAppSetting="onClickMovePage('/app-setting/setting'), sendAdbrix(AdbrixEvtId.mSetting)"
  />
  <!-- main -->
  <main id="main" class="main mor">
    <div class="container bg_white pt12">
      <div class="app_bar">
        <div class="top">
          <ul class="my_mileage">
            <li>
              <uu-button class="btn_point" :disabled="!isLogin" @click="onClickMovePage('/mileage/mileage-history')"
                ><span class="sort">GO마일리지</span>
                <span>
                  {{ formatAmount(mbrMileageCouponCntInfo.GoMlgAmt || 0) }}
                  <span aria-hidden="true">M</span>
                  <span class="sr_only">마일리지</span>
                </span>
              </uu-button>
            </li>
            <li>
              <uu-button class="btn_point" :disabled="!isLogin" @click="onClickMovePage('/coupon/coupon-list')"
                ><span class="sort">쿠폰</span>
                <span>{{ formatAmount(mbrMileageCouponCntInfo.cpnPsnCnt || 0) }}</span>
                <span class="sr_only">개</span>
              </uu-button>
            </li>
          </ul>
        </div>
        <div class="bottom">
          <uu-button
            :disabled="!isLogin"
            @click="sendAdbrix(AdbrixEvtId.tapMoreTpc), onClickMovePage('tmoneytia://reward/main')"
            btn-style="none"
            label="교통카드 등록 혜택"
          />
          <uu-button
            :disabled="!isLogin"
            @click="onClickMovePage('/invite/friend')"
            btn-style="none"
            label="친구 초대하기"
          />
        </div>
      </div>
      <div class="navi_area">
        <uu-button
          btn-style="none"
          label="알림"
          :disabled="!isLogin"
          @click="onClickMovePage('/notification/notification-list'), sendAdbrix(AdbrixEvtId.mPush)"
        >
          <div class="icon_with_notification">
            <uu-ic size="32" name="alarm" />
            <div class="notification_circle" v-if="unConfirmedNotiCntInfo.noReadNtfcCnt > 0">
              <span class="notification_number">{{
                displayNotificationCount(unConfirmedNotiCntInfo.noReadNtfcCnt)
              }}</span>
            </div>
          </div>
          <div class="text_icon_container">
            <span>알림</span>
          </div>
        </uu-button>
        <uu-button
          btn-style="none"
          label="공지사항"
          @click="onClickMovePage('/notice/notice-list'), sendAdbrix(AdbrixEvtId.mNotice)"
        >
          <div class="icon-container">
            <uu-ic size="32" name="notice" />
            <uu-ic class="notice_new_icon" size="16" name="notice_new" v-if="unConfirmedNoticeYn === 'Y'" />
          </div>
          <div class="text_icon_container">
            <span>공지사항</span>
          </div>
        </uu-button>
        <uu-button
          v-for="(navi, index) in naviIconBtn"
          :key="index"
          btn-style="none"
          :label="navi.label"
          :disabled="navi.disabled"
          @click="onClickMovePage(navi.url), sendAdbrix(navi.eventId)"
        >
          <uu-ic size="32" :name="navi.icName" />

          <div class="text_icon_container">
            <span>{{ navi.label }}</span>
          </div>
        </uu-button>
      </div>
      <hr class="line" role="presentation" />
      <div v-for="list in menuListGroup" :key="list.title" class="menu_area">
        <h3 class="sub_title">
          {{ list.title }}
        </h3>
        <ul class="list_wrap">
          <li v-for="btn in list.item" :key="btn.name">
            <div v-if="getIsShowMenu(btn.isDevMenu)">
              <uu-button btn-style="none" :disabled="!isLogin" @click="onClickMovePage(btn.url, btn.param)">
                <span>{{ btn.name }}</span>
                <uu-ic size="24" name="navi_right" />
              </uu-button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <uu-floating @click="onClickOpenChatBot" always :pos="{ right: 20, bottom: 20 }">
      <template #ic>
        <uu-ic name="chat" size="20" />
        <span class="sr_only">카카오톡 채널 웹 페이지로 이동</span>
      </template>
    </uu-floating>
  </main>
  <!-- // main -->
</template>

<script setup lang="ts">
import { useMoreMainStore } from '@/service/main/moreMainModule';
import { useAuthStore } from '@/service/auth/authModule';
import { computed, onMounted, ref } from 'vue';
import { formatDate } from '@/utils/dateUtils';
import mainHeader from '@/components/layout/MainHeader.vue';
import uuIc from '@/components/uu-components/UuIc.vue';
import uuButton from '@/components/uu-components/UuButton.vue';
import uuFloating from '@/components/uu-components/UuFloating.vue';
import { useRouter } from 'vue-router';
import { encodeUriRouterPath } from '@/utils/linkUtils';
import { getAppBridge } from '@/utils';
import { VerifyType } from '@/utils/hybrid/etc/etc.type';
import { formatAmount } from '@/utils/amountUtils';
import { AdbrixEvtId, FlexResponseCode } from '@/utils/hybrid/type';
import { sendAdbrix } from '@/utils/sendAdbrixUtil';
import { checkAppVersion } from '@/utils/validateUtil';
import { isMobileApp } from '@/utils/is';

const moreMainStore = useMoreMainStore();
const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  getUnConfirmedNotiCntInfo(); // 미확인 알림 수 조회
  getMbrMileageCouponCntInfo(); // 회원 마일리지, 쿠폰 정보 조회
  unConfirmedNoticeCntInfo(); // 미확인 공지 알림 조회

  await checkAppMode(); // 앱 모드 확인
  
  // 본인인증 정보 조회(앱일때만 작동하도록 수정)
  if(isMobileApp()) {
    await authStore.getAuthTokenAction();
  }

});

// 페이지 이동
const onClickMovePage = (link: string, param?: { [key: string]: string }) => {
  router.push({ path: encodeUriRouterPath(link), query: param });
};

// 로그인 페이지 이동
const onClickOpenLoginPage = async () => {
  const minVersion = '2.4.5'; // 앱 최소버전
  const currVer = authStore.getAuthInfo.appVer;
  const checkVersion = checkAppVersion(minVersion, currVer);
  if(checkVersion) { // 2.4.5 버전 이상이라면 로그인페이지로 이동
    authStore.setPreVerification('M');
    router.push({path:'/verification'});
  }else{ // 아니라면 pass 호출
    const appBridge = await getAppBridge();
    await appBridge.callIdentityVerify({
      verifyType: VerifyType.SING_UP
    });
  }
};

/**
 * 상단 앱바(회원명, 회원정보, 설정)
 */
const isLogin = computed(() => authStore.getIsLogin); // 로그인 여부
const mbrNm = computed(() => (isLogin.value ? authStore.getAuthInfo.mbrNm + '님' : '회원가입 / 로그인')); // 회원정보

/**
 * 마일리지, 쿠폰 정보
 */
// 회원 마일리지, 쿠폰 정보 조회
const getMbrMileageCouponCntInfo = async () => {
  if (!isLogin.value) {
    return;
  }
  const param = {
    atncChkYn: 'N', // ATNC 체크 여부
    cpnChkYn: 'Y', // 쿠폰 체크 여부
    dotChkYn: 'N', // 도트 체크 여부
    goMlgChkYn: 'Y', // GO 마일리지 체크 여부
    offwallMlgChkYn: 'N', // 오프월 마일리지 체크 여부
    tMlgInqrYn: 'N', // T 마일리지 조회 여부
    trPrwnCpnYn: 'N' // TR 프라운 쿠폰 여부
  };

  await moreMainStore.setMbrMileageCouponCntInfoAction(param);
};

const mbrMileageCouponCntInfo = computed(() => moreMainStore.getMbrMileageCouponCntInfo); // 마일리지, 쿠폰 정보

/**
 * 마일리지, 쿠폰 하단 아이콘 네비게이션
 */
interface naviIconBtnType {
  label: string;
  icName: string;
  url: string;
  disabled: boolean;
  eventId: string;
}
const naviIconBtn: naviIconBtnType[] = [
  { label: '이벤트', icName: 'event', url: '/event/event-list', disabled: false, eventId: AdbrixEvtId.mEvent },
  { label: '고객지원', icName: 'support', url: '/customer-support/main', disabled: false, eventId: AdbrixEvtId.mCs }
];

// 미확인 알림 수 조회
const unConfirmedNotiCntInfo = computed(() => moreMainStore.getUnConfirmedNotiCntInfo); // 미확인알림 정보

function displayNotificationCount(count: number) {
  return count >= 99 ? '99' : count.toString();
}

const getUnConfirmedNotiCntInfo = async () => {
  if (!isLogin.value) {
    return;
  }
  const param = {
    inqrtDtm: formatDate(new Date(), 'YYYYMMDDHHmmss')
  };
  const alarm = await moreMainStore.setUnConfirmedNotiCntInfoAction(param);

  const checkVersion = checkAppVersion('2.4.5', authStore.authInfo.appVer);
  if (checkVersion) {
    if (alarm.rspCd === '0000' && alarm.noReadNtfcCnt) {
    //푸시 미확인 알림 업데이트 브릿지 호출
    const appBridge = await getAppBridge();
      await appBridge.setBadgeCount({
        noReadNtfcCnt: alarm.noReadNtfcCnt
      });
    }
  }
};

// 미확인 공지사항 수 조회
const unConfirmedNoticeYn = ref('N');
const unConfirmedNoticeCntInfo = async () => {
  const appBridge = await getAppBridge();
  const resUnConfirmedNoticeCnt = await appBridge.callAppPreference({ type: 'get', key: 'noticeRedDotYn', value: '' });
  if (resUnConfirmedNoticeCnt && resUnConfirmedNoticeCnt.response.code === FlexResponseCode.OK) {
    unConfirmedNoticeYn.value = resUnConfirmedNoticeCnt.value;
  }
};

/**
 * 메뉴 네이게이션(결제, GO마일리지)
 */
interface menuListGroupType {
  title: string;
  item: menuListType[];
}
interface menuListType {
  name: string;
  url: string;
  isDevMenu: boolean;
  param?: {
    [key: string]: string;
  };
}

const menuListGroup: menuListGroupType[] = [
  {
    title: '결제',
    item: [
      { name: '결제 수단 관리', url: '/payment/payment-manage', isDevMenu: false },
      { name: '결제 내역', url: '/payment/payment-history', isDevMenu: false },
      // TODO 삭제 개발용 페이지
      { name: '개발용_이용 내역', url: '/usage-history/list', isDevMenu: true }
    ]
  },
  {
    title: 'GO마일리지',
    item: [
      { name: 'GO마일리지 내역 조회', url: '/mileage/mileage-history', isDevMenu: false },
      { name: 'GO마일리지 전환', url: '/mileage/mileage-exchange-main', isDevMenu: false },
      {
        name: 'GO마일리지 적립 및 사용안내',
        url: '/event/event-detail',
        isDevMenu: false,
        param: { staCd: '2', scrnId: 'SCRN20230605001', isUseScrnNm: 'true' }
      },
      // TODO 삭제 개발용 페이지
      {
        name: '개발용_환승리워드',
        url: '/transfer-reward/transfer-history',
        isDevMenu: true
      },
      {
        name: '개발용_운송중개인트로',
        url: '/travel',
        isDevMenu: true
      },
      {
        name: '개발용_브릿지테스트',
        url: '/sample/bridge-test',
        isDevMenu: true
      },
      {
        name: '개발용_친구초대',
        url: '/invite/friend',
        isDevMenu: true
      }
    ]
  }
];

// 챗봇 열기(외부브라우져)
const onClickOpenChatBot = async () => {
  const appBridge = await getAppBridge();
  await appBridge.openView({
    url: 'https://pf.kakao.com/_zuLxexl/chat',
    viewType: 'ex'
  });
};

// 앱 모드 확인. 앱모드를 확인하여 개발자 테스트 메뉴를 노출한다. 운영환경에서 디버깅을 위해 사용하므로 빌드환경없을 확인 안함
const isDebugAppMode = ref(false);
const checkAppMode = async () => {
  const appBridge = await getAppBridge();
  const resAppMode = await appBridge.getAppMode();
  if (resAppMode.response.code === FlexResponseCode.OK) {
    isDebugAppMode.value = resAppMode.isDebugAppMode;
  }
};

// 개발자 테스트 메뉴 노출 여부
const getIsShowMenu = (isDevMenu: boolean) => {
  if (isDevMenu) {
    return isDebugAppMode.value;
  }
  return true;
};
</script>

<script lang="ts">
export default {
  name: 'moreMain',
  inheritAttrs: false,
  customOptions: {}
};
</script>
