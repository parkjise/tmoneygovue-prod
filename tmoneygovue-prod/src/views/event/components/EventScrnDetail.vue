<template>
  <div v-for="(item, index) in webviewScrnDetail" :key="index">
    <!-- 이미지-->
    <template v-if="item.scrnMrkDvsCd === 'I'">
      <a v-if="item.imgUrlAddr" style="display: flex" @click="setHref(item.imgUrlAddr, item.scrnNm)">
        <img
          :src="`${getEventDetailInfo.imgLinkUrl}${item.imgPathVal}`"
          :alt="item.scrnNm"
          style="width: 100%; height: 100%; display: block"
        />
      </a>
      <img
        v-else
        :src="`${getEventDetailInfo.imgLinkUrl}${item.imgPathVal}`"
        :alt="item.scrnNm"
        style="width: 100%; height: 100%; display: block"
      />
    </template>
    <!-- //이미지-->
    <!-- 텍스트-->
    <template v-else-if="item.scrnMrkDvsCd === 'T'">
      <div style="position: relative; display: flex">
        <a v-if="item.imgUrlAddr" :href="item.imgUrlAddr" style="display: flex">
          <img
            :src="`${getEventDetailInfo.imgLinkUrl}${item.imgPathVal}`"
            :alt="item.scrnNm"
            style="width: 100%; height: 100%"
          />
          <div style="position: absolute; top: 10%; width: 100%; padding: 10px">
            {{ item.blthCtt }}
          </div>
        </a>
      </div>
    </template>
    <!-- //텍스트-->
  </div>
  <!-- 이벤트 약관 동의 -->
  <EventTermsPopup :isShowTerm="isShowTermPopup" @agree="agreeCallback" @close="isShowTermPopup = false" />
</template>

<script setup lang="ts">
import { useEventStore } from '@/service/event/eventModule';
import EventTermsPopup from './EventTermsPopup.vue';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import _ from 'lodash-es';
import { useRouter } from 'vue-router';
import { encodeUriRouterPath } from '@/utils/linkUtils';
import { useAuthStore } from '@/service/auth/authModule';
import { useCommonStore } from '@/service/common/commonModule';

const router = useRouter();
const authStore = useAuthStore();
const eventStore = useEventStore();
const { getEventStplInfo, getEventDetailInfo } = storeToRefs(eventStore);

const webviewScrnDetail = computed(() => {
  return getEventDetailInfo.value.webviewScrnDetail;
});

const stplYn = ref('N'); // 약관동의 여부
const isShowTermPopup = ref(false);
let stplSno = ''; // 약관번호
let link = '';

const setHref = async (imgUrlAddr: string, scrnNm: string) => {
  if (imgUrlAddr.indexOf('stplYn=Y') > 0 && imgUrlAddr.indexOf('stplSno=') > 0) {
    // 약관동의 필요
    stplYn.value = 'Y';
    return stplCheck(imgUrlAddr);
  } else {
    if (imgUrlAddr != null && imgUrlAddr != undefined) {
      // tmoneytia://xingxing/main
      // tmoneytia://mileage/history"
      const commonStore = useCommonStore();
      commonStore.setRouterHeaderTitle(scrnNm || null);
      router.push({ path: encodeUriRouterPath(imgUrlAddr) });
    }
  }
};

// 약관동의
const stplCheck = async (imgUrlAddr: string) => {
  link = imgUrlAddr.substring(0, imgUrlAddr.indexOf('.do') + 3) + '?token=_TOKEN_';
  stplSno = imgUrlAddr.substring(imgUrlAddr.indexOf('stplSno=') + 8, imgUrlAddr.indexOf('token=') - 1);

  const param = {
    moappMbrsSno: authStore.getAuthInfo.moappMbrsSno || '',
    stplSno: stplSno // "20240411000000000604|20240411000000000605"
  };
  const res = await eventStore.requestEventStplInfo(param);
  if (res.rspCd === '0000') {
    const nList = _.filter(getEventStplInfo.value, { stplAgrmYn: 'N' });
    if (nList.length > 0) {
      isShowTermPopup.value = true;
    } else {
      router.push({ path: encodeUriRouterPath(link) });
    }
  }
};

// 약관동의 정보 저장
const agreeCallback = async () => {
  isShowTermPopup.value = false;
  const param = {
    moappMbrsSno: authStore.getAuthInfo.moappMbrsSno || '',
    stplSno: stplSno // "20240411000000000604|20240411000000000605"
  };
  const res = await eventStore.requestEventTermsAgree(param);
  if (res?.rspCd === '0000') {
    //console.log(getEventDetailInfo.value.scrnNm)
    // tmoneytia://web?in=https://tiaapid.tmoney.co.kr:6070/webview/hanil/express/v1/mainView.do?token=_TOKEN_
    router.push({ path: encodeUriRouterPath(link) });
  }
};
</script>
