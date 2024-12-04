<template>
  <!-- header -->
  <sub-header title="자주하는 질문" />
  <!-- // header -->
  <!-- main -->
  <main id="main" class="main mor">
    <div class="container">
      <div class="faq_category">
        <ul class="faq_category_list">
          <li v-for="(item, index) in faqCateList" :key="index">
            <button type="button" @click="onClickFaq(item.cateCd)">
              <div class="img_wrap">
                <img :src="'/' + item.imgPathVal" />
              </div>
              <div class="category_txt">{{ item.cateNm }}</div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </main>
  <!-- // main -->
</template>
<script setup lang="ts">
import subHeader from '@/components/layout/SubHeader.vue';
import router from '@/router';

import { useFaqStore } from '@/service/customer-support/faqModule';
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';

const faqStore = useFaqStore();
const { getFaqCateList } = storeToRefs(faqStore);

//7-17 운영배포 이후 테스트 후 개발 필요
const faqCateList = computed(() => {
  return getFaqCateList.value;
});

/**
 * 자주하는 질문 목록 화면 이동
 * @param faqCtgCd
 */
function onClickFaq(faqCtgCd: string) {
  router.push({
    path: '/customer-support/faq-list',
    query: { faqCtgCd: faqCtgCd }
  });
}

//7-17 운영배포 이후 테스트 후 개발 필요
onMounted(async () => {
  await faqStore.asctionRequestFaqCateList();
});
</script>
