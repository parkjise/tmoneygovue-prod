<!-- 이용내역 -->
<template>
  <main id="main" class="main">
    <div id="historyDiv" class="container history_detail" :class="getShowCancelBtn ? 'bottom_btns' : ''">
      <uu-swiper id="qrCodeDiv" type="custom" class="QR_swiper" :options="options">
        <swiper-slide v-for="(item, index) in trvlMrnpDtl?.trvlMrnpDtlList" :key="index">
          <div class="swiper_inner">
            <div class="QR_code" @click="goPatternPage(item)">
              <qrcode-vue :color="['black']" type="image/png" :value="setQrData(item)" :size="68" />
              <div class="QR_code_data">{{ setQrDataStr(item) }}</div>
              <div class="QR_code_assort">({{ item.busTckKndNm ?? '' }})</div>
              <div v-if="item.trvlTckStaCd !== TrvlTckSta.SUCCESS" id="ticketDiv" class="ticket_status">
                <div class="status_tit">
                  <!-- 검 표 완 료 || 취 소 요 청 || 취 소 완 료 -->
                  {{ item.trvlTckStaNm.replaceAll('', ' ') || '' }}
                </div>
                <!-- 검표 완료 시에만 표시 -->
                <p class="status_notice" v-if="item.trvlTckStaCd === TrvlTckSta.BLTCN_CMPLT">
                  검표 취소는 기사님 또는 창구에 문의하세요.
                </p>
              </div>
            </div>
            <button
              id="shareBtn"
              type="button"
              class="share_btn"
              :disabled="item.trvlTckStaCd !== TrvlTckSta.SUCCESS"
              aria-label="예약정보 공유하기"
              @click="shareQRCode"
            >
              예약정보 공유하기
              <uuIc v-bind="{ name: 'share', size: '24' }" />
            </button>
          </div>
        </swiper-slide>
      </uu-swiper>
      <round-box id="rsrvInfoDiv" title="예약 정보">
        <a class="product_link" @click="goPrdDetail">
          <div class="product_name">{{ trvlMrnpDtl?.trvlPrdNm || '' }}</div>
          <uu-ic v-bind="{ name: 'arrow_right', size: '16' }" />
        </a>
        <ul class="normal_list">
          <li>
            <div class="list_tit">여행일정</div>
            <div class="list_txt right_align">
              <span
                :aria-label="formatA11yDateTime(trvlMrnpDtl?.deprDt ?? '', trvlMrnpDtl?.deprTime, true)"
                role="text"
              >
                {{ getDateText(`${trvlMrnpDtl?.deprDt}${trvlMrnpDtl?.deprTime}`, true) }}
              </span>
            </div>
          </li>
          <li>
            <div class="list_tit">여행인원</div>
            <div class="list_txt right_align">
              {{ trvlMrnpDtl?.trvlMrnpDtlList.length ?? 0 }}명 ({{ getPsngCntStr }})
            </div>
          </li>
          <!-- 티켓상품일 경우 미노출 -->
          <li v-if="trvlMrnpDtl?.prdCtgCd !== TicketCatgrCd">
            <div class="list_tit">출발장소</div>
            <div class="list_txt right_align">{{ trvlMrnpDtl?.deprTrmlNm ?? '' }}</div>
          </li>
        </ul>
      </round-box>
      <!-- 예약자정보 -->
      <booker-info
        :info="getBookerInfo"
        :is-ticket-prd="trvlMrnpDtl?.prdCtgCd === TicketCatgrCd"
        :modify-disabeld="getModBookerInfo"
        :is-rsrv-page="false"
        @modify="showModify = true"
      />
      <!-- 이용자 수정하기 풀팝업 -->
      <psng-mod-full-popup :is-show="showModify" @update="updatePsngInfo" @close="showModify = false" />

      <!-- 결제금액 -->
      <round-box title="결제금액">
        <ul class="normal_list pay_detail_list">
          <!-- 취소 제외 -->
          <template v-if="isReserveCancel === false">
            <li v-for="(item, idx) in psngCntList" :key="idx">
              <div class="list_tit">{{ item.name }}{{ item.count }}</div>
              <div class="list_txt">
                <span class="price">{{ getTotAmtByTck(item) }}</span
                >원
              </div>
            </li>
          </template>
          <!-- 취소 -->
          <template v-else>
            <li>
              <div class="list_tit">총 결제금액</div>
              <div class="list_txt">
                <span class="price">{{ getPriceText(trvlMrnpDtl?.pymAmt) }}</span
                >원
              </div>
            </li>
            <li>
              <div class="list_tit">취소 수수료</div>
              <div class="list_txt cancel">
                <span class="price">{{ getPriceText(getTotBrkpAmt) }}</span
                >원
              </div>
            </li>
          </template>
        </ul>
        <div class="usage_total_price" />
        <ul class="normal_list pay_detail_list">
          <li>
            <div class="list_tit tot">{{ isReserveCancel ? '총 반환금액' : '총 결제금액' }}</div>
            <div class="list_txt tot">
              <span class="price">{{
                getPriceText(isReserveCancel ? (trvlMrnpDtl?.pymCancAmt ?? 0) - getTotBrkpAmt : trvlMrnpDtl?.pymAmt)
              }}</span
              >원
            </div>
          </li>
          <template v-if="isReserveCancel">
            <li v-if="trvlMrnpDtl?.pmmtCancAmt ?? 0 > 0">
              <div class="list_tit">{{ trvlMrnpDtl?.pymMnsNm ?? '' }}</div>
              <div class="list_txt">
                <span class="price">{{ getPriceText(trvlMrnpDtl?.pmmtCancAmt) }}</span
                >원
              </div>
            </li>
            <li v-if="trvlMrnpDtl?.evcpUseCancAmt ?? 0 > 0">
              <div class="list_tit">쿠폰</div>
              <div class="list_txt detail">
                <span class="price">{{ getPriceText(trvlMrnpDtl?.evcpUseCancAmt) }}</span
                >원
              </div>
            </li>
            <li v-if="trvlMrnpDtl?.tmgMlgCancAmt ?? 0 > 0">
              <div class="list_tit">GO마일리지</div>
              <div class="list_txt detail">
                <span class="price">{{ getPriceText(trvlMrnpDtl?.tmgMlgCancAmt) }}</span
                >M
              </div>
            </li>
          </template>
        </ul>
      </round-box>
      <!-- 결제상세 -->
      <round-box>
        <template #title>
          결제상세
          <uu-button
            class="right_btn receipt_btn"
            size="xs"
            btn-style="line"
            label="영수증"
            aria-label="영수증"
            @click="showReceipt = true"
          />
        </template>
        <ul class="normal_list usage_list">
          <li>
            <div class="list_tit">결제일시</div>
            <div class="list_txt">
              <span
                :aria-label="
                  formatA11yDateTime(
                    trvlMrnpDtl?.pymDtm.substring(0, 8) ?? '',
                    trvlMrnpDtl?.pymDtm.substring(8) ?? '',
                    true
                  )
                "
                role="text"
              >
                {{ getPymDate }}
              </span>
            </div>
          </li>
          <li v-if="isReserveCancel">
            <div class="list_tit">환불일시</div>
            <div class="list_txt">
              <span
                :aria-label="
                  formatA11yDateTime(
                    trvlMrnpDtl?.pymCancDtm.substring(0, 8) ?? '',
                    trvlMrnpDtl?.pymCancDtm.substring(8) ?? '',
                    true
                  )
                "
                role="text"
              >
                {{ getDateText(trvlMrnpDtl?.pymCancDtm, true) }}
              </span>
            </div>
          </li>
          <li>
            <div class="list_tit">결제수단</div>
            <div class="list_txt">{{ trvlMrnpDtl?.pymMnsNm ?? '' }}</div>
          </li>
        </ul>
        <dl v-if="isReserveCancel === false" class="has_detail_list usage_list">
          <dt>
            <div class="list_tit">결제금액</div>
            <div class="list_txt">
              <span class="price">{{ getPriceText(trvlMrnpDtl?.pmmtPymAmt) }}</span
              >원
            </div>
          </dt>
          <dd v-if="trvlMrnpDtl?.pmmtCancAmt ?? 0 > 0">
            <div class="list_tit">{{ trvlMrnpDtl?.pymMnsNm ?? '' }}</div>
            <div class="list_txt">
              <span class="price">{{ getPriceText(trvlMrnpDtl?.pmmtCancAmt) }}</span
              >원
            </div>
          </dd>
          <dd v-if="trvlMrnpDtl?.evcpUseAmt ?? 0 > 0">
            <div class="list_tit">쿠폰</div>
            <div class="list_txt">
              <span class="price">{{ getPriceText(trvlMrnpDtl?.evcpUseAmt) }}</span
              >원
            </div>
          </dd>
          <dd v-if="trvlMrnpDtl?.tmgMlgPymAmt ?? 0 > 0">
            <div class="list_tit">GO마일리지</div>
            <div class="list_txt">
              <span class="price">{{ getPriceText(trvlMrnpDtl?.tmgMlgPymAmt) }}</span
              >M
            </div>
          </dd>
        </dl>
      </round-box>
      <!-- 여행사 정보 -->
      <round-box>
        <template #title> 여행사 정보 </template>
        <ul class="normal_list bus_comp">
          <li>
            <div class="list_tit">업체명</div>
            <div class="list_txt">{{ trvlMrnpDtl?.busCacmNm || '' }}</div>
          </li>
          <li>
            <div class="list_tit">주소</div>
            <div class="list_txt">{{ trvlMrnpDtl?.busCacmAddr || '' }}</div>
          </li>
          <li>
            <div class="list_tit">연락처</div>
            <div class="list_txt num">{{ trvlMrnpDtl?.busCacmTelNo || '' }}</div>
          </li>
        </ul>
      </round-box>
      <div class="btn_area cancel_btn" v-if="getShowCancelBtn">
        <uu-button
          label="예매취소"
          aria-labe="예매취소"
          btn-style="line"
          size="xl"
          :disabled="getCanBtnDisbled"
          @click="goCancelPage"
        />
      </div>
    </div>
    <!-- 결제영수증 풀팝업 -->
    <trvl-pym-receipt :is-show="showReceipt" @close="showReceipt = false" />
    <qr-screen-lock :is-show="showQrScreen" @close="showQrScreen = false" />
  </main>
</template>

<script setup lang="ts">
import BookerInfo from '@/views/travel/reservation/info/BookerInfo.vue';
import PsngModFullPopup from '@/views/usage-history/travel/component/PsngModFullPopup.vue';
import TrvlPymReceipt from '@/views/usage-history/travel/component/TrvlPymReceipt.vue';
import QrScreenLock from '@/views/usage-history/travel/QrScreenLock.vue';

import { type SwiperOptions } from 'swiper/types';
import { SwiperSlide } from 'swiper/vue';
import { computed, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAppBridge } from '@/utils';
import { logger } from '@/utils/logger';
import { storeToRefs } from 'pinia';
import dayjs from 'dayjs';
import html2canvas from 'html2canvas';
import QrcodeVue from 'qrcode.vue';

import { formatDate, getDayWeek } from '@/utils/dateUtils';
import { TicketCatgrCd, TrvlTckSta } from '@/service/travel/travelConsts';
import { formatA11yDateTime } from '@/utils/dateUtils';
import {
  getPriceText,
  getDateText,
  blobToArrayBuffer,
  arrayBufferToBinaryString,
  dataURItoBlob,
  busTckNmList,
  getPsngCntList
} from '@/views/travel/travelUtils';
import { useHistoryStore } from '@/service/usage-history/travelHistoryModule';
import type { ImgDataRequest } from '@/utils/hybrid/travel/travel.type';
import { useMessageModal } from '@/composables/useMessageModal';
import type { TrvlDtlPsngData } from '@/service/usage-history/model/travelHistoryModel';
import { useAuthStore } from '@/service/auth/authModule';

const router = useRouter();
const authStore = useAuthStore();
const historyStore = useHistoryStore();
const { createSuccessModalAndOption, createSuccessModal } = useMessageModal();

const { trvlMrnpSno, trvlMrnpDtl, isReserveCancel, reqMrnpDtlParam } = storeToRefs(historyStore);

const showModify = ref(false); // 이용자수정풀팝업
const showReceipt = ref(false); // 결제영수증팝업
const showQrScreen = ref(false); // 수동검표팝업

onUnmounted(() => {
  showReceipt.value = false;
  showQrScreen.value = false;
  showModify.value = false;
});
/**
 * @description 예약자정보
 */
const getBookerInfo = computed(() => {
  return {
    psngFrnm: trvlMrnpDtl.value?.mnppNm || '',
    psngMbphNo: trvlMrnpDtl.value?.mnppMbphNo || '',
    psngEmail: trvlMrnpDtl.value?.mnppMailAddr || '',
    mrnpReqCtt: trvlMrnpDtl.value?.mrnpReqCtt || ''
  };
});

/**
 * @description 티켓상태코드가 '예매완료'가 아닌경우 비활성화
 * 출발 24시간 전 이용자정보수정 버튼 비활성화
 */
const getModBookerInfo = computed(() => {
  if (trvlMrnpDtl.value && trvlMrnpDtl.value?.trvlMrnpDtlList.length > 0) {
    const noSuccTck = trvlMrnpDtl.value?.trvlMrnpDtlList.some((d) => d.trvlTckStaCd !== TrvlTckSta.SUCCESS);
    if (noSuccTck) return true;

    const deprInfo = `${trvlMrnpDtl.value.deprDt}${trvlMrnpDtl.value.deprTime}`;
    const curTime = formatDate(dayjs(), 'YYYYMMDDHHmmss');
    const before24 = dayjs(deprInfo).subtract(24, 'hours');
    return dayjs(curTime).isAfter(before24);
  }
  return true;
});

/**
 * @description 티켓종류별 리스트
 * @return 티켓종류명, 티켓종류별수
 */
const psngCntList = computed(() => {
  return getPsngCntList(busTckNmList(trvlMrnpDtl.value?.trvlMrnpDtlList), trvlMrnpDtl.value?.trvlMrnpDtlList);
});

/**
 * @description 티켓종류별 카운팅 텍스트
 * @return 티켓종류명(티켓종류별수)
 */
const getPsngCntStr = computed(() => {
  let result = '';
  psngCntList.value.forEach((d, idx) => {
    result += `${d.name}${d.count}`;
    if (idx < psngCntList.value.length - 1) result += ', ';
  });

  return result;
});

/**
 * @description 결제일시 (YYYY.MM.DD HH:mm)
 */
const getPymDate = computed(() => {
  if (!trvlMrnpDtl.value || trvlMrnpDtl.value.pymDtm === '') return '';
  const date = trvlMrnpDtl.value?.pymDtm.substring(0, 8);
  const formatDt = formatDate(date, 'YYYY.MM.DD');
  const day = getDayWeek(date);
  const time = trvlMrnpDtl.value?.pymDtm.substring(8) || '00000000';
  const formatTime = `${time?.substring(0, 2)}:${time.substring(2, 4)}`;
  return `${formatDt}(${day}) ${formatTime}`;
});

/**
 * @description 모든 티켓이 취소완료일 경우 예매취소 버튼 미노출
 */
const getShowCancelBtn = computed(() => {
  if (trvlMrnpDtl.value) {
    const result = trvlMrnpDtl.value.trvlMrnpDtlList.some((item) => item.trvlTckStaCd !== TrvlTckSta.CANC_COMP);
    return result;
  }
  return false;
});
/**
 * @description 예매취소버튼 활성화
 */
const getCanBtnDisbled = computed(() => {
  if (trvlMrnpDtl.value) {
    // 검표완료가 안된 티켓이 하나라도 있으면 활성화
    // 예약취소가 가능한 티켓이 하나라도 있으면 활성화
    const result = trvlMrnpDtl.value.trvlMrnpDtlList.some((item) => item.trvlTckStaCd === TrvlTckSta.SUCCESS);
    return !result;
  }
  return true;
});

/**
 * @description 취소위약금액
 */
const getTotBrkpAmt = computed(() => {
  if (!trvlMrnpDtl.value) return 0;
  return trvlMrnpDtl.value?.pmmtBrkpAmt + trvlMrnpDtl.value?.tmgMlgBrkpAmt + trvlMrnpDtl.value?.evcpBrkpAmt;
});
/**
 * @description 티켓종류별 금액합산
 * @param item
 */
const getTotAmtByTck = (item: { name: string; count: number }) => {
  const data = trvlMrnpDtl.value?.trvlMrnpDtlList.find((d) => d.busTckKndNm === item.name);
  return getPriceText((data?.tissuAmt ?? 0) * item.count);
};
/**
 * @description qr데이터 문자열 생성(노출용)
 */
const setQrDataStr = (item: TrvlDtlPsngData) => {
  // 발행일자(8)+발행단축터미널코드(4)+발행창구번호(2)+발행일련번호(4)
  if (
    !item.pubDt ||
    item.pubDt === '' ||
    !item.pubShctTrmlCd ||
    item.pubShctTrmlCd === '' ||
    !item.pubWndNo ||
    item.pubWndNo === '' ||
    !item.pubSno ||
    item.pubSno < 0
  )
    return '';
  if (item) return `${item.pubDt}-${item.pubShctTrmlCd}-${item.pubWndNo}-${item.pubSno}`;
  return '';
};

/**
 * @description qr데이터 생성
 */
const setQrData = (item: TrvlDtlPsngData) => {
  // 발행일자(8)+발행단축터미널코드(4)+발행창구번호(2)+발행일련번호(4)+좌석번호(2)
  if (
    !item.pubDt ||
    item.pubDt === '' ||
    !item.pubShctTrmlCd ||
    item.pubShctTrmlCd === '' ||
    !item.pubWndNo ||
    item.pubWndNo === '' ||
    !item.pubSno ||
    item.pubSno < 0 ||
    !item.satsNo ||
    item.satsNo < 0
  )
    return '';
  const satsNo = item.satsNo < 10 ? `0${item.satsNo}` : item.satsNo;
  if (item) return `${item.pubDt}${item.pubShctTrmlCd}${item.pubWndNo}${item.pubSno}${satsNo}`;
  return '';
};
/**
 * @description QR코드영역과 예약정보 영역을 canvas에 그리기
 */
const captureBothAreas = async () => {
  const combinedCanvas = document.createElement('canvas');
  let historyDiv = document.getElementById('historyDiv');
  let qrCodeDiv = document.getElementById('qrCodeDiv');
  let rsrvInfoDiv = document.getElementById('rsrvInfoDiv');

  try {
    if (historyDiv && qrCodeDiv && rsrvInfoDiv) {
      let height = qrCodeDiv.offsetHeight + rsrvInfoDiv.offsetHeight - 16; // 16 = qrCodeDiv margin-bottom
      const canvas = await html2canvas(historyDiv, {
        height: height,
        // 제거할 요소가 현재 화면에는 영향이 없게하기
        ignoreElements: (element) =>
          element.id === 'ticketDiv' ||
          element.id === 'shareBtn' ||
          element.className === 'swiper-pagination swiper-pagination-fraction swiper-pagination-horizontal' ||
          element.className === 'swiper-button-prev swiper-button-disabled' ||
          element.className === 'swiper-button-next'
      });
      combinedCanvas.width = Math.max(canvas.width);
      combinedCanvas.height = canvas.height;

      const context = combinedCanvas.getContext('2d');
      if (context) {
        context.drawImage(canvas, 0, 0);
      }
    }
  } catch (error) {
    logger.error('Error capturing areas:', error);
  }
  return combinedCanvas;
};

/**
 * @description 예약정보 공유하기
 */
const shareQRCode = async () => {
  const combinedCanvas = await captureBothAreas();
  const blob = await dataURItoBlob(combinedCanvas.toDataURL('image/png'));

  // Blob을 ArrayBuffer로 읽기
  const arrayBuffer = await blobToArrayBuffer(blob);

  // ArrayBuffer를 바이너리 문자열로 변환 + base64인코딩
  const binaryString = btoa(arrayBufferToBinaryString(arrayBuffer));

  const appbridge = await getAppBridge();
  const shareRsrvInfoReq: ImgDataRequest = {
    imgData: binaryString
  };
  appbridge.shareRsrvInfo(shareRsrvInfoReq);
};

const options: SwiperOptions = {
  navigation: true,
  pagination: {
    type: 'fraction',
    renderFraction: function (currentClass, totalClass) {
      return (
        '<span class="' +
        currentClass +
        '"></span>' +
        '<span class="swiper_pagination_separator">/</span>' +
        '<span class="' +
        totalClass +
        '"></span>'
      );
    }
  },
  a11y: {
    prevSlideMessage: 'Previous slide',
    nextSlideMessage: 'Next slide'
  }
};
/**
 * @description 상품상세화면 이동
 */
const goPrdDetail = () => {
  if (!trvlMrnpDtl.value || trvlMrnpDtl.value.trvlPrdId === '') return;
  router.push({ name: 'product-detail', query: { trvlPrdId: trvlMrnpDtl.value.trvlPrdId } });
};
/**
 * @description 예매취소화면 이동
 */
const goCancelPage = async () => {
  // 예매취소 정보조회
  const res = await historyStore.reqPaymentCancInfo(trvlMrnpSno.value);
  if (!res?.flag) {
    // 예매취소 불가
    createSuccessModal('알림', res?.message ?? '');
    return;
  } else {
    // router.push({ name: 'travel-cancel', query: { pageType: props.page, trvlMrnpSno: trvlMrnpSno.value } });
    const query = {
      trvlMrnpSno: reqMrnpDtlParam.value?.trvlMrnpSno,
      trvlMrsStaCd: reqMrnpDtlParam.value?.trvlMrsStaCd,
      ...(reqMrnpDtlParam.value.trvlMrnpCancSqno && { trvlMrnpCancSqno: reqMrnpDtlParam.value.trvlMrnpCancSqno })
    };
    router.push({ name: 'travel-cancel', query: query });
  }
};

/**
 * @description 수동검표화면
 */
 const goPatternPage = (item: TrvlDtlPsngData) => {
  if (item.trvlTckStaCd === TrvlTckSta.SUCCESS && trvlMrnpDtl.value) {
    
    // 출발30분 이내 체크
    const givenTime = dayjs(`${trvlMrnpDtl.value.deprDt}${trvlMrnpDtl.value.deprTime}`);
    const currentTime = dayjs();
    const isWithin30Minutes = currentTime.isAfter(givenTime.subtract(30, 'minute')) || currentTime.isSame(givenTime.subtract(30, 'minute'));

    if (isWithin30Minutes) {
      showQrScreen.value = true;
      historyStore.setReqQrScreenData({
        tmgMbrsSno: authStore.getAuthInfo.moappMbrsSno ?? '',
        trvlMrnpSno: trvlMrnpSno.value,
        trvlTissuId: item.trvlTissuId
      });
    } else {
      createSuccessModalAndOption(
        {
          title: '알림',
          footer: [
            {
              name: 'ok',
              label: '확인',
              btnStyle: 'none',
              btnColor: 'primary'
            }
          ]
        },
        '수동 검표는 차량 출발 30분 전에만 가능합니다.'
      );
    }
  }
};

const updatePsngInfo = async () => {
  await historyStore.reqTrvlMrnpDtl();
  showModify.value = false;
};
</script>
