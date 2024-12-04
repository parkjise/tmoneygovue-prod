import { defineStore } from 'pinia';
import type { FaqCategoryModel, FaqModel, ReqFaqList } from '@/service/customer-support/model/faqModel';
import { getFaqCategories, getFaqList } from '@/service/customer-support/faqApi';

interface faqState {
  faqList: FaqModel[];
  faqCategoryList: FaqModel[];
  faqCateList: FaqCategoryModel[];
}

export const useFaqStore = defineStore({
  id: 'faqStore',

  state: (): faqState => ({
    faqList: [],
    faqCategoryList: [],
    faqCateList: []
  }),

  getters: {
    getFaqList(): FaqModel[] {
      return this.faqList;
    },
    getFaqCategoryList(): FaqModel[] {
      return this.faqCategoryList;
    },
    getFaqCateList(): FaqCategoryModel[] {
      return this.faqCateList.sort((l) => l.srsq);
    }
  },
  actions: {
    /**
     * 자주하는 질문 카테고리 별 목록 조회
     * @param data
     */
    async actionRequestFaqList(data: ReqFaqList) {
      this.faqList = [];
      this.faqCategoryList = [];
      const res = await getFaqList(data);
      if (res) {
        if (res.cateDtlList) {
          this.faqList = res.cateDtlList;
        }
        if (res.cateDtlGroupList) {
          this.faqCategoryList = res.cateDtlGroupList;
        }
      }

      return res;
    },
    async asctionRequestFaqCateList() {
      this.faqCateList = [];

      const res = await getFaqCategories();

      if (res) {
        if (res.faqCateList) {
          this.faqCateList = res.faqCateList;
        }
      }

      return res;
    }
  }
});
