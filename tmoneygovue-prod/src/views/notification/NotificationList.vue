<template>
  <!-- header -->
  <sub-header title="알림" />
  <!-- // header -->
  <!-- main -->
  <main id="main" class="main mor">
    <div class="container">
      <div class="alarm">
        <template v-if="getNotificationList.length > 0">
          <uu-button
            v-for="(item, index) in getNotificationList.slice().reverse()"
            :key="index"
            @click="clickGotoLink(item)"
          >
            <span class="text_wrap">
              <span class="title">{{ item.ntfcTtlNm }}</span>
              <span class="desc">{{ item.ntfcBody }}</span>
              <span class="info">
                <span class="category">{{ setServiceName(item.appNtfcDvsCd) }}</span>
                <span class="date">{{ formatDate(item.dsptDtm, 'YYYY.MM.DD HH:mm') }}</span>
              </span>
            </span>
            <uu-ic v-if="item.lckMvmnVal" size="16" name="arrow_right_gray" />
          </uu-button>
        </template>
        <template v-else>
          <div class="no_data">
            <uu-ic size="48" name="exclamation" />
            <p>알림 내역이 없습니다.</p>
          </div>
        </template>
      </div>
    </div>
  </main>
  <!-- // main -->
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useNotificationStore } from '@/service/notification/notificationModule';
import { formatDate } from '@/utils/dateUtils';
import { storeToRefs } from 'pinia';
import { encodeUriRouterPath } from '@/utils/linkUtils';
import router from '@/router';
import type {
  NotificationModel,
  NotificationSnoData,
  ReqConfirmNotificationModel
} from '@/service/notification/model/notificationModel';
import { useAuthStore } from '@/service/auth/authModule';
import { useCommonStore } from '@/service/common/commonModule';
import { getAppBridge } from '@/utils';

const isLoading = ref<boolean>(false);

const notificationStore = useNotificationStore();
const { getNotificationList } = storeToRefs(notificationStore);
const authStore = useAuthStore();
const { getToken } = storeToRefs(authStore);

async function confirmNotification(data: ReqConfirmNotificationModel) {
  await notificationStore.actionConfirmNotification(data);
}

/**
 * 알림목록 조회
 */
async function requestNotificationList() {
  if (!isLoading.value) {
    isLoading.value = true;

    const res = await notificationStore.actionGetNotificationList(formatDate(new Date(), 'YYYYMMDDHHmmss'));

    let ntfcSnoList: NotificationSnoData[] = [];

    getNotificationList.value.forEach((data) => {
      const item: NotificationSnoData = { ntfcSno: data.ntfcSno };
      ntfcSnoList.push(item);
    });

    // 중복 호출로 주석처리 요청받음(24-11-20)
    // await confirmNotification({ ntfcRcvCfmCd: '1', ntfcSnoList: ntfcSnoList });

    if (res.ntfcList) {
      const appBridge = await getAppBridge();
      await appBridge.resetBadgeCount();
    }

    isLoading.value = false;
  }
}

/**
 * 서비스 명 세팅
 * @param appNtfcDvsCd
 */
const setServiceName = (appNtfcDvsCd: string) => {
  if (appNtfcDvsCd == null) return '이벤트';

  switch (appNtfcDvsCd) {
    case 'T':
      return '자전거';
    case 'X':
      return '킥보드';
    case 'B':
      return '고속시외';
    case 'H':
      return '고속';
    case 'C':
      return '시외';
    case 'O':
      return '온다';
    case 'W':
    case 'GW':
      return '1:1문의';
    default:
      return '티머니GO';
  }
};

/**
 * 알림 링크 이동
 * @param item
 */
const clickGotoLink = async (item: NotificationModel) => {
  let ntfcSnoList: NotificationSnoData[] = [{ ntfcSno: item.ntfcSno }];

  let link: string = item.lckMvmnVal;

  if (item.userCfmYn !== 'Y') {
    if (item.ntfcSno) {
      await confirmNotification({ ntfcRcvCfmCd: '2', ntfcSnoList: ntfcSnoList });
    }
  }

  if (link) {
    if (item.lckMvmnVal.indexOf('_TOKEN_') >= 0) {
      link = link.replace('_TOKEN_', getToken.value);
    }

    // 2024-06-17 SPA 경로 확인 추가
    // 2024-06-20 검증 공통화
    const commonStore = useCommonStore();
    commonStore.setRouterHeaderTitle(item.ntfcTtlNm || null);
    await router.push({ path: encodeUriRouterPath(link) });
  }
};

onMounted(() => {
  confirmNotification({ ntfcRcvCfmCd: '3' });

  requestNotificationList();
});
</script>
