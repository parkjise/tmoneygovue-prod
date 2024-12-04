<template>
  <common-modal
    ref="receiptModalRef"
    v-model="receiptModal"
    type="confirm"
    add-class="receipt_modal"
    hide-overlay
    @close="emits('close')"
  >
    <template #modal_header_top_cont>
      <div class="receipt_category">
        <img src="/assets/images/ic/ic_journey_bus.png" alt="Tmoney 여행" role="presentation" />
        Tmoney 여행
      </div>
    </template>
    <template #modal_header>
      <div class="sr_only">결제 영수증</div>
      <p aria-hidden="true">결제 영수증</p>
    </template>
    
    <template #modal_body>
      <hr class="divider" role="presentation" style="margin: 0.4rem 0 0; height: 0.15rem; background-color: #111" />
      <div ref="receiptRef" class="receipt_content">
        <h4 class="section_tit">판매자 정보</h4>
        <ul class="normal_list">
          <li>
            <div class="list_tit">상호</div>
            <div class="list_txt">{{ paymentRecp?.busCacmNm ?? '' }}</div>
          </li>
          <li>
            <div class="list_tit">사업자 번호</div>
            <div class="list_txt">{{ paymentRecp?.busCacmBrn ?? '' }}</div>
          </li>
        </ul>
        <hr class="divider" role="presentation" />
        <h4 class="section_tit">결제 정보</h4>
        <template v-if="isMixPym">
          <ul class="normal_list">
            <li>
              <div class="list_tit">{{ isCancel ? '잔여금액(원 결제금액)' : '총 결제금액' }}</div>
              <div class="list_txt">
                <span v-if="isCancel">
                  {{ getPriceText(pymPrice) }}원 ({{ getPriceText(paymentRecp?.allPymAmt) }}원)</span
                >
                <span v-else> {{ getPriceText(paymentRecp?.allPymAmt) }}원 </span>
              </div>
            </li>
            <li v-if="paymentRecp?.cardPymAmt ?? 0 > 0">
              <div class="list_tit">카드</div>
              <div class="list_txt">
                <span v-if="isCancel"
                  >{{ getPriceText((paymentRecp?.cardPymAmt ?? 0) - (paymentRecp?.cardPymCancAmt ?? 0)) }}원 ({{
                    getPriceText(paymentRecp?.cardPymAmt)
                  }}원)</span
                >
                <span v-else>{{ getPriceText(paymentRecp?.cardPymAmt) }}원</span>
              </div>
            </li>
            <li v-if="paymentRecp?.evcpPymAmt ?? 0 > 0">
              <div class="list_tit">쿠폰</div>
              <div class="list_txt">
                <span v-if="isCancel"
                  >{{ getPriceText((paymentRecp?.evcpPymAmt ?? 0) - (paymentRecp?.evcpPymCancAmt ?? 0)) }}원 ({{
                    getPriceText(paymentRecp?.evcpPymAmt)
                  }}원)</span
                >
                <span v-else>{{ getPriceText(paymentRecp?.evcpPymAmt) }}원</span>
              </div>
            </li>
            <li v-if="paymentRecp?.mlgPymAmt ?? 0 > 0">
              <div class="list_tit">GO마일리지</div>
              <div class="list_txt">
                <div v-if="isCancel" aria-labelledby="mig" tabindex="0">
                  <p id="mig" aria-hidden="true" class="sr_only">
                    잔여 마일리지  {{ getPriceText((paymentRecp?.mlgPymAmt ?? 0) - (paymentRecp?.mlgPymCancAmt ?? 0)) }} 마일리지
                    사용 마일리지  {{getPriceText(paymentRecp?.mlgPymAmt)}} 마일리지
                  </p>
                    <div aria-hidden="true">
                      {{ getPriceText((paymentRecp?.mlgPymAmt ?? 0) - (paymentRecp?.mlgPymCancAmt ?? 0)) }}M 
                      ({{getPriceText(paymentRecp?.mlgPymAmt)}}M)
                    </div>
                  </div>
                <span v-else>{{ getPriceText(paymentRecp?.mlgPymAmt) }}M</span>
              </div>
            </li>
          </ul>
          <hr class="divider" role="presentation" style="margin: 0.8rem 0" />
        </template>
        <ul class="normal_list">
          <li>
            <div class="list_tit">결제수단</div>
            <div class="list_txt">{{ paymentRecp?.pymMnsNm ?? '' }}</div>
          </li>
          <li v-if="paymentRecp?.aprvNo !== ''">
            <div class="list_tit">승인번호</div>
            <div class="list_txt">{{ paymentRecp?.aprvNo }}</div>
          </li>
          <li>
            <div class="list_tit">승인일자</div>
            <div class="list_txt">
              <span :aria-label="formatA11yDateTime(paymentRecp?.aprvRgtDt ?? '')" role="text"
                >{{ formatDate(paymentRecp?.aprvRgtDt, 'YYYY.MM.DD') }}
              </span>
            </div>
          </li>
          <li>
            <div class="list_tit">승인금액</div>
            <div class="list_txt">{{ getPriceText(paymentRecp?.cardPymAmt) }}원</div>
          </li>
          <!-- 환불금액 상시표시 -->
          <li>
            <div class="list_tit">환불금액</div>
            <div class="list_txt">{{ getPriceText(paymentRecp?.cardPymCancAmt) }}원</div>
          </li>
          <li v-if="isCancel === false">
            <div class="list_tit">결제금액</div>
            <div class="list_txt">{{ getPriceText(pymPrice) }}원</div>
          </li>
          <ul v-else class="normal_list">
            <hr class="divider" role="presentation" style="margin: 0.8rem 0" />
            <li>
              <div class="list_tit">결제금액</div>
              <div class="list_txt">{{ getPriceText(pymPrice) }}원</div>
            </li>
            <!-- 취소수수료가 있을 경우 -->
            <template v-if="paymentRecp?.allPnltAmt ?? 0 > 0">
              <li>
                <div class="list_tit">상품금액</div>
                <div class="list_txt">{{ getPriceText(getUseAmt) }}원</div>
              </li>
              <li>
                <div class="list_tit">취소수수료</div>
                <div class="list_txt">{{ getPriceText(paymentRecp?.allPnltAmt) }}원</div>
              </li>
            </template>
          </ul>
        </ul>
        <hr role="presentation" class="divider" />
        <h4 class="section_tit">예약 정보</h4>
        <ul class="normal_list">
          <li>
            <div class="list_tit">예약번호</div>
            <div class="list_txt">{{ trvlMrnpSno || '' }}</div>
          </li>
          <li>
            <div class="list_tit">여행일정</div>
            <div class="list_txt">
              <span
                :aria-label="formatA11yDateTime(paymentRecp?.deprDt ?? '', paymentRecp?.deprTime ?? '', true)"
                role="text"
                >{{ getDateText(`${paymentRecp?.deprDt}${paymentRecp?.deprTime}`, true) }}
              </span>
            </div>
          </li>
          <li>
            <div class="list_tit">여행상품</div>
            <div class="list_txt">{{ paymentRecp?.trvlPrdNm ?? '' }}</div>
          </li>
          <!-- 전체취소가 아닌 경우만 인원수 노출 -->
          <template v-if="paymentRecp?.trvlPymPrcgStaCd !== TrvlPymPrcgSta.PYM_CANC">
            <li v-for="(item, idx) in paymentRecp?.trvlMrnpDtlList" :key="idx">
              <div class="list_tit">{{ item.busTckKndNm }}매수</div>
              <div class="list_txt">{{ item.busTckKndNm }}{{ item.busTckKndNum }}명</div>
            </li>
          </template>
        </ul>
      </div>
      <div ref="noticeAreaRef" class="notice_area">
        <uu-ic name="exclamation" size="16" />
        <span class="txt">
          영수증은 승차권이 아닙니다.<br />
          이 영수증으로 승차권을 대신하여 탑승하실 수 없습니다.
        </span>
      </div>
      <div class="receipt_save_btn_wrap">
        <uu-button
          btn-style="line"
          label="영수증 저장"
          aria-label="영수증 저장"
          class="receipt_save_btn"
          @click="showConfirmModal"
        />
      </div>
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" label="확인" aria-label="확인" @click="btnActions.close" />
    </template>
  </common-modal>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import html2canvas from 'html2canvas';
import CommonModal from '@/views/common/components/CommonModal.vue';

import { useHistoryStore } from '@/service/usage-history/travelHistoryModule';
import { useMessageModal } from '@/composables/useMessageModal';
import { TrvlPymPrcgSta } from '@/service/travel/travelConsts';
import {
  getPriceText,
  getDateText,
  dataURItoBlob,
  blobToArrayBuffer,
  arrayBufferToBinaryString
  // ,
  // testImgDownload
} from '@/views/travel/travelUtils';
import { formatDate } from '@/utils/dateUtils';
import { storeToRefs } from 'pinia';
import { getAppBridge } from '@/utils';
import { formatA11yDateTime } from '@/utils/dateUtils';

const historyStore = useHistoryStore();
const { trvlMrnpSno, paymentRecp } = storeToRefs(historyStore);

const { createConfirmModalByFunction, createSuccessModalAndOption } = useMessageModal();

const props = defineProps({ isShow: { type: Boolean, default: false } });
const emits = defineEmits(['close']);

const receiptModalRef = ref();
const receiptModal = ref(false);
const receiptRef = ref();

const isDownload = ref(false);

const noticeAreaRef = ref<HTMLElement>();
const isMixPym = ref(false); // 복합결제여부

watch(
  () => props.isShow,
  async () => {
    if (props.isShow && trvlMrnpSno.value !== '') {
      await historyStore.reqPaymentReceipt();
      if (paymentRecp.value) isMixPym.value = paymentRecp.value?.pymMnsNm === '복합';
    }
    receiptModal.value = props.isShow;
    receiptRef.value.scrollTo({ top: 0 });
  }
);

/**
 * @description 결제금액 = 총결제금액 - 총취소환불금액
 */
const pymPrice = computed(() => {
  if (paymentRecp.value) {
    return paymentRecp.value.allPymAmt - paymentRecp.value.allCancRyAmt;
  }
  return 0;
});

/**
 * @description 상품금액(결제금액 - 취소수수료)
 */
const getUseAmt = computed(() => {
  return pymPrice.value - (paymentRecp.value?.allPnltAmt ?? 0);
});

// 결제취소 여부(부분취소포함)
const isCancel = computed(() => {
  return paymentRecp.value?.trvlPymPrcgStaCd !== TrvlPymPrcgSta.PYM_COMP;
});

/**
 * @description 영수증저장 컨펌팝업
 */
const showConfirmModal = () => {
  createConfirmModalByFunction(
    '알림',
    '영수증을 갤러리에 저장하시겠습니까?',
    saveReceiptImg,
    '예',
    false,
    () => {},
    '아니요',
    'primary',
    'none',
    'none',
    'line'
  );
};
/**
 * @description 이미지 파일 저장
 */
const saveReceiptImg = async () => {
  let message = '';
  if (!isDownload.value && receiptModalRef.value) {
    isDownload.value = true;

    // 스크롤 영역을 클론하여 화면에 추가하지 않고 캡처
    const id = receiptModalRef.value.getModalId();
    const originModal = document.getElementById(`${id}`);

    if (originModal) {
      const clonedNode = originModal.cloneNode(true) as HTMLElement;
      // 클론의 스타일을 조정하여 모든 내용을 포함하도록 함
      clonedNode.style.height = 'auto';
      clonedNode.style.width = `${receiptModalRef.value.offsetWidth}px`;
      clonedNode.style.overflow = 'visible';

      // 클론을 화면에 보이지 않게 임시로 추가
      clonedNode.style.position = 'absolute';
      clonedNode.style.zIndex = '-9999';
      document.body.appendChild(clonedNode);

      const content = clonedNode.querySelector('.modal_content') as HTMLElement;
      content.style.borderRadius = '0';

      try {
        const canvas = await html2canvas(content, {
          scrollY: 0,
          windowHeight: document.documentElement.scrollHeight * 2 + 24,
          // 제거할 요소가 현재 화면에는 영향이 없게하기
          ignoreElements: (element) =>
            element.className === 'receipt_save_btn_wrap' || element.className === 'modal_footer'
        });
        const blob = await dataURItoBlob(canvas.toDataURL('image/png'));

        // Blob을 ArrayBuffer로 읽기
        const arrayBuffer = await blobToArrayBuffer(blob);

        // ArrayBuffer를 바이너리 문자열로 변환 + base64인코딩
        const binaryString = btoa(arrayBufferToBinaryString(arrayBuffer));

        const appbridge = await getAppBridge();
        const res = await appbridge.downloadReceiptImg({ imgData: binaryString });

        if (res.response.code === '0000') message = '갤러리에 저장 되었습니다.';
        else message = `err_cod: ${res.response.code}` + '영수증 저장에 실패했습니다.';

        // 테스트
        // testImgDownload(blob);
      } catch (error) {
        message = '영수증 저장에 실패했습니다.';
      } finally {
        // 클론을 제거
        document.body.removeChild(clonedNode);
        createSuccessModalAndOption(
          {
            title: '알림',
            footer: [
              {
                name: 'ok',
                label: '확인',
                click: () => {
                  isDownload.value = false;
                },
                btnStyle: 'none',
                btnColor: 'primary'
              }
            ]
          },
          message
        );
      }
    }
  }
};
</script>
