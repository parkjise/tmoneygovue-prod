<template>
  <common-modal
    ref="modal01Ref"
    v-model="isShowPopUp"
    type="full"
    title="쿠폰 선물하기"
    has-bg
    round-footer
    @close="closeAction"
    :isBack="false"
  >
    <template #modal_body>
      <div class="coupon_gift">
        <round-box hide-title>
          <ul>
            <li>
              <p>쿠폰명</p>
              <p>{{ couponDetailInfo.cpnNm }}</p>
            </li>
            <li>
              <p>사용조건</p>
              <p>{{ couponDetailInfo.cndtCtt ? couponDetailInfo.cndtCtt : '-' }}</p>
            </li>
            <li>
              <p>사용기간</p>
              <p>
                {{ setDate(couponDetailInfo.useSttDtm) }} ~
                {{ setDate(couponDetailInfo.useEndDtm) }}
              </p>
            </li>
            <li>
              <p>적용 서비스</p>
              <p>{{ setAdptList() }}</p>
            </li>
          </ul>
        </round-box>
        <form>
          <div class="phone">
            <uu-input
              v-model="mbphNo"
              label="선물할 연락처"
              placeholder="-없이 입력해주세요"
              type="tel"
              :maxLength="12"
            />
            <uu-button label="연락처" size="lg" btn-style="line" @click="openContact" />
          </div>
          <uu-textarea v-model="sendMsgCtt" label="선물메시지" :placeholder="defaultMessage" />
        </form>
        <div class="ticket_notice">
          <p class="title">
            <uu-ic size="16" name="exclamation_gray090" />
            꼭 읽어주세요!
          </p>
          <ul>
            <li>쿠폰 선물하기는 티머니GO 회원에게만 선물 가능합니다.</li>
            <li>수신자가 티머니GO 회원이 아닐 경우, 선물하기가 취소 됩니다.</li>
            <li>선물받은 쿠폰은 쿠폰 사용기간의 잔여기간 동안 유효합니다.</li>
            <li>선물을 하신 시점부터 선물한 쿠폰을 이용하실 수 없습니다.</li>
          </ul>
        </div>
      </div>
    </template>
    <template #modal_footer>
      <uu-button
        btn-color="primary"
        size="xl"
        label="선물하기"
        class="coupon_gift_btn"
        :disabled="disableSendBtn"
        @click="requestApiHttpReqCouponGift"
      />
    </template>
  </common-modal>
  <common-modal v-model="popShow" :title="title" type="confirm" @ok="closeAction" hide-overlay>
    <!-- <template #modal_header> {{ title }} </template> -->
    <template #modal_body>
      <p>{{ message }}</p>
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" label="확인" @click="btnActions.ok" />
    </template>
  </common-modal>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { formatDate } from '@/utils/dateUtils';

import { useCouponStore } from '@/service/coupon/couponModule';

import { storeToRefs } from 'pinia';
import { getAppBridge } from '@/utils';
import { FlexResponseCode } from '@/utils/hybrid/type';
import CommonModal from '@/views/common/components/CommonModal.vue';

const mbphNo = ref<string>('');
const sendMsgCtt = ref<string>('');
const disableSendBtn = ref<boolean>(true);
const rspCd = ref<string>('');
const popShow = ref<boolean>(false);
const isShowPopUp = ref<boolean>(false);

const message = ref<string>('');
const title = ref<string>('');

const defaultMessage = '선물메시지를 입력해주세요';

const props = defineProps({
  isShow: {
    type: Boolean,
    required: true
  },
  cpnSno: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['isClose']);

const couponStore = useCouponStore();

const { getCouponDetailInfo, getResGiftCoupon } = storeToRefs(couponStore);

const couponDetailInfo = computed(() => {
  return getCouponDetailInfo.value;
});

/**
 * 날짜 포맷
 * @param date
 */
function setDate(date: string) {
  return formatDate(date, 'YYYY.MM.DD').toString();
}

/**
 * 연락처 열기 브릿지
 */
const openContact = async () => {
  const appBridge = await getAppBridge();
  const resResult = await appBridge.openContact();

  if (resResult && resResult.response.code === FlexResponseCode.OK) {
    if (resResult.phoneNumber) {
      mbphNo.value = resResult.phoneNumber.replaceAll('-', '');
    }
  }
};

watch(mbphNo, (newValue) => {
  disableSendBtn.value = newValue.toString().length < 10;
});

/**
 * 쿠폰 선물하기 API 요청
 */
async function requestApiHttpReqCouponGift() {
  if (!sendMsgCtt.value) {
    sendMsgCtt.value = defaultMessage;
  }

  const giftResult = await couponStore.actionRequestGiftCoupon({
    cpnSno: couponDetailInfo.value.cpnSno,
    mbphNo: mbphNo.value,
    sendMsgCtt: sendMsgCtt.value
  });

  if (giftResult) {
    setResponse();
  }
}

/**
 * Response값 받은 후 알림용 모달 창 호출
 */
function setResponse() {
  rspCd.value = getResGiftCoupon.value.rspCd;
  popShow.value = true;

  if (rspCd.value === '0000') {
    title.value = '쿠폰 선물 완료';
    message.value = '선택한 쿠폰을 선물하였습니다.\n선물 완료된 쿠폰은 지난 쿠폰에서\n확인하실 수 있습니다.';
  } else {
    title.value = '쿠폰 선물 실패';
    message.value = '선택한 쿠폰을 선물하지 못하였습니다.\n선물할 연락처를 다시 확인해 주세요.';
  }
}

const setAdptList = () => {
  if (couponDetailInfo.value.adptSvcNmList) {
    let returnStr = '';
    for (let i = 0; i < couponDetailInfo.value.adptSvcNmList.length; i++) {
      if (i > 0) returnStr += ', ';
      returnStr += couponDetailInfo.value.adptSvcNmList[i];
    }
    return returnStr;
  }
};

/**
 * 쿠폰 상세정보 조회
 * @param cpnSno
 */
async function requestApiHttpCouponDetailInfo(cpnSno: string) {
  await couponStore.actionCouponDetailInfo(cpnSno);
}

/**
 * 창 닫기 액션
 */
const closeAction = () => {
  popShow.value = false;
  mbphNo.value = '';
  sendMsgCtt.value = '';
  emit('isClose');
};

watch(
  () => props.isShow,
  () => {
    if (props.isShow) {
      requestApiHttpCouponDetailInfo(props.cpnSno);
    }
    isShowPopUp.value = props.isShow;
  }
);

onMounted(() => {
  isShowPopUp.value = props.isShow;
  requestApiHttpCouponDetailInfo(history.state.data);
});
</script>
