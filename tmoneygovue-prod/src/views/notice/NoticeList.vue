<template>
  <sub-header title="공지사항" />
  <main id="main" class="main mor">
    <div class="container bg_white no_padding">
      <div class="notice_area">
        <uu-button v-for="item in noticeList" :key="item.moappNtcMttrSno" @click="onClickDetail(item.moappNtcMttrSno)">
          <span class="text_wrap">
            <span class="title" :aria-label="getLabel(item.ntcMttrTtlNm, item.dotScrExprYn === 'Y')"
              >{{ item.ntcMttrTtlNm }}
              <span class="new" v-if="item.dotScrExprYn === 'Y'" />
            </span>
            <span class="info">
              <span class="category" :class="{ tmoney: item.ntcMttrDvsCd === 'S' }">{{ item.ntcMttrDvsNm }}</span>
              <span class="date" :aria-label="formatA11yDateTime(item.rgtDtm)">{{ item.rgtDtm }}</span>
            </span>
          </span>
          <uu-ic size="24" name="arrow" />
        </uu-button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useNoticeStore } from '@/service/notice/noticeModule';
import { onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { formatA11yDateTime } from '@/utils/dateUtils';

const router = useRouter();
const noticeStore = useNoticeStore();
const { getNoticeList } = storeToRefs(noticeStore);

onMounted(async () => {
  await noticeStore.requestNoticeList();
});

const noticeList = computed(() => {
  return getNoticeList.value;
});

// const setType = (type: string) => {
//   switch (type) {
//     case 'B':
//       return '고속시외';
//     case 'T':
//       return '따릉이';
//     case 'X':
//       return '씽씽이';
//     case 'O':
//       return '온다';
//     case 'S':
//       return '티머니GO';
//     case 'P':
//       return '대중교통';
//     case 'D':
//       return '타슈';
//     case 'G':
//       return '지쿠';
//     case 'K':
//       return '킥고잉';
//   }
// };

const onClickDetail = (moappNtcMttrSno: string) => {
  router.push({ path: '/notice/notice-detail', query: { moappNtcMttrSno: moappNtcMttrSno } });
};

const getLabel = (title: string, isNew: boolean) => {
  if (isNew) return `${title}.중요 공지`;
  return title;
};
</script>
