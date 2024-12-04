<template>
  <sub-header title="공지사항" />
  <main id="main" class="main mor" v-if="!isInit">
    <div class="container bg_white no_padding">
      <div class="notice_area detail">
        <div class="notice_title">
          <div class="title">
            {{ getNoticeInfo.ntcMttrTtlNm }}
            <span class="new" v-if="getNoticeInfo.dotScrExprYn === 'Y'" />
          </div>
          <div class="info">
            <p class="category" :class="{ tmoney: getNoticeInfo.ntcMttrDvsCd === 'S' }">
              {{ getNoticeInfo.ntcMttrDvsNm }}
            </p>
            <p class="date">{{ getNoticeInfo.rgtDtm }}</p>
          </div>
        </div>
        <div class="notice_text">
          <div class="img_area" v-if="getNoticeInfo.ntcMttrImgPathVal?.trim() !== ''">
            <img :src="getNoticeInfo.ntcMttrImgPathVal" alt="임시 이미지" />
          </div>
          <p v-html="ntcMttrCtt"></p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useNoticeStore } from '@/service/notice/noticeModule';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const noticeStore = useNoticeStore();
const { getNoticeInfo } = storeToRefs(noticeStore);

const isInit = ref(true);

// 공지사항 내용
const ntcMttrCtt = computed(() => {
  return getNoticeInfo.value.ntcMttrCtt?.replace(/\n/gi, '<br />');
});

onMounted(async () => {
  let moappNtcMttrSno = route.query.moappNtcMttrSno as string;
  if (moappNtcMttrSno) {
    const res = await noticeStore.requestNoticeDetail(moappNtcMttrSno);
    if (res && res.noticeDtlInfo !== null) {
      isInit.value = false;
    } else {
      router.replace({ name: '/notice/notice-list' });
    }
  }
});
</script>
