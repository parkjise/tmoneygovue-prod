import { defHttp } from '@/utils/http/axios';
import type { FaqCategoryListModel, FaqListModel, ReqFaqList } from '@/service/customer-support/model/faqModel';

enum Api {
  // rstCd 없어서 에러 호출됨
  //inqrFaqCateList = '/webview/app/faq/v2/faqCateList.ajax'
  inqrFaqCateList = '/webview/app/faq/v2/faqCateList',
  inqrFaqCateInf = '/api/sprt/v2/inqrFaqCateInf'
}

export const getFaqList = (data: ReqFaqList): Promise<FaqListModel> => {
  return defHttp.post({
    url: Api.inqrFaqCateList,
    data: {
      faqCtgCd: data.faqCtgCd,
      keyWord: data.keyword
    }
  });
};

export const getFaqCategories = (): Promise<FaqCategoryListModel> => {
  return defHttp.post({
    url: Api.inqrFaqCateInf
  });
};
