<template>
  <!-- header -->
  <sub-header title="자주하는 질문" />
  <!-- // header -->
  <!-- main -->
  <main id="main" class="main mor">
    <div class="container no_padding">
      <div class="faq_detail">
        <div class="top_fixed_area">
          <!-- [240521] 웹 접근성 준수 작업 -->
          <button
            type="button"
            class="faq_select_btn"
            :aria-label="faqCateList.find((item) => item.cateCd === radio01)?.cateNm"
            @click="modal01Ref.showModal($event)"
          >
            {{ faqCateList.find((item) => item.cateCd === radio01)?.cateNm }}
            <uu-ic name="thickarrow" size="24" direction="right" />
          </button>
          <!-- // [240521] 웹 접근성 준수 작업 -->
          <uu-input
            v-model="keyword"
            placeholder="검색하실 키워드를 입력하세요"
            has-ic
            btn-clear
            hide-label
            label="검색하실 키워드를 입력하세요"
            @keydown="handleKeydown"
          >
            <template #ic_name>
              <uuIc v-bind="{ name: 'search', size: '20', color: 'primary' }" />
            </template>
          </uu-input>
        </div>
        <uu-tabs class="depth2_tab faq_datail_tab" v-if="reMount">
          <uu-tab v-for="(category, categoryIndex) in faqCategoryList" :key="categoryIndex" :title="category.cateNm">
            <div class="selected_faq_detail">{{ category.cateNm }}</div>
            <uu-accordion class="faq_list">
              <uu-accordion-item
                v-for="(item, itemIndex) in faqList.filter((value) => value.dtlCmnCdNm === category.cateNm)"
                :key="itemIndex"
                :header="'Q. '+item.faqTtlNm"
              >
                <template #accordion_header>
                  <p class="faq_question">{{ item.faqTtlNm }}</p>
                </template>
                <template #accordion_body>
                  <p class="faq_answer_title" v-html="santizedHtml(getTitle(item.faqCtt).trim())" tabindex="0"></p>
                  <ol class="faq_answer_list">
                    <li
                      v-for="(content, contentIndex) in getContent(item.faqCtt)"
                      :key="contentIndex"
                      v-html="santizedHtml(content.trim())"
                      tabindex="0"
                    ></li>
                  </ol>
                </template>
              </uu-accordion-item>
            </uu-accordion>
          </uu-tab>
        </uu-tabs>
      </div>
    </div>
  </main>
  <!-- // main -->
  <!-- 카테고리 선택 바텀시트 -->
  <common-modal ref="modal01Ref" v-model="modal01" title="카테고리 선택" type="bottom" hide-footer>
    <!-- <template #modal_header> 카테고리 선택 </template> -->
    <template #modal_body>
      <form class="inquiry_type_select">
        <uu-radio
          v-for="(item, index) in faqCateList"
          :key="index"
          v-model="radio01"
          :value="item.cateCd"
          dropdown-radio
        >
          <template #label>
            <p>{{ item.cateNm }}</p>
          </template>
        </uu-radio>
      </form>
    </template>
  </common-modal>
  <!-- // 카테고리 선택 바텀시트 -->
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { santizedHtml } from '@/utils';

import { useFaqStore } from '@/service/customer-support/faqModule';
import type { ReqFaqList } from '@/service/customer-support/model/faqModel';
import UuInput from '@/components/uu-components/UuInput.vue';
import CommonModal from '@/views/common/components/CommonModal.vue';

const modal01Ref = ref(); // Ref
const modal01 = ref<boolean>(false); // v-model

const radio01 = ref('');
const keyword = ref<string>(''); // v-model
const reMount = ref<boolean>(true);

const route = useRoute();

const faqStore = useFaqStore();
const { getFaqList, getFaqCategoryList, getFaqCateList } = storeToRefs(faqStore);

const faqCateList = computed(() => {
  return getFaqCateList.value;
});

const faqCategoryList = computed(() => {
  return getFaqCategoryList.value;
});

const faqList = computed(() => {
  return getFaqList.value;
});

/**
 * 자주하는 질문 목록 조회
 */
async function requestFaqList() {
  reMount.value = false;

  await faqStore.actionRequestFaqList({
    keyword: keyword.value,
    faqCtgCd: radio01.value
  } as ReqFaqList);

  setTimeout(() => {
    reMount.value = true;
  }, 0);
  modal01Ref.value.closeModal();
}

/**
 * 타이틀 포맷팅
 * @param faqCtt
 */
const getTitle = (faqCtt: string) => {
  if (faqCtt.indexOf('<br/>    <br/>') >= 0) {
    return faqCtt.slice(0, faqCtt.indexOf('<br/>    <br/>'));
  } else {
    return faqCtt;
  }
};

/**
 * 컨텐츠 포맷팅
 * @param faqCtt
 */
const getContent = (faqCtt: string) => {
  if (faqCtt && faqCtt !== getTitle(faqCtt)) {
    faqCtt = faqCtt.slice(faqCtt.indexOf('<br/>    <br/>')).trim();
    return faqCtt.split('<br/>');
  }
};

/**
 * 바텀시트 값이 변경될 경우 목록 재 조회
 */
watch(radio01, async (value, oldValue) => {
  if (value !== oldValue) {
    keyword.value = '';
    await requestFaqList();
  }
});

/**
 * 엔터키로 조회
 * @param event
 */
const handleKeydown = async (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    await requestFaqList();
  }
};

onMounted(async () => {
  radio01.value = route.query.faqCtgCd as string;
  await faqStore.asctionRequestFaqCateList();
});
</script>
