<template>
  <sub-header title="약관 및 정책" />
  <main id="main" class="main mor">
    <div class="container">
      <round-box v-for="(stplGroupInfo, index) in termsAndPolicies" :key="index" :title="stplGroupInfo.stplGrpNm">
        <div class="setting policy">
          <ul class="flex_area">
            <li v-for="(stplDtlInfo, index) in stplGroupInfo.stplDtlList" :key="index">
              <uu-button @click="onClickTermsAndPolicyPage(stplDtlInfo)">
                <span>{{ stplDtlInfo.ttl }}</span>
                <uu-ic size="16" name="arrow_right_gray" />
              </uu-button>
            </li>
          </ul>
        </div>
      </round-box>
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
const termsAndPolicies = computed(() => termsAndPoliciesStore.getStplList);

// 약관 및 정책
async function getTermsAndPolicies() {
  await termsAndPoliciesStore.setTermsAndPolicies();
}

// 약관 상세
async function onClickTermsAndPolicyPage(stplDtlInfo: StplDtlInfo) {
  if (stplDtlInfo.trntYn === 'Y') {
    // 운송 약관
    router.push('/app-setting/terms-and-policies/carrier-agreement');
    return;
  }
  let url = stplDtlInfo.extlUrl;
  if (!url) {
    url = import.meta.env.VITE_TMONEY_URL + '/webview/mbrs/stpl/v2/' + stplDtlInfo.sno + '.do';
  }
  if (url.includes('amazonaws.com')) {
    url = url + '?remove_bearer_token=true';
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
}
onMounted(() => {
  getTermsAndPolicies();
});
</script>
