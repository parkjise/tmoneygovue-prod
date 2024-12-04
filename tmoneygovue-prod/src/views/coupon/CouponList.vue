<template>
  <!-- header -->
  <sub-header title="쿠폰" right-content>
    <template #header_right>
      <uu-button btn-style="none" label="지난 쿠폰" class="btn_payment_method" @click="clickGotoLink" />
    </template>
  </sub-header>
  <main id="main" class="main mor">
    <div class="container no_padding">
      <div class="coupon">
        <form>
          <uu-input :ref="cpnNum" v-model="cpnNum" label="쿠폰 등록" placeholder="쿠폰번호 입력" :maxLength="20" />
          <uu-button size="lg" label="등록" btn-style="line" @click="registCoupon" />
        </form>
        <uu-tabs
          class="depth2_tab"
          v-model="utlzSvcDvsCd"
          align-tabs="center"
          @selected="selectTab"
          stacked
          :tabIndex="currentTab"
          focused
        >
          <uu-tab v-for="(item, i) in categories" :key="i" :title="item.text" :isFocus="false" />
          <div v-if="issuCpnList.length + psnCpnList.length <= 0" class="no_data">
            <uu-ic size="48" name="exclamation" />
            <p>발급/사용 가능한 쿠폰이 없습니다.</p>
          </div>
          <div v-else class="coupon_list">
            <IssueCouponListView :items="issuCpnList" :isLoading="isLoading" @updateList="updateList" />
            <HoldingCouponListView :items="psnCpnList" :isLoading="isLoading" />
            <div class="ticket_notice">
              <p class="title">
                <uu-ic size="16" name="exclamation_gray090" />
                꼭 읽어주세요!
              </p>
              <ul>
                <li>쿠폰 선물하기는 티머니GO 회원에게만 선물 가능합니다.</li>
                <li>수신자가 티머니GO 회원이 아닐 경우, 선물하기가 취소 됩니다.</li>
                <li>선물받은 쿠폰은 쿠폰 사용기간의 잔여기간 동안 유효합니다.</li>
                <li>선물을 하신 시점부터 선물한 쿠폰을 이용하실 수 없습니다.</li>
              </ul>
            </div>
          </div>
        </uu-tabs>
      </div>
    </div>
  </main>
  <RegistCouponPopup :isShow="isShow" :rspCd="rspCd" @isClose="isShow = false"> </RegistCouponPopup>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
const router = useRouter();
const route = useRoute();

import HoldingCouponListView from '@/views/coupon/component/HoldingCouponListView.vue';
import IssueCouponListView from '@/views/coupon/component/IssueCouponListView.vue';
import RegistCouponPopup from '@/views/coupon/component/RegistCouponPopup.vue';

import { getAppBridge } from '@/utils';
import { listFiltering } from '@/utils/couponUtils';
import { useCouponStore } from '@/service/coupon/couponModule';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

const couponListStore = useCouponStore();
const { getPsnCpnList, getIssuCpnList } = storeToRefs(couponListStore);

const psnCpnList = computed(() => {
  if (utlzSvcDvsCd.value !== 'A') {
    return listFiltering(getPsnCpnList.value, utlzSvcDvsCd.value);
  } else {
    return getPsnCpnList.value;
  }
});

const issuCpnList = computed(() => {
  if (utlzSvcDvsCd.value !== 'A') {
    return listFiltering(getIssuCpnList.value, utlzSvcDvsCd.value);
  } else {
    return getIssuCpnList.value;
  }
});

const currentTab = ref<number>(0);
const category = ref<string>('');
const utlzSvcDvsCd = ref<string>('A');
const cpnNum = ref<string>('');
const isShow = ref<boolean>(false);
const rspCd = ref<string>('');
const isLoading = ref<boolean>(false);

/**
 * 쿠폰 등록
 */
async function registCoupon() {
  if (cpnNum.value) {
    const appBridge = await getAppBridge();

    const resResult = await couponListStore.actionRegistCoupon(cpnNum.value);
    if (resResult) {
      if (resResult.rspCd === '0000') {
        appBridge.showToast({ message: '쿠폰이 발급되었습니다.' });
        cpnNum.value = '';
        await requestCouponList();
      } else {
        //실패했으면 모달 팝업 호출
        rspCd.value = resResult.rspCd;
        isShow.value = true;
      }
    }
  }
}

/**
 * 쿠폰목록 조회
 */
const requestCouponList = async () => {
  if (!isLoading.value) {
    isLoading.value = true;

    await couponListStore.actionCouponList();

    isLoading.value = false;
  }
};

/**
 * 탭 변경 시 이벤트
 * @param tab
 */
const selectTab = (tab: number) => {
  category.value = categories[tab].category;
  utlzSvcDvsCd.value = categories[tab].value;
  if (tab) {
    currentTab.value = tab;
    router.replace({ query: { category: category.value } });
  } else {
    router.replace({ query: {} });
  }
};

/**
 * 목록 더보기
 */
const updateList = async () => {
  await couponListStore.actionCouponList();
};

/**
 * 지난쿠폰 목록 화면 이동
 */
const clickGotoLink = () => {
  router.push({
    path: '/coupon/past-list'
  });
};

const categories = reactive([
  {
    text: '전체',
    category: '',
    value: 'A'
  },
  {
    text: '고속·시외',
    category: 'bus',
    value: 'B'
  },
  {
    text: '택시',
    category: 'taxi',
    value: 'O'
  },
  {
    text: '공공자전거',
    category: 'bike',
    value: 'T'
  },
  {
    text: '자전거/킥보드',
    category: 'kickboard',
    value: 'X'
  },
  {
    text: '렌터카',
    category: 'rentercar',
    value: 'L'
  },
  {
    text: '여행',
    category: 'travel',
    value: 'FG'
  }
]);

onMounted(async () => {
  const category = route.query.category as string;

  if (category) {
    selectTab(categories.findIndex((categories) => categories.category == category));
  }

  await requestCouponList();
});
</script>
