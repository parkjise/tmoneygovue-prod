import type { Trvl, Category, Total } from './trvlCmmModel';

/**
 * @description 기획전목록 요청
 */
export interface ReqPlanData {
  page?: number;
  size?: number;
}
/**
 * @description 기획전목록
 */
export interface ResPlanData extends Total {
  planList: PlanData[]; //기획전목록
}
/**
 * @description 기획전목록 > 기획전목록
 */
export interface PlanData {
  planId: string; //기획전ID
  title: string; //제목
  startDate?: string; //시작일자
  endDate?: string; //종료일자
  imageUrl?: string; //이미지URL
}
/**
 * @description 기획전 상세 응답
 */
export interface ResPlanDtlData extends Total {
  planId: string; //기획전ID
  title: string; //제목
  startDate: string; //시작일자
  endDate: string; //종료일자
  imageUrl: string; //이미지URL
  prdList: PlanPrdData[]; //기획전상품목록
}
/**
 * @description 기획전상세 > 기획전상품목록
 */
export interface PlanPrdData extends Trvl {
  trvlRotId: string; //노선ID
  areaId: string; //지역id
  areaName: string; //지역명
  prdPrice: number; //상품가격
  dcPrice: number; //할인가격
  prdStaCd: string; //상태코드
  prdStaNm: string; //상태명
  imageUrl: string; //이미지URL
  dcAcmtPhrsCtt: string; //할인적립문구내용
  categoryList: Category[];
}
