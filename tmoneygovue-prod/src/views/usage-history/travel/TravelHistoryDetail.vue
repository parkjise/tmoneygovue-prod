<!-- 인트로 > 이용상세 페이지 -->
<template>
  <subHeader title="이용 상세정보" />
  <trvl-history-detail-component v-if="reqComplete" page="main" />
</template>

<script setup lang="ts">
import TrvlHistoryDetailComponent from '@/views/usage-history/travel/component/TrvlHistoryDetailComponent.vue';

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useHistoryStore } from '@/service/usage-history/travelHistoryModule';
import { travelErrModal } from '@/views/travel/travelUtils';

const router = useRouter();
const historyStore = useHistoryStore();

const reqComplete = ref(false);

onMounted(async () => {
  // 이용내역상세조회
  const paramsObj = router.currentRoute.value.query;
  if (!paramsObj['isQrBack']) {
    // 이용상세정보 조회 요청 파라미터 저장
    historyStore.setReqMrnpDtlParam({
      trvlMrnpSno: paramsObj['trvlMrnpSno']?.toString() ?? '',
      trvlMrsStaCd: paramsObj['trvlMrsStaCd']?.toString() ?? '',
      trvlMrnpCancSqno: paramsObj['trvlMrnpCancSqno']?.toString() ?? ''
    });
  }
  const res = await historyStore.reqTrvlMrnpDtl();
  reqComplete.value = res.res;

  // api 응답은 정상이지만 데이터가 정상이 아닐경우
  if (!reqComplete.value) {
    travelErrModal(router, res.msg, () => {
      router.back();
    });
  }
});
</script>
