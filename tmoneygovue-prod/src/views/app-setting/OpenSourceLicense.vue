<template>
  <sub-header title="오픈소스 라이선스" />
  <main id="main" class="main mor">
    <div class="container">
      <round-box hide-title>
        <div class="setting policy">
          <ul class="flex_area">
            <li>
              <uu-button @click="onClickOpenLicensesPage('license/tmoneygo')">
                <span>티머니GO 오픈소스 라이선스</span>
                <uu-ic size="16" name="arrow_right_gray" />
              </uu-button>
            </li>
            <li>
              <uu-button @click="onClickOpenLicensesPage('license/navermapLegal')">
                <span>네이버 맵 SDK 법적 공지/정보 제공처</span>
                <uu-ic size="16" name="arrow_right_gray" />
              </uu-button>
            </li>
            <li>
              <uu-button @click="onClickOpenLicensesPage('license/navermap')">
                <span>네이버 맵 SDK 오픈소스 라이선스</span>
                <uu-ic size="16" name="arrow_right_gray" />
              </uu-button>
            </li>
            <li v-if="isDebugAppMode">
              <uu-button @click="onClickOpenLicensesPage('license/developer')">
                <span>개발자 테스트 메뉴</span>
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
import { getAppBridge } from '@/utils';
import { FlexResponseCode } from '@/utils/hybrid/type';
import { onMounted, ref } from 'vue';

const isDebugAppMode = ref(false);

onMounted(async () => {
  // 앱 모드 확인
  checkAppMode();
});

// 앱 모드 확인. 앱모드를 확인하여 개발자 테스트 메뉴를 노출한다. 운영환경에서 디버깅을 위해 사용하므로 빌드환경없을 확인 안함
const checkAppMode = async () => {
  const appBridge = await getAppBridge();
  const resAppMode = await appBridge.getAppMode();
  if (resAppMode.response.code === FlexResponseCode.OK) {
    isDebugAppMode.value = resAppMode.isDebugAppMode;
  }
};

async function onClickOpenLicensesPage(url: string) {
  //openView 브릿지 호출
  const appBridge = await getAppBridge();
  appBridge.openView({
    url: url,
    viewType: 'native'
  });
}
</script>
