<!-- 예매 취소 화면 -->
<template>
  <subHeader title="예매 취소" />
  <main id="main" class="main" v-if="trvlCancInfo?.trvlMrnpDtlList">
    <div class="container bottom_btns">
      <!-- 예약 티켓 정보 -->
      <round-box hide-title class="ticket_info">
        <div class="ticket_date">{{ getDateText(`${trvlCancInfo?.deprDt}${trvlCancInfo?.deprTime}`, true) }}</div>
        <div class="ticket_name">{{ trvlCancInfo?.trvlPrdNm || '' }}</div>
        <dl class="has_detail_list">
          <dt>
            <div class="list_tit">
              <uu-ic name="fare" size="16" />
              금액
              <span>{{ trvlCancInfo.trvlMrnpDtlList.length || 0 }}명</span>
            </div>
            <div class="list_txt">
              <span class="price">{{ getPriceText(trvlCancInfo?.pymAmt || 0) }}</span
              >원
            </div>
          </dt>
          <dd v-for="(item, idx) in tckTypeList" :key="idx">
            <div class="list_tit">{{ item.name ?? '' }} {{ item.count }}명</div>
            <div class="list_txt">
              <span class="price">{{ getPriceText(item.price) }}</span
              >원
            </div>
          </dd>
        </dl>
      </round-box>
      <!-- 취소 티켓 선택 체크박스 -->
      <round-box hide-title v-if="getShowChkbox">
        <div class="ticket_select_wrap">
          <div class="info_txt">취소 티켓 선택</div>
          <uu-checkbox label="전체" aria-label="전체" v-model="allChk" @change="changeAllChk" />
        </div>
        <form>
          <div class="select_ticket">
            <uu-checkbox
              v-for="(item, idx) in trvlCancInfo.trvlMrnpDtlList"
              :key="idx"
              v-model="selChkList"
              :label="item.psngFrnm"
              :aria-label="item.psngFrnm"
              :value="item.trvlMrnpSqno"
              @change="changeChk"
            >
              <span>{{ item.busTckKndNm }} {{ psngName(item.psngFrnm) }}</span>
              <div class="ticket_badge" v-if="item.evcpUseYn === 'Y'">쿠폰</div>
            </uu-checkbox>
          </div>
        </form>
        <div class="notice_txt">* 검표완료 및 취소요청이 완료된 티켓은 표시되지 않습니다.</div>
      </round-box>
      <round-box class="payment_info_wrap" hide-title>
        <div class="payment_info_tit">결제 정보</div>
        <ul class="normal_list">
          <li>
            <dl class="has_detail_list">
              <dt>
                <div class="list_tit">총 결제금액</div>
                <div class="list_txt">
                  <span class="price">{{ getPriceText(trvlCancInfo?.pymAmt) }}</span
                  >원
                </div>
              </dt>
              <!-- 단일예약 건일 경우만 노출 -->
              <dd v-if="getShowChkbox === false && (trvlMrnpDtl?.evcpUseAmt ?? 0 > 0)">
                <div class="list_tit">쿠폰</div>
                <div class="list_txt">
                  <span class="price">{{ getPriceText(trvlMrnpDtl?.evcpUseAmt) }}</span
                  >원
                </div>
              </dd>
              <dd v-if="getShowChkbox === false && (trvlMrnpDtl?.tmgMlgPymAmt ?? 0 > 0)">
                <div class="list_tit">GO마일리지</div>
                <div class="list_txt">
                  <span class="price">{{ getPriceText(trvlMrnpDtl?.tmgMlgPymAmt) }}</span
                  >M
                </div>
              </dd>
            </dl>
          </li>
          <li>
            <div class="list_tit">결제일시</div>
            <div class="list_txt num">{{ getDateText(trvlCancInfo?.pymDtm, true) }}</div>
          </li>
          <li>
            <div class="list_tit">결제수단</div>
            <div class="list_txt">{{ trvlCancInfo?.pymMnsNm || '' }}</div>
          </li>
        </ul>
        <div class="sum">
          <div class="sum_tit">
            취소 수수료
            <uu-ic name="exclamation" size="20" @click="showPenaltyPopup = true" />
          </div>
          <div class="price_wrap">
            <span class="price">{{ getPriceText(getPnltAmt) }}</span
            >원
          </div>
        </div>
      </round-box>
      <round-box class="refund_wrap" hide-title>
        <div>
          <div class="refund_tit">총 반환금액</div>
          <div class="price_wrap">
            <span class="price">{{ getPriceText(getReturnAmt) }}</span
            >원
          </div>
        </div>
      </round-box>
      <div class="ticket_notice">
        <p class="title">
          <uu-ic size="16" name="exclamation_gray090" />
          <button type="button" @click="showCancPopup = true">
            예매 취소 전 꼭 확인해 주세요.
            <uu-ic size="12" name="arrow" />
          </button>
        </p>
        <p class="desc">취소수수료의 10원 단위는 올림하여 계산됩니다.</p>
        <p class="desc">유효기간이 지난 쿠폰과 마일리지는 재 발행되지 않습니다.</p>
      </div>
      <div class="ticket_info btn_area">
        <uu-button
          label="예매취소"
          aria-label="예매취소"
          btn-color="primary"
          size="xl"
          :disabled="!selChkList || selChkList.length < 1"
          @click="openCancPopup"
        />
      </div>
    </div>
    <!-- 취소수수료 안내 팝업 -->
    <trvl-canc-penalty-popup
      :is-show="showPenaltyPopup"
      :content="trvlCancInfo.refundContent ?? ''"
      @close="showPenaltyPopup = false"
    />
    <!-- 예매취소안내 팝업 -->
    <trvl-canc-popup :is-show="showCancPopup" @close="showCancPopup = false" />
    <!-- 취소접수(취소요청) 예매취소팝업 -->
    <trvl-canc-rg-confirm :is-show="showCancRgConf" @ok="openConfirmModal" @close="showCancRgConf = false" />
    <!-- 결제취소(즉시취소) 예매취소팝업 -->
    <trvl-canc-imdtl-confirm
      :data="getCancData"
      @ok="openConfirmModal"
      @no="showCancImdtlConf = false"
      @close="closeImdtlConfirm"
    />
  </main>
</template>

<script setup lang="ts">
import TrvlCancPenaltyPopup from './TrvlCancPenaltyPopup.vue';
import TrvlCancPopup from '@/views/payment-history/travel-componet/TrvlCancPopup.vue';
import TrvlCancRgConfirm from '@/views/payment-history/travel-componet/TrvlCancRgConfirm.vue';
import TrvlCancImdtlConfirm from '@/views/payment-history/travel-componet/TrvlCancImdtlConfirm.vue';

import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useHistoryStore } from '@/service/usage-history/travelHistoryModule';
import { TicketCatgrCd, ReqCanc } from '@/service/travel/travelConsts';
import { getDateText, getPriceText } from '@/views/travel/travelUtils';
import { useMessageModal } from '@/composables/useMessageModal';
import type { TrvlCancRgtData } from '@/service/usage-history/model/travelHistoryModel';

const router = useRouter();
const { createSuccessModalAndOption } = useMessageModal();

const historyStore = useHistoryStore();
const { trvlMrnpDtl, trvlCancInfo } = storeToRefs(historyStore);

const allChk = ref(false); // 전체선택체크박스
const selChkList = ref<number[]>([]); // 취소대상체크리스트

const showPenaltyPopup = ref(false); //취소수수료안내팝업
const showCancPopup = ref(false); // 예매취소안내팝업
const showCancRgConf = ref(false); // 취소요청(취소접수)_예매취소팝업
const showCancImdtlConf = ref(false); // 결제취소(즉시취소)_예매취소팝업

const trvlMrnpSno = ref('');
const trvlMrsStaCd = ref('');
const trvlMrnpCancSqno = ref('');
// const cancelComplete = ref(false);

onUnmounted(() => {
  showPenaltyPopup.value = false;
  showCancPopup.value = false;
  showCancRgConf.value = false;
  showCancImdtlConf.value = false;
  historyStore.initCancInfo();
});
onMounted(async () => {
  trvlMrnpSno.value = router.currentRoute.value.query['trvlMrnpSno'] as string;
  trvlMrsStaCd.value = router.currentRoute.value.query['trvlMrsStaCd'] as string;
  trvlMrnpCancSqno.value = router.currentRoute.value.query['trvlMrnpCancSqno'] as string;

  if (!trvlMrnpDtl.value) {
    // 이용상세정보 조회 요청 파라미터 저장
    historyStore.setReqMrnpDtlParam({
      trvlMrnpSno: trvlMrnpSno.value,
      trvlMrsStaCd: trvlMrsStaCd.value,
      trvlMrnpCancSqno: trvlMrnpCancSqno.value
    });
    await historyStore.reqTrvlMrnpDtl();
  }

  if (trvlCancInfo.value?.trvlMrnpDtlList && trvlCancInfo.value.trvlMrnpDtlList.length === 1) {
    selChkList.value = [trvlCancInfo.value?.trvlMrnpDtlList[0].trvlMrnpSqno];
  }
});
/**
 * @description 복수예약 시 취소티켓 체크박스 노출여부
 */
const getShowChkbox = computed(() => {
  return trvlCancInfo.value?.trvlMrnpDtlList && trvlCancInfo.value.trvlMrnpDtlList.length > 1;
});
/**
 * @description 티켓종류별 카운트 리스트
 */
const tckTypeList = computed(() => {
  if (!trvlCancInfo.value?.trvlMrnpDtlList) return [];
  let retList: Record<string, string | number>[] = [];
  let tckTypeNmList: string[] = [];
  trvlCancInfo.value?.trvlMrnpDtlList.forEach((d) => {
    if (!tckTypeNmList.includes(d.busTckKndNm)) tckTypeNmList.push(d.busTckKndNm);
  });
  tckTypeNmList.forEach((name) => {
    const cancInfo = trvlCancInfo.value?.trvlMrnpDtlList.filter((d) => d.busTckKndNm === name);
    if (cancInfo) {
      retList.push({
        name: name,
        count: cancInfo.length || 0,
        price: (cancInfo.length || 0) * (cancInfo[0].tissuAmt || 0)
      });
    }
  });
  return retList;
});
/**
 * @description 취소수수료
 */
const getPnltAmt = computed(() => {
  let pnltAmt = 0;
  selChkList.value?.forEach((d) =>
    trvlCancInfo.value?.trvlMrnpDtlList.find((item) => {
      if (d === item.trvlMrnpSqno) {
        pnltAmt += item.pnltAmt;
      }
    })
  );
  return pnltAmt;
});
/**
 * @description 반환금액
 */
const getReturnAmt = computed(() => {
  let retAmt = 0;
  selChkList.value?.forEach((d) => {
    trvlCancInfo.value?.trvlMrnpDtlList.find((item) => {
      if (d === item.trvlMrnpSqno) {
        retAmt += item.tissuAmt;
      }
    });
  });
  return retAmt - getPnltAmt.value >= 0 ? retAmt - getPnltAmt.value : 0;
});
/**
 * @description 결제취소(즉시취소) 팝업 데이터
 */
const getCancData = computed(() => {
  return {
    isShow: showCancImdtlConf.value,
    totalAmt: getPriceText(getReturnAmt.value),
    pnltAmt: getPriceText(getPnltAmt.value),
    returnAmt: getPriceText(getReturnAmt.value)
  };
});
/**
 * @description 이용자이름
 * @param name
 */
const psngName = (name: string) => {
  if (trvlMrnpDtl.value?.prdCtgCd === TicketCatgrCd) return '';
  return `(${name ?? '미입력'})`;
};
/**
 * @description 체크박스 전체선택/해제
 */
const changeAllChk = () => {
  selChkList.value = [];
  if (allChk.value) trvlCancInfo.value?.trvlMrnpDtlList.forEach((item) => selChkList.value?.push(item.trvlMrnpSqno));
};
/**
 * @description 체크박스 개별선택/해제
 * @param checked
 */
const changeChk = () => {
  allChk.value = selChkList.value?.length === trvlCancInfo.value?.trvlMrnpDtlList.length;
};
/**
 * @description 예약취소
 */
const openCancPopup = () => {
  // 취소요청(접수) = Y. 결제취소(즉시취소) = N
  if (trvlCancInfo.value?.reqCancYn === ReqCanc.Y) showCancRgConf.value = true;
  else if (trvlCancInfo.value?.reqCancYn === ReqCanc.N) showCancImdtlConf.value = true;
};
/**
 * @description 위약금 없는경우, 취소완료
 */
const closeImdtlConfirm = () => {
  showCancImdtlConf.value = false;
  router.back();
};
/**
 * @description 반환금액이 있는 경우, 취소완료 팝업
 */
const openConfirmModal = async () => {
  showCancRgConf.value = false;
  showCancImdtlConf.value = false;
  const cancelYn = trvlCancInfo.value?.reqCancYn === ReqCanc.Y; // 취소요청여부
  const res: { message: string; flag: boolean } = await reqCancelPayment(cancelYn);

  let title = '알림';
  let content = res.message ?? '';

  if (res.flag) {
    title = cancelYn ? '취소 접수 완료' : '취소 완료';
    content = cancelYn
      ? '취소 접수가 완료되었습니다. 본 상품은 판매처에서 확인 후 취소 및 환불이 진행될 예정입니다.'
      : '예매 취소가 완료되었습니다. 예매 취소 후 카드 환불까지 3~5영업일 소요될 수 있습니다.';
  }

  createSuccessModalAndOption(
    {
      title: title,
      footer: [
        {
          name: 'ok',
          label: '확인',
          btnStyle: 'none',
          btnColor: 'primary',
          click: () => {
            if (res.flag) router.go(-2);
          }
        }
      ]
    },
    content
  );
};

/**
 * @description 여행결제취소/등록 요청
 */
const reqCancelPayment = async (cancelYn: boolean) => {
  let params: TrvlCancRgtData[] = [];
  selChkList.value.forEach((d) => {
    const cancelData = trvlCancInfo.value?.trvlMrnpDtlList.find((data) => d === data.trvlMrnpSqno);
    if (cancelData) {
      params.push({
        trvlMrnpSno: cancelData.trvlMrnpSno,
        trvlMrnpSqno: cancelData.trvlMrnpSqno,
        trvlTissuId: cancelData.trvlTissuId
      });
    }
  });
  let res = { message: '', flag: false };
  if (cancelYn) res = await historyStore.reqTrvlCancRgt(params);
  else res = await historyStore.reqTrvlCancPayment(params);

  return res;
};
</script>
