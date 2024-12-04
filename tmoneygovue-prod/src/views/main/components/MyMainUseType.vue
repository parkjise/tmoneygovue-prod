<template>
  <div class="user">
    <p class="box_title" :style="titleStyle" v-html="santizedHtml(props.myUseTypeScrnMrk.svcTtlNm)"></p>
    <!-- 사용 유형이 없을 경우 -->
    <div class="img_area" v-if="!props.myUseTypeScrnMrk.svcTypeInfoList.length">
      <img
        src="/assets/images/img_my_no_user.png"
        alt="주사위 미션에 참여하고 혜택있는 삑이 배지를 모으면 리워드 혜택을 드려요!"
      />
    </div>
    <!-- 사용 유형이 있을 경우(스와이퍼 활성화) -->
    <uu-swiper type="custom" :options="myUseTypeSwiperOptions" v-else>
      <swiper-slide v-for="myUseType in props.myUseTypeScrnMrk.svcTypeInfoList" :key="myUseType.svcTypCd">
        <div class="swiper_inner">
          <div class="card">
            <div class="img_area">
              <img :src="myUseType.svcTypPath" :alt="myUseType.adptSeqNm" />
              <uu-button @click="onClickShareKakaoTalk(myUseType.svcTypPath)" aria-label="공유">
                <uu-ic size="24" name="share_white" />
              </uu-button>
            </div>
          </div>
        </div>
      </swiper-slide>
    </uu-swiper>
    <!-- // 사용 유형이 있을 경우(스와이퍼 활성화) -->
    <uu-button
      class="btn_go"
      :style="btnStyle"
      @click="
        sendAdbrix(AdbrixEvtId.tapMyType),
          onClickMovePage(props.myUseTypeScrnMrk?.dtlMvmnNmChcMvmnPath || '', props.myUseTypeScrnMrk.dtlMvmnTitlNm)
      "
    >
      {{ props.myUseTypeScrnMrk.dtlMvmnNm || '이번달 유형 배지 확인하기' }}
      <my-main-arrow-icon :arrowColor="myUseTypeScrnMrk.dtlMvmnNmLrCd || '#111111'" />
    </uu-button>
  </div>
</template>

<script setup lang="ts">
import { type myScrnMrkListModel } from '@/service/main/model/myMainModel';
import { type SwiperOptions } from 'swiper/types';
import uuSwiper from '@/components/uu-components/UuSwiper.vue';
import { SwiperSlide } from 'swiper/vue';
import { getAppBridge, santizedHtml } from '@/utils';
import { computed } from 'vue';
import MyMainArrowIcon from '@/views/main/components/MyMainArrowIcon.vue';

import { AdbrixEvtId } from '@/utils/hybrid/type';
import { sendAdbrix } from '@/utils/sendAdbrixUtil';

const props = defineProps({
  // 나의 사용유형 화면 마크업 정보
  myUseTypeScrnMrk: {
    type: Object as () => myScrnMrkListModel,
    required: true
  }
});

const emit = defineEmits(['onClickMovePage']);

const titleStyle = computed(() => {
  return {
    color: props.myUseTypeScrnMrk.svcTtlNmLrCd || '#111111'
  };
});

const btnStyle = computed(() => {
  return {
    color: props.myUseTypeScrnMrk.dtlMvmnNmLrCd || '#111111'
  };
});

// 화면 이동
const onClickMovePage = (link: string, headerTitle: string | null) => {
  emit('onClickMovePage', link, headerTitle);
};

// 나의 사용유형 swiper options
const myUseTypeSwiperOptions: SwiperOptions = {
  slidesPerView: 'auto',
  spaceBetween: 16,
  centeredSlides: true
};

const onClickShareKakaoTalk = async (shareImageUrl: string) => {
  const appBridge = await getAppBridge();
  await appBridge.shareKakaoTalk({
    shareImageUrl: shareImageUrl
  });
};
</script>

<style scoped></style>
