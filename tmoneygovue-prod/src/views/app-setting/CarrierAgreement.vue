<template>
  <sub-header title="고속·시외 운송약관" />
  <main id="main" class="main mor">
    <div class="container">
      <!-- 운송약관 목록 -->
      <round-box hide-title>
        <div class="setting policy">
          <ul class="flex_area">
            <li v-for="(stplDtlInfo, index) in carrierAgreementList" :key="index">
              <uu-button @click="onClickCarrierAgreementPage(stplDtlInfo)">
                <span>{{ stplDtlInfo.ttl }}</span>
                <uu-ic size="16" name="arrow_right_gray" />
              </uu-button>
            </li>
          </ul>
        </div>
      </round-box>
      <!--// 운송약관 목록 -->
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useTermsAndPoliciesStore } from '@/service/app-setting/termsAndPoliciesModule';
import { useCommonStore } from '@/service/common/commonModule';
import { encodeUriRouterPath } from '@/utils/linkUtils';
import type { StplDtlInfo } from '@/service/terms/model/termsModel';
import { getAppBridge } from '@/utils';
import { useRouter } from 'vue-router';

const router = useRouter();
const termsAndPoliciesStore = useTermsAndPoliciesStore();

const carrierAgreementList = computed(() => termsAndPoliciesStore.getCarrierAgreementlList);

const getCarrierAgreement = async () => {
  await termsAndPoliciesStore.setgetCarrierAgreement();
};

//운송약관 상세
const onClickCarrierAgreementPage = async (stplDtlInfo: StplDtlInfo) => {
  let url = stplDtlInfo.extlUrl;
  if (!url) {
    url = import.meta.env.VITE_TMONEY_URL + '/webview/mbrs/stpl/v2/' + stplDtlInfo.sno + '.do';
  }
  if (url.includes('/webview/')) {
    const commonStore = useCommonStore();
    commonStore.setRouterHeaderTitle(stplDtlInfo.ttl || null);
    router.push({ path: encodeUriRouterPath(url) });
    return;
  }
  // openView 브릿지 호출
  const appBridge = await getAppBridge();
  await appBridge.openView({
    url: url,
    headerTitle: stplDtlInfo.ttl,
    viewType: 'in'
  });
};

onMounted(() => {
  getCarrierAgreement();
});
</script>
