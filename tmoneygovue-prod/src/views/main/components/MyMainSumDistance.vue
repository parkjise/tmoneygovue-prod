<template>
  <div class="move">
    <p class="box_title" :style="titleStyle" v-html="santizedHtml(props.mySumDistanceScrnMrk.svcTtlNm)"></p>
    <div class="move">
      <!-- <div ref="mySumDistanceAnimation"></div> -->
      <div v-if="isLottie && isLoadLottie" ref="mySumDistanceAnimation"></div>
      <div v-if="isLottie && !isLoadLottie">
        <div class="img_area">
          <img src="/assets/images/img_my_load_fail.png" alt="" />
        </div>
      </div>

      <div v-if="!isLottie" class="img_area">
        <img
          :src="props.mySumDistanceScrnMrk.svcLotPath"
          onerror="this.src='/assets/images/img_my_load_fail.png'"
          alt=""
        />
      </div>
      
      <div class="distance" tabindex="0">
        <p class="sr_only">{{ props.myMvmnDistance }}Km</p>
        <strong aria-hidden="true">{{ props.myMvmnDistance }}</strong><span aria-hidden="true">Km</span>
      </div>

      <uu-button
        class="btn_go"
        :style="btnStyle"
        @click="
          sendAdbrix(AdbrixEvtId.tapMyDistance),
            onClickMovePage(mySumDistanceScrnMrk?.dtlMvmnNmChcMvmnPath || '', props.mySumDistanceScrnMrk.dtlMvmnTitlNm)
        "
      >
        {{ props.mySumDistanceScrnMrk.dtlMvmnNm || '나의 교통비 보러가기' }}
        <my-main-arrow-icon :arrowColor="mySumDistanceScrnMrk.dtlMvmnNmLrCd || '#111111'" />
      </uu-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type myScrnMrkListModel } from '@/service/main/model/myMainModel';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import lottie, { type AnimationItem } from 'lottie-web';
import { santizedHtml } from '@/utils';
import MyMainArrowIcon from '@/views/main/components/MyMainArrowIcon.vue';

import { AdbrixEvtId } from '@/utils/hybrid/type';
import { sendAdbrix } from '@/utils/sendAdbrixUtil';

const props = defineProps({
  // 나의 총 이동거리 화면 마크업 정보
  mySumDistanceScrnMrk: {
    type: Object as () => myScrnMrkListModel,
    required: true
  },
  myMvmnDistance: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['onClickMovePage']);

const titleStyle = computed(() => {
  return {
    color: props.mySumDistanceScrnMrk.svcTtlNmLrCd || '#111111'
  };
});

const btnStyle = computed(() => {
  return {
    color: props.mySumDistanceScrnMrk.dtlMvmnNmLrCd || '#111111'
  };
});

// 화면 이동
const onClickMovePage = (link: string, headerTitle: string | null) => {
  emit('onClickMovePage', link, headerTitle);
};

onMounted(() => {
  // 나의 총 이동거리 애니메이션 초기화
  initMySumDistanceAnimationInstance();
});
onUnmounted(() => {
  if (mySumDistanceAnimationInstance) {
    mySumDistanceAnimationInstance.destroy(); // 애니메이션 인스턴스 제거
  }
});

// Lottie 애니메이션 존재 여부. json이 아니면 image를 노출
const isLottie = computed(() => {
  return props.mySumDistanceScrnMrk.svcLotPath.includes('.json');
});
const isLoadLottie = ref(true);

const mySumDistanceAnimation = ref<HTMLElement | null>(null);
let mySumDistanceAnimationInstance: AnimationItem | null = null;
// 나의 총 이동거리 애니메이션 초기화
const initMySumDistanceAnimationInstance = async () => {
  const isLottieFile = props.mySumDistanceScrnMrk.svcLotPath.includes('.json');
  if (isLottieFile && mySumDistanceAnimation.value && props.mySumDistanceScrnMrk.svcLotPath != undefined) {
    const mySumDistanceLottieurl = props.mySumDistanceScrnMrk.svcLotPath;
    const startIndex = mySumDistanceLottieurl?.indexOf('/resources');
    const newUrl = mySumDistanceLottieurl?.substring(startIndex || 0);
    const response = await fetch(newUrl);
    const animationData = await response.json();
    try {
      mySumDistanceAnimationInstance = lottie.loadAnimation({
        container: mySumDistanceAnimation.value, // 애니메이션을 표시할 DOM 요소
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
