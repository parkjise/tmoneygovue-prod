<template>
  <!-- header -->
  <sub-header title="1:1 문의 내역" />
  <!-- // header -->
  <!-- main -->
  <main id="main" class="main mor" v-if="!isShowInit">
    <div class="container bg_white no_padding">
      <div class="inquiry_detail_tit">
        <div class="inquiry_title_wrap">
          <div class="inquiry_title">
            {{ getComplainDetail.cvcpTtlNm }}
          </div>
        </div>
        <div class="inquiry_txt">
          {{ getComplainDetail.cvcpCtt }}
        </div>
        <div class="inquiry_detail split">
          <span class="date">{{ dayjs(getComplainDetail.rgtDtm).format('YYYY.MM.DD HH:mm') }}</span>
          <span class="inquiry_status" v-if="getComplainDetail.answYn == 'N'">답변대기</span>
          <span class="inquiry_status done" v-else>답변완료</span>
        </div>
      </div>
      <div class="inquiry_answer" v-if="getComplainDetail.answYn === 'Y'">
        <div class="inquiry_answer_tit">
          {{ dayjs(getComplainDetail.answDtm).format('YYYY.MM.DD HH:mm') }}
        </div>
        <div class="inquiry_answer_txt">
          {{ getComplainDetail.answCtt }}
        </div>
      </div>
    </div>
  </main>
  <!-- // main -->
</template>
<script setup lang="ts">
import { useComplainStore } from '@/service/customer-support/complainModule';
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const complainStore = useComplainStore();
const { getComplainDetail } = storeToRefs(complainStore);

const route = useRoute();
const router = useRouter();

const isShowInit = ref(true);

onMounted(async () => {
  const cvcpSno = route.query.cvcpSno as string; //url로 상세진입시 cvcpSno값으로 문의 찾기
  if (cvcpSno) {
    await complainStore.searchComplainDetail(cvcpSno);
    if (!getComplainDetail.value.cvcpSno) {
      router.back();
    } else {
      isShowInit.value = false;
    }
  } else {
    isShowInit.value = false;
  }
  complainStore.setTabIndex(1);
});
</script>
