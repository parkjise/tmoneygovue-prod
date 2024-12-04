<template>
  <div class="mileage">
    <p class="box_title" :style="titleStyle" v-html="santizedHtml(props.myMileageScrnMrk.svcTtlNm)"></p>
    <div class="img_area">
      <img src="/assets/images/img_my_mileage.png" alt="" />
    </div>
    <div class="reward">
      <p class="tooltip_wrap">
        이번 달 나의 리워드 현황
        <uu-tooltip content="모빌리티 별 마일리지 현황을 한눈에 볼수 있어요!" />
      </p>
      <!-- TODO: SRT/항공이 추가 시 style 제거 필요 20241002 요청 -->
      <ul class="reward_list" :style="rewordMoreContent ? '' : 'margin-bottom: 1.5rem'">
        <li
          v-for="reword in props.myMileageScrnMrk.scrnMrkInfoList"
          :key="reword.utlzSvcDvsNm"
          :aria-labelledby="`item-label${reword.utlzSvcDvsNm}`"
          tabindex="0"
        >
          <span :id="`item-label${reword.utlzSvcDvsNm}`" class="sr_only" aria-hidden="true">
            {{ reword.utlzSvcDvsNm }} {{ reword.trtrMlgAmt || '0' }} 마일리지
          </span>
          <span class="title" aria-hidden="true">
            <img
              :src="
                imageBasePath + rewordStateIconImageMap.get(reword.utlzSvcDvsCd) ||
                '/assets/images/ic/ic_reward_subway.png'
              "
              :alt="reword.utlzSvcDvsNm + ' 아이콘'"
              aria-hidden="true"
            />
            {{ reword.utlzSvcDvsNm }}
          </span>
          <span class="num" aria-hidden="true">
            <strong>{{ reword.trtrMlgAmt || '0' }}</strong>
            <span>M</span>
          </span>
        </li>
      </ul>
      <!-- TODO: SRT/항공이 추가 시 if문 제거 필요 20241002 요청 -->
      <uu-button class="btn_more" :class="{ clicked: rewordMoreContent }" @click="rewordMoreBtn"  v-if="rewordMoreContent">
        <template v-if="rewordMoreContent">
          리워드 현황 닫기
          <uu-ic size="16" name="arrow_right_gray070" direction="left" />
        </template>
        <!-- <template v-else>
          리워드 현황 더보기
          <uu-ic size="16" name="arrow_right_gray070" direction="right" />
        </template> -->
      </uu-button>
    </div>
    <uu-button class="btn_go" :style="btnStyle" @click="onClickMovePage(props.myMileageScrnMrk.dtlMvmnNmChcMvmnPath)">
      {{ props.myMileageScrnMrk.dtlMvmnNm || 'GO 마일리지 내역 자세히 보기' }}
      <my-main-arrow-icon :arrowColor="myMileageScrnMrk.dtlMvmnNmLrCd || '#111111'" />
    </uu-button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { type myScrnMrkListModel } from '@/service/main/model/myMainModel';
import { santizedHtml } from '@/utils';
import MyMainArrowIcon from '@/views/main/components/MyMainArrowIcon.vue';

import { AdbrixEvtId } from '@/utils/hybrid/type';
import { sendAdbrix } from '@/utils/sendAdbrixUtil';

const imageBasePath = import.meta.env.VITE_IMAGE_BASE_PATH;

const props = defineProps({
  // 마일리지 화면 마크업 정보
  myMileageScrnMrk: {
    type: Object as () => myScrnMrkListModel,
    required: true
  }
});

const emit = defineEmits(['onClickMovePage']);

const titleStyle = computed(() => {
  return {
    color: props.myMileageScrnMrk.svcTtlNmLrCd || '#111111'
  };
});

const btnStyle = computed(() => {
  return {
    color: props.myMileageScrnMrk.dtlMvmnNmLrCd || '#111111'
  };
});

// 화면 이동
const onClickMovePage = (link: string) => {
  if (link === 'tmoneytia://reward/transfer/main') {
    sendAdbrix(AdbrixEvtId.tapMyGoMlgTpc);
    link = 'tmoneytia://reward/main';
  } else if (link === 'tmoneytia://mileage/history') {
    sendAdbrix(AdbrixEvtId.tapMyGoMlg);
    link = '/mileage/mileage-history';
  }

  emit('onClickMovePage', link);
};

// 리워드 현황 더보기 펼치기여부
const rewordMoreContent = ref(false);

// 리워드 현황 더보기 버튼
const rewordMoreBtn = () => {
  rewordMoreContent.value = !rewordMoreContent.value;
};

// 리워드 아이콘 이미지 맵
const rewordStateIconImageMap = new Map<string, string>([
  ['P', '/assets/images/ic/ic_reward_subway.png'],
  ['B', '/assets/images/ic/ic_reward_bus.png'],
  ['O', '/assets/images/ic/ic_reward_taxi.png'],
  ['T', '/assets/images/ic/ic_reward_bike.png'],
  ['X', '/assets/images/ic/ic_reward_kickboard.png']
]);
</script>

<style scoped></style>
