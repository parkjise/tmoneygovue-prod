/**
 * @description 전체데이터정보
 */
export interface Total {
  totalItems: number; //전체건수
  totalPages: number; //전체페이지수
}
/**
 * @description 여행상품
 */
export interface Trvl {
  trvlPrdId: string; //여행상품ID
  trvlPrdNm: string; //여행상품명
}
/**
 * @description 지역목록
 */
export interface Area {
  areaId: string; //지역ID
  areaName: string; //지역명
}
/**
 * @description 카테고리
 * @field categoryId: string 카테고리ID
 * @field categoryName: string 카테고리명
 */
export interface Category {
  categoryId: string; //카테고리ID
  categoryName: string; //카테고리명
  categoryDepth?: string; //카테고리단계
}
/**
 * @description 여행이용자정보
 */
export interface PassengerInfo {
  busTckKndCd: string; //버스티켓종류코드
  busTckKndNm: string; //버스티켓종류명
  trvlTissuId: string; //여행발권ID
  psngFrnm: string; // 승객이름
  psngMbphNo: string; //승객휴대폰번호
  psngGndrCd: string; //승객성별코드
  evcpUseYn: string; //이벤트쿠폰사용여부
}
