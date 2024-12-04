<template>
  <common-modal
    v-model="showPopup"
    type="confirm"
    addClass="traffic_benefit"
    hide-title
    @ok="ok"
    @close="showPopup = false"
  >
    <template #modal_header_right_btn>
      <button type="button" class="btn_close close_left" aria-label="닫기" @click="router.go(-2)">
        <uu-ic name="close" size="24" />
      </button>
    </template>
    <template #modal_body>
      <strong>대중교통 챌린지</strong>
      <p class="modal_content">
        어머 교통카드를 등록 하셨네요!??<br />
        백.프.로 당첨 상품 혜택을<br />
        놓치지 마세요
      </p>
      <p class="modal_img">
        <img src="/assets/images/img_traffic_challenge.png" alt="대중교통 챌린지 이미지" />
      </p>
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" label="혜택뽑기" @click="btnActions.ok" />
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/service/auth/authModule';
import { useRegistTrafficCardStore } from '@/service/regist-traffic-card/registTrafficCardModule';
import { getAppBridge } from '@/utils';
import CommonModal from '@/views/common/components/CommonModal.vue';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const trafficStore = useRegistTrafficCardStore();

const { getMissionList, evntCtt } = storeToRefs(trafficStore);

const showPopup = ref(false);
const evntScrnId = 'AR_EVNT_005'; // 이벤트ID
const basePath = import.meta.env.VITE_TMONEY2_AXIOS_BASE_URL;

const emits = defineEmits(['close']);
const ok = async () => {
  const appBridge = await getAppBridge();
  if (!getMissionList.value) return;

  await appBridge.openView({
    url: `${basePath}/webview/evnt/v2/inqrEvntBnftGiftishow.do?evntScrnId=${evntScrnId}&missionId=mission00`,
    viewType: 'in',
    headerTitle: ''
  });
  showPopup.value = false;
  emits('close');
};

const { getAuthInfo } = storeToRefs(useAuthStore());
const open = async () => {
  await trafficStore.inqrEvntBnftPlusInfo(evntScrnId, getAuthInfo.value.moappMbrsSno ?? '');
  showPopup.value = evntCtt.value.trCardPop === 'Y';
  return evntCtt.value.trCardPop === 'Y';
};
defineExpose({ open });
</script>
