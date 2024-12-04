<template>
  <round-box hide-title>
    <div class="checkbox_area">
      <div class="all_checkbox">
        <uu-checkbox label="전체 동의" v-model="termsAllCheck" @change="orderStore.checkAll" />
      </div>
      <ul class="checkbox_list">
        <template v-for="(termGroup, idx) in orderInfo.termsInfo.stplList" :key="idx">
          <li v-for="termDtlInfo in termGroup.stplDtlList" :key="termDtlInfo.sno">
            <uu-checkbox
              :label="`${termDtlInfo.ttl}${termDtlInfo.mndtYn === 'Y' ? '(필수)' : '(선택)'}`"
              v-model="termDtlInfo.stplCheck"
            />
            <uu-button>
              <uu-ic
                :label="`${termDtlInfo.ttl}${termDtlInfo.mndtYn === 'Y' ? '(필수)' : '(선택)'}`"
                @click="goHistoryPage(termDtlInfo)"
                size="16"
                name="arrow_right_gray"
              />
            </uu-button>
          </li>
        </template>
      </ul>
    </div>
  </round-box>
</template>

<script setup lang="ts">
import { useOrderStore } from '@/service/order/orderModule';
import type { StplDtlInfo } from '@/service/terms/model/termsModel';
import { getAppBridge } from '@/utils';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const orderStore = useOrderStore();
const { getTermAllChecked } = storeToRefs(orderStore);
const { orderInfo } = storeToRefs(orderStore);

const termsAllCheck = ref(false);

watch(termsAllCheck, (checked: boolean) => {
  orderStore.checkAll(checked);
});

watch(getTermAllChecked, (checked: boolean) => {
  termsAllCheck.value = checked;
});

// 약관 상세 이동시
const url = `${import.meta.env.VITE_TMONEY_URL}/webview/mbrs/stpl/v2/`;
const goHistoryPage = async (stplDtl: StplDtlInfo) => {
  const appBridge = await getAppBridge();
  let urlPath = '';
  if (stplDtl.extlUrl !== undefined && stplDtl.extlUrl !== null && stplDtl.extlUrl !== '') {
    urlPath = stplDtl.extlUrl;
  } else if (stplDtl.url?.startsWith('http')) {
    urlPath = stplDtl.url;
  } else {
    urlPath = `${url}${stplDtl.sno}.do`;
  }
  if (urlPath !== '') {
    await appBridge.openView({
      url: urlPath,
      viewType: 'in',
      headerTitle: ''
    });
  }
};
</script>
