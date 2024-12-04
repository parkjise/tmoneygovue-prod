<template>
  <div>
    <p class="box_title" :style="titleStyle" v-html="santizedHtml(props.esgCampaignScrnMrk.svcTtlNm)"></p>
    <div v-if="isLottie && isLoadLottie">
      <div ref="esgCampaignAnimation"></div>
    </div>
    <div v-if="isLottie && !isLoadLottie">
      <div class="img_area">
        <img src="/assets/images/img_my_esg_load-fail.png" alt="" />
      </div>
    </div>

    <div v-if="!isLottie">
      <div class="img_area">
        <img
          :src="props.esgCampaignScrnMrk.svcLotPath"
          onerror="this.src='/assets/images/img_my_esg_load-fail.png'"
          alt=""
        />
      </div>
    </div>
    <uu-button
      class="btn_go"
      :style="btnStyle"
      @click="
        sendAdbrix(AdbrixEvtId.tapMyEsg),
          onClickMovePage(props.esgCampaignScrnMrk.dtlMvmnNmChcMvmnPath, props.esgCampaignScrnMrk.dtlMvmnTitlNm)
      "
    >
      {{ props.esgCampaignScrnMrk.dtlMvmnNm || '2024 ESG 캠페인 보러가기' }}
      <my-main-arrow-icon :arrowColor="esgCampaignScrnMrk.dtlMvmnNmLrCd || '#111111'" />
    </uu-button>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, onMounted, computed } from 'vue';
import { type myScrnMrkListModel } from '@/service/main/model/myMainModel';
import lottie, { type AnimationItem } from 'lottie-web';
import { santizedHtml } from '@/utils';
import MyMainArrowIcon from '@/views/main/components/MyMainArrowIcon.vue';

import { AdbrixEvtId } from '@/utils/hybrid/type';
import { sendAdbrix } from '@/utils/sendAdbrixUtil';

const props = defineProps({
  esgCampaignScrnMrk: {
    type: Object as () => myScrnMrkListModel,
    required: true
  }
});

const emit = defineEmits(['onClickMovePage']);

onMounted(async () => {
  // ESG 캠페인 애니메이션 초기화
  initEsgCampaignAnimation();
});

onUnmounted(() => {
  if (animationInstance) {
    animationInstance.destroy(); // 애니메이션 인스턴스 제거
  }
});
// 화면 이동
const onClickMovePage = (link: string, headerTitle: string | null) => {
  emit('onClickMovePage', link, headerTitle);
};

const titleStyle = computed(() => {
  return {
    color: props.esgCampaignScrnMrk.svcTtlNmLrCd || '#111111'
  };
});

const btnStyle = computed(() => {
  return {
    color: props.esgCampaignScrnMrk.dtlMvmnNmLrCd || '#111111'
  };
});

// Lottie 애니메이션 존재 여부. json이 아니면 image를 노출
const isLottie = computed(() => {
  return props.esgCampaignScrnMrk.svcLotPath.includes('.json');
});
const isLoadLottie = ref(true);

const esgCampaignAnimation = ref<HTMLElement | null>(null);
let animationInstance: AnimationItem | null = null;
// ESG 캠페인 애니메이션 초기화
const initEsgCampaignAnimation = async () => {
  const isLottieFile = props.esgCampaignScrnMrk.svcLotPath.includes('.json');
  if (isLottieFile && esgCampaignAnimation.value && props.esgCampaignScrnMrk.svcLotPath != undefined) {
    const mySumDistanceLottieurl = props.esgCampaignScrnMrk.svcLotPath;
    const startIndex = mySumDistanceLottieurl?.indexOf('/resources');
    const newUrl = mySumDistanceLottieurl?.substring(startIndex || 0);
    const response = await fetch(newUrl);
    const animationData = await response.json();
    try {
      animationInstance = lottie.loadAnimation({
        container: esgCampaignAnimation.value, // 애니메이션을 표시할 DOM 요소
        renderer: 'svg', // 렌더링 방식 ('svg', 'canvas', 'html' 중 선택)
        loop: true, // 애니메이션을 반복할지 여부
        autoplay: true, // 애니메이션을 자동으로 재생할지 여부
        // animationData: mySumDistanceInfo.value?.svcLotPath // 애니메이션 데이터가 있는 JSON 파일의 경로
        animationData: animationData // 애니메이션 데이터가 있는 JSON 파일의 경로
      });
    } catch (e) {
      isLoadLottie.value = false;
    }
  }
};
</script>

<style scoped></style>
