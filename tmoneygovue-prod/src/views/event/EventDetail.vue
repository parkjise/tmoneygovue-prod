<template>
  <subHeader :title="title" />
  <main id="main" class="main">
    <div class="container no_padding" v-if="subImgPath != '' || scrnId === undefined" v-show="isImageLoad">
      <img
        :src="subImgPath"
        style="display: block; width: 100%"
        @load="handleImageLoad"
        @click="clickImg"
        :alt="`${title} 상세이미지`"
      />
      <div class="ticket_notice">
        <p class="title">
          <uu-ic size="16" name="exclamation" />
          유의사항
        </p>
        <p class="desc" v-for="item in notes" :key="item">{{ item }}</p>
      </div>
    </div>
    <div class="container no_padding" v-else>
      <EventScrnMaster v-if="isShowDetail" />
      <EventScrnDetail v-if="isShowDetail" />
    </div>
  </main>
</template>

<script setup lang="ts">
import EventScrnMaster from './components/EventScrnMaster.vue';
import EventScrnDetail from './components/EventScrnDetail.vue';
import { useEventStore } from '@/service/event/eventModule';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { formatDate } from '@/utils/dateUtils';
import { useGoMileageStore } from '@/service/mileage/goMileageModule';
import type { RequestEventDtlInfo } from '@/service/event/model/eventModel';
import { encodeUriRouterPath } from '@/utils/linkUtils';
import { useAuthStore } from '@/service/auth/authModule';
import { useCommonStore } from '@/service/common/commonModule';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const eventStore = useEventStore();
const mileageStore = useGoMileageStore();
const { getEventDetailInfo, getEventList } = storeToRefs(eventStore);
const { getMileageGuideInfo } = storeToRefs(mileageStore);

const subImgPath = ref(''); // 이벤트상세 이미지
const imgHref = ref(''); // 이벤트 href
const title = ref(''); // 이벤트 제목
const notes = ref([] as any); // 유의사항
const evntSno = ref('');
const scrnId = ref('');
const staCd = ref('');
const isUseScrnNm = ref(false);
const isImageLoad = ref(false);
const isShowDetail = ref(false);

const initialize = async () => {
  if (isUseScrnNm.value) {
    // GO마일리지 적립 및 사용안내 화면에서 진입
    if (scrnId.value && staCd.value) {
      const param = {
        staCd: staCd.value,
        scrnId: scrnId.value
      };
      await mileageStore.requestMileageGuide(param);
      const item = getMileageGuideInfo.value.find((item) => item.scrnId == param.scrnId);
      if (item) {
        // 이벤트 상세 API
        const params = { scrnId: scrnId.value, moappMbrsSno: 'noMembers' };
        await requestEventDetail(params);
        title.value = item.scrnNm;
      }
    }
  } else {
    // 이벤트 목록에서 진입
    if (evntSno.value) {
      await requestEventListApi(); // 이벤트목록 api
      const event = getEventList.value.find((item) => item.evntSno == evntSno.value);
      if (event) {
        subImgPath.value = event.evntSubImgPathVal;
        imgHref.value = event.evntUrlAddr;
        notes.value = event.evntCtt.split('\n');
        title.value = event.evntTtlNm;
      } else {
        router.replace({ name: '/event/event-list' });
      }
    } else if (scrnId.value) {
      // 이벤트 상세 API
      const params = { scrnId: scrnId.value, moappMbrsSno: 'noMembers' };
      await requestEventDetail(params);
      title.value = getEventDetailInfo.value.scrnNm;
    }
  }
};

// 이벤트 목록 조회
const requestEventListApi = async () => {
  const param = {
    TAG: '[RequestAppEvent]',
    evntDvsCd: '',
    inqrDtm: formatDate(new Date(), 'YYYYMMDDHHmmss')
  };
  await eventStore.requestEventList(param);
};

// 이벤트 상세 조회
const requestEventDetail = async (params: RequestEventDtlInfo) => {
  isShowDetail.value = false;
  const res = await eventStore.requestEventDetail(params);
  if (res && res.rspCd === '0000') {
    isShowDetail.value = true;
  } else {
    router.replace({ name: '/event/event-list' });
  }
};

// 이벤트 상세 이미지 click
const clickImg = () => {
  if (imgHref.value != null) {
    if (imgHref.value != null && imgHref.value.indexOf('_TOKEN_') != -1) {
      // url에 _TOKEN_ 있는 경우 -> token으로 바꿔줌
      const token = authStore.getToken;
      imgHref.value = imgHref.value.replace('_TOKEN_', token);
    }
    const commonStore = useCommonStore();
    commonStore.setRouterHeaderTitle(title.value || null);
    router.push({ path: encodeUriRouterPath(imgHref.value) });
  }
};

const handleImageLoad = () => (isImageLoad.value = true);

onMounted(() => {
  evntSno.value = route.query.sno as string;
  scrnId.value = route.query.scrnId as string;
  staCd.value = route.query.staCd as string;
  isUseScrnNm.value = route.query.isUseScrnNm as unknown as boolean;

  initialize();
});
</script>

<style scoped lang="scss">
.ticket_notice {
  padding: 2rem;
  .desc {
    a {
      color: #555555;
    }
  }
}
</style>
