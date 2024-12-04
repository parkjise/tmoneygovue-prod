import type { Category, Trvl, Area } from './trvlCmmModel';

/** @description 상품카테고리 */
export interface CategoryData extends Category {
  imageUrl: string; //이미지URL
  subCategories: Category[]; //하위카테고리목록
}
/** @description 테마 */
export interface ThemeData {
  themeId: string; //테마ID
  themeName: string; //테마명
}
/**
 * @description 인기여행지목록
 */
export interface PopularAreaData extends Area {
  imageUrl: string; //이미지URL
  linkUrl: string; //링크URL
}
/**
 * @description 베스트상품목록
 */
export interface BestPrdData extends Trvl {
  imageUrl: string; //이미지URL
  linkUrl: string; //링크URL
  prdPrice: number; // 상품가격
  dcPrice: number; // 할인가격
  categoryList: Category[];
}
/**
 * @description 배너목록
 */
export interface BannerData {
  bannerId: string; //배너ID
  imageUrl: string; //이미지url
  linkUrl: string; //링크url
  title: string; // 접근성 컨텐츠 내용
}
/**
 * @description 인트로팝업광고 (티머니고센터) request
 */
export interface ReqAdvrList {
  advrSvcDvsCd: string; //광고서비스구분코드 3.1.1
  advrLocDvsCd: string; //광고위치구분코드 3.1.2
}
/**
 * @description 인트로팝업광고 (티머니고센터) response
 */
export interface ResAdvrList {
  actScsTyp: string; //실행성공유형 T:공지, A:광고
  ntcMttrList: NtcMttrData[]; //공지사항정보
  advrList: AdvrData[]; //광고화면설정정보
}
export interface NtcMttrData {
  ntcType: string; //공지유형 T:text
  advrStupSno: string; //광고번호
  sortSeq: number; //광고순번
  ntcMttrTtlNm: string; //공지사항제목
  ntcMttrCtt: string; //공지사항내용
}
export interface AdvrData {
  sortSeq: number; //정렬순서
  advrAreaDvsCd: string; //광고지역구분코드
  advrStupSno: string; //광고설정일련번호
  advrStupNm: string; //광고제목
  useYn: string; //사용여부
  advrBltnTypCd: string; //광고게시유형코드 3.1.3
  advrExpaTypCd: string; //광고노출유형코드 3.1.4
  advrImgPathVal: string; //광고이미지경로
  advrBltnDrtmVal: string; //광고게시시간
  mvmnPathVal: string; //이동경로값
  mvmnPathTtlNm: string; //이동경로제목
  mvmnPathTypCd: string; //이동경로유형코드 3.1.5
  mvmnPathGbcIconTypCd: string; //이동경로뒤로가기아이콘유형코드 3.1.6
  authTknNedYn: string; //인증토큰필요여부
  advrImgCtt: string; // 대체텍스트 영역
}
/**
 * @description 여행예약목록
 */
export interface TrvlMrnpData extends Trvl {
  trvlMrnpSno: string; // 여행예약일련번호
  prdCtgCd: string; //상품분류코드
  prdCtgNm: string; //상품분류명
  mrnpDt: string; //예약일자
  deprDt: string; //출발일자
  deprTime: string; //출발시각
  trvlMrsStaCd: string; //여행예매상태코드
  trvlMrsStaNm: string; //여행예매상태명
  busTckKndNm: string; //버스티켓종류명
  tissuNcnt: Number; //발권건수
}
