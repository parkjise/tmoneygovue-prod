<!-- 상품 상세 페이지 -->
<template>
  <sub-header title="상품 상세" hide-title bg-color="transparent" isBackIcon />
  <!-- 조회상품 없는경우 -->
  <no-result-component v-if="noResult" class="product_detail" />
  <template v-else>
    <main class="main no_padding">
      <div class="container bottom_btns product_detail_page">
        <div
          class="product_detail_img"
          :style="`background: linear-gradient(to bottom,rgba(0, 0, 0, 0.5),rgba(255,255,255,.1) 27%,rgba(0,0,0,0) 50%,rgba(0, 0, 0, .5)),
          url(${productDtl?.images[0] || ''})
          no-repeat
          center/cover`"
        />
        <round-box class="product_detail_info" hide-title>
          <div class="product_detail_badge">
            <span v-for="(item, index) in productDtl?.categoryList" :key="index">{{ item.categoryName || '' }}</span>
          </div>
          <div class="product_detail_tit">
            {{ productDtl?.trvlPrdNm || '' }}
            <div class="product_info">
              <span v-if="getIsTicketPrd === false">{{ productDtl?.deprTrmlNm || '' }} 출발</span>
              <span>{{ getUseableDate }}</span>
            </div>
          </div>
          <div class="product_detail_prices">
            <!-- 예약중지/출발확정 상태 -->
            <template
              v-if="
                productDtl && (productDtl.prdStaCd === PrdStatus.PAUSE || productDtl.prdStaCd === PrdStatus.CONFIRM)
              "
            >
              <div
                class="underline_price_wrap pause"
                v-if="isDcPrice"
                tabindex="0"
                :aria-label="`${getPriceText(productDtl?.prdPrice)}원`"
              >
                <span class="underline_price" aria-hidden="true">{{ getPriceText(productDtl?.prdPrice) }}</span
                ><span aria-hidden="true">원</span>
              </div>
              <div class="product_detail_price">
                <div class="detail_price_badge">
                  {{ productDtl.prdStaNm }}
                </div>
                <div
                  class="price_wrap"
                  tabindex="0"
                  :aria-label="`${getPriceText(isDcPrice ? productDtl?.dcPrice : productDtl?.prdPrice)}원`"
                >
                  <span class="price" aria-hidden="true">{{
                    getPriceText(isDcPrice ? productDtl?.dcPrice : productDtl?.prdPrice)
                  }}</span
                  ><span aria-hidden="true">원</span>
                </div>
              </div>
            </template>
            <!-- 예약 가능 상태 -->
            <template v-else>
              <div class="product_detail_price">
                <div
                  class="underline_price_wrap"
                  v-if="isDcPrice"
                  :aria-label="`${getPriceText(productDtl?.prdPrice)}원`"
                  tabindex="0"
                >
                  <span class="underline_price" aria-hidden="true">{{ getPriceText(productDtl?.prdPrice) }}</span
                  ><span aria-hidden="true">원</span>
                </div>
                <div
                  class="price_wrap"
                  tabindex="0"
                  :aria-label="`${getPriceText(isDcPrice ? productDtl?.dcPrice : productDtl?.prdPrice)}원`"
                >
                  <span class="price" aria-hidden="true">{{
                    getPriceText(isDcPrice ? productDtl?.dcPrice : productDtl?.prdPrice)
                  }}</span
                  ><span aria-hidden="true">원</span>
                </div>
              </div>
            </template>
          </div>
          <div class="mileage_area" v-if="productDtl?.dcAcmtPhrsCtt && productDtl?.dcAcmtPhrsCtt != ''">
            <uu-ic v-bind="{ name: 'mileage', size: '16' }" />
            <span>{{ productDtl.dcAcmtPhrsCtt }}</span>
          </div>
          <div class="keyword_area" v-if="keywordList && keywordList.length > 0">
            <div class="keyword_tit">미리보는 키워드</div>
            <ul class="keyword_list">
              <li v-for="(item, index) in keywordList" :key="index">#{{ item }}</li>
            </ul>
          </div>
        </round-box>

        <round-box class="product_detail_content" hide-title>
          <div class="scroll_btn_wrap">
            <button
              aria-label="상세정보"
              type="button"
              name="contentBtn"
              class="is_active"
              @click="scrollToSection(DETAIL, $event)"
            >
              상세정보
            </button>
            <button
              v-if="productDtl?.scheduleContent !== '<p><br></p>'"
              aria-label="여행일정"
              type="button"
              name="contentBtn"
              @click="scrollToSection(PLAN, $event)"
            >
              여행일정
            </button>
            <button
              v-if="getGuideContent !== '<p><br></p>'"
              aria-label="상품안내"
              type="button"
              name="contentBtn"
              @click="scrollToSection(GUIDE, $event)"
            >
              상품안내
            </button>
          </div>
          <div class="detail_content_wrap">
            <div ref="detailRef" v-html="santizedHtml(productDtl?.description.replaceAll(/\n/g, '<br>') ?? '')" />
            <template v-if="productDtl?.scheduleContent !== '<p><br></p>'">
              <div ref="planRef" class="detail_content_tit">여행일정</div>
              <div v-html="santizedHtml(productDtl?.scheduleContent.replaceAll(/\n/g, '<br>') ?? '')" />
            </template>
            <template v-if="getGuideContent !== '<p><br></p>'">
              <div ref="guideRef" class="detail_content_tit">상품안내</div>
              <div v-html="santizedHtml(getGuideContent)" />
            </template>
          </div>
        </round-box>

        <div class="btn_area has_bg">
          <uu-button
            size="xl"
            btn-color="primary"
            label="예약하기"
            aria-label="예약하기"
            :disabled="!productDtl?.prdStaCd || productDtl?.prdStaCd === PrdStatus.PAUSE"
            @click="clickReservation"
          />
        </div>
      </div>
    </main>
    <uu-floating
      :pos="{
        right: 20,
        bottom: 128
      }"
    />
    <!-- 예약유의사항 바텀시트 -->
    <rsrv-prctn-bottom
      :is-show="reservationPrecautions"
      :content="productDtl?.notificationContent"
      @ok="closePrecautionsBottom"
      @close="reservationPrecautions = false"
    />
    <!-- 날짜선택 바텀시트 -->
    <rsrv-calendar-bottom
      :is-show="reservationDate"
      :date="selectedDate ? new Date(formatDate(selectedDate, 'YYYY-MM-DD')) : undefined"
      :mounted="mounted"
      :rot-id="productDtl?.trvlRotId"
      @ok="selDateComplete"
      @close="reservationDate = false"
    />

    <!-- 티켓상품 케이스 -->
    <!-- 인원선택 바텀시트 -->
    <select-personnel-bottom
      :is-show="selectPersonnel"
      :select-date="selectedDate"
      :max-cnt="Number(resSatsList.rmnSatsNum)"
      :tck-data="selSatsList"
      :is-ticket="true"
      :date="formatDate(selectedDate, 'YYYY.MM.DD')"
      @change="changeDate"
      @ok="selPersonComplete"
      @close="selectPersonnel = false"
    />
    <!-- 예약하기 확인 풀팝업 -->
    <reservation-confirm-full-popup
      :is-show="rsvrConfFull"
      :prd-nm="productDtl?.trvlPrdNm ?? ''"
      :isTicket="getIsTicketPrd"
      @close="rsvrConfFull = false"
      @next="goPayment"
      @main="goMain"
    />
  </template>
  <input id="hidden_ipt" type="hidden" @click="nativeBackKey" />
  <!-- 로그인 팝업 -->
  <travel-login-popup :is-show="loginPopup" @login="callLogin" @close="loginPopup = false" />
</template>

<script setup lang="ts">
import RsrvPrctnBottom from '../reservation/component/RsrvPrctnBottom.vue';
import RsrvCalendarBottom from '../reservation/component/RsrvCalendarBottom.vue';
import SelectPersonnelBottom from '../reservation/component/SelectPersonnelBottom.vue';
import ReservationConfirmFullPopup from '../reservation/component/ReservationConfirmFullPopup.vue';
import NoResultComponent from '../component/NoResultComponent.vue';
import TravelLoginPopup from '@/views/travel/component/TravelLoginPopup.vue';

import { storeToRefs } from 'pinia';
import { ref, onMounted, computed } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { getAppBridge } from '@/utils';
import { formatDate } from '@/utils/dateUtils';
import { useProductStore } from '@/service/travel/productModule';
import { useReservationStore, type TckData } from '@/service/travel/reservationModule';
import { useAuthStore } from '@/service/auth/authModule';
import { getDeprTime, getPriceText } from '../travelUtils';
import { PrdStatus } from '@/service/travel/travelConsts';
import { VerifyType } from '@/utils/hybrid/etc/etc.type';
import { useCalendarStore } from '@/service/calendar/calendarModule';
import { santizedHtml } from '@/utils';
import { debounce } from 'lodash-es';
import { checkAppVersion } from '@/utils/validateUtil';

const router = useRouter();

const authStore = useAuthStore();
const prdStore = useProductStore();
const rsrvStore = useReservationStore();
const calendarStore = useCalendarStore();

const { productDtl, getIsTicketPrd } = storeToRefs(prdStore);
const { resDAlcnList, resSatsList, selSatsList } = storeToRefs(rsrvStore);

const noResult = ref(false);

const keywordList = ref<string[]>([]); // 미리보는 키워드 리스트

const DETAIL = ref('detail');
const PLAN = ref('plan');
const GUIDE = ref('guide');

const detailRef: Ref<HTMLElement | null> = ref(null);
const planRef: Ref<HTMLElement | null> = ref(null);
const guideRef: Ref<HTMLElement | null> = ref(null);

const loginPopup = ref(false); //로그인팝업
const reservationPrecautions = ref(false); // 예약유의사항 바텀시트
const reservationDate = ref(false); // 날짜선택 캘린더 바텀시트
const selectPersonnel = ref(false); // 티켓상품 인원선택 바텀시트
const rsvrConfFull = ref(false); // 예약확인 풀팝업

const selectedDate = ref(); // 선택일자
const mounted = ref(true);

onMounted(async () => {
  // 월별배차목록 초기화
  await rsrvStore.initMntlAlcnList();
  const prdId = router.currentRoute.value.query['trvlPrdId'] as string;
  const res = await prdStore.reqTrvlPrdDtl(prdId);
  noResult.value = res === false || productDtl.value === null;
  keywordList.value = productDtl.value?.keywords || [];
  await calendarStore.setPublicHolidays('00000000000000'); // 공휴일정보 조회
});

const isDcPrice = computed(() => {
  return (productDtl.value?.dcPrice ?? 0 > 0) && (productDtl.value?.dcPrice ?? 0) !== (productDtl.value?.prdPrice ?? 0);
});

/**
 * @description 상품안내 컨텐츠
 */
const getGuideContent = computed(() => {
  const alertContent = productDtl.value?.alertContent.replaceAll(/\n/g, '<br>') ?? '';
  const refundContent = productDtl.value?.refundContent.replaceAll(/\n/g, '<br>') ?? '';
  return alertContent + refundContent;
});
/**
 * @description 사용가능일자 텍스트
 */
const getUseableDate = computed(() => {
  return `${formatDate(productDtl.value?.startDate, 'MM월 DD일')}부터 사용가능`;
});
/**
 *
 * @param sectionName 상세정보/여행일정/상품안내 클릭 시 해당 컨텐트 영역으로 스크롤
 * @param e
 */
const scrollToSection = debounce((sectionName: string, e: Event) => {
  let targetRef: Ref<HTMLElement | null> | null = null;

  if (sectionName === DETAIL.value) {
    targetRef = detailRef;
  } else if (sectionName === PLAN.value) {
    targetRef = planRef;
  } else if (sectionName === GUIDE.value) {
    targetRef = guideRef;
  }

  // 클릭한 버튼에만 is_active 클래스 추가
  document.getElementsByName('contentBtn').forEach((btn) => {
    btn.classList.remove('is_active');
  });
  (e.target as HTMLElement).classList.add('is_active');

  if (targetRef && targetRef.value) {
    targetRef.value.scrollIntoView({ behavior: 'smooth' });
  }
}, 300);
/**
 * @description 예약유의사항 바텀시트 open
 */
const clickReservation = debounce(() => {
  if (authStore.getIsLogin) {
    if (productDtl.value?.notificationContent && productDtl.value?.notificationContent !== '') {
      reservationPrecautions.value = true;
    } else {
      reservationDate.value = true;
    }
    return;
  }
  // 비회원 프로세스
  loginPopup.value = true;
}, 300);

/**
 * @description 인증서호출
 */
const callLogin = debounce(async () => {
  loginPopup.value = false;
  const minVersion = '2.4.5'; // 앱 최소버전
  const currVer = authStore.getAuthInfo.appVer;
  const checkVersion = checkAppVersion(minVersion, currVer);
  if(checkVersion) { // 2.4.5 버전 이상이라면 로그인페이지로 이동
    router.push({path:'/verification'});
  }else{ // 아니라면 pass 호출
    const appBridge = await getAppBridge();
    await appBridge.callIdentityVerify({
      verifyType: VerifyType.SING_UP
    });
  }
}, 300);

/**
 * @description 선택 날짜 저장
 */
const selDateComplete = debounce(async (date: Date) => {
  mounted.value = false;
  selectedDate.value = dayjs(date);
  rsrvStore.setSelectedDate(selectedDate.value);

  // 티켓상품의 경우 인원선택 바텀
  if (getIsTicketPrd.value) {
    // 일별배차목록 조회
    const dalcnRes = await reqDAlcnList();
    if (!dalcnRes) return;
    rsrvStore.setAlcnSqno(resDAlcnList.value[0].rotSqno);
    const satsRes = await rsrvStore.reqSatsList();
    if (!satsRes) return;
    selectPersonnel.value = true;
  } else {
    router.push({
      name: 'reservation-departure',
      query: {
        trvlRotId: productDtl.value?.trvlRotId,
        trvlPrdNm: productDtl.value?.trvlPrdNm,
        selDate: formatDate(selectedDate.value, 'YYYYMMDD')
      }
    });
  }
  reservationDate.value = false;
}, 300);

/**
 * @description 일별배차목록조회
 */
const reqDAlcnList = async () => {
  const deprTime = await getDeprTime(formatDate(selectedDate.value, 'YYYYMMDD'));
  return await rsrvStore.reqDAlcnList({
    trvlRotId: prdStore.productDtl?.trvlRotId || '',
    atlDeprDt: formatDate(selectedDate.value, 'YYYYMMDD'),
    atlDeprTime: deprTime
  });
};

/**
 * @description 날짜변경
 */
const changeDate = debounce(() => {
  selectPersonnel.value = false;
  reservationDate.value = true;
}, 300);
/**
 * @description 선택인원 저장
 */
const selPersonComplete = debounce((selSatsList: TckData[]) => {
  rsrvStore.setSelSatsInfo(selSatsList);
  selectPersonnel.value = false;
  rsvrConfFull.value = true;
}, 300);

/**
 * 예약유의사항 바텀시트 닫기
 */
const closePrecautionsBottom = debounce(() => {
  reservationPrecautions.value = false;
  reservationDate.value = true;
}, 300);

/**
 * @description 결제하기 화면이동
 */
const goPayment = debounce(() => {
  // 결제하기시 예약자정보 필수이므로 저장
  rsrvStore.setBookerInfo({
    psngFrnm: authStore.getMbrNm,
    psngMbphNo: authStore.getAuthInfo.mbrphNo,
    psngEmail: '',
    mrnpReqCtt: ''
  });
  rsrvStore.setPassengerInfo(
    [
      {
        psngFrnm: authStore.getMbrNm,
        psngMbphNo: authStore.getAuthInfo.mbrphNo,
        psngGndrCd: authStore.getAuthInfo.genderCode
      }
    ],
    true
  );
  router.push({ path: '/travel/payment' });
}, 300);

/**
 * @description 인트로 이동
 */
const goMain = debounce(() => {
  router.push({ name: 'travel-main' });
}, 300);

const nativeBackKey = () => {
  if (reservationDate.value) {
    reservationDate.value = false;
    return;
  } else if (selectPersonnel.value) {
    selectPersonnel.value = false;
    reservationDate.value = true;
    return;
  } else if (rsvrConfFull.value) {
    rsvrConfFull.value = false;
    return;
  }
  router.back();
};
</script>
