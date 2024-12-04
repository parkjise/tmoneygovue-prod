<template>
  <!-- header -->
  <sub-header title="고객지원" />
  <!-- // header -->
  <!-- main -->
  <main id="main" class="main mor">
    <div class="container bg_white">
      <section>
        <button type="button" class="guide_banner_btn">
          <img
            src="/assets/images/guide_banner.png"
            alt="티머니GO 이용가이드"
            @click="sendAdbrix(AdbrixEvtId.mGuide), onClickPageRouterPush('/customer-support/user-guide')"
          />
        </button>
      </section>
      <section aria-labelledby="customer">
        <h3 id="customer" class="sr_only">문의 안내</h3>
        <ul class="guide_list">
          <!-- <li>
            <button type="button" :disabled="!getIsLogin" @click="onClickPageRouterPush('/customer-support/complain')">
              1:1문의
              <uu-ic name="arrow" size="24" />
            </button>
          </li> -->
          <li>
            <button type="button" @click="sendAdbrix(AdbrixEvtId.mCsFAQ), onClickPageRouterPush('/customer-support/faq')">
              자주하는 질문
              <uu-ic name="arrow" size="24" />
            </button>
          </li>
        </ul>
      </section>
      <section aria-labelledby="bus">
        <h3 id="bus"class="category_tit">고속·시외</h3>
        <ul class="guide_list">
          <li>
            <button type="button" @click="onClickBusGuidePage('customer/terminal')">
              고속·시외 터미널 안내
              <uu-ic name="arrow" size="24" />
            </button>
          </li>
          <li>
            <button type="button" @click="onClickBusGuidePage('customer/transportation')">
              고속·시외 운수회사 안내
              <uu-ic name="arrow" size="24" />
            </button>
          </li>
          <li>
            <button type="button" @click="onClickBusGuidePage('customer/lostCenter')">
              고속 유실물센터 안내
              <uu-ic name="arrow" size="24" />
            </button>
          </li>
        </ul>
      </section>
      <section aria-labelledby="bicycle">
        <h3 id="bicycle" class="category_tit">공공자전거</h3>
        <ul class="guide_list">
          <li>
            <button
              type="button"
              :disabled="!getIsLogin"
              @click="onClickPageRouterPush('/customer-support/report-disability-bike')"
            >
              <p class="text-graybbb">공공자전거 고장/장애 신고</p>
              <uu-ic name="arrow" size="24" />
            </button>
          </li>
          <li>
            <button type="button" @click="onClickPageRouterPush('/customer-support/bike-use-guide')">
              공공자전거 이용 안내
              <uu-ic name="arrow" size="24" />
            </button>
          </li>
          <li>
            <button type="button" @click="onClickPageRouterPush('/customer-support/bike-fee-guide')">
              공공자전거 이용요금 안내
              <uu-ic name="arrow" size="24" />
            </button>
          </li>
          <li>
            <button type="button" @click="onClickPageRouterPush('/customer-support/bike-insurance-guide')">
              공공자전거 보험안내
              <uu-ic name="arrow" size="24" />
            </button>
          </li>
        </ul>
      </section>
      <section aria-labelledby="kickboard">
        <h3 id="kickboard" class="category_tit">킥보드/전기자전거</h3>
        <ul class="guide_list">
          <li>
            <button type="button" @click="onClickPageRouterPush('kickboard-use-guide')">
              킥보드 이용 안내
              <uu-ic name="arrow" size="24" />
            </button>
          </li>
          <li>
            <button type="button" @click="onClickPageRouterPush('/customer-support/e-bike-use-guide')">
              전기자전거 이용 안내
              <uu-ic name="arrow" size="24" />
            </button>
          </li>
          <li>
            <button type="button" @click="onClickPageRouterPush('/customer-support/kick-board-and-e-bike-fee-guide')">
              킥보드/전기자전거 이용요금 안내
              <uu-ic name="arrow" size="24" />
            </button>
          </li>
          <li>
            <button type="button" @click="onClickPageRouterPush('/customer-support/report-disability-kickboard')">
              킥보드/전기자전거 사고/고장 신고
              <uu-ic name="arrow" size="24" />
            </button>
          </li>
          <li>
            <button type="button" @click="onClickPageRouterPush('/customer-support/kickboard-insurance-guide')">
              킥보드/전기자전거 보험안내
              <uu-ic name="arrow" size="24" />
            </button>
          </li>
        </ul>
      </section>
      <section aria-labelledby="rentalcar">
        <h3 id="rentalcar" class="category_tit">렌터카</h3>
        <ul class="guide_list">
          <li>
            <button type="button" @click="onClickPageRouterPush('/customer-support/car-rent-guide?category=use')">
              렌터카 이용안내
              <uu-ic name="arrow" size="24" />
            </button>
          </li>
          <li>
            <button type="button" @click="onClickPageRouterPush('/customer-support/car-rent-guide?category=insurance')">
              렌터카 보험안내
              <uu-ic name="arrow" size="24" />
            </button>
          </li>
        </ul>
      </section>
    </div>
  </main>
  <!-- // main -->
  <uu-floating
    always
    :pos="{ right: 20, bottom: 20 }"
    @Click="onClickMoveURLPage('https://pf.kakao.com/_zuLxexl/chat')"
  >
    <template #ic>
      <uu-ic name="chat" size="20" />
    </template>
  </uu-floating>
</template>
<script setup lang="ts">
import uuIc from '@/components/uu-components/UuIc.vue';
import uuFloating from '@/components/uu-components/UuFloating.vue';

import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/service/auth/authModule';
import { getAppBridge } from '@/utils';
import { useRouter } from 'vue-router';

import { AdbrixEvtId } from '@/utils/hybrid/type';
import { sendAdbrix } from '@/utils/sendAdbrixUtil';

const router = useRouter();
const authStore = useAuthStore();
const { getIsLogin } = storeToRefs(authStore);

// router 화면 이동
const onClickPageRouterPush = (path: string) => {
  router.push(path);
};

// 외부브라우저 이동
const onClickMoveURLPage = async (url: string) => {
  const appBridge = await getAppBridge();
  await appBridge.openView({
    url: url,
    viewType: 'ex'
  });
};

// 고속•시외 안내 네이티브 화면 이동
const onClickBusGuidePage = async (url: string) => {
  // openView 브릿지 호출
  const appBridge = await getAppBridge();
  await appBridge.openView({
    url: url,
    viewType: 'native'
  });
};
</script>
