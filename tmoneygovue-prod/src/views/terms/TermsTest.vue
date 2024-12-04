<template>
  <main id="main" class="main det">
    <div class="container bottom_btns pt12">
      <uu-button
        label="고속시외 테스트"
        @click="
          openTermPage(
            {
              svcDvsCd: '2',
              stplGrpCd: 'BJ'
            },
            () => openWeb('tmoneytia://bus/main')
          )
        "
      />
      <uu-button
        label="온다 테스트"
        @click="
          openTermPage(
            {
              svcDvsCd: '2',
              stplGrpCd: 'O'
            },
            () => openWeb('tmoneytia://onda/main')
          )
        "
      />
      <uu-button
        label="타슈 테스트"
        @click="
          openTermPage(
            {
              svcDvsCd: '2',
              stplGrpCd: 'D'
            },
            () => openWeb('tmoneytia://bike/main')
          )
        "
      />
      <uu-button
        label="지쿠 테스트"
        @click="
          openTermPage(
            {
              svcDvsCd: '2',
              stplGrpCd: 'G'
            },
            () => openWeb('tmoneytia://bike/main')
          )
        "
      />
      <uu-button
        label="킥고잉 테스트"
        @click="
          openTermPage(
            {
              svcDvsCd: '2',
              stplGrpCd: 'I'
            },
            () => openWeb('tmoneytia://xingxing/main')
          )
        "
      />
      <uu-button
        label="씽씽 테스트"
        @click="
          openTermPage(
            {
              svcDvsCd: '2',
              stplGrpCd: 'X'
            },
            () => openWeb('tmoneytia://xingxing/main')
          )
        "
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import UuButton from '@/components/uu-components/UuButton.vue';
import type { ReqTermsInfo } from '@/service/terms/model/requestModel';
import { useTermsStore } from '@/service/terms/termsModule';
import { useRouter } from 'vue-router';
import { getAppBridge } from '@/utils';

// 약관을 위한 정보 세팅
const termsStore = useTermsStore();
const router = useRouter();
const openTermPage = (params: ReqTermsInfo, agreeFunc: () => any) => {
  termsStore.initParam(params, agreeFunc);
  router.push({ path: '/terms/term-list' });
};
const openWeb = async (url: string) => {
  const appBridge = await getAppBridge();
  await appBridge.openView({ url: url, viewType: 'native' });
};
</script>

<style scoped></style>
