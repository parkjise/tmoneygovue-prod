<template>
  <div>
    <p class="box_title" :style="titleStyle" v-html="santizedHtml(props.useReportScrnMrk.svcTtlNm)"></p>
    <div class="img_area">
      <img :src="props.useReportScrnMrk.svcTtlImgPath" alt="" />
    </div>
    <uu-button
      class="btn_go"
      :style="btnStyle"
      @click="onClickMovePage(props.useReportScrnMrk.dtlMvmnNmChcMvmnPath, props.useReportScrnMrk.dtlMvmnTitlNm)"
    >
      {{ props.useReportScrnMrk.dtlMvmnNm || '이번달 이용 리포트 확인하기' }}
      <my-main-arrow-icon :arrowColor="props.useReportScrnMrk.dtlMvmnNmLrCd || '#111111'" />
    </uu-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type myScrnMrkListModel } from '@/service/main/model/myMainModel';
import { santizedHtml } from '@/utils';
import MyMainArrowIcon from './MyMainArrowIcon.vue';

const props = defineProps({
  useReportScrnMrk: {
    type: Object as () => myScrnMrkListModel,
    required: true
  }
});

const emit = defineEmits(['onClickMovePage']);

const titleStyle = computed(() => {
  return {
    color: props.useReportScrnMrk.svcTtlNmLrCd || '#111111'
  };
});

const btnStyle = computed(() => {
  return {
    color: props.useReportScrnMrk.dtlMvmnNmLrCd || '#111111'
  };
});

// 화면 이동
const onClickMovePage = (link: string, headerTitle: string | null) => {
  emit('onClickMovePage', link, headerTitle);
};
</script>

<style scoped></style>
