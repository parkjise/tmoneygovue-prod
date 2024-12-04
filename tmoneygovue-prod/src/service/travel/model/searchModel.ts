/**
 * @description 상품검색화면조회 > 기획전목록
 */
export interface SrchPlanData {
  planId: string;
  title: string;
}
/**
 * @description 연관검색어조회 response
 */
export interface ResAssosiatedSrch {
  areaList: AscAreaData[];
  keywords: string[];
  prdList: AscPrdData[];
}
/**
 * @description 연관검색어조회 > 지역목록
 */
export interface AscAreaData {
  areaId: string;
  areaName: string;
}
/**
 * @description 연관검색어조회 > 상품목록
 */
export interface AscPrdData {
  trvlPrdId: string;
  trvlPrdNm: string;
}
