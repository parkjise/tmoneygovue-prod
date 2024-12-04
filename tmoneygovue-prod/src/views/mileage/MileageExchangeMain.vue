<template>
  <sub-header title="GO마일리지 전환" />
  <main id="main" class="main mor">
    <div class="container no_padding">
      <div class="go_mileage_transform">
        <div ref="scrollDiv" class="scroll_wrap">
          <img :src="`${imgUrl}${getMileageBeforeInfo.infoImgPath}`" alt="GO마일리지 전환" />
        </div>
        <div ref="noScrollDiv" class="no_scroll">
          <round-box hide-title>
            <uu-input v-model="myGoMileage" label="나의 GO마일리지" readonly />
            <uu-input v-model="myTMileage" label="나의 T마일리지" readonly />
            <div v-for="(item, i) in exchangeStplList" :key="i">
              <div class="flex_area" :key="i" v-if="!getAllAgreeTerms">
                <uu-checkbox v-model="checked" :label="`${item.stplTtlNm}`" value="check01" />
                <uu-button>
                  <uu-ic size="16" name="arrow_right_gray" @click="termsDetail(item)" v-if="item.extlUrl != null" />
                </uu-button>
              </div>
            </div>
          </round-box>
          <div class="ticket_notice" v-if="!getAllAgreeTerms">
            <p class="title">
              <uu-ic size="16" name="exclamation_gray090" />
              정보 제공 동의
            </p>
            <ul>
              <li>마일리지를 조회하기 위해 최소 1회 동의가 필요합니다.</li>
              <li>개인정보 수집/이용 미동의 시 GO마일리지 전환 서비스 이용이 어렵습니다.</li>
            </ul>
          </div>
          <div class="btn_area">
            <uu-button
              btn-color="primary"
              size="xl"
              label="T마일리지 조회하기"
              v-if="!getAllAgreeTerms"
              @click="onclickSearchTMileage"
              :disabled="!checked"
            />
            <uu-button
              btn-color="primary"
              size="xl"
              label="T마일리지 전환하기"
              v-else
              href="/mileage/mileage-exchange"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useMessageModal } from '@/composables/useMessageModal';
import { useGoMileageStore } from '@/service/mileage/goMileageModule';
import { storeToRefs } from 'pinia';
import { ref, onMounted, computed } from 'vue';
import { formatAmount } from '@/utils/amountUtils';
import { useAuthStore } from '@/service/auth/authModule';
import type { StplAgreeInfo } from '@/service/terms/model/termsModel';
import { getAppBridge } from '@/utils';
import type { stplInfo } from '@/service/regist-traffic-card/model/registTrafficCardModel';

const { createNotificationModal } = useMessageModal();
const authStore = useAuthStore();
const milegeStore = useGoMileageStore();
const { getMileageBeforeInfo, getNotTmoneyMembers, getAllAgreeTerms, getMileageBeforeInfoStpl } =
  storeToRefs(milegeStore);

const imgUrl = import.meta.env.VITE_IMG_URL;
const checked = ref(false); // 약관 체크박스
const myGoMileage = computed(() => formatAmount(`${getMileageBeforeInfo.value.GOMlgAmt}M`));
const myTMileage = computed(() =>
  getNotTmoneyMembers.value ? '미조회' : formatAmount(`${getMileageBeforeInfo.value.TMlgAmt}M`)
);

/**
 * @description 마일리지 전환 약관목록
 */
const exchangeStplInfo = ref<StplAgreeInfo[]>([]);
const exchangeStplList = computed(() => [...exchangeStplInfo.value]);

onMounted(async () => {
  const param = { moappMbrsSno: authStore.getAuthInfo.moappMbrsSno || '' };
  await milegeStore.requestMileageBeforeInfo(param);
  // 약관목록
  exchangeStplInfo.value = getMileageBeforeInfoStpl.value.map((item) => ({
    ...item,
    stplCheck: item.stplAgrmYn === 'Y' ? true : false
  }));

  checked.value = getAllAgreeTerms.value === false ? false : true; // 약관체크

  // 상세페이지 이미지 높이 구하기
  // if (noScrollDiv.value) {
  //   noScrollDivHeight.value = noScrollDiv.value.clientHeight;
  //   bodyHeight.value = document.body.clientHeight;
  // }
  // if (scrollDiv.value) {
  //   ScrollDivHeight.value = bodyHeight.value - noScrollDivHeight.value - 76;
  //   scrollDiv.value.style.height = ScrollDivHeight.value + `px`;
  // }
});

// T마일리지 조회하기
const onclickSearchTMileage = async () => {
  let stplList = [];
  stplList.push({ stplAgrmYn: 'Y', stplSno: getMileageBeforeInfo.value.stplList[0].stplSno });
  const param = {
    moappMbrsSno: authStore.getAuthInfo.moappMbrsSno || '',
    stplList
  };

  const res = await milegeStore.requestSearchTMlg(param);
  if (res.popMsgTtl != '') {
    // 티머니 회원이 아닌 경우
    createNotificationModal(`${res.popMsgTtl}`, `${res.popMsgCtt.replace('\n', '<br/>')}`);
    return;
  }
};

/**
 * @description 마일리지 전환 약관 체크 여부
 */
// const isDisabledButton = computed(() => {
//   if (
//     exchangeStplList.value.filter((item) => item.stplCheck && item.stplMndtYn === 'Y').length ===
//     exchangeStplList.value.filter((item) => item.stplMndtYn === 'Y').length
//   ) {
//     return false;
//   } else {
//     return true;
//   }
// });

// 약관 상세 조회
const termsDetail = async (item: stplInfo) => {
  const appBridge = await getAppBridge();
  if (item.extlUrl !== undefined && item.extlUrl !== null && item.extlUrl !== '') {
    await appBridge.openView({ url: item.extlUrl, headerTitle: item.stplTtlNm, viewType: 'in' });
  }
};
</script>

<style scoped>
.btn_area {
  margin: auto;
  width: 33.5rem;
  height: 5.6rem;
  margin-top: 1.6rem;
}
</style>
