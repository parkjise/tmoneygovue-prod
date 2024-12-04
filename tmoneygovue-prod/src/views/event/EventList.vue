<template>
  <sub-header title="이벤트" />
  <main id="main" class="main mor" tabindex="0">
    <div class="container bg_white no_padding">
      <div class="notice_area event">
        <uu-button v-for="item in eventList" :key="item.evntSno" @click="onClickDetail(item)">
          <span class="text_wrap">
            <span class="title" style="margin-right: 1.2rem">{{ item.evntTtlNm }}</span>
            <div class="date">
              <span :aria-label="formatA11yDateTime(item.evntSttDt)"> {{ item.evntSttDt }}</span>
              <span> ~ </span>
              <span :aria-label="formatA11yDateTime(item.evntEndDt)"> {{ item.evntEndDt }} </span>
            </div>
          </span>
          <span class="img_wrap">
            <img :src="item.evntMainImgPathVal" :alt="item.evntTtlNm" />
          </span>
        </uu-button>
      </div>
    </div>
  </main>
  <!-- 로그인 팝업 -->
  <EventLoginPopup :isShowPopup="isShowLoginPopup" @login="loginCallback" @close="isShowLoginPopup = false" />
</template>

<script setup lang="ts">
import EventLoginPopup from './components/EventLoginPopup.vue';
import { useEventStore } from '@/service/event/eventModule';
import { computed, onMounted, ref } from 'vue';
import { formatDate } from '@/utils/dateUtils';
import { storeToRefs } from 'pinia';
import type { eventInfo } from '@/service/event/model/eventModel';
import { useAuthStore } from '@/service/auth/authModule';
import { useRouter } from 'vue-router';
import { encodeUriRouterPath } from '@/utils/linkUtils';
import { getAppBridge } from '@/utils';
import { logger } from '@/utils/logger';
import { useCommonStore } from '@/service/common/commonModule';
import { VerifyType } from '@/utils/hybrid/etc/etc.type';
import { checkAppVersion } from '@/utils/validateUtil';
import { formatA11yDateTime } from '@/utils/dateUtils';

const router = useRouter();
const authStore = useAuthStore();
const eventStore = useEventStore();
const { getEventList } = storeToRefs(eventStore);

const eventList = computed(() => {
  return getEventList.value;
});
const isLogin = computed(() => authStore.getIsLogin); // 로그인 여부
const isShowLoginPopup = ref(false);

onMounted(async () => {
  const param = {
    TAG: '[RequestAppEvent]',
    evntDvsCd: '',
    inqrDtm: formatDate(new Date(), 'YYYYMMDDHHmmss')
  };
  await eventStore.requestEventList(param); // 이벤트 목록 api
});

// 이벤트 상세화면으로 이동
const onClickDetail = async (item: eventInfo) => {
  const getConcScrnDvsCd = item.concScrnDvsCd == '' ? '0' : item.concScrnDvsCd;
  let url = item.evntUrlAddr; // 이벤트URL 주소

  if (url !== undefined && url != null) {
    if (url.indexOf('_TOKEN_') != -1) {
      // url에 _TOKEN_ 있는 경우 -> token으로 바꿔줌
      const token = authStore.getToken;
      url = url.replace('_TOKEN_', token);
    }
  }

  if (item.authTknNedYn === 'Y' && !isLogin.value) {
    // 인증토큰 필요
    isShowLoginPopup.value = true;
  } else {
    if (item.listLinkUseYn === 'Y') {
      // 목록링크사용여부
      if (getConcScrnDvsCd === '1') {
        logger.debug('웹뷰');
        // 1: 웹뷰
        const commonStore = useCommonStore();
        commonStore.setRouterHeaderTitle(item.evntTtlNm || null);
        router.push({ path: encodeUriRouterPath(url), query: { viewType: 'in' } });
      } else {
        // 0: 아웃링크
        logger.debug('아웃링크 브릿지 호출');
        const commonStore = useCommonStore();
        commonStore.setRouterHeaderTitle(item.evntTtlNm || null);
        await router.push({ path: encodeUriRouterPath(url), query: { viewType: 'ex' } });
      }
    } else {
      router.push({ path: '/event/event-detail', query: { sno: item.evntSno } });
    }
  }
};

const loginCallback = async () => {
  isShowLoginPopup.value = false;
  // 로그인 페이지 이동
  const minVersion = '2.4.5'; // 앱 최소버전
  const currVer = authStore.getAuthInfo.appVer;
  const checkVersion = checkAppVersion(minVersion, currVer);
  if(checkVersion) { // 2.4.5 버전 이상이라면 로그인페이지로 이동
    router.push({path:'/verification'});
  }else{ // 아니라면 pass 호출
    const appBridge = await getAppBridge();
    await appBridge.callIdentityVerify({
      verifyType: VerifyType.SING_UP
    });
  }
};
</script>
