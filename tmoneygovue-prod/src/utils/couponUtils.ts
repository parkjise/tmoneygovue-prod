import type { PaymentCouponModel } from '@/service/order/orderModule';
import { formatDate, getDayWeek, getToday, isValidDate } from '@/utils/dateUtils';
import { truncateAmount } from '@/utils/amountUtils';
import type { CouponModel } from '@/service/coupon/model/couponModel';
import type { ResProductDtl } from '@/service/travel/model/productModel';
import { storeToRefs } from 'pinia';
import { useProductStore } from '@/service/travel/productModule';

export function filterCoupon(
  couponList: PaymentCouponModel[],
  utlzSvcDvsCd: string,
  amount?: number,
  keyCheckInfo?: any
) {
  // 정렬 기준 적용 이전 유효성 재체크를 위한 enable true로 초기화
  couponList.forEach((v) => (v.enable = true));

  couponList.forEach((coupon) => {
    if (coupon.enable) validateCouponCode([coupon], utlzSvcDvsCd); // 사용가능 서비스 코드 필터링
    if (coupon.enable) validateCouponDate([coupon]); // 사용/발급 가능 날짜 필터
    if (coupon.enable) validateCouponDays([coupon]); // 사용가능 요일 필터
    // if (coupon.enable) validateCouponTime([coupon]);  // 사용가능 시간 필터 미이용

    // 사용가능 금액 필터
    if (amount && amount !== undefined) {
      if (coupon.enable) validateCouponAmount([coupon], amount);
    }

    // 운송중개 카테고리 체크
    if (keyCheckInfo && keyCheckInfo !== undefined) {
      if (utlzSvcDvsCd == 'FG') {
        if (coupon.enable) validateKeyCheck([coupon], keyCheckInfo);
      }
    }
  });

  return couponList;
}

/** 사용가능 서비스 코드 필터링 */
export function validateCouponCode(couponList: PaymentCouponModel[], utlzSvcDvsCd: string) {
  // 각 쿠폰에 대해 순회합니다.
  // 1. utlzSvcDvsCd가 서비스코드 이거나 A(전체)가 아닌경우
  // 2. adptSvcCdList가 선언된 경우 코드가 포함된 경우
  couponList.forEach((v) => {
    if (
      v.enable &&
      v.utlzSvcDvsCd !== utlzSvcDvsCd &&
      v.utlzSvcDvsCd !== 'A' &&
      ((v.adptSvcCdList?.length || 0) === 0 || v.adptSvcCdList?.findIndex((d) => d === utlzSvcDvsCd) === -1)
    ) {
      v.enable = false;
    }
  });
}

/** 사용/발급가능 날짜 필터 */
export function validateCouponDate(couponList: PaymentCouponModel[]) {
  const today = getToday(); // 현재 날짜를 가져옵니다.
  couponList.forEach((v) => {
    // 사용날짜 체크
    if (v.enable && !isValidDate(today, v.useSttDtm, v.useEndDtm)) {
      v.enable = false;
    }
    // 발급가능일자 체크
    if (v.enable && v.issue && !isValidDate(today, v.issuSttDtm, v.issuEndDtm)) {
      v.enable = false;
    }
  });
}

/** 사용가능 요일 필터 */
export function validateCouponDays(couponList: PaymentCouponModel[]) {
  const today = getToday(); // 현재 날짜를 가져옵니다.
  couponList.forEach((v) => {
    // 오늘의 요일이 쿠폰의 사용 가능 요일에 포함되지 않는 경우, 쿠폰을 비활성화합니다.
    if (v.enable && v.useWkdyVal && v.useWkdyVal.indexOf(getDayWeek(today, 'd')) === -1) {
      v.enable = false;
    }
  });
}

/** 사용가능 시간 필터 */
export function validateCouponTime(couponList: PaymentCouponModel[]) {
  const currentTime = formatDate(new Date(), 'HHmmss');
  couponList.forEach((v) => {
    if (
      v.enable &&
      v.useTimeStr &&
      (currentTime < v.useTimeStr.substring(0, 6) || currentTime > v.useTimeStr.substring(7, 13))
    ) {
      v.enable = false;
    }
  });
}

/** 사용가능 금액 필터 ( 정액일 경우만 실행 ) */
export function validateCouponAmount(couponList: PaymentCouponModel[], amount: number) {
  couponList.forEach((v) => {
    if (amount === 0) {
      v.enable = false;
    } else {
      // 1. 상품금액 할인 최저금액 이상
      // 2024.06.27 앱 내 쿠폰 적용금액 50프로 로직 제거
      // 2. 상품금액의 50%이상이 할인될 경우 불가
      if (v.enable && v.dcKndCd == 'DA') {
        // const maxDiscount = amount * 0.5;
        const minPymAmt = +(v.minPymAmt ?? '0');
        // const dcAmt = +(v.dcAmt ?? '0');
        // if (amount < minPymAmt || dcAmt > maxDiscount) {
        if (amount < minPymAmt) {
          v.enable = false;
        }
      }
    }
  });
}

/** 쿠폰 여행상품 쿠폰 조건키 적용 */
const prdModule = useProductStore();
const { productDtl } = storeToRefs(prdModule);
export function validateCheck(queryStr: string) {
  const cateRegex = /(?:&prdCtgCd=)([^&]+)/;
  const themeRegex = /(?:&prdThmCd=)([^&]+)/;
  const cateMatch = queryStr.match(cateRegex);
  const themeMatch = queryStr.match(themeRegex);

  let categoryAble = false;
  let themeAble = false;

  // 상품카테고리와 쿠폰카테고리 일치여부
  if (cateMatch) {
    const result = cateMatch[1];
    const categories = result.split('|');
    categoryAble = categories.some((cat) => {
      return productDtl.value?.categoryList.find((prd) => prd.categoryDepth === '1' && prd.categoryId === cat);
    });
  } else categoryAble = true;

  // 상품테마와 쿠폰테마 일치여부
  if (themeMatch) {
    const result = themeMatch[1];
    const themeList = result.split('|');
    themeAble = themeList.some((theme) => {
      return productDtl.value?.categoryList.find((prd) => prd.categoryDepth === '2' && prd.categoryId === theme);
    });
  } else themeAble = true;

  return categoryAble && themeAble;
}

/** 쿠폰 여행상품 쿠폰 조건키 적용 */
// cndtKeyVal="prdCtgCd=TAA000|TAB000|TAC000&prdThmCd=TAA001|TAA002|TAB003|TAC004&busCacmCd=T010|T020&trvlRotId=TP001|TP005"
export function validateKeyCheck(couponList: PaymentCouponModel[], keyCheckInfo: ResProductDtl) {
  couponList.forEach((v) => {
    // 조건 사용
    if (v.cndtUseYn === 'Y' && v.cndtKeyVal && v.cndtKeyVal !== '') {
      v.productCategoryList = [];
      v.productThemeList = [];
      // key별로 split하여 저장
      const params = v.cndtKeyVal.split('&');
      const paramMap: { [key: string]: string } = {};
      params.forEach((param) => {
        const [key, value] = param.split('=');
        if (key && value) {
          paramMap[key] = value;
        }
      });

      // 카테고리
      const prdCtgCd = paramMap['prdCtgCd'] || null;
      if (prdCtgCd && prdCtgCd !== '') {
        v.productCategoryList?.push(...prdCtgCd.split('|'));
        const cate = keyCheckInfo.categoryList.find((d) => d.categoryDepth === '1')?.categoryId || '';
        if (v.enable && (cate === '' || `|${prdCtgCd}`.indexOf(`|${cate}`) === -1)) {
          v.enable = false;
          return;
        }
      }

      // 테마
      const prdThmCd = paramMap['prdThmCd'] || null;
      if (prdThmCd && prdThmCd !== '') {
        v.productThemeList?.push(...prdThmCd.split('|'));
        const cateList = keyCheckInfo.categoryList.filter((d) => d.categoryDepth === '2');
        if (
          v.enable &&
          (cateList.length === 0 || !cateList.some((cate) => `|${prdThmCd}`.indexOf(`|${cate.categoryId}`) !== -1))
        ) {
          v.enable = false;
          return;
        }
      }

      // 여행사(운수사)
      const busCacmCd = paramMap['busCacmCd'] || null;
      if (busCacmCd && busCacmCd !== '') {
        if (v.enable && `|${busCacmCd}`.indexOf(`|${keyCheckInfo.busCacmCd}`) === -1) {
          v.enable = false;
          return;
        }
      }

      // 노선코드
      const trvlRotId = paramMap['trvlRotId'] || null;
      if (trvlRotId && trvlRotId !== '') {
        if (v.enable && `|${trvlRotId}`.indexOf(`|${keyCheckInfo.trvlRotId}`) === -1) {
          v.enable = false;
          return;
        }
      }
    }
  });
}

/** 쿠폰적용 할인 금액 */
export function couponAmountCalculate(coupon: PaymentCouponModel | undefined, amount: number) {
  if (!coupon) {
    return 0;
  }
  // 정액
  if (coupon.dcKndCd === 'DA') {
    const discount = Number(coupon.dcAmt ?? '0');
    return discount > amount ? amount : discount;
  } else {
    // 정률
    const dcRt = Number(coupon.dcRt ?? '0');
    const maxDiscount = Number(coupon.maxDcAmt ?? '0');
    const discount = (amount * dcRt) / 100 > maxDiscount ? maxDiscount : (amount * dcRt) / 100;
    return truncateAmount(discount > amount ? amount : discount);
  }
}

/**
 * 쿠폰목록 카테고리 별 필터링
 * @param list
 * @param category
 */
export function listFiltering(list: CouponModel[], category: string) {
  let couponListFilter: string[] = [];

  switch (category) {
    case 'B':
      couponListFilter = ['A', 'B', 'C', 'H'];
      break;
    case 'T':
      couponListFilter = ['A', 'T', 'D'];
      break;
    case 'X':
      couponListFilter = ['A', 'X', 'E', 'G', 'I', 'K', 'J', 'W', 'M', 'Q'];
      break;
    case 'L':
      couponListFilter = ['A', 'L'];
      break;
    case 'O':
      couponListFilter = ['A', 'O', 'FD', 'FC'];
      break;
    case 'FG':
      couponListFilter = ['A', 'FG'];
      break;
    default:
      return list.filter(
        (value) => value.adptSvcVal.includes(category) || value.utlzSvcDvsCd === category || value.utlzSvcDvsCd === 'A'
      );
  }

  return list.filter((value) => {
    return (
      couponListFilter.includes(value.utlzSvcDvsCd) ||
      couponListFilter.some((element) => value.adptSvcCdList?.includes(element))
    );
  });
}
