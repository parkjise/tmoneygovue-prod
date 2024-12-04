import type { Category, Trvl, Area, Total } from './trvlCmmModel';

/**
 * @description 여행상품목록조회 request
 */
export interface ReqTravelProduct {
  keyword?: string; //키워드
  areaIds?: string; //지역ID
  categoryIds?: string; //카테고리ID
  lowPrice?: number; //낮은가격(필터)
  highPrice?: number; //높은가격(필터)
  sort?: string; //정렬
  page?: number; //페이지
  size?: number; //사이즈(페이지 당 컨텐츠 수, defalt 20)
}

/**
 * @description 여행상품목록조회 response
 */
export interface ResTravelProduct extends Total {
  prdList: ProductData[]; //상품목록
}
/**
 * @description 여행상품목록조회 > 상품목록
 */
export interface ProductData extends Trvl, Area {
  rotId: string; //노선ID
  prdPrice: number; //상품가격
  dcPrice: number; //할인가격
  imageUrl: string; //이미지URL
  dcAcmtPhrsCtt: string; // 할인적립문구내용
  prdStaCd: string; //상품상태코드
  prdStaNm: string; //상품상태명
  categoryList: Category[]; //카테고리목록
}

/**
 * @description 여행상품상세조회 request
 */
export interface ReqProductDtl {
  trvlPrdId: string; //여행상품ID
}
/**
 * @description 여행상품상세조회 response
 */
export interface ResProductDtl extends Trvl, Area {
  prdStaCd: string; //상품상태코드
  prdStaNm: string; //상품상태명
  startDate: string; //시작일자
  endDate: string; //종료일자
  prdPrice: number; //상품가격
  dcPrice: number; //할인가격
  deprTrmlCd: string; //출발터미널코드
  deprTrmlNm: string; //출발터미널명
  trvlRotId: string; //여행노선ID
  description: string; //여행상품내용
  scheduleContent: string; //상품일정내용
  includeContent: string; //상품포함내용
  excludeContent: string; //상품불포함내용
  alertContent: string; //상품경고내용
  refundContent: string; //상품취소/환불내용
  notificationContent: string; //예약유의사항내용
  name: string; //담당자명
  phone: string; //담당자연락처
  busCacmCd: string; //버스운수사코드
  busCacmNm: string; //버스운수사명
  busCacmTelNo: string; //버스운수사전화번호
  busCacmAddr: string; //버스운수사주소
  dcAcmtSno: string; //할인적립일련번호
  dcAcmtNm: string; //할인적립명
  famtFxrtDvsCd: string; //정액정율구분코드. 10:정액, 20:정율
  famtFxrtDvsNm: string; //정액정율구분명
  ctAmt: number; //기준금액
  ctRt: number; //기준율
  dcAcmtPhrsCtt: string; //할인적립문구내용
  images: string[]; //이미지배열
  keywords: string[]; // 검색어배열
  categoryList: Category[]; // 카테고리목록
}
/**
 * @description 기획전목록조회 request
 */
export interface ReqExhibitions {
  page?: number;
  size?: number;
}
/**
 * @description 기획전목록조회 response
 */
export interface ResExhibitions extends Total {
  planList: ExhibitionsData[]; //기획전목록
}
/**
 * @description 기획전목록조회 > 기획전목록
 */
export interface ExhibitionsData {
  planId: string; //기획전ID
  title: string; //제목
  startDate: string; //시작일자
  endDate: string; //종료일자
  imageUrl: string; //이미지URL
}
/**
 * @description 기획전상세조회 request
 */
export interface ReqExhibitionsDtl {
  planId: string; // 기획전ID
  page?: number;
  size?: number;
}
/**
 * @description 기획전상세조회 response
 */
export interface ResExhibitionsDtl {
  planId: string; //기획전ID
  title: string; //제목
  startDate: string; //시작일자
  endDate: string; //종료일자
  imageUrl: string; //이미지URL
  prdList: ExhibitionsDtlData[]; //상품목록
}
/**
 * @description 기획전상세조회 > 상품목록
 */
export interface ExhibitionsDtlData extends Trvl, Area {
  rotId: string; //노선ID
  prdPrice: number; //상품가격
  imageUrl: string; //이미지URL
  dcAcmtPhrsCtt: string; //할인적립문구내용
  prdStaCd: String; //상품상태코드
  prdStaNm: string; //상품상태명
  categoryList: Category[]; //카테고리목록
}
