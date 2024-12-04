<!-- 
  결제수단 관리
  path: tmoney/Spa/DET/DET044.vue
  @author dh.kim
 -->
<template>
  <!-- header -->
  <sub-header title="약관 동의" hide-title bg-color="#F4F4F4" :click-callback="moveTmoneyGo" />
  <!-- // header -->
  <!-- main -->
  <main id="main" class="main det">
    <div class="container bottom_btns pt12">
      <div class="card_agree_area">
        <h4>약관 동의</h4>
        <p class="text">약관동의를 진행해 주세요</p>
        <form>
          <round-box hide-title>
            <uu-checkbox label="전체동의" aria-label="전체동의" v-model="allChecked" @change="handleAllCheckChange" />
          </round-box>
          <p class="desc">{{ termsInfo.stplList[0]?.stplGrpDesc }}</p>
          <round-box v-for="stplGroup in termsInfo.stplList" :key="stplGroup.utlzSvcDvsCd" :title="stplGroup.stplGrpNm">
            <div v-for="stplDtl in stplGroup.stplDtlList" :key="stplDtl.sno" class="flex_area">
              <uu-checkbox
                :label="stplDtl.ttl + ' (' + (stplDtl.mndtYn === 'Y' ? '필수' : '선택') + ')'"
                :aria-label="stplDtl.ttl + ' (' + (stplDtl.mndtYn === 'Y' ? '필수' : '선택') + ')'"
                v-model="stplDtl.stplCheck"
                @change="termsStore.allCheckChange"
                checkline
                
              />
              <uu-button
                :label="stplDtl.ttl + ' (' + (stplDtl.mndtYn === 'Y' ? '필수' : '선택') + ')'"
                :aria-label="stplDtl.ttl+ '이동'"
                @click="goHistoryPage(stplDtl)"
              >
                <uu-ic size="24" name="navi_right" />
              </uu-button>
            </div>
          </round-box>
        </form>
      </div>
      <div class="btn_area">
        <uu-button
          size="xl"
          btn-color="primary"
          :label="termsInfo.stplList[0]?.stplBtnNm"
          :disabled="!getStplListCanAgree"
          @click="termsAgree"
        />
      </div>
    </div>
  </main>
  <!-- // main -->
</template>

<script setup lang="ts">
import subHeader from '@/components/layout/SubHeader.vue';
import uuIc from '@/components/uu-components/UuIc.vue';
import UuButton from '@/components/uu-components/UuButton.vue';
import RoundBox from '@/components/layout/RoundBox.vue';
import UuCheckbox from '@/components/uu-components/UuCheckbox.vue';
import { useMessageModal } from '@/composables/useMessageModal';
import { crtnMbrsLnkgSvcInfo } from '@/service/terms/termsApi';
import type { ReqTermsAgree } from '@/service/terms/model/requestModel';
import { useTermsStore } from '@/service/terms/termsModule';
import { storeToRefs } from 'pinia';
import type { StplDtlInfo } from '@/service/terms/model/termsModel';
import { onMounted } from 'vue';
import { getAppBridge } from '@/utils';

const termsStore = useTermsStore();
const { reqTermsInfo, termsInfo, getAgreedStplList, getStplListCanAgree, allChecked } = storeToRefs(termsStore);
const { createErrorModal } = useMessageModal();

// 약관 호출부
onMounted(() => {
  if (reqTermsInfo.value.stplGrpCd === '' || reqTermsInfo.value.svcDvsCd === '') {
    createErrorModal('', '약관 호출 불가합니다.', () => {
      moveTmoneyGo();
    });
  }
  termsStore.setHttpTermsList();
});

// 전체동의 체크시 리스트 전체 체크처리 변경
const handleAllCheckChange = (isChecked: boolean) => {
  termsStore.checkAllList(isChecked);
};

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
      headerTitle: stplDtl.ttl
    });
  }
};

// 동의처리
const termsAgree = async () => {
  const params: ReqTermsAgree = {
    lnkgSvcCd: reqTermsInfo.value.stplGrpCd,
    stplList: getAgreedStplList.value
  };
  const res = await crtnMbrsLnkgSvcInfo(params).catch(() => {
    createErrorModal('', '약관동의API통신실패');
    return;
  });
  if (res) {
    if (res.scsYn === 'Y') {
      termsStore.executeCallback();
    } else {
      createErrorModal('', res.msg ?? '실패');
    }
  }
};

/**
 * 티머니고 홈으로 이동(웹뷰 닫기)
 */
const moveTmoneyGo = async () => {
  const appBridge = await getAppBridge();
  await appBridge.closeWebView();
};
</script>

<style scoped></style>
