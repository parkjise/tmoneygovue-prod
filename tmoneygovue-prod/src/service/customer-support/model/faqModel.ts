export interface ReqFaqList {
  //카테고리 코드
  faqCtgCd: string;
  //검색 키워드?
  keyword: string;
}

export interface FaqModel {
  faqTypCd: string;
  moappSno: string;
  mblOsKndCd: string;
  moappVer: string;
  rnwlNedYn: string;
  rgsrId: string;
  rgtDtm: string;
  updrId: string;
  updDtm: string;
  ntfcTtlNm: string;
  ntfcCtt: string;
  cnctMoappUrlVal: string;
  faqCtgCd: string;
  cateTitle: string;
  cdSndAdtnInfCtt: string;
  cateCd: string;
  cateNm: string;
  dtlCmnCdNm: string;
  faqTtlNm: string;
  faqCtt: string;
  keyWord: string;
}

export interface FaqListModel {
  cateDtlList: Array<FaqModel>;
  cateDtlGroupList: Array<FaqModel>;
}

export interface FaqCategoryModel {
  cateNm: string;
  cateCd: string;
  imgPathVal: string;
  srsq: number;
}

export interface FaqCategoryListModel {
  faqCateList: Array<FaqCategoryModel>;
}
