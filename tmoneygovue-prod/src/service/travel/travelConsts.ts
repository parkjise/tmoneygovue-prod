import type { SwiperOptions } from 'swiper/types';

export const swiperOptions: SwiperOptions = {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
    renderFraction: function (currentClass, totalClass) {
      return (
        '<span class="' +
        currentClass +
        '" aria-hidden="true"></span>' +
        '<span class="swiper_pagination_separator" aria-hidden="true">/</span>' +
        '<span class="' +
        totalClass +
        '" aria-hidden="true"></span>'
      );
    }
  },
  a11y: {
    enabled: true,
    slideRole: '',
    prevSlideMessage: 'Previous slide',
    nextSlideMessage: 'Next slide',
  },
  autoplay: {
    delay: 3000
  }
};
/**
 * @description 필터 '전체'코드 값
 */
export const ALL_CODE = 'ALL';
/**
 * @description 티켓상품 카테고리코드
 */
export const TicketCatgrCd = 'TDA';
/**
 * @description 인트로화면 이벤트팝업광고
 */
export const AdvrLocCd = {
  I: 'I', // 이벤트배너
  H: 'H' // 이벤트팝업
};
export const AdvrCd = {
  I: 'I', // 광고게시유형코드_인트로 광고 유형
  B: 'B', // 광고게시유형코드_배너 광고 유형
  P: 'P'
};
/**
 * @description localstorage 키워드 key값
 */
export const LOC_KWRD = {
  split: '$|$|',
  maxLen: 10
};
/**
 * @description 상품조회 > 검색필터 정렬
 */
interface SortOption {
  value: string;
  sortName: string;
}
/**
 * @description 검색필터 정렬
 */
export const Sort: Record<string, SortOption> = {
  RECOMMEND: {
    value: 'recommend',
    sortName: '추천 순'
  },
  NEWEST: {
    value: 'newest',
    sortName: '최신 순'
  },
  HIGHEST: {
    value: 'highest',
    sortName: '최고가 순'
  },
  LOWEST: {
    value: 'lowest',
    sortName: '최저가 순'
  }
};
/**
 * @description 성별코드
 */
export const GenderType = {
  M: 'M',
  F: 'F'
};

/**
 * @description 화면 경로
 * I: 예약하기 > 이용자 정보 입력 화면
 * H: 이용내역 화면
 */
export const RSRV_PATH = {
  I: '/travel/reservation/info',
  H: '/travel/history'
};
/**
 * @description 상품상태코드
 */
export const PrdStatus = {
  READY: 'Ready', // 예약가능
  PAUSE: 'Pause', // 예약중지
  CONFIRM: 'Confirm' // 출발확정
};
/**
 * @description 여행예매상태코드
 */
export const TrvlMrsSta = {
  SUCCESS: '1', //예매완료
  CANC: '2' //예매취소
};
/**
 * @description 여행티켓상태코드
 */
export const TrvlTckSta = {
  SUCCESS: '10', //예매완료
  CANC_RGT: '20', //취소요청
  CANC_COMP: '30', //취소완료
  BLTCN_CMPLT: '40' //검표완료
};
/**
 * @description 여행결제처리상태코드
 */
export const TrvlPymPrcgSta = {
  PYM_COMP: '10', //결제완료
  PYM_CANC: '20', //결제취소
  PYM_PART_CANC: '30' //부분취소
};
/**
 * @description 취소요청여부
 */
export const ReqCanc = {
  Y: 'Y', // 취소요청(취소접수)
  N: 'N' // 결제취소(즉시취소)
};
